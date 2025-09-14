import React from 'react';
import { SubmissionStatus } from '../types';

interface StatusMessageProps {
  status: SubmissionStatus;
  message: string;
}

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ExclamationCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const StatusMessage: React.FC<StatusMessageProps> = ({ status, message }) => {
  if (status === SubmissionStatus.IDLE || status === SubmissionStatus.LOADING) {
    return null;
  }

  const isSuccess = status === SubmissionStatus.SUCCESS;

  const config = isSuccess ? {
    bgColor: 'bg-green-900/50', textColor: 'text-green-300', borderColor: 'border-green-500/50',
    icon: <CheckCircleIcon className="h-5 w-5 mr-3" /> 
  } : {
    bgColor: 'bg-red-900/50', textColor: 'text-red-300', borderColor: 'border-red-500/50',
    icon: <ExclamationCircleIcon className="h-5 w-5 mr-3" />
  };

  return (
    <div 
      className={`mt-4 p-4 rounded-md border ${config.borderColor} ${config.bgColor} ${config.textColor} flex items-center transition-opacity duration-300`}
      role="alert"
    >
      {config.icon}
      <span className="font-medium">{message}</span>
    </div>
  );
};
