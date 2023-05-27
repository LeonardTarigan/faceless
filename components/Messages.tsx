import { db } from '@/firebase/clientApp';
import { Message } from '@/lib/interfaces';
import { getFormattedDate } from '@/lib/utilFunctions';
import { RootState } from '@/redux/store';
import { FirebaseError } from 'firebase/app';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import LoadingSpinner from './LoadingSpinner';
import MessageSkeleton from './MessageSkeleton';
import UFOSvg from './UFOSvg';
import DeleteIcon from './icons/DeleteIcon';

function Messages() {
    const [messages, setMessages] = useState<Message[] | null>(null);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [maxItem, setMaxItem] = useState(5);
    const [hasReachedMax, setHasReachedMax] = useState(false);

    const { uid } = useSelector((state: RootState) => state.user);

    const messageCollection = collection(db, `message-${uid}`);

    const handleDelete = (id: string) => {
        toast.promise(
            deleteDoc(doc(db, `message-${uid}`, id))
                .then(() => {
                    setFetchStatus(true);
                })
                .catch((error: FirebaseError) => toast.error(error.message)),
            {
                loading: 'Deleting...',
                success: 'Message deleted!',
                error: 'Could not delete!',
            }
        );
    };

    const fetchMore = () => {
        setMaxItem(maxItem + 5);
        setFetchStatus(true);
    };

    useEffect(() => {
        if (fetchStatus && !hasReachedMax) {
            getDocs(
                query(
                    messageCollection,
                    orderBy('timestamp', 'desc'),
                    limit(maxItem)
                )
            )
                .then((res) => {
                    const messageArray = res.docs.map((item) => {
                        const { text, timestamp } = item.data();

                        const date = getFormattedDate(timestamp.seconds);

                        return { id: item.id, text: text, timestamp: date };
                    });

                    if (messages?.length === messageArray.length) {
                        setHasReachedMax(true);
                    } else {
                        setMessages(messageArray);
                    }
                })
                .catch((error: FirebaseError) => {
                    toast.error(error.message);
                })
                .finally(() => {
                    setFetchStatus(false);
                });
        } else {
            setFetchStatus(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid, fetchStatus]);

    return (
        <section className='flex flex-col items-center gap-5 rounded-xl bg-slate-800 p-5'>
            <h2 className='text-center text-xl font-semibold'>INBOX</h2>

            {messages === null && <MessageSkeleton />}

            <div className='flex w-full flex-col gap-2'>
                {messages?.length === 0 && (
                    <div className='flex flex-col items-center gap-2 font-medium italic text-slate-400'>
                        <UFOSvg className='mx-auto mt-2 h-44 w-44' />
                        <span>Your inbox is empty :(</span>
                    </div>
                )}

                {messages?.map((msg) => {
                    return (
                        <div
                            key={msg.id}
                            className='flex flex-col items-start gap-3 rounded-xl bg-slate-700 p-5 transition-colors duration-150'
                        >
                            <div className='flex w-full items-center justify-between gap-5'>
                                <span className='text-sm font-semibold text-slate-400'>
                                    {msg.timestamp}
                                </span>
                                <button
                                    onClick={() => handleDelete(msg.id)}
                                    className='group rounded border-[1.5px] border-rose-500 bg-rose-500 p-1 transition-all duration-150 hover:bg-transparent active:translate-y-1'
                                >
                                    <DeleteIcon className='h-5 w-5 group-hover:text-rose-500' />
                                </button>
                            </div>

                            <p>{msg.text}</p>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={fetchMore}
                className={`${
                    messages && messages.length > 0 ? '' : 'hidden'
                } flex h-10 w-32 items-center justify-center rounded-md bg-indigo-700`}
            >
                {fetchStatus ? (
                    <LoadingSpinner className='h-5 w-5 animate-spin text-white' />
                ) : (
                    <span>See More</span>
                )}
            </button>
        </section>
    );
}

export default Messages;
