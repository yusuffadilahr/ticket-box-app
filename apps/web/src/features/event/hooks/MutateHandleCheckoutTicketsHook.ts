import { MutateHandleCHeckoutTicketsApi } from "../api/MutateHandleCheckoutTicketsApi"

export const MutateHandleCheckoutTicketsHook = ({ id, router, profileDiscount, useReferralDiscount, pointsToDeduct, queryDataDetailEvent, ticketQuantities }: any) => {
    const {
        handleCheckoutTickets,
        isPending
    } = MutateHandleCHeckoutTicketsApi({
        id, router, profileDiscount, useReferralDiscount, pointsToDeduct, queryDataDetailEvent, ticketQuantities,
        onSuccess: (res: any) => {
            const redirectUrl = res?.data?.data?.paymentToken?.redirect_url
           
            if (redirectUrl) {
                router.push(redirectUrl)
            } else {
                console.log('Pembayaran Berhasil')
                router.push('/event/explore')
            }
        },
        onError: (err: any) => {
            console.log(err)
        }
    })
    return {
        handleCheckoutTickets,
        isPending
    }
}