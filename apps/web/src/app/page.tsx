import dynamic from "next/dynamic";
import LoadingComponent from "./_service/clientside/loading";

const DynamicBodyLanding = dynamic(() => import('@/app/_service/serverside/servercomponents/landingpage'), {
  loading: () => <LoadingComponent />
});

export default function Page() {
  return (
    <div>
      <DynamicBodyLanding />
    </div>
  );
}