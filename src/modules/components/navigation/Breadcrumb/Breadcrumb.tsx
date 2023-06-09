import { ChevronRightIcon } from '@heroicons/react/24/solid';

export interface IBreadcrumb {
  label: string;
  items: unknown[];
  activeIndex: number;
  setActive: (idx: number) => void;
}

const Breadcrumb: React.FC<IBreadcrumb> = ({
  label,
  items,
  activeIndex,
  setActive,
}) => {
  return items.length > 0 ? (
    <div className="flex flex-row justify-center space-x-2">
      {items.map((item, index) => {
        return (
          <div key={index} className="flex flex-row">
            <ChevronRightIcon className="h-4 w-4 fill-gray-2" />
            <div
              key={index}
              className={`text-component-medium ${
                index === activeIndex ? '' : 'cursor-pointer text-blue-1'
              }`}
              onClick={() => setActive(index)}
            >
              {`${label} ${index + 1}`}
            </div>
          </div>
        );
      })}
      {/* If the active index is at the end of the roles add the new placeholder role in breadcrumb, otherwise don't render it */}
      {activeIndex === items.length ? (
        <div className="flex  flex-row items-center space-x-2">
          <ChevronRightIcon className="h-4 w-4 fill-gray-2" />
          <div className="text-component-medium">
            {`${label} ${items.length + 1}`}
          </div>
        </div>
      ) : null}
    </div>
  ) : (
    <div
      className="flex cursor-pointer flex-row items-center space-x-2"
      onClick={() => setActive(0)}
    >
      <ChevronRightIcon className="h-4 w-4 fill-gray-2" />
      <div className="text-component-medium" data-name={`${label} 1`}>
        {label} 1
      </div>
    </div>
  );
};

export default Breadcrumb;
