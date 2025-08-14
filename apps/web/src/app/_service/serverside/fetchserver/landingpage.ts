export const getDataTopSell = async () => {
    try {
        const res = await fetch('https://api-vi-ticketbox.gancy.my.id/api/event/bestseller-event', {
            next: { revalidate: 240 }
        })

        const response = await res.json()
        if (!res.ok) return response

        return response
    } catch (error) {
        return []
    }
}

export const getDataComedy = async () => {
    try {
        const res = await fetch('https://api-vi-ticketbox.gancy.my.id/api/event/comedy-event', {
            next: { revalidate: 240 }
        })

        const response = await res.json()
        if (!res.ok) return response

        return response
    } catch (error) {

        return []
    }
}

export const getDataNewest = async () => {
    try {
        const res = await fetch('https://api-vi-ticketbox.gancy.my.id/api/event/newest-event', {
            next: { revalidate: 240 }
        })

        const response = await res.json()

        if (!res.ok) return response

        return response
    } catch (error) {
        return []
    }
}

export const getDataCarousell = async () => {
    try {
        const res = await fetch('https://api-vi-ticketbox.gancy.my.id/api/event/carousel-images', {
            next: { revalidate: 1240 }
        })

        const response = await res.json()

        if (!res.ok) return response

        return response
    } catch (error) {
        return []
    }

}