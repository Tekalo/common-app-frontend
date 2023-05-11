import Head from 'next/head';

const Home = () => {
  const handleButtonClick = () => {
    // Specify the URL of the external page to open
    const externalUrl = 'https://airtable.com/shrIpkhetnBCJT0y9';

    // Open the external page in a new window or tab
    window.open(externalUrl, '_blank');
  };

  return (
    <>
      <Head>
        <title>Tekalo | Do Good</title>
      </Head>
      <div
        className={`flex max-h-screen min-h-screen min-w-full flex-col items-center text-center align-middle`}
      >
        <div className="mt-6 w-[312px] text-black-text sm:w-[342px] md:mt-8 md:w-[462px] lg:w-[544px]">
          {/* Logo Stuff */}
          <div className="space-y-2">
            {/* Logo */}
            <img
              src="/images/logos/TekaloLogo.png"
              alt="Logo"
              className="mx-auto w-44"
            />
            {/* Tagline */}
            <div className="text-component-small">
              {'Match to what matters; build a better world.'}
            </div>
          </div>

          {/* HeadLines */}
          <div className="mt-8 space-y-4 md:mt-16 md:space-y-6">
            {/* Header */}
            <div className="text-h2-mobile md:text-h2-desktop">
              {'Coming soon!'}
            </div>
            {/* Sub Header */}
            <div className="text-p1-mobile md:text-p1-desktop">
              {
                'Tekalo is an initiative that matches technical talent with impact-driven organizations.'
              }
            </div>
          </div>

          {/* Paragraph */}
          <div className="mt-6 space-y-4 px-2 text-p2-mobile md:mt-8 md:space-y-6 md:text-p2-desktop">
            <div className="">
              <span className="font-bold">{'TE'}</span>
              {
                '•ka•lo = Tech + Kalo (‘good’ in Greek) Tekalo refers to using technology to build a better world.'
              }
            </div>
            <div>
              {
                "Now more than ever, impact-driven organizations need technical talent that is passionate about solving some of the world's biggest, most pressing problems."
              }
            </div>
            <div>
              {
                'If you are an impact-driven organization looking to recruit full-time or part-time technical talent, you can submit opportunities for consideration using this early sign-up form:'
              }
            </div>
          </div>

          {/* Button */}
          <div className="mt-8 flex w-full justify-center">
            {/* Add mx-auto class for centering */}
            <button
              onClick={handleButtonClick}
              className={
                'group group flex h-12 w-[294px] min-w-[118px] flex-row content-center items-center justify-center rounded bg-blue-1 font-sans text-component-large text-white transition-colors hover:bg-blue-2 focus-visible:ring-2 focus-visible:ring-[#A7C4DB] active:border-blue-3 active:bg-blue-3 disabled:border-blue-4 disabled:bg-blue-4 disabled:text-white md:w-[296px] lg:w-[352px]'
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
