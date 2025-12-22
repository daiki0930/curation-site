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
      <Box minH="100vh" bg="gray.50">
        <Header />
        <Container maxW="container.xl" py={8}>
          <Text>読み込み中...</Text>
        </Container>
        <Footer />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box minH="100vh" bg="gray.50">
        <Header />
        <Container maxW="container.xl" py={8}>
          <Text>商品が見つかりませんでした</Text>
          <Link href="/products" style={{ textDecoration: "none" }}>
            <Box
              display="inline-block"
              mt={4}
              bg="gray.100"
              color="gray.800"
              px={4}
              py={2}
              borderRadius="md"
              _hover={{ bg: "gray.200" }}
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
    <Box minH="100vh" bg="gray.50">
      <Header />

      <Container maxW="container.xl" py={8}>
        <Link href="/products" style={{ textDecoration: "none" }}>
          <Box
            display="inline-flex"
            alignItems="center"
            mb={6}
            color="gray.600"
            _hover={{ color: "gray.800" }}
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
            />
          </Box>

          {/* 商品情報 */}
          <Stack gap={6}>
            {product.featured && (
              <Badge colorScheme="red" fontSize="md" width="fit-content">
                注目商品
              </Badge>
            )}
            <Heading size="2xl">{product.title}</Heading>

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
              <Text color="gray.600">
                {averageRating > 0
                  ? `${averageRating.toFixed(1)} (${reviews.length}件)`
                  : "レビューなし"}
              </Text>
            </Stack>

            <Text fontSize="3xl" fontWeight="bold" color="teal.600">
              ¥{product.price.toLocaleString()}
            </Text>

            <Text fontSize="lg" color="gray.700" lineHeight="tall">
              {product.description}
            </Text>

            <Badge colorScheme="blue" fontSize="md" width="fit-content">
              カテゴリ: {product.category}
            </Badge>

            <Stack direction="row" gap={4} pt={4}>
              <Button colorScheme="teal" size="lg" flex={1}>
                購入する
              </Button>
              <Button
                variant="outline"
                colorScheme="red"
                size="lg"
                onClick={toggleFavorite}
                disabled={!session}
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

        <Separator my={12} />

        {/* レビューセクション */}
        <Box>
          <Heading size="xl" mb={6}>
            カスタマーレビュー
          </Heading>

          {reviews.length === 0 ? (
            <Card.Root p={8} textAlign="center">
              <Text color="gray.500">まだレビューがありません</Text>
              <Button colorScheme="teal" mt={4} disabled={!session}>
                最初のレビューを書く
              </Button>
            </Card.Root>
          ) : (
            <Stack gap={4}>
              {reviews.map((review) => (
                <Card.Root key={review.id} p={6}>
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
                    <Text color="gray.700">{review.comment}</Text>
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
