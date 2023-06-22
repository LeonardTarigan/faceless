import { setUser } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/store';
import { Menu, Transition } from '@headlessui/react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from './icons/LogoutIcon';
import UserIcon from './icons/UserIcon';

function ProfileButton() {
    const dispatch = useDispatch();

    const router = useRouter();

    const { username, imageUrl } = useSelector(
        (state: RootState) => state.user
    );

    const [display, setDisplay] = useState(false);

    const handleLogout = () => {
        router.push('/');
        Cookies.remove('user');

        dispatch(
            setUser({
                uid: null,
                username: null,
                email: null,
                imageUrl:
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
            })
        );

        toast.success('Logged-out successfully!');
    };

    useEffect(() => {
        username ? setDisplay(true) : setDisplay(false);
    }, [username]);

    return (
        <>
            {display && (
                <Menu as={'div'} className={'relative flex'}>
                    {({ open }) => (
                        <>
                            <Menu.Button>
                                <div className='relative h-10 w-10 overflow-hidden rounded-full bg-slate-700 outline-[1.5px] outline-offset-2 transition-all duration-75 hover:outline'>
                                    <Image
                                        alt='Profile Picture'
                                        fill={true}
                                        className='object-cover'
                                        src={imageUrl}
                                    />
                                </div>
                            </Menu.Button>

                            <Transition
                                show={open}
                                enter='transition duration-100 ease-out'
                                enterFrom='transform scale-95 opacity-0'
                                enterTo='transform scale-100 opacity-100'
                                leave='transition duration-75 ease-out'
                                leaveFrom='transform scale-100 opacity-100'
                                leaveTo='transform scale-95 opacity-0'
                            >
                                <Menu.Items
                                    className={
                                        'absolute right-0 mt-12 flex w-36 flex-col overflow-hidden rounded-xl bg-slate-700 text-sm font-semibold shadow-xl'
                                    }
                                >
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href={'/dashboard'}
                                                className={`${
                                                    active && 'bg-indigo-700'
                                                } group flex items-center gap-2 p-3`}
                                            >
                                                <UserIcon className='h-6 w-6' />
                                                Dashboard
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={() => handleLogout()}
                                                className={`${
                                                    active && 'bg-indigo-700'
                                                } group flex items-center gap-2 p-3`}
                                            >
                                                <LogoutIcon className='h-6 w-6' />
                                                Logout
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            )}
        </>
    );
}

export default ProfileButton;
