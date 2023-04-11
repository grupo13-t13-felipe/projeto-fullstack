import Head from 'next/head'
// import Image from 'next/image'
import { Text, Image, Stack, HStack, Flex, Box, Menu, MenuButton, IconButton, MenuItem, MenuList, Link, VStack } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import DefaultFooter from '@/components/footer'
import DefaultHeader from '@/components/headers/headerDefault'
import ProductCard from '@/components/productCard'

export default function Home() {

  return (
    <>
      <Head>
        <title>Motors Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultHeader />
      <Flex direction={"column"} height={"100%"}>
        <Stack
          bgGradient="linear(to-b, grey.150, grey.400)"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            backgroundImage={"/Photo.svg"}
            display={"flex"}
            filter="grayscale(80%)"
            backgroundPosition={"center"}
            backgroundSize={"cover"}
            backgroundRepeat={"no-repeat"}
            height={["50vh", "50vh", "50vh"]}
          >
            <VStack
              color={"grey.0"}
              justifyContent={["normal", "normal", "center"]}
              mt={"30px"}
            >
              <Text fontSize={["4xl", "4xl", "6xl"]} fontWeight={"extrabold"}>
                Motors Shop
              </Text>
              <Text
                fontSize={["2xl", "2xl", "4xl"]}
                fontWeight={"medium"}
                textAlign={"center"}
              >
                A melhor plataformade anúncios de carros do país
              </Text>
            </VStack>
          </Box>
        </Stack>
        <Stack>
          <Text>Cards</Text>
          <ProductCard
            name={"Carro - 1"}
            description={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem..."
            }
          ></ProductCard>
        </Stack>
      </Flex>
      <DefaultFooter />
    </>
  );
}
