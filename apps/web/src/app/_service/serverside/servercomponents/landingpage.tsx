'use server'

import LoadingComponent from "../../clientside/loading";
import dynamic from "next/dynamic";
import { getDataCarousell, getDataComedy, getDataNewest, getDataTopSell } from "../fetchserver/landingpage";

const DynamicBodyLanding = dynamic(() => import('../../clientside/landingcomponent'), {
    loading: () => <div className="h-screen w-full bg-white"></div>

});

export default async function LandingPage() {
    const dataTopSell = (await getDataTopSell())?.data
    const dataComedy = (await getDataComedy())?.data
    const dataNewest = (await getDataNewest())?.data
    const dataCarousell = (await getDataCarousell())?.data || []

    return <DynamicBodyLanding dataTopSell={dataTopSell || []} dataCarousell={dataCarousell || []}
        dataNewest={dataNewest || []} dataComedy={dataComedy || []} />
}