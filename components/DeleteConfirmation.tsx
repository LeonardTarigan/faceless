import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ConfirmationDialog } from '@/lib/interfaces';
import { Exo_2 } from 'next/font/google';
import { deleteDoc, doc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { toast } from 'react-hot-toast';
import { db } from '@/firebase/clientApp';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const mainFont = Exo_2({
    weight: ['300', '400', '700'],
    subsets: ['latin'],
});

function DeleteConfirmation({
    isOpen,
    currentId,
    setOpenDialog,
    setFetchStatus,
}: ConfirmationDialog) {
    const { uid } = useSelector((state: RootState) => state.user);

    const handleDelete = (id: string) => {
        toast.promise(
            deleteDoc(doc(db, `users/${uid}/messages`, id))
                .then(() => {
                    setOpenDialog(false);
                })
                .catch((error: FirebaseError) => toast.error(error.message)),
            {
                loading: 'Deleting...',
                success: 'Message deleted!',
                error: 'Could not delete!',
            }
        );
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as='div'
                className={`${mainFont.className} relative z-50`}
                onClose={() => setOpenDialog(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='flex w-full max-w-md transform flex-col items-end overflow-hidden rounded-2xl bg-slate-700 p-5 text-left align-middle shadow-xl transition-all'>
                                <Dialog.Title
                                    as='h3'
                                    className='w-full text-xl font-semibold leading-6'
                                >
                                    Delete Confirmation
                                </Dialog.Title>
                                <div className='mt-2'>
                                    <p className=''>
                                        Are you sure want to delete this
                                        message? It will be deleted permanently.
                                    </p>
                                </div>

                                <button
                                    type='button'
                                    onClick={() => handleDelete(currentId)}
                                    className='mt-10 rounded-md border-[1.5px] border-rose-500 bg-rose-500 px-5 py-2 text-sm font-bold transition-all duration-150 hover:bg-transparent hover:text-rose-500 active:translate-y-1'
                                >
                                    DELETE
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default DeleteConfirmation;
