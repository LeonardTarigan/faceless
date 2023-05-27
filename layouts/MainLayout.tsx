import Navbar from '@/components/Navbar';
import { MainLayout } from '@/lib/interfaces';
import { setUser } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/store';
import { Exo_2 } from 'next/font/google';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Head from 'next/head';

const mainFont = Exo_2({
    weight: ['300', '400', '700'],
    subsets: ['latin'],
});

function MainLayout(props: MainLayout) {
    const dispatch = useDispatch();
    const { username } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (Cookies.get('user') && username === null) {
            const { displayName, email, photoURL, uid } = JSON.parse(
                Cookies.get('user')
            );
            dispatch(
                setUser({
                    uid: uid,
                    username: displayName,
                    email: email,
                    imageUrl: photoURL,
                })
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    return (
        <>
            <Head>
                <meta
                    name='description'
                    content='Anonymous Messaging App'
                ></meta>
                <meta
                    name='keywords'
                    content='message, messaging, anonymous, messaging app, anonymous message'
                ></meta>
                <title>{`FACELESS | ${props.title}`}</title>
            </Head>

            <Toaster position='bottom-right' reverseOrder={false} />

            <div className={`${mainFont.className} flex w-1/2 flex-col gap-5`}>
                <Navbar />
                <main>{props.children}</main>
            </div>
        </>
    );
}

export default MainLayout;
