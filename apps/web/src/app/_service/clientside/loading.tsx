import Image from "next/image";

export default function LoadingComponent() {
    return (
        <section className="w-full h-screen bg-white flex flex-col justify-center items-center">
            <div className="w-20">
                <Image
                    width={500}
                    height={500}
                    alt="loading"
                    unoptimized
                    src={'https://assets-v2.lottiefiles.com/a/903ffa84-1150-11ee-b76b-1f284ac5ea90/ICdNKu73qS.gif'}
                    className="w-20"
                />
            </div>
            <h1 className="text-neutral-400 text-sm mt-4">Mohon tunggu..</h1>
        </section>
    );
}