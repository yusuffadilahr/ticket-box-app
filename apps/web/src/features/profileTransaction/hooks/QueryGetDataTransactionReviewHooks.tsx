import { QueryGetDataTransactionReviewApi } from "../api/QueryGetDataTransactionReviewApi"

export const QueryGetDataTransactionReviewHooks = () => {
    const {
        reviewData,
        getTransactionData
    } = QueryGetDataTransactionReviewApi()
    return {
        reviewData,
        getTransactionData
    }
}