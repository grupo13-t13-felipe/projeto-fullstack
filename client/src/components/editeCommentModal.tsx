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
    Link,
    Box,
  } from "@chakra-ui/react";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { commentSchema } from "@/schemas/user.schema";
  import { IComment } from "@/types/announcements";
  import Buttons from "./button";
  import { EditIcon } from "@chakra-ui/icons";
  import nookies from 'nookies'
  import api from "@/services/api";

  const EditeCommentModal = ({comment_id, formData}: any) => {

    
    const editeComment = async (dataForm: IComment, id: string) => {
        console.log(dataForm)
        const cookie = nookies.get()
        
        try {
            await api.patch(`/comments/${id}`, dataForm)
        }
        catch(error: any) {
            console.log(error)
        }
    }
      
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IComment>({
      resolver: yupResolver(commentSchema),
    });
  
     
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
                
        <Buttons valueButton={<EditIcon w={4} h={4} color="grey.400"/>} backgroundColor={"transparent"} color={"grey.250"} fontSize={"xs"} onClick={onOpen}/>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader mt={"30px"} fontSize={["md", "lg", "xl"]}>
              Editar Comentário
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="content">
                <FormLabel fontSize={["sm", "sm", "md"]} color={"grey.400"}>Comentário</FormLabel>
                <Textarea
                  {...register("content")}
                  
                />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
                <Button backgroundColor={'blue.300'} color={'grey.0'} fontWeight={'medium'} fontSize={['sm', 'sm', 'md']} type={"submit"} onClick={handleSubmit((dataForm: IComment) =>
                  editeComment(comment_id, formData.text)
                )}>
                Salvar alterações
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default EditeCommentModal;

function toast(arg0: { title: string; variant: string; position: string; isClosable: boolean; render: () => JSX.Element; }) {
    throw new Error("Function not implemented.");
}
  