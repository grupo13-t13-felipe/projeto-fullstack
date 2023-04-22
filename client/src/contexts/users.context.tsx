import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import { IUser, IUserCreate, IUserLogin } from "@/types/user";
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
}

export const UserContext = createContext({} as IUserContext)

export const UserContextProvider = ({ children }: IUserContextProvider) => {
    const router = useRouter()
    const [user, setUser] = useState<IUser | null>(null)
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
    }, [])

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
        console.log(dataForm)

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

    return (
        <UserContext.Provider value={{ loginUser, createUser, logoutUser, user }}>
            {children}
        </UserContext.Provider>
    )
}