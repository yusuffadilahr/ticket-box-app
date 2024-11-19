import toast from "react-hot-toast";
import instance from "./../../../utils/axiosInstance/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { FaWindows } from "react-icons/fa";

export const MutateReviewEventApi = ({ setRating, setReviewText, setIsDialogOpen, selectedEventId, reviewText, feedback, rating }: any) => {
    const { mutate: mutateReviewEvent } = useMutation({
        mutationFn: async () => {
            return await instance.post('/review', {
                eventId: selectedEventId,
                reviewComments: reviewText,
                feedback: feedback,
                rating: Number(rating),
            })
        },
        onSuccess: (res: any) => {
            setIsDialogOpen(false);
            setReviewText("");
            setRating('');
            toast.success(res?.data?.message)
            setTimeout(() => { window.location.reload() }, 2000)
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message)
        }
    })
    return {
        mutateReviewEvent
    }
}