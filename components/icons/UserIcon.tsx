import { CustomableIcon } from '@/lib/interfaces';

function UserIcon(props: CustomableIcon) {
    return (
        <svg
            aria-hidden='true'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            className={props.className}
        >
            <path
                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                strokeLinecap='round'
                strokeLinejoin='round'
            ></path>
        </svg>
    );
}

export default UserIcon;
