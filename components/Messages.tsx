import { db } from '@/firebase/clientApp';
import { Message } from '@/lib/interfaces';
import { getFormattedDate } from '@/lib/utilFunctions';
import { RootState } from '@/redux/store';
import { FirebaseError } from 'firebase/app';
import {
    collection,
    limit,
    onSnapshot,
    orderBy,
    query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import DeleteConfirmation from './DeleteConfirmation';
import LoadingSpinner from './LoadingSpinner';
import MessageSkeleton from './MessageSkeleton';
import UFOSvg from './UFOSvg';
import DeleteIcon from './icons/DeleteIcon';

function Messages() {
    const [messages, setMessages] = useState<Message[] | null>(null);
    const [fetchStatus, setFetchStatus] = useState(true);
    const [maxItem, setMaxItem] = useState(5);
    const [hasReachedMax, setHasReachedMax] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentId, setCurrentId] = useState('');

    const { uid } = useSelector((state: RootState) => state.user);

    const messageCollection = collection(db, `users/${uid}/messages`);

    const fetchMore = () => {
        if (!hasReachedMax) {
            setMaxItem(maxItem + 5);
            setFetchStatus(true);
        }
    };

    const handleOpenModal = (id: string) => {
        setOpenDialog(true);
        setCurrentId(id);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                messageCollection,
                orderBy('timestamp', 'desc'),
                limit(maxItem)
            ),
            (snapshot) => {
                const messageArray = snapshot.docs.map((item) => {
                    const { text, timestamp } = item.data();
                    const date = getFormattedDate(timestamp.seconds);
                    return { id: item.id, text: text, timestamp: date };
                });

                if (JSON.stringify(messages) === JSON.stringify(messageArray)) {
                    setHasReachedMax(true);
                }

                setMessages(messageArray);
                setFetchStatus(false);
            },
            (error: FirebaseError) => {
                toast.error(error.message);
                setFetchStatus(false);
            }
        );

        return () => {
            unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid, maxItem]);

    return (
        <section className='flex flex-col items-center gap-5 rounded-xl bg-slate-800 p-5'>
            <h2 className='text-center text-xl font-semibold'>INBOX</h2>

            {messages === null && <MessageSkeleton />}

            <DeleteConfirmation
                isOpen={openDialog}
                currentId={currentId}
                setOpenDialog={setOpenDialog}
                setFetchStatus={setFetchStatus}
            />

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
                                    onClick={() => handleOpenModal(msg.id)}
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
                    messages !== null && messages?.length >= 5 && !hasReachedMax
                        ? ''
                        : 'hidden'
                } flex h-10 w-32 items-center justify-center rounded-md bg-indigo-700 active:translate-y-1`}
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
