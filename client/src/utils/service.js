export const baseUrl = "http://localhost:5003/api";

export const postRequest = async (url, body) => {
    const response = await fetch(url, {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body,
    })
    const data = await response.json();
    if (!response.ok) {
        let massage
        if (data?.massage) {
            massage = data.massage
        } else {
            massage = data
        }
        return { error: true, massage }

    }
    return data
}
export const getRequest = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
        let massage
        if (data?.massage) {
            massage = data.massage
        } else {
            massage = data
        }
        return { error: true, massage }

    }
    return data
}