import { Field, ErrorMessage } from 'formik';

interface CreateTicketProps {
  isPaid: boolean;
}

export default function CreateTicket({ isPaid }: CreateTicketProps) {
    return (
        <>
        <div className="flex flex-col col-span-2">
                  <label className=" text-sm">Nama Tiket</label>
                  <Field
                    name="ticketName"
                    placeholder="Nama Tiket"
                    className="border border-gray-500 rounded-md p-2"
        
                  />
                  <div className="h-1">
                    <ErrorMessage
                      name="ticketName"
                      component="div"
                      className="text-xs text-red-600"
                    />
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <label className=" text-sm">Tipe Tiket</label>
                  <Field
                    name="ticketType"
                    placeholder="Tipe Tiket"
                    className="border border-gray-500 rounded-md p-2"

                  />
                  <div className="h-1">
                    <ErrorMessage
                      name="ticketType"
                      component="div"
                      className="text-xs text-red-600"
                    />
                  </div>
                </div>

                {
        isPaid && (
            <div className="flex flex-col col-span-2">
                <label className=" text-sm">Harga</label>
                <Field
                    name="price"
                    placeholder="Harga"
                    type="number"
                    className="border border-gray-500 rounded-md p-2"

            
                />
                <div className="h-1">
                    <ErrorMessage
                        name="price"
                        component="div"
                        className="text-xs text-red-600"
                    />
                </div>
            </div>
        )
    }
    <div className="flex flex-col col-span-2">
        <label className=" text-sm">Kuota Kursi</label>
        <Field
            name="seatAvailable"
            placeholder="Kuota Kursi"
            type="number"
            className="border border-gray-500 rounded-md p-2"

      
        />
        <div className="h-1">
            <ErrorMessage
                name="seatAvailable"
                component="div"
                className="text-xs text-red-600"
            />
        </div>
    </div>

    {
        isPaid && (
            <div className="flex flex-col col-span-2">
                <label className=" text-sm">Diskon</label>
                <Field
                    name="discount"
                    placeholder="Diskon"
                    type="number"
                    className="border border-gray-500 rounded-md p-2"

               
                />
                <ErrorMessage
                    name="discount"
                    component="div"
                    className="text-xs text-red-600"
                />
            </div>
        )
    }
                <div className="flex flex-col col-span-2">
                  <label className=" text-sm">Tanggal Mulai</label>
                  <Field
                    name="startDate"
                    type="datetime-local"
                    className="border border-gray-500 rounded-md p-2"
                 
                  />
                  <div className="h-1">
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className="text-xs text-red-600"
                    />
                  </div>
                </div>
                <div className="flex flex-col col-span-2">
                  <label className=" text-sm">Tanggal Berakhir</label>
                  <Field
                    name="endDate"
                    type="datetime-local"
                    className="border border-gray-500 rounded-md p-2"

               
                  />
                  <div className='h-1'>
                    <ErrorMessage name="endDate" component="div" className='text-xs text-red-600' />
                  </div>
                </div>
    </>
    )
}