import Buttons from "@/components/button";
import DefaultFooter from "@/components/footer";
import HeaderProfile from "@/components/headers/headerProfile";
import api from "@/services/api";
import { IComment, IComments } from "@/types/announcements";
import { useForm } from 'react-hook-form';
import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Avatar, Image, Progress, List, Button, Textarea, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { UserContext } from "@/contexts/users.context";
import DefaultHeader from "@/components/headers/headerDefault";
import { annoucementCtx } from "@/contexts/announcements.context";
import { useRouter } from "next/router";
import { commentSchema } from "@/schemas/user.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import Modals from "@/components/modal";
import DeleteCommentModal from "@/components/deleteCommentModal";
import DeleteAnnouncementModal from "@/components/deleteCommentModal";
import {EditIcon } from '@chakra-ui/icons'
import EditeComment from "@/components/editeCommentModal";
import EditeCommentModal from "@/components/editeCommentModal";
import { setCookie } from "nookies";
import nookies from 'nookies'

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useContext(UserContext)
  const { getOwnerById, comments, loading, getComments, setLoading, announcementById, getAnnouncementById, setComments } = annoucementCtx()
  const router = useRouter()
  const { id }: any = router.query;
  const today: any = new Date()
  const cookie = nookies.get()

  
  console.log(comments)

  useEffect(() => {
    getAnnouncementById(id)
  }, [])

  const verifyLogin = () => {
    if (!user) {
      router.push("/login")
    } else {
      window.open(`https://wa.me/55${announcementById.owner.phone}`, "_blank")
    }
  }
  
  const postComment = async (formData: IComment) => {
    try {
      const {data} : any = await api.post(`/annoucements/${id}/comments`, formData)
      console.log(data)
      setComments([...comments!, data])
    } catch (err) {
      console.error(err)
    }
      
    
  }
  
  const { register, handleSubmit, formState: { errors } } = useForm<IComment>({
    resolver: yupResolver(commentSchema)
  })
  
  // const verifyComments = () => {
  //   setLoading(true)
  //   getComments(id)
  // }
  // useEffect(() => {
  //   // verifyComments()
    
  // }, [comments])

  const modalContent = <>
    <Text>Confirmar deleção de comentário</Text>
    <HStack>
      <Buttons valueButton={"Sim"} color={"grey.250"} fontSize={"sm"}/>
      <Buttons valueButton={"Não"} color={"grey.250"} fontSize={"sm"}/>
    </HStack>
  </>

  return (
    <>{
      loading ? (
        <Flex justifyContent={"center"} alignItems={"center"} h={'100vh'}>
					<Text color={"blue.400"} fontSize={"6xl"}>
						Loading...
					</Text>
					<Progress size='xs' isIndeterminate />
				</Flex>
			) : <>
        {user? <HeaderProfile/> : <DefaultHeader /> }
      <Flex
        direction={"column"}
        justifyContent={"space-between"}
        alignItems={["center", "center", "initial"]}
        bgGradient={'linear(to-b, blue.400 0px 500px, grey.75 500px 100%)'}
      >
        <Stack
          direction={["column", "column", "row"]}
          mr={["15px", "15px", "50px"]}
        >
          <Stack
            mt={"20px"}
            width={["", "", "60%"]}
            mr={"15px"}
            ml={['32px', '32px', '70px']}
            mb={"30px"}
          >
            <Box
              bg={"grey.0"}
              borderRadius={"base"}
              p={['10px', '10px', '30px']}
              display={"flex"}
              justifyContent={"center"}
              flexDir={"column"}
            >
              <Box m={"auto"} display={'flex'}>
                <Image
                  src={announcementById.cover_image}
                  alt={announcementById.model}
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
                {announcementById.model}
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
                    {announcementById.year}
                  </Text>
                  <Text
                    bg={"blue.100"}
                    fontSize={"sm"}
                    fontWeight={"medium"}
                    padding={"4px 8px 4px 8px"}
                    borderRadius={"4px"}
                    color={"blue.300"}
                  >
                    {announcementById.km} KM
                  </Text>
                </HStack>
                <Text fontSize={"md"} fontWeight={"medium"}>
                  R$ {announcementById.price}
                </Text>
              </HStack>
              <Box>
                
                <Buttons
                  backgroundColor={"blue.300"}
                  color={"grey.0"}
                  valueButton={"Comprar"}
                  margin={"0px 0px 20px 0px"}
                  onClick={() => verifyLogin()}
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
                {announcementById.description}
              </Text>
            </Stack>
          </Stack>
          <Stack width={["100%", "100%", "40%"]}>
            <Stack
              bg={"grey.0"}
              mb={"20px"}
              mt={"20px"}
              height={"355px"}
              display={"flex"}
              flexDir={"column"}
              justifyContent={"flex-start"}
              gap={"2em"}
              borderRadius={"base"}
            >
              <Text
                mt={'20px'}
                ml="44px"
                color={"grey.400"}
                fontSize={"xl"}
                fontWeight={"semibold"}
              >
                Fotos
              </Text>
              <SimpleGrid columns={3} spacing={"14px"} pl={"44px"} pr={"44px"}>
                {announcementById.gallery_images.map((item, index) => {
                  return (
                    <>
                       <Button key={index + "btn"} onClick={onOpen} backgroundColor={'transparent'} _hover={{bgColor: 'transparent'}}>
                        {
                          <Box>
                            <Image src={item.url}/>
                          </Box>
                        }
                       </Button>
                        <Modal isOpen={isOpen} onClose={onClose} key={item.id + "modal"}>
                          <ModalOverlay />
                          <ModalContent>
                          <ModalHeader></ModalHeader>
                          <ModalCloseButton />
                            <ModalBody>

                              {<Image src={item.url} />}

                            </ModalBody>
                          </ModalContent>
                        </Modal>
                    </>

                  );
                })}
              </SimpleGrid>
            </Stack>
            <Stack
              bg={"grey.0"}
              py={"30px"}
              px={"70px"}
              alignItems={"center"}
              spacing={3}
              borderRadius={"base"}
              mr={["15px", "15px", "50px"]}
            >
              <Avatar name={announcementById.owner.name} size={"md"} ml={"10px"} />{" "}
              <Text color={"grey.400"} fontWeight={"semibold"} fontSize={"xl"}>
                {announcementById.owner.name}
              </Text>
              <Text
                color={"grey.300"}
                fontWeight={"normal"}
                fontSize={"md"}
                textAlign={"center"}
              >
                {announcementById.owner.description}
              </Text>
              <Buttons
                backgroundColor={"grey.500"}
                color={"grey.0"}
                fontSize={"md"}
                valueButton={"Ver todos os anuncios"}
                onClick={() => getOwnerById(announcementById.owner.id)}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack
          ml={["15px", "15px", "70px"]}
          mt={"20px"}
          mr={["15px", "15px", "50px"]}
          mb={"30px"}
          width={["100%", "100%", "51%", '54%', '57%']}
        >
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
            {
              comments?.map((element, key) => {
                const createdDate = new Date(element.created_at)
                const difTime = today.getTime() - createdDate.getTime()
                const difDays = difTime / (1000 * 3600 * 24)
                
                return (

                  <List key={key + 'comments'}>

                    <HStack mb={"20px"} justifyContent={"space-between"}>
                      <HStack>
                        <Avatar name={element.owner.name} size={"sm"}/>
                        <Text color={"grey.400"} fontWeight={"medium"} fontSize={"sm"}>
                          {element.owner.name}
                        </Text>
                        <Text color={"grey.250"} fontWeight={"normal"} fontSize={"xs"}>
                          {`há ${Math.floor(difDays)} dias`}
                        </Text>
                      </HStack>
                      <HStack>
                        {
                          user?.id === element.owner.id ? 
                          <>
                            <EditeCommentModal comment_id={element.id} defaultValue={element.content}/>
                           
                          </>
                          : null
                        }
                        {
                          user?.id === element.announcement.owner_id || user?.id === element.owner.id ? 
                          <>
                             <DeleteCommentModal comment_id={element.id} />
                          </>
                          : null
                        }
                      </HStack>
                    </HStack>
                    <Text color={"grey.300"} fontWeight={"normal"} fontSize={"sm"}>
                      {element.content}
                    </Text>
                  </List>
                )
              })
            }
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
              {
                user ? <>
                  <Avatar name={user!.name} size={"sm"}/>
                  <Text color={"grey.400"} fontWeight={"medium"} fontSize={"sm"}>
                    {user!.name}
                  </Text></> : null 
              }
            </HStack>
              <form
                onSubmit={handleSubmit(postComment)}
              >
                <Stack
                  alignItems={"flex-end"}
                  border={"1.5px solid"}
                  borderColor={"grey.100"}
                  borderRadius={"base"}
                  p={"10px"}
                >
                  <Textarea placeholder="insira seu comentário..." {...register("content")} border={"none"} />
                  <Flex w={"100%"} justifyContent={"flex-end"} mt={"20px"}>
                    <Buttons
                      backgroundColor={"blue.300"}
                      color={"grey.0"}
                      valueButton={"Comentar"}
                      type={"submit"}
                    />
                  </Flex>
                </Stack>
              </form> 
            
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
      <Text>{ }</Text>
      <DefaultFooter />
      </>
    }
    </>
  );
};


export default Dashboard;