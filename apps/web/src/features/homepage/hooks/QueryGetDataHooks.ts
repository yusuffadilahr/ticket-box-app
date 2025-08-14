import { QueryGetDataApi } from "../api/QueryGetDataApi";

export const QueryGetDataHooks = () => {
    const {
        queryGetCategoryMusic,
        // queryGetCarousel,
        // isLoadingCarousel
        isLoadingMusic,
    } = QueryGetDataApi()

    return {
        queryGetCategoryMusic,
        isLoadingMusic,
        // queryGetCarousel, 
        // isLoadingCarousel,
    }
}