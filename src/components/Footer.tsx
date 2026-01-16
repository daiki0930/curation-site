"use client";

import {
  Box,
  Container,
  Flex,
  Text,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiGithub, FiTwitter, FiInstagram } from "react-icons/fi";

export function Footer() {
  return (
    <Box bg="gray.100" color="gray.700" py={10} mt={20}>
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          gap={8}
        >
          <Stack gap={4}>
            <Text fontSize="lg" fontWeight="bold">
              ミニマリスト
            </Text>
            <Text fontSize="sm" color="gray.600">
              厳選された本当に価値のある商品を
              <br />
              皆様にお届けします
            </Text>
          </Stack>

          <Stack gap={4}>
            <Text fontWeight="bold">リンク</Text>
            <Link href="/products" style={{ fontSize: "14px" }}>
              商品一覧
            </Link>
            <Link href="/about" style={{ fontSize: "14px" }}>
              私たちについて
            </Link>
            <Link href="/contact" style={{ fontSize: "14px" }}>
              お問い合わせ
            </Link>
          </Stack>

          <Stack gap={4}>
            <Text fontWeight="bold">フォローする</Text>
            <Stack direction="row" gap={4}>
              <ChakraLink href="#" fontSize="2xl">
                <FiTwitter />
              </ChakraLink>
              <ChakraLink href="#" fontSize="2xl">
                <FiInstagram />
              </ChakraLink>
              <ChakraLink href="#" fontSize="2xl">
                <FiGithub />
              </ChakraLink>
            </Stack>
          </Stack>
        </Flex>

        <Box
          mt={8}
          pt={8}
          borderTop="1px"
          borderColor="gray.300"
          textAlign="center"
        >
          <Text fontSize="sm" color="gray.600">
            © 2024 ミニマリスト. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
