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
  HStack,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { UserContext } from "@/contexts/users.context";
import { IAddress, IUserEdite } from "@/types/user";
import { editAddressSchema, editeUserSchema } from "@/schemas/user.schema";
import { string } from "yup";
import removeEmptyStrings from "@/utils/removeEmptyStrings";

const AddressModal = () => {
  const { editAdress, user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddress>({
    resolver: yupResolver(editAddressSchema),
  });

  const onFormSubmit = (formData: IAddress) => {
    const data = removeEmptyStrings(formData);

    editAdress(data);
    console.log(formData);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Link onClick={onOpen}>Editar Endereço</Link>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mt={"30px"} fontSize={["md", "lg", "xl"]}>
            Editar Endereço
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
            <FormControl id="cep">
              <FormLabel fontSize={["sm", "sm", "md"]} color={"grey.400"}>
                CEP
              </FormLabel>
              <Input
                type="text"
                {...register("cep")}
                defaultValue={user?.address?.cep}
                mb={"20px"}
              />
            </FormControl>
            <HStack>
              <FormControl id="estado">
                <FormLabel fontSize={["sm", "sm", "md"]} color={"grey.400"}>
                  Estado
                </FormLabel>
                <Input
                  type="text"
                  {...register("state")}
                  defaultValue={user?.address?.state}
                  mb={"20px"}
                />
              </FormControl>
              <FormControl id="cidade">
                <FormLabel fontSize={["sm", "sm", "md"]} color={"grey.400"}>
                  Cidade
                </FormLabel>
                <Input
                  type="text"
                  {...register("city")}
                  defaultValue={user?.address?.city}
                  mb={"20px"}
                />
              </FormControl>
            </HStack>
            <FormControl id="rua">
              <FormLabel fontSize={["sm", "sm", "md"]} color={"grey.400"}>
                Rua
              </FormLabel>
              <Input
                type="text"
                {...register("street")}
                defaultValue={user?.address?.street}
                mb={"20px"}
              />
            </FormControl>
            <HStack>
              <FormControl id="numero">
                <FormLabel fontSize={["sm", "sm", "md"]} color={"grey.400"}>
                  Número
                </FormLabel>
                <Input
                  type="text"
                  {...register("number")}
                  defaultValue={user?.address?.number}
                  mb={"20px"}
                />
              </FormControl>
              <FormControl id="complemento">
                <FormLabel fontSize={["sm", "sm", "md"]} color={"grey.400"}>
                  Complemento
                </FormLabel>
                <Input
                  type="text"
                  {...register("complement")}
                  defaultValue={user?.address?.complement}
                  mb={"20px"}
                />
              </FormControl>
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button backgroundColor={'grey.125'} color={'grey.300'} fontWeight={'semibold'} fontSize={['sm', 'sm', 'md']} mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button backgroundColor={'blue.300'} color={'grey.0'} fontWeight={'medium'} fontSize={['sm', 'sm', 'md']} type={"submit"} onClick={handleSubmit(onFormSubmit)}>
              Salvar alterações
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddressModal;
