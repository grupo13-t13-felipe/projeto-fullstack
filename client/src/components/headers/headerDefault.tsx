import { Box, Flex, Text, HStack, MenuButton, Menu, MenuList, MenuItem, IconButton, Link } from "@chakra-ui/react";
import { HamburgerIcon} from '@chakra-ui/icons'

const DefaultHeader = () => {
  return (
    <Flex justifyContent={'space-between'} mx={['20px', '60px']} my={'10px'}>
    <HStack>
      <Text fontSize={'2xl'} fontWeight={'bold'} bgGradient='linear(to-r, #0B0D0D, #5126EA)'
      bgClip='text'>Motors </Text>
      <Text fontWeight={'bold'} bgGradient='linear(to-r, #5126EA, #4529E6)'
      bgClip='text'>Shop</Text>
    </HStack>
    <HStack spacing={10}>
      <Link color={"grey.300"} display={["none",'none' ,"block"]} fontWeight={'medium'} href='/login'>{""}Fazer Login</Link>
      <Link color={"grey.500"} display={["none", 'none',"block"]} href='/register' fontWeight={'medium'} border={'1px'} borderColor={'grey.200'} px={'20px'} py={'5px'} borderRadius={'base'}>Cadastro</Link>
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
  );
};

export default DefaultHeader;