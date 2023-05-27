import { RootState } from '@/redux/store';
import { FirebaseError } from 'firebase/app';
import { signInWithPopup } from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { auth, db, provider } from '../firebase/clientApp';
import GoogleIcon from './icons/GoogleIcon';
import LogoIcon from './icons/LogoIcon';

function LoginForm() {
    const router = useRouter();

    const [showLoginButton, setShowLoginButton] = useState(true);

    const userCollection = collection(db, 'users');

    const { username } = useSelector((state: RootState) => state.user);

    const signInWithGoogle = () => {
        toast.promise(
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
                        .catch((error: FirebaseError) => {
                            toast.error(error.message);
                        })
                        .finally(() => {
                            router.push('/dashboard');
                        });
                })
                .catch((error: FirebaseError) => toast.error(error.message)),
            {
                loading: 'Logging-in...',
                success: 'Logged-in succesfully!',
                error: 'Login failed!',
            }
        );
    };

    useEffect(() => {
        username ? setShowLoginButton(false) : setShowLoginButton(true);
    }, [username]);

    return (
        <section
            onSubmit={signInWithGoogle}
            className='relative flex w-full flex-col items-center justify-between gap-10 overflow-hidden rounded-xl bg-slate-800 p-5'
        >
            <div className='z-10 text-center'>
                <h2 className='text-xl font-bold'>ANONYMOUS MESSAGING</h2>
                <p className='mt-2 text-sm'>
                    Welcome to Faceless, where anonymity empowers genuine
                    connections. Experience the power of anonymous communication
                    with Faceless, the messaging app that embraces open
                    conversations without the need for personal identification.
                </p>

                <LogoIcon className='absolute -right-16 -top-10 -z-10 h-72 w-72 fill-slate-700' />
            </div>

            <button
                onClick={() => signInWithGoogle()}
                className={`${
                    showLoginButton ? '' : 'hidden'
                } z-10 flex w-full flex-col items-center gap-3`}
            >
                <div className='flex w-full items-center justify-center gap-2 rounded-md border-[1.5px] bg-slate-100 py-2 font-bold text-slate-900 transition-colors duration-150 hover:bg-transparent hover:text-white'>
                    <GoogleIcon className='h-5 w-5' />
                    Login with Google
                </div>
            </button>

            <Link
                href={`/dashboard`}
                className={`${
                    showLoginButton ? 'hidden' : ''
                } z-10 w-full rounded-md border-[1.5px] border-indigo-700 bg-indigo-700 py-2 text-center font-bold transition-colors duration-150 hover:bg-transparent hover:text-indigo-700`}
            >
                Go to Dashboard
            </Link>
        </section>
    );
}

export default LoginForm;
