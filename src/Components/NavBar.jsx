import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Switch,
  Spacer,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Nav({isChecked , changeBackGrndMOON , changeBackGrndSUN }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

    
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}  h="5rem"  fontSize={'25px'} pt="0.5rem" mb="0.8rem" borderBottom={'1px solid grey'} position='static'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Logo</Box>
            <HStack
              
              as={'nav'}
              spacing={5}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink border="1px solid red" key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          

          <Flex alignItems={'center'}>
          <p style={{marginRight:'10px'}}> Change Color</p>
          <Stack direction='row'>
          
              { isChecked ?  <MoonIcon onClick={(e)=>changeBackGrndMOON(e)} value="moonLight" colorScheme='teal' size='lg' ml='2rem'  /> 
                            : <SunIcon onClick={(e)=>changeBackGrndSUN(e)} value="sunLight" colorScheme='teal' size='lg'/>}
            </Stack>
            <Spacer />
            <Button ml="2rem"
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}>
              Action
            </Button>
            <Menu onMouseEnter={isOpen}>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                   border="2px solid lightgrey"
                  size={'sm'}
                  src={
                    'https://im4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
           
          </Box>
        ) : null}
      </Box>
    </>
  );
}
