# ミスマリスト - キュレーションサイト

厳選された商品を紹介するキュレーションサイトです。

## 技術スタック

- **フロントエンド**: Next.js 16 (App Router) + TypeScript
- **UI**: Chakra UI v3
- **認証**: NextAuth.js v4
- **データベース**: Prisma + PostgreSQL
- **アイコン**: React Icons

## 主な機能

- トップページ（ヒーローセクション、特徴セクション、注目商品表示）
- 商品一覧ページ（検索、カテゴリフィルタ、ソート機能）
- 商品詳細ページ（レビュー表示、お気に入り機能）
- レスポンシブデザイン
- ダークモード対応
- ナビゲーションヘッダー・フッター

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

### 3. 環境変数の設定

`.env`ファイルを作成し、以下の値を設定:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/curation_site"

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

### 4. データベースの設定

```bash
# Prismaクライアントの生成
npm run db:generate

# データベースにスキーマを適用
npm run db:push

# サンプルデータの投入（オプション）
npm run db:seed
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開く

## プロジェクト構造

```
curation-site/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/  # NextAuth認証API
│   │   │   └── products/            # 商品API
│   │   ├── (main)/
│   │   │   ├── products/            # 商品一覧ページ
│   │   │   │   └── [id]/            # 商品詳細ページ
│   │   │   └── reviews/             # レビューページ
│   │   ├── layout.tsx               # ルートレイアウト
│   │   ├── page.tsx                 # トップページ
│   │   ├── providers.tsx            # プロバイダー設定
│   │   └── globals.css              # グローバルスタイル
│   └── components/
│       ├── Header.tsx               # ヘッダーコンポーネント
│       └── Footer.tsx               # フッターコンポーネント
├── lib/
│   ├── prisma.ts                    # Prismaクライアント設定
│   └── types.ts                     # 型定義
├── prisma/
│   ├── schema.prisma                # データベーススキーマ
│   └── seed.ts                      # シードデータ
└── package.json
```

## データベーススキーマ

### User（ユーザー）
- `id`: Int (主キー)
- `email`: メールアドレス（一意）
- `password`: パスワード
- `name`: ユーザー名
- `image`: プロフィール画像
- `createdAt`, `updatedAt`: タイムスタンプ

### Product（商品）
- `id`: Int (主キー)
- `title`: 商品名
- `description`: 商品説明
- `price`: 価格
- `imageUrl`: 画像URL
- `category`: カテゴリ
- `featured`: 注目商品フラグ
- `createdAt`, `updatedAt`: タイムスタンプ

### Favorite（お気に入り）
- `id`: String (主キー)
- `userId`: ユーザーID
- `productId`: 商品ID
- `createdAt`: タイムスタンプ

### Review（レビュー）
- `id`: String (主キー)
- `userId`: ユーザーID
- `productId`: 商品ID
- `rating`: 評価（1-5）
- `comment`: コメント
- `createdAt`, `updatedAt`: タイムスタンプ

## NPM スクリプト

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーの起動 |
| `npm run build` | プロダクションビルド |
| `npm run start` | プロダクションサーバーの起動 |
| `npm run lint` | ESLintの実行 |
| `npm run db:generate` | Prismaクライアントの生成 |
| `npm run db:push` | スキーマをDBに適用 |
| `npm run db:migrate` | マイグレーションの実行 |
| `npm run db:studio` | Prisma Studioの起動 |
| `npm run db:seed` | シードデータの投入 |

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
