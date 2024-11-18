'use client'; 

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import instance from '@/utils/axiosInstance/axiosInstance';
import { EventSchema } from '@/features/event/schema/eventSchemas';
import TiptapEditor from '@/components/RichTextEditor';
import { toast } from 'react-hot-toast'
import 'react-tooltip/dist/react-tooltip.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UpdateEventSchema } from '@/features/event/schema/updateEventSchemas';
import EditEventInfo from '@/features/eventDashboard/components/editEventInfo';
import { useState } from 'react';
import ImageUploader from '@/features/eventDashboard/components/imageUploader';
// Validasi menggunakan Yup

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params

    const { mutate: mutationCreateEvent } = useMutation({
        mutationFn: async (values: FormData) => {
            console.log(values);
            return await instance.put(`/event/updates-event/${slug}`, values);
        },
        onSuccess: (res) => {
            toast.success('berhasil')
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
    const { data: eventDetail } = useQuery({
        queryKey: ['get-event-detail',],
        queryFn: async () => {
            const res = await instance.get(`/event/detail/${slug}`);
            return res.data.data
            console.log(res.data.data)
        },
    });

    const [isPaid, setIsPaid] = useState(true);


    console.log(eventDetail)

    if (eventDetail == undefined) return <div></div>
    
    return (
        <main className="bg-white p-5 px-20">
            {/* <div className="bg-white rounded-xl shadow-lg h-96 overflow-y-auto"> */}
            <Formik
                initialValues={{
                    eventName: eventDetail[0]?.eventName || '',
                    location: eventDetail[0]?.location || '',
                    locationUrl: eventDetail[0]?.locationUrl || '',
                    description: eventDetail[0]?.description || '',
                    isPaid: eventDetail[0]?.isPaid ?? true,
                    startEvent: eventDetail[0]?.startEvent
                        ? new Date(eventDetail[0]?.startEvent).toISOString().slice(0, 16)
                        : '',
                    endEvent: eventDetail[0]?.endEvent
                        ? new Date(eventDetail[0]?.endEvent).toISOString().slice(0, 16)
                        : '',

                    categoryId: eventDetail[0]?.categoryId || '',
                }}
                // validationSchema={UpdateEventSchema}
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

                    values.images.forEach((image: any, index: any) => {
                        fd.append(`images`, image);
                    });

                    mutationCreateEvent(fd);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>

                        <EditEventInfo
                            getCategory={getCategory}
                            setIsPaid={setIsPaid}
                            setFieldValue={setFieldValue}
                            values={values}
                        />
                        {/* <section className="flex flex-col pb-24 justify-center rounded-xl">
                            <div className="flex justify-center font-bold text-2xl  pb-5">
                                Event
                            </div>
                            <div className="grid grid-cols-2 gap-4 px-2 lg:px-40">
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
                                    <ReactQuill
                                        value={values.description}
                                        onChange={(html) => setFieldValue('description', html)}
                                        className="h-full w-full"
                                    />
                                </div>
                            </div>
                        </section> */}

                        


                        <ImageUploader
                            setFieldValue={setFieldValue}
                            values={values}
                        />
                        {/* <div className="flex flex-col mt-8 px-10">
                            <h3 className="flex justify-center font-bold text-2xl pb-5">
                                Upload Gambar Event
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
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
                            </div>
                        </div> */}


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