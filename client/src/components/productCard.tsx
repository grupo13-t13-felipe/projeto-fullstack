import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Avatar, HStack } from "@chakra-ui/react";
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
  good
}: IProductCard) => {
  return (
    <Card role="group" boxShadow={"none"} w="312px" h="352px" borderRadius={"0"}>
      <CardBody padding={"1px"}>
        {good ? <Text
          position={"absolute"}
          left={"calc(100% - 19px)"}
          top={"3px"}
          w="16px"
          h="27px"
          paddingRight={"1px"}
          paddingTop={"1px"}
          backgroundColor={"#349974"}
          borderRadius={"10%"}
          textAlign={"center"}
          color={"white"}
        >
          $
        </Text> : <></>}
        <Image src={image} alt={alt} maxHeight={"152px"} w={"100%"} objectFit={"cover"} border={"2px solid transparent"} _groupHover={{ borderColor: "blue.300" }} />
        <Stack mt="6" spacing="1em">
          <Heading fontSize={"1em"} fontWeight={"600"} noOfLines={1}>
            {brand} - {model}
          </Heading>
          <Text
            fontSize={"sm"}
            fontWeight={"400"}
            color={"#495057"}
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
      <CardFooter padding={"0"}>
        <HStack w={"100%"} spacing={"1em"}>
          <Text
            backgroundColor={"#EDEAFD"}
            color={"#4529E6"}
            fontSize={"sm"}
            fontWeight={"500"}
            paddingX={"0.5em"}
            paddingY={"0.25em"}
          >
            {km} KM
          </Text>
          <Text
            backgroundColor={"#EDEAFD"}
            color={"#4529E6"}
            fontSize={"sm"}
            fontWeight={"500"}
            paddingX={"0.5em"}
            paddingY={"0.25em"}
          >
            {year}
          </Text>
        </HStack>
        <Text fontSize="1em" fontWeight={"500"} ml={"auto"}>
          R${price}
        </Text>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
