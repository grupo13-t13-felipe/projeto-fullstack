import DefaultHeader from '@/components/headers/headerDefault';
import DefaultFooter from '@/components/footer';
import DefaultForm from '@/components/form';
import { Box, Flex, useToast } from '@chakra-ui/react';
import { InputForm } from '@/components/input';
import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/users.context';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { IChangePassword } from '@/types/user';
import { changePasswordSchema } from '@/schemas/user.schema';
import Buttons from '@/components/button';
import { useRouter } from 'next/router';
import api from '@/services/api';

const SendEmail = () => {
    const router = useRouter();
    const { id } = router.query;
    const toast = useToast()
    const [idChangePassword, setIdChangePassword] = useState("")

    const changePassword = async (password: IChangePassword) => {
        try {
            await api.patch(`/users/reset-password/${idChangePassword}`, password)
            setTimeout(() => {
                toast({
                    title: "success",
                    variant: "solid",
                    position: "top-right",
                    isClosable: true,
                    render: () => {
                        return (
                            <Box borderRadius={"4px"} color={"grey.50"} p={3} bg={"green.700"} fontWeight={"500"}>
                                Senha alterada!
                            </Box>
                        )
                    }
                })
                router.push("/login")
            }, 1000)

        } catch (err) {
            console.log(err)
        }
    }


    const { register, handleSubmit, formState: { errors } } = useForm<IChangePassword>({
        resolver: yupResolver(changePasswordSchema)
    })

    return (
        <>
            <DefaultHeader />
            <Flex minH={"600px"} h={["calc(100vh - 60px - 149px)", "calc(100vh - 60px - 149px)", "calc(100vh - 60px - 120px)"]} justifyContent={"center"} alignItems={"center"} bgColor={"grey.50"} p={"16px"}>
                <DefaultForm submithandler={handleSubmit(changePassword)} formtitle="Inserir senha de recuperação">
                    <InputForm errors={errors.password?.message} isInvalid={!!errors.password?.message} inputregister={{ ...register("password") }} isRequired mb={"12px"} labeltext={"Senha"} inputplaceholder={"Digitar senha"} inputtype={"text"} />
                    <Buttons onClick={() => setIdChangePassword(String(id))} backgroundColor={"blue.300"} color={"white"} fontSize={"md"} valueButton={"Enviar senha"} hover={"blue.400"} border={"solid 2px"} radius={"5px"} borderColor={"black"} width={"100%"} maxWidth={"500px"} margin={"2px"} type={"submit"} />
                </DefaultForm>
            </Flex>
            <DefaultFooter />
        </>
    )
}

export default SendEmail