import { Button, Flex, List, ListItem, Text } from "@chakra-ui/react";
import { InputFilter } from "./input";
import { annoucementCtx } from "@/contexts/announcements.context";
import { useState } from "react";


const HomeFilter = () => {

    const {allAnnouncements, setAnnouncement} = annoucementCtx()
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

    const [getBrand, setGetBrand] = useState()
    const [getModel, setGetModel] = useState()
    const [getColor, setGetColor] = useState()
    const [getYear, setGetYear] = useState()
    const [getFuel, setGetFuel] = useState()

   
    const objectFilter = {brand: getBrand, model: getModel, color: getColor, year: getYear, fuel: getFuel}

    const sumFilter = () => {

    }

    console.log(objectFilter)


    
       
              

    return (
        <Flex direction={'column'}>
          <List>

           <Button onClick={() => sumFilter()}>Soma</Button>
          <Text color={'grey.500'} fontSize={['xl', '2xl','2xl', '3xl']} fontWeight={'semibold'} mb={'10px'} mt={'10px'}>Marca</Text>
            {
                newArrayBrand.map((item: any, index: any) => {
                   return (
                        <ListItem onClick={() => setGetBrand(item)} color={'grey.250'} fontSize={['md', 'lg','lg','xl']} fontWeight={'normal'}>{item[0].toUpperCase() + item.substring(1)}</ListItem>
                   )
                })
            }

        <Text color={'grey.500'} fontSize={['xl', '2xl','2xl', '3xl']} fontWeight={'semibold'} mb={'10px'} mt={'10px'}>Modelo</Text>
            {
                newArrayModel.map((item: any, index: any) => {
                   return (
                        <ListItem onClick={() => setGetModel(item)} color={'grey.250'} fontSize={['md', 'lg','lg','xl']} fontWeight={'normal'}>{item[0].toUpperCase() + item.substring(1)}</ListItem>
                   )
                })
            }

        <Text color={'grey.500'} fontSize={['xl', '2xl','2xl', '3xl']} fontWeight={'semibold'} mb={'10px'} mt={'10px'}>Cor</Text>
            {
                newArrayColor.map((item: any, index: any) => {
                   return (
                        <ListItem  onClick={() => setGetColor(item)} color={'grey.250'} fontSize={['md', 'lg','lg','xl']} fontWeight={'normal'}>{item[0].toUpperCase() + item.substring(1)}</ListItem>
                   )
                })
            }

        <Text color={'grey.500'} fontSize={['xl', '2xl','2xl', '3xl']} fontWeight={'semibold'} mb={'10px'} mt={'10px'}>Ano</Text>
            {
                newArrayYear.map((item: any, index: any) => {
                   return (
                        <ListItem onClick={() => setGetYear(item)} color={'grey.250'} fontSize={['md', 'lg','lg','xl']} fontWeight={'normal'}>{item}</ListItem>
                   )
                })
            }
            
        <Text color={'grey.500'} fontSize={['xl', '2xl','2xl', '3xl']} fontWeight={'semibold'} mb={'10px'} mt={'10px'}>Combustível</Text>
            {
                newArrayFuel.map((item: any, index: any) => {
                   return (
                        <ListItem onClick={() => setGetFuel(item)} color={'grey.250'} fontSize={['md', 'lg','lg','xl']} fontWeight={'normal'}>{item[0].toUpperCase() + item.substring(1)}</ListItem>
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