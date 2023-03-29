import { ITimelineItem } from '@/lib/types';
import { Fragment } from 'react';

export interface ITimeline {
  timelineItems: Array<ITimelineItem>;
  horizontal?: boolean;
}

const Timeline: React.FC<ITimeline> = ({ timelineItems, horizontal }) => {
  const regularTimeline = (
    <div className="px-96 pt-14">
      <ol className="-space-y-7">
        {timelineItems.map((item, i) => (
          <li
            key={i}
            className="border-l-2 border-solid border-blue-1 pb-8 last:border-l-0"
          >
            <div className="flex-start flex items-center">
              <div className="-ml-[30px] flex h-14 w-14 items-center justify-center rounded-full bg-blue-1 text-center font-display text-component-extra-large text-white">
                {i + 1}
              </div>
              <h4 className="ml-7 mb-1.5 font-display text-h4-desktop text-black-text">
                {item.title}
              </h4>
            </div>
            <div className="mt-1 ml-14 mb-6">
              <p className="mb-3  font-sans text-p2-desktop text-black-text">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );

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
            <li key={i} className="flex flex-col items-center">
              {/* Bubble */}
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  item.isActive
                    ? 'bg-blue-1 text-white'
                    : 'bg-gray-4 text-gray-2'
                } text-center font-display text-component-extra-large`}
              >
                {i + 1}
              </div>
              {/* Label */}
              <div className="-mx-8 mt-4">
                <p
                  className={`font-sans text-p3-desktop ${
                    item.isActive ? 'text-black-text' : 'text-gray-2'
                  }`}
                >
                  {item.text}
                </p>
              </div>
            </li>
            {/* Do not add a separating div if we are the last item. If the next item has a property of isActive=true then change the bg-blue-2 for this div*/}
            {i !== timelineItems.length - 1 ? (
              <div
                className={`mb-8 h-[2px] w-[124px] rounded-full ${
                  timelineItems[i + 1].isActive ? 'bg-blue-1' : 'bg-gray-4'
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
