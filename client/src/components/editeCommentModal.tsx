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
import { annoucementCtx } from "@/contexts/announcements.context";

  const EditeCommentModal = ({comment_id}: any) => {

    const {setComments, comments} = annoucementCtx()

    const editeComment = async (dataForm: IComment) => {
        console.log(dataForm)
        const cookie = nookies.get()
        
        try {
            const {data} = await api.patch(`/comments/${comment_id}`, dataForm)
            
            return data
        }
        catch(error: any) {
            console.log(error)
        }
        

    }

    const handleEdite = async (dataForm: any) => {
      const data = await editeComment(dataForm)
      const comment_filter = comments!.filter((element) => element.id !== comment_id)
            setComments([...comment_filter, data])
            console.log(comments, data, comment_filter)
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
                <Button backgroundColor={'blue.300'} color={'grey.0'} fontWeight={'medium'} fontSize={['sm', 'sm', 'md']} type={"submit"} onClick={handleSubmit(handleEdite)}>
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
  