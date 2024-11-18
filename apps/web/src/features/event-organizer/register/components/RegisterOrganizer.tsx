import Image from "next/image";

export default function WelcomeCard({ logo }: any) {
    return (
        <div className="absolute lg:block hidden z-10 p-16 text-white">
            <Image
                src={logo}
                alt="background"
                className="rounded-xl object-cover w-8 md:w-20 lg:w-48"
            />
            <div className="mt-8 font-bold text-5xl">Welcome  👋</div>
            <div className="font-bold text-4xl">Event Creator</div>
            <div className="mt-10 text-lg">Gabung jadi Event Creator dengan sangat mudah! </div>
            <div className="text-lg">Buat event dan manage tiketmu di Tiketbox.com</div>
        </div>
    );
}