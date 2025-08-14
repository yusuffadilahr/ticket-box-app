import LoadingComponent from '@/app/_service/clientside/loading';
import dynamic from 'next/dynamic';

const DynamicDetailComponent = dynamic(() => import('@/app/_service/serverside/servercomponents/detailevent'), {
    loading: () => <div className="h-screen w-full bg-white"></div>

});

export default function Page({ params }: { params: { detail: string } }) {
    const { detail } = params
    
    return (
        <div>
            <DynamicDetailComponent detail={detail} />
        </div>
    );
}