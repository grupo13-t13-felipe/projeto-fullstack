import { Box, HStack } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

const RadioCard = ({ label, value, control, name }: any) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value: fieldValue } }) => (
        <Box w={"100%"} as='label'>
          <input
            hidden
            type='radio'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            checked={fieldValue === value}
          />
          <Box
            cursor='pointer'
            borderWidth='2px'
            borderRadius='4px'
            boxShadow='md'
            px={5}
            w={"100%"}
            h={"48px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bg={fieldValue === value ? 'blue.300' : 'white'}
            color={fieldValue === value ? 'white' : 'black'}
            borderColor={fieldValue === value ? "blue.300" : "inherit"}
            _hover={{
              bg: 'blue.400',
              color: 'white',
              borderColor: "blue.400"
            }}
          >
            {label}
          </Box>
        </Box>
      )}
    />
  );
};

const RadioButton = ({control}: any) => {
    const options = [{label: "Vendedor", value: "true"}, {label: "Comprador", value: "false"}]

    return (
        <HStack>
        {options.map(({label, value}) => {
            return (
            <RadioCard key={label} label={label} value={value} control={control} name="is_seller" />
            )
        })}
        </HStack>
    )
}

export { RadioButton };