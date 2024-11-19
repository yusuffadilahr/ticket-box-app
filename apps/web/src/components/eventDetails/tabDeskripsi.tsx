import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from './../../components/ui/card';
import Image from 'next/image';

export default function TabDeskripsi({ queryDataDetailEvent }:any) {
    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle className="pb-4">Deskripsi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {queryDataDetailEvent?.EventImages[1]?.eventImageUrl ? 

                <Image
                    src={queryDataDetailEvent?.EventImages[1]?.eventImageUrl}
                    alt="testing"
                    className="object-cover w-full h-auto rounded-lg drop-shadow-lg"
                    width={500}
                    height={500}
                />
                 : <></>   }
                <div
                    dangerouslySetInnerHTML={{ __html: queryDataDetailEvent?.description }}
                    className="prose max-w-none"
                />
            </CardContent>
        </Card>
    )
}