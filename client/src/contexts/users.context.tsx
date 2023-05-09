import { createContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import api from "@/services/api";
import { IAddress, IChangePassword, ISendEmail, IUser, IUserCreate, IUserEdite, IUserLogin } from "@/types/user";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { Box, Button, Flex, Text, ToastId, useToast } from "@chakra-ui/react";
import nookies from 'nookies'

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
    editeUser: (dataForm: IUserEdite) => void;
    deleteUser: () => void;
    editAdress: (dataForm: IAddress) => void;
}

export const UserContext = createContext({} as IUserContext)

export const UserContextProvider = ({ children }: IUserContextProvider) => {
    const router = useRouter()
    const [user, setUser] = useState<IUser | null>(null)
    const [stateButton, setStateButton] = useState("Enviar e-mail")
    const [secondsSendEmail, setSecondsSendEmail] = useState(0.2 * 60)
    const [disableButton, setDisableButton] = useState(false)
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
                    setUser(data)
                    router.push("/")
                } catch (err) {
                    console.log(err)
                }
            }
        }

        loadUser()
    }, [stateButton])

    useEffect(() => {
        if (router.asPath !== router.route) {
          setPreviousPath(router.asPath);
        }
      }, [router.asPath]);
  
    const loginUser = async (dataForm: IUserLogin) => {
        try {
            const { data } = await api.post("/login", dataForm)
            const { token, user } = data

            api.defaults.headers.authorization = `Bearer ${token}`

            setCookie(null, "karsToken", token, { maxAge: 3600 * 24, path: "/" })
            setCookie(null, "karsUser", JSON.stringify(user), { maxAge: 3600 * 24, path: "/" })
            setCookie(null, "karsUserId", JSON.stringify(user.id), { maxAge: 3600 * 24, path: "/" })
            setUser(user)

            router.push(previousPath)
        } catch (err: any) {
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
                                        {err.message.includes("500") ? "Ops!! Tivemos um problema, tente novamente mais tarde!" : "Verifique seus dados e tente novamente!"}
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
                                <Flex flexDirection={"column"} gap={"16px"}>
                                    <Text fontSize={"20px"}>
                                        Sua conta foi criada com sucesso!
                                    </Text>
                                    <Text fontWeight={"400"} color={"grey.300"}>
                                        Agora você poderá ver seus negócios crescendo em grande escala
                                    </Text>
                                    <Button maxW={"250px"} w={"100%"} h={"48px"} color={"white"} fontWeight={"500"} bgColor={"blue.300"} border={"1px solid blue.300"} _hover={{borderColor: "blue.400", bgColor: "blue.400"}} onClick={() => {
                                        closeToast()
                                        router.push("/login")}}>
                                        Ir para login
                                    </Button>
                                </Flex>
                            </Box>
                        </Flex>
                    )
                }
            })
        } catch (err: any) {
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
                                        {err.response.data.message.includes("email") && "Já existe uma conta com este email!"}
                                        {err.response.data.message.includes("cpf") && "Já existe uma conta com este CPF!"}
                                        {err.response.data.message.includes("phone") && "Já existe uma conta com este número de telefone!"}
                                        {err.message.includes("500") && "Verifique seus dados e tente novamente!"}
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

        const cookie = nookies.get()
        
        api.defaults.headers.authorization = `Bearer ${cookie['karsToken']}`
        api.patch(`/users/${user?.id}`, dataForm)
        .then ((response) => {
            toast({
                title: 'sucess',
                variant: 'solid',
                position: 'top-right',
                isClosable: true,
                render: () => (
                    <Box color={'grey.50'} p={3} bg={'green.700'} fontWeight={'bold'} borderRadius={'md'}>
                      Atualização realizada com sucesso!
                    </Box>
                  ),
            })
            router.reload()
        })
        .catch((err) => {
            toast({
                title: 'error',
                variant:'solid',
                position: 'top-right',
                isClosable: true,
                render: () => (
                    <Box color={'grey.50'} p={3} bg={'red.700'} fontWeight={'bold'} borderRadius={'md'}>
                      Erro na atualização, confira suas informações!
                    </Box>
                  ),
            })
        })
               
       }

    const deleteUser = async () => {
        const cookie = nookies.get()
        
        api.defaults.headers.authorization = `Bearer ${cookie['karsToken']}`
        api.delete(`/users/${user?.id}`)
        .then((response) => {
            toast({
                title: 'sucess',
                variant: 'solid',
                position: 'top-right',
                isClosable: true,
                render: () => (
                    <Box color={'gray.50'} p={3} bg={'green.700'} fontWeight={'bold'} borderRadius={'md'}>
                      Perfil excluído com sucesso !
                    </Box>
                  ),
            })
            destroyCookie(null, "karsToken")
            destroyCookie(null, "karsUser")
            destroyCookie(null, "karsUserId")
            setUser(null)
            router.push("/")
        })
        .catch((err) => {
            toast({
                title: 'error',
                variant:'solid',
                position: 'top-right',
                isClosable: true,
                render: () => (
                    <Box color={'gray.50'} p={3} bg={'red.700'} fontWeight={'bold'} borderRadius={'md'}>
                      Não foi possível excluir seu perfil!
                    </Box>
                  )
            })
        })
    }

    const editAdress = async (dataForm: IAddress) => {
        const cookie = nookies.get()

        api.defaults.headers.authorization = `Bearer ${cookie['karsToken']}`
        api.patch(`/address/${user?.address!.id}`, dataForm)
            .then((response) => {
                toast({
                    title: 'sucess',
                    variant: 'solid',
                    position: 'top-right',
                    isClosable: true,
                    render: () => (
                        <Box color={'grey.50'} p={3} bg={'green.700'} fontWeight={'bold'} borderRadius={'md'}>
                            Atualização realizada com sucesso!
                        </Box>
                    ),
                })
                router.reload()
            })
            .catch((err) => {
                toast({
                    title: 'error',
                    variant: 'solid',
                    position: 'top-right',
                    isClosable: true,
                    render: () => (
                        <Box color={'grey.50'} p={3} bg={'red.700'} fontWeight={'bold'} borderRadius={'md'}>
                            Erro na atualização, confira suas informações!
                        </Box>
                    ),
                })
            })
    }
    

    const logoutUser = () => {
        destroyCookie(null, "karsToken")
        destroyCookie(null, "karsUser")
        destroyCookie(null, "karsUserId")
        setUser(null)
        router.push("/login")
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
        <UserContext.Provider value={{ loginUser, createUser, logoutUser, user, editeUser, deleteUser, editAdress, sendEmail, stateButton, disableButton }}>
            {children}
        </UserContext.Provider>
    )
}