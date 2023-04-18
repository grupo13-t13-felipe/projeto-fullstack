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

const Modals = ({ modalTitle, titlesColor, modalContent, modalButtons, nameButton, sizeTitle, footerDirection, footerWidth, modalButtonColor, modalButtonBg, buttonWidth, zIndex }: any) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Buttons onClick={onOpen} valueButton={nameButton} color={modalButtonColor}backgroundColor={modalButtonBg} width={buttonWidth} zIndex={zIndex}/>

            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent zIndex={zIndex}>
                    <ModalHeader color={titlesColor} fontSize={sizeTitle}>{modalTitle}</ModalHeader>
                    <ModalCloseButton />
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