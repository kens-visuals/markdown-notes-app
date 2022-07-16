import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

import Head from 'next/head';
import Image from 'next/image';

// Context
import { DataContext } from '../contexts/DataContext';

// Components
import Login from '../components/Login';
import Markdown from '../components/Markdown';
import ThemeToggler from '../components/ThemeToggler';
import Navbar from '../components/Navbar';

export default function Home() {
  const { currentUser } = useContext(UserContext);
  const { data } = useContext(DataContext);

  const [currentMarkdown, setCurrentMarkdown] = useState([]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar currentMarkdown={currentMarkdown} />

      <ThemeToggler />

      <Login />

      {/* {currentUser && (
        <>
          <div>
            <h1>{currentUser.displayName}</h1>
            <h1>{currentUser.email}</h1>
            <img src={currentUser.photoURL} alt="" />
          </div>

          <main className="flex ">
            <div>
              {data &&
                data.map((markdown, idx) => (
                  <button
                    key={markdown.id}
                    className={`block text-lg text-red-500 ${
                      currentMarkdown.id === markdown.id && 'text-green-500'
                    }`}
                    onClick={() => setCurrentMarkdown(data[idx])}
                  >
                    {markdown.title}
                  </button>
                ))}
            </div>

            <Markdown currentMarkdown={currentMarkdown} />
          </main>
        </>
      )} */}
    </div>
  );
}
