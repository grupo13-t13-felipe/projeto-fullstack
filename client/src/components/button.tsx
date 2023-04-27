import { Button, ButtonGroup } from '@chakra-ui/react'

const Buttons = ({ type, onClick, backgroundColor, color, fontSize, valueButton, hover, border, radius, borderColor, width, maxWidth, margin}: any) => {
    return (
        <Button type={type} onClick={onClick} background={backgroundColor} color={color} variant='solid' fontSize={fontSize} _hover={{ bg: hover }} border={border} borderRadius={radius} borderColor={borderColor} width={width} margin={margin} maxWidth={maxWidth}>
            {
                valueButton
            }
        </Button>
    )
}

export default Buttons;