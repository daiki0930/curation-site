'use client'

import { Box, Container, Flex, Heading, Button, Menu, Stack, Text } from '@chakra-ui/react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { FiHeart, FiUser, FiShoppingBag } from 'react-icons/fi'

export function Header() {
  const { data: session } = useSession()

  return (
    <Box bg="teal.600" color="white" py={4} boxShadow="md">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Link href="/">
            <Heading size="lg" cursor="pointer" _hover={{ opacity: 0.8 }}>
              ミスマリスト
            </Heading>
          </Link>

          <Stack direction="row" gap={4} align="center">
            <Link href="/products">
              <Button variant="ghost" colorScheme="whiteAlpha" leftIcon={<FiShoppingBag />}>
                商品一覧
              </Button>
            </Link>

            {session ? (
              <>
                <Link href="/favorites">
                  <Button variant="ghost" colorScheme="whiteAlpha" leftIcon={<FiHeart />}>
                    お気に入り
                  </Button>
                </Link>

                <Menu.Root>
                  <Menu.Trigger asChild>
                    <Button variant="ghost" colorScheme="whiteAlpha" leftIcon={<FiUser />}>
                      {session.user?.name || session.user?.email}
                    </Button>
                  </Menu.Trigger>
                  <Menu.Content>
                    <Menu.Item value="profile">
                      <Link href="/profile">プロフィール</Link>
                    </Menu.Item>
                    <Menu.Item value="signout" onClick={() => signOut()}>
                      ログアウト
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Root>
              </>
            ) : (
              <Button colorScheme="whiteAlpha" onClick={() => signIn()}>
                ログイン
              </Button>
            )}
          </Stack>
        </Flex>
      </Container>
    </Box>
  )
}
