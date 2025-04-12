'use client'
import type { NextPage } from 'next';
import Head from 'next/head';
import { ChatBot } from '@/components/ChatBot';

export const ChatPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>AI Chat Assistant</title>
        <meta name="description" content="Chat with our AI assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
        <div className="w-full max-w-4xl h-[80vh]">
          <ChatBot />
        </div>
      </main>
    </>
  );
};
