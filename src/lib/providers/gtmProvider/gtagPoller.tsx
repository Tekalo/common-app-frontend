import { gtmCookieName } from '@/lib/constants/strings';
import Cookies from 'universal-cookie';

export class GtagPoller {
  private cookies = new Cookies(null, { path: '/' });
  private emptyValue = '';

  // Returns a promise resolving in the two session ids from gtag
  public getSessionIds = (id: string): Promise<string[]> => {
    return new Promise<string[]>((resolve) => {
      const clientIdPromise = this.pollForGtagValue('client_id', id);
      const sessionIdPromise = this.pollForGtagValue('session_id', id);

      Promise.all([clientIdPromise, sessionIdPromise]).then((values) => {
        resolve(values);
      });
    });
  };

  // Waits until gtag is present, then makes the call to gtag
  private pollForGtagValue = async (
    valueName: 'client_id' | 'session_id',
    id: string
  ) => {
    return new Promise<string>((resolve) => {
      let i = 0;

      const gtagInt = setInterval(() => {
        i++;

        if (window?.gtag) {
          this.getGtagValue(valueName, id, resolve);
          clearInterval(gtagInt);
        } else if (i === 10) {
          resolve(this.emptyValue);
          clearInterval(gtagInt);
        }
      }, 500);
    });
  };

  // Calls gtag for a value and waits for it to resolve
  private getGtagValue = (
    valueName: 'client_id' | 'session_id',
    id: string,
    resolve: (value: string | PromiseLike<string>) => void
  ): void => {
    if (window?.gtag) {
      window.gtag('get', id, valueName, resolve);

      // If gtag is blocked, this will never return, we must set default values
      let i = 0;
      const requestInt = setInterval(() => {
        i++;

        const cookieValue = this.cookies.get(gtmCookieName);

        if (cookieValue) {
          clearInterval(requestInt);
          return;
        } else if (i === 10) {
          resolve(this.emptyValue);
          clearInterval(requestInt);
        }
      }, 500);
    } else {
      resolve(this.emptyValue);
    }
  };
}
