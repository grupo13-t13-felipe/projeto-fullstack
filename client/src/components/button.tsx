import { Button, ButtonGroup } from '@chakra-ui/react'

const Buttons = ({ onClick, backgroundColor, color, fontSize, valueButton, hover, radius, width}: any) => {
    return (
        <Button onClick={onClick} background={backgroundColor} color={color} variant='solid' fontSize={fontSize} _hover={{ bg: hover }} borderRadius={radius} width={width}>
            {
                valueButton
            }
        </Button>
    )
}

export default Buttons;