'use server'

import dynamic from "next/dynamic";
import { getCategory, getDataExplore } from "../fetchserver/explore";
import LoadingComponent from "../../clientside/loading";

const DynamicExploreComponent = dynamic(() => import('@/app/event/explore/explore'), {
    loading: () => <LoadingComponent />
})
export default async function ExploreComponentServer({
    searcParams
}: {
    searcParams: any
}) {
    const { search,
        page,
        limitData,
        category,
        minPrice,
        maxPrice,
        location,
        dateFrom,
        dateUntil
     } = searcParams
    const dataExplore = (await getDataExplore({
        searchInput: search,
        page: page,
        limitData: limitData,
        selectedCategory: category,
        minPrice: minPrice,
        maxPrice: maxPrice,
        location: location,
        dateFrom: dateFrom,
        dateUntil: dateUntil
    }))?.data?.data
    
    const dataCategory = (await getCategory())?.data?.data

    return (
        <div>
            <DynamicExploreComponent dataCategory={dataCategory} searchParams={searcParams}dataExplore={dataExplore} />
        </div>
    );
}