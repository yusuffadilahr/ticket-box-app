import dynamic from 'next/dynamic';

import { Field, ErrorMessage } from 'formik';
import { Tooltip } from 'react-tooltip';
// import ReactQuill from 'react-quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css';
import { RiInformation2Fill } from "react-icons/ri";


export default function CreateEventInfo({ getCategory, setIsPaid, setFieldValue, values }: any) {
    return (
        <div className="grid grid-cols-2 gap-4 px-2 lg:px-40">
            <div className="flex flex-col relative">
                <label className=" text-sm">Nama Event</label>
                <Field
                    name="eventName"
                    placeholder="Nama Acara"
                    className="border border-gray-500 rounded-md p-2"
                />
                <div className="h-1">
                    <ErrorMessage
                        name="eventName"
                        component="div"
                        className="text-xs text-red-600"
                    />
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
                        -- Pilih Kategori --
                    </option>
                    {getCategory?.length > 0 &&
                        getCategory?.map((item: any, i: any) => (
                            <option value={item?.id} key={i}>
                                {item?.Category}
                            </option>
                        ))}
                </Field>
                <div className="h-1">
                    <ErrorMessage
                        name="categoryId"
                        component="div"
                        className="text-xs text-red-600"
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <label className=" text-sm">Event Start Date</label>
                <Field
                    name="startEvent"
                    placeholder="Tanggal Mulai"
                    type="datetime-local"
                    className="border border-gray-500 rounded-md p-2"
                />
                <div className="h-1">
                    <ErrorMessage
                        name="startEvent"
                        component="div"
                        className="text-xs text-red-600"
                    />
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
                <div className="h-1">
                    <ErrorMessage
                        name="endEvent"
                        component="div"
                        className="text-xs text-red-600"
                    />
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
                <label className=" text-sm flex items-center">Lokasi Google Map <a data-tooltip-id="my-tooltip" data-tooltip-content="Didapatkan dengan klik share lokasi & copy link pada lokasi di google maps"><RiInformation2Fill /></a></label>
                <Tooltip id="my-tooltip" />
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
                        setFieldValue('isPaid', checked);
                        setFieldValue('price', checked ? values.price : 0);
                        setFieldValue('discount', checked ? values.discount : 0);
                    }}
                    defaultChecked={values.isPaid}
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
    )
}