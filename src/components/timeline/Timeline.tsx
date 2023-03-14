import { ITimelineItem } from '@/lib/types';

export interface ITimeline {
  timelineItems: Array<ITimelineItem>;
}

// TODO: Expect array of ITimelineItem

const Timeline: React.FC<ITimeline> = ({ timelineItems }) => {
  return (
    <div className="px-96 pt-14">
      <ol className="border-l-2 border-solid border-blue-1-primary">
        <li>
          <div className="flex-start flex items-center">
            <div className="align -ml-[29px] mr-3 h-14 w-14 rounded-full bg-blue-1-primary text-center">
              1
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-300">
              01.07.2021
            </p>
          </div>
          <div className="mt-2 ml-4 mb-6">
            <h4 className="text-xl mb-1.5 font-semibold">Title of section 1</h4>
            <p className="mb-3 text-neutral-500 dark:text-neutral-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              scelerisque diam non nisi semper, et elementum lorem ornare.
              Maecenas placerat facilisis mollis. Duis sagittis ligula in
              sodales vehicula.
            </p>
          </div>
        </li>
        <li>
          <div className="flex-start flex items-center pt-2">
            <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500"></div>
            <p className="text-sm text-neutral-500 dark:text-neutral-300">
              13.09.2021
            </p>
          </div>
          <div className="mt-2 ml-4 mb-6">
            <h4 className="text-xl mb-1.5 font-semibold">Title of section 2</h4>
            <p className="mb-3 text-neutral-500 dark:text-neutral-300">
              Libero expedita explicabo eius fugiat quia aspernatur autem
              laudantium error architecto recusandae natus sapiente sit nam
              eaque, consectetur porro molestiae ipsam an deleniti.
            </p>
          </div>
        </li>
        <li>
          <div className="flex-start flex items-center pt-2">
            <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500"></div>
            <p className="text-sm text-neutral-500 dark:text-neutral-300">
              25.11.2021
            </p>
          </div>
          <div className="mt-2 ml-4 pb-5">
            <h4 className="text-xl mb-1.5 font-semibold">Title of section 3</h4>
            <p className="mb-3 text-neutral-500 dark:text-neutral-300">
              Voluptatibus temporibus esse illum eum aspernatur, fugiat suscipit
              natus! Eum corporis illum nihil officiis tempore. Excepturi illo
              natus libero sit doloremque, laborum molestias rerum pariatur quam
              ipsam necessitatibus incidunt, explicabo.
            </p>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default Timeline;
