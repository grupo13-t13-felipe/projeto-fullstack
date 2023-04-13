import { Input } from '@chakra-ui/react'

const InputArea = ({ nameInput, placeHolder, fontSize, width, heigth, focusBorderColor, margin }: any) => {
    return (
        <>
            <label htmlFor={nameInput}>{nameInput}</label>
            <Input id={nameInput} placeholder={placeHolder} fontSize={fontSize} width={width} height={heigth} focusBorderColor={focusBorderColor} margin={margin} />
        </>
    )
}

const InputFilter = ({placeholder, onClick}: any) => {
    return (
        <>
            <Input placeholder={placeholder} onClick={onClick} backgroundColor={"grey.150"} color={"grey.400"} fontWeight={"bold"} _placeholder={{color: "grey.250"}} outline={"none"} focusBorderColor={"grey.250"} h={"40px"} w={"141px"} borderRadius={"0px"} />
        </>
    )
}

export { InputArea, InputFilter };