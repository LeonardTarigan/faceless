export const getFormattedDate = (timestamp: number) => {
    const timestampInMillis = timestamp * 1000; // Convert seconds to milliseconds
    const date = new Date(timestampInMillis);

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    const time = date.toLocaleTimeString('us-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return `${day} ${month} ${year} | ${time}`;
};

export const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 21) return 'Good Night';
    if (currentHour >= 17) return 'Good Evening';
    if (currentHour >= 12) return 'Good Afternoon';

    return 'Good Morning';
};
