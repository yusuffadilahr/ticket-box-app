import dynamic from "next/dynamic";
import LoadingComponent from "./_service/clientside/loading";

const DynamicBodyLanding = dynamic(() => import('@/app/_service/serverside/servercomponents/landingpage'), {
  loading: () => <div className="h-screen w-full bg-white"></div>

});
export default function Page() {
  return (
    <div>
      <DynamicBodyLanding />
    </div>
  );
}