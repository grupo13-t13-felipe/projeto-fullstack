import { useContext } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import DefaultFooter from '@/components/footer'
import DefaultForm from '@/components/form'
import DefaultHeader from '@/components/headers/headerDefault'
import { InputForm } from '@/components/input'
import { RadioButton } from '@/components/radioInput'
import { UserContext } from '@/contexts/users.context'
import {Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Text, Textarea} from '@chakra-ui/react'
import { createUserSchema } from '@/schemas/user.schema';
import { IUserCreate } from '@/types/user';


const Register = () => {

    const {createUser} = useContext(UserContext)

    const {register, handleSubmit, formState: {errors}, control} = useForm<IUserCreate>({
        resolver: yupResolver(createUserSchema)
    })

    return (
        <>
            <DefaultHeader />
            <Flex h={"100%"} justifyContent={"center"} alignItems={"center"} bgColor={"grey.50"} p={"16px"}>
                <DefaultForm submithandler={handleSubmit(createUser)} formtitle="Cadastro">
                    <Text mb={"16px"} w={"100%"} textAlign={"left"}>Informações pessoais</Text>
                    <InputForm errors={errors.name?.message} isInvalid={!!errors.name?.message} inputregister={{...register("name")}} isRequired mb={"12px"} labeltext={"Nome"} inputplaceholder={"Ex: Samuel Leão"} inputtype={"text"} />
                    <InputForm errors={errors.email?.message} isInvalid={!!errors.email?.message} inputregister={{...register("email")}} isRequired mb={"12px"} labeltext={"Email"} inputplaceholder={"Ex: samuel@kenzie.com.br"} inputtype={"email"} />
                    <InputForm errors={errors.cpf?.message} isInvalid={!!errors.cpf?.message} inputregister={{...register("cpf")}} isRequired labeltext={"CPF"} inputplaceholder={"000.000.000-00"} mb={"12px"} inputtype={"string"} />
                    <InputForm errors={errors.phone?.message} isInvalid={!!errors.phone?.message} inputregister={{...register("phone")}} isRequired mb={"12px"} labeltext={"Celular"} inputplaceholder={"(DDD) 90000-0000"} inputtype={"string"} />
                    <InputForm errors={errors.birth_date?.message} isInvalid={!!errors.birth_date?.message} inputregister={{...register("birth_date")}} isRequired mb={"12px"} labeltext={"Data de nascimento"} inputplaceholder={"00/00/00"} inputtype={"date"} />
                    <FormControl mb={"34px"} isInvalid={!!errors.description?.message} isRequired>
                        <FormLabel>
                            Descrição
                        </FormLabel>
                        <Textarea {...register("description")} resize={"none"} placeholder={"Digitar descrição"} h={"48px"} _focusVisible={{boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)"}} mb={"0px"} _focus={{borderColor: "blue.400"}} />
                        <FormErrorMessage mt={"4px"} position={"absolute"}>
                            {errors.description?.message}
                        </FormErrorMessage>
                    </FormControl>
                    <Text mb={"10px"} w={"100%"} textAlign={"left"}>Informações de endereço</Text>
                    <InputForm errors={errors.cep?.message} isInvalid={!!errors.cep?.message} inputregister={{...register("cep")}} isRequired mb={"12px"} labeltext={"CEP"} inputplaceholder={"00000.000"} inputtype={"text"} />

                    <Flex w={"100%"} gap={"12px"} mb={"12px"}>
                        <InputForm errors={errors.state?.message} isInvalid={!!errors.state?.message} inputregister={{...register("state")}} isRequired labeltext={"Estado"} inputplaceholder={"Digitar Estado"} inputtype={"text"} />
                        <InputForm errors={errors.city?.message} isInvalid={!!errors.city?.message} inputregister={{...register("city")}} isRequired labeltext={"Cidade"} inputplaceholder={"Digitar cidade"} inputtype={"text"} />
                    </Flex>

                    <InputForm errors={errors.street?.message} isInvalid={!!errors.street?.message} mb={"12px"} inputregister={{...register("street")}} isRequired labeltext={"Rua"} inputplaceholder={"Digitar rua"} inputtype={"text"} />

                    <Flex w={"100%"} gap={"12px"} mb={"12px"}>
                        <InputForm errors={errors.number?.message} isInvalid={!!errors.number?.message} inputregister={{...register("number")}} isRequired labeltext={"Número"} inputplaceholder={"Digitar número"} inputtype={"text"} />
                        <InputForm errors={errors.complement?.message} isInvalid={!!errors.complement?.message} inputregister={{...register("complement")}} isRequired labeltext={"Complemento"} inputplaceholder={"Ex: apart 307"} inputtype={"text"} />
                    </Flex>

                    <FormControl isRequired m={"12px 0px 16px"}>
                        <FormLabel>
                            Tipo de conta
                        </FormLabel>
                        <RadioButton control={control} />
                        <Box fontSize={"14px"} color={"red.500"} mt={"4px"} position={"absolute"}>
                            {errors.is_seller?.message}
                        </Box>
                    </FormControl>

                    <InputForm errors={errors.password?.message} isInvalid={!!errors.password?.message} inputregister={{...register("password")}} isRequired mb={"12px"} labeltext={"Senha"} inputplaceholder={"Digitar senha"} inputtype={"password"} />
                    <InputForm errors={errors.confirm_password?.message} isInvalid={!!errors.confirm_password?.message} inputregister={{...register("confirm_password")}} isRequired mb={"16px"} labeltext={"Confirmar senha"} inputplaceholder={"Digitar senha"} inputtype={"password"} />

                    <Button mb={"12px"} w={"100%"} h={"48px"} color={"white"} fontWeight={"500"} bgColor={"blue.300"} border={"1px solid blue.300"} _hover={{borderColor: "blue.400", bgColor: "blue.400"}} type={"submit"}>Finalizar Cadastro</Button>
                </DefaultForm>
            </Flex>
            <DefaultFooter />
        </>
    )
}

export default Register