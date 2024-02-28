'use client'

import React from 'react';
import { useRouter } from 'next/router';
import ResidentDetails from './[residentId]';

const ResidentPage = () => {
  const router = typeof window !== 'undefined' ? useRouter() : null;
  const residentId = router?.query.residentId || '';

  console.log('Params Id: ', residentId);

  return <ResidentDetails residentId={residentId as string} />;
};

export default ResidentPage;