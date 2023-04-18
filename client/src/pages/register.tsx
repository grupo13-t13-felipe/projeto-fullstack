import DefaultFooter from '@/components/footer'
import DefaultForm from '@/components/form'
import DefaultHeader from '@/components/headers/headerDefault'
import { InputForm } from '@/components/input'
import { RadioButton } from '@/components/radioInput'
import {Button, Flex, FormControl, FormLabel, Text, Textarea} from '@chakra-ui/react'


const Register = () => {
    return (
        <>
            <DefaultHeader />
            <Flex h={"100%"} justifyContent={"center"} alignItems={"center"} bgColor={"grey.50"} p={"16px"}>
                <DefaultForm formtitle="Cadastro">
                    <Text mb={"16px"} w={"100%"} textAlign={"left"}>Informações pessoais</Text>
                    <InputForm isRequired mb={"12px"} labeltext={"Nome"} inputplaceholder={"Ex: Samuel Leão"} inputtype={"text"} />
                    <InputForm isRequired labeltext={"Email"} inputplaceholder={"Ex: samuel@kenzie.com.br"} inputtype={"email"} />
                    <InputForm isRequired labeltext={"CPF"} inputplaceholder={"000.000.000-00"} inputtype={"number"} />
                    <InputForm isRequired labeltext={"Celular"} inputplaceholder={"(DDD) 90000-0000"} inputtype={"number"} />
                    <InputForm isRequired labeltext={"Data de nascimento"} inputplaceholder={"00/00/00"} inputtype={"number"} />
                    <FormControl isRequired>
                        <FormLabel>
                            Descrição
                        </FormLabel>
                        <Textarea resize={"none"} placeholder={"Digitar descrição"} h={"48px"} _focusVisible={{boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)"}} _focus={{borderColor: "blue.400"}} />
                    </FormControl>
                    <Text mb={"16px"} w={"100%"} textAlign={"left"}>Informações de endereço</Text>
                    <InputForm isRequired labeltext={"CEP"} inputplaceholder={"00000.000"} inputtype={"number"} />

                    <Flex w={"100%"} gap={"12px"}>
                        <InputForm isRequired labeltext={"Estado"} inputplaceholder={"Digitar Estado"} inputtype={"text"} />
                        <InputForm isRequired labeltext={"Cidade"} inputplaceholder={"Digitar cidade"} inputtype={"text"} />
                    </Flex>

                    <InputForm isRequired labeltext={"Rua"} inputplaceholder={"Digitar rua"} inputtype={"text"} />

                    <Flex w={"100%"} gap={"12px"}>
                        <InputForm isRequired labeltext={"Número"} inputplaceholder={"Digitar número"} inputtype={"text"} />
                        <InputForm isRequired labeltext={"Complemento"} inputplaceholder={"Ex: apart 307"} inputtype={"text"} />
                    </Flex>

                    <FormControl>
                        <FormLabel>
                            Tipo de conta
                        </FormLabel>
                        <RadioButton />
                    </FormControl>

                    <InputForm isRequired labeltext={"Senha"} inputplaceholder={"Digitar senha"} inputtype={"password"} />
                    <InputForm isRequired labeltext={"Confirmar senha"} inputplaceholder={"Digitar senha"} inputtype={"password"} />

                    <Button mb={"12px"} w={"100%"} h={"48px"} color={"white"} fontWeight={"500"} bgColor={"blue.300"} border={"1px solid blue.300"} _hover={{borderColor: "blue.400", bgColor: "blue.400"}} type={"submit"}>Finalizar Cadastro</Button>
                </DefaultForm>
            </Flex>
            <DefaultFooter />
        </>
    )
}

export default Register