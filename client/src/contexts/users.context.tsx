import { createContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import { IUser, IUserCreate, IUserEdite, IUserLogin } from "@/types/user";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { Box, Button, Flex, Text, ToastId, useToast } from "@chakra-ui/react";

interface IUserContextProvider {
    children: React.ReactNode
}

interface IUserContext {
    loginUser: (dataForm: IUserLogin) => void;
    createUser: (dataForm: IUserCreate) => void;
    logoutUser: () => void;
    user: IUser | null;
    editeUser: (dataForm: IUserEdite) => void;
    deleteUser: () => void
}

export const UserContext = createContext({} as IUserContext)

export const UserContextProvider = ({ children }: IUserContextProvider) => {
    const router = useRouter()
    const [user, setUser] = useState<IUser | null>(null)
    const [previousPath, setPreviousPath] = useState("/");
    const toast = useToast()
    const toastIdRef = useRef<ToastId>()

    const closeToast = () => {
      if (toastIdRef.current) {
        toast.close(toastIdRef.current)
      }
    }

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

    useEffect(() => {
        if (router.asPath !== router.route) {
          setPreviousPath(router.asPath);
        }
      }, [router.asPath]);
  
    const loginUser = async (dataForm: IUserLogin) => {
        try {
            console.log("yay")
            const { data } = await api.post("/login", dataForm)
            const { token, user } = data

            api.defaults.headers.authorization = `Bearer ${token}`

            setCookie(null, "karsToken", token, { maxAge: 3600 * 24, path: "/" })
            setCookie(null, "karsUser", JSON.stringify(user), { maxAge: 3600 * 24, path: "/" })
            setCookie(null, "karsUserId", JSON.stringify(user.id), { maxAge: 3600 * 24, path: "/" })
            setUser(user)

            router.push(previousPath)
        } catch (err) {
            toastIdRef.current = toast({
                title: "error",
                variant: "solid",
                position: "top",
                isClosable: true,
                render: () => {
                    return (
                        <Flex position={"fixed"} inset={"0"} justifyContent={"center"} alignItems={"center"} w={"100vw"} h={"100vh"} bgColor={"#00000080"} p={"12px"}>
                            <Box w={"520px"} bgColor={"white"} p={["10px", "16px", "20px"]} borderRadius={"4px"}>
                                <Flex mb={["20px", "20px", "40px"]} justifyContent={"space-between"} alignItems={"center"}>
                                    <Text fontSize={"20px"}>Opsss!! Algo deu errado!</Text>
                                    <Button onClick={closeToast} fontWeight={"400"} fontSize={"24px"} color={"grey.200"} border={"none"} bgColor={"transparent"} _hover={{bgColor: "transparent", color: "grey.250"}}>X</Button>
                                </Flex>
                                <Flex flexDirection={"column"}>
                                    <Text fontSize={"20px"}>
                                        Verifique seus dados e tente novamente!
                                    </Text>
                                </Flex>
                            </Box>
                        </Flex>
                    )
                }
            })
            console.log(err)
        }
    }

    const createUser = async (dataForm: IUserCreate) => {
        try {
            await api.post("/users", dataForm)
            toastIdRef.current = toast({
                title: "sucess",
                variant: "solid",
                position: "top",
                isClosable: true,
                render: () => {
                    return (
                        <Flex position={"fixed"} inset={"0"} justifyContent={"center"} alignItems={"center"} w={"100vw"} h={"100vh"} bgColor={"#00000080"} p={"12px"}>
                            <Box w={"520px"} bgColor={"white"} p={["10px", "16px", "20px"]} borderRadius={"4px"}>
                                <Flex mb={["20px", "20px", "40px"]} justifyContent={"space-between"} alignItems={"center"}>
                                    <Text fontSize={"20px"}>Sucesso!</Text>
                                    <Button onClick={closeToast} fontWeight={"400"} fontSize={"24px"} color={"grey.200"} border={"none"} bgColor={"transparent"} _hover={{bgColor: "transparent", color: "grey.250"}}>X</Button>
                                </Flex>
                                <Flex flexDirection={"column"}>
                                    <Text fontSize={"20px"}>
                                        Sua conta foi criada com sucesso!
                                    </Text>
                                    <Text fontWeight={"400"} color={"grey.300"}>
                                        Agora você poderá ver seus negócios crescendo em grande escala
                                    </Text>
                                    <Button onClick={() => router.push("/login")}>
                                        Ir para login
                                    </Button>
                                </Flex>
                            </Box>
                        </Flex>
                    )
                }
            })
            router.push("/login")
        } catch (err) {
            toastIdRef.current = toast({
                title: "error",
                variant: "solid",
                position: "top",
                isClosable: true,
                render: () => {
                    return (
                        <Flex position={"fixed"} inset={"0"} justifyContent={"center"} alignItems={"center"} w={"100vw"} h={"100vh"} bgColor={"#00000080"} p={"12px"}>
                            <Box w={"520px"} bgColor={"white"} p={["10px", "16px", "20px"]} borderRadius={"4px"}>
                                <Flex mb={["20px", "20px", "40px"]} justifyContent={"space-between"} alignItems={"center"}>
                                    <Text fontSize={"20px"}>Opsss!! Algo deu errado!</Text>
                                    <Button onClick={closeToast} fontWeight={"400"} fontSize={"24px"} color={"grey.200"} border={"none"} bgColor={"transparent"} _hover={{bgColor: "transparent", color: "grey.250"}}>X</Button>
                                </Flex>
                                <Flex flexDirection={"column"}>
                                    <Text fontSize={"20px"}>
                                        Verifique seus dados e tente novamente!
                                    </Text>
                                </Flex>
                            </Box>
                        </Flex>
                    )
                }
            })
            console.log(err)
        }
    }

    const editeUser = async (dataForm: IUserEdite) => {

        const cookie = parseCookies()

            if (cookie.karsToken) {
                api.defaults.headers.authorization = `Bearer ${cookie.karsToken}`
        try {
            await api.patch(`/users/${cookie.karsUserId}`, dataForm)
            
            router.reload()
        } catch (err) {
            
            console.log(err)
        }
        }
    }

    const deleteUser = async () => {

        const cookie = parseCookies()

            if (cookie.karsToken) {
                api.defaults.headers.authorization = `Bearer ${cookie.karsToken}`
        try {
            await api.delete(`/users/${cookie.karsUserId}`)
            
            router.reload()
        } catch (err) {
            
            console.log(err)
        }
    }
}

    

    const logoutUser = () => {
        destroyCookie(null, "karsToken")
        destroyCookie(null, "karsUser")
        destroyCookie(null, "karsUserId")
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ loginUser, createUser, logoutUser, user, editeUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    )
}