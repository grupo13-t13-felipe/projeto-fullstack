import { Textarea, Text } from '@chakra-ui/react'

const TextArea = ({ headerTitle, placeHolder, width, heigth, fontSize, border }: any) => {
    return (
        <>
            {/* <Text mb="2rem">{headerTitle}</Text> */}
            <Textarea
                placeholder={placeHolder}
                width={width}
                height={heigth}
                fontSize={fontSize}
                border={border}

            />
        </>
    )
}

export default TextArea;