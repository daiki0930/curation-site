'use client'

import { Box, Container, Flex, Heading, Button, Menu, Stack } from '@chakra-ui/react'
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { FiHeart, FiUser, FiShoppingBag } from 'react-icons/fi'

export function Header() {
  const { data: session } = useSession()

  return (
    <Box bg="teal.600" color="white" py={4} boxShadow="md">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Heading size="lg" cursor="pointer" _hover={{ opacity: 0.8 }}>
              ミスマリスト
            </Heading>
          </Link>

          <Stack direction="row" gap={4} align="center">
            <Link href="/products" style={{ textDecoration: 'none' }}>
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                px={3}
                py={2}
                borderRadius="md"
                _hover={{ bg: 'whiteAlpha.300' }}
              >
                <FiShoppingBag />
                商品一覧
              </Box>
            </Link>

            {session ? (
              <>
                <Link href="/favorites" style={{ textDecoration: 'none' }}>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    px={3}
                    py={2}
                    borderRadius="md"
                    _hover={{ bg: 'whiteAlpha.300' }}
                  >
                    <FiHeart />
                    お気に入り
                  </Box>
                </Link>

                <Menu.Root>
                  <Menu.Trigger asChild>
                    <Button variant="ghost" color="white" _hover={{ bg: 'whiteAlpha.300' }}>
                      <Flex align="center" gap={2}>
                        <FiUser />
                        {session.user?.name || session.user?.email}
                      </Flex>
                    </Button>
                  </Menu.Trigger>
                  <Menu.Content>
                    <Menu.Item value="profile" asChild>
                      <Link href="/profile">プロフィール</Link>
                    </Menu.Item>
                    <Menu.Item value="signout" onClick={() => signOut()}>
                      ログアウト
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Root>
              </>
            ) : (
              <Button bg="white" color="teal.600" _hover={{ bg: 'whiteAlpha.900' }} onClick={() => signIn()}>
                ログイン
              </Button>
            )}
          </Stack>
        </Flex>
      </Container>
    </Box>
  )
}
