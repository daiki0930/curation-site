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
    <Box minH="100vh" bg="gray.50">
      <Header />

      {/* ヒーローセクション */}
      <Box
        bgGradient="linear(to-r, teal.500, teal.700)"
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
          <Link href="/products" style={{ textDecoration: "none" }}>
            <Box
              display="inline-block"
              bg="white"
              color="teal.600"
              px={8}
              py={3}
              fontSize="lg"
              fontWeight="semibold"
              borderRadius="md"
              _hover={{ bg: "gray.100" }}
            >
              商品を見る
            </Box>
          </Link>
        </Container>
      </Box>

      {/* 特徴セクション */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          <Card.Root textAlign="center" p={6}>
            <Card.Body>
              <Box
                display="flex"
                justifyContent="center"
                fontSize="4xl"
                color="teal.500"
                mb={4}
              >
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
              <Box
                display="flex"
                justifyContent="center"
                fontSize="4xl"
                color="teal.500"
                mb={4}
              >
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
              <Box
                display="flex"
                justifyContent="center"
                fontSize="4xl"
                color="teal.500"
                mb={4}
              >
                <FiShield />
              </Box>
              <Heading size="md" mb={3}>
                安心の品質保証
              </Heading>
              <Text color="gray.600">全ての商品に品質保証がついています</Text>
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
                  src={product.imageUrl || "/placeholder.png"}
                  alt={product.title}
                  height="200px"
                  objectFit="cover"
                />
                <Card.Body>
                  <Heading size="md" mb={2}>
                    {product.title}
                  </Heading>
                  <Text color="gray.600" mb={4} lineClamp={2}>
                    {product.description}
                  </Text>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="teal.600"
                    mb={4}
                  >
                    ¥{product.price.toLocaleString()}
                  </Text>
                  <Link
                    href={`/products/${product.id}`}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <Box
                      bg="teal.500"
                      color="white"
                      py={2}
                      textAlign="center"
                      fontWeight="semibold"
                      borderRadius="md"
                      _hover={{ bg: "teal.600" }}
                    >
                      詳細を見る
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
              borderColor="teal.500"
              color="teal.500"
              px={6}
              py={3}
              fontSize="lg"
              fontWeight="semibold"
              borderRadius="md"
              _hover={{ bg: "teal.50" }}
            >
              すべての商品を見る
            </Box>
          </Link>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
