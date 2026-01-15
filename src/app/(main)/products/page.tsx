"use client";

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Card,
  Image,
  Text,
  Input,
  NativeSelect,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { Header } from "@/src/components/Header";
import { Footer } from "@/src/components/Footer";
import { useState, useEffect, useCallback } from "react";
import { type Product } from "@/lib/types";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const fetchProducts = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (category !== "all") {
        params.set("category", category);
      }
      params.set("sortBy", sortBy);

      const response = await fetch(`/api/products?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [category, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
      <Header />

      <Box bg="gray.900" _dark={{ bg: 'gray.800' }} color="white" py={12}>
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
        <Stack gap={4} mb={8} direction={{ base: "column", md: "row" }}>
          <Box flex={1} position="relative">
            <Input
              placeholder="商品を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="lg"
              pl={10}
              bg="white"
              _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
            />
            <Box
              position="absolute"
              left={3}
              top="50%"
              transform="translateY(-50%)"
              color="gray.500"
            >
              <FiSearch />
            </Box>
          </Box>
          <NativeSelect.Root size="lg" width={{ base: "100%", md: "200px" }}>
            <NativeSelect.Field
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              bg="white"
              _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
            >
              <option value="all">すべてのカテゴリ</option>
              <option value="electronics">電化製品</option>
              <option value="fashion">ファッション</option>
              <option value="home">ホーム</option>
              <option value="beauty">ビューティー</option>
            </NativeSelect.Field>
          </NativeSelect.Root>
          <NativeSelect.Root size="lg" width={{ base: "100%", md: "200px" }}>
            <NativeSelect.Field
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              bg="white"
              _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
            >
              <option value="newest">新着順</option>
              <option value="price_low">価格が安い順</option>
              <option value="price_high">価格が高い順</option>
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Stack>

        {/* 商品グリッド */}
        {loading ? (
          <Text textAlign="center" py={10} color="gray.500">
            読み込み中...
          </Text>
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
                bg="white"
                _dark={{ bg: 'gray.800' }}
                shadow="md"
                borderRadius="lg"
                _hover={{ transform: "translateY(-4px)", shadow: "lg" }}
                transition="all 0.2s"
              >
                <Box position="relative">
                  <Image
                    src={product.imageUrl || "/placeholder.png"}
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
                      colorScheme="green"
                      fontSize="sm"
                    >
                      注目
                    </Badge>
                  )}
                </Box>
                <Card.Body>
                  <Badge
                    mb={2}
                    bg="gray.200"
                    _dark={{ bg: 'gray.700' }}
                    color="gray.700"
                    _darkColor="gray.300"
                  >
                    {product.category}
                  </Badge>
                  <Heading size="md" mb={2} lineClamp={1} color="gray.800" _dark={{ color: 'gray.100' }}>
                    {product.title}
                  </Heading>
                  <Text color="gray.500" _dark={{ color: 'gray.400' }} lineClamp={2} mb={4} fontSize="sm">
                    {product.description}
                  </Text>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="gray.900"
                    _dark={{ color: 'gray.100' }}
                    mb={4}
                  >
                    ¥{product.price.toLocaleString()}
                  </Text>
                  <Link
                    href={`/products/${product.id}`}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <Box
                      bg="gray.900"
                      _dark={{ bg: 'gray.100' }}
                      color="white"
                      py={2}
                      textAlign="center"
                      fontWeight="semibold"
                      borderRadius="md"
                      transition="all 0.2s"
                      _hover={{ bg: "gray.800", _dark: { bg: 'gray.200' } }}
                    >
                      <Text color="white" _dark={{ color: 'gray.900' }}>詳細を見る</Text>
                    </Box>
                  </Link>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>
        )}
      </Container>

      <Footer />
    </Box>
  );
}
