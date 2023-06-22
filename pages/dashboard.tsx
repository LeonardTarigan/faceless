import DashboardHeadSkeleton from '@/components/DashboardHeadSkeleton';
import Messages from '@/components/Messages';
import MainLayout from '@/layouts/MainLayout';
import { getGreeting } from '@/lib/utilFunctions';
import { RootState } from '@/redux/store';
import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

function Dashboard() {
    const { username, uid } = useSelector((state: RootState) => state.user);

    const linkRef = useRef<HTMLInputElement>(null);

    const handleCopyClick = () => {
        if (linkRef.current) {
            navigator.clipboard
                .writeText(linkRef.current.value)
                .then(() => {
                    toast.success('Copied to clipboard!');
                })
                .catch((error) => {
                    toast.error(error);
                });
        }
    };

    return (
        <MainLayout title={username ?? 'User'}>
            <div className='flex flex-col gap-5'>
                <section className='flex flex-col justify-between gap-5 rounded-xl bg-slate-800 p-5'>
                    {username ? (
                        <>
                            <div>
                                <h1 className='text-xl font-semibold'>
                                    {`${getGreeting()}, ${username}`}
                                </h1>
                                <p>Share the link below to receive messages</p>
                            </div>

                            <div className='flex gap-2'>
                                <input
                                    ref={linkRef}
                                    type='text'
                                    name='code'
                                    id='code'
                                    value={`https://faceless-message.vercel.app/${uid}`}
                                    disabled
                                    className='w-full rounded-md bg-slate-700 p-2'
                                />
                                <button
                                    onClick={handleCopyClick}
                                    className='whitespace-nowrap rounded-md border-[1.5px] border-indigo-700 bg-indigo-700 p-2 font-semibold transition-all duration-150 hover:bg-transparent hover:text-indigo-500 active:translate-y-1'
                                >
                                    Copy Link
                                </button>
                            </div>
                        </>
                    ) : (
                        <DashboardHeadSkeleton />
                    )}
                </section>

                <Messages />
            </div>
        </MainLayout>
    );
}

export default Dashboard;
