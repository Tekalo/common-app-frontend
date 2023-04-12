import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>CommonApp</title>
      </Head>
      <div
        className={`flex min-h-screen min-w-full flex-col items-center text-center`}
      >
        <div className="text-black-text sm:w-[342px] md:w-[462px] lg:w-[544px] w-[320px]">
          {/* Logo */}
          <div className="mt-8">
            <img
              src="/images/logos/TekaloLogo.png"
              alt="Logo"
              className="w-44 mx-auto"
            />
          </div>
          {/* Tagline */}
          <div className="mt-4 text-component-small">
            {'Match to what matters; build a better world.'}
          </div>
          {/* Header */}
          <div className="mt-20 text-h2-mobile sm:text-h1-mobile lg:text-h1-desktop">
            {'Coming soon!'}
          </div>
          {/* Paragraph */}
          <div className="mt-8 text-p1-mobile lg:text-p1-desktop">
            {
              'If you are an impact-driven organization looking to recruit full-time or part-time technical talent, you can submit opportunities for consideration using this early sign-up form:'
            }
          </div>
          {/* Button */}
          <div className="mt-10 flex w-full justify-center">
            {' '}
            {/* Add mx-auto class for centering */}
            <button
              onClick={() => {}}
              className={
                'h-12 bg-blue-1 font-sans text-component-large text-white hover:bg-blue-2 active:border-blue-3 active:bg-blue-3 disabled:border-blue-4 disabled:bg-blue-4 disabled:text-white md:w-[296px] lg:w-[352px] group group flex w-[294px] min-w-[118px] flex-row content-center items-center justify-center rounded transition-colors focus-visible:ring-2 focus-visible:ring-[#A7C4DB]'
              }
            >
              <div className="flex items-center justify-center">
                {'Get started'}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
