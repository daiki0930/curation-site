"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  Image,
} from "@chakra-ui/react";
import { Header } from "@/src/components/Header";
import { Footer } from "@/src/components/Footer";
import Link from "next/link";
import { FiTrendingUp, FiStar, FiShield } from "react-icons/fi";
import { useEffect, useState, useCallback } from "react";
import { type Product } from "@/lib/types";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedProducts = useCallback(async () => {
    try {
      const response = await fetch("/api/products?featured=true");
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setFeaturedProducts(data);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
      <Header />

      {/* ヒーローセクション */}
      <Box
        bg="white"
        _dark={{ bg: 'gray.800' }}
        py={20}
        textAlign="center"
        position="relative"
        overflow="hidden"
      >
        {/* エメラルドライン装飾 */}
        <Box
          position="absolute"
          left="50%"
          bottom={0}
          transform="translateX(-50%)"
          width="120px"
          height="3px"
          bg="green.500"
          borderRadius="full"
        />
        <Container maxW="container.xl">
          <Heading size="3xl" mb={6} color="gray.900" _dark={{ color: 'gray.100' }}>
            厳選された商品を、あなたに
          </Heading>
          <Text fontSize="xl" mb={8} color="gray.500" _dark={{ color: 'gray.400' }}>
            ミスマリストが選んだ、本当に価値のある商品だけをお届けします
          </Text>
          <Link href="/products" style={{ textDecoration: "none" }}>
            <Box
              display="inline-block"
              bg="gray.900"
              _dark={{ bg: 'gray.100' }}
              color="white"
              _hover={{ bg: "gray.800", _dark: { bg: 'gray.200' } }}
              px={8}
              py={3}
              fontSize="lg"
              fontWeight="semibold"
              borderRadius="md"
              transition="all 0.2s"
            >
              <Text color="white" _dark={{ color: 'gray.900' }}>商品を見る</Text>
            </Box>
          </Link>
        </Container>
      </Box>

      {/* 特徴セクション */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          <Card.Root
            textAlign="center"
            p={6}
            bg="white"
            _dark={{ bg: 'gray.800' }}
            shadow="md"
            borderRadius="lg"
            transition="all 0.2s"
            _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
          >
            <Card.Body>
              <Box
                display="flex"
                justifyContent="center"
                fontSize="4xl"
                color="green.500"
                mb={4}
              >
                <FiStar />
              </Box>
              <Heading size="md" mb={3} color="gray.800" _dark={{ color: 'gray.100' }}>
                厳選された商品
              </Heading>
              <Text color="gray.500" _dark={{ color: 'gray.400' }}>
                専門家が選んだ高品質な商品のみを掲載しています
              </Text>
            </Card.Body>
          </Card.Root>

          <Card.Root
            textAlign="center"
            p={6}
            bg="white"
            _dark={{ bg: 'gray.800' }}
            shadow="md"
            borderRadius="lg"
            transition="all 0.2s"
            _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
          >
            <Card.Body>
              <Box
                display="flex"
                justifyContent="center"
                fontSize="4xl"
                color="green.500"
                mb={4}
              >
                <FiTrendingUp />
              </Box>
              <Heading size="md" mb={3} color="gray.800" _dark={{ color: 'gray.100' }}>
                トレンドを先取り
              </Heading>
              <Text color="gray.500" _dark={{ color: 'gray.400' }}>
                最新のトレンドを常にチェックし、いち早くお届けします
              </Text>
            </Card.Body>
          </Card.Root>

          <Card.Root
            textAlign="center"
            p={6}
            bg="white"
            _dark={{ bg: 'gray.800' }}
            shadow="md"
            borderRadius="lg"
            transition="all 0.2s"
            _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
          >
            <Card.Body>
              <Box
                display="flex"
                justifyContent="center"
                fontSize="4xl"
                color="green.500"
                mb={4}
              >
                <FiShield />
              </Box>
              <Heading size="md" mb={3} color="gray.800" _dark={{ color: 'gray.100' }}>
                安心の品質保証
              </Heading>
              <Text color="gray.500" _dark={{ color: 'gray.400' }}>全ての商品に品質保証がついています</Text>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Container>

      {/* 注目商品セクション */}
      <Container maxW="container.xl" py={16}>
        <Heading size="xl" mb={8} textAlign="center" color="gray.800" _dark={{ color: 'gray.100' }}>
          注目の商品
        </Heading>

        {loading ? (
          <Text textAlign="center" color="gray.500">読み込み中...</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={6}>
            {featuredProducts.map((product) => (
              <Card.Root
                key={product.id}
                overflow="hidden"
                bg="white"
                _dark={{ bg: 'gray.800' }}
                shadow="md"
                borderRadius="lg"
                transition="all 0.2s"
                _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
              >
                <Image
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.title}
                  height="200px"
                  objectFit="cover"
                />
                <Card.Body>
                  <Heading size="md" mb={2} color="gray.800" _dark={{ color: 'gray.100' }}>
                    {product.title}
                  </Heading>
                  <Text color="gray.500" _dark={{ color: 'gray.400' }} mb={4} lineClamp={2}>
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

        {!loading && featuredProducts.length === 0 && (
          <Text textAlign="center" color="gray.500">
            注目商品はまだありません
          </Text>
        )}

        <Box textAlign="center" mt={12}>
          <Link href="/products" style={{ textDecoration: "none" }}>
            <Box
              display="inline-block"
              border="1px solid"
              borderColor="gray.900"
              _dark={{ borderColor: 'gray.100' }}
              color="gray.900"
              _hover={{ bg: "gray.100", _dark: { bg: 'gray.800' } }}
              px={6}
              py={3}
              fontSize="lg"
              fontWeight="semibold"
              borderRadius="md"
              transition="all 0.2s"
            >
              <Text color="gray.900" _dark={{ color: 'gray.100' }}>すべての商品を見る</Text>
            </Box>
          </Link>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
