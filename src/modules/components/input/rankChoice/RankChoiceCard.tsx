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
  item,
  style,
}) => {
  return (
    <div
      style={style}
      className={`text-black z-10 flex w-[500px] flex-auto cursor-grabbing justify-between rounded border border-solid border-gray-2 bg-white p-[7px] text-component-medium shadow-md`}
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

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
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
        // TODO: Need to pull the base styles out to use in preview
        className={`text-black flex flex-auto justify-between rounded border bg-white text-component-medium active:cursor-grabbing ${textStateClasses} ${draggingClasses}
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
