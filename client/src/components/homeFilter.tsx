import { Button, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { InputFilter } from "./input";
import { annoucementCtx } from "@/contexts/announcements.context";
import { useEffect, useState } from "react";

const HomeFilter = () => {
	const { getAllAnnoucementFilterTypes, filterData, setFilterData } =
		annoucementCtx();

	const [brand, setBrand] = useState<string[]>([]);
	const [model, setModel] = useState<string[]>([]);
	const [color, setColor] = useState<string[]>([]);
	const [year, setYear] = useState<string[]>([]);
	const [fuel, setFuel] = useState<string[]>([]);

	useEffect(() => {
		load();
		async function load() {
			const data = await getAllAnnoucementFilterTypes();
			setBrand(data.brand);
			setModel(data.model);
			setColor(data.color);
			setYear(data.year);
			setFuel(data.fuel);
		}
	}, []);

	const objectFilter = {
		brand: brand,
		model: model,
		color: color,
		year: year,
		fuel: fuel,
	};

	const sumFilter = () => {};

	console.log(objectFilter);

	return (
		<Flex direction={"column"}>
			<List>
				<Text
					color={"grey.500"}
					fontSize={["xl", "2xl", "2xl", "3xl"]}
					fontWeight={"semibold"}
					mb={"10px"}
					mt={"10px"}>
					Marca
				</Text>
				{brand.map((item: any, index: any) => {
					return (
						<ListItem
							onClick={() => setBrand(item)}
							color={"grey.250"}
							fontSize={["md", "lg", "lg", "xl"]}
							fontWeight={"normal"}>
							{item[0].toUpperCase() + item.substring(1)}
						</ListItem>
					);
				})}

				<Text
					color={"grey.500"}
					fontSize={["xl", "2xl", "2xl", "3xl"]}
					fontWeight={"semibold"}
					mb={"10px"}
					mt={"10px"}>
					Modelo
				</Text>
				{model.map((item: any, index: any) => {
					return (
						<ListItem
							onClick={() => setModel(item)}
							color={"grey.250"}
							fontSize={["md", "lg", "lg", "xl"]}
							fontWeight={"normal"}>
							{item[0].toUpperCase() + item.substring(1)}
						</ListItem>
					);
				})}

				<Text
					color={"grey.500"}
					fontSize={["xl", "2xl", "2xl", "3xl"]}
					fontWeight={"semibold"}
					mb={"10px"}
					mt={"10px"}>
					Cor
				</Text>
				{color.map((item: any, index: any) => {
					return (
						<ListItem
							onClick={() => setColor(item)}
							color={"grey.250"}
							fontSize={["md", "lg", "lg", "xl"]}
							fontWeight={"normal"}>
							{item[0].toUpperCase() + item.substring(1)}
						</ListItem>
					);
				})}

				<Text
					color={"grey.500"}
					fontSize={["xl", "2xl", "2xl", "3xl"]}
					fontWeight={"semibold"}
					mb={"10px"}
					mt={"10px"}>
					Ano
				</Text>
				{year.map((item: any, index: any) => {
					return (
						<ListItem
							onClick={() => setYear(item)}
							color={"grey.250"}
							fontSize={["md", "lg", "lg", "xl"]}
							fontWeight={"normal"}>
							{item}
						</ListItem>
					);
				})}

				<Text
					color={"grey.500"}
					fontSize={["xl", "2xl", "2xl", "3xl"]}
					fontWeight={"semibold"}
					mb={"10px"}
					mt={"10px"}>
					Combustível
				</Text>
				{fuel.map((item: any, index: any) => {
					return (
						<ListItem
							onClick={() => setFuel(item)}
							color={"grey.250"}
							fontSize={["md", "lg", "lg", "xl"]}
							fontWeight={"normal"}>
							{item[0].toUpperCase() + item.substring(1)}
						</ListItem>
					);
				})}
			</List>

			<List>
				<Text
					color={"grey.500"}
					fontSize={["xl", "2xl", "2xl", "3xl"]}
					fontWeight={"semibold"}
					mb={"10px"}
					mt={"10px"}>
					Km
				</Text>
				<Flex direction={"row"} gap={"12px"}>
					<InputFilter placeholder={"Mínimo"} />
					<InputFilter placeholder={"Máximo"} />
				</Flex>
			</List>
			<List>
				<Text
					color={"grey.500"}
					fontSize={["xl", "2xl", "2xl", "3xl"]}
					fontWeight={"semibold"}
					mb={"10px"}
					mt={"10px"}>
					Preço
				</Text>
				<Flex direction={"row"} gap={"12px"}>
					<InputFilter placeholder={"Mínimo"} />
					<InputFilter placeholder={"Máximo"} />
				</Flex>
			</List>
		</Flex>
	);
};

export default HomeFilter;
