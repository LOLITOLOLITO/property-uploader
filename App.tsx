
import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LinkUploaderForm } from './components/LinkUploaderForm';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans text-white p-4 bg-slate-900">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main>
          <LinkUploaderForm />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
