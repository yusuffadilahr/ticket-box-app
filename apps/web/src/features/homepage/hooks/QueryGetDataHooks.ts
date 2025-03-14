import { QueryGetDataApi } from "../api/QueryGetDataApi";

export const QueryGetDataHooks: any = () => {
    const {
        queryGetCategoryMusic,
        queryGetCarousel,
        isLoadingMusic
    } = QueryGetDataApi()

    return {
        queryGetCategoryMusic,
        queryGetCarousel, 
        isLoadingMusic
    }
}