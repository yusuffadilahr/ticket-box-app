'use server'

import dynamic from 'next/dynamic';
import LoadingComponent from '../../clientside/loading';
import { getDetailData, getReviewData } from '../fetchserver/detailevent';

const DynamicDetailClientComponent = dynamic(() => import('@/app/event/explore/[detail]/detail'), {
    loading: () => <LoadingComponent />
});

export default async function DetailEvent({ detail }: { detail: string }) {
    const dataDetail = await getDetailData(detail) 
    const dataReview = await getReviewData(detail)

    return (
        <div>
            <DynamicDetailClientComponent detail={detail} queryDataDetailEvent={dataDetail?.data[0]}
            queryDataReview={dataReview}/>
        </div>
    );
}