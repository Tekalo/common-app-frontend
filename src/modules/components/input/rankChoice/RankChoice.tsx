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
  index: number;
}

const RankChoice: React.FC<IRankChoice> = ({ label, name, items }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [cards, setCards] = useState([...items]);

  const renderCard = useCallback((card: RankChoiceItem, i: number) => {
    return (
      <RankChoiceCard
        key={i}
        index={i}
        text={card.text}
        value={card.value}
        moveCard={moveCard}
        setIsDragging={setIsDragging}
        otherIsDragging={isDragging}
      />
    );
  }, []);

  // Actually moves the card
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: RankChoiceItem[]) => {
      console.log(`drag: ${dragIndex} hover: ${hoverIndex}`);
      const newCards = [...prevCards];

      // This just moves the item from dragIndex to hoverIndex in the array
      newCards.splice(hoverIndex, 0, newCards.splice(dragIndex, 1)[0]);

      console.log(newCards);

      return newCards;
    });
  }, []);

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
