import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { MdOutlineAccessTimeFilled } from 'react-icons/md';


export default function TabTiket({ queryDataDetailEvent, ticketQuantities, decrement, increment }:any) {
    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle className="pb-4">Pilih Tiket Anda:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                {queryDataDetailEvent?.tickets?.map((item: any, index: any) => {
                    const isExpired = new Date() > new Date(item.endDate)
                    const isSoldOut = item.seatAvailable < 1;

                    return (

                        <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-md w-full mx-auto">
                            <div className="flex  items-start">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {item.ticketName}
                                    </h3>
                                    <p className="text-gray-600 mt-1">
                                        {item.ticketType}
                                    </p>
                                    <div className="text-blue-600 mt-2">
                                        <span className="flex items-center">
                                            <MdOutlineAccessTimeFilled />
                                            Ends {item.endDate.split('T')[0]} • {queryDataDetailEvent?.tickets[0].endDate.split('T')[1].split('.')[0].slice(0, -3)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-4 border-blue-300 border-dashed" />
                            <div className="flex justify-between items-center">
                                <p className="text-xl font-semibold">

                                    {
                                        item.discount > 0 ? (
                                            <div>
                                                <span className="line-through mr-2 text-gray-500">Rp.{item.price}</span>
                                                <span className="text-red-600">
                                                    Rp{(item.price - item.discount).toLocaleString("id-ID")}
                                                </span>
                                            </div>
                                        ) : item.price == 0 ? 'Gratis'
                                            :
                                            (`Rp${item.price.toLocaleString("id-ID")}`)
                                    }

                                </p>
                                {isExpired ? <div className='text-red-500 font-bold'>KADALUARSA</div> : isSoldOut ? <div className='text-red-500 font-bold'>TIKET HABIS</div> :
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => decrement(index)}
                                            className="text-blue-500 border border-blue-500 rounded-full w-8 h-8 flex justify-center items-center"
                                        >
                                            –
                                        </button>
                                        <span>{ticketQuantities[index] || 0}</span>
                                        <button
                                            onClick={() => increment(index)}
                                            className={`text-blue-500 border border-blue-500 rounded-full w-8 h-8 flex justify-center items-center
                                                     (ticketQuantities[index] || 0) >= (item.seatAvailable || 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={(ticketQuantities[index] || 0) >= (item.seatAvailable || 0)}
                                        >
                                            +
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}