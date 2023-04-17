import { Box, Flex, Text, HStack, MenuButton, Menu, MenuList, MenuItem, IconButton, Link, Avatar } from "@chakra-ui/react";
import { HamburgerIcon} from '@chakra-ui/icons'
import { GetServerSideProps, NextPage } from "next";
import { IUser, Props } from "@/types/user";
import api from "@/services/api";

const ProfileMenuList = () => {
  return (
    <MenuList>
      <MenuItem>
        <Link href="">{""}Editar Perfil</Link>
      </MenuItem>
      <MenuItem>
        <Link href="">{""}Editar endereço</Link>
      </MenuItem>
      <MenuItem>
        <Link href="">{""}Meus anúncios</Link>
      </MenuItem>
      <MenuItem>
        <Link href="/login">{""}Sair</Link>
      </MenuItem>
    </MenuList>
  );
}

const HeaderProfile: NextPage<Props> = ({user}) => {
  return (
    <Flex justifyContent={'space-between'} mx={['20px', '20px', '26px', '30px', 'auto']} h={'80px'} maxW={'1200px'}>
      <HStack>
        <Text fontSize={'2xl'} fontWeight={'bold'} bgGradient='linear(to-r, #0B0D0D, #5126EA)'
        bgClip='text'>Motors </Text>
        <Text fontWeight={'bold'} bgGradient='linear(to-r, #5126EA, #4529E6)'
        bgClip='text'>Shop</Text>
      </HStack>
      <HStack borderLeft={'1px'} borderColor={'grey.200'}>
        <Avatar name="Gabriela Marchiori" size={'md'} ml={'10px'}/>{' '}
        
        <Box display={['none', 'none', 'block']}>
          <Menu >
          <MenuButton
            as={Link}
            aria-label='Options'
            variant='outline'
          >{user.name}</MenuButton>
          {ProfileMenuList()}
        </Menu>
        </Box>
        
        <Box display={["block",'block' ,"none"]} >
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
          >{user.name}</MenuButton>
          {ProfileMenuList()}
        </Menu>
        </Box>
        
    </HStack>
  </Flex>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async(ctx) => {
    
  api.defaults.headers.authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdhYmlAbWFpbC5jb20iLCJzdWIiOiI2YmQ5NmQxYy04Y2JkLTQzNzAtYmZmMi0xYzBiZGI5YTMyZDYiLCJpYXQiOjE2ODE3NDU4MDQsImV4cCI6MTY4MTgzMjIwNH0.u1XOYxcE8rE10KHS78PM8N4T_FJVYC4NYopsyU1WdXs `
  const id = ctx.params!.id
  const response = await api.get(`/annoucements/${id}`)
  const user: IUser = response.data

     
  return {
      props: {
        user
      }
  }
}

export default HeaderProfile;