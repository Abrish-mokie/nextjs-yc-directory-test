import { auth, signOut, signIn } from '@/auth';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className='py-3 px-5 bg-white font-work-sans shadow-sm'>
      <nav className='flex justify-between items-center'>
        <Link href={'/'}>
          <Image src='/logo.png' alt='logo' width={144} height={30} />
        </Link>
        <div className='flex items-center gap-5 text-black'>
          {session && session?.user ? (
            <>
              <Link href='/startup/create'>
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button type='submit'>Logout</button>
              </form>
              <Link href={`/users/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <>
              <form
                action={async () => {
                  'use server';

                  await signIn('github');
                }}
              >
                <button type='submit'>Login</button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
