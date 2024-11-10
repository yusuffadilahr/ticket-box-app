
'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaShoppingCart, FaLock, FaHeart, FaCog } from 'react-icons/fa';
import { useState } from "react";
import ProfileHeader from "@/components/profile/profile";
import LeftMenu from "@/components/profile/leftMenu";
import instance from "@/utils/axiosInstance/axiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';


export default function ProfileTransaction() {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [reviewText, setReviewText] = useState("");
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState<number | ''>('');


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


    const { data: getTransactionData } = useQuery({
        queryKey: ['get-transaction-data'],
        queryFn: async () => {
            const res = await instance.get('/transaction')
            console.log(res.data.data)
            return res.data.data
        }
    })

    const openReviewDialog = (eventId: string) => {
        setSelectedEventId(eventId);
        setIsDialogOpen(true);
    };




    return (
        <main className="pt-28 px-20">
            <section className=" flex justify-between items-center">
                <ProfileHeader />
            </section>

            <section className="flex">
                <section className="mt-10 flex h-fit">
                    <LeftMenu />
                </section>
                <section className="w-3/4 bg-white rounded-lg shadow-lg ml-5 p-5">
                    <h2 className="text-xl font-semibold mb-5">Transaksi</h2>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr className="border-b">
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID Transaksi</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Event</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal Transaksi</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Jumlah</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Harga</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getTransactionData?.map((item: any, index: any) => {
                                        const totalQuantity = item.transactionDetail.reduce(
                                            (acc: number, detail: any) => acc + detail.quantity,
                                            0
                                        );

                                    
                                        return (
                                        <tr key={index} className="border-b">
                                            <td className="px-6 py-4 text-sm text-gray-600">{item.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{item.event.eventName}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{item.createdAt.split('T')[0]}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                               {totalQuantity}
                                            </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{item.transactionStatus[0].status}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{item.totalPrice}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                    <button
                                                        onClick={() => openReviewDialog(item.event.id)}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        Review Event
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>

            {/* Review Dialog */}
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
                            placeholder="Rating (1-5)"
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