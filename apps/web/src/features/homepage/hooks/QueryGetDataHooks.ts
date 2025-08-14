import { QueryGetDataApi } from "../api/QueryGetDataApi";

export const QueryGetDataHooks = () => {
    const {
        queryGetCategoryMusic,
        queryGetCarousel,
        isLoadingMusic,
        isLoadingCarousel
    } = QueryGetDataApi()

    return {
        queryGetCategoryMusic,
        queryGetCarousel, 
        isLoadingMusic,
        isLoadingCarousel,
    }
}