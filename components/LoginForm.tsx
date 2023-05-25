import { RootState } from '@/redux/store';
import { FirebaseError } from 'firebase/app';
import { signInWithPopup } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { auth, db, provider } from '../firebase/clientApp';
import GoogleIcon from './icons/GoogleIcon';

function LoginForm() {
    const router = useRouter();

    const [showButton, setShowButton] = useState(true);

    const userCollection = collection(db, 'users');

    const { username } = useSelector((state: RootState) => state.user);

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((res) => {
                let { uid, displayName } = res.user;

                Cookies.set('user', JSON.stringify(res.user), {
                    expires: 30,
                });

                const userRef = doc(userCollection, uid);

                getDoc(userRef)
                    .then((docSnapshot) => {
                        if (!docSnapshot.exists()) {
                            setDoc(
                                userRef,
                                {
                                    username: displayName,
                                    uid: uid,
                                },
                                { merge: true }
                            ).catch((error) => {
                                console.log(error);
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        router.push(`dashboard/${uid}`);
                        toast.success('Logged-in Successfully!');
                    });
            })
            .catch((error: FirebaseError) => toast.error(error.message));
    };

    useEffect(() => {
        username ? setShowButton(false) : setShowButton(true);
    }, [username]);

    return (
        <section
            onSubmit={signInWithGoogle}
            className='flex w-full flex-col items-center justify-between gap-10 rounded-xl bg-slate-800 p-5'
        >
            <div className='text-center'>
                <h2 className='text-2xl font-bold'>Anonymous Messaging</h2>
                <p className='mt-2 text-sm'>
                    Experience the power of anonymous communication with
                    Faceless, the messaging app that embraces open conversations
                    without the need for personal identification. With Faceless,
                    authenticity takes center stage, fostering meaningful
                    discussions and uninhibited expression. Welcome to Faceless,
                    where anonymity empowers genuine connections.
                </p>
            </div>

            <div
                className={`${
                    showButton ? '' : 'hidden'
                } flex w-full flex-col items-center gap-3`}
            >
                <button
                    onClick={() => signInWithGoogle()}
                    className='flex w-full items-center justify-center gap-2 rounded-lg border-[1.5px] bg-slate-100 py-2 font-bold text-slate-900 transition-colors duration-150 hover:bg-transparent hover:text-white'
                >
                    <GoogleIcon className='h-5 w-5' />
                    Login with Google
                </button>
            </div>
        </section>
    );
}

export default LoginForm;
