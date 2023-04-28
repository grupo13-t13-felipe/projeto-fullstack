import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { UserContext } from "@/contexts/users.context";
import { IUserEdite } from "@/types/user";
import { editeUserSchema } from "@/schemas/user.schema";
import { string } from "yup";
import removeEmptyStrings from "@/utils/removeEmptyStrings";

const UserModal = () => {
  const { editeUser, deleteUser, user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserEdite>({
    resolver: yupResolver(editeUserSchema),
  });

  const onFormSubmit = (formData: IUserEdite) => {
    const data = removeEmptyStrings(formData);

    editeUser(data);
    console.log(formData);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Editar Perfil</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mt={"30px"} fontSize={["md", "lg", "xl"]}>
            Editar Perfil
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text
              mb={"16px"}
              w={"100%"}
              textAlign={"left"}
              color={"grey.500"}
              fontSize={["sm", "md", "lg"]}
            >
              Informações pessoais
            </Text>
            <FormControl id="name">
              <FormLabel fontSize={["sm", "sm", "md"]} color={"grey.400"}>
                Nome
              </FormLabel>
              <Input
                type="text"
                {...register("name")}
                defaultValue={user?.name}
                mb={"20px"}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel fontSize={["sm", "sm", "md"]} color={"grey.400"}>
                Email
              </FormLabel>
              <Input
                type="email"
                {...register("email")}
                defaultValue={user?.email}
                mb={"20px"}
              />
            </FormControl>
            <FormControl id="cpf">
              <FormLabel fontSize={["sm", "sm", "md"]} color={"grey.400"}>CPF</FormLabel>
              <Input
                type="text"
                {...register("cpf")}
                defaultValue={user?.cpf}
                mb={"20px"}
              />
            </FormControl>
            <FormControl id="phone">
              <FormLabel fontSize={["sm", "sm", "md"]} color={"grey.400"}>Celular</FormLabel>
              <Input
                type="text"
                {...register("phone")}
                defaultValue={user?.phone}
                mb={"20px"}
              />
            </FormControl>
            <FormControl id="birth_date">
              <FormLabel fontSize={["sm", "sm", "md"]} color={"grey.400"}>Data de nascimento</FormLabel>
              <Input type="date" {...register("birth_date")} mb={"20px"}/>
            </FormControl>
            <FormControl id="description">
              <FormLabel fontSize={["sm", "sm", "md"]} color={"grey.400"}>Descrição</FormLabel>
              <Textarea
                {...register("description")}
                defaultValue={user?.description}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button backgroundColor={'grey.125'} color={'grey.300'} fontWeight={'semibold'} fontSize={['sm', 'sm', 'md']} mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button backgroundColor={'red.200'} color={'red.700'} fontWeight={'semibold'} fontSize={['sm', 'sm', 'md']} mr={3} onClick={() => deleteUser()}>Excluir Perfil</Button>
            <Button backgroundColor={'blue.300'} color={'grey.0'} fontWeight={'medium'} fontSize={['sm', 'sm', 'md']} type={"submit"} onClick={handleSubmit(onFormSubmit)}>
              Salvar alterações
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserModal;
