import AnnouncementModal from "@/components/announcmentModal";
import DefaultFooter from "@/components/footer";
import DefaultHeader from "@/components/headers/headerDefault";
import HeaderProfile from "@/components/headers/headerProfile";
import ProductCard from "@/components/productCard";
import { annoucementCtx } from "@/contexts/announcements.context";
import { UserContext } from "@/contexts/users.context";
import { commentSchema } from "@/schemas/user.schema";
import { Flex, List, ListItem, Text, Link, Avatar } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import NextLink from "next/link";
import { useContext } from "react";
import { useForm } from "react-hook-form";


const Advertiser = () => {

    const { announcementsByOwner, loading, owner } = annoucementCtx()
    const { user } = useContext(UserContext)
   
    return (
        <>
            {
                loading ? <Text>Loading...</Text> :
                    <>
                        {user ? <HeaderProfile /> : <DefaultHeader />}

                        <Flex
                            direction={"column"}
                            justifyContent={"space-between"}
                            alignItems={["center", "center", "initial"]}
                            bgGradient={'linear(to-b, blue.400 0px 250px, grey.75 250px 100%)'}
                        >
                            
                            <Flex
                                minH={"450px"}
                                align={"center"}
                                justifyContent={"center"}
                            >
                                <Flex
                                    direction={"column"}
                                    borderRadius={"base"}
                                    bg={"grey.25"}
                                    minH={"315px"}
                                    width={["95%", "80%", "80%"]}
                                    py={["22px", "44px", "44px"]}
                                    px={["21px", "41px", "41px"]}
                                    gap={"21px"}
                                >
                                    <Avatar name={owner!.name} src={""} size={"lg"} />
                                    <Flex
                                        align={"center"}
                                        gap={"9px"}
                                    >
                                        <Text
                                            color={"grey.400"}
                                            fontWeight={"semibold"}
                                            fontSize={"xl"}
                                        >
                                            {owner!.name}
                                        </Text>
                                        <Text
                                            color={"blue.300"}
                                            bg={"blue.100"}
                                            padding={"4px 8px"}
                                            fontWeight={"medium"}
                                            fontSize={"sm"}
                                            borderRadius={"4px"}
                                        >
                                            Anunciante
                                        </Text>

                                    </Flex>
                                    <Text
                                        color={"grey.300"}
                                        fontSize={"md"}
                                        borderRadius={"4px"}
                                    >
                                        {owner!.description!}
                                    </Text>
                                    {
                                        user?.is_seller ? <AnnouncementModal /> : null
                                    }
                                </Flex>
                            </Flex>


                            <Flex
                                w={["95%", "95%", "90%"]}
                                align={"center"}
                                maxWidth={"1400px"}
                                justify={"center"}
                                margin={"0 auto"}
                                gap={"85px"}
                                justifyContent={"center"}
                                direction={'column'}
                                my={'50px'}
                            >
                                {/* <Text
                                    display={"flex"}
                                    w={"100%"}
                                    justifyContent={"flex-start"}
                                    color={"grey.500"}
                                    fontWeight={"semibold"}
                                    fontSize={"2xl"}
                                >
                                    Anúncios
                                </Text> */}
                                <List
                                    border={"none"} width={["100%", "100%", "95%"]} maxW={["none", "none", "1400px"]} overflowX={"auto"} display={"flex"} flexWrap={["nowrap", "nowrap", "wrap"]} alignItems={"center"} gap={["16px", "24px"]} ml={"0"} pb={"8px"}
                                >
                                    {
                                        announcementsByOwner!.map((element, index) => {
                                            return (
                                                <ListItem w={"312px"} display={"inline-block"} key={index}>
                                                    
                                                        <ProductCard
                                                            image={`${element.cover_image}`}
                                                            alt={`${element.brand}`}
                                                            brand={`${element.brand}`}
                                                            model={`${element.model}`}
                                                            description={`${element.description}`}
                                                            owner={`${element.owner.name}`}
                                                            userAvatar={""}
                                                            km={`${element.km}`}
                                                            year={`${element.year}`}
                                                            price={`${element.price}`}
                                                            good={true} 
                                                            announcId={element.id} 
                                                            ownerId={element.owner_id}                                                        />
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </Flex>

                        </Flex>
                        <DefaultFooter />
                    </>
            }
        </>

    )
}
export default Advertiser;