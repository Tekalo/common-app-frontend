import { ITimeline } from './Timeline';

const base: ITimeline = {
  timelineItems: [
    { title: 'Hello', text: 'World' },
    { title: 'Zardoz', text: 'Foobar' },
  ],
};

export const mockTimelineProps = {
  base,
};
