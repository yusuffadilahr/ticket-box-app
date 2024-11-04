export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params
    console.log(slug)
    return (
        <div className="font-bold w-full h-screen justify-center items-center flex text-9xl">
            {slug}
        </div>
    );
}