import Image from "next/image";
import { ErrorMessage } from "formik";

export default function ImageUpload({ setFieldValue, values }:any) {
    return (
        <>
        <div className="text-sm border border-gray-300 rounded-md p-3 text-center">
                  <label >
                    <b>Gambar 1</b>: Ukuran 1170 x 570px tidak lebih dari 1Mb
                    (Format JPG, JPEG, PNG)
                    <input
                      id='gambar1'
                      name='gambar1'
                      type="file"
                      accept="image/*"
                      // onChange={(event: any) =>
                      //   setFieldValue(
                      //     'images[0]',
                      //     event?.currentTarget?.files[0],
                      //   )
                      // }
                      // className="mx-auto"
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const file = event.currentTarget.files?.[0];

                        // Set the file in the form values
                        setFieldValue('images[0]', file);

                        // Generate a preview
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setFieldValue('imagesPreview[0]', reader.result); // Store preview URL in values
                          };
                          reader.readAsDataURL(file);
                        } else {
                          setFieldValue('imagesPreview[0]', null); // Clear the preview if no file is selected
                        }
                      }}
                      className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                    />
                    {values.imagesPreview?.[0] && (
                      <div className="mt-4">
                        <Image
                          src={values.imagesPreview[0]}
                          width={100}
                          height={100}
                          alt="Preview"
                          className="w-fit h-52  border rounded"
                        />
                      </div>
                    )}

                  </label>
                  <div className='h-1'>
                    <ErrorMessage name="gambar1" component="div" className='text-xs text-red-600' />
                  </div>
                </div>
                <div className="text-sm border border-gray-300 rounded-md p-3 text-center">
                  <label >
                    <b>Gambar 2</b>: Ukuran 500 x 500px tidak lebih dari 1Mb
                    (Format JPG, JPEG, PNG)
                    <input
                      type="file"
                      accept="image/*"
                      name='gambar2'
                      // onChange={(event: any) =>
                      //   setFieldValue(
                      //     'images[1]',
                      //     event?.currentTarget?.files[0],
                      //   )
                      // }

                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const file = event.currentTarget.files?.[0];

                        // Set the file in the form values
                        setFieldValue('images[1]', file);

                        // Generate a preview
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setFieldValue('imagesPreview[1]', reader.result); // Store preview URL in values
                          };
                          reader.readAsDataURL(file);
                        } else {
                          setFieldValue('imagesPreview[1]', null); // Clear the preview if no file is selected
                        }
                      }}
                      className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                    />
                    {values.imagesPreview?.[1] && (
                      <div className="mt-4">
                        <Image
                          src={values.imagesPreview[1]}
                          width={100}
                          height={100}
                          alt="Preview"
                          className="w-fit h-52  border rounded"
                        />
                      </div>
                    )}

                  </label>
            </div>
        </>
    )
}