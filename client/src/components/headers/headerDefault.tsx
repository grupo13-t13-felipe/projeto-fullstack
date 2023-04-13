import { Box, Flex, Text, HStack, MenuButton, Menu, MenuList, MenuItem, IconButton, Link } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon} from '@chakra-ui/icons';

const DefaultHeader = () => {
  
  return (
    <Flex justifyContent={'space-between'} mx={['20px', '60px']} height={"60px"}>
    <HStack>
      <Text fontSize={'2xl'} fontWeight={'bold'} bgGradient='linear(to-r, #0B0D0D, #5126EA)'
      bgClip='text'>Motors </Text>
      <Text fontWeight={'bold'} bgGradient='linear(to-r, #5126EA, #4529E6)'
      bgClip='text'>Shop</Text>
    </HStack>
    <HStack pl={"20px"} h={"100%"} spacing={10} borderLeft={["none", "none", "2px"]} borderColor={["none", "none", "grey.100"]}>
      <Link color={"grey.300"} display={["none",'none' ,"block"]} fontWeight={'medium'} href='/login'>{""}Fazer Login</Link>
      <Link color={"grey.500"} display={["none", 'none',"block"]} href='/register' fontWeight={'medium'} border={'1px'} borderColor={'grey.200'} borderRadius={"4px"} px={'20px'} py={'5px'}>Cadastrar</Link>
      <Box display={["block",'block' ,"none"]} >
        
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              isActive={isOpen}
              icon={ isOpen ?  <CloseIcon fontSize={'xs'}/> : <HamburgerIcon />}
              variant='outline'
            />
            <MenuList minW={'100vw'} border={'none'} borderRadius={'2px 0px 2px 0px'} >
              <MenuItem>
                <Link color={"grey.300"} fontWeight={'medium'} href='/login' mb={'20px'}>{""}Fazer Login</Link>
              </MenuItem>
              <MenuItem width={'100%'}>
                <Link color={"grey.500"} href='/register' fontWeight={'medium'} border={'1px'} borderColor={'grey.200'} px={'20px'} py={'5px'} width={'100%'} textAlign={'center'}>{""}Cadastrar</Link>
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
      </Box>
    </HStack>
  </Flex>
  );
};

export default DefaultHeader;