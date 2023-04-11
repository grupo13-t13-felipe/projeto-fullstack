import { Button, ButtonGroup } from '@chakra-ui/react'

const Buttons = ({ onClick, backgroundColor, color, fontSize, valueButton, hover }: any) => {
    return (
        <Button onClick={onClick} background={backgroundColor} color={color} variant='solid' fontSize={fontSize} _hover={{ bg: hover }}>
            {
                valueButton
            }
        </Button>
    )
}

export default Buttons;