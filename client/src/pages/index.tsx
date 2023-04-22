import Head from 'next/head';
import { Text, Stack, Flex, Box, Link, VStack, ListItem, List } from '@chakra-ui/react';
import DefaultFooter from '@/components/footer';
import DefaultHeader from '@/components/headers/headerDefault';
import Modals from '@/components/modal';
import Buttons from '@/components/button';
import HomeFilter from '@/components/homeFilter';
import ProductCard from '@/components/productCard';
import NextLink from "next/link";
import { annoucementCtx } from '@/contexts/announcements.context';
import HeaderProfile from '@/components/headers/headerProfile';
import { useContext } from 'react';
import { UserContext } from '@/contexts/users.context';

const Home = () => {

  const { allAnnouncements, setAnnouncement, loading, setLoading, setOwnerId } = annoucementCtx()
  const {user} = useContext(UserContext)

   
  
  return (

    <>
      <Head>
        <title>Motors Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/titleIcon" />
      </Head>
      {loading ?

        <Flex justifyContent={'center'} alignItems={'center'}>
          <Text color={'blue.400'} fontSize={'6xl'}>Loading...</Text>
        </Flex>

        :
        <>
        {user? <HeaderProfile userLog={user.name}/> : <DefaultHeader /> }
          <Flex direction={'column'} height={'100%'}>
            <Stack bgGradient='linear(to-b, grey.150, grey.400)' alignItems={'center'} justifyContent={'center'}>
              <Box backgroundImage={'/Photo.svg'} display={'flex'} filter='grayscale(80%)' backgroundPosition={'center'} width={'100%'} maxW={'1174px'} backgroundRepeat={'no-repeat'} height={['50vh', '50vh', '50vh']} justifyContent={'center'} >
                <VStack color={'grey.0'} justifyContent={['normal', 'normal', 'center']} mt={'30px'}>
                  <Text fontSize={['4xl', '4xl', '6xl']} fontWeight={'extrabold'} >Motors Shop</Text>
                  <Text fontSize={['2xl', '2xl', '4xl']} fontWeight={'medium'} textAlign={'center'}>A melhor plataformade anúncios de carros do país</Text>
                </VStack>
              </Box>
            </Stack>
            <Stack justifyContent={"center"} direction={'row'} my={'50px'}>
              <Box mx={'30px'} display={['none', 'none', 'block']}>
                <HomeFilter />
              </Box>
              <List border={"none"} width={["100%", "100%", "95%"]} maxW={["none", "none", "984px"]} overflowX={"auto"} display={"flex"} flexWrap={["nowrap", "nowrap", "wrap"]} alignItems={"flex-start"} gap={["16px", "24px"]} ml={"0"} pb={"8px"}>
                {allAnnouncements.map((item: any, index: any) => {
                  return (
                    <ListItem w={"312px"} display={"inline-block"} key={index}>
                      <Link _hover={{ textDecoration: "none" }} as={NextLink} href={`/products/${item.id}`} onClick={() => setOwnerId(item.owner.id)} >
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
                <HomeFilter />} modalButtons={<Buttons backgroundColor={'blue.400'} color={"grey.0"} valueButton={"Ver anúncios"} />} nameButton={"Filtros"} titlesColor={'grey.400'} sizeTitle={'md'} footerDirection={'center'} footerWidth={'100%'} modalButtonColor={'grey.0'} modalButtonBg={'blue.400'} buttonWidth={'90%'} />
            </Stack>
            <List mb={"20px"} display={'flex'} justifyContent={'center'}>
              <ListItem mr={'20px'}><Link href="#" color={'blue.400'}>Anterior ❮ </Link></ListItem>
              <Text mr={'20px'} color={'grey.250'}>2 de 3</Text>
              <ListItem><Link href="#" color={'blue.400'}> Seguinte ❯ </Link></ListItem>
            </List>
          </Flex>
          <DefaultFooter />
        </>
      }
    </>
  )
}



export default Home
