import { AnnouncementContext } from "@/contexts/announcements.context";
import {
	ComponentWithAs,
	FormControl,
	FormControlProps,
	FormErrorMessage,
	FormLabel,
	Input,
	InputProps,
} from "@chakra-ui/react";

import { debounce } from "lodash";
import {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

interface InputFormProps extends FormControlProps {
	labeltext: string;
	inputtype: string;
	inputplaceholder: string;
	inputregister: any;
	errors: string | undefined;
	isRequired?: boolean;
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
		const { setSelectedFilters, selectedFilters } =
			useContext(AnnouncementContext);
		const [onChangeValue, setOnChangeValue] = useState("");

		const handleInputChange = useCallback(
			debounce((inputValue, event) => {
				setSelectedFilters({ ...selectedFilters, [type]: inputValue });
			}, 1000),
			[]
		);

		const handleChange = (event: any) => {
			const inputValue = event.target.value;
			setOnChangeValue(inputValue);
			handleInputChange(inputValue, event);
		};
		useEffect(() => {
			return () => {
				handleInputChange.cancel();
			};
		}, [handleInputChange]);

		return (
			<>
				<Input
					placeholder={placeholder}
					value={onChangeValue}
					onChange={handleChange}
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
				{...props.inputregister}
				h={"48px"}
				_focusVisible={{
					boxShadow: "0 0 0 1px var(--chakra-colors-blue-400)",
				}}
				_focus={{ borderColor: "blue.400" }}
				type={props.inputtype}
				placeholder={props.inputplaceholder}
			/>
			<FormErrorMessage mt={"4px"} position={"absolute"}>
				{props.errors}
			</FormErrorMessage>
		</FormControl>
	);
};

export { InputArea, InputFilter, InputForm };
