import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './../../components/ui/alert-dialog';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./../../components/ui/dialog"
import { Tooltip } from 'react-tooltip';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
import { FaRegEye } from 'react-icons/fa6';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import Link from 'next/link';

export default function ListEventTable({ getEventList, mutateDeleteData, page }: any) {
    return (
        <>
            {getEventList &&
                getEventList?.eventList?.map((item: any, index: number) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100" >
                        <td className="py-3 px-6 text-left whitespace-nowrap">{((page - 1) * 5) + index + 1}</td>
                        <td className="py-3 px-6 text-left whitespace-nowrap" > {item?.eventName?.length > 15 ?
                            (
                                <h1
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={item?.eventName}
                                    data-tooltip-place="top">{item?.eventName?.slice(0, 15)}...</h1>
                            ) : (
                                item?.eventName!
                            )}
                            <Tooltip id="my-tooltip" />
                        </td>
                        <td className="py-3 px-6 text-left">
                            {item?.category?.Category!}
                        </td>
                        <td className="py-3 px-6 text-left">
                            {item?.location?.length > 15 ? (
                                <h1
                                    data-tooltip-id="location-tooltip"
                                    data-tooltip-content={item?.location}
                                    data-tooltip-place="top"
                                >
                                    {item?.location?.slice(0, 15)}...
                                </h1>
                            ) : (
                                item?.location!
                            )}
                            <Tooltip id="location-tooltip" />
                        </td>
                        <td className="py-3 px-6 text-left">
                            {item?.isPaid! == true ? 'Berbayar' : 'Gratis'}
                        </td>
                        <td className="py-3 px-6 text-left">
                            {item?.startEvent.split('T')[0]}
                        </td>
                        <td className="flex flex-row items-center justify-center py-3 px-6 text-left space-x-1">
                            <Dialog>
                                <DialogTrigger>
                                    <button id='view' className="bg-green-600 p-2 rounded-md">
                                        <FaRegEye color="white" />
                                    </button>
                                    <Tooltip anchorSelect='#view' place='top' content='Lihat Tiket' />
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Tiket</DialogTitle>
                                        <DialogDescription className='overflow-y-auto max-h-96 space-y-2'>
                                            {
                                                item?.tickets?.map((item: any, index: number) => {
                                                    return (

                                                        <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-md w-full mx-auto">
                                                            <div className="flex  items-start">
                                                                <div>
                                                                    <h3 className="text-lg font-semibold">
                                                                        {item?.ticketName}
                                                                    </h3>
                                                                    <p className="text-gray-600 mt-1">
                                                                        {item?.ticketType}
                                                                    </p>
                                                                    <div className="text-blue-600 mt-2">
                                                                        <span className="flex items-center">
                                                                            <MdOutlineAccessTimeFilled />
                                                                            Mulai {item?.startDate.split('T')[0]} • {item?.startDate.split('T')[1].split('.')[0].slice(0, -3)}
                                                                        </span>
                                                                        <span className="flex items-center">
                                                                            <MdOutlineAccessTimeFilled />
                                                                            Berakhir {item?.endDate.split('T')[0]} • {item?.endDate.split('T')[1].split('.')[0].slice(0, -3)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <hr className="my-4 border-blue-300 border-dashed" />
                                                            <div className="flex justify-between items-center">
                                                                <p className="text-xl font-semibold">

                                                                    {
                                                                        item.discount > 0 ? (
                                                                            <div>
                                                                                <span className="line-through mr-2 text-gray-500">Rp.{item.price}</span>
                                                                                <span className="text-red-600">
                                                                                    Rp{(item.price - item.discount).toLocaleString("id-ID")}
                                                                                </span>
                                                                            </div>
                                                                        ) : item.price == 0 ? 'Gratis'
                                                                            :
                                                                            (`Rp${item.price.toLocaleString("id-ID")}`)
                                                                    }

                                                                </p>
                                                                <div className="flex items-center space-x-4">
                                                                    Kuota/Sisa Tiket: <span className='text-black font-bold'>{item.totalSeat}/{item.seatAvailable}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>

                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <button id='delete' className="bg-red-600 p-2 rounded-md">
                                        <FaRegTrashAlt color="white" />
                                    </button>
                                    <Tooltip anchorSelect='#delete' place='top' content='Hapus Event' />

                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Peringatan</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Apakah Anda yakin ingin menghapus Event ini?
                                            Event yang sudah dihapus tidak bisa dikembalikan lagi.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={() => mutateDeleteData(item?.id)}
                                        >
                                            Hapus
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <Link href={`/event/dashboard/u/${item?.id}`}>
                                <button id='update' className="bg-yellow-500 p-2 rounded-md">
                                    <FaPencil color="white" />
                                </button>
                                <Tooltip anchorSelect='#update' place='top' content='Update Event' />
                            </Link>
                        </td>
                    </tr>
                ))}
        </>
    )
}