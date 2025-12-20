'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  SimpleGrid,
  Card,
  Image,
} from '@chakra-ui/react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { FiTrendingUp, FiStar, FiShield } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { supabase, type Product } from '@/lib/supabase'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .limit(4)

      if (error) throw error
      setFeaturedProducts(data || [])
    } catch (error) {
      console.error('Error fetching featured products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <Header />

      {/* ヒーローセクション */}
      <Box
        bg="gradient-to-r(teal.500, teal.700)"
        color="white"
        py={20}
        textAlign="center"
      >
        <Container maxW="container.xl">
          <Heading size="3xl" mb={6}>
            厳選された商品を、あなたに
          </Heading>
          <Text fontSize="xl" mb={8} opacity={0.9}>
            ミスマリストが選んだ、本当に価値のある商品だけをお届けします
          </Text>
          <Button
            as={Link}
            href="/products"
            size="lg"
            colorScheme="white"
            variant="solid"
            px={8}
          >
            商品を見る
          </Button>
        </Container>
      </Box>

      {/* 特徴セクション */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          <Card.Root textAlign="center" p={6}>
            <Card.Body>
              <Box fontSize="4xl" color="teal.500" mb={4}>
                <FiStar />
              </Box>
              <Heading size="md" mb={3}>
                厳選された商品
              </Heading>
              <Text color="gray.600">
                専門家が選んだ高品質な商品のみを掲載しています
              </Text>
            </Card.Body>
          </Card.Root>

          <Card.Root textAlign="center" p={6}>
            <Card.Body>
              <Box fontSize="4xl" color="teal.500" mb={4}>
                <FiTrendingUp />
              </Box>
              <Heading size="md" mb={3}>
                トレンドを先取り
              </Heading>
              <Text color="gray.600">
                最新のトレンドを常にチェックし、いち早くお届けします
              </Text>
            </Card.Body>
          </Card.Root>

          <Card.Root textAlign="center" p={6}>
            <Card.Body>
              <Box fontSize="4xl" color="teal.500" mb={4}>
                <FiShield />
              </Box>
              <Heading size="md" mb={3}>
                安心の品質保証
              </Heading>
              <Text color="gray.600">
                全ての商品に品質保証がついています
              </Text>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Container>

      {/* 注目商品セクション */}
      <Container maxW="container.xl" py={16}>
        <Heading size="xl" mb={8} textAlign="center">
          注目の商品
        </Heading>

        {loading ? (
          <Text textAlign="center">読み込み中...</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
            {featuredProducts.map((product) => (
              <Card.Root key={product.id} overflow="hidden">
                <Image
                  src={product.image_url || '/placeholder.png'}
                  alt={product.title}
                  height="200px"
                  objectFit="cover"
                />
                <Card.Body>
                  <Heading size="md" mb={2}>
                    {product.title}
                  </Heading>
                  <Text color="gray.600" noOfLines={2} mb={4}>
                    {product.description}
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="teal.600" mb={4}>
                    ¥{product.price.toLocaleString()}
                  </Text>
                  <Button
                    as={Link}
                    href={`/products/${product.id}`}
                    colorScheme="teal"
                    width="full"
                  >
                    詳細を見る
                  </Button>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        )}

        {!loading && featuredProducts.length === 0 && (
          <Text textAlign="center" color="gray.500">
            注目商品はまだありません
          </Text>
        )}

        <Box textAlign="center" mt={12}>
          <Button as={Link} href="/products" variant="outline" colorScheme="teal" size="lg">
            すべての商品を見る
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  )
}
