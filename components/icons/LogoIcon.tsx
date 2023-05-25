import { CustomableIcon } from '@/lib/interfaces';

function LogoIcon(props: CustomableIcon) {
    return (
        <svg
            viewBox='0 0 159 159'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={props.className}
        >
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M25.1629 131.233C40.015 148.192 59.9176 159 79.5004 159C99.0828 159 118.985 148.192 133.837 131.233C148.76 114.194 159 90.5166 159 63.8788V63.7866C159 58.2989 159.001 42.2724 148.775 27.5858C138.247 12.4678 117.82 0 79.5004 0C41.1803 0 20.7531 12.4678 10.2258 27.5858C-0.00130321 42.2728 -0.000314391 58.2993 3.60945e-06 63.7869V63.8788C3.60945e-06 90.5166 10.24 114.194 25.1629 131.233ZM65.4709 86.5384C68.3855 86.4561 70.6667 84.0796 70.6667 81.1638C70.6667 74.4689 70.6667 44.1667 31.9537 44.1667C31.2668 44.1667 30.592 44.1762 29.9292 44.1949C27.0146 44.2776 24.7333 46.6541 24.7333 49.5698C24.7333 56.2644 24.7333 86.567 63.4463 86.567C64.1332 86.567 64.808 86.5575 65.4709 86.5384ZM88.3333 81.1638C88.3333 84.0796 90.6145 86.4561 93.5291 86.5384C94.192 86.5575 94.8668 86.567 95.5537 86.567C134.267 86.567 134.267 56.2644 134.267 49.5698C134.267 46.6541 131.986 44.2776 129.071 44.1949C128.408 44.1762 127.733 44.1667 127.046 44.1667C88.3333 44.1667 88.3333 74.4689 88.3333 81.1638ZM55.3599 110.423C58.8346 108.107 61.3729 110.478 63.5859 112.968C64.2798 113.749 65.3476 114.819 66.7796 115.893C69.6286 118.03 73.8403 120.133 79.4997 120.133C85.1593 120.133 89.3711 118.03 92.2196 115.893C93.6521 114.819 94.7198 113.749 95.4134 112.968C97.5628 110.551 100.158 108.102 103.64 110.423C107.432 112.952 105.767 117.276 103.336 120.011C102.263 121.218 100.681 122.797 98.5796 124.373C94.3619 127.537 87.9736 130.733 79.4997 130.733C71.026 130.733 64.6377 127.537 60.4196 124.373C58.3187 122.797 56.7365 121.218 55.6634 120.011C53.2328 117.276 51.5679 112.951 55.3599 110.423Z'
            />
        </svg>
    );
}

export default LogoIcon;
