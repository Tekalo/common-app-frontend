import RankChoiceCard from '@/components/input/rankChoice/RankChoiceCard';
import { RankChoiceItem } from '@/lib/types';
import update from 'immutability-helper';
import { useCallback, useEffect, useState } from 'react';

export interface IRankChoice {
  label: string;
  name: string;
  rankOptions: RankChoiceItem[];
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

  useEffect(() => {
    setCards(mapItemsToCards(items));
  }, [items]);

  const valueUpdated = () => {
    setValue(cards.map((c) => c.value));
  };

  function mapItemsToCards(items: RankChoiceItem[]): RankChoiceItem[] {
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
    setCards((prevCards: RankChoiceItem[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as RankChoiceItem],
        ],
      })
    );
  }, []);

  // A function at this level that setsValue once the card has finished moving
  // We update rankChoiceCard to accept that function as a value
  // and call it when the card is dropped and then use this level's state to get the order of the cards

  const renderCard = useCallback(
    (card: { value: string; displayText: string }, index: number) => {
      return (
        <RankChoiceCard
          disabled={items.length < 2}
          key={card.value}
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
    <div className="max-w-[500px]">
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
