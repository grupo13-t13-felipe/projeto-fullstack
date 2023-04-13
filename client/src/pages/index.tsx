import Head from 'next/head';
import { Text, Stack, Flex, Box, Link, VStack, ListItem, List } from '@chakra-ui/react';
import DefaultFooter from '@/components/footer';
import DefaultHeader from '@/components/headers/headerDefault';
import Modals from '@/components/modal';
import Buttons from '@/components/button';
import HomeFilter from '@/components/homeFilter';
import { announcements } from '@/mocks/announcements';
import ProductCard from '@/components/productCard';
import NextLink from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Motors Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/titleIcon" />
      </Head>
     <DefaultHeader/>
     <Flex direction={'column'} height={'100%'}>
      <Stack bgGradient='linear(to-b, grey.150, grey.400)' alignItems={'center'} justifyContent={'center'}>
      <Box backgroundImage={'/Photo.svg'} display={'flex'}  filter='grayscale(80%)' backgroundPosition={'center'} width={'100%'} maxW={'1174px'} backgroundRepeat={'no-repeat'} height={['50vh', '50vh', '50vh']} justifyContent={'center'} >
        <VStack color={'grey.0'} justifyContent={['normal', 'normal', 'center']} mt={'30px'}>
          <Text fontSize={['4xl','4xl','6xl']} fontWeight={'extrabold'} >Motors Shop</Text>
          <Text fontSize={['2xl','2xl' ,'4xl']} fontWeight={'medium'} textAlign={'center'}>A melhor plataformade anúncios de carros do país</Text>
        </VStack>
      </Box>
      </Stack>
      <Stack direction={'row'} justifyContent={"space-around"} my={'50px'}>
        <Box mx={'30px'} display={['none', 'none', 'block']}>
          <HomeFilter/>
        </Box>
        <List spacing={"4em"} ml={"auto"} w={"75%"}>
          {announcements.map((item, index) => {
            return (
              <ListItem display={"inline-block"} key={index}>
                <Link as={NextLink} href={`/product/${item.id}`}>
                  <ProductCard
                    good={
                      (item.price / item.fip_price) <= 0.95
                    }
                    image={item.cover_image}
                    alt={item.model}
                    brand={item.brand}
                    model={item.model}
                    description={item.description}
                    owner={item.owner.name}
                    userAvatar={""}
                    km={item.km}
                    year={item.year}
                    price={item.price}
                  ></ProductCard>
                </Link>
              </ListItem>
            );
        })}
        </List>
</Stack>
<Stack mx={'50px'} my={'30px'} display={['flex', 'flex', 'none']} alignItems={'center'}>
<Modals modalTitle={'Filtro'} modalContent={
<HomeFilter/>} modalButtons={<Buttons backgroundColor={'blue.400'} color={"grey.0" } valueButton={"Ver anúncios"}/>} nameButton={"Filtros"} titlesColor={'grey.400'} sizeTitle={'md'} footerDirection={'center'} footerWidth={'100%'} modalButtonColor={'grey.0'} modalButtonBg={'blue.400'} buttonWidth={'90%'}/>
</Stack>
      <List display={'flex'} justifyContent={'center'}>
        <ListItem mr={'20px'}><Link href="#" color={'blue.400'}>Anterior ❮ </Link></ListItem>
        <Text mr={'20px'} color={'grey.250'}>2 de 3</Text>
        <ListItem><Link href="#" color={'blue.400'}> Seguinte ❯ </Link></ListItem>
      </List>
    </Flex>
      <DefaultFooter/>
    </>
  )
}
