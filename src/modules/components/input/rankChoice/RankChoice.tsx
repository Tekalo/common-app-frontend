import RankChoiceCard from '@/components/input/rankChoice/RankChoiceCard';
import { ISelectItem } from '@/lib/types';
import update from 'immutability-helper';
import { useCallback, useEffect, useState } from 'react';

export interface IRankChoice {
  label: string;
  name: string;
  rankOptions: ISelectItem[];
  setValue: (_val: string[]) => void;
}

const RankChoice: React.FC<IRankChoice> = ({
  label,
  name,
  rankOptions: items,
  setValue,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [cards, setCards] = useState(mapItemsToCards(items));

  const eventTargetName = `${name}-target`;

  useEffect(() => {
    setCards(mapItemsToCards(items));
  }, [items]);

  const valueUpdated = () => {
    setValue(cards.map((c) => c.value));
  };

  function mapItemsToCards(items: ISelectItem[]): ISelectItem[] {
    return items.length
      ? items
      : Array(3)
          .fill('')
          .map((v: string, i: number) => ({
            displayText: '',
            value: `e${i}`,
          }));
  }

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: ISelectItem[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as ISelectItem],
        ],
      })
    );
  }, []);

  const renderCard = useCallback(
    (card: { value: string; displayText: string }, index: number) => {
      const disabled = items.length < 2;
      const disabledKey = disabled ? 'd' : 'e';
      const cardKey = `${card.value}${disabledKey}`;

      return (
        <RankChoiceCard
          disabled={disabled}
          key={cardKey}
          index={index}
          value={card.value}
          text={card.displayText}
          moveCard={moveCard}
          setIsDragging={setIsDragging}
          otherIsDragging={isDragging}
          valueUpdated={valueUpdated}
        />
      );
    },
    [cards, isDragging]
  );

  const disabledColor = items.length > 1 ? 'text-black' : 'text-gray-2';
  const dragStyles = `${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`;

  return (
    <div id={eventTargetName} className="max-w-[500px] text-left">
      <div className="mb-4 text-component-extra-small" id={name}>
        {label}
      </div>
      <div className={`${disabledColor} mb-3 text-small-caption-desktop`}>
        Drag and drop from the list:
      </div>
      <div
        className={`flex flex-col content-start ${
          items.length > 1 ? dragStyles : ''
        }`}
      >
        {cards.map((card, i) => renderCard(card, i))}
      </div>
    </div>
  );
};

export default RankChoice;
