import { ITooltip } from './Tooltip';

const base: ITooltip = {
  text: 'An example tooltip to view when trying to see what the tooltip looks like.',
};

const tall: ITooltip = {
  text: 'An example tooltip to view when trying to see what the tooltip looks like. Maybe there is a lot of text and you want to see what it looks like when the tooltip is significantly taller. Maybe pay attention to the center-alignment.',
};

export const mockTooltipProps = {
  base,
  tall,
};
