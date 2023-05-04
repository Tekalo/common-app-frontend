export interface ITestimonialSection {}

const TestimonialSection: React.FC<ITestimonialSection> = () => {
  return (
    <section className="bg-light-orange">
      {/* TITLE */}
      <div className="m-auto max-w-content-area px-7 py-10 md:px-24 md:pb-14 lg:py-28 lg:pb-20">
        <div className="relative m-auto max-w-[320px] md:max-w-[428px] lg:max-w-[640px]">
          <div className="relative h-0 pb-[67%]">
            {/* TODO: Obviously this is a placeholder video, right now the
                      aspect ratio is set to 3:2. If we want to change the ratio
                      when we update the video, all we need to do is change the 
                      padding-bottom on this element accordingly:
                      https://faq.dailymotion.com/hc/en-us/articles/360022841393-How-to-preserve-the-player-aspect-ratio-on-a-responsive-page
             */}
            <iframe
              className="absolute left-0 top-0 h-full w-full border-0"
              src="https://www.youtube.com/embed/Yw6u6YkTgQ4?controls=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
