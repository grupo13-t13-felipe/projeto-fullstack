import { annoucementCtx } from "@/contexts/announcements.context";
import {
	FormControl,
	FormControlProps,
	FormErrorMessage,
	FormLabel,
	Input,
} from "@chakra-ui/react";

import { forwardRef, useEffect, useState } from "react";

interface InputFormProps extends FormControlProps {
    labeltext: string;
    inputtype: string;
    inputplaceholder: string;
    inputregister: any;
    errors: string | undefined;
    isRequired?: boolean;
    id?: string
	value?: string;
	disabled?: boolean
}

const InputArea = ({
	nameInput,
	placeHolder,
	fontSize,
	width,
	heigth,
	focusBorderColor,
	margin,
}: any) => {
	return (
		<>
			<label htmlFor={nameInput}>{nameInput}</label>
			<Input
				id={nameInput}
				placeholder={placeHolder}
				fontSize={fontSize}
				width={width}
				height={heigth}
				focusBorderColor={focusBorderColor}
				margin={margin}
			/>
		</>
	);
};

interface IInputFilterProps {
	placeholder: string;
	type: string;
}

const InputFilter = forwardRef<HTMLInputElement, IInputFilterProps>(
	({ placeholder, type }, ref) => {
		const { setSelectedFilters, selectedFilters } = annoucementCtx();
		const [onChangeValue, setOnChangeValue] = useState("");
		const [mounted, setMounted] = useState(false);

		const handleChange = (event: any) => {
			const inputValue = event.target.value;
			const regexOnlyNumber = /^[0-9]+$/g;
			event.target.value.replace(regexOnlyNumber, "");
			if (regexOnlyNumber.test(inputValue)) {
				setOnChangeValue(inputValue);
			}
		};

		useEffect(() => {
			if (mounted) {
				const timeOutId = setTimeout(() => {
					setSelectedFilters({
						...selectedFilters,
						[type]: onChangeValue,
					});
				}, 500);
				return () => clearTimeout(timeOutId);
			} else {
				setMounted(true);
			}
		}, [onChangeValue]);

		return (
			<>
				<Input
					placeholder={placeholder}
					onChange={handleChange}
					value={onChangeValue}
					backgroundColor={"grey.150"}
					color={"grey.400"}
					fontWeight={"bold"}
					_placeholder={{ color: "grey.250" }}
					outline={"none"}
					focusBorderColor={"grey.250"}
					h={"40px"}
					w={"141px"}
					borderRadius={"0px"}
					ref={ref}
				/>
			</>
		);
	}
);

const InputForm = (props: InputFormProps) => {
	return (
		<FormControl {...props}>
			<FormLabel>{props.labeltext}</FormLabel>
			<Input
				id={props.id} {...props.inputregister}
				h={"48px"}
				_focusVisible={{
					boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
				}}
				_focus={{ borderColor: "blue.400" }}
				type={props.inputtype}
				placeholder={props.inputplaceholder}
				value={props.value}
				disabled={props.disabled}
				defaultValue={props.defaultValue}
			/>
			<FormErrorMessage mt={"4px"} position={"absolute"}>
				{props.errors}
			</FormErrorMessage>
		</FormControl>
	);
};

export { InputArea, InputFilter, InputForm };
