import { Button, ButtonGroup } from '@chakra-ui/react'

const Buttons = ({ onClick, backgroundColor, color, fontSize, valueButton, hover, radius, width, margin}: any) => {
    return (
        <Button onClick={onClick} background={backgroundColor} color={color} variant='solid' fontSize={fontSize} _hover={{ bg: hover }} borderRadius={radius} width={width} margin={margin}>
            {
                valueButton
            }
        </Button>
    )
}

export default Buttons;