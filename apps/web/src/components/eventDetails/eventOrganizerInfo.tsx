import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function EventOrganizerInfo({ queryDataDetailEvent }: any) {
    return (
        <div className="mt-auto  border-t-2">
            <div className="mt-4 flex items-center gap-6">
                <Avatar>
                    <AvatarImage
                        src={queryDataDetailEvent?.EventOrganizer?.profilePicture}
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <div className="text-gray-600 text-sm font-normal ">
                        Diselenggarakan Oleh
                    </div>
                    <div>{queryDataDetailEvent?.EventOrganizer?.organizerName}</div>
                </div>
            </div>
        </div>
    )
}