import { Box, HStack, RadioProps, useRadio, useRadioGroup } from '@chakra-ui/react'

const RadioCard = (props: RadioProps) => {
    const { getInputProps, getRadioProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getRadioProps()

    return (
        <Box as='label' w={"100%"}>
        <input {...input} />
        <Box
            {...checkbox}
            cursor="pointer"
            borderWidth="2px"
            borderRadius="4px"
            boxShadow="md"
            _checked={{
            bg: "blue.300",
            color: "white",
            borderColor: "blue.300",
            }}
            _focus={{
            boxShadow: "0 0 0 1px var(--chakra-colors-blue-300)",
            }}
            px={5}
            h={"48px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            {props.children}
        </Box>
        </Box>
    )
}


const RadioButton = () => {
    const options = ["Comprador", "Anunciante"]

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "is_seller",
        defaultValue: "Comprador",
        onChange: console.log,
    })

    const group = getRootProps()

    return (
        <HStack {...group}>
        {options.map((value) => {
            const radio = getRadioProps({ value })
            return (
            <RadioCard key={value} {...radio}>
                {value}
            </RadioCard>
            )
        })}
        </HStack>
    )
}

export { RadioButton };