import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import authStore from "@/zustand/authstore"
import { useRouter } from "next/navigation"
import Link from 'next/link'
import Cookies from 'js-cookie'
import { FaStar } from "react-icons/fa";

export default function AvatarHover() {

    const logout = authStore((state) => state.setAuth)
    const setKeepAuth = authStore((state) => state.setKeepAuth)
    const loyaltyPoints = authStore((state) => state.point)
    const profilePicture = authStore((state) => state.profilePicture)
    console.log(profilePicture)

    const navigate = useRouter()

    const handleLogout = () => {
        logout({ token: '' })
        setKeepAuth({
            token: '',
            firstName: '',
            lastName: '',
            role: '',
            phoneNumber: '',
            profilePicture: '',
            referralCode: '',
            identityNumber: '',
        })

        Cookies.remove('role')
        Cookies.remove('token')

        navigate.push('/user/login')
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild className="cursor-pointer">
                <Avatar className=' border-blue-400 border-2 hover:border-yellow-500 transition-all duration-300'>
                    <AvatarImage src={`http://localhost:8000/api/src/public/images/${profilePicture}`} className="object-cover" alt="logo-user" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit px-10 flex justify-start h-fit">
                <div className="flex justify-between items-center">
                    <div className="space-y-1 flex flex-col w-full text-left">
                        <div className=" font-bold text-blue-800 flex flex-col items-center space-x-2 mb-2" >
                            <div className="flex items-center"><FaStar /> <span className='ml-1'>Loyalty Points</span></div>
                            <div className="text-lg">{loyaltyPoints}</div>
                        </div>
                        <Link href="/profile-user/profile" className="flex py-1">
                            <button className="text-base hover:font-bold transition-all duration-300 ">
                                View Profile
                            </button>
                        </Link>
                        <Link href="/profile-user/reset-password" className="flex py-1">
                            <button className="text-base hover:font-bold transition-all duration-300">
                                Reset Password
                            </button>
                        </Link>
                        <Link href="/profile-user/transaction" className="flex py-1">
                            <button className="text-base hover:font-bold transition-all duration-300">
                                My Tickets
                            </button>
                        </Link>
                        <button onClick={handleLogout} className="text-base flex py-1 w-full text-red-600 font-bold">
                            Log Out
                        </button>

                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}