import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return <>Logged in {session.user.email}</>;
  }
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
