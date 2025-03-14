export const getDataTopSell = async () => {
    try {
        const res = await fetch('https://ticket-box-app-production.up.railway.app/api/event/bestseller-event', {
            cache: 'no-store'
        })

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const response = res.json()
        return response
    } catch (error) {}
}
export const getDataComedy = async () => {
    try {
        const res = await fetch('https://ticket-box-app-production.up.railway.app/api/event/comedy-event', {
            cache: 'no-store'
        })

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const response = res.json()
        return response
    } catch (error) {}
}

export const getDataNewest = async () => {
    try {
        const res = await fetch('https://ticket-box-app-production.up.railway.app/api/event/newest-event', {
            cache: 'no-store'
        })

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        const response = res.json()
        return response
    } catch (error) {}
}