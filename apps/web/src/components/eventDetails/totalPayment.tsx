import { IoTicketOutline } from "react-icons/io5";


export default function TotalPayment({ totalPrice, ticketQuantities, queryDataDetailEvent, totalTickets }: any) {
    return (
        <>
            {ticketQuantities.map((quantity: any, index: any) => {
                const ticket = queryDataDetailEvent?.tickets[index];

                if (quantity > 0 && ticket) {
                    const discountedPrice = ticket.discount > 0
                        ? ticket.price - ticket.discount
                        : ticket.price;
                    const ticketSubtotal = quantity * (discountedPrice || 0);

                    return (
                        <div key={index} className="mb-2 flex flex-row gap-4 items-center justify-center">
                            <div className='flex w-36 justify-center items-center gap-3'>
                                <IoTicketOutline size={40} />
                                <p className="text-sm font-semibold">{ticket.ticketName}</p>
                            </div>
                            <div className='flex flex-col justify-center'>
                                <p className="text-sm">x {quantity}</p>
                                {ticket.discount > 0 ? (

                                    <p className="text-sm text-green-600">Harga Diskon: Rp{discountedPrice.toLocaleString()}</p>

                                ) : (
                                    <p className="text-sm">Price: Rp{discountedPrice.toLocaleString("id-ID")}</p>
                                )}
                                <p className="text-sm">Subtotal: Rp{ticketSubtotal.toLocaleString("id-ID")}</p>
                            </div>

                        </div>
                    );
                }
                return null;
            })}

            <div className='flex justify-between items-center border-t-2 border-gray-300'>
                <p className="text-md mt-4 text-gray-700 ">Jumlah {totalTickets} tiket</p>
                <p className="text-xl mt-4 font-bold"><span className='text-base text-gray-700 font-normal'>Harga:</span> Rp{totalPrice.toLocaleString("id-ID")}</p>
            </div>
        </>
    )
}