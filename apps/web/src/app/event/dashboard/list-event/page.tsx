import dynamic from "next/dynamic";

const DynamicBodyEvent = dynamic(()=> import('./_clientside/components/bodyEventTable'))

export default function page() {
  return <DynamicBodyEvent />
}