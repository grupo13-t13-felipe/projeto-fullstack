import { Box, ButtonGroup, Text, useDisclosure } from "@chakra-ui/react"
import Modals from "./modal";
import Buttons from "./button";
import { useContext } from "react";
import { AnnouncementContext, annoucementCtx } from "@/contexts/announcements.context";
import {DeleteIcon } from '@chakra-ui/icons'
import nookies from 'nookies'
import api from "@/services/api";
import { useRouter } from "next/router";

const DeleteCommentModal = ({comment_id}: any) => {

  const router = useRouter()
  const {getComments} = annoucementCtx()
    
  async function deleteComments(id: any) {
    const cookie = nookies.get()
    api.defaults.headers.authorization = `Bearer ${cookie['karsToken']}`
    await api.delete(`/comments/${id}`)
    getComments(cookie['announcId'])
  }

    const { isOpen, onOpen, onClose } = useDisclosure()
    const modalContent = 
    <Box gap={"24px"} display={"flex"} flexDir={"column"}>
        <Text fontSize={"14px"} fontWeight={"bold"}>Tem certeza que deseja remover este comentário?</Text>
        <ButtonGroup>
            <Buttons
                backgroundColor={"#DEE2E6"}
                valueButton={"Cancelar"}
                color={"#495057"}
                fontSize={"16px"}
                onClick={onClose}
              />
              <Buttons
                backgroundColor={"#FDD8D8"}
                valueButton={"Sim, excluir comentário"}
                color={"red.700"}
                fontSize={"16px"}
                onClick={() => deleteComments(comment_id)}
              />
        </ButtonGroup>
    </Box>
    return (<Modals
            modalTitle={"Excluir comentário"}
            sizeTitle={"xs"}
            modalContent={modalContent}
            buttonWidth={""}
            nameButton={<DeleteIcon w={4} h={4} color="red.700"/>}
            modalButtonColor={"grey.250"}
            modalButtonBg={"transparent"}
            buttonRadius={""}
            buttonBorder={""}
            buttonBorderColor={"transparent"}
            isOpen={isOpen}
            onOpen={() => { onOpen() }}
            onClose={() => { onClose() }} 
            titlesColor={""} 
            modalButtons={""} 
            footerDirection={""} 
            footerWidth={""} />
        )
}

export default DeleteCommentModal;