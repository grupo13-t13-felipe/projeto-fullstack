import Buttons from "@/components/button"
import HeaderProfile from "@/components/headers/headerProfile"
import TextArea from "@/components/textArea"
import { Box, Flex, HStack, Stack, Text } from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from 'next/router'


const Dashboard = () => {
    const router = useRouter()
    const { id } = router.query

    const testecar = {
        "id": "3aeed3e3-719f-4b3a-87c3-3d962bf58292",
        "model": "C4 CACTUS Rip Curl 1.6 16V Flex Aut.",
        "brand": "Citroën",
        "year": 2022,
        "fuel": 1,
        "km": 76323,
        "color": "Cinza",
        "fip_price": 112077,
        "price": 102123,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel urna et nisi luctus auctor eget vitae magna. Sed viverra ullamcorper nulla eu efficitur.",
        "cover_image": "/cars_images/CITROEN_C4_CACTUS_1.6.webp",
        "gallery_images": [
            {
                "id": "3aeed3e3-719f-4b3a-87c3-3d962bf58211",
                "url": "/cars_images/Citroen-C4-Cactus-Rip-Curl-2.jpg"
            },
            {
                "id": "3aeed3e3-719f-4b3a-87c3-3d962bf58211",
                "url": "/cars_images/CITROEN_C4_CACTUS_1.6.webp"
            }
        ],
        "is_active": true,
        "created_at": "2023-04-11T07:56:23.430Z",
        "updated_at": "2023-04-11T07:56:23.430Z",
        "owner": {
            "id": "ff46341a-62b2-47c8-8d1f-fc87d7ec3f17",
            "name": "Lucas Magalhães"
        }
    }
    return (
        <>
            <HeaderProfile />
            <Flex direction={['column', 'column', 'row']} bg={'blue.400'} justifyContent={'space-between'} alignItems={['center', 'center', '']}>
                <Stack ml={['10px', '10px', '50px', '100px']} mt={'20px'} width={['', '60%']} mr={'15px'}  >
                    <Box bg={'grey.0'} display={'flex'} justifyContent={'center'} borderRadius={'base'} height={'350px'}>
                        <Image src={testecar.cover_image} width={600} alt={testecar.model} height={250} />
                    </Box>
                    <Stack bg={'grey.0'} display={'flex'} justifyContent={'center'} spacing={6} borderRadius={'base'} px={'20px'}>
                        <Text fontSize={'xl'} fontWeight={'semibold'} mb={'45px'} mt={'20px'}>{testecar.model}</Text>
                        <HStack justifyContent={'space-between'} >
                            <HStack>
                                <Text bg={'blue.100'} fontSize={'sm'} fontWeight={'medium'} padding={"4px 8px 4px 8px"} borderRadius={"4px"} color={'blue.300'}>{testecar.year}</Text>
                                <Text bg={'blue.100'} fontSize={'sm'} fontWeight={'medium'} padding={"4px 8px 4px 8px"} borderRadius={"4px"} color={'blue.300'}>{testecar.km} KM</Text>
                            </HStack>
                            <Text fontSize={'md'} fontWeight={'medium'} >R$ {testecar.price}</Text>
                        </HStack>
                        <Box>
                            <Buttons backgroundColor={'blue.300'} color={"grey.0"} valueButton={'Comprar'} margin={'0px 0px 20px 0px'} />
                        </Box>
                    </Stack>
                    <Stack bg={'grey.0'} display={'flex'} justifyContent={'center'} spacing={6} borderRadius={'base'} p={'20px'}>
                        <Text color={'grey.400'} fontWeight={'semibold'} fontSize={'xl'}>Descrição</Text>
                        <Text color={'grey.300'} fontWeight={'normal'} fontSize={'md'}>{testecar.description}</Text>
                    </Stack>
                    <Stack bg={'grey.0'} display={'flex'} justifyContent={'center'} spacing={6} borderRadius={'base'} p={'20px'}>
                        <Text color={'grey.400'} fontWeight={'semibold'} fontSize={'xl'}>Comentários</Text>
                        <HStack>
                            <Box background={'blue.400'} borderRadius={'150px'} color={'grey.0'} p={'5px'} ml={'10px'} fontSize={'sm'}>GM</Box>
                            <Text color={'grey.400'} fontWeight={'medium'} fontSize={'sm'}>Gabriela Marchiori</Text>
                            <Text color={'grey.250'} fontWeight={'normal'} fontSize={'xs'}>Há 1 dia</Text>
                        </HStack>
                        <Text color={'grey.300'} fontWeight={'normal'} fontSize={'sm'}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                        <HStack>
                            <Box background={'pink.400'} borderRadius={'150px'} color={'grey.0'} p={'5px'} ml={'10px'} fontSize={'sm'}>FH</Box>
                            <Text color={'grey.400'} fontWeight={'medium'} fontSize={'sm'}>Fernando Portugal</Text>
                            <Text color={'grey.250'} fontWeight={'normal'} fontSize={'xs'}>Há 1 dia</Text>
                        </HStack>
                        <Text color={'grey.300'} fontWeight={'normal'} fontSize={'sm'}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
                    </Stack>
                    <Stack bg={'grey.0'} display={'flex'} justifyContent={'center'} spacing={6} borderRadius={'base'} p={'20px'}>
                        <HStack>
                            <Box background={'green.400'} borderRadius={'150px'} color={'grey.0'} p={'5px'} ml={'10px'} fontSize={'sm'}>LS</Box>
                            <Text color={'grey.400'} fontWeight={'medium'} fontSize={'sm'}>Lavínia Silva</Text>
                        </HStack>
                        <Stack alignItems={'flex-end'} border={'1.5px solid'} borderColor={'grey.100'} borderRadius={'base'} p={'10px'}>
                            <TextArea placeHolder={"Carro muito confortável, foi uma ótima experiência de compra..."} border={'none'} />
                            <Buttons backgroundColor={'blue.300'} color={'grey.0'} valueButton={"Comentar"} />
                        </Stack>
                        <HStack>
                            <Text bg={'grey.100'} borderRadius={'3xl'} color={'grey.250'} fontSize={'xs'} px={'10px'}>Muito bom!</Text>
                            <Text bg={'grey.100'} borderRadius={'3xl'} color={'grey.250'} fontSize={'xs'} px={'10px'}>Gostei muito!</Text>
                            <Text bg={'grey.100'} borderRadius={'3xl'} color={'grey.250'} fontSize={'xs'} px={'10px'}>Vou recomendar</Text>
                        </HStack>
                    </Stack>
                </Stack>
                <Stack mr={['10px', '10px', '50px', '100px']} mt={'20px'} width={'40%'}>
                    <Stack bg={'grey.0'} p={'20px'} mb={'20px'}>
                        <Text>Fotos</Text>
                        <Stack wrap={'wrap'} direction={'row'}>
                            <Image src={testecar.cover_image} width={150} alt={testecar.model} height={100} />
                            <Image src={testecar.cover_image} width={150} alt={testecar.model} height={100} />
                            <Image src={testecar.cover_image} width={150} alt={testecar.model} height={100} />
                            <Image src={testecar.cover_image} width={150} alt={testecar.model} height={100} />
                            <Image src={testecar.cover_image} width={150} alt={testecar.model} height={100} />
                            <Image src={testecar.cover_image} width={150} alt={testecar.model} height={100} />
                        </Stack>

                    </Stack>
                    <Stack bg={'grey.0'} py={'30px'} px={'70px'} alignItems={'center'} spacing={3} borderRadius={'base'}>
                        <Box background={'pink.400'} borderRadius={'50%'} color={'grey.0'} fontSize={'5xl'} p={'10px'}>LS</Box>
                        <Text color={'grey.400'} fontWeight={'semibold'} fontSize={'xl'}>Lavínia Silva</Text>
                        <Text color={'grey.300'} fontWeight={'normal'} fontSize={'md'} textAlign={'center'}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</Text>
                        <Buttons backgroundColor={'grey.500'} color={'grey.0'} fontSize={'md'} valueButton={"Ver todos os anuncios"} />
                    </Stack>


                </Stack>
            </Flex>


        </>
    )
}

export default Dashboard