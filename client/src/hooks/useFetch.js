import { useEffect, useState } from 'react'
import { baseUrl, getRequest } from '../utils/service'

const useFetchRecepinentUser = (chat, user) => {
    const [recepinentUser, setRecepinentUser] = useState(null);
    const [error, setError] = useState(null);

    const recipcentId = chat?.members?.find((id) => id !== user?._id)

    const getUser = async () => {
        if (!recipcentId) return null
        const response = await getRequest(`${baseUrl}/users/find/${recipcentId}`)
        if (response.error) {
            setError(response)
        }
        setRecepinentUser(response)
    }
    
    useEffect(() => {
        getUser();

    }, [recipcentId])


    return { recepinentUser }
}

export default useFetchRecepinentUser