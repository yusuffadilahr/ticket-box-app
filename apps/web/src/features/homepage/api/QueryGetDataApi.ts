import instance from "@/utils/axiosInstance/axiosInstance";
import { useQuery } from "@tanstack/react-query";


export const QueryGetDataApi: any = ()=>{
    const { data: queryGetDataNewest } = useQuery({
        queryKey: ['Get-data-newest'],
        queryFn: async () => {
            const res = await instance.get('/event/newest-event');
            return res.data.data;
        },
    });

    const { data: queryGetDataTopSell } = useQuery({
        queryKey: ['Get-data-top-sell'],
        queryFn: async () => {
            const res = await instance.get('/event/bestseller-event');
            console.log(res.data.data, 'getdatatopsell');
            return res.data.data;
        },
    });

    const { data: queryGetComedyEvent } = useQuery({
        queryKey: ['Get-comedy-event'],
        queryFn: async () => {
            const res = await instance.get('/event/comedy-event');
            return res.data.data;
        },
    });

    const { data: queryGetCategoryMusic } = useQuery({
        queryKey: ['get-event-data-music'],
        queryFn: async () => {
            const res = await instance.get('/event/search', {
                params: {
                    category: 1,
                },
            });
            return res.data.data.eventSearch;
        },
    });

    const { data: queryGetCarousel } = useQuery({
        queryKey: ['get-event-data-carousel'],
        queryFn: async () => {
            const res = await instance.get('/event/carousel-images', {});
            // console.log(res)
            return res.data.data;
        },
    });
    return {
        queryGetDataNewest,
        queryGetDataTopSell,
        queryGetComedyEvent,
        queryGetCategoryMusic,
        queryGetCarousel
    }
}