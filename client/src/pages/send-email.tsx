import DefaultHeader from '@/components/headers/headerDefault';
import DefaultFooter from '@/components/footer';
import DefaultForm from '@/components/form';
import { Button, Flex, Text, Link } from '@chakra-ui/react';
import { InputForm } from '@/components/input';
import { useContext, useState } from 'react';
import { UserContext } from '@/contexts/users.context';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { IUserLogin } from '@/types/user';
import { userLoginSchema } from '@/schemas/user.schema';
import Buttons from '@/components/button';

const SendEmail = () => {
	const { loginUser } = useContext(UserContext);

    const { register, handleSubmit, formState: { errors } } = useForm<IUserLogin>({
        resolver: yupResolver(userLoginSchema)
    })

    return (
        <>
            <DefaultHeader />
            <Flex minH={"600px"} h={["calc(100vh - 60px - 149px)", "calc(100vh - 60px - 149px)", "calc(100vh - 60px - 120px)"]} justifyContent={"center"} alignItems={"center"} bgColor={"grey.50"} p={"16px"}>
                <DefaultForm submithandler={handleSubmit(loginUser)} formtitle="Inserir e-mail para recuperação">
                    <InputForm errors={errors.email?.message} isInvalid={!!errors.email?.message} inputregister={{ ...register("email") }} isRequired mb={"12px"} labeltext={"Email"} inputplaceholder={"Digitar email"} inputtype={"text"} />
                    <Buttons backgroundColor={"blue.300"} color={"white"} fontSize={"md"} valueButton={"Enviar e-mail"} hover={"black"} border={"solid 2px"} radius={"5px"} borderColor={"black"} width={"100%"} maxWidth={"200px"} margin={"2px"}/>
                </DefaultForm>
            </Flex>
            <DefaultFooter />
        </>
    )
}
