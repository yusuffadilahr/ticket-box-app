import { useQuery } from "@tanstack/react-query";
import instance from "./../../../utils/axiosInstance/axiosInstance";

export const QueryGetDataTransactionReviewApi = () => {
    const { data: reviewData } = useQuery({
        queryKey: ['review-data'],
        queryFn: async () => {
            const res = await instance.get('/review/');
            return res.data.data
        }
    })

    const { data: getTransactionData } = useQuery({
        queryKey: ['get-transaction-data'],
        queryFn: async () => {
            const res = await instance.get('/transaction')
            console.log(res.data.data)
            return res.data.data
        }
    })
    return {
        reviewData,
        getTransactionData
    }
}