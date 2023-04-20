import { Box, Flex, Text, HStack, MenuButton, Menu, MenuList, MenuItem, IconButton, Link, Avatar } from "@chakra-ui/react";
import { HamburgerIcon} from '@chakra-ui/icons'
import { IUser } from "@/types/user";
import { useContext } from "react";
import { UserContext } from "@/contexts/users.context";

interface IHeaderProfile {
  userLog: string
}


const ProfileMenuList = () => {
  const {user} = useContext(UserContext)
  
  return (
    <MenuList>
      <MenuItem>
        <Link href="">{""}Editar Perfil</Link>
      </MenuItem>
      <MenuItem>
        <Link href="">{""}Editar endereço</Link>
      </MenuItem>
      {user?.is_seller? <MenuItem><Link href="">{""}Meus anúncios</Link> </MenuItem> : <></> }
     
      <MenuItem>
        <Link href="/login">{""}Sair</Link>
      </MenuItem>
    </MenuList>
  );
}

const HeaderProfile = ({userLog}: IHeaderProfile) => {
  
  return (
    <Flex justifyContent={'space-between'} mx={['20px', '20px', '26px', '30px', 'auto']} h={'80px'} maxW={'1200px'}>
      <HStack>
        <Text fontSize={'2xl'} fontWeight={'bold'} bgGradient='linear(to-r, #0B0D0D, #5126EA)'
        bgClip='text'>Motors </Text>
        <Text fontWeight={'bold'} bgGradient='linear(to-r, #5126EA, #4529E6)'
        bgClip='text'>Shop</Text>
      </HStack>
      <HStack borderLeft={'1px'} borderColor={'grey.200'}>
        <Avatar name={userLog} size={'md'} ml={'10px'}/>{' '}
        
        <Box display={['none', 'none', 'block']}>
          <Menu >
          <MenuButton
            as={Link}
            aria-label='Options'
            variant='outline'
          >{userLog}</MenuButton>
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
          >{userLog}</MenuButton>
          {ProfileMenuList()}
        </Menu>
        </Box>
        
    </HStack>
  </Flex>
  );
};


export default HeaderProfile;