import LoadingComponent from '@/app/_service/clientside/loading';
import dynamic from 'next/dynamic';

const DynamicExploreComponent = dynamic(() => import('@/app/_service/serverside/servercomponents/explore'), {
    loading: () => <LoadingComponent />,
});
export default function Page({ searchParams }: { searchParams: any }) {
    return (
        <div>
            <DynamicExploreComponent searcParams={searchParams}/>
        </div>
    );
}