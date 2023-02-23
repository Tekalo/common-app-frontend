import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Schmidt Futures Common App</title>
        <meta name="description" content="Built by Schmidt Futures" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">
          Schmidt Futures Common App
        </h1>
        <button className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">
          ...
        </button>
        <div className="p-4 pt-2"></div>
      </main>
    </>
  );
}
