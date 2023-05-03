import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-blue-900 flex overflow-hidden justify-between">
        <h1>
          Hello <b>{session?.user?.name}</b>
        </h1>
        <div className="flex text-black gap-1">
          <img
            src={session?.user?.image}
            className="w-6 h-6 rounded-full"
            alt="Profile pic"
          />
          <span className="px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
