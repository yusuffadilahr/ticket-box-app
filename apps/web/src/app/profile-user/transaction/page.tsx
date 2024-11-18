
'use client'
import { useState } from "react";
import ProfileHeader from "@/components/profile/profile";
import LeftMenu from "@/components/profile/leftMenu";
import instance from "@/utils/axiosInstance/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import TableTransaction from "@/components/profile/transaction/tableTransaction";
import { QueryGetDataTransactionReviewHooks } from "@/features/profile-transaction/hooks/QueryGetDataTransactionReviewHooks";
import { MutateReviewEventHook } from "@/features/profile-transaction/hooks/MutateReviewEventHook";


export default function ProfileTransaction() {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [reviewText, setReviewText] = useState("");
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState<number | ''>('');



    const { mutateReviewEvent } = MutateReviewEventHook({
        setRating,
        setReviewText,
        setIsDialogOpen,
        selectedEventId,
        reviewText,
        feedback,
        rating
    })


    const {
        reviewData,
        getTransactionData
    } = QueryGetDataTransactionReviewHooks()


    const openReviewDialog = (eventId: string) => {
        setSelectedEventId(eventId);
        setIsDialogOpen(true);
    };

    const isEventReviewed = (eventId: string) => {
        return Array.isArray(reviewData?.dataReview) &&
            reviewData.dataReview.some((review: any) => review.eventId === eventId);
    };


    return (
        <main className="pt-28 lg:px-20 flex w-screen lg:justify-start flex-col lg:block">
            <section className="w-full flex justify-between items-center">
                <ProfileHeader />
            </section>

            <section className="flex flex-col lg:flex-row ">
                <section className="mt-10 w-full lg:w-1/4 flex h-fit">
                    <LeftMenu />

                </section>
                <section className="w-full lg:w-3/4 mt-4 bg-white rounded-lg shadow-lg ml-5 p-5">
                    <h2 className="text-xl font-semibold mb-5">Transaksi</h2>


                    <TableTransaction
                        getTransactionData={getTransactionData}
                        isEventReviewed={isEventReviewed}
                        openReviewDialog={openReviewDialog}
                    />


                </section>
            </section>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Leave a Review</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Textarea
                            placeholder="Write your review here..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <Textarea
                            placeholder="Write your feedback here..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />
                        <Input
                            type="number"
                            placeholder="1:Sangat Buruk - 5:Sangat Baik"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        />
                    </div>
                    <DialogFooter>
                        <Button onClick={() => mutateReviewEvent()} disabled={!reviewText || !rating}>
                            Submit Review
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </main>
    );
}