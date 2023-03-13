export interface IHowItWorks {
  sampleTextProp: string;
}

/**
 * TODO: Likely will make a reusable component from (https://tailwind-elements.com/docs/standard/components/timeline/#basic)
 *
 * After that this one should call that component and pass a list of items. Each item should have: {label: string, title: string, text: string}
 *
 * The child component will render a new timeline item with each of these passed in
 *
 * This component will also actually render TWO of those components - one for organizations and the other for candidates.
 *
 * TODO: Create Timeline component (see above)
 * TODO: Create toggle component (two link nav basically)
 * TODO: useState for current toggle w/ conditional render
 *
 * Maybe use one timeline component but conditionally pass in different arrays of items? That sounds like a better move...
 */
const HowItWorks: React.FC<IHowItWorks> = ({ sampleTextProp }) => {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
      {sampleTextProp}
    </div>
  );
};

export default HowItWorks;
