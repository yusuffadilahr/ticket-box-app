import instance from "./../../../utils/axiosInstance/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const QueryGetEventDetailApi: any = ({ id }: any) => {
    const { data: queryDataDetailEvent } = useQuery({
        queryKey: ['get-detail-event'],
        queryFn: async () => {
            const res = await instance.get(`/event/detail/${id}`);
            return res.data.data[0];
        },
    });

    const { data: queryDataReview } = useQuery({
        queryKey: ['get-event-review'],
        queryFn: async () => {
            const res = await instance.get(`/review/event/${id}`);
            return res.data.data;

        },
    });
    return {
        queryDataDetailEvent,
        queryDataReview
    }
}