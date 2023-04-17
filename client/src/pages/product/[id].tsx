import Buttons from "@/components/button";
import DefaultFooter from "@/components/footer";
import HeaderProfile from "@/components/headers/headerProfile";
import TextArea from "@/components/textArea";
import api from "@/services/api";
import { IAnnoucement } from "@/types/announcements";
import { Box, Flex, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { IUser } from "@/types/user";

export interface Props {
  annoucement: IAnnoucement
}

const Dashboard: NextPage<Props> = ({annoucement}) => {
  const router = useRouter();
  const { id } = router.query;

 
  return (
    <>
      <HeaderProfile user={}/>
      <Flex
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={["center", "center", "initial"]}
        position={"relative"}
        zIndex={"-1"}
        bg={"grey.75"}
      >
        <Box
          position={"absolute"}
          w={"100%"}
          h={"60vh"}
          bg={"blue.400"}
          zIndex={"-1"}
        ></Box>
        <Stack
          direction={["column", "column", "row"]}
          mr={['15px', '15px', '50px']}
        >
          <Stack ml={['15px', '15px', '50px']} mt={'20px'} width={['100%', '100%', '60%']} mr={'15px'} mb={"30px"}>
            <Box
              bg={"grey.0"}
              borderRadius={"base"}
              height={"355px"}
              display={"flex"}
              justifyContent={"center"}
              flexDir={"column"}
            >
              <Box m={"auto"}>
                <Image
                  src={annoucement.cover_image}
                  width={600}
                  alt={annoucement.model}
                  height={250}
                />
              </Box>
            </Box>
            <Stack
              bg={"grey.0"}
              display={"flex"}
              justifyContent={"center"}
              spacing={6}
              borderRadius={"base"}
              px={"20px"}
            >
              <Text
                fontSize={"xl"}
                fontWeight={"semibold"}
                mb={"45px"}
                mt={"20px"}
              >
                {annoucement.model}
              </Text>
              <HStack justifyContent={"space-between"}>
                <HStack>
                  <Text
                    bg={"blue.100"}
                    fontSize={"sm"}
                    fontWeight={"medium"}
                    padding={"4px 8px 4px 8px"}
                    borderRadius={"4px"}
                    color={"blue.300"}
                  >
                    {annoucement.year}
                  </Text>
                  <Text
                    bg={"blue.100"}
                    fontSize={"sm"}
                    fontWeight={"medium"}
                    padding={"4px 8px 4px 8px"}
                    borderRadius={"4px"}
                    color={"blue.300"}
                  >
                    {annoucement.km} KM
                  </Text>
                </HStack>
                <Text fontSize={"md"} fontWeight={"medium"}>
                  R$ {annoucement.price}
                </Text>
              </HStack>
              <Box>
                <Buttons
                  backgroundColor={"blue.300"}
                  color={"grey.0"}
                  valueButton={"Comprar"}
                  margin={"0px 0px 20px 0px"}
                />
              </Box>
            </Stack>
            <Stack
              bg={"grey.0"}
              display={"flex"}
              justifyContent={"center"}
              spacing={6}
              borderRadius={"base"}
              p={"20px"}
            >
              <Text color={"grey.400"} fontWeight={"semibold"} fontSize={"xl"}>
                Descrição
              </Text>
              <Text color={"grey.300"} fontWeight={"normal"} fontSize={"md"}>
                {annoucement.description}
              </Text>
            </Stack>
          </Stack>
          <Stack width={['100%', '100%', '40%']} >
            <Stack
              bg={"grey.0"}
              mb={"20px"}
              mt={'20px'}
              height={"355px"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"center"}
              gap={"2em"}
              borderRadius={"base"}
            >
              <Text
                ml="44px"
                color={"grey.400"}
                fontSize={"xl"}
                fontWeight={"semibold"}
              >
                Fotos
              </Text>
              <SimpleGrid columns={3} spacing={"14px"} pl={"44px"} pr={"44px"}>
                <Box
                  bgImage={annoucement.cover_image}
                  bgSize={"contain"}
                  bgPos={"center"}
                  bgRepeat={"no-repeat"}
                  w={"100%"}
                  minH={"90px"}
                  h={"108px"}
                ></Box>
                <Box
                  bgImage={annoucement.cover_image}
                  bgSize={"contain"}
                  bgPos={"center"}
                  bgRepeat={"no-repeat"}
                  w={"100%"}
                  minH={"90px"}
                  h={"108px"}
                ></Box>
                <Box
                  bgImage={annoucement.cover_image}
                  bgSize={"contain"}
                  bgPos={"center"}
                  bgRepeat={"no-repeat"}
                  w={"100%"}
                  minH={"90px"}
                  h={"108px"}
                ></Box>
                <Box
                  bgImage={annoucement.cover_image}
                  bgSize={"contain"}
                  bgPos={"center"}
                  bgRepeat={"no-repeat"}
                  w={"100%"}
                  minH={"90px"}
                  h={"108px"}
                ></Box>
                <Box
                  bgImage={annoucement.cover_image}
                  bgSize={"contain"}
                  bgPos={"center"}
                  bgRepeat={"no-repeat"}
                  w={"100%"}
                  minH={"90px"}
                  h={"108px"}
                ></Box>
                <Box
                  bgImage={annoucement.cover_image}
                  bgSize={"contain"}
                  bgPos={"center"}
                  bgRepeat={"no-repeat"}
                  w={"100%"}
                  minH={"90px"}
                  h={"108px"}
                ></Box>
              </SimpleGrid>
            </Stack>
            <Stack
              bg={"grey.0"}
              py={"30px"}
              px={"70px"}
              alignItems={"center"}
              spacing={3}
              borderRadius={"base"}
              mr={['15px', '15px', '50px']}
            >
              <Box
                background={"pink.400"}
                borderRadius={"50%"}
                color={"grey.0"}
                fontSize={"5xl"}
                p={"10px"}
              >
                LS
              </Box>
              <Text color={"grey.400"} fontWeight={"semibold"} fontSize={"xl"}>
                Lavínia Silva
              </Text>
              <Text
                color={"grey.300"}
                fontWeight={"normal"}
                fontSize={"md"}
                textAlign={"center"}
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's
              </Text>
              <Buttons
                backgroundColor={"grey.500"}
                color={"grey.0"}
                fontSize={"md"}
                valueButton={"Ver todos os anuncios"}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack ml={['15px', '15px', '50px']} mt={'20px'} mr={['15px', '15px', '50px']} mb={"30px"} width={['100%', '100%', '57%']}>
          <Stack
            bg={"grey.0"}
            display={"flex"}
            justifyContent={"center"}
            spacing={6}
            borderRadius={"base"}
            p={"20px"}
          >
            <Text color={"grey.400"} fontWeight={"semibold"} fontSize={"xl"}>
              Comentários
            </Text>
            <HStack>
              <Box
                background={"blue.400"}
                borderRadius={"150px"}
                color={"grey.0"}
                p={"5px"}
                ml={"10px"}
                fontSize={"sm"}
              >
                GM
              </Box>
              <Text color={"grey.400"} fontWeight={"medium"} fontSize={"sm"}>
                Gabriela Marchiori
              </Text>
              <Text color={"grey.250"} fontWeight={"normal"} fontSize={"xs"}>
                Há 1 dia
              </Text>
            </HStack>
            <Text color={"grey.300"} fontWeight={"normal"} fontSize={"sm"}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
            <HStack>
              <Box
                background={"pink.400"}
                borderRadius={"150px"}
                color={"grey.0"}
                p={"5px"}
                ml={"10px"}
                fontSize={"sm"}
              >
                FH
              </Box>
              <Text color={"grey.400"} fontWeight={"medium"} fontSize={"sm"}>
                Fernando Portugal
              </Text>
              <Text color={"grey.250"} fontWeight={"normal"} fontSize={"xs"}>
                Há 1 dia
              </Text>
            </HStack>
            <Text color={"grey.300"} fontWeight={"normal"} fontSize={"sm"}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
          </Stack>
          <Stack
            bg={"grey.0"}
            display={"flex"}
            justifyContent={"center"}
            spacing={6}
            borderRadius={"base"}
            p={"20px"}
          >
            <HStack>
              <Box
                background={"green.400"}
                borderRadius={"150px"}
                color={"grey.0"}
                p={"5px"}
                ml={"10px"}
                fontSize={"sm"}
              >
                LS
              </Box>
              <Text color={"grey.400"} fontWeight={"medium"} fontSize={"sm"}>
                Lavínia Silva
              </Text>
            </HStack>
            <Stack
              alignItems={"flex-end"}
              border={"1.5px solid"}
              borderColor={"grey.100"}
              borderRadius={"base"}
              p={"10px"}
            >
              <TextArea
                placeHolder={
                  "Carro muito confortável, foi uma ótima experiência de compra..."
                }
                border={"none"}
              />
              <Buttons
                backgroundColor={"blue.300"}
                color={"grey.0"}
                valueButton={"Comentar"}
              />
            </Stack>
            <HStack>
              <Text
                bg={"grey.100"}
                borderRadius={"3xl"}
                color={"grey.250"}
                fontSize={"xs"}
                px={"10px"}
              >
                Muito bom!
              </Text>
              <Text
                bg={"grey.100"}
                borderRadius={"3xl"}
                color={"grey.250"}
                fontSize={"xs"}
                px={"10px"}
              >
                Gostei muito!
              </Text>
              <Text
                bg={"grey.100"}
                borderRadius={"3xl"}
                color={"grey.250"}
                fontSize={"xs"}
                px={"10px"}
              >
                Vou recomendar
              </Text>
            </HStack>
          </Stack>
        </Stack>
      </Flex>
      <DefaultFooter />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async(ctx) => {
    
  api.defaults.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhYmlAbWFpbC5jb20iLCJzdWIiOiI2YmQ5NmQxYy04Y2JkLTQzNzAtYmZmMi0xYzBiZGI5YTMyZDYiLCJpYXQiOjE2ODE3NDU4MDQsImV4cCI6MTY4MTgzMjIwNH0.u1XOYxcE8rE10KHS78PM8N4T_FJVYC4NYopsyU1WdXs `
  const id = ctx.params!.id
  const response = await api.get(`/annoucements/${id}`)
  const annoucement: IAnnoucement = response.data

  console.log(annoucement)
    
  return {
      props: {
        annoucement
      }
  }
}

export default Dashboard;
