import React from 'react';
import {Link as RouteLink} from 'gatsby';
import { deleleCookie } from "../../utils/cookie";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import './style.css'

const Links = [
  {
    "name": "Home",
    "path": "/",
  },
  {
    "name": "Flashcard",
    "path": "/app/flash-card",
  },
  {
    "name": "Cards",
    "path": "/app/cards",
  },
  {
    "name": "Learning",
    "path": "/app/learning",
  },
  {
    "name": "Exam",
    "path": "/app/exam",
  },
];

function NavLink(props) {
  return (
    <RouteLink
      to={props.children.path}
      activeClassName={useColorModeValue('active-link-light', 'active-link')}
    >
      <Link
        as="div"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.300', 'gray.700'),
        }}
      >
        {props.children.name}
      </Link>
    </RouteLink>
  );
}

export default function Nav() {
  const {colorMode, toggleColorMode} = useColorMode();
  // const {isOpen, onOpen, onClose} = useDisclosure();

  const logout = () => {
    deleleCookie("token")
    window.location.href = "/login"
  }

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} position={"fixed"} width={"100%"} zIndex={99999}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box>Logo</Box>
          <HStack
            as={'nav'}
            spacing={4}
            display={{base: 'none', md: 'flex'}}>
            {Links.map((link) => (
              <NavLink key={link.path}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br/>
                <Center>
                  <Avatar
                    size={'2xl'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </Center>
                <br/>
                <Center>
                  <p>Username</p>
                </Center>
                <br/>
                <MenuDivider/>
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}