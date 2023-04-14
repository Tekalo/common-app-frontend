export const config = { runtime: 'edge' };

export default function handler() {
  throw new Error('Unhandled server side error');
}
