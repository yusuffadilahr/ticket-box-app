import { MutateReviewEventApi } from "../api/MutateReviewEventApi"

export const MutateReviewEventHook = ({ setRating, setReviewText, setIsDialogOpen, selectedEventId, reviewText, feedback, rating }:any) => {
    const {
        mutateReviewEvent
    } = MutateReviewEventApi({
        setRating,setReviewText, setIsDialogOpen, selectedEventId, reviewText, feedback, rating
    })
    return {
        mutateReviewEvent
    }
    
}