import { Box, Flex, Text, Stack } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import Link from "next/link";

const DefaultFooter = () => {
  return (
    <Flex position={'relative'}>
      <Stack
        backgroundColor={"grey.500"}
        top="100vh"
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        py={"40px"}
        px={"30px"}
        direction={["column", "column", "row"]}
        spacing={6}
      >
        <Text color={"grey.0"} fontSize={"lg"}>
          Motors Shop
        </Text>
        <Text color={"grey.0"} fontSize={"xs"}>
          &copy; 2023 - Todos os direitos reservados
        </Text>
        <Link href={"#top"}>
          <ChevronUpIcon color={"grey.0"} backgroundColor={"grey.400"} />
        </Link>
      </Stack>
    </Flex>
  );
};

export default DefaultFooter;
