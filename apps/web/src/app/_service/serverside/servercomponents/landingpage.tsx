'use server'

import LoadingComponent from "../../clientside/loading";
import dynamic from "next/dynamic";
import { getDataComedy, getDataNewest, getDataTopSell } from "../fetchserver/landingpage";

const DynamicBodyLanding = dynamic(() => import('@/app/landingcomponent'), {
    loading: () => <LoadingComponent />
});

export default async function LandingPage() {
    const dataTopSell = (await getDataTopSell())?.data
    const dataComedy = (await getDataComedy())?.data
    const dataNewest = (await getDataNewest())?.data

    return <DynamicBodyLanding dataTopSell={dataTopSell || []}
        dataNewest={dataNewest || []} dataComedy={dataComedy || []} />
}