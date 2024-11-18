import EventInfo from './../../../../components/eventDetails/eventInfo';
import EventOrganizerInfo from './../../../../components/eventDetails/eventOrganizerInfo';


export default function InfoEvent({ queryDataDetailEvent }: any) {
    return (
        <div className="w-full lg:w-1/3 bg-white rounded-lg font-bold text-lg border border-gray-50 drop-shadow-lg p-7 flex flex-col">
            <EventInfo
                queryDataDetailEvent={queryDataDetailEvent}
            />
            <EventOrganizerInfo
                queryDataDetailEvent={queryDataDetailEvent}
            />
        </div>
    )
}