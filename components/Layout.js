import Nav from '@/components/Nav';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from './Logo';

export default function Layout({ children }) {
  const { data: session } = useSession();
  const [showNav, setShowNav] = useState(false);

  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen items-center flex">
        <div className="text-center w-full">
          <button
            onClick={() => signIn('google')}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <div className="block bg-blue-900 md:hidden text-white flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6 ">
          <Logo />
        </div>
      </div>

      <div className="flex h-screen">
        <Nav show={showNav} />
        <div className="flex-grow h-100 p-6 bg-gray-200">
          {children}
          <ToastContainer position="bottom-center" limit={1} />
        </div>
      </div>
    </div>
  );
}
