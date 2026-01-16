# minimalist - curation-site

厳選された商品を紹介するキュレーションサイトです。

## 技術スタック

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: Chakra UI v3
- **Authentication**: NextAuth.js v4
- **Database**: PostgreSQL
- **ORM**: ORM

## セットアップ

### 前提条件

- Visual Studio Code (VSCode) がインストールされていること。
- DockerおよびDocker Composeがインストールされていること。
- node.js v22.0.0 以上がインストールされていること。

### Visual Studio Codeの拡張機能設定

以下の手順で `.vscode/extensions.json` に記載された拡張機能をインストールする。

1. VSCodeを起動する。
2. `Cmd + Shift + P` を押下し、コマンドパレットを表示する。
3. 検索バーに "recommended" と入力する。
4. "Show Recommended Extensions" をクリックする。
5. "WORKSPACE RECOMMENDATIONS" に記載されている拡張機能をインストールする。

### 依存関係のインストール

```bash
npm install
```

### データベース、ストレージの起動

```bash
docker compose up -d
```

### データベースのセットアップ

```bash
# データベースマイグレーション
npx prisma migrate dev

# 初期データの投入
npx prisma db seed
```

テーブル定義に変更があった場合、DB作り直し&初期データを再投入

```bash
npx prisma migrate reset --force
```

### 開発サーバーの起動

```bash
npm run dev
```
http://localhost:3000 にアクセスしてください。

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