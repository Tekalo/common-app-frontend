const TestimonialSection: React.FC = () => {
  return (
    <section className="bg-light-orange">
      {/* TITLE */}
      <div className="m-auto max-w-content-area px-7 py-10 md:px-24 md:pb-14 lg:py-28 lg:pb-20">
        <div className="relative m-auto max-w-[320px] md:max-w-[428px] lg:max-w-[640px]">
          <div className="relative h-0 pb-[56.25%]">
            <iframe
              className="absolute left-0 top-0 h-full w-full border-0"
              src="https://www.youtube.com/embed/-a_Pfo7JMEM?controls=0"
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
