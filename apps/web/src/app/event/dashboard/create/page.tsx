'use client'; // Add this line at the top of your component file

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import { EventSchema } from '@/features/event/schema/eventSchemas';
import TiptapEditor from '@/components/RichTextEditor';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';
import { toast } from 'react-hot-toast'
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
// Validasi menggunakan Yup

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

    return (
        <main className="bg-white p-5 px-20">
            {/* <div className="bg-white rounded-xl shadow-lg h-96 overflow-y-auto"> */}
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
                    <Form>
                        <section className="flex flex-col justify-center rounded-xl">
                            <div className="flex justify-center font-bold text-2xl pb-5">
                                Event
                            </div>
                            <div className="grid grid-cols-2 gap-4 px-40">
                                <div className="flex flex-col">
                                    <label className="font-bold text-sm">Nama Event</label>
                                    <Field
                                        name="eventName"
                                        placeholder="Nama Acara"
                                        className="border border-gray-500 rounded-md p-2"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold text-sm">Kategori</label>
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
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold text-sm">
                                        Event Start Date
                                    </label>
                                    <Field
                                        name="startEvent"
                                        placeholder="Tanggal Mulai"
                                        type="datetime-local"
                                        className="border border-gray-500 rounded-md p-2"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold text-sm">Event End Date</label>
                                    <Field
                                        name="endEvent"
                                        placeholder="Tanggal Akhir"
                                        type="datetime-local"
                                        className="border border-gray-500 rounded-md p-2"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-bold text-sm">Lokasi</label>
                                    <Field
                                        name="location"
                                        placeholder="Lokasi"
                                        className="border border-gray-500 rounded-md p-2"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold text-sm">Lokasi Google Map</label>
                                    <Field
                                        name="locationUrl"
                                        placeholder="Google Map Embed"
                                        className="border border-gray-500 rounded-md p-2"
                                        type="text"
                                    />
                                </div>

                                <div className="flex items-center justify-center gap-5 col-span-2">
                                    <label className="font-bold text-sm">Berbayar</label>
                                    <Field
                                        type="checkbox"
                                        name="isPaid"
                                        className="border border-gray-500 rounded-md p-2"
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Deskripsi</label>
                                    <TiptapEditor
                                        value={values.description}
                                        onChange={(html: any) => setFieldValue('description', html)}

                                    // Update Formik on change
                                    />
                                    {/* <Field
                                        name="description"
                                        placeholder="Deskripsi"
                                        as="textarea"
                                        className="col-span-2 border border-gray-500 rounded-md p-2"
                                    /> */}
                                </div>
                            </div>
                        </section>

                        <div className="flex flex-col mt-8 px-10">
                            <h3 className="flex justify-center font-bold text-2xl pb-5">
                                Upload Gambar Event
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="text-sm border border-gray-300 rounded-md p-3 text-center">
                                    <b>Gambar 1</b>: Ukuran 1170 x 570px tidak lebih dari 1Mb
                                    (Format JPG, JPEG, PNG)
                                    <input
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

                        <div className="px-40">
                            <h3 className="flex justify-center font-bold text-2xl mt-8 pb-5">
                                Tambah Tiket Baru
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Nama Tiket</label>
                                     <button
                                        id="tooltip-button"
                                        className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg"
                                    >
                                        Hover me
                                    </button>
                                    <Tooltip
                                        anchorSelect="#tooltip-button"
                                        place="top"
                                        content="This is a tooltip"
                                        style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: 'white', borderRadius: '5px', padding: '8px' }}
                                    />
                                    <Field
                                        name="ticketName"
                                        placeholder="Nama Tiket"
                                        value={newTicket.ticketName}
                                        onChange={(e: any) =>
                                            setNewTicket({
                                                ...newTicket,
                                                ticketName: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Tipe Tiket</label>
                                    <Field
                                        name="ticketType"
                                        placeholder="Tipe Tiket"
                                        value={newTicket.ticketType}
                                        onChange={(e: any) =>
                                            setNewTicket({
                                                ...newTicket,
                                                ticketType: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Harga</label>
                                    <Field
                                        name="price"
                                        placeholder="Harga"
                                        type="number"
                                        value={newTicket.price}
                                        onChange={(e: any) =>
                                            setNewTicket({
                                                ...newTicket,
                                                price: Number(e.target.value),
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Kuota Kursi</label>
                                    <Field
                                        name="seatAvailable"
                                        placeholder="Kuota Kursi"
                                        type="number"
                                        value={newTicket.seatAvailable}
                                        onChange={(e: any) =>
                                            setNewTicket({
                                                ...newTicket,
                                                seatAvailable: Number(e.target.value),
                                            })
                                        }
                                    />
                                </div>

                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Diskon</label>
                                    <Field
                                        name="discount"
                                        placeholder="Diskon"
                                        type="number"
                                        value={newTicket.discount}
                                        onChange={(e: any) =>
                                            setNewTicket({
                                                ...newTicket,
                                                discount: Number(e.target.value),
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Tanggal Mulai</label>
                                    <Field
                                        name="startDate"
                                        type="datetime-local" value={newTicket.startDate}
                                        onChange={(e: any) =>
                                            setNewTicket({
                                                ...newTicket,
                                                startDate: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Tanggal Akhir</label>
                                    <Field
                                        name="endDate"
                                        type="datetime-local"
                                        value={newTicket.endDate}
                                        onChange={(e: any) =>
                                            setNewTicket({ ...newTicket, endDate: e.target.value })
                                        }
                                    />
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
                                className="bg-blue-500 text-white rounded-md p-3 mt-4"
                            >
                                Tambah Tiket
                            </button>
                        </div>

                        <div>
                            <h3 className='mb-4'>Daftar Tiket</h3>
                            {values.tickets.map((ticket: any, index: any) => (
                                <div key={index} className="bg-blue-50 p-4 mb-2 rounded-lg border border-blue-200 shadow-md w-full mx-auto">
                                    <div className="flex  items-start">
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




                                // <div key={index}>
                                //     <p>Nama Tiket: {ticket.ticketName}</p>
                                //     <p>Tipe Tiket: {ticket.ticketType}</p>
                                //     <p>Harga: {ticket.price}</p>
                                //     <p>Kursi Tersedia: {ticket.seatAvailable}</p>
                                //     <p>Diskon: {ticket.discount}</p>
                                //     <p>Tanggal Mulai Diskon: {ticket.discountStart}</p>
                                //     <p>Tanggal Akhir Diskon: {ticket.discountExpiry}</p>
                                //     <p>Tanggal Mulai: {ticket.startDate}</p>
                                //     <p>Tanggal Akhir: {ticket.endDate}</p>
                                // </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white rounded-md p-3"
                            >
                                Simpan Event
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            {/* </div> */}
        </main>
    );
};

export default EventForm;
