import { HandleSvg } from '@/lib/constants/svgs';
import type { Identifier, XYCoord } from 'dnd-core';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { PreviewGenerator } from 'react-dnd-preview';

const ItemTypes = {
  CARD: 'card',
};

export interface IRankChoiceCard {
  disabled: boolean;
  index: number;
  otherIsDragging: boolean;
  text: string;
  value: string;
  moveCard: (_dragIndex: number, _hoverIndex: number) => void;
  setIsDragging: (_isDragging: boolean) => void;
  valueUpdated: () => void;
}
const baseCardStyles =
  'text-black flex flex-auto justify-between rounded border bg-white p-[7px] text-component-medium';
const previewStyles = `${baseCardStyles} self-stretch border-blue-4 border-dashed`;

interface DragItem {
  index: number;
  id: string;
  type: string;
}

let RankChoiceCard: FC<IRankChoiceCard> = ({
  disabled,
  index,
  otherIsDragging,
  text,
  value,
  moveCard,
  setIsDragging,
  valueUpdated,
}) => {
  value = value === 'e0' || value === 'e1' || value === 'e2' ? '' : value;

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
      valueUpdated();
    },
  });

  drag(drop(ref));

  const numberStateClasses = value ? 'text-gray-1' : 'text-gray-2';
  const draggingClasses = `${
    isDragging || otherIsDragging ? 'cursor-grabbing' : 'cursor-grab'
  } active:cursor-grabbing`;

  return (
    <div
      ref={disabled ? null : ref}
      data-value={value}
      className={`flex space-y-2`}
      data-handler-id={handlerId}
    >
      {/* The list number */}
      <div
        className={`w-[24px] flex-initial px-2 pb-1 pt-4 text-p3-desktop ${numberStateClasses}`}
      >
        {index + 1}
      </div>
      {/* The card containing the text */}
      <div
        className={`${value && !isDragging ? baseCardStyles : previewStyles} ${
          value ? '' : 'border-blue-4'
        } ${value && !disabled ? draggingClasses : 'cursor-default'}
        `}
      >
        {/* Text container */}
        <div className={`flex-auto select-none self-stretch`}>
          <span className={`${isDragging ? 'hidden' : ''}`}>{text}</span>
          <span className={`${!isDragging ? 'hidden' : ''}`}> </span>
        </div>
        {/* Drag Handle */}
        <div>{HandleSvg}</div>
      </div>
    </div>
  );
};

const generatePreview: PreviewGenerator<IRankChoiceCard, Element> = ({
  item,
  style,
}) => {
  return (
    <div
      style={style}
      className={`${baseCardStyles} ml-4 w-[80vw] max-w-[320px] cursor-grabbing border-blue-1 shadow-md`}
    >
      <div className="flex-auto self-stretch">
        {item.text ? item.text : ' '}
      </div>
      <div>{HandleSvg}</div>
    </div>
  );
};

export default RankChoiceCard = Object.assign(RankChoiceCard, {
  generatePreview,
});
