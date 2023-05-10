import { Box, Flex, Text, HStack, MenuButton, Menu, MenuList, MenuItem, IconButton, Link, Avatar } from "@chakra-ui/react";
import { HamburgerIcon} from '@chakra-ui/icons'
import { useContext } from "react";
import { UserContext } from "@/contexts/users.context";
import UserModal from "../UserModal";
import AddressModal from "../AddressModal";
import { useRouter } from "next/router";
import { AnnouncementContext } from "@/contexts/announcements.context";

const ProfileMenuList = () => {
  const {user, logoutUser} = useContext(UserContext)
  const {getOwnerById} = useContext(AnnouncementContext)
  
  return (
    <MenuList maxW={"92px"} ml={"auto"}>
      <MenuItem>
        <UserModal/>
      </MenuItem>
      <MenuItem>
        <AddressModal/>
      </MenuItem>
      {user?.is_seller? <MenuItem onClick={() => getOwnerById(user.id)}>{""}Meus anúncios</MenuItem> : <></> }

     
      <MenuItem>
        <Link onClick={() => logoutUser()}>{""}Sair</Link>
      </MenuItem>
    </MenuList>
  );
}

const HeaderProfile = () => {
  const {user} = useContext(UserContext)
  const router = useRouter()
  
  return (
    <Flex justifyContent={'space-between'} mx={['20px', '20px', '26px', '30px', 'auto']} h={'80px'} maxW={'1200px'}>
      <HStack onClick={() => router.push("/")} _hover={{cursor: "pointer"}}>
        <Text fontSize={'2xl'} fontWeight={'bold'} bgGradient='linear(to-r, #0B0D0D, #5126EA)'
        bgClip='text'>Motors </Text>
        <Text fontWeight={'bold'} bgGradient='linear(to-r, #5126EA, #4529E6)'
        bgClip='text'>Shop</Text>
      </HStack>
      <HStack borderLeft={'1px'} borderColor={'grey.200'}>
        <Avatar name={user?.name} size={'md'} ml={'10px'}/>{' '}
        
        <Box display={['none', 'none', 'block']}>
          <Menu >
          <MenuButton
            as={Link}
            aria-label='Options'
            variant='outline'
          >{user?.name}</MenuButton>
          {ProfileMenuList()}
        </Menu>
        </Box>
        
        <Box display={["block",'block' ,"none"]} maxW={"100px"}>
        <Menu placement="top-end" gutter={16}>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
          >{user?.name}</MenuButton>
          {ProfileMenuList()}
        </Menu>
        </Box>
        
    </HStack>
  </Flex>
  );
};


export default HeaderProfile;