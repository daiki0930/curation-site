"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Image,
  Badge,
  SimpleGrid,
  Card,
  Separator,
} from "@chakra-ui/react";
import { Header } from "@/src/components/Header";
import { Footer } from "@/src/components/Footer";
import { useState, useEffect, useCallback } from "react";
import { type Product, type Review } from "@/lib/types";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiHeart, FiStar } from "react-icons/fi";
import { useSession } from "next-auth/react";

type ProductWithReviews = Product & {
  reviews: Review[];
};

export default function ProductDetailPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [product, setProduct] = useState<ProductWithReviews | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchProduct = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id, fetchProduct]);

  const toggleFavorite = async () => {
    if (!session || !product) return;

    try {
      const method = isFavorite ? "DELETE" : "POST";
      const response = await fetch(`/api/favorites`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const reviews = product?.reviews || [];
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  if (loading) {
    return (
      <Box minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
        <Header />
        <Container maxW="container.xl" py={8}>
          <Text color="gray.500">読み込み中...</Text>
        </Container>
        <Footer />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
        <Header />
        <Container maxW="container.xl" py={8}>
          <Text color="gray.800" _dark={{ color: 'gray.100' }}>商品が見つかりませんでした</Text>
          <Link href="/products" style={{ textDecoration: "none" }}>
            <Box
              display="inline-block"
              mt={4}
              bg="gray.100"
              _dark={{ bg: 'gray.800' }}
              color="gray.800"
              _darkColor="gray.100"
              px={4}
              py={2}
              borderRadius="md"
              transition="all 0.2s"
              _hover={{ bg: "gray.200", _dark: { bg: 'gray.700' } }}
            >
              商品一覧に戻る
            </Box>
          </Link>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
      <Header />

      <Container maxW="container.xl" py={8}>
        <Link href="/products" style={{ textDecoration: "none" }}>
          <Box
            display="inline-flex"
            alignItems="center"
            mb={6}
            color="gray.600"
            _dark={{ color: 'gray.400' }}
            transition="all 0.2s"
            _hover={{ color: "gray.800", _dark: { color: 'gray.200' } }}
          >
            <FiArrowLeft style={{ marginRight: "8px" }} />
            商品一覧に戻る
          </Box>
        </Link>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={10} mb={12}>
          {/* 商品画像 */}
          <Box>
            <Image
              src={product.imageUrl || "/placeholder.png"}
              alt={product.title}
              borderRadius="lg"
              width="100%"
              height="500px"
              objectFit="cover"
              shadow="md"
            />
          </Box>

          {/* 商品情報 */}
          <Stack gap={6}>
            {product.featured && (
              <Badge colorScheme="green" fontSize="md" width="fit-content">
                注目商品
              </Badge>
            )}
            <Heading size="2xl" color="gray.800" _dark={{ color: 'gray.100' }}>{product.title}</Heading>

            <Stack direction="row" align="center" gap={2}>
              <Stack direction="row" color="yellow.400">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    fill={
                      i < Math.floor(averageRating) ? "currentColor" : "none"
                    }
                  />
                ))}
              </Stack>
              <Text color="gray.500" _dark={{ color: 'gray.400' }}>
                {averageRating > 0
                  ? `${averageRating.toFixed(1)} (${reviews.length}件)`
                  : "レビューなし"}
              </Text>
            </Stack>

            <Text fontSize="3xl" fontWeight="bold" color="gray.900" _dark={{ color: 'gray.100' }}>
              ¥{product.price.toLocaleString()}
            </Text>

            <Text fontSize="lg" color="gray.600" _dark={{ color: 'gray.300' }} lineHeight="tall">
              {product.description}
            </Text>

            <Badge
              fontSize="md"
              width="fit-content"
              bg="gray.200"
              _dark={{ bg: 'gray.700' }}
              color="gray.700"
              _darkColor="gray.300"
            >
              カテゴリ: {product.category}
            </Badge>

            <Stack direction="row" gap={4} pt={4}>
              <Button
                bg="gray.900"
                _dark={{ bg: 'gray.100' }}
                color="white"
                _hover={{ bg: "gray.800", _dark: { bg: 'gray.200' } }}
                size="lg"
                flex={1}
                transition="all 0.2s"
              >
                <Text color="white" _dark={{ color: 'gray.900' }}>購入する</Text>
              </Button>
              <Button
                variant="outline"
                colorScheme="red"
                size="lg"
                onClick={toggleFavorite}
                disabled={!session}
                transition="all 0.2s"
              >
                <FiHeart style={{ marginRight: "8px" }} />
                {isFavorite ? "お気に入り解除" : "お気に入り"}
              </Button>
            </Stack>

            {!session && (
              <Text fontSize="sm" color="gray.500">
                お気に入り機能を使うにはログインが必要です
              </Text>
            )}
          </Stack>
        </SimpleGrid>

        <Separator my={12} borderColor="gray.200" _dark={{ borderColor: 'gray.700' }} />

        {/* レビューセクション */}
        <Box>
          <Heading size="xl" mb={6} color="gray.800" _dark={{ color: 'gray.100' }}>
            カスタマーレビュー
          </Heading>

          {reviews.length === 0 ? (
            <Card.Root p={8} textAlign="center" bg="white" _dark={{ bg: 'gray.800' }} shadow="md" borderRadius="lg">
              <Text color="gray.500">まだレビューがありません</Text>
              <Button
                bg="gray.900"
                _dark={{ bg: 'gray.100' }}
                color="white"
                mt={4}
                disabled={!session}
                transition="all 0.2s"
                _hover={{ bg: "gray.800", _dark: { bg: 'gray.200' } }}
              >
                <Text color="white" _dark={{ color: 'gray.900' }}>最初のレビューを書く</Text>
              </Button>
            </Card.Root>
          ) : (
            <Stack gap={4}>
              {reviews.map((review) => (
                <Card.Root key={review.id} p={6} bg="white" _dark={{ bg: 'gray.800' }} shadow="md" borderRadius="lg">
                  <Stack gap={2}>
                    <Stack direction="row" align="center" gap={2}>
                      <Stack direction="row" color="yellow.400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            fill={i < review.rating ? "currentColor" : "none"}
                            size={16}
                          />
                        ))}
                      </Stack>
                      <Text fontSize="sm" color="gray.500">
                        {new Date(review.createdAt).toLocaleDateString("ja-JP")}
                      </Text>
                    </Stack>
                    <Text color="gray.700" _dark={{ color: 'gray.300' }}>{review.comment}</Text>
                  </Stack>
                </Card.Root>
              ))}
            </Stack>
          )}
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}
