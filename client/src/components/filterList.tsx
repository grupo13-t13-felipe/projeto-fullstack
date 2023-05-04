import { List, ListItem, Text } from "@chakra-ui/react"


const FilterList = ({filterTitle, filterDetail01, filterDetail02 }: any) => {
    return (
        <List>
            <Text color={'grey.500'} fontSize={['xl', '2xl','2xl', '3xl']} fontWeight={'semibold'} mb={'10px'}>{filterTitle}</Text>
           <ListItem color={'grey.250'} fontSize={['md', 'lg','lg','xl']} fontWeight={'normal'}>{filterDetail01}</ListItem>
           <ListItem color={'grey.250'} fontSize={['md', 'lg','lg','xl']} fontWeight={'normal'} mb={'20px'}>{filterDetail02}</ListItem>  
        </List>
    )
}

export default FilterList