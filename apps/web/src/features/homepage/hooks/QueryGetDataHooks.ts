import { QueryGetDataApi } from "../api/QueryGetDataApi";

export const QueryGetDataHooks: any = () => {
    const {
        queryGetDataNewest,
        queryGetDataTopSell,
        queryGetComedyEvent,
        queryGetCategoryMusic,
        queryGetCarousel,
        isLoadingNewest,
        isLoadingTopSell,
        isLoadingComedy,
        isLoadingMusic
    } = QueryGetDataApi()

    return {
        queryGetDataNewest,
        queryGetDataTopSell,
        queryGetComedyEvent,
        queryGetCategoryMusic,
        queryGetCarousel, isLoadingNewest,
        isLoadingTopSell,
        isLoadingComedy,
        isLoadingMusic
    }
}