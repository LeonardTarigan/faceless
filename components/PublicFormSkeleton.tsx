function PublicFormSkeleton() {
    return (
        <div className='flex w-full flex-col gap-5 rounded-xl bg-slate-800'>
            <div className='flex justify-center'>
                <div className='h-7 w-72 animate-pulse rounded-full bg-slate-700'></div>
            </div>

            <div className='h-20 w-full animate-pulse rounded-md bg-slate-700'></div>

            <div className='h-11 w-full animate-pulse rounded-md bg-slate-700'></div>
        </div>
    );
}

export default PublicFormSkeleton;
