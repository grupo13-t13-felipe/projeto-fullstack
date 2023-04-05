import Head from 'next/head'
// import Image from 'next/image'
import {Text, Image, Stack, HStack, Flex, Box, Menu, MenuButton, IconButton, MenuItem, MenuList, Link, VStack} from '@chakra-ui/react'
import { HamburgerIcon} from '@chakra-ui/icons'


export default function Home() {

  return (
    <>
      <Head>
        <title>Motors Shop</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justifyContent={'space-between'} mx={['20px', '60px']} my={'10px'}>
        <HStack>
          <Text fontSize={'2xl'} fontWeight={'bold'} bgGradient='linear(to-r, #0B0D0D, #5126EA)'
          bgClip='text'>Motors </Text>
          <Text fontWeight={'bold'} bgGradient='linear(to-r, #5126EA, #4529E6)'
          bgClip='text'>Shop</Text>
        </HStack>
        <HStack spacing={10}>
          <Link color={"grey.300"} display={["none", "block"]} fontWeight={'medium'} href='/login'>{""}Fazer Login</Link>
          <Link color={"grey.500"} display={["none", "block"]} href='/register' fontWeight={'medium'} border={'1px'} borderColor={'grey.200'} px={'20px'} py={'5px'} borderRadius={'base'}>Cadastro</Link>
          <Box display={["bock", "none"]} >
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem>
                <Link href='/login'>{""}Fazer Login</Link>
              </MenuItem>
              <MenuItem>
                <Link href='/register'>{""}Cadastro</Link>
              </MenuItem>
            </MenuList>
          </Menu>
          </Box>
          
        </HStack>
      </Flex>
      <Box backgroundImage={'/volkswagen-gol-ultima-geracao-foto-VW.webp'} display={'flex'} alignItems={'center'} justifyContent={'center'} filter='auto' backgroundPosition={'center'} backgroundSize={'cover'} backgroundRepeat={'no-repeat'}>
        <VStack color={'grey.0'}>
          <Text fontSize={['4xl','4xl','6xl']} fontWeight={'extrabold'} >Motors Shop</Text>
          <Text fontSize={['2xl','2xl' ,'4xl']} fontWeight={'medium'} textAlign={'center'}>A melhot plataformade anúncios de carros do país</Text>

        </VStack>
      </Box>
      
    </>
  )
}
