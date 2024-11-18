import { Tooltip } from "react-tooltip";
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


export default function TableTransaction({ getTransactionData, isEventReviewed, openReviewDialog }: any) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
                <thead>
                    <tr className="border-b">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID Transaksi</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Event</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal Transaksi</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jumlah</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Harga</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getTransactionData?.map((item: any, index: any) => {
                            const totalQuantity = item.transactionDetail.reduce(
                                (acc: number, detail: any) => acc + detail.quantity,
                                0
                            );

                            return (
                                <tr key={index} className="border-b">

                                    <Dialog>
                                        <DialogTrigger asChild>

                                            <td className="px-6 py-4 text-sm text-gray-600"
                                            >{item?.id?.length > 10 ?
                                                <button data-tooltip-id="id-tooltip"
                                                    data-tooltip-content={item?.id}
                                                    data-tooltip-place="top"
                                                    className="text-blue-900"
                                                >

                                                    {item?.id.slice(0, 10)}..
                                                </button>
                                                : item?.id}
                                                <Tooltip id="id-tooltip" />
                                            </td>

                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Transaction Detail</DialogTitle>
                                            </DialogHeader>
                                            <div className="flex flex-col gap-2">
                                                <div>
                                                    <div className="font-bold">Transaction ID:</div>
                                                    <div className="text-sm">{item?.transactionDetail[0]?.transactionsId}</div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">Tanggal Transaksi:</div>
                                                    <div className="text-sm">{item?.createdAt?.split('T')[0]}</div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">Detail Transaksi:</div>

                                                    {
                                                        item?.transactionDetail.map((item1: any, index: any) => {
                                                            return (
                                                                <>
                                                                    <div key={index} className="text-sm font-bold">{item1.tickets.ticketName}</div>
                                                                    <div className="text-sm">x{item1.quantity} : Rp{(item1.price - item1.discount).toLocaleString("id-ID")} </div>
                                                                </>
                                                            )
                                                        })}
                                                    <div className="text-sm font-bold">Total : Rp{item.totalPrice.toLocaleString("id-ID")}</div>

                                                </div>


                                            </div>

                                        </DialogContent>
                                    </Dialog>
                                    {/* <td className="px-6 py-4 text-sm text-gray-600"
                                    >{item?.id?.length > 10 ?
                                        <h1 data-tooltip-id="id-tooltip"
                                            data-tooltip-content={item?.id}
                                            data-tooltip-place="top">
                                            {item?.id.slice(0, 10)}..
                                        </h1>
                                        : item?.id}
                                        <Tooltip id="id-tooltip" />
                                    </td> */}
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {item?.event?.eventName.length > 10 ?
                                            <h1 data-tooltip-id="event-tooltip"
                                                data-tooltip-content={item?.event?.eventName}
                                                data-tooltip-place="top">
                                                {item.event.eventName.slice(0, 10)}..
                                            </h1> : <>{item.event.eventName}</>}
                                        <Tooltip id="event-tooltip" />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.createdAt.split('T')[0]}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {totalQuantity}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {item.transactionStatus[item.transactionStatus.length - 1]?.status === 'WAITING_FOR_PAYMENT'
                                            ? 'Menunggu Pembayaran'
                                            : item.transactionStatus[item.transactionStatus.length - 1]?.status === 'PAID'
                                                ? 'Berhasil'
                                                : item.transactionStatus[item.transactionStatus.length - 1]?.status === 'CANCELLED'
                                                    ? 'Batal'
                                                    : item.transactionStatus[item.transactionStatus.length - 1]?.status === 'EXPIRED'
                                                        ? 'Pembayaran Gagal'
                                                        : item.transactionStatus[item.transactionStatus.length - 1]?.status
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">Rp{item.totalPrice.toLocaleString("id-ID")}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {isEventReviewed(item.event.id) ? (
                                            <span className="text-green-500">Event Reviewed</span>
                                        ) : item.transactionStatus[item.transactionStatus.length - 1]?.status === 'PAID' ?


                                            (
                                                <button
                                                    onClick={() => openReviewDialog(item.event.id)}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Submit Review
                                                </button>
                                            )
                                            : ""
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}