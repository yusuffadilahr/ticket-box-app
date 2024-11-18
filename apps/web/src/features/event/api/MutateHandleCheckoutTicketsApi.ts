import { useMutation } from "@tanstack/react-query";
import instance from "./../../../utils/axiosInstance/axiosInstance";


export const MutateHandleCHeckoutTicketsApi = ({ id, onError, onSuccess, profileDiscount, useReferralDiscount, pointsToDeduct, queryDataDetailEvent, ticketQuantities }:any) => {
    const { mutate: handleCheckoutTickets, isPending } = useMutation({
        mutationFn: async () => {

            const ticketDetails = ticketQuantities
                .map((quantity: any, index: any) => quantity > 0 && ({
                    ticketId: queryDataDetailEvent?.tickets[index]?.id,
                    quantity,
                    price: queryDataDetailEvent?.tickets[index]?.price,
                    discount: queryDataDetailEvent?.tickets[index]?.discount,
                }))
                .filter(Boolean);

            if (!ticketDetails) throw { msg: "harap masukkan tiket" }

            return await instance.post(`/transaction/${id}`, {
                referralPoints: pointsToDeduct,
                ticketDetails,
                referralDiscount: useReferralDiscount ? profileDiscount : 0,
            })
        },
        onSuccess,
        onError
    })
    return {
        handleCheckoutTickets,
        isPending
    }
}