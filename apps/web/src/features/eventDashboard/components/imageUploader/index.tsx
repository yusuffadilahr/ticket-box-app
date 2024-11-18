import ImageUpload from "../../../../components/eventDashboard/imageUpload"

export default function ImageUploader({ setFieldValue, values }:any) {
    return (
        <div className="bg-white flex flex-col mt-8 px-10 rounded-xl h-fit w-full border border-gray-200 shadow-lg p-5">
            <h3 className="flex justify-center font-bold text-2xl pb-5">
                Upload Gambar Event
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <ImageUpload
                    setFieldValue={setFieldValue}
                    values={values}
                />
            </div>
        </div>
    )
}