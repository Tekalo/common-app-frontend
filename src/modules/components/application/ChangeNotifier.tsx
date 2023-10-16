import { DraftSubmissionType } from '@/lib/types';
import { useEffect } from 'react';

interface IChangeNotifier {
  change: () => void;
  formValues: DraftSubmissionType | undefined;
  isDirty: boolean;
}

const ChangeNotifier: React.FC<IChangeNotifier> = ({
  change,
  formValues,
  isDirty,
}) => {
  useEffect(() => {
    // We need to wait until the submission is loaded or it will always fire
    if (formValues && isDirty) {
      change();
    }
  }, [isDirty]);

  return <></>;
};

export default ChangeNotifier;
