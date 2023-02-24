import Profile from "@/components/Profile";
import Head from "next/head";

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
        <div className="flex flex-col space-y-5">
          <p className="text-3xl font-bold underline">
            Schmidt Futures Common App Test
          </p>
          <Profile />
        </div>
      </main>
    </>
  );
}
