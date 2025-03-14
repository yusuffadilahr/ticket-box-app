import instance from "./../../../utils/axiosInstance/axiosInstance";
import { useQuery } from "@tanstack/react-query";


export const QueryGetDataApi: any = ()=>{
    const { data: queryGetDataNewest, isLoading: isLoadingNewest } = useQuery({
        queryKey: ['Get-data-newest'],
        queryFn: async () => {
            const res = await instance.get('/event/newest-event');
            return res.data.data;
        },
    });

    const { data: queryGetDataTopSell, isLoading: isLoadingTopSell } = useQuery({
        queryKey: ['Get-data-top-sell'],
        queryFn: async () => {
            const res = await instance.get('/event/bestseller-event');
            console.log(res.data.data, 'getdatatopsell');
            return res.data.data;
        },
    });

    const { data: queryGetComedyEvent, isLoading: isLoadingComedy } = useQuery({
        queryKey: ['Get-comedy-event'],
        queryFn: async () => {
            const res = await instance.get('/event/comedy-event');
            return res.data.data;
        },
    });

    const { data: queryGetCategoryMusic, isLoading: isLoadingMusic } = useQuery({
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

    const { data: queryGetCarousel, isLoading: isLoadingCarousel } = useQuery({
        queryKey: ['get-event-data-carousel'],
        queryFn: async () => {
            const res = await instance.get('/event/carousel-images', {});
            return res.data.data;
        },
    });
    return {
        queryGetDataNewest,
        queryGetDataTopSell,
        queryGetComedyEvent,
        queryGetCategoryMusic,
        queryGetCarousel,
        isLoadingNewest,
        isLoadingTopSell,
        isLoadingComedy,
        isLoadingMusic
    }
}