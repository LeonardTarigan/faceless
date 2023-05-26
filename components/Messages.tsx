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
    orderBy,
    query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import UFOSvg from './UFOSvg';
import DeleteIcon from './icons/DeleteIcon';
import MessageSkeleton from './MessageSkeleton';

function Messages() {
    const [messages, setMessages] = useState<Message[] | null>(null);
    const [fetchStatus, setFetchStatus] = useState(true);

    const { uid } = useSelector((state: RootState) => state.user);

    const messageCollection = collection(db, `message-${uid}`);

    const handleDelete = (id: string) => {
        deleteDoc(doc(db, `message-${uid}`, id))
            .then(() => {
                toast.success('Message Deleted!');
                setFetchStatus(true);
            })
            .catch((error: FirebaseError) => toast.error(error.message));
    };

    useEffect(() => {
        if (fetchStatus) {
            getDocs(query(messageCollection, orderBy('timestamp', 'desc')))
                .then((res) => {
                    const messageArray = res.docs.map((item) => {
                        const { text, timestamp, id } = item.data();

                        const date = getFormattedDate(timestamp.seconds);

                        return { id: item.id, text: text, timestamp: date };
                    });

                    setMessages(messageArray);
                    setFetchStatus(false);
                })
                .catch((error: FirebaseError) => {
                    toast.error(error.message);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid, fetchStatus]);

    return (
        <section className='rounded-xl bg-slate-800 p-5'>
            <h2 className='mb-5 text-center text-xl font-semibold'>
                Inbox ({messages?.length ?? '...'})
            </h2>

            {messages === null && <MessageSkeleton />}

            <div className='flex flex-col gap-2'>
                {messages?.length === 0 && (
                    <UFOSvg className='mx-auto mt-5 h-44 w-44' />
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
        </section>
    );
}

export default Messages;
