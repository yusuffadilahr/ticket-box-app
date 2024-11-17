import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import authStore from "@/zustand/authstore"
import { useMutation, useQuery } from "@tanstack/react-query"
import instance from "@/utils/axiosInstance/axiosInstance"
import Image from "next/image"


export default function ProfileHeader() {
    const name = authStore((state) => state.firstName)
    const verified = authStore((state) => state.isVerified)
    const profilePicture = authStore((state) => state.profilePicture)

    const {mutate: HandleSendMail} = useMutation({
        mutationFn:async()=> {
            return await instance.get('/user/send-email-verify')
        }, 
        onSuccess:(res)=> {
            console.log(res)
        },
        onError: (err)=> {
            console.log(err)
        }
    })

return (
    <div className="flex gap-2 lg:gap-5 items-center">
        <Avatar className=' w-[80px] h-[80px] border-blue-400 border-2 hover:border-yellow-500 transition-all duration-300'>
            <AvatarImage className="object-cover" src={profilePicture} alt="foto-profil" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
            <h1 className="font-bold text-2xl">Hai, {name}</h1>
            <h2 className="text-sm lg:text-base">Atur Akun kamu disini</h2>
        </div>
        {verified == false ?
            <button onClick={()=> HandleSendMail()} className=" bg-blue-600 text-white hover:font-bold transition-all active:bg-yellow-500  focus:ring focus:bg-blue-950 focus:text-white duration-300 ease-in-out  p-2 rounded-lg">
                Verifikasi Email Anda
            </button>
            :
            <div className="text-gray-400">Email Terverifikasi ✔ </div>
        }
    </div>
)
}