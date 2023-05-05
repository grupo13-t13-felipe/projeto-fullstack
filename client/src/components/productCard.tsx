import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Avatar, HStack, ButtonGroup, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import EditAnnouncementModal from "./editAnnouncmentModal";
import Buttons from "./button";
import { redirect } from "next/dist/server/api-utils";
import { AnnouncementContext } from "@/contexts/announcements.context";
import { useContext } from "react";

interface IProductCard {
  image: string;
  alt: string;
  brand: string;
  model: string;
  description: string;
  owner: string;
  userAvatar: string;
  km: string | number;
  year: string | number;
  price: string | number;
  good: boolean;
  announcId: string;
  ownerId: string;
}

const ProductCard = ({
  image,
  alt,
  brand,
  model,
  description,
  owner,
  userAvatar,
  km,
  year,
  price,
  good,
  announcId,
  ownerId
}: IProductCard) => {
  const { setOwnerId, getComments } = useContext(AnnouncementContext)
  const router = useRouter()
  const redirect = () => {
    console.log(router.asPath)
    if(router.asPath != "/announcements") {
        router.push(`/products/${announcId}`)
        setOwnerId(ownerId)
        getComments(announcId)
    }else{

    }
  }
  const redirectFromButton = () => {
        router.push(`/products/${announcId}`)
        setOwnerId(ownerId)
        getComments(announcId)
  }
  return (
    <Card role="group" boxShadow={"none"} w="312px" h="380px" borderRadius={"0"} onClick={redirect}>
      <CardBody padding={"1px"}>
        {good ? <Text
          position={"absolute"}
          left={"calc(100% - 19px)"}
          top={"3px"}
          w="16px"
          h="27px"
          paddingRight={"1px"}
          paddingTop={"1px"}
          backgroundColor={"green.800"}
          borderRadius={"10%"}
          textAlign={"center"}
          color={"white"}
        >
          $
        </Text> : <></>}
        <Image src={image} alt={alt} maxHeight={"152px"} w={"100%"} objectFit={"cover"} border={"2px solid transparent"} _groupHover={{ borderColor: "blue.300" }} borderRadius={'2px'} />
        <Stack mt="6" spacing="1em">
          <Heading fontSize={"1em"} fontWeight={"600"} noOfLines={1}>
            {brand} - {model}
          </Heading>
          <Text
            fontSize={"sm"}
            fontWeight={"400"}
            color={"grey.300"}
            noOfLines={2}
          >
            {description}
          </Text>
          <HStack>
            <Avatar name={owner} src={userAvatar} size={"sm"} />
            <Text fontSize={"sm"}>{owner}</Text>
          </HStack>
        </Stack>
      </CardBody>
      <CardFooter padding={"0"} flexDirection={"column"}>
        <Box flexDirection={"row"} display={"flex"}>
          <HStack w={"50%"} spacing={"1em"}>
            <Text
              backgroundColor={"blue.100"}
              color={"blue.300"}
              fontSize={"sm"}
              fontWeight={"500"}
              paddingX={"0.5em"}
              paddingY={"0.25em"}
            >
              {km} KM
            </Text>
            <Text
              backgroundColor={"blue.100"}
              color={"blue.300"}
              fontSize={"sm"}
              fontWeight={"500"}
              paddingX={"0.5em"}
              paddingY={"0.25em"}
            >
              {year}
            </Text>
          </HStack>
          <Text fontSize="1em" fontWeight={"500"} ml={'auto'}>
            R${price}
          </Text>
        </Box>
        
        {router.asPath == "/announcements" ? 
          <ButtonGroup mt="1em">
            <EditAnnouncementModal announcId={announcId} announcementInfo={{
              model: "",
              brand: "",
              year: "",
              fuel: "",
              km: "",
              color: "",
              fip_price: "",
              price: "",
              description: "",
              cover_image: ""
            }}/>
            <Buttons onClick={redirectFromButton} border={"2px"} backgroundColor={"#FDFDFD"} color={"#212529"} borderColor={"#212529"} radius={"4px"} fontSize={"1em"} valueButton={"Ver detalhes"}>Ver detalhes</Buttons>
          </ButtonGroup>
          :
          <></>
        }
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
