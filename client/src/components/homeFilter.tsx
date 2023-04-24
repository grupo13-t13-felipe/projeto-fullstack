import { Flex, List, ListItem, Text } from "@chakra-ui/react";
import { InputFilter } from "./input";
import { annoucementCtx } from "@/contexts/announcements.context";


const HomeFilter = () => {

    const {allAnnouncements} = annoucementCtx()
    const arrayFuel: Array<[]> = []
    allAnnouncements.map((item: any) => {
        arrayFuel.push(item.fuel)
    })
    const newArrayFuel = arrayFuel.filter((el, i) => arrayFuel.indexOf(el) === i)
    
    const arrayBrand: Array<[]> = []
    allAnnouncements.map((item: any) => {
        arrayBrand.push(item.brand)
    })
    const newArrayBrand = arrayBrand.filter((el, i) => arrayBrand.indexOf(el) === i)

    const arrayModel: Array<[]> = []
    allAnnouncements.map((item: any) => {
        arrayModel.push(item.model)
    })
    const newArrayModel = arrayModel.filter((el, i) => arrayModel.indexOf(el) === i)

    const arrayColor: Array<[]> = []
    allAnnouncements.map((item: any) => {
        arrayColor.push(item.color)
    })
    const newArrayColor = arrayColor.filter((el, i) => arrayColor.indexOf(el) === i)

    const arrayYear: Array<[]> = []
    allAnnouncements.map((item: any) => {
        arrayYear.push(item.year)
    })
    const newArrayYear = arrayYear.filter((el, i) => arrayYear.indexOf(el) === i)

          

    return (
        <Flex direction={'column'}>
          <List>

          <Text color={'grey.500'} fontSize={['xl', '2xl','2xl', '3xl']} fontWeight={'semibold'} mb={'10px'} mt={'10px'}>Marca</Text>
            {
                newArrayBrand.map((item: any, index: any) => {
                   return (
                        <ListItem color={'grey.250'} fontSize={['md', 'lg','lg','xl']} fontWeight={'normal'}>{item[0].toUpperCase() + item.substring(1)}</ListItem>
                   )
                })
            }

        <Text color={'grey.500'} fontSize={['xl', '2xl','2xl', '3xl']} fontWeight={'semibold'} mb={'10px'} mt={'10px'}>Modelo</Text>
            {
                newArrayModel.map((item: any, index: any) => {
                   return (
                        <ListItem color={'grey.250'} fontSize={['md', 'lg','lg','xl']} fontWeight={'normal'}>{item[0].toUpperCase() + item.substring(1)}</ListItem>
                   )
                })
            }

        <Text color={'grey.500'} fontSize={['xl', '2xl','2xl', '3xl']} fontWeight={'semibold'} mb={'10px'} mt={'10px'}>Cor</Text>
            {
                newArrayColor.map((item: any, index: any) => {
                   return (
                        <ListItem color={'grey.250'} fontSize={['md', 'lg','lg','xl']} fontWeight={'normal'}>{item[0].toUpperCase() + item.substring(1)}</ListItem>
                   )
                })
            }

        <Text color={'grey.500'} fontSize={['xl', '2xl','2xl', '3xl']} fontWeight={'semibold'} mb={'10px'} mt={'10px'}>Ano</Text>
            {
                newArrayYear.map((item: any, index: any) => {
                   return (
                        <ListItem color={'grey.250'} fontSize={['md', 'lg','lg','xl']} fontWeight={'normal'}>{item}</ListItem>
                   )
                })
            }
            
        <Text color={'grey.500'} fontSize={['xl', '2xl','2xl', '3xl']} fontWeight={'semibold'} mb={'10px'} mt={'10px'}>Combustível</Text>
            {
                newArrayFuel.map((item: any, index: any) => {
                   return (
                        <ListItem color={'grey.250'} fontSize={['md', 'lg','lg','xl']} fontWeight={'normal'}>{item[0].toUpperCase() + item.substring(1)}</ListItem>
                   )
                })
            }
           
          </List>

          <List>
            <Text color={'grey.500'} fontSize={['xl', '2xl','2xl', '3xl']} fontWeight={'semibold'} mb={'10px'} mt={'10px'}>Km</Text>
            <Flex direction={'row'} gap={"12px"}>
                <InputFilter placeholder={"Mínimo"}/>
                <InputFilter placeholder={"Máximo"}/>

            </Flex>
          </List>
          <List>
            <Text color={'grey.500'} fontSize={['xl', '2xl','2xl', '3xl']} fontWeight={'semibold'} mb={'10px'} mt={'10px'}>Preço</Text>
            <Flex direction={'row'} gap={"12px"}>
                <InputFilter placeholder={"Mínimo"}/>
                <InputFilter placeholder={"Máximo"}/>

            </Flex>
          </List>
            
            
            
        </Flex>
    )
}

export default HomeFilter