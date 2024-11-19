import { MutateReviewEventApi } from "../api/MutateReviewEventApi"

interface MutateReviewEventHook{
    setRating: React.Dispatch<React.SetStateAction<number | string>>;
    setReviewText: React.Dispatch<React.SetStateAction<string>>;
    setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedEventId: string | null;
    reviewText: string;
    feedback: string;
    rating: number | string;
}

export const MutateReviewEventHook = ({ setRating, setReviewText, setIsDialogOpen, selectedEventId, reviewText, feedback, rating }: MutateReviewEventHook) => {
    const {
        mutateReviewEvent
    } = MutateReviewEventApi({
        setRating,setReviewText, setIsDialogOpen, selectedEventId, reviewText, feedback, rating
    })
    return {
        mutateReviewEvent
    }
    
}