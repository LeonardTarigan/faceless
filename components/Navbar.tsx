import Link from 'next/link';
import ProfileButton from './ProfileButton';
import LogoIcon from './icons/LogoIcon';

function Navbar() {
    return (
        <nav className='z-50 mt-2 flex justify-between rounded-xl bg-slate-800 p-5'>
            <Link
                href={'/'}
                className='flex items-center gap-2 text-xl font-bold'
            >
                <LogoIcon className='h-5 w-5 fill-white' />
                <h1>FACELESS</h1>
            </Link>

            <ProfileButton />
        </nav>
    );
}

export default Navbar;
