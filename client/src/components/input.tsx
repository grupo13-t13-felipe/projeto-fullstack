import { Input, TagLabel } from '@chakra-ui/react'

const InputArea = ({ nameInput, placeHolder, fontSize, width, heigth, focusBorderColor, margin }: any) => {
    return (
        <>
            <label htmlFor={nameInput}>{nameInput}</label>
            <Input id={nameInput} placeholder={placeHolder} fontSize={fontSize} width={width} height={heigth} focusBorderColor={focusBorderColor} margin={margin} />
        </>
    )
}

export default InputArea;