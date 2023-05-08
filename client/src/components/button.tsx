import { Button, ButtonGroup } from "@chakra-ui/react";

const Buttons = ({ onClick, backgroundColor, color, fontSize, valueButton, hover, border, radius, borderColor, width, maxWidth, margin, type, disable}: any) => {
    return (
        <Button onClick={onClick} 
                background={backgroundColor} 
                color={color} 
                variant='solid' 
                fontSize={fontSize} 
                _hover={{ bg: hover }} 
                border={border} 
                borderRadius={radius} 
                borderColor={borderColor} 
                width={width}
                margin={margin} 
                maxWidth={maxWidth} 
                type={type} 
                isDisabled={disable}>
            {
                valueButton
            }
        </Button>
    )
}

export default Buttons;
