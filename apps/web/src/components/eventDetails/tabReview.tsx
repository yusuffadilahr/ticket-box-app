import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from './../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './../../components/ui/avatar';
import { FaStar } from 'react-icons/fa';
import authStore from './../../zustand/authstore';


export default function TabReview({ queryDataReview }:any) {
    const profilePicture = authStore((state) => state.profilePicture)
 
  
    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle className="pb-4">Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 px-4 max-h-[400px] overflow-y-auto">
                {queryDataReview?.dataReview?.map((item: any, index: any) => {
                    return (
                        <div key={index} className="w-full bg-white border border-gray-200 rounded-lg shadow py-2 px-6 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">

                                    <li className="py-2">

                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <Avatar className=' border-blue-400 border-2 hover:border-yellow-500 transition-all duration-300'>
                                                    <AvatarImage src={profilePicture} className="object-cover" alt="logo-user" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-base font-medium text-gray-900 truncate dark:text-white">
                                                    {item?.users?.firstName}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {item?.createdAt.split('T')[0]}
                                                </p>

                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                <div className="flex items-center">

                                                    <FaStar className='text-yellow-400 text-lg' />
                                                    <span className='text-2xl mr-1 gap-'>{item?.rating}</span>
                                                    <span className='text-sm text-gray-500'>/5</span>

                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-2">
                                        <div className="flex items-center ">

                                            <div className="flex-1 min-w-0 ms-4 flex-col">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {item?.reviewText}
                                                </p>
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    Feedback : {item?.feedback}
                                                </p>

                                            </div>

                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    )
                })
                }

            </CardContent>
        </Card>
    )
}