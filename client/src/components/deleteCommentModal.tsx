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
                color={"#CD2B31"}
                fontSize={"16px"}
                // onClick={deleteAnnouncement}
              />
        </ButtonGroup>
    </Box>
    return (<Modals
            modalTitle={"Excluir comentário"}
            sizeTitle={"xs"}
            modalContent={modalContent}
            buttonWidth={""}
            nameButton={"Excluir"}
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

export default DeleteAnnouncementModal;