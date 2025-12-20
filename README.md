# ミスマリスト - キュレーションサイト

厳選された商品を紹介するキュレーションサイトです。

## 技術スタック

- **フロントエンド**: Next.js 16 (App Router) + TypeScript
- **UI**: Chakra UI v3
- **認証**: NextAuth.js v4
- **データベース**: Supabase (PostgreSQL)
- **アイコン**: React Icons

## 主な機能

✅ **実装済み**
- トップページ（ヒーローセクション、特徴セクション、注目商品表示）
- 商品一覧ページ（検索、カテゴリフィルタ、ソート機能）
- 商品詳細ページ（レビュー表示、お気に入り機能）
- レスポンシブデザイン
- ナビゲーションヘッダー・フッター

🚧 **今後の実装予定**
- ユーザー認証（ログイン/サインアップ）
- お気に入り機能の完全実装
- レビュー投稿機能
- 管理者ダッシュボード
- 商品の追加・編集機能

## セットアップ手順

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd curation-site
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com/)にアクセス
2. 新しいプロジェクトを作成
3. プロジェクトのURL and Anon Keyを取得（Settings > API）

### 4. データベースの設定

1. Supabaseダッシュボードで「SQL Editor」を開く
2. `supabase/schema.sql`の内容をコピー＆ペースト
3. 実行してテーブルとサンプルデータを作成

### 5. 環境変数の設定

`.env.local.example`を`.env.local`にコピーして、以下の値を設定:

```bash
cp .env.local.example .env.local
```

`.env.local`を編集:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**NEXTAUTH_SECRETの生成方法:**
```bash
openssl rand -base64 32
```

### 6. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開く

## プロジェクト構造

```
curation-site/
├── app/
│   ├── api/auth/[...nextauth]/    # NextAuth認証API
│   ├── products/                  # 商品ページ
│   │   ├── [id]/                 # 商品詳細
│   │   └── page.tsx              # 商品一覧
│   ├── layout.tsx                 # ルートレイアウト
│   ├── page.tsx                   # トップページ
│   └── providers.tsx              # プロバイダー設定
├── components/
│   ├── Header.tsx                 # ヘッダーコンポーネント
│   └── Footer.tsx                 # フッターコンポーネント
├── lib/
│   └── supabase.ts               # Supabaseクライアント設定
├── supabase/
│   └── schema.sql                # データベーススキーマ
├── public/                        # 静的ファイル
└── package.json
```

## データベーススキーマ

### products（商品）
- `id`: UUID (主キー)
- `title`: 商品名
- `description`: 商品説明
- `price`: 価格
- `image_url`: 画像URL
- `category`: カテゴリ（electronics, fashion, home, beauty）
- `featured`: 注目商品フラグ
- `created_at`, `updated_at`: タイムスタンプ

### favorites（お気に入り）
- `id`: UUID (主キー)
- `user_id`: ユーザーID
- `product_id`: 商品ID
- `created_at`: タイムスタンプ

### reviews（レビュー）
- `id`: UUID (主キー)
- `user_id`: ユーザーID
- `product_id`: 商品ID
- `rating`: 評価（1-5）
- `comment`: コメント
- `created_at`, `updated_at`: タイムスタンプ

## カスタマイズ

### カテゴリの追加

`app/products/page.tsx`のSelectコンポーネントにオプションを追加:

```tsx
<option value="new-category">新しいカテゴリ</option>
```

### カラーテーマの変更

メインカラーを変更する場合、`teal`を他のChakra UIカラーに置き換えます:
- `blue`, `purple`, `green`, `red`, `orange` など

## トラブルシューティング

### Chakra UIのエラーが出る場合

Chakra UI v3は最新バージョンです。型エラーが出る場合:

```bash
npm install @chakra-ui/react@latest
```

### Supabaseに接続できない場合

1. `.env.local`の環境変数が正しいか確認
2. Supabaseプロジェクトが有効か確認
3. Row Level Security (RLS)が正しく設定されているか確認

## デプロイ

### Vercelへのデプロイ

1. GitHubにプッシュ
2. [Vercel](https://vercel.com/)にログイン
3. 「Import Project」から選択
4. 環境変数を設定
5. デプロイ

環境変数の設定を忘れずに！

## ライセンス

MIT

## お問い合わせ

質問や提案がある場合は、Issueを作成してください。
