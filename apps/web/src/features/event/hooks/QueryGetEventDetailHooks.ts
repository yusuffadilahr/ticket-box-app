import { QueryGetEventDetailApi } from "../api/QueryGetEventDetailApi"

export const QueryGetEventDetailHooks = ({ id }: { id: Number }) => {
    const {
        queryDataReview
    } = QueryGetEventDetailApi({ id })

    return {
        queryDataReview
    }
}