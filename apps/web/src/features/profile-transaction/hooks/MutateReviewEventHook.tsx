import { mutateReviewEventApi } from "../api/MutateReviewEventApi"

export const MutateReviewEventHook = ({ setRating, setReviewText, setIsDialogOpen, selectedEventId, reviewText, feedback, rating }:any) => {
    const {
        mutateReviewEvent
    } = mutateReviewEventApi({
        setRating,setReviewText, setIsDialogOpen, selectedEventId, reviewText, feedback, rating
    })
    return {
        mutateReviewEvent
    }
    
}