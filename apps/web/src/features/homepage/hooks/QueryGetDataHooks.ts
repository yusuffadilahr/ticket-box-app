import { QueryGetDataApi } from "../api/QueryGetDataApi";

export const QueryGetDataHooks: any = () => {
    const {
        queryGetDataNewest,
        queryGetDataTopSell,
        queryGetComedyEvent,
        queryGetCategoryMusic,
        queryGetCarousel
    } = QueryGetDataApi()
    
    return {
        queryGetDataNewest,
        queryGetDataTopSell,
        queryGetComedyEvent,
        queryGetCategoryMusic,
        queryGetCarousel
    }
}