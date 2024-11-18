'use client'

import CreateEventInfo from "./../../../../components/eventDashboard/createEventInfo"

export default function EditEventInfo({ getCategory, setIsPaid, setFieldValue, values }:any) {
    return (
        <section className="bg-white flex flex-col justify-center rounded-xl h-fit pb-24 w-full border border-gray-200 shadow-lg p-5">
            <div className="flex justify-center font-bold text-2xl pb-5">
                Event
            </div>
            <CreateEventInfo
                getCategory={getCategory}
                setIsPaid={setIsPaid}
                setFieldValue={setFieldValue}
                values={values}
            />
        </section>
    )
}