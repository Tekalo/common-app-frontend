import { ITimelineItem } from '@/lib/types';

export interface ITimeline {
  timelineItems: Array<ITimelineItem>;
}

// TODO: Expect array of ITimelineItem

const Timeline: React.FC<ITimeline> = ({ timelineItems }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-center">
      {timelineItems[0].title}
    </div>
  );
};

export default Timeline;
