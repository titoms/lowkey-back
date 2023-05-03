import Nav from '@/components/Nav';
import { useSession, signIn, signOut } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  const { data: session } = useSession();
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
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
      <div className="bg-gray-200 flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        {children}
        <ToastContainer position="bottom-center" limit={1} />
        {/* <button
          onClick={() => signOut('google')}
          className="bg-white p-2 px-4 rounded-lg"
        >
          Logout
        </button> */}
      </div>
    </div>
  );
}
