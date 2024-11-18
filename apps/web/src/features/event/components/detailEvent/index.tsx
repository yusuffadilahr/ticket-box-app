import { Tabs, TabsContent, TabsList, TabsTrigger } from './../../../../components/ui/tabs';
import TabDeskripsi from './../../../../components/eventDetails/tabDeskripsi';
import TabTiket from './../../../../components/eventDetails/tabTiket';
import TabReview from './../../../../components/eventDetails/tabReview';

export default function DetailEvent({ queryDataReview, increment, decrement, ticketQuantities, queryDataDetailEvent }:any) {
    return (
        <Tabs defaultValue="deskripsi" className="w-full lg:w-2/3">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="deskripsi">Deskripsi</TabsTrigger>
                <TabsTrigger value="tiket">Tiket</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>
            <TabsContent value="deskripsi">
                <TabDeskripsi
                    queryDataDetailEvent={queryDataDetailEvent}
                />
            </TabsContent>
            <TabsContent value="tiket">
                <TabTiket
                    queryDataDetailEvent={queryDataDetailEvent}
                    ticketQuantities={ticketQuantities}
                    decrement={decrement}
                    increment={increment}
                />
            </TabsContent>
            <TabsContent value="review">
                <TabReview
                    queryDataReview={queryDataReview}
                />
            </TabsContent>
        </Tabs>
    )
}