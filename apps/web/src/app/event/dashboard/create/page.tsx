'use client'; // Add this line at the top of your component file

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import instance from "@/utils/axiosInstance/axiosInstance";

// Validasi menggunakan Yup
const EventSchema = Yup.object().shape({
    eventName: Yup.string().required("Nama acara wajib diisi"),
    location: Yup.string().required("Lokasi wajib diisi"),
    description: Yup.string(),
    isPaid: Yup.boolean(),
    startEvent: Yup.date().required("Tanggal mulai wajib diisi"),
    endEvent: Yup.date().required("Tanggal akhir wajib diisi"),
    artist: Yup.string(),
    categoryId: Yup.string(),
    userId: Yup.string(),
    tickets: Yup.array().of(
        Yup.object().shape({
            price: Yup.number().required("Harga tiket wajib diisi"),
            ticketName: Yup.string().required("Nama tiket wajib diisi"),
            ticketType: Yup.string().required("Tipe tiket wajib diisi"),
            seatAvailable: Yup.number(),
            discount: Yup.number(),
            discountStart: Yup.date(),
            discountExpiry: Yup.date(),
            startDate: Yup.date(),
            endDate: Yup.date(),
        })
    ),
    images: Yup.array().of(Yup.mixed().required("Gambar wajib diisi")),
});

