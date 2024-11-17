import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';


export default function TabDeskripsi({ queryDataDetailEvent }:any) {
    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle className="pb-4">Deskripsi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div
                    dangerouslySetInnerHTML={{ __html: queryDataDetailEvent?.description }}
                    className="prose max-w-none"
                />
            </CardContent>
        </Card>
    )
}