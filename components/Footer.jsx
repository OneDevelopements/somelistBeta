import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';

import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Heading,
  Button,
  Icon,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
} from "@chakra-ui/react";

import { FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const SocialButton = ({ children, label, href }) => {
  return (
      <chakra.button
          bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
          rounded={"full"}
          w={8}
          h={8}
          cursor={"pointer"}
          as={"a"}
          href={href}
          display={"inline-flex"}
          alignItems={"center"}
          justifyContent={"center"}
          transition={"background 0.3s ease"}
          _hover={{
              bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
          }}>
          <VisuallyHidden>{label}</VisuallyHidden>
          {children}
      </chakra.button>
  );
};

export default function Footer() {
    return (
      <Box bg={useColorModeValue("gray.50", "gray.900")} color={useColorModeValue("black", "gray.700")}>
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <Stack spacing={6}>
              <Box className="flex justify-evenly">
                <Image src="/logo.png" width="42" height="42" />
                <p className="text-lg self-center">Somelist</p>
              </Box>
              <Text fontSize={'sm'}>© 2022 One Development. All rights reserved.</Text>
            </Stack>
            <Stack  align={"flex-start"}>
              <Text fontWeight={"500"} fontSize={"lg"} mb={2}>Company</Text>
              <a className={`text-${useColorModeValue('black', 'white')}`}  href={"/about"}>About Us</a>
              <a href={"/blog"}>Blog</a>
              <a href={"/careers"}>Careers</a>
              <a href={"/contect"}>Contact Us</a>
            </Stack>

            <Stack align={"flex-start"}>
              <Text fontWeight={"500"} fontSize={"lg"} mb={2}>Support</Text>
              <Link href={"/support"}>Discord Server</Link>
              <Link href={"/bot-rules"}>Bot Rules</Link>
            </Stack>

            <Stack align={"flex-start"}>
              <Text fontWeight={"500"} fontSize={"lg"} mb={2}>Legal</Text>
              <Link href={"/cookies"}>Cookies Policy</Link>
              <Link href={"/privacy"}>Privacy Policy</Link>
              <Link href={"/tos"}>Terms of Service</Link>
            </Stack>
          </SimpleGrid>
        </Container>

        <Box borderTopWidth={1} borderStyle={"solid"} borderColor={useColorModeValue("gray.200", "gray.700")}>
          <Container as={Stack} maxW={"6xl"} py={4} direction={{ base: "column", md: "row" }} spacing={4} justify={{ md: "space-between" }} align={{ md: "center" }}>
            <Text>© 2022 One Development. All rights reserved.</Text>
            <Stack direction={"row"} spacing={6}>
              <SocialButton label={"Twitter"} href={"#"}><FaTwitter /></SocialButton>
              <SocialButton label={"YouTube"} href={"#"}><FaYoutube /></SocialButton>
              <SocialButton label={"Instagram"} href={"#"}><FaInstagram /></SocialButton>
            </Stack>
          </Container>
        </Box>
      </Box>
    )
}
