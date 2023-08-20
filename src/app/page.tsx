import React from 'react'
import { options } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import type { GetServerSideProps } from 'next';

async function page() {
  let session = await getServerSession(options);

  console.log(session);
  return (
    <div>Home</div>
  )
}

export default page