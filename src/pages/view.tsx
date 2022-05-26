import React from 'react';

import {
  Box,
  Heading,
  Button,
  Text,
  Divider,
  Container,
  Flex,
  Stack,
  Input,
  Textarea,
  Checkbox,
} from '@chakra-ui/react';
import { Meta } from '@layout/Meta';
import { Main } from '@templates/Main';
import { Web3Storage } from 'web3.storage';
const CryptoJS = require('crypto-js');

const Index = () => {
  const [note, setNote] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [cid, setCid] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [isPassword, setIsPassword] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  // bafybeifbgapsokrecefrpfnlr6yifvtuimy7lwsrtlh7owtu7qbappgflq
  const storage = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_KEY! });
  const fetchNote = async () => {
    if (cid == null) {
      return;
    }
    setLoading(true);

    const res = await storage.get(cid);
    if (res == null) {
      return;
    }
    const files = await res.files();
    if (files.length == 0) {
      return;
    }
    const file = files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event) => {
      let rawContent;
      try {
        const result = password
          ? CryptoJS.AES.decrypt(reader.result, password).toString(
              CryptoJS.enc.Utf8,
            )
          : reader.result;
        rawContent = JSON.parse(result);
      } catch (e) {
        console.error(e);

        setLoading(false);
        return;
      }
      setTitle(rawContent.title);
      setNote(rawContent.note);

      setLoading(false);
    });
    reader.readAsBinaryString(file);
  };
  return (
    <Main
      meta={
        <Meta
          title="Dotes | Decentralized notes taking app"
          description="Decentralized notes taking app"
        />
      }
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Container maxW="container.lg" pb="90px">
          <Box py={['23px', '23px', '35px']} color="gray.200">
            <Heading
              color="black"
              fontSize={['22px', '22px', '28px']}
              mb={['8px', '8px', '16px']}
            >
              Dotes
            </Heading>

            <Text fontSize={['14px', '14px', '16px']} color="black" mb="16px">
              <b>Decentralized</b> notes taking app using <b>Web3Storage</b>.
            </Text>
            <Flex flexDirection="row" alignContent="ce"></Flex>
          </Box>
          <Text fontSize={['14px', '14px', '16px']} color="black" mb="16px">
            <b>View</b>
          </Text>
          <Divider />
        </Container>

        <Box>
          <Container maxW="container.sm">
            <Flex
              flexDirection={'column'}
              justifyContent="space-between"
              mb="16px"
            >
              <Stack spacing="24px">
                <Input
                  placeholder="hash"
                  size="md"
                  value={cid}
                  onChange={(e) => {
                    setCid(e.target.value);
                  }}
                />
                <Flex>
                  <Checkbox
                    onChange={(e) => {
                      setIsPassword(e.target.checked);
                    }}
                  >
                    Password
                  </Checkbox>

                  {isPassword && (
                    <Input
                      placeholder="password"
                      size="md"
                      ml="20px"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  )}
                </Flex>
                <Button
                  bg="black"
                  color="white"
                  _hover={{ bg: 'gray.600' }}
                  onClick={fetchNote}
                  isLoading={loading}
                >
                  Submit
                </Button>
                <Input
                  placeholder="Title"
                  disabled
                  size="md"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <Textarea
                  value={note}
                  disabled
                  height="200px"
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  placeholder="Notes"
                  size="sm"
                />
              </Stack>
            </Flex>
          </Container>
        </Box>
      </Box>
    </Main>
  );
};

export default Index;