const EventForm = () => {
    const {mutate: mutationCreateEvent} = useMutation({
        mutationFn: async(values)=> {
            return await instance.post('/event/new-event', values)
        }
    })
    const [newTicket, setNewTicket] = useState({
        price: 0,
        ticketName: "",
        ticketType: "",
        seatAvailable: 0,
        discount: 0,
        discountStart: "",
        discountExpiry: "",
        startDate: "",
        endDate: "",
    });

    return (
        <main className="p-10">
            <Formik
                initialValues={{
                    eventName: "",
                    location: "",
                    description: "",
                    isPaid: true,
                    startEvent: "",
                    endEvent: "",
                    artist: "",
                    categoryId: "",
                    userId: "",
                    tickets: [],
                    images: [null, null, null], // Array to hold images
                }}
                validationSchema={EventSchema}
                onSubmit={(values: any) => {
                    console.log(values)
                    const formData = new FormData();
                    Object.entries(values).forEach(([key, value]: any) => {
                        if (key !== "tickets" && key !== "images") {
                            formData.append(key, value);
                        } else if (key === "tickets") {
                            values.tickets.forEach((ticket: any, index: any) => {
                                formData.append(`tickets[${index}][price]`, ticket.price);
                                formData.append(`tickets[${index}][ticketName]`, ticket.ticketName);
                                formData.append(`tickets[${index}][ticketType]`, ticket.ticketType);
                                formData.append(`tickets[${index}][seatAvailable]`, ticket.seatAvailable);
                                formData.append(`tickets[${index}][discount]`, ticket.discount);
                                formData.append(`tickets[${index}][discountStart]`, ticket.discountStart);
                                formData.append(`tickets[${index}][discountExpiry]`, ticket.discountExpiry);
                                formData.append(`tickets[${index}][startDate]`, ticket.startDate);
                                formData.append(`tickets[${index}][endDate]`, ticket.endDate);
                            });
                        } else if (key === "images") {
                            value.forEach((image: any, index: any) => {
                                if (image) {
                                    formData.append(`images[${index}]`, image);
                                }
                            });
                        }
                    });
                    console.log(formData, '< data')
                    mutationCreateEvent(values)
                    // Lakukan POST ke backend
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <section className="flex flex-col justify-center rounded-xl">
                            <div className="flex justify-center font-bold text-2xl pb-5">Event</div>
                            <div className="grid grid-cols-2 gap-4 px-40">
                                <div className="flex flex-col">
                                    <label className="font-bold text-sm">Nama Event</label>
                                    <Field name="eventName" placeholder="Nama Acara" className="border border-gray-500 rounded-md p-2" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold text-sm">Lokasi</label>
                                    <Field name="location" placeholder="Lokasi" className="border border-gray-500 rounded-md p-2" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold text-sm">Event Start Date</label>
                                    <Field name="startEvent" placeholder="Tanggal Mulai" type="datetime-local" className="border border-gray-500 rounded-md p-2" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold text-sm">Event End Date</label>
                                    <Field name="endEvent" placeholder="Tanggal Akhir" type="datetime-local" className="border border-gray-500 rounded-md p-2" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold text-sm">Artist</label>
                                    <Field name="artist" placeholder="Artis" className="border border-gray-500 rounded-md p-2" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-bold text-sm">Kategori</label>
                                    <Field name="categoryId" placeholder="ID Kategori" className="border border-gray-500 rounded-md p-2" />
                                </div>
                                <div className="flex items-center justify-center gap-5 col-span-2">
                                    <label className="font-bold text-sm">Berbayar</label>
                                    <Field type="checkbox" name="isPaid" className="border border-gray-500 rounded-md p-2" />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Deskripsi</label>
                                    <Field name="description" placeholder="Deskripsi" as="textarea" className="col-span-2 border border-gray-500 rounded-md p-2" />
                                </div>
                            </div>
                        </section>

                        <div className="flex flex-col mt-8 px-10">
                            <h3 className="flex justify-center font-bold text-2xl pb-5">Upload Gambar Event</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <label className="text-sm border border-gray-300 rounded-md p-3 text-center">
                                    <b>Gambar 1</b>: Ukuran 1170 x 570px tidak lebih dari 1Mb (Format JPG, JPEG, PNG)
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event: any) => setFieldValue("images[0]", event?.currentTarget?.files[0])}
                                        className="mx-auto"
                                    />
                                </label>
                                <label className="text-sm border border-gray-300 rounded-md p-3 text-center">
                                    <b>Gambar 2</b>: Ukuran 500 x 500px tidak lebih dari 1Mb (Format JPG, JPEG, PNG)
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event: any) => setFieldValue("images[1]", event?.currentTarget?.files[0])}
                                    />
                                </label>
                                <label className="text-sm border border-gray-300 rounded-md p-3 text-center">
                                    <b>Gambar 3</b>: Ukuran 1000 x 1000px tidak lebih dari 2Mb (Format JPG, JPEG, PNG)
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event: any) => setFieldValue("images[2]", event?.currentTarget?.files[0])}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="px-40">
                            <h3 className="flex justify-center font-bold text-2xl mt-8 pb-5">Tambah Tiket Baru</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Nama Tiket</label>
                                    <Field
                                        name="ticketName"
                                        placeholder="Nama Tiket"
                                        value={newTicket.ticketName}
                                        onChange={(e: any) => setNewTicket({ ...newTicket, ticketName: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Tipe Tiket</label>
                                    <Field
                                        name="ticketType"
                                        placeholder="Tipe Tiket"
                                        value={newTicket.ticketType}
                                        onChange={(e: any) => setNewTicket({ ...newTicket, ticketType: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Harga</label>
                                    <Field
                                        name="price"
                                        placeholder="Harga"
                                        type="number"
                                        value={newTicket.price}
                                        onChange={(e: any) => setNewTicket({ ...newTicket, price: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Kuota Kursi</label>
                                    <Field
                                        name="seatAvailable"
                                        placeholder="Kuota Kursi"
                                        type="number"
                                        value={newTicket.seatAvailable}
                                        onChange={(e: any) => setNewTicket({ ...newTicket, seatAvailable: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Diskon</label>
                                    <Field
                                        name="discount"
                                        placeholder="Diskon"
                                        type="number"
                                        value={newTicket.discount}
                                        onChange={(e: any) => setNewTicket({ ...newTicket, discount: Number(e.target.value) })}
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Tanggal Mulai Diskon</label>
                                    <Field
                                        name="discountStart"
                                        type="date"
                                        value={newTicket.discountStart}
                                        onChange={(e: any) => setNewTicket({ ...newTicket, discountStart: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Tanggal Akhir Diskon</label>
                                    <Field
                                        name="discountExpiry"
                                        type="date"
                                        value={newTicket.discountExpiry}
                                        onChange={(e: any) => setNewTicket({ ...newTicket, discountExpiry: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Tanggal Mulai</label>
                                    <Field
                                        name="startDate"
                                        type="date"
                                        value={newTicket.startDate}
                                        onChange={(e: any) => setNewTicket({ ...newTicket, startDate: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col col-span-2">
                                    <label className="font-bold text-sm">Tanggal Akhir</label>
                                    <Field
                                        name="endDate"
                                        type="date"
                                        value={newTicket.endDate}
                                        onChange={(e: any) => setNewTicket({ ...newTicket, endDate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setFieldValue("tickets", [...values.tickets, newTicket]);
                                    setNewTicket({
                                        price: 0,
                                        ticketName: "",
                                        ticketType: "",
                                        seatAvailable: 0,
                                        discount: 0,
                                        discountStart: "",
                                        discountExpiry: "",
                                        startDate: "",
                                        endDate: "",
                                    });
                                }}
                                className="bg-blue-500 text-white rounded-md p-3 mt-4"
                            >
                                Tambah Tiket
                            </button>
                        </div>

                        <div>
                            <h3>Daftar Tiket</h3>
                            {values.tickets.map((ticket: any, index: any) => (
                                <div key={index}>
                                    <p>Nama Tiket: {ticket.ticketName}</p>
                                    <p>Tipe Tiket: {ticket.ticketType}</p>
                                    <p>Harga: {ticket.price}</p>
                                    <p>Kursi Tersedia: {ticket.seatAvailable}</p>
                                    <p>Diskon: {ticket.discount}</p>
                                    <p>Tanggal Mulai Diskon: {ticket.discountStart}</p>
                                    <p>Tanggal Akhir Diskon: {ticket.discountExpiry}</p>
                                    <p>Tanggal Mulai: {ticket.startDate}</p>
                                    <p>Tanggal Akhir: {ticket.endDate}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-8">
                            <button type="submit" className="bg-blue-500 text-white rounded-md p-3">Simpan Event</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    );
};

export default EventForm;
