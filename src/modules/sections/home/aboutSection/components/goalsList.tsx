import { HOME_ABOUT_TEXT } from '@/lang/en';

const GoalsList: React.FC = () => (
  <div className="mb-8">
    <h3 className="text-center font-display text-h3-mobile">
      {HOME_ABOUT_TEXT.GOALS.HEADER}
    </h3>
    <div className="m-auto mt-6 max-w-[590px] pl-7 text-p1-mobile">
      <ol className="list-decimal">
        <li>{HOME_ABOUT_TEXT.GOALS.G1}</li>
        <li> {HOME_ABOUT_TEXT.GOALS.G2}</li>
        <li>{HOME_ABOUT_TEXT.GOALS.G3}</li>
      </ol>
    </div>
  </div>
);

export default GoalsList;
