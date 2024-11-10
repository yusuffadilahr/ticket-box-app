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

export default function AvatarHover() {

    const logout = authStore((state) => state.setAuth)
    const setKeepAuth = authStore((state) => state.setKeepAuth)
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
            identityNumber: null,
        })

        Cookies.remove('role')
        Cookies.remove('token')
        
        navigate.push('/user/login')
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild className="cursor-pointer">
                <Avatar className=' border-blue-400 border-2 hover:border-yellow-500 transition-all duration-300'>
                    <AvatarImage src={`http://localhost:8000/api/src/public/images/${profilePicture}`} alt="logo-user" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="max-w-fit">
                <div className="flex justify-between">
                    <div className="space-y-1 flex flex-col text-left">
                        <Link href="/profile/user-profile/home" className="flex justify-center">
                            <button className="text-base hover:font-bold transition-all duration-300 ">
                                View Profile
                            </button>
                        </Link>
                        <Link href="/profile/user-profile/reset-password" className="flex justify-center">
                            <button className="text-base hover:font-bold transition-all duration-300">
                                Reset Password
                            </button>
                        </Link>
                        <Link href="/profile/user-profile/transaction" className="flex justify-center">
                            <button className="text-base hover:font-bold transition-all duration-300">
                                My Tickets
                            </button>
                        </Link>
                        <button onClick={handleLogout} className="text-base text-red-600 font-bold">
                            Log Out
                        </button>
                        <div className="flex items-center pt-2">

                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}