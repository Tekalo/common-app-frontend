import { HandleSvg } from '@/modules/constants/svgs';
import type { Identifier, XYCoord } from 'dnd-core';
import type { FC } from 'react';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { PreviewGenerator } from 'react-dnd-preview';

const ItemTypes = {
  CARD: 'card',
};

export interface CardProps {
  index: number;
  text: string;
  value: string;
  otherIsDragging: boolean;
  moveCard: (_dragIndex: number, _hoverIndex: number) => void;
  setIsDragging: (_isDragging: boolean) => void;
}

export const generatePreview: PreviewGenerator<CardProps, Element> = ({
  itemType,
  item,
  style,
}) => {
  return (
    <div
      style={style}
      className={`text-black z-10 flex w-[500px] flex-auto cursor-grabbing justify-between border border-solid border-gray-2 bg-white p-[7px] text-component-medium`}
    >
      {item.text}
      <div>{HandleSvg}</div>
    </div>
  );
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const RankChoiceCard: FC<CardProps> = ({
  value,
  text,
  index,
  otherIsDragging,
  moveCard,
  setIsDragging,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }

      setIsDragging(true);
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { value, index, text };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      setIsDragging(false);
    },
  });

  const numberStateClasses = value ? 'text-gray-1' : 'text-gray-2';
  const textStateClasses = value
    ? 'border-solid border-gray-2 p-[7px]'
    : 'border-dashed border-blue-4';
  const draggingClasses =
    isDragging || otherIsDragging ? 'cursor-grabbing' : 'cursor-grab';

  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-value={value}
      className={`flex space-y-2`}
      data-handler-id={handlerId}
    >
      <div
        className={`w-[24px] flex-initial px-2 pb-1 pt-4 text-component-small ${numberStateClasses}`}
      >
        {index + 1}
      </div>
      <div
        className={`text-black flex flex-auto justify-between border text-component-medium active:cursor-grabbing ${textStateClasses} ${draggingClasses}
        ${isDragging ? 'opacity-0' : ''}
        `}
      >
        {text}
        <div>{HandleSvg}</div>
      </div>
    </div>
  );
};

export default RankChoiceCard;
