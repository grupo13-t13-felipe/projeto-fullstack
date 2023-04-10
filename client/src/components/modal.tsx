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

const Modals = ({ modalTitle, titlesColor, modalContent, modalButtons }: any) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Buttons onClick={onOpen} valueButton="Abrir Modal" color="#5126EA" />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={titlesColor}>{modalTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            modalContent
                        }
                    </ModalBody>

                    <ModalFooter>
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