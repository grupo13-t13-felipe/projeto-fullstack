import {
    Flex, FlexProps, Text,
} from '@chakra-ui/react';

interface IFormProps extends FlexProps {
    children: React.ReactNode
    formtitle: string;
    submithandler: React.FormEventHandler<HTMLFormElement> | undefined;
}

const DefaultForm = (props: IFormProps) => {
    return (
        <Flex display={"flex"} flexDirection={"column"} maxWidth={"556px"} w={"100%"} padding={["24px", "24px", "48px"]} bgColor={"white"} borderRadius={"4px"} gap={"24px"}>
            <Text fontSize={["18", "24px"]} fontWeight={"500"} marginBottom={"8px"}>
                {props.formtitle}
            </Text>
            <form onSubmit={props.submithandler}>
                {props.children}
            </form>
        </Flex>
    )
}

export default DefaultForm;

