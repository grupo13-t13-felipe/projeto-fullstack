import {
    FormControl, Text,
} from '@chakra-ui/react';

interface IFormProps {
    children: React.ReactNode
    formTitle: string;
}

const DefaultForm = (props: IFormProps) => {
    return (
        <FormControl {...props} display={"flex"} flexDirection={"column"} maxWidth={"556px"} padding={["24px", "24px", "48px"]} bgColor={"white"} borderRadius={"4px"} gap={"24px"}>
            <Text fontSize={["18", "24px"]} fontWeight={"500"} marginBottom={"8px"}>
                {props.formTitle}
            </Text>
            {props.children}
        </FormControl>
    )
}

export default DefaultForm;