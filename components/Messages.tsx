import { useEffect, useState } from 'react';
import DeleteIcon from './icons/DeleteIcon';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/clientApp';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FirebaseError } from 'firebase/app';
import { toast } from 'react-hot-toast';

function Messages() {
    const [messages, setMessages] = useState<string[]>([]);

    const { uid } = useSelector((state: RootState) => state.user);

    const messageCollection = collection(db, `message-${uid}`);

    useEffect(() => {
        getDocs(messageCollection)
            .then((res) => {
                const messageArray = res.docs.map((item) => {
                    return item.data().message;
                });

                setMessages(messageArray);
            })
            .catch((error: FirebaseError) => {
                toast.error(error.message);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uid]);

    return (
        <section className='rounded-xl bg-slate-800 p-5'>
            <h2 className='text-center text-xl font-semibold'>
                My Messages ({messages.length})
            </h2>

            <div className='mt-5 flex flex-col gap-2'>
                {messages.map((msg, index) => {
                    return (
                        <div
                            key={index}
                            className='flex items-start gap-3 rounded-xl bg-slate-700 p-5 transition-colors duration-150'
                        >
                            <p>{msg}</p>

                            <button className='group rounded border-[1.5px] border-rose-500 bg-rose-500 p-1 transition-all duration-150 hover:bg-transparent active:translate-y-1'>
                                <DeleteIcon className='h-5 w-5 group-hover:text-rose-500' />
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Messages;
