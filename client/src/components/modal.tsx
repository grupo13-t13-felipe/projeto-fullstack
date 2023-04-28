import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import Buttons from './button';

interface IModals {
    isOpen: boolean, 
    onOpen: ()=>void, 
    onClose: ()=>void, 
    modalTitle: string, 
    titlesColor: string, 
    modalContent: JSX.Element,
    modalButtons: any, 
    nameButton: any, 
    sizeTitle: string, 
    footerDirection: string, 
    footerWidth: string, 
    modalButtonColor: string, 
    modalButtonBg: string, 
    buttonWidth: string, 
    buttonRadius: string, 
    buttonBorder: string, 
    buttonBorderColor: string,
}

const Modals = ({ isOpen, onOpen, onClose, modalTitle, titlesColor, modalContent, modalButtons, nameButton, sizeTitle, footerDirection, footerWidth, modalButtonColor, modalButtonBg, buttonWidth, buttonRadius, buttonBorder, buttonBorderColor }: IModals) => {

    // const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Buttons onClick={onOpen} valueButton={nameButton} color={modalButtonColor}backgroundColor={modalButtonBg} width={buttonWidth} radius={buttonRadius} border={buttonBorder} borderColor={buttonBorderColor} />

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={titlesColor} fontSize={sizeTitle}>{modalTitle}</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {
                            modalContent
                        }
                    </ModalBody>

                    <ModalFooter justifyContent={footerDirection} width={footerWidth}>
                        {
                            modalButtons
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

}

export default Modals;