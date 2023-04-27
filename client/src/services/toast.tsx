import { Box, Button, Flex, Text, ToastId, useToast } from "@chakra-ui/react"
import { useRef } from "react"

const toast = useToast()
const toastIdRef = useRef<ToastId>()

const closeToast = () => {
    if (toastIdRef.current) {
        toast.close(toastIdRef.current)
    }
}

const addLoginToast = () => {
    toastIdRef.current = toast({
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
}

export { addLoginToast }