import { Box, Flex, Text, HStack, MenuButton, Menu, MenuList, MenuItem, IconButton, Link } from "@chakra-ui/react";
import { HamburgerIcon} from '@chakra-ui/icons'

const HeaderProfile = () => {
  return (
    <Flex justifyContent={'space-between'} mx={['20px', '60px']} my={'10px'}>
    <HStack>
      <Text fontSize={'2xl'} fontWeight={'bold'} bgGradient='linear(to-r, #0B0D0D, #5126EA)'
      bgClip='text'>Motors </Text>
      <Text fontWeight={'bold'} bgGradient='linear(to-r, #5126EA, #4529E6)'
      bgClip='text'>Shop</Text>
    </HStack>
    <HStack borderLeft={'1px'} borderColor={'grey.200'}>
        <Box background={'blue.400'} borderRadius={'100%'} color={'grey.0'} p={'5px'} ml={'10px'}>
            JS
        </Box>
      <Link color={"grey.300"} display={["none", 'none',"block"]} fontWeight={'normal'} fontSize={'md'}>Nome Pessoa</Link>
      <Box display={["block",'block' ,"none"]} >
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='outline'
        />
        <MenuList>
          <MenuItem>
            <Link href='/login'>{""}Nome Pessoa</Link>
          </MenuItem>
        </MenuList>
      </Menu>
      </Box>
      
    </HStack>
  </Flex>
  );
};

export default HeaderProfile;