import DefaultHeader from '@/components/headers/headerDefault';
import DefaultFooter from '@/components/footer';
import DefaultForm from '@/components/form';
import {Button, Flex, Text, Link} from '@chakra-ui/react';
import { InputForm } from '@/components/input';

const Login = () => {
    return (
        <>
            <DefaultHeader />
            <Flex h={["calc(100vh - 60px - 149px)", "calc(100vh - 60px - 149px)", "calc(100vh - 60px - 120px)"]} justifyContent={"center"} alignItems={"center"} bgColor={"grey.50"} p={"16px"}>
                <DefaultForm formtitle="Login">
                    <InputForm isRequired mb={"12px"} labeltext={"Email"} inputplaceholder={"Digitar email"} inputtype={"email"} />
                    <InputForm isRequired labeltext={"Senha"} inputplaceholder={"Digitar senha"} inputtype={"password"} />
                    <Text mb={"12px"} w={"100%"} fontWeight={"400"} textAlign={"right"}>Esqueci minha senha</Text>
                    <Button mb={"12px"} w={"100%"} h={"48px"} color={"white"} fontWeight={"500"} bgColor={"blue.300"} border={"1px solid blue.300"} _hover={{borderColor: "blue.400", bgColor: "blue.400"}} type={"submit"}>Entrar</Button>
                    <Text mb={"12px"} fontWeight={"400"} fontSize={"14px"}>Ainda não possui conta?</Text>
                    <Link display={"inline-flex"} justifyContent={"center"} alignItems={"center"} mb={"12px"} w={"100%"} h={"48px"} fontWeight={"500"} backgroundColor={"grey.25"} border={"2px solid"} borderColor={"grey.200"} borderRadius={"4px"} _hover={{textDecoration: "none", borderColor: "grey.200", bgColor: "grey.100"}} href={`/register`}>Cadastrar</Link>
                </DefaultForm>
            </Flex>
            <DefaultFooter />
        </>
    )
}

export default Login