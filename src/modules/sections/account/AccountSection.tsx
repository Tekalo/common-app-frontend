import { ButtonVariant } from '@/components/buttons/Button/Button';
import ConfirmModal from '@/components/modal/ConfirmModal/ConfirmModal';
import { GreenCheckSvg, IOutlineSVG } from '@/constants/svgs';
import { NextPageWithLayout } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';

export interface ICandidateAccountSection {
  applicationSubmitted: boolean;
  matchesPaused: boolean;
}

const AccountSection: NextPageWithLayout<ICandidateAccountSection> = ({
  // TODO: Hook these up to backend
  applicationSubmitted,
  matchesPaused,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);

  const hideAppNotSubmitted = applicationSubmitted;
  const hideAppSubmitted = !hideAppNotSubmitted;
  const hidePauseMatches = !applicationSubmitted || matchesPaused;
  const hideMatchesPaused = !matchesPaused;

  const onDeleteConfirm = (): void => {
    // TODO: Do the delete
    console.log('DELETE');
  };
  const onPauseConfirm = (): void => {
    // TODO: Do the pause
    console.log('PAUSE');
  };
  const closeDeleteModal = (): void => {
    setShowDeleteModal(false);
  };
  const closePauseModal = (): void => {
    setShowPauseModal(false);
  };

  const deleteModalConfirm = 'Delete account';
  const deleteModalHeadline = 'Permanently delete your account and data';
  const deleteModalText = `Are you sure you want to permanently delete you
                            account and data? This may take up to 30 days. Choose
                            “delete account” to start deletion.`;
  const pauseModalHeadline = 'Pause your matches';
  const pauseModalText =
    'Are you sure you want to pause your matches? Lorem ipsum';

  return (
    <div className="m-auto w-full max-w-[928px] px-6 pb-36 pt-24">
      <div className="mb-2 font-display text-h3-desktop text-black-text">
        {`Welcome Back, [Name]`}
      </div>
      <div className="mb-6 font-display text-h4-desktop text-black-text">
        Manage your settings
      </div>
      {/* Bordered Settings BOx */}
      <div className="border border-gray-3 p-10">
        <div className="mb-6 font-display text-small-caption-desktop text-gray-1">
          Your Account
        </div>
        {/* Application Status */}
        <div className="space-y-5">
          {/* App Not Submitted */}
          <div className={`${hideAppNotSubmitted ? 'hidden' : ''} space-y-2`}>
            <div className="text-component-medium text-blue-1">
              <Link href="/sign-up/applicants">
                {'Continue my application >'}
              </Link>
            </div>
            <div className="text-p3-desktop text-gray-1">
              Your application has not been submitted yet.
            </div>
          </div>
          {/* Application Submitted */}
          <div
            className={`${
              hideAppSubmitted ? 'hidden' : ''
            } space-y-2 border-b border-gray-3 pb-9`}
          >
            <div className="flex items-baseline">
              <div className="mr-1 h-[16px] w-[16px] p-1">
                {<GreenCheckSvg height="12px" width="12px" color="#00A870" />}
              </div>{' '}
              <div className=""> Application submitted</div>
            </div>
            <div className="text-p3-desktop text-gray-1">
              {"You're all set. We'll contact you via your preferred method."}
            </div>
          </div>
          <div className="space-y-5">
            {/* Pause Matches */}
            <div className={`space-y-2 ${hidePauseMatches ? 'hidden' : ''}`}>
              <div
                className="cursor-pointer text-component-medium text-blue-1"
                onClick={() => setShowPauseModal(true)}
              >
                {'Pause my matches >'}
              </div>
              <div className="text-p3-desktop text-gray-1">
                {
                  "If you're not looking for matches now, we'll stop contacting you until you opt back in."
                }
              </div>
            </div>
            {/* Matches Paused */}
            <div className={`space-y-2 ${hideMatchesPaused ? 'hidden' : ''}`}>
              <div
                className="cursor-pointer text-component-medium text-blue-1"
                onClick={() => {}}
              >
                <div className="flex">
                  {<IOutlineSVG height="16px" width="16px" color="#317BB5" />}
                  <div className="ml-1">{'Opt back in for matches >'}</div>
                </div>
              </div>
              <div className="text-p3-desktop text-gray-1">
                Your matches are paused until you opt back in.
              </div>
            </div>
            <div className="space-y-2">
              <div
                className="cursor-pointer text-component-medium text-blue-1"
                onClick={() => setShowDeleteModal(true)}
              >
                {'Delete my account and data >'}
              </div>
              <div className="text-p3-desktop text-gray-1">
                Permanently delete your account and saved data.
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmModal
        bodyText={deleteModalText}
        confirmBtnVariant={ButtonVariant.RED}
        cancelBtnText="Cancel"
        confirmBtnText={deleteModalConfirm}
        headline={deleteModalHeadline}
        isOpen={showDeleteModal}
        closeModal={closeDeleteModal}
        onConfirm={onDeleteConfirm}
        onCancel={closeDeleteModal}
      />
      <ConfirmModal
        bodyText={pauseModalText}
        cancelBtnText="Cancel"
        confirmBtnText="Pause matches"
        headline={pauseModalHeadline}
        isOpen={showPauseModal}
        closeModal={closePauseModal}
        onConfirm={onPauseConfirm}
        onCancel={closePauseModal}
      />
    </div>
  );
};

export default AccountSection;
