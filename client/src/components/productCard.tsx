import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, ButtonGroup, Button, Avatar, HStack } from "@chakra-ui/react";
const ProductCard = ({
  image,
  alt,
  name,
  description,
  user,
  userAvatar,
  km,
  year,
  price,
}: any) => {
  return (
    <Card maxW="312px" borderRadius={"0"}>
      <CardBody padding={"1px"}>
        <Image
          src={
            image
          }
          alt={alt}
          maxHeight={"152px"}
          m={"auto"}
        />
        <Stack mt="6" spacing="1em">
          <Heading fontSize={"1em"} fontWeight={"600"}>
            {name}
          </Heading>
          <Text fontSize={"sm"} fontWeight={"400"} color={"#495057"}>
            {description}
          </Text>
          <HStack>
            <Avatar name={user} src={userAvatar} size={"sm"} />
            <Text fontSize={"sm"}>{user}</Text>
          </HStack>
        </Stack>
      </CardBody>
      <CardFooter padding={"0"} mt={"1em"}>
        <HStack w={"100%"}>
          <Text
            backgroundColor={"#EDEAFD"}
            color={"#4529E6"}
            fontSize={"sm"}
            fontWeight={"500"}
            paddingX={"0.5em"}
            paddingY={"0.25em"}
          >
            {km}
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
