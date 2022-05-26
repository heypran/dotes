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
  const [cid, setCid] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [isPassword, setIsPassword] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const storage = new Web3Storage({ token: process.env.NEXT_PUBLIC_WEB3_KEY! });

  const sha256 = async (str: string) => {
    const buf = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder('utf-8').encode(str),
    );
    return Array.prototype.map
      .call(new Uint8Array(buf), (x) => ('00' + x.toString(16)).slice(-2))
      .join('');
  };

  const createNewNote = async () => {
    setLoading(true);

    const content = {
      title,
      note,
      timestamp: new Date().getTime().toString(),
    };

    const stringifiedContent = JSON.stringify(content);
    const finalContent = isPassword
      ? CryptoJS.AES.encrypt(stringifiedContent, password).toString()
      : stringifiedContent;
    const file = new File([finalContent], await sha256(finalContent), {
      type: 'text/plain',
    });
    const cid = await storage.put([file]);
    setCid(cid);
    setLoading(false);
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
            <b>Create</b>
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
                  placeholder="title"
                  size="md"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <Textarea
                  value={note}
                  height="200px"
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  placeholder="Notes"
                  size="sm"
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
                  isLoading={loading}
                  onClick={createNewNote}
                >
                  Submit
                </Button>
                {cid && <Text>{cid}</Text>}
              </Stack>
            </Flex>
          </Container>
        </Box>
      </Box>
    </Main>
  );
};

export default Index;
