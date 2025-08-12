import Image from "next/image"

export default function EventImage({ queryDataDetailEvent }: any) {
    return (
        <div className="w-full lg:w-2/3">
            <Image
                src={queryDataDetailEvent?.EventImages[0]?.eventImageUrl.includes('https://') ?
                    queryDataDetailEvent?.EventImages[0]?.eventImageUrl :
                    `https://api-vi-ticketbox.gancy.my.id/api/src/public/images/${queryDataDetailEvent?.EventImages[0]?.eventImageUrl}`
                } alt="testing"
                className="object-cover w-full h-auto rounded-lg drop-shadow-lg"
                width={1000}
                height={1000}
            />
        </div>
    )
}