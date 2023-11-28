import Timeline from '@/components/timeline/Timeline';
import { mockTimelineProps } from '@/components/timeline/Timeline.mocks';

export default { component: Timeline };

export const Default = {
  args: { ...mockTimelineProps.base },
};

export const Horizontal = {
  args: {
    timelineItems: [
      { title: '', text: 'Your experience' },
      { title: '', text: 'Your interests' },
    ],
    horizontal: true,
  },
};
