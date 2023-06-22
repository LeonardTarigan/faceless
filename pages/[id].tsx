import UFOSvg from '@/components/UFOSvg';
import MainLayout from '@/layouts/MainLayout';
import { FirebaseError } from 'firebase/app';
import { Timestamp, addDoc, collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { db } from '../firebase/clientApp';
import PublicFormSkeleton from '@/components/PublicFormSkeleton';

function MessageInput() {
    const router = useRouter();
    const { id } = router.query;

    const [targetUser, setTargetUser] = useState<string | null>(null);
    const [targetFound, setTargetFound] = useState(true);

    const userCollection = collection(db, 'users');
    const targetCollection = collection(db, `users/${id}/messages`);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const getUsername = () => {
        getDocs(userCollection)
            .then((res) => {
                const userArray = res.docs.map((item) => {
                    return item.data();
                });

                const index = userArray.findIndex((user) => user.uid === id);

                if (index < 0) {
                    setTargetFound(false);
                } else {
                    setTargetFound(true);
                    setTargetUser(userArray[index]?.username);
                }
            })
            .catch((error: FirebaseError) => toast.error(error.message));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        toast.promise(
            addDoc(targetCollection, {
                targetId: id,
                text: inputRef.current?.value ?? '',
                timestamp: Timestamp.fromDate(new Date()),
            }).catch((error: FirebaseError) => toast.error(error.message)),
            {
                loading: 'Sending...',
                success: 'Message sent!',
                error: 'Message not sent!',
            }
        );
    };

    useEffect(() => {
        getUsername();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <MainLayout title='Write Message'>
            <form
                onSubmit={handleSubmit}
                className={`${
                    targetFound ? '' : 'hidden'
                } flex w-full flex-col gap-5 rounded-xl bg-slate-800 p-5`}
            >
                {targetUser ? (
                    <>
                        <h3 className={`text-center text-xl font-semibold`}>
                            Write a message to {targetUser}
                        </h3>
                        <textarea
                            ref={inputRef}
                            required
                            placeholder='Write your message here'
                            className='h-20 rounded-md bg-slate-700 p-2 outline-[1.5px] outline-offset-2 invalid:outline-rose-500 focus:outline'
                        />
                        <button className='h-11 rounded-md border-[1.5px] border-indigo-700 bg-indigo-700 font-semibold transition-all duration-150 hover:bg-transparent hover:text-indigo-700 active:translate-y-1'>
                            Send
                        </button>
                    </>
                ) : (
                    <PublicFormSkeleton />
                )}
            </form>

            <div
                className={`${
                    targetFound ? 'hidden' : ''
                } flex w-full flex-col items-center gap-10 rounded-xl bg-slate-800 p-5 text-center text-xl font-semibold`}
            >
                <h3>User Not Found!</h3>

                <UFOSvg className='h-44 w-44' />
            </div>
        </MainLayout>
    );
}

export default MessageInput;
