import Timeline from './Timeline';
import { mockTimelineProps } from './Timeline.mocks';

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
