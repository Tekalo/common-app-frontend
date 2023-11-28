import Timeline from '@/components/timeline/Timeline';
import { APPLICANT_FORM_TEXT } from '@/lang/en';
import { ITimelineItem } from '@/lib/types';
import { ButtonVariant } from '@/modules/components/buttons/Button/Button';
import ConfirmModal from '@/modules/components/modal/ConfirmModal/ConfirmModal';
import { SingletonRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Observable, Observer } from 'rxjs';
import { Url } from 'url';

interface IApplicantFormsNav {
  $callUnlockedNavigation: Observable<string>;
  $updateExperienceForm: Observer<void>;
  $updateInterestForm: Observer<void>;
  hasUnsavedChanges: boolean;
  isInterestFormStarted: boolean;
  isInterestFormVisible: boolean;
  router: SingletonRouter;
  useNavLock: boolean;
}

const ApplicantFormsNav: React.FC<IApplicantFormsNav> = ({
  $callUnlockedNavigation,
  $updateExperienceForm,
  $updateInterestForm,
  hasUnsavedChanges,
  isInterestFormStarted,
  isInterestFormVisible,
  router,
  useNavLock,
}) => {
  const [delayedNavUrl, setDelayedNavUrl] = useState<string>();
  const [showNavWarningModal, setShowNavWarningModal] = useState(false);
  const [navLockUnsubscribe, setNavLockUnsubscribe] = useState<() => void>();

  // This subscribes to the callUnlockedNavigation observer to fire unlockedNavigation whenever it is emitted
  useEffect(() => {
    const sub = $callUnlockedNavigation.subscribe((url: string) => {
      unlockedNavigation(url);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [navLockUnsubscribe]);

  // This sets the navigation lock effect
  useEffect(() => {
    if (!useNavLock) return;

    const handleBrowseAway = (navUrl: Url) => {
      if (!useNavLock) return;

      setShowNavWarningModal(true);
      setDelayedNavUrl(navUrl.toString());
      router.events.emit('routeChangeError');
      throw 'routeChange aborted';
    };

    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!useNavLock) return;
      e.preventDefault();

      return (e.returnValue = APPLICANT_FORM_TEXT.EDIT.UNSAVED_WARNING.TEXT);
    };

    // Set route change subscriptions
    if (hasUnsavedChanges) {
      router.events.on('routeChangeStart', handleBrowseAway);
      window.addEventListener('beforeunload', handleWindowClose);

      // The function to unsubscribe
      const unsubFn = () => {
        router.events.off('routeChangeStart', handleBrowseAway);
        window.removeEventListener('beforeunload', handleWindowClose);
      };

      setNavLockUnsubscribe(() => unsubFn);

      return unsubFn;
    }
  }, [hasUnsavedChanges]);

  // Allows navigation without the warning (nav lock)
  const unlockedNavigation = (url: string) => {
    if (navLockUnsubscribe) {
      navLockUnsubscribe();
    }

    router.push(url);
  };

  const timelineItems: Array<ITimelineItem> = [
    {
      content: (
        <div
          data-name="nav-experience-form"
          onClick={
            isInterestFormVisible
              ? () => $updateInterestForm.next()
              : () => void {}
          }
        >
          {APPLICANT_FORM_TEXT.EXPERIENCE}
        </div>
      ),
      isEnabled: true,
      isCurrent: !isInterestFormVisible,
    },
    {
      content: (
        <div
          data-name="nav-interest-form"
          onClick={
            !isInterestFormVisible && isInterestFormStarted
              ? () => {
                  $updateExperienceForm.next();
                }
              : () => void {}
          }
        >
          {APPLICANT_FORM_TEXT.INTERESTS}
        </div>
      ),
      isEnabled: isInterestFormVisible || isInterestFormStarted,
      isCurrent: isInterestFormVisible,
    },
  ];

  return (
    <>
      <div
        data-name="timeline"
        className="mb-12 mt-10 flex content-center justify-center"
      >
        <Timeline
          timelineItems={timelineItems}
          horizontal={true}
          showCompletion={!useNavLock}
        />
      </div>
      <ConfirmModal
        bodyText={APPLICANT_FORM_TEXT.EDIT.UNSAVED_WARNING.TEXT}
        cancelBtnText={APPLICANT_FORM_TEXT.EDIT.UNSAVED_WARNING.CANCEL_BTN}
        closeModal={() => setShowNavWarningModal(false)}
        confirmBtnText={APPLICANT_FORM_TEXT.EDIT.UNSAVED_WARNING.CONFIRM_BTN}
        confirmBtnVariant={ButtonVariant.RED}
        headline={APPLICANT_FORM_TEXT.EDIT.UNSAVED_WARNING.TITLE}
        isOpen={showNavWarningModal}
        onCancel={() => setShowNavWarningModal(false)}
        onConfirm={() => {
          if (delayedNavUrl) {
            unlockedNavigation(delayedNavUrl);
          }
        }}
      />
    </>
  );
};

export default ApplicantFormsNav;
