import { QueryGetEventDetailApi } from "../api/QueryGetEventDetailApi"

export const QueryGetEventDetailHooks = ({ id }:any) => {
    const {
        queryDataDetailEvent,
        queryDataReview
    } = QueryGetEventDetailApi({id})

    return {
        queryDataDetailEvent,
        queryDataReview
    }
}