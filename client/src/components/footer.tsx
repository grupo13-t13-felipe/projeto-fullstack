import { Box, Flex, Text, Stack, LinkBox } from "@chakra-ui/react";
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
        py={["24px", "24px", "40px"]}
        px={["24px", "24px", "55px"]}
        direction={["column", "column", "row"]}
      >
        <Text color={"grey.0"} fontSize={"lg"} w={["initial", "inital", "217px"]}>
          Motors Shop
        </Text>
        <Text color={"grey.0"} fontSize={"xs"} w={["initial", "inital", "217px"]}>
          &copy; 2023 - Todos os direitos reservados
        </Text>
        <LinkBox w={["0px", "0px", "217px"]} display={"flex"} justifyContent={"flex-end"}>
          <Link href={"#top"}>
            <ChevronUpIcon color={"grey.0"} backgroundColor={"grey.400"} w={"40px"} height={"40px"} borderRadius={"4px"} />
          </Link>
        </LinkBox>
      </Stack>
    </Flex>
  );
};

export default DefaultFooter;
