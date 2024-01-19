// no cache
const fetcher = async <T>(url: string): Promise<T> => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            // // Dynamically set cache to no-store
            cache: 'no-store'
        })
        const data = await response.json();
        if (response.status !== 200) {
            throw new Error(data.message)
        }
        return data;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export default fetcher;