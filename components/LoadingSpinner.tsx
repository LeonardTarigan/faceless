import { CustomableIcon } from '@/lib/interfaces';

function LoadingSpinner(props: CustomableIcon) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='200px'
            height='200px'
            viewBox='0 0 100 100'
            preserveAspectRatio='xMidYMid'
            className={props.className}
        >
            <circle
                cx='50'
                cy='50'
                fill='none'
                stroke='#f1f5f9'
                strokeWidth='10'
                r='35'
                strokeDasharray='164.93361431346415 56.97787143782138'
                transform='matrix(1,0,0,1,0,0)'
            ></circle>
        </svg>
    );
}

export default LoadingSpinner;
