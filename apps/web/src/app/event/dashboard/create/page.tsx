'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import { EventSchema } from '@/features/event/schema/eventSchemas';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { toast } from 'react-hot-toast'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FaRegTrashAlt } from "react-icons/fa";



const EventForm = () => {
    const { mutate: mutationCreateEvent } = useMutation({
        mutationFn: async (values: FormData) => {
            console.log(values);
            return await instance.post('/event/new-event', values);
        },
        onSuccess: (res) => {
            toast.success('beerhasil')
            console.log(res);
        },
        onError: (error) => {
            toast.error('error bro')
            console.log(error);
        },
    });
    const { data: getCategory } = useQuery({
        queryKey: ['get-category'],
        queryFn: async () => {
            const res = await instance.get('/category');
            return res.data.data;
        },
    });

    const [newTicket, setNewTicket] = useState({
        price: 0,
        ticketName: '',
        ticketType: '',
        seatAvailable: 0,
        discount: 0,
        startDate: '',
        endDate: '',
    });

    const [isPaid, setIsPaid] = useState(true)

    return (
        <main className="bg-white p-5 px-20">
            <Formik
                initialValues={{
                    eventName: '',
                    location: '',
                    locationUrl: '',
                    description: '',
                    isPaid: true,
                    startEvent: '',
                    endEvent: '',
                    categoryId: '',
                    tickets: [],
                }}

                validateOnChange={true}
                validateOnBlur={true}
                validationSchema={EventSchema}
                onSubmit={(values: any) => {
                    console.log([values]);
                    const fd = new FormData();
                    fd.append('eventName', values.eventName);
                    fd.append('location', values.location);
                    fd.append('locationUrl', values.locationUrl);
                    fd.append('description', values.description);
                    fd.append('isPaid', values.isPaid);
                    fd.append('startEvent', values.startEvent);
                    fd.append('endEvent', values.endEvent);
                    fd.append('artist', values.artist);
                    fd.append('categoryId', values.categoryId);

                    const ticketsEvent = values?.tickets!.map(
                        (ticket: any, index: any) => {
                            return {
                                price: Number(ticket.price),
                                ticketName: ticket.ticketName,
                                ticketType: ticket.ticketType,
                                seatAvailable: Number(ticket.seatAvailable),
                                version: ticket.version,
                                discount: Number(ticket.discount),
                                startDate: new Date(ticket.startDate),
                                endDate: new Date(ticket.endDate),
                            };
                        },
                    );

                    console.log(ticketsEvent);
                    fd.append(`tickets`, JSON.stringify(ticketsEvent));

                    values.images.forEach((image: any, index: any) => {
                        fd.append(`images`, image);
                    });

                    mutationCreateEvent(fd);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form className=''>
                        <section className="bg-white flex flex-col justify-center rounded-xl h-[590px] w-full border border-gray-200 shadow-lg p-5">
                            <div className="flex justify-center font-bold text-2xl pb-5">
                                Event
                            </div>
                            <div className="grid grid-cols-2 gap-4 px-40">
                                <div className="flex flex-col relative">
                                    <label className=" text-sm">Nama Event</label>
                                    <Field
                                        name="eventName"
                                        placeholder="Nama Acara"
                                        className="border border-gray-500 rounded-md p-2"
                                    />
                                    <div className='h-1'>
                                        <ErrorMessage name="eventName" component="div" className='text-xs text-red-600' />
                                    </div>

                                </div>
                                <div className="flex flex-col">
                                    <label className=" text-sm">Kategori</label>
                                    <Field
                                        as="select"
                                        name="categoryId"
                                        placeholder="ID Kategori"
                                        className="border border-gray-500 rounded-md p-2"
                                    >
                                        <option disabled value="">
                                            -- Select Category --
                                        </option>
                                        {getCategory?.length > 0 &&
                                            getCategory?.map((item: any, i: any) => (
                                                <option value={item?.id} key={i}>
                                                    {item?.Category}
                                                </option>
                                            ))}
                                    </Field>
                                    <div className='h-1'>
                                        <ErrorMessage name="categoryId" component="div" className='text-xs text-red-600' />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className=" text-sm">
                                        Event Start Date
                                    </label>
                                    <Field
                                        name="startEvent"
                                        placeholder="Tanggal Mulai"
                                        type="datetime-local"
                                        className="border border-gray-500 rounded-md p-2"
                                    />
                                    <div className='h-1'>
                                        <ErrorMessage name="startEvent" component="div" className='text-xs text-red-600' />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className=" text-sm">Event End Date</label>
                                    <Field
                                        name="endEvent"
                                        placeholder="Tanggal Akhir"
                                        type="datetime-local"
                                        className="border border-gray-500 rounded-md p-2"
                                    />
                                    <div className='h-1'>
                                        <ErrorMessage name="endEvent" component="div" className='text-xs text-red-600' />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className=" text-sm">Lokasi</label>
                                    <Field
                                        name="location"
                                        placeholder="Lokasi"
                                        className="border border-gray-500 rounded-md p-2"
                                    />
                                    <div className='h-1'>
                                        <ErrorMessage name="location" component="div" className='text-xs text-red-600' />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className=" text-sm">Lokasi Google Map</label>
                                    <Field
                                        name="locationUrl"
                                        placeholder="https://maps.app.goo.gl/ACXwTUMJQ8xSTnyq7"
                                        className="border border-gray-500 rounded-md p-2"
                                        type="text"
                                    />
                                    <div className='h-1'>
                                        <ErrorMessage name="locationUrl" component="div" className='text-xs text-red-600' />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-5 col-span-2">
                                    <label className=" text-sm">Berbayar</label>
                                    <Field
                                        type="checkbox"
                                        name="isPaid"
                                        className="border border-gray-500 rounded-md p-2"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const checked = e.target.checked;
                                            setIsPaid(checked);
                                            setFieldValue("isPaid", checked);
                                            setFieldValue("price", checked ? 0 : values.price);
                                        }}
                                        defaultChecked={values.isPaid}
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Deskripsi</label>
                                    <ReactQuill
                                        value={values.description}
                                        onChange={(html) => setFieldValue('description', html)}
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="bg-white flex flex-col mt-8 px-10 rounded-xl h-fit w-full border border-gray-200 shadow-lg p-5">
                            <h3 className="flex justify-center font-bold text-2xl pb-5">
                                Upload Gambar Event
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="text-sm border border-gray-300 rounded-md p-3 text-center">
                                    <b>Gambar 1</b>: Ukuran 1170 x 570px tidak lebih dari 1Mb
                                    (Format JPG, JPEG, PNG)
                                    <input
                                        id='gambar1'
                                        name='gambar1'
                                        type="file"
                                        accept="image/*"
                                        onChange={(event: any) =>
                                            setFieldValue(
                                                'images[0]',
                                                event?.currentTarget?.files[0],
                                            )
                                        }
                                        className="mx-auto"
                                    />
                                    <div className='h-1'>
                                        <ErrorMessage name="gambar1" component="div" className='text-xs text-red-600' />
                                    </div>
                                </label>
                                <label className="text-sm border border-gray-300 rounded-md p-3 text-center">
                                    <b>Gambar 2</b>: Ukuran 500 x 500px tidak lebih dari 1Mb
                                    (Format JPG, JPEG, PNG)
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event: any) =>
                                            setFieldValue(
                                                'images[1]',
                                                event?.currentTarget?.files[0],
                                            )
                                        }
                                    />
                                </label>
                                <label className="text-sm border border-gray-300 rounded-md p-3 text-center">
                                    <b>Gambar 3</b>: Ukuran 1000 x 1000px tidak lebih dari 2Mb
                                    (Format JPG, JPEG, PNG)
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event: any) =>
                                            setFieldValue(
                                                'images[2]',
                                                event?.currentTarget?.files[0],
                                            )
                                        }
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="px-40 rounded-xl  mt-8 h-fit w-full border border-gray-200 shadow-lg p-5" >
                            <h3 className="flex justify-center font-bold text-2xl mt-8 pb-5">
                                Tambah Tiket Baru
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col col-span-2">
                                    <label className=" text-sm">Nama Tiket</label>
                                    <Field
                                        name="ticketName"
                                        placeholder="Nama Tiket"
                                        value={newTicket.ticketName}
                                        className="border border-gray-500 rounded-md p-2"
                                        onChange={(e: any) =>
                                            setNewTicket({
                                                ...newTicket,
                                                ticketName: e.target.value,
                                            })
                                        }
                                    />
                                    <div className='h-1'>
                                        <ErrorMessage name="ticketName" component="div" className='text-xs text-red-600' />
                                    </div>
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className=" text-sm">Tipe Tiket</label>
                                    <Field
                                        name="ticketType"
                                        placeholder="Tipe Tiket"
                                        className="border border-gray-500 rounded-md p-2"

                                        value={newTicket.ticketType}
                                        onChange={(e: any) =>
                                            setNewTicket({
                                                ...newTicket,
                                                ticketType: e.target.value,
                                            })
                                        }
                                    />
                                    <div className='h-1'>
                                        <ErrorMessage name="ticketType" component="div" className='text-xs text-red-600' />
                                    </div>
                                </div>

                                {isPaid && (
                                    <div className="flex flex-col col-span-2">
                                        <label className=" text-sm">Harga</label>
                                        <Field
                                            name="price"
                                            placeholder="Harga"
                                            type="number"
                                            className="border border-gray-500 rounded-md p-2"

                                            value={newTicket.price}
                                            onChange={(e: any) =>
                                                setNewTicket({
                                                    ...newTicket,
                                                    price: Number(e.target.value),
                                                })
                                            }
                                        />
                                        <div className='h-1'>
                                            <ErrorMessage name="price" component="div" className='text-xs text-red-600' />
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-col col-span-2">
                                    <label className=" text-sm">Kuota Kursi</label>
                                    <Field
                                        name="seatAvailable"
                                        placeholder="Kuota Kursi"
                                        type="number"
                                        className="border border-gray-500 rounded-md p-2"

                                        value={newTicket.seatAvailable}
                                        onChange={(e: any) =>
                                            setNewTicket({
                                                ...newTicket,
                                                seatAvailable: Number(e.target.value),
                                            })
                                        }
                                    />
                                    <div className='h-1'>
                                        <ErrorMessage name="seatAvailable" component="div" className='text-xs text-red-600' />
                                    </div>
                                </div>

                                {isPaid && (
                                    <div className="flex flex-col col-span-2">
                                        <label className=" text-sm">Diskon</label>
                                        <Field
                                            name="discount"
                                            placeholder="Diskon"
                                            type="number"
                                            className="border border-gray-500 rounded-md p-2"

                                            value={newTicket.discount}
                                            onChange={(e: any) =>
                                                setNewTicket({
                                                    ...newTicket,
                                                    discount: Number(e.target.value),
                                                })
                                            }
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col col-span-2">
                                    <label className=" text-sm">Tanggal Mulai</label>
                                    <Field
                                        name="startDate"
                                        type="datetime-local" value={newTicket.startDate}
                                        className="border border-gray-500 rounded-md p-2"
                                        onChange={(e: any) =>
                                            setNewTicket({
                                                ...newTicket,
                                                startDate: e.target.value,
                                            })
                                        }
                                    />
                                    <div className='h-1'>
                                        <ErrorMessage name="startDate" component="div" className='text-xs text-red-600' />
                                    </div>
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className=" text-sm">Tanggal Berakhir</label>
                                    <Field
                                        name="endDate"
                                        type="datetime-local"
                                        className="border border-gray-500 rounded-md p-2"

                                        value={newTicket.endDate}
                                        onChange={(e: any) =>
                                            setNewTicket({ ...newTicket, endDate: e.target.value })
                                        }
                                    />
                                    <div className='h-1'>
                                        <ErrorMessage name="endDate" component="div" className='text-xs text-red-600' />
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setFieldValue('tickets', [...values.tickets, newTicket]);
                                    setNewTicket({
                                        price: 0,
                                        ticketName: '',
                                        ticketType: '',
                                        seatAvailable: 0,
                                        discount: 0,
                                        startDate: '',
                                        endDate: '',
                                    });
                                }}
                                className="bg-blue-500 text-white rounded-md p-3 mt-4 flex justify-center"
                            >
                                Tambah Tiket
                            </button>
                        </div>

                        <div>
                            <h3 className='flex justify-center font-bold text-2xl mt-8 pb-5 mb-4'>Daftar Tiket</h3>
                            {values.tickets.map((ticket: any, index: any) => (
                                <div key={index} className="bg-blue-50 p-4 mb-2 rounded-lg border border-blue-200 shadow-md w-full mx-auto">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {ticket.ticketName}
                                            </h3>
                                            <p className="text-gray-600 mt-1">
                                                {ticket.ticketType}
                                            </p>
                                            <div className="text-blue-600 mt-2">
                                                <span className="flex items-center flex-col">
                                                    <div className='flex items-center gap-1'>
                                                        <MdOutlineAccessTimeFilled />
                                                        Start : {ticket.startDate.split('T')[0]} • {ticket.startDate.split('T')[1]}
                                                    </div>
                                                    <div className='flex items-center gap-1'>
                                                        <MdOutlineAccessTimeFilled />
                                                        End : {ticket.endDate.split('T')[0]} • {ticket.endDate.split('T')[1]}
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const updatedTickets = values.tickets.filter((_: any, i: any) => i !== index);
                                                setFieldValue('tickets', updatedTickets);
                                            }}
                                            className="text-red-500"
                                        >
                                            <FaRegTrashAlt />
                                        </button>
                                    </div>
                                    <hr className="my-4 border-blue-300 border-dashed" />
                                    <div className="flex justify-between items-center">
                                        <p className="text-xl font-semibold">
                                            {ticket.discount > 0 ? (
                                                <div>
                                                    <span className="line-through mr-2 text-gray-500">Rp.{ticket.price}</span>
                                                    <span className="text-red-600">
                                                        Rp.{ticket.price - ticket.discount}
                                                    </span>
                                                </div>
                                            ) : (
                                                `Rp.${ticket.price}`
                                            )}
                                        </p>
                                        <div className="flex items-center space-x-4">
                                            Seat Available : {ticket.seatAvailable}
                                        </div>
                                    </div>
                                </div>


                            ))}
                        </div>
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white rounded-md p-3"
                            >
                                Buat Event
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    );
};

export default EventForm;
