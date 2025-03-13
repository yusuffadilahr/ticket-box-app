import { QueryGetEventDetailApi } from "../api/QueryGetEventDetailApi"

export const QueryGetEventDetailHooks = ({ id }: { id: Number }) => {
    const {
        queryDataDetailEvent,
        queryDataReview
    } = QueryGetEventDetailApi({ id })

    return {
        queryDataDetailEvent,
        queryDataReview
    }
}