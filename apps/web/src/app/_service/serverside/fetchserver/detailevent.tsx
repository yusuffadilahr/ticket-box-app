import axios from "axios"
import { cookies } from "next/headers"

export const getDetailData = async (detail: string) => {
    try {
        const id = Number(detail.split('TBX')[0])
        const res = await axios.get(`https://ticket-box-app-production.up.railway.app/api/event/detail/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cache-Control': 'no-store'
            }
        }) 

        return res?.data
        
    } catch (error) { }
}

export const getReviewData = async (detail: string) => {
    try {
        const id = Number(detail.split('TBX')[0])
        const token = cookies().get('token')?.value

        const res = await axios.get(`https://ticket-box-app-production.up.railway.app/api/review/event/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cache-Control': 'no-store',
                'Authorization': `Bearer ${token}`
            }
        }) 

        return res?.data
        
    } catch (error) {}
}