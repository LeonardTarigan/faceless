import LoginForm from '@/components/LoginForm';
import MainLayout from '@/layouts/MainLayout';
import { setUser } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/store';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
    const { username } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (Cookies.get('user') && !username) {
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
        <MainLayout title='Anonymous Messaging'>
            <LoginForm />
        </MainLayout>
    );
}
