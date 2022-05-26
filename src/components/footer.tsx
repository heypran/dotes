import { Box, Container, Flex, Link, Text, Icon } from '@chakra-ui/react';
import { Links, twitterLink } from '@config/constants';
import { TwitterIcon } from './icon/twitter';

export function Footer() {
  return (
    <Box p={['25px 0', '25px 0', '18px 0']}>
      <Container maxW="container.lg">
        <Box mt={['40px', '40px', '50px']} mb="10px" maxW="500px">
          <Flex alignItems="center" color="gray.400">
            <Link
              d="flex"
              alignItems="center"
              fontWeight={600}
              _hover={{ textDecoration: 'none', color: 'grey' }}
              href={Links.home}
            >
              Dotes
            </Link>
            <Text as="span" mx="7px">
              by
            </Text>
            <Link
              bg="black"
              px="6px"
              py="2px"
              rounded="4px"
              color="white"
              fontWeight={600}
              fontSize="13px"
              _hover={{ textDecoration: 'none', bg: 'gray.600' }}
              href="https://github.com/heypran"
              target="_blank"
            >
              @heypran
            </Link>

            <Link
              aria-label="Go to GitHub page"
              href={twitterLink}
              fontSize="13px"
              ml="16px"
            >
              <Icon
                as={TwitterIcon}
                display="block"
                transition="color 0.2s"
                cursor="pointer"
                color="black"
                w="6"
                h="6"
                _hover={{ color: 'gray.600' }}
              />
            </Link>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
