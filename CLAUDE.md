# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

**キュレーションサイト(curation-site)** は、Next.js 16 App Routerを使用した商品キュレーションサイトです。

## 技術スタック
- **フレームワーク**: Next.js 16 (App Router)、React 19
- **UI**: Chakra UI v3 + Tailwind CSS v4 + Framer Motion
- **データベース**: PostgreSQL 16 (Prisma ORM経由)
- **認証**: NextAuth.js v4 (Google OAuth + 認証情報)
- **アイコン**: react-icons (Featherアイコン)

## 主要ディレクトリ
- `src/app/api/` - APIルート (NextAuth、商品エンドポイント)
- `src/app/(main)/` - ルートグループを使用したページ
- `src/components/` - 共有Reactコンポーネント
- `lib/` - Prismaクライアントシングルトン、型定義
- `prisma/` - スキーマとシードデータ

### データベースモデル
- **User** - bcryptハッシュ化パスワードで認証
- **Product** - カテゴリ、価格、注目フラグ付きの商品
- **Review** - ユーザー評価 (1-5)、カスケード削除
- **Favorite** - ユーザー・商品ペアでユニーク制約のお気に入り
- **Account/Session** - NextAuth.js OAuth データ

### APIパターン
商品APIはクエリパラメータをサポート:
- `featured=true` - トップページの注目商品
- `category=<名前>` - カテゴリでフィルタ
- `sortBy=price_low|price_high` - 価格ソート

### UIパターン
- インタラクティブなコンポーネントには`"use client"`ディレクティブを使用
- ダークモード対応のChakra UIセマンティックカラートークン
- クライアント側の認証状態には`useSession()`フックを使用

### テストユーザー (シードデータ)
- test@example.com / password123
- demo@example.com / password123


## 開発コマンド

```bash
# 開発サーバー
npm run dev                    # localhost:3000で起動

# データベース操作
npm run db:migrate             # Prismaマイグレーション実行
npm run db:seed                # テストデータ投入
npm run db:studio              # Prisma Studio GUI起動
npm run db:generate            # Prismaクライアント型生成
npx prisma migrate reset --force  # DB初期化＆再シード

# ビルド・品質チェック
npm run build                  # 本番ビルド
npm run lint                   # ESLintチェック

# インフラ
docker compose up -d           # PostgreSQL起動
```