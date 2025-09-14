
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
        Property Link Uploader
      </h1>
      <p className="text-slate-400 mt-2">
        Pega los enlaces de propiedades para enviarlos directamente a Google Sheets.
      </p>
    </header>
  );
};
