import axios from "axios"

export const getDataExplore = async ({
    searchInput,
    page,
    limitData,
    selectedCategory,
    minPrice,
    maxPrice,
    location,
    dateFrom,
    dateUntil
}: {
    searchInput: string,
    page: number,
    limitData: number,
    selectedCategory: number | null,
    minPrice: number | null,
    maxPrice: number | null,
    location: string,
    dateFrom: string | null,
    dateUntil: string | null
}) => {
    try {
        const res = await axios.get('https://ticket-box-app-production.up.railway.app/api/event/search', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cache-Control': 'no-store'
            },
            params: {
                event: searchInput,
                page: page,
                limit_data: limitData,
                category: selectedCategory,
                minPrice: minPrice ?? 0,
                maxPrice: maxPrice ?? 999999999,
                location: location,
                dateFrom: dateFrom ?? '',
                dateUntil: dateUntil ?? '',
            }
        })

        return res
    } catch (error) {}
}

export const getCategory = async () => {
    try {
        const res = await axios.get('https://ticket-box-app-production.up.railway.app/api/category', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cache-Control': 'no-store'
            }
        })

        return res
    } catch (error) {
        
    }
}