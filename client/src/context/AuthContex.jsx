import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl,  postRequest } from "../utils/service";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null)
    const [registerLoading, setRegisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",

    })
    const [loginError, setLoginError] = useState(null)
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginInfo, setLoginInfo] = useState({

        email: "",
        password: "",

    })

    useEffect(() => {
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user))
    }, [])
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, [])

    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setRegisterLoading(true)
        setRegisterError(null)
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))
        if (response.error) {
            return setRegisterError(response)
        }
        setRegisterLoading(false)

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    }, [registerInfo]);

    const loginUser = useCallback(async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError(null)
        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo))
        if (response.error) return setLoginError(response);
        setLoginLoading(false)
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    }, [loginInfo])

    const logoutUser = useCallback(() => {
        localStorage.removeItem("User")
        setUser(null)
    })

    return (
        <AuthContext.Provider value={{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            registerLoading,
            logoutUser,
            loginUser,
            loginInfo,
            updateLoginInfo,
            loginError,
            loginLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}