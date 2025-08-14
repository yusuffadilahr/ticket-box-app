import LoadingComponent from '@/app/_service/clientside/loading';
import dynamic from 'next/dynamic';

const DynamicExploreComponent = dynamic(() => import('./explore'), {
    loading: () => <div className="h-screen w-full bg-white"></div>
,
});
export default function Page({ searchParams }: { searchParams: any }) {
    return (
        <div>
            <DynamicExploreComponent searchParams={searchParams}/>
        </div>
    );
}