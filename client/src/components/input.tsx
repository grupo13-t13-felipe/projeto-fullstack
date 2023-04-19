import { FormControl, FormControlProps, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'

interface InputFormProps extends FormControlProps {
    labeltext: string;
    inputtype: string;
    inputplaceholder: string;
    inputregister: any;
    errors: string | undefined;
}

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

const InputForm = (props: InputFormProps) => {
    return (
        <FormControl {...props}>
            <FormLabel>
                {props.labeltext}
            </FormLabel>
            <Input {...props.inputregister} h={"48px"} _focusVisible={{boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)"}} _focus={{borderColor: "blue.400"}} type={props.inputtype} placeholder={props.inputplaceholder} />
            <FormErrorMessage mt={"4px"} position={"absolute"}>
                {props.errors}
            </FormErrorMessage>

        </FormControl>
    )
}

export { InputArea, InputFilter, InputForm };