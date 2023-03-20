import { ITimelineItem } from '@/lib/types';

export interface ITimeline {
  timelineItems: Array<ITimelineItem>;
}

const Timeline: React.FC<ITimeline> = ({ timelineItems }) => {
  return (
    <div className="px-96 pt-14">
      <ol className="-space-y-7">
        {timelineItems.map((item, i) => (
          <li
            key={i}
            className="border-l-2 border-solid border-blue-1 pb-8 last:border-l-0"
          >
            <div className="flex-start flex items-center">
              <div className="-ml-[30px] flex h-14 w-14 items-center justify-center rounded-full bg-blue-1 text-center font-display text-component-xl text-white">
                {i + 1}
              </div>
              <h4 className="ml-7 mb-1.5 font-display text-desktop-h4 text-black-text">
                {item.title}
              </h4>
            </div>
            <div className="mt-1 ml-14 mb-6">
              <p className="mb-3  font-sans text-desktop-md-copy text-black-text">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline;
