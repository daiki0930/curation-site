-- ユーザーテーブル（Supabase Authと連携）
-- auth.usersテーブルがデフォルトで用意されているので、追加情報のみ

-- 商品テーブル
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  category VARCHAR(50) NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- お気に入りテーブル
CREATE TABLE IF NOT EXISTS favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- レビューテーブル
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_product ON favorites(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);

-- Row Level Security (RLS) の有効化
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 商品は誰でも閲覧可能
CREATE POLICY IF NOT EXISTS "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- お気に入りは本人のみ閲覧・操作可能
CREATE POLICY IF NOT EXISTS "Users can view their own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert their own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own favorites" ON favorites
  FOR DELETE USING (auth.uid() = user_id);

-- レビューは誰でも閲覧可能
CREATE POLICY IF NOT EXISTS "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

-- レビューは本人のみ作成・更新・削除可能
CREATE POLICY IF NOT EXISTS "Users can insert their own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update their own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete their own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);

-- サンプルデータの挿入
INSERT INTO products (title, description, price, category, featured, image_url) VALUES
  ('プレミアムワイヤレスヘッドホン', '高品質な音響体験を提供する最新のワイヤレスヘッドホン。ノイズキャンセリング機能付き。', 29800, 'electronics', true, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'),
  ('オーガニックコットンTシャツ', '環境に優しい素材を使用した快適で肌触りの良いTシャツ', 4980, 'fashion', false, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab'),
  ('アロマディフューザー', 'リラックス空間を作り出す高性能なアロマディフューザー', 8900, 'home', true, 'https://images.unsplash.com/photo-1603006905003-be475563bc59'),
  ('ナチュラルスキンケアセット', '天然成分100%のスキンケア製品セット。敏感肌にも優しい。', 12800, 'beauty', true, 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571'),
  ('スマートウォッチ', '健康管理に最適な多機能スマートウォッチ。心拍数や睡眠の質を測定。', 24900, 'electronics', false, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30'),
  ('レザーバックパック', '上質なレザーを使用したスタイリッシュで実用的なバックパック', 18900, 'fashion', false, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62'),
  ('北欧デザインのテーブルランプ', 'ミニマルで洗練された北欧デザインのテーブルランプ', 15600, 'home', true, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c'),
  ('オーガニックフェイスマスク', '植物由来成分で作られた保湿効果の高いフェイスマスク', 3980, 'beauty', false, 'https://images.unsplash.com/photo-1556228852-80a42e515517')
ON CONFLICT DO NOTHING;
