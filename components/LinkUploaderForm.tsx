import React, { useState, useCallback } from 'react';
import { submitLinks } from '../services/googleSheetService';
import { SubmissionStatus } from '../types';
import { StatusMessage } from './StatusMessage';

const Spinner: React.FC = () => (
  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const LinkUploaderForm: React.FC = () => {
  const [links, setLinks] = useState('');
  const [status, setStatus] = useState<SubmissionStatus>(SubmissionStatus.IDLE);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!links.trim()) {
      setStatus(SubmissionStatus.ERROR);
      setMessage('No hay links para enviar. Pega algunos links en el área de texto.');
      return;
    }

    setIsSubmitting(true);
    setStatus(SubmissionStatus.LOADING);
    setMessage('Enviando links a Google Sheets...');

    try {
      await submitLinks(links);
      setStatus(SubmissionStatus.SUCCESS);
      setMessage('¡Links enviados con éxito!');
      setLinks(''); // Clear textarea on success
    } catch (error) {
      setStatus(SubmissionStatus.ERROR);
      setMessage(error instanceof Error ? error.message : 'Ocurrió un error desconocido.');
    } finally {
      setIsSubmitting(false);
    }
  }, [links]);
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="links" className="block text-sm font-medium text-slate-300 mb-1">
          Links de Propiedades
        </label>
        <textarea
          id="links"
          rows={10}
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          placeholder="Pega aquí los enlaces, uno por línea..."
          className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
          disabled={isSubmitting}
        />
      </div>
      
      {(status !== SubmissionStatus.IDLE && status !== SubmissionStatus.LOADING) && <StatusMessage status={status} message={message} />}

      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting || !links}
      >
        {isSubmitting ? <Spinner /> : 'Enviar a Google Sheets'}
      </button>
    </form>
  );
};
