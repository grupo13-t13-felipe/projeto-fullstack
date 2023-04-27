import { Button, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { InputFilter } from "./input";
import {
	IFilters,
	ISelectedFilter,
	annoucementCtx,
} from "@/contexts/announcements.context";
import api from "@/services/api";
import { IAnnouncement } from "@/types/announcements";
import { useEffect, useRef } from "react";

const HomeFilter = () => {
	const {
		filterData,
		actualFilters,
		setActualFilters,
		selectedFilters,
		setSelectedFilters,
		setAllAnnouncements,
		getAllAnnouncements,
	} = annoucementCtx();

	const inputKmMinValue = useRef<HTMLInputElement>(null);
	const inputKmMaxValue = useRef<HTMLInputElement>(null);
	const inputPriceMinValue = useRef<HTMLInputElement>(null);
	const inputPriceMaxValue = useRef<HTMLInputElement>(null);

	async function clearFilters() {
		setActualFilters(filterData);
		setSelectedFilters({});
		getAllAnnouncements();

		//não funciona
		if (inputKmMinValue.current) inputKmMinValue.current.value = "";
		if (inputKmMaxValue.current) inputKmMaxValue.current.value = "";
		if (inputPriceMinValue.current) inputPriceMinValue.current.value = "";
		if (inputPriceMaxValue.current) inputPriceMaxValue.current.value = "";
	}

	function getAllAnnoucementFilterTypes(
		allAnnoucements: IAnnouncement[]
	): IFilters {
		const finalObj: IFilters = {
			brand: [],
			model: [],
			color: [],
			year: [],
			fuel: [],
		};
		finalObj.brand = allAnnoucements
			.map((annoucement) => annoucement.brand)
			.filter((value, index, self) => self.indexOf(value) === index);
		finalObj.model = allAnnoucements
			.map((annoucement) => annoucement.model)
			.filter((value, index, self) => self.indexOf(value) === index);
		finalObj.color = allAnnoucements
			.map((annoucement) => annoucement.color)
			.filter((value, index, self) => self.indexOf(value) === index);
		finalObj.year = allAnnoucements
			.map((annoucement) => annoucement.year)
			.filter((value, index, self) => self.indexOf(value) === index);
		finalObj.fuel = allAnnoucements
			.map((annoucement) => annoucement.fuel)
			.filter((value, index, self) => self.indexOf(value) === index);

		return finalObj;
	}

	function toSearch(selectedFilters: ISelectedFilter) {
		let toSearchStr: any = [];
		Object.keys(selectedFilters).forEach((key, i) => {
			const value = Object.values(selectedFilters);
			toSearchStr.push(`${key}=${value[i]}`);
		});
		if (toSearchStr.length > 0) {
			toSearchStr.unshift("?");
			toSearchStr = toSearchStr.join("&");
		}
		return toSearchStr;
	}

	async function clickOnFilter(e: any, type: string, item: string) {
		setSelectedFilters({ ...selectedFilters, [type]: item });
	}

	useEffect(() => {
		if (Object.keys(selectedFilters).length > 0) {
			console.log(selectedFilters);
			const searchParameter: string = toSearch(selectedFilters);
			console.log(searchParameter);
			load(searchParameter);
		}
		async function load(searchParameter: string) {
			const { data } = await api.get(`annoucements${searchParameter}`);

			const newFilters = getAllAnnoucementFilterTypes(data.data);

			setActualFilters(newFilters);
			setAllAnnouncements(data.data);
		}
	}, [selectedFilters]);

	const FilterList = ({ item, type }: any) => {
		return (
			<ListItem
				color={"grey.250"}
				fontSize={["md", "lg", "lg", "xl"]}
				fontWeight={"normal"}
				onClick={(e) => clickOnFilter(e, type, item)}>
				{item[0].toUpperCase() + item.substring(1)}
			</ListItem>
		);
	};

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
				{actualFilters?.brand.map((item: string, index: number) => {
					return (
						<FilterList item={item} key={index} type={"brand"} />
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
				{actualFilters?.model.map((item: any, index: any) => {
					return (
						<FilterList item={item} key={index} type={"model"} />
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
				{actualFilters?.color.map((item: any, index: any) => {
					return (
						<FilterList item={item} key={index} type={"color"} />
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
				{actualFilters?.year.map((item: any, index: any) => {
					return <FilterList item={item} key={index} type={"year"} />;
				})}

				<Text
					color={"grey.500"}
					fontSize={["xl", "2xl", "2xl", "3xl"]}
					fontWeight={"semibold"}
					mb={"10px"}
					mt={"10px"}>
					Combustível
				</Text>
				{actualFilters?.fuel.map((item: any, index: any) => {
					return <FilterList item={item} key={index} type={"fuel"} />;
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
					<InputFilter
						placeholder={"Mínimo"}
						ref={inputKmMinValue}
						type={"min_km"}
					/>
					<InputFilter
						placeholder={"Máximo"}
						ref={inputKmMaxValue}
						type={"max_km"}
					/>
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
					<InputFilter
						placeholder={"Mínimo"}
						ref={inputPriceMinValue}
						type={"min_price"}
					/>
					<InputFilter
						placeholder={"Máximo"}
						ref={inputPriceMaxValue}
						type={"max_price"}
					/>
				</Flex>
			</List>
			<Button
				marginTop={"22px"}
				onClick={() => {
					clearFilters();
				}}>
				Limpar
			</Button>
		</Flex>
	);
};

export default HomeFilter;
