import { Flex, HStack, List, ListItem, Text } from "@chakra-ui/react"
import Buttons from "./button"
import FilterList from "./filterList"


const HomeFilter = () => {

    return (
        <Flex direction={'column'}>
           <FilterList filterTitle={'Marca'} filterDetail01={'Citroën'} filterDetail02={'Fiat'}/>
           <FilterList filterTitle={'Modelo'} filterDetail01={'Fit'} filterDetail02={'Gol'}/>
           <FilterList filterTitle={'Cor'} filterDetail01={'Branco'} filterDetail02={'Cinza'}/>
           <FilterList filterTitle={'Ano'} filterDetail01={'2023'} filterDetail02={'2022'}/>
           <FilterList filterTitle={'Combustível'} filterDetail01={'Diesel'} filterDetail02={'Etanol'}/>
            <FilterList filterTitle={'Km'} filterDetail01={<Flex direction={'row'}>
            <Buttons backgroundColor={'grey.150'} color={'grey.250'} radius={'0px'} valueButton={'mínimo'} margin={'0px 10px 0px 0px'}/>
            <Buttons backgroundColor={'grey.150'} color={'grey.250'} radius={'0px'} valueButton={'máximo'} margin={'0px 10px 0px 0px'}/>
            </Flex>} />
            <FilterList filterTitle={'Preço'} filterDetail01={<Flex direction={'row'}>
            <Buttons backgroundColor={'grey.150'} color={'grey.250'} radius={'0px'} valueButton={'mínimo'} margin={'0px 10px 0px 0px'}/>
            <Buttons backgroundColor={'grey.150'} color={'grey.250'} radius={'0px'} valueButton={'máximo'} margin={'0px 10px 0px 0px'}/>
            </Flex>} />
        </Flex>
    )
}

export default HomeFilter