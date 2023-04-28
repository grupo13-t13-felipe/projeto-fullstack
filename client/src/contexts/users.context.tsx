import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import { IChangePassword, ISendEmail, IUser, IUserCreate, IUserLogin } from "@/types/user";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { Box, useToast } from "@chakra-ui/react";

interface IUserContextProvider {
    children: React.ReactNode
}

interface IUserContext {
    loginUser: (dataForm: IUserLogin) => void;
    createUser: (dataForm: IUserCreate) => void;
    logoutUser: () => void;
    user: IUser | null;
    sendEmail: (dataForm: ISendEmail) => void;
    stateButton: string
    disableButton: boolean
}

export const UserContext = createContext({} as IUserContext)

export const UserContextProvider = ({ children }: IUserContextProvider) => {
    const router = useRouter()
    const [user, setUser] = useState<IUser | null>(null)
    const [stateButton, setStateButton] = useState("Enviar e-mail")
    const [secondsSendEmail, setSecondsSendEmail] = useState(0.2 * 60)
    const [disableButton, setDisableButton] = useState(false)
    const toast = useToast()

    useEffect(() => {
        const loadUser = async () => {
            const cookie = parseCookies()

            if (cookie.karsToken) {
                api.defaults.headers.authorization = `Bearer ${cookie.karsToken}`

                try {
                    const { data } = await api.get("/profile")
                    console.log("Usuario com token valido")
                    setUser(data)
                    router.push("/")
                } catch (err) {
                    console.log(err)
                }
            }
        }

        loadUser()
    }, [stateButton])

    const loginUser = async (dataForm: IUserLogin) => {
        try {
            const { data } = await api.post("/login", dataForm)
            const { token, user } = data

            api.defaults.headers.authorization = `Bearer ${token}`

            setCookie(null, "karsToken", token, { maxAge: 3600 * 24, path: "/" })
            setCookie(null, "karsUserData", JSON.stringify(user), { maxAge: 3600 * 24, path: "/" })
            setCookie(null, "karsUserName", JSON.stringify(user.name), { maxAge: 3600 * 24, path: "/" })
            setCookie(null, "karsUserId", JSON.stringify(user.id), { maxAge: 3600 * 24, path: "/" })
            setUser(user)

            router.push("/")
        } catch (err) {
            toast({
                title: "error",
                variant: "solid",
                position: "top-right",
                isClosable: true,
                render: () => {
                    return (
                        <Box borderRadius={"4px"} color={"grey.50"} p={3} bg={"red.700"} fontWeight={"500"}>
                            Ops!! Verifique seus dados e tente novamente!
                        </Box>
                    )
                }
            })
            console.log(err)
        }
    }

    const createUser = async (dataForm: IUserCreate) => {
        try {
            await api.post("/users", dataForm)

            router.push("/login")
        } catch (err) {
            toast({
                title: "error",
                variant: "solid",
                position: "top-right",
                isClosable: true,
                render: () => {
                    return (
                        <Box borderRadius={"4px"} color={"grey.50"} p={3} bg={"red.700"} fontWeight={"500"}>
                            Ops!! Verifique seus dados e tente novamente!
                        </Box>
                    )
                }
            })
            console.log(err)
        }
    }

    const logoutUser = () => {
        destroyCookie(null, "karsToken")
        destroyCookie(null, "karsUser")
        setUser(null)
    }

    const sendEmail = async (dataForm: ISendEmail) => {
        
        try {
            await api.post("/users/reset-password", dataForm)
            toast({
                title: "success",
                variant: "solid",
                position: "top-right",
                isClosable: true,
                render: () => {
                    return (
                        <Box borderRadius={"4px"} color={"grey.50"} p={3} bg={"green.700"} fontWeight={"500"}>
                            Verifique seu e-mail!
                        </Box>
                    )
                }
            })
            setDisableButton(true)
            timerSendEmail()
        } catch (err) {
            console.log(err)
        }
    }
    
    const timerSendEmail = () => {
        if(secondsSendEmail === 0){
            setStateButton("Enviar e-mail")
            setDisableButton(false)
            setSecondsSendEmail(0.2 * 60)
            return
        }
        setTimeout(() => {
            setSecondsSendEmail(secondsSendEmail - 1)
            setStateButton(`Enviar novo email: 00:00:${secondsSendEmail <= 10 ? `0${secondsSendEmail - 1}` : secondsSendEmail - 1}`)
        }, 1000)
    }
    
    useEffect(() => {
        if(stateButton === "Enviar e-mail"){
            return
        }
        timerSendEmail()
    }, [secondsSendEmail, disableButton])
    

    return (
        <UserContext.Provider value={{ loginUser, createUser, logoutUser, user, sendEmail, stateButton, disableButton }}>
            {children}
        </UserContext.Provider>
    )
}