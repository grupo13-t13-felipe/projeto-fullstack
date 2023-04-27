import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, useDisclosure, FormControl,
    FormLabel,
    FormErrorMessage,
    Input, Text
  } from '@chakra-ui/react'
import DefaultForm from './form'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from 'react';
import { UserContext } from '@/contexts/users.context';
import { IUserEdite } from '@/types/user';
import { editeUserSchema } from '@/schemas/user.schema';
import { InputForm } from './input';
import TextArea from './textArea';


  const UserModal = () => {

    const {editeUser, deleteUser} = useContext(UserContext)

    const {register, handleSubmit, formState: {errors},} = useForm<IUserEdite>({
        resolver: yupResolver(editeUserSchema)
    })

    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
    <>
      <Button onClick={onOpen}>Editar Perfil</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Perfil</ModalHeader>
            <ModalCloseButton />
          <ModalBody>
            <DefaultForm submithandler={handleSubmit(editeUser)} formtitle="">
            <Text mb={"16px"} w={"100%"} textAlign={"left"}>Informações pessoais</Text>
                <InputForm errors={errors.name?.message} isInvalid={!!errors.name?.message} inputregister={{...register("name")}} mb={"12px"} labeltext={"Nome"} inputplaceholder={"Ex: Samuel Leão"} inputtype={"text"} />
                <InputForm errors={errors.email?.message} isInvalid={!!errors.email?.message} inputregister={{...register("email")}} mb={"12px"} labeltext={"Email"} inputplaceholder={"Ex: samuel@kenzie.com.br"} inputtype={"email"} />
                <InputForm errors={errors.cpf?.message} isInvalid={!!errors.cpf?.message} inputregister={{...register("cpf")}} labeltext={"CPF"} inputplaceholder={"000.000.000-00"} mb={"12px"} inputtype={"string"} />
                <InputForm errors={errors.phone?.message} isInvalid={!!errors.phone?.message} inputregister={{...register("phone")}} mb={"12px"} labeltext={"Celular"} inputplaceholder={"(DDD) 90000-0000"} inputtype={"string"} />
                <InputForm errors={errors.birth_date?.message} isInvalid={!!errors.birth_date?.message} inputregister={{...register("birth_date")}} mb={"12px"} labeltext={"Data de nascimento"} inputplaceholder={"00/00/00"} inputtype={"date"} />
                <FormControl mb={"34px"} isInvalid={!!errors.description?.message}>
                <FormLabel>Descrição</FormLabel>
                <TextArea {...register("description")} resize={"none"} placeholder={"Digitar descrição"} h={"48px"} _focusVisible={{boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)"}} mb={"0px"} _focus={{borderColor: "blue.400"}} />
                        <FormErrorMessage mt={"4px"} position={"absolute"}>
                            {errors.description?.message}
                        </FormErrorMessage>
                    </FormControl>

            </DefaultForm>
            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant='ghost'>Excluir Perfil</Button>
            <Button variant='ghost'>Salvar alterações</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
  }

  export default UserModal