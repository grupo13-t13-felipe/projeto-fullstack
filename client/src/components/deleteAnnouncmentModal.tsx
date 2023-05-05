import { Box, ButtonGroup, Text, useDisclosure } from "@chakra-ui/react"
import Modals from "./modal";
import Buttons from "./button";
import { useContext } from "react";
import { AnnouncementContext } from "@/contexts/announcements.context";

const DeleteAnnouncementModal = ({announcId}: any) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {deleteAnnouncement} = useContext(AnnouncementContext)
    const modalContent = 
    <Box gap={"24px"} display={"flex"} flexDir={"column"}>
        {/* <Text fontSize={"14px"} mt={"18px"}>Excluir anúncio</Text> */}
        <Text fontSize={"14px"} fontWeight={"bold"}>Tem certeza que deseja remover este anúncio?</Text>
        <Text fontSize={"14px"}>Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá seus dados de nossos servidores.
        </Text>
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
                valueButton={"Sim, excluir anúncio"}
                color={"#CD2B31"}
                fontSize={"16px"}
                onClick={deleteAnnouncement}
              />
        </ButtonGroup>
    </Box>
    return (<Modals
            modalTitle={"Excluir anúncio"}
            sizeTitle={"1em"}
            modalContent={modalContent}
            buttonWidth={"160px"}
            nameButton={"Excluir anuncio"}
            modalButtonColor={"#495057"}
            modalButtonBg={"#DEE2E6"}
            buttonRadius={"4px"}
            buttonBorder={"2px"}
            buttonBorderColor={"#4529E6"}
            isOpen={isOpen}
            onOpen={() => { onOpen() }}
            onClose={() => { onClose() }} 
            titlesColor={""} 
            modalButtons={""} 
            footerDirection={""} 
            footerWidth={""} />)
}

export default DeleteAnnouncementModal;