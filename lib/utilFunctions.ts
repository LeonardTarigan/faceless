export const getFormattedDate = (timestamp: number) => {
    const timestampInMillis = timestamp * 1000; // Convert seconds to milliseconds
    const date = new Date(timestampInMillis);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${day} ${month} ${year} | ${hours}:${minutes}:${seconds}`;
};

export const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 21) return 'Good Night';
    if (currentHour >= 17) return 'Good Evening';
    if (currentHour >= 12) return 'Good Afternoon';

    return 'Good Morning';
};
