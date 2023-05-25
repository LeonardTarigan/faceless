import MainLayout from '@/layouts/MainLayout';
import { Timestamp, addDoc, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { db } from '../firebase/clientApp';
import { toast } from 'react-hot-toast';

function MessageInput() {
    const router = useRouter();
    const { id } = router.query;

    const [targetUser, setTargetUser] = useState<string | null>(null);

    const userCollection = collection(db, 'users');
    const targetCollection = collection(db, `message-${id}`);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const getUsername = async () => {
        getDocs(userCollection).then((res) => {
            const userArray = res.docs.map((item) => {
                return item.data();
            });

            const index = userArray.findIndex((user) => user.uid === id);

            setTargetUser(userArray[index]?.username);
        });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        addDoc(targetCollection, {
            targetId: id,
            text: inputRef.current?.value ?? '',
            timestamp: Timestamp.fromDate(new Date()),
        })
            .then(() => {
                toast.success('Message Sent!');
            })
            .catch((error) => {
                alert(error);
            });
    };

    useEffect(() => {
        getUsername();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <MainLayout title='Write Message'>
            <form
                onSubmit={handleSubmit}
                className='flex w-full flex-col gap-5 rounded-xl bg-slate-800 p-5'
            >
                <h3
                    className={`${
                        targetUser ? '' : 'invisible'
                    } text-center text-xl font-semibold`}
                >
                    Write message to {targetUser}
                </h3>

                <textarea
                    ref={inputRef}
                    className='rounded bg-slate-700 p-2 focus:outline'
                />
                <button className='rounded-md border-[1.5px] border-indigo-700 bg-indigo-700 py-2 font-semibold transition-all duration-150 hover:bg-transparent hover:text-indigo-700 active:translate-y-1'>
                    Send
                </button>
            </form>
        </MainLayout>
    );
}

export default MessageInput;
