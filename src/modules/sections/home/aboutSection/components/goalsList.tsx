import { HOME_ABOUT_TEXT } from '@/lang/en/en';

const GoalsList: React.FC = () => (
  <div className="mb-7 lg:mb-0 lg:ml-[182px]">
    <h3 className="text-center font-display text-h3-mobile lg:text-left lg:text-h3-desktop">
      {HOME_ABOUT_TEXT.GOALS.HEADER}
    </h3>
    <div className="lg:max-w-0 m-auto mt-6 max-w-[544px] pl-7 text-p2-desktop lg:mt-4 lg:w-[115%]">
      <ol className="list-decimal">
        <li>{HOME_ABOUT_TEXT.GOALS.G1}</li>
        <li> {HOME_ABOUT_TEXT.GOALS.G2}</li>
        <li>{HOME_ABOUT_TEXT.GOALS.G3}</li>
      </ol>
    </div>
  </div>
);

export default GoalsList;
