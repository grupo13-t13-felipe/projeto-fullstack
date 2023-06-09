import Head from "next/head";
import {
	Text,
	Stack,
	Flex,
	Box,
	VStack,
	ListItem,
	List,
	Button, Progress
} from "@chakra-ui/react";
import DefaultFooter from "@/components/footer";
import DefaultHeader from "@/components/headers/headerDefault";
import Modals from "@/components/modal";
import Buttons from "@/components/button";
import HomeFilter from "@/components/homeFilter";
import ProductCard from "@/components/productCard";
import { annoucementCtx } from "@/contexts/announcements.context";
import HeaderProfile from "@/components/headers/headerProfile";
import { useContext } from "react";
import { UserContext } from "@/contexts/users.context";

const Home = () => {
	const {
		allAnnouncements,
		loading,
		paginationPage,
		setPaginationPage,
	} = annoucementCtx();
	const { user } = useContext(UserContext);

	return (
		<>
			<Head>
				<title>Motors Shop</title>
				<meta
					name="description"
					content="Generated by create next app"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/titleIcon" />
			</Head>
			{loading ? (
				<Flex justifyContent={"center"} alignItems={"center"} h={'100vh'}>
					<Text color={"blue.400"} fontSize={"6xl"}>
						Loading...
					</Text>
					<Progress size='xs' isIndeterminate />
				</Flex>
			) : (
				<>
					{user ? <HeaderProfile /> : <DefaultHeader />}
					<Flex direction={"column"} height={"100%"}>
						<Stack
							bgGradient="linear(to-b, grey.150, grey.400)"
							alignItems={"center"}
							justifyContent={"center"}>
							<Box
								backgroundImage={"/folder.png"}
								display={"flex"}
								filter="grayscale(80%)"
								backgroundPosition={"center"}
								width={"100%"}
								maxW={"1174px"}
								backgroundRepeat={"no-repeat"}
								height={["50vh", "50vh", "50vh"]}
								justifyContent={"center"}>
								<VStack
									color={"grey.0"}
									justifyContent={[
										"normal",
										"normal",
										"center",
									]}
									mt={"30px"}>
									<Text
										fontSize={["4xl", "4xl", "6xl"]}
										fontWeight={"extrabold"}>
										Motors Shop
									</Text>
									<Text
										fontSize={["2xl", "2xl", "4xl"]}
										fontWeight={"medium"}
										textAlign={"center"}>
										A melhor plataformade anúncios de carros
										do país
									</Text>
								</VStack>
							</Box>
						</Stack>
						<Stack
							justifyContent={"center"}
							direction={"row"}
							my={"50px"}>
							<Box
								mx={"30px"}
								display={["none", "none", "block"]}>
								<HomeFilter />
							</Box>
							<List
								border={"none"}
								width={["100%", "100%", "95%"]}
								maxW={["none", "none", "984px"]}
								overflowX={"auto"}
								display={"flex"}
								flexWrap={["nowrap", "nowrap", "wrap"]}
								alignItems={"flex-start"}
								gap={["16px", "24px"]}
								ml={"0"}
								pb={"8px"}>
								{allAnnouncements.data.length > 0 ? allAnnouncements.data.map(
									(item: any, index: any) => {
										return (
											<ListItem
												w={"312px"}
												display={"inline-block"}
												key={index}>
													<ProductCard
														announcId={item.id}
														good={item.price /
															item.fip_price <=
															0.95}
														image={item.cover_image}
														alt={item.model}
														brand={item.brand}
														model={item.model}
														description={item.description}
														owner={item.owner.name}
														userAvatar={""}
														km={item.km}
														year={item.year}
														price={item.price} 
														ownerId={item.owner.id}></ProductCard>
											</ListItem>
										);
									}
								) : <Flex pt={"20px"} flexDirection={"column"} w={"100%"} justifyContent={"center"} alignItems={"center"} gap={"16px"}>
										<Text fontSize={"24px"} fontWeight={"500"} color={"grey.400"}>
											Nenhum anuncio registrado
										</Text>
										<Text fontSize={"18px"} fontWeight={"500"} color={"grey.250"}>
											Volte novamente mais tarde
										</Text>
									</Flex>}
							</List>
						</Stack>
						<Stack
							mx={"50px"}
							my={"30px"}
							display={["flex", "flex", "none"]}
							alignItems={"center"}>
							<Modals
									modalTitle={"Filtro"}
									modalContent={<HomeFilter />}
									modalButtons={<Buttons
										backgroundColor={"blue.400"}
										color={"grey.0"}
										valueButton={"Ver anúncios"} />}
									nameButton={"Filtros"}
									titlesColor={"grey.400"}
									sizeTitle={"md"}
									footerDirection={"center"}
									footerWidth={"100%"}
									modalButtonColor={"grey.0"}
									modalButtonBg={"blue.400"}
									buttonWidth={"90%"} isOpen={false} onOpen={function (): void {
										throw new Error("Function not implemented.");
									} } onClose={function (): void {
										throw new Error("Function not implemented.");
									} } buttonRadius={""} buttonBorder={""} buttonBorderColor={""} />
						</Stack>
						<Box
							mb={"16px"}
							display={"flex"}
							justifyContent={"center"}
							alignItems={"center"}
							gap={"6px"}
							fontWeight={"600"}
							fontSize={["16px", "18px"]}>
							<Button
								fontSize={["16px", "18px"]}
								bgColor={"transparent"}
								color={"blue.300"}
								_hover={{
									bgColor: "transparent",
									color: "blue.400",
								}}
								isDisabled={paginationPage <= 1}
								onClick={() =>
									setPaginationPage(paginationPage - 1)
								}>
								Anterior ❮
							</Button>
							<Text fontWeight={"600"} color={"grey.250"}>
								{paginationPage}
							</Text>
							<Text color={"grey.200"}>de</Text>
							<Text color={"grey.200"}>
								{allAnnouncements.pagesCount}
							</Text>
							<Button
								fontSize={["16px", "18px"]}
								bgColor={"transparent"}
								color={"blue.300"}
								_hover={{
									bgColor: "transparent",
									color: "blue.400",
								}}
								isDisabled={
									paginationPage ==
									allAnnouncements.pagesCount
								}
								onClick={() =>
									setPaginationPage(paginationPage + 1)
								}>
								Seguinte ❯{" "}
							</Button>
						</Box>
					</Flex>
					<DefaultFooter />
				</>
			)}
		</>
	);
};

export default Home;