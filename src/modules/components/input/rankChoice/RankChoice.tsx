import update from 'immutability-helper';
import { useCallback, useState } from 'react';
import RankChoiceCard from './RankChoiceCard';

export interface IRankChoice {
  label: string;
  name: string;
  items: RankChoiceItem[];
}

export interface RankChoiceItem {
  text: string;
  value: string;
}
const RankChoice: React.FC<IRankChoice> = ({ label, name, items }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [cards, setCards] = useState(items);

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

  const renderCard = useCallback(
    (card: { value: string; text: string }, index: number) => {
      return (
        <RankChoiceCard
          key={card.value}
          index={index}
          value={card.value}
          text={card.text}
          moveCard={moveCard}
          setIsDragging={setIsDragging}
          otherIsDragging={isDragging}
        />
      );
    },
    [cards, isDragging]
  );

  const disabledColor = cards.length > 1 ? 'text-black' : 'text-gray-2';

  return (
    <div
      className={`max-w-[500px] ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      <div className="mb-4 text-component-extra-small" id={name}>
        {label}
      </div>
      <div className={`${disabledColor} mb-3 text-small-caption-desktop`}>
        Drag and drop from the list:
      </div>
      <div className="flex flex-col content-start">
        {cards.map((card, i) => renderCard(card, i))}
      </div>
    </div>
  );
};

export default RankChoice;
