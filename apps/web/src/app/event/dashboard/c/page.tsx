'use client';
import dynamic from 'next/dynamic';

import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useMutation, useQuery } from '@tanstack/react-query';
import instance from './../../../../utils/axiosInstance/axiosInstance';
import { EventSchema } from './../../../../features/event/schema/eventSchemas';
import { toast } from 'react-hot-toast';

import 'react-quill/dist/quill.snow.css';

import { useRouter } from 'next/navigation';


const EditEventInfo = dynamic(() => import('./../../../../features/eventDashboard/components/editEventInfo'), { ssr: false });
const ImageUploader = dynamic(() => import('./../../../../features/eventDashboard/components/imageUploader'), { ssr: false });
const CreateNewTicket = dynamic(() => import('./../../../../features/eventDashboard/components/createNewTicket'), { ssr: false });
const TicketList = dynamic(() => import('./../../../../components/eventDashboard/ticketList'), { ssr: false });


const EventForm = () => {
  const router = useRouter()
  const { mutate: mutationCreateEvent, isPending } = useMutation({
    mutationFn: async (values: FormData) => {
      return await instance.post('/event/new-event', values);
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message);
      router.push('/event/dashboard/list-event')
      console.log(res);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
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


  const [isPaid, setIsPaid] = useState(true);

  return (
    <main className="bg-white p-5 px-1 lg:px-20">
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
          price: 0,
          ticketName: '',
          ticketType: '',
          seatAvailable: 0,
          discount: 0,
          startDate: '',
          endDate: '',
          tickets: [],
        }}

        validateOnChange={true}
        validateOnBlur={true}
        validationSchema={EventSchema}
        onSubmit={(values: any) => {
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

          fd.append(`tickets`, JSON.stringify(ticketsEvent));

          values.images.forEach((image: any, index: any) => {
            fd.append(`images`, image);
          });

          mutationCreateEvent(fd);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="">
            <EditEventInfo
              getCategory={getCategory}
              setIsPaid={setIsPaid}
              setFieldValue={setFieldValue}
              values={values}
            />

            <ImageUploader
              setFieldValue={setFieldValue}
              values={values}
            />

            <CreateNewTicket
              isPaid={isPaid}
              setFieldValue={setFieldValue}
              values={values}
            />
            <div>
              <h3 className='flex justify-center font-bold text-2xl mt-8 pb-5 mb-4'>Daftar Tiket</h3>
              <TicketList
                setFieldValue={setFieldValue}
                values={values}
              />
            </div>
            <div className="flex justify-center mt-8">
              <button
                disabled={isPending}
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 w-full ${isPending ? 'bg-neutral-700 hover:bg-blue-700' : ''} text-white rounded-md p-3`}
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
