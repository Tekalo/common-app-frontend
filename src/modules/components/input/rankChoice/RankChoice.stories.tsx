import { DndProvider } from 'react-dnd';
import { Preview } from 'react-dnd-preview';
import { TouchBackend } from 'react-dnd-touch-backend';
import RankChoice, { IRankChoice } from './RankChoice';
import { mockRankChoiceProps } from './RankChoice.mocks';
import { generatePreview } from './RankChoiceCard';

const DefaultComponent: React.FC<IRankChoice> = ({
  label,
  name,
  items: options,
}) => {
  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
      <RankChoice label={label} name={name} items={options} />
      <Preview generator={generatePreview} />
    </DndProvider>
  );
};

export default { component: DefaultComponent };

export const Default = {
  args: { ...mockRankChoiceProps.base },
};
export const Empty = {
  args: { ...mockRankChoiceProps.empty },
};
