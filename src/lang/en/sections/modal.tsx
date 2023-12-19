import { GreenCircleCheck } from '@/lib/constants/svgs';

export const ERROR_MODAL_TEXT = {
  emailExists: 'Email already exists',
  requestFailed: 'Request Failed',
  signIn: 'Please sign in',
  somethingWrong: 'Something went wrong. Please try again later.',
  okButton: 'Ok',
};

export const UPLOAD_ERROR_TEXT = {
  header: 'Upload failed',
  bodyText: 'Upload failed message TBD',
};

export const PRIVACY_MODAL_TEXT = {
  HEADER: 'Privacy Info',
  BODY: 'This Privacy Info is meant to help you understand what information we collect, why we collect it, and how you can manage and delete your information lorem.',
  EXTRAS: ['See our ', 'Privacy FAQ', ' for more information'],
};

export const SAVE_MODAL = {
  HEADER: (
    <>
      <div className="mr-2 inline-block pt-1 align-top">{GreenCircleCheck}</div>
      <div className="inline-block w-[80%]">Your progress has been saved!</div>
    </>
  ),
  BODY: 'If you need to leave, you can click “Sign in” from the homepage, then return to the application.',
  CTA: 'Ok',
};

export const CONFIRM_MODAL = {
  HEADER: 'Delete this role',
  BODY: "Are you sure you want to delete this role? You won't be able to undo this.",
  CTA_CANCEL: 'Cancel',
  CTA_CONFIRM: 'Delete role',
};

export const DELETE_MODAL = {
  CTA_CONFIRM: 'Delete account',
  CTA_CANCEL: 'Cancel',
  HEADER: 'Permanently delete your account and data',
  BODY: 'Are you sure you want to permanently delete your account and data? This may take up to 30 days. Choose "delete account" to start deletion.',
};

export const PAUSE_MODAL = {
  CTA_CONFIRM: 'Pause account',
  CTA_CANCEL: 'Cancel',
  HEADER: 'Pause your account',
  BODY: 'Are you sure you want to pause your account?',
};

export const RESUME_MODAL = {
  CTA_CONFIRM: 'Unpause account',
  CTA_CANCEL: 'Cancel',
  HEADER: 'Unpause your account',
  BODY: 'Are you sure you want to unpause your account?',
};
