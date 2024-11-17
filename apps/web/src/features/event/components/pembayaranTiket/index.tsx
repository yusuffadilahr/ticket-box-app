import TotalPayment from '@/components/eventDetails/totalPayment';
import PointReferralDiscount from '@/components/eventDetails/pointReferralDiscount';


export default function PembayaranTiket({ isPending, setPointsToDeduct, pointsToDeduct, profilePoint, toggleReferralDiscount, useReferralDiscount, profileDiscount, totalTickets, queryDataDetailEvent, ticketQuantities, totalPrice, handleCheckoutTickets }: any) {
    return (
        <div id="totaltickets" className="w-full lg:w-1/3 bg-white h-fit p-7 rounded-lg border border-gray-50 drop-shadow-lg">
            <TotalPayment
                totalPrice={totalPrice}
                ticketQuantities={ticketQuantities}
                queryDataDetailEvent={queryDataDetailEvent}
                totalTickets={totalTickets}
            />

            <PointReferralDiscount
                profileDiscount={profileDiscount}
                useReferralDiscount={useReferralDiscount}
                toggleReferralDiscount={toggleReferralDiscount}
                profilePoint={profilePoint}
                pointsToDeduct={pointsToDeduct}
                setPointsToDeduct={setPointsToDeduct}
            />

            <button disabled={isPending || (ticketQuantities.reduce((acc: any, val: any) => acc + val, 0) == 0)} className='btn bg-blue-700 text-white font-bold p-2 w-full rounded-lg mt-5' onClick={() => handleCheckoutTickets()}>
                {isPending ? 'Pembayaran Diproses' : 'Bayar Sekarang'}
            </button>
        </div>
    )
}