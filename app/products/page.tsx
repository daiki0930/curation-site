'use client'

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Card,
  Image,
  Text,
  Button,
  Input,
  Select,
  Stack,
  Badge,
} from '@chakra-ui/react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useState, useEffect } from 'react'
import { supabase, type Product } from '@/lib/supabase'
import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    fetchProducts()
  }, [category, sortBy])

  const fetchProducts = async () => {
    try {
      let query = supabase.from('products').select('*')

      if (category !== 'all') {
        query = query.eq('category', category)
      }

      // ソート
      if (sortBy === 'newest') {
        query = query.order('created_at', { ascending: false })
      } else if (sortBy === 'price_low') {
        query = query.order('price', { ascending: true })
      } else if (sortBy === 'price_high') {
        query = query.order('price', { ascending: false })
      }

      const { data, error } = await query

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box minH="100vh" bg="gray.50">
      <Header />

      <Box bg="teal.600" color="white" py={12}>
        <Container maxW="container.xl">
          <Heading size="2xl" mb={2}>
            商品一覧
          </Heading>
          <Text fontSize="lg" opacity={0.9}>
            厳選された{products.length}点の商品をご覧ください
          </Text>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        {/* 検索・フィルター */}
        <Stack gap={4} mb={8} direction={{ base: 'column', md: 'row' }}>
          <Box flex={1} position="relative">
            <Input
              placeholder="商品を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="lg"
              pl={10}
            />
            <Box position="absolute" left={3} top="50%" transform="translateY(-50%)">
              <FiSearch />
            </Box>
          </Box>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size="lg"
            width={{ base: '100%', md: '200px' }}
          >
            <option value="all">すべてのカテゴリ</option>
            <option value="electronics">電化製品</option>
            <option value="fashion">ファッション</option>
            <option value="home">ホーム</option>
            <option value="beauty">ビューティー</option>
          </Select>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            size="lg"
            width={{ base: '100%', md: '200px' }}
          >
            <option value="newest">新着順</option>
            <option value="price_low">価格が安い順</option>
            <option value="price_high">価格が高い順</option>
          </Select>
        </Stack>

        {/* 商品グリッド */}
        {loading ? (
          <Text textAlign="center" py={10}>読み込み中...</Text>
        ) : filteredProducts.length === 0 ? (
          <Box textAlign="center" py={20}>
            <Text fontSize="xl" color="gray.500">
              商品が見つかりませんでした
            </Text>
            <Text color="gray.400" mt={2}>
              別のキーワードやフィルターをお試しください
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap={6}>
            {filteredProducts.map((product) => (
              <Card.Root
                key={product.id}
                overflow="hidden"
                _hover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
                transition="all 0.2s"
              >
                <Box position="relative">
                  <Image
                    src={product.image_url || '/placeholder.png'}
                    alt={product.title}
                    height="200px"
                    width="100%"
                    objectFit="cover"
                  />
                  {product.featured && (
                    <Badge
                      position="absolute"
                      top={2}
                      right={2}
                      colorScheme="red"
                      fontSize="sm"
                    >
                      注目
                    </Badge>
                  )}
                </Box>
                <Card.Body>
                  <Badge colorScheme="teal" mb={2}>
                    {product.category}
                  </Badge>
                  <Heading size="md" mb={2} noOfLines={1}>
                    {product.title}
                  </Heading>
                  <Text color="gray.600" noOfLines={2} mb={4} fontSize="sm">
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
      </Container>

      <Footer />
    </Box>
  )
}
