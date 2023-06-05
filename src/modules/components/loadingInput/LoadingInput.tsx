export interface ILoadingInput {
  label: string;
}

const LoadingInput: React.FC<ILoadingInput> = ({ label }) => {
  return (
    <div className="space-y-2">
      <label
        className={'flex items-center text-component-extra-small text-gray-4'}
      >
        {label}
      </label>
      <div className="hidden w-full animate-pulse rounded bg-gray-4 py-4 md:block" />
    </div>
  );
};

export default LoadingInput;
