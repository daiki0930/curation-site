import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 既存データを削除（外部キー制約の順序で削除）
  await prisma.favorite.deleteMany()
  await prisma.review.deleteMany()
  await prisma.product.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  console.log('Cleared existing data')

  // テストユーザーを作成
  const hashedPassword = await bcrypt.hash('password123', 10)

  const user1 = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'テストユーザー',
      password: hashedPassword,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'demo@example.com',
      name: 'デモユーザー',
      password: hashedPassword,
    },
  })

  console.log('Created users:', { user1: user1.id, user2: user2.id })

  // 商品データを作成
  const productsData = [
    {
      title: 'ミニマリスト財布',
      description: '必要最小限のカードと現金を収納できる、薄型で軽量な本革財布。毎日の持ち歩きに最適なサイズ感で、ポケットに入れてもかさばりません。',
      price: 8900,
      imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
      category: 'fashion',
      featured: true,
    },
    {
      title: 'ワイヤレスイヤホン Pro',
      description: '高品質なサウンドとアクティブノイズキャンセリング機能を搭載。最大24時間の長時間再生が可能で、通勤や運動時に最適です。',
      price: 15800,
      imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
      category: 'electronics',
      featured: true,
    },
    {
      title: 'オーガニックコットンTシャツ',
      description: '肌に優しいオーガニックコットン100%使用。シンプルなデザインで、どんなスタイルにも合わせやすい一枚です。',
      price: 4500,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      category: 'fashion',
      featured: true,
    },
    {
      title: 'スマートウォッチ Lite',
      description: '健康管理と通知機能に特化したシンプルなスマートウォッチ。1週間持続するバッテリーと防水機能を備えています。',
      price: 24800,
      imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
      category: 'electronics',
      featured: true,
    },
    {
      title: 'アロマディフューザー',
      description: '超音波式で静かな動作。7色のLEDライト付きで、お部屋の雰囲気を演出します。タイマー機能搭載。',
      price: 3980,
      imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500',
      category: 'home',
      featured: false,
    },
    {
      title: 'ステンレスボトル 500ml',
      description: '真空断熱構造で保温・保冷効果が長時間持続。シンプルなデザインでオフィスでも使いやすい。',
      price: 2980,
      imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
      category: 'home',
      featured: false,
    },
    {
      title: 'ナチュラルスキンケアセット',
      description: '植物由来成分100%のスキンケアセット。化粧水、美容液、クリームの3点セットで、敏感肌の方にもおすすめです。',
      price: 7800,
      imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
      category: 'beauty',
      featured: false,
    },
    {
      title: 'ポータブルバッテリー 10000mAh',
      description: 'スマホを約3回フル充電できる大容量。薄型軽量でカバンに入れても邪魔になりません。2台同時充電対応。',
      price: 3480,
      imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
      category: 'electronics',
      featured: false,
    },
    {
      title: 'リネンブランケット',
      description: '夏は涼しく、冬は暖かいリネン素材のブランケット。洗うほどに柔らかくなり、長く愛用できます。',
      price: 12800,
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
      category: 'home',
      featured: false,
    },
    {
      title: 'オーガニックリップバーム',
      description: '天然成分のみで作られたリップバーム。シアバターとミツロウ配合で、唇をしっとり保湿します。',
      price: 980,
      imageUrl: 'https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=500',
      category: 'beauty',
      featured: false,
    },
    {
      title: 'レザーベルト',
      description: '上質な本革を使用したシンプルなベルト。ビジネスからカジュアルまで幅広く使える万能アイテム。',
      price: 6500,
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      category: 'fashion',
      featured: false,
    },
    {
      title: 'デスクオーガナイザー',
      description: '竹製のナチュラルなデスクオーガナイザー。ペン、スマホ、小物をすっきり収納できます。',
      price: 2480,
      imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500',
      category: 'home',
      featured: false,
    },
  ]

  // 商品を一括作成
  const products = await prisma.product.createManyAndReturn({
    data: productsData,
  })

  console.log(`Created ${products.length} products`)

  // サンプルレビューを作成
  const reviews = [
    {
      userId: user1.id,
      productId: products[0].id,
      rating: 5,
      comment: '非常に使いやすく、デザインもシンプルで気に入っています。毎日愛用しています！',
    },
    {
      userId: user2.id,
      productId: products[0].id,
      rating: 4,
      comment: '薄くてポケットに入れやすいです。もう少しカード収納があれば完璧でした。',
    },
    {
      userId: user1.id,
      productId: products[1].id,
      rating: 5,
      comment: '音質が素晴らしく、ノイズキャンセリングも効果抜群です。在宅勤務に最適！',
    },
    {
      userId: user2.id,
      productId: products[2].id,
      rating: 5,
      comment: '肌触りが最高です。洗濯しても型崩れしないので重宝しています。',
    },
    {
      userId: user1.id,
      productId: products[3].id,
      rating: 4,
      comment: 'バッテリー持ちが良く、健康管理に役立っています。',
    },
  ]

  await prisma.review.createMany({
    data: reviews,
  })

  console.log(`Created ${reviews.length} reviews`)

  // お気に入りを作成
  await prisma.favorite.createMany({
    data: [
      { userId: user1.id, productId: products[0].id },
      { userId: user1.id, productId: products[1].id },
    ],
  })

  console.log('Created sample favorites')

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
