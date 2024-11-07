import { auth, signOut, signIn } from '@/auth';
import { BadgePlus, LogOut } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

const Navbar = async () => {
  const session = await auth();

  {
    console.log('your session in nav bar is: ', session?.id);
  }

  return (
    <header className='py-3 px-5 bg-white font-work-sans shadow-sm'>
      <nav className='flex justify-between items-center'>
        <Link href={'/'}>
          <Image src='/logo.png' alt='logo' width={144} height={30} />
        </Link>
        <div className='flex items-center justify-center gap-5 text-black'>
          {session && session?.user ? (
            <>
              <Link href='/startup/create'>
                <span className='max-sm:hidden'>Create</span>
                <BadgePlus className='size-6 sm:hidden ' />
              </Link>

              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
                className='flex justify-center'
              >
                <button type='submit'>
                  <span className='max-sm:hidden'>Logout</span>
                  <LogOut className='size-6 sm:hidden text-red-500' />
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className='size-10'>
                  <AvatarImage
                    src={session?.user?.image}
                    alt={session?.user?.name}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
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
