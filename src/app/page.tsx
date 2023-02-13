// ./app/page.tsx
import type { FC } from "react";

const Home = async (): Promise<ReturnType<FC>> => {
  const uuid = await fetch("https://uuid.rocks/plain").then(
    async (response) => await response.text()
  );

  return (
    <div>
      <main>
        <h1>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p>
          Get started by editing <code>pages/index.tsx</code>
        </p>

        <p>
          Here&apos;s a server-side UUID:
          <code>{uuid}</code>
        </p>
      </main>
    </div>
  );
};

export default Home;
