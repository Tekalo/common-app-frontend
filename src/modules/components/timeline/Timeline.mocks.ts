import { ITimeline } from '@/components/timeline/Timeline';

const base: ITimeline = {
  timelineItems: [
    { title: 'Hello', content: 'World' },
    { title: 'Zardoz', content: 'Foobar' },
  ],
};

export const mockTimelineProps = {
  base,
};
