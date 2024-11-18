import instance from "@/utils/axiosInstance/axiosInstance";
import { useMutation } from "@tanstack/react-query";

export const mutateReviewEventApi = ({ setRating, setReviewText, setIsDialogOpen, selectedEventId, reviewText, feedback, rating }:any) => {
    const { mutate: mutateReviewEvent } = useMutation({
        mutationFn: async () => {
            const res = await instance.post('/review', {
                eventId: selectedEventId,
                reviewComments: reviewText,
                feedback: feedback,
                rating: Number(rating),
            })
        },
        onSuccess: () => {
            setIsDialogOpen(false);
            setReviewText("");
            setRating('');
        }
    })
    return {
        mutateReviewEvent
    }
}