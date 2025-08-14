import instance from "./../../../utils/axiosInstance/axiosInstance";
import { useQuery } from "@tanstack/react-query";


export const QueryGetDataApi = ()=>{
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
        queryGetCategoryMusic,
        queryGetCarousel,
        isLoadingMusic,
        isLoadingCarousel
    }
}