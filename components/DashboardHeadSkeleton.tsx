function DashboardHeadSkeleton() {
    return (
        <div className='flex flex-col justify-between gap-5 rounded-xl bg-slate-800'>
            <div>
                <div className='mb-2 h-7 w-72 animate-pulse rounded-full bg-slate-700'></div>

                <div className='h-5 w-full animate-pulse rounded-full bg-slate-700'></div>
            </div>

            <div className='h-11 w-full animate-pulse rounded-md bg-slate-700'></div>
        </div>
    );
}

export default DashboardHeadSkeleton;
