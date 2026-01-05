# Pub/Sub チャットアプリケーション実装計画

## 概要

最小構成の pub/sub チャットアプリケーションを実装します。

- サーバー側: Go + gorilla/websocket
- クライアント側: React + TypeScript + Zustand
- 通信: WebSocket

## アーキテクチャ

### サーバー側 (Go)

- **エンドポイント**:
  - `localhost:8080/:room_number` - チャットルームへの WebSocket 接続
  - `localhost:8080/send` - チャットメッセージの受信（POST）
- **機能**:
  - ルーム別の WebSocket 接続管理
  - メッセージの受信と配信
  - ルーム別のクライアント管理

### クライアント側 (React)

- **URL**: `localhost:5173/`
- **機能**:
  - 部屋番号入力
  - メッセージ入力・送信
  - 受信メッセージの表示
  - WebSocket 接続管理

## 実装手順

### 1. バックエンド実装

1. **WebSocket 接続管理**

   - ルーム別のクライアント管理
   - 接続・切断の処理

2. **メッセージ処理**

   - `/send`エンドポイントでのメッセージ受信
   - ルーム内クライアントへの配信

3. **ルーティング設定**
   - 動的ルーム番号の処理
   - CORS 設定

### 2. フロントエンド実装

1. **Zustand ストア設定**

   - ルーム番号管理
   - メッセージリスト管理
   - WebSocket 接続状態管理

2. **WebSocket 接続**

   - ルーム参加時の接続
   - メッセージ受信処理

3. **UI 実装**
   - 部屋番号入力フォーム
   - メッセージ入力・送信フォーム
   - メッセージ表示エリア

### 3. 統合・テスト

1. **動作確認**
   - 複数ルームでの動作
   - 複数クライアントでの動作
   - メッセージ送受信の確認

## 技術スタック詳細

### バックエンド

- **Go 1.25**
- **github.com/gorilla/websocket v1.5.0**
- **net/http** (標準ライブラリ)

### フロントエンド

- **React 18+**
- **TypeScript**
- **Zustand** (状態管理)
- **Vite** (ビルドツール)

## ファイル構成

```
pubsub/
├── backend/
│   ├── main.go
│   ├── go.mod
│   ├── go.sum
│   ├── handlers/
│   │   ├── websocket.go
│   │   └── message.go
│   └── models/
│       └── message.go
├── frontend/
│   └── vite-project/
│       ├── src/
│       │   ├── components/
│       │   │   ├── ChatRoom.tsx
│       │   │   ├── MessageInput.tsx
│       │   │   └── MessageList.tsx
│       │   ├── store/
│       │   │   └── chatStore.ts
│       │   ├── types/
│       │   │   └── message.ts
│       │   ├── utils/
│       │   │   └── websocket.ts
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── package.json
│       └── vite.config.ts
└── plan/
    └── implementation_plan.md
```

## 実装のポイント

### バックエンド

- ルーム別のクライアント管理を map で実装
- WebSocket 接続の適切な管理（接続・切断・エラーハンドリング）
- メッセージの構造化（JSON 形式）

### フロントエンド

- Zustand での状態管理
- WebSocket 接続の自動再接続機能
- リアルタイムメッセージ表示

## 次のステップ

1. バックエンドの WebSocket ハンドラー実装
2. フロントエンドの Zustand ストア実装
3. UI コンポーネントの実装
4. 統合テスト
