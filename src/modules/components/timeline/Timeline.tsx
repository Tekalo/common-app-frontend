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
            className="pb-8 border-l-2 border-solid border-blue-1 last:border-l-0"
          >
            <div className="flex-start flex items-center">
              <div className="text-white h-14 w-14 -ml-[30px] flex items-center justify-center rounded-full bg-blue-1 text-center font-display text-component-extra-large">
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
};

export default Timeline;
