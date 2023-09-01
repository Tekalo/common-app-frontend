import { ITimelineItem } from '@/lib/types';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Fragment } from 'react';

export interface ITimeline {
  timelineItems: Array<ITimelineItem>;
  horizontal?: boolean;
}

const Timeline: React.FC<ITimeline> = ({ timelineItems, horizontal }) => {
  const regularTimeline = (
    <div className="mt-10 max-w-content-area md:mt-14 lg:mt-10">
      <ol className="">
        {timelineItems.map((item, i) => (
          <li key={i} className="relative mb-4 md:mb-6 lg:min-h-[176px]">
            <div
              className={`${
                i === timelineItems.length - 1 ? 'hidden' : ''
              } absolute -bottom-5 left-5 top-10 border-l-2 border-solid border-blue-1 pb-8 md:-bottom-6 lg:left-7`}
            ></div>
            <div className="flex-start flex items-start">
              <h4 className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-blue-1 text-center font-display text-h4-mobile leading-10 text-white lg:h-14 lg:w-14 lg:text-h4-desktop">
                {i + 1}
              </h4>
              <h4 className="ml-4 mt-2 font-display text-h4-mobile text-black-text md:ml-6 lg:text-h4-desktop">
                {item.title}
              </h4>
            </div>
            <div className="ml-14 mt-4 md:ml-16 md:mt-3 lg:ml-20 lg:mt-0">
              <p className="font-sans text-p2-desktop text-black-text">
                {item.content}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );

  const getLabelClasses = (item: ITimelineItem) => {
    if (item.isEnabled) {
      if (item.isCurrent) {
        return `text-black-text underline underline-offset-4`;
      } else {
        return `text-black-text hover:text-blue-1 hover:underline hover:underline-offset-4 cursor-pointer`;
      }
    } else {
      return 'text-gray-2';
    }
  };

  /** NOTE:
   * This horizontal timeline sets the column count to be double the input
   * length - 1 to give us the correct number of columns to put the lines in
   * between the items. There might be a better way to do this, but this works.
   */
  const horizontalTimeline = (
    <>
      <ol
        className={`flex-start flex items-center columns-${
          timelineItems.length * 2 - 1
        }`}
      >
        {timelineItems.map((item, i) => (
          <Fragment key={i}>
            <li
              key={i}
              data-index={i}
              data-state={item.isEnabled ? 'enabled' : 'disabled'}
              className="flex flex-col items-center"
            >
              {/* Bubble */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  item.isEnabled
                    ? 'bg-blue-1 text-white'
                    : 'bg-gray-4 text-gray-2'
                } text-center font-display text-component-extra-large`}
              >
                {/* If the next item in timelineItems has property of isActive=true then display heroicon checkmark otherwise display the current index plus 1 as a string*/}
                {timelineItems[i + 1] && timelineItems[i + 1].isEnabled ? (
                  <CheckIcon className="h-[18px] w-[18px] stroke-2" />
                ) : (
                  `${i + 1}`
                )}
              </div>
              {/* Label */}
              <div className="-mx-8 mt-4">
                <div
                  className={`font-sans text-p3-desktop ${getLabelClasses(
                    item
                  )}`}
                >
                  {item.content}
                </div>
              </div>
            </li>
            {/* Do not add a separating div if we are the last item. If the
                next item has a property of isActive=true then change the
                bg-blue-2 for this div*/}
            {i !== timelineItems.length - 1 ? (
              <div
                className={`mb-8 h-[2px] w-[124px] rounded-full ${
                  timelineItems[i + 1].isEnabled ? 'bg-blue-1' : 'bg-gray-4'
                }`}
              />
            ) : null}
          </Fragment>
        ))}
      </ol>
    </>
  );

  return horizontal ? horizontalTimeline : regularTimeline;
};

export default Timeline;
