import { Box, Flex, Text } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import Link from "next/link";

const DefaultFooter = () => {
  return (
    <Flex position={"relative"}>
      <Flex
        position={"absolute"}
        backgroundColor={"grey.500"}
        top="100vh"
        width={"100vw"}
        justifyContent={"space-between"}
        alignItems={"center"}
        py={"10px"}
        mx={"15px"}
        direction={["column", "column", "row"]}
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
      </Flex>
    </Flex>
  );
};

export default DefaultFooter;
