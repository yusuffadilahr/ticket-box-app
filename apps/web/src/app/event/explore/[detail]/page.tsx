'use client'

import contohgambar from "./../../../../../gagagugu.jpg"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react";
import { useQuery } from "@tanstack/react-query"
import instance from "@/utils/axiosInstance/axiosInstance"

interface IParams {
    params: {
        detail: string
    }
}

export default function EventDetail({ params }: IParams) {
    const [quantity, setQuantity] = useState(0);
    const { detail } = params
    const id = detail.split('TBX')[0]
    const { data: queryDataDetailEvent } = useQuery({
        queryKey: ['get-detail-event'],
        queryFn: async () => {
            const res = await instance.get(`/event/detail/${id}`)
            return res.data.data[0]
        }
    })

    console.log(id)
    console.log(queryDataDetailEvent)

    const increment = () => setQuantity(quantity + 1);
    const decrement = () => {
        if (quantity > 0) setQuantity(quantity - 1);
    };

    return (
        <main>
            <section className="pt-28 px-20 flex gap-5">
                <div className="w-2/3">
                    <Image
                        src={queryDataDetailEvent?.EventImages[0]?.eventImageUrl}
                        alt="testing"
                        className="object-cover w-full h-auto rounded-lg drop-shadow-lg"
                        width={300}
                        height={300}
                    />
                </div>
                <div className="w-1/3 bg-white rounded-lg font-bold text-lg border border-gray-50 drop-shadow-lg p-7 flex flex-col">
                    <div className="flex flex-col gap-5 flex-grow">
                        <div>{queryDataDetailEvent?.eventName}</div>
                        <div className="space-y-5 mb-4">
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt />
                                <div className="text-base font-normal">
                                    {queryDataDetailEvent?.startEvent.split('T')[0]} s/d {queryDataDetailEvent?.endEvent.split('T')[0]}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdOutlineAccessTimeFilled />
                                <div className="text-base font-normal">
                                    {queryDataDetailEvent?.startEvent.split('T')[1].split('.')[0].slice(0, -3)} s/d {queryDataDetailEvent?.endEvent.split('T')[1].split('.')[0].slice(0, -3)}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <IoLocationSharp />
                                <div className="text-base font-normal">
                                    {queryDataDetailEvent?.location}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto  border-t-2">
                        <div className="mt-4 flex items-center gap-6">
                            <Avatar>
                                <AvatarImage src={queryDataDetailEvent?.EventOrganizer?.profilePicture} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <div className="text-gray-600 text-sm font-normal ">
                                    Diselenggarakan Oleh
                                </div>
                                <div>
                                    {queryDataDetailEvent?.EventOrganizer?.organizerName}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pt-10 px-20 flex gap-5">
                <Tabs defaultValue="deskripsi" className="w-2/3">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="deskripsi">Deskripsi</TabsTrigger>
                        <TabsTrigger value="tiket">Tiket</TabsTrigger>
                        <TabsTrigger value="peta">Peta</TabsTrigger>
                    </TabsList>
                    <TabsContent value="deskripsi">
                        <Card className="p-4">
                            <CardHeader>
                                <CardTitle className="pb-4">Account</CardTitle>
                                <CardDescription>
                                    {queryDataDetailEvent?.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    as
                                </div>
                                <div className="space-y-1">
                                    asdasd
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="tiket">
                        <Card className="p-4">
                            <CardHeader>
                                <CardTitle className="pb-4">Pilih Tiket Anda:</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-md w-full mx-auto">
                                    <div className="flex  items-start">
                                        {
                                            queryDataDetailEvent?.tickets?.map((item: any, i: any) => {
                                                return (
                                                    <div key={i}>
                                                        <h3 className="text-lg font-semibold">
                                                            {item.ticketName}
                                                        </h3>
                                                        <p className="text-gray-600 mt-1">
                                                            {item.ticketType}
                                                        </p>
                                                        <div className="text-blue-600 mt-2">
                                                            <span className="flex items-center">
                                                                <MdOutlineAccessTimeFilled />
                                                                Ends {item.endDate.split('T')[0]} • {queryDataDetailEvent?.tickets[0].endDate.split('T')[1].split('.')[0].slice(0, -3)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }



                                    </div>
                                    <hr className="my-4 border-blue-300 border-dashed" />
                                    <div className="flex justify-between items-center">
                                        <p className="text-xl font-semibold">Rp275.000</p>
                                        <div className="flex items-center space-x-4">
                                            <button
                                                onClick={decrement}
                                                className="text-blue-500 border border-blue-500 rounded-full w-8 h-8 flex justify-center items-center"
                                            >
                                                –
                                            </button>
                                            <span>{quantity}</span>
                                            <button
                                                onClick={increment}
                                                className="text-blue-500 border border-blue-500 rounded-full w-8 h-8 flex justify-center items-center"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save password</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="peta">
                        <Card className="p-4">
                            <CardHeader>
                                <CardTitle className="pb-4">Password</CardTitle>
                                <CardDescription>
                                    asdasdasdasdas
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    asd
                                </div>
                                <div className="space-y-1">
                                    asd
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save password</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
                <div className="w-1/3 bg-white rounded-lg border border-gray-50 drop-shadow-lg">
                    asd
                </div>
            </section>
        </main>
    )
}