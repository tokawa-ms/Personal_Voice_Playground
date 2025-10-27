# Azure Personal Voice Playground - 機能仕様書

## 概要

このアプリケーションは、Azure Speech Service の Personal Voice 機能をテストするための静的 HTML + JavaScript で構成されたウェブアプリケーションです。ローカル PC 上でブラウザから直接実行でき、Azure Speech Service との連携により Personal Voice の作成と音声合成のテストが可能です。

## 技術スタック

### フロントエンド
- **HTML5**: セマンティックなマークアップ、UTF-8 エンコーディング
- **CSS3**: Tailwind CSS (CDN版) によるレスポンシブデザイン
- **JavaScript (ES6)**: Azure Speech Service API との連携

### 外部サービス
- **Azure Speech Service**: Personal Voice の作成と音声合成
- **Azure Cognitive Services API**: REST API による連携

## 機能一覧

### 1. Azure Speech Service 接続管理

#### 1.1 接続設定 UI
- **場所**: 画面最上部
- **機能**:
  - サブスクリプションキーの入力（パスワード型フィールド）
  - サービスリージョンの入力（テキストフィールド）
  - 接続ボタンによる接続テスト
  - 接続状態の表示（接続中、成功、失敗）
  - 接続成功後の自動折りたたみ機能

#### 1.2 接続確認
- プロジェクト API へのアクセステストにより接続を確認
- 接続成功時にメインコンテンツを表示
- エラー時には詳細なエラーメッセージを表示

### 2. Personal Voice 管理（左側パネル）

#### 2.1 既存の Personal Voice リスト表示
- **API エンドポイント**: `GET /customvoice/personalvoices?api-version=2024-02-01-preview`
- **機能**:
  - Personal Voice の一覧表示（カード形式）
  - 各 Voice の情報表示（名前、ID、ロケール）
  - リスト更新ボタン
  - 音声合成用の Voice 選択ボタン

#### 2.2 Personal Voice 新規作成

> **注意**: すべての Personal Voice API には `api-version=2024-02-01-preview` パラメータが必要です。
> プロジェクト、同意書、Personal Voice には一意の ID を指定する必要があります。

##### ステップ 1: プロジェクト作成
- **API エンドポイント**: `PUT /customvoice/projects/{ProjectId}?api-version=2024-02-01-preview`
- **入力項目**:
  - プロジェクト ID プレフィックス（任意、デフォルト: "project"）
  - プロジェクト名（必須）
  - プロジェクト説明（任意）
- **出力**: プロジェクト ID
- **プロジェクト ID の生成**: `{プレフィックス}-{タイムスタンプ}-{ランダム文字列}`

##### ステップ 2: 同意書アップロード
- **API エンドポイント**: `POST /customvoice/consents/{ConsentId}?api-version=2024-02-01-preview`
- **入力項目**:
  - 同意書音声ファイル（WAV 形式、必須）
  - 話者名（voiceTalentName）
  - 会社名（companyName）
  - ロケール（locale）
- **機能**:
  - ファイル選択 UI
  - マルチパート形式でのアップロード
  - アップロード進捗表示
- **出力**: 同意書 ID

##### ステップ 3: 学習用音声アップロード
- **API エンドポイント**: `POST /customvoice/personalvoices/{PersonalVoiceId}?api-version=2024-02-01-preview`
- **入力項目**:
  - 音声ファイル（WAV 形式、必須）
  - プロジェクト ID
  - 同意書 ID
- **機能**:
  - ファイル選択 UI
  - マルチパート形式でのアップロード
  - アップロード進捗表示
- **出力**: 話者プロファイル ID（speakerProfileId）

### 3. 音声合成テスト（右側パネル）

#### 3.1 合成設定
- **Personal Voice 選択**: ドロップダウンメニュー
- **言語選択**: サポート言語のドロップダウン
  - 日本語 (ja-JP)
  - 英語 (米国) - en-US
  - 英語 (イギリス) - en-GB
  - 英語 (オーストラリア) - en-AU
  - 英語 (ニュージーランド) - en-NZ
  - 英語 (シンガポール) - en-SG
  - 中国語 (標準、簡体字) - zh-CN
  - 中国語 (台湾標準中国語、繁体字) - zh-TW
  - 中国語 (繁体字) - zh-HK
  - 韓国語 (ko-KR)
  - ベトナム語 (ベトナム) - vi-VN
  - タイ語 - th-TH
  - マレー語 (マレーシア) - ms-MY
  - トルコ語 - tr-TR
  - ドイツ語 (de-DE)
  - フランス語 (fr-FR)
  - スペイン語 (es-ES)
  - イタリア語 (it-IT)
- **テキスト入力**: 複数行テキストエリア

#### 3.2 音声合成実行
- **API エンドポイント**: `POST /cognitiveservices/v1` (TTS エンドポイント)
- **機能**:
  - SSML 形式での音声合成リクエスト
  - `speakerProfileId` を使用した Personal Voice 指定
  - Base model voice name（DragonLatestNeural または PhoenixLatestNeural）の指定
  - 合成進捗表示
  - エラーハンドリング

#### 3.3 音声再生・ダウンロード
- **音声プレイヤー**: HTML5 audio 要素
- **ダウンロードボタン**: MP3 形式でのダウンロード

## UI/UX 設計

### レイアウト構造

```
┌─────────────────────────────────────────────┐
│  接続設定パネル（折りたたみ可能）                │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────┐  ┌──────────────┐        │
│  │              │  │              │        │
│  │  Personal    │  │  音声合成    │        │
│  │  Voice 管理  │  │  テスト      │        │
│  │              │  │              │        │
│  │  - リスト    │  │  - Voice選択 │        │
│  │  - 新規作成  │  │  - 言語選択  │        │
│  │              │  │  - テキスト  │        │
│  │              │  │  - 再生      │        │
│  └──────────────┘  └──────────────┘        │
│                                             │
└─────────────────────────────────────────────┘
```

### レスポンシブデザイン
- **デスクトップ（1024px 以上）**: 2カラムレイアウト
- **タブレット（768px - 1023px）**: 2カラムレイアウト（やや縮小）
- **モバイル（767px 以下）**: 1カラムレイアウト（縦積み）

### カラースキーム
- **プライマリカラー**: Blue (Tailwind blue-500, blue-600)
- **セカンダリカラー**: Green (Tailwind green-500, green-600)
- **アクセントカラー**: Purple (Tailwind purple-500, purple-600)
- **背景**: Gray-50
- **カード背景**: White
- **テキスト**: Gray-800

## データフロー

### Personal Voice 作成フロー
```
1. ユーザー入力（プロジェクト名）
   ↓
2. プロジェクト作成 API 呼び出し
   ↓
3. プロジェクト ID 取得
   ↓
4. ユーザー入力（同意書ファイル）
   ↓
5. 同意書アップロード API 呼び出し
   ↓
6. 同意書 ID 取得
   ↓
7. ユーザー入力（音声ファイル）
   ↓
8. 話者プロファイル作成 API 呼び出し
   ↓
9. 話者プロファイル ID 取得
   ↓
10. Personal Voice リスト更新
```

### 音声合成フロー
```
1. ユーザー選択（Personal Voice、言語）
   ↓
2. ユーザー入力（テキスト）
   ↓
3. SSML 生成
   ↓
4. 音声合成 API 呼び出し
   ↓
5. 音声データ（Blob）取得
   ↓
6. 音声プレイヤーに設定
   ↓
7. 再生・ダウンロード可能
```

## エラーハンドリング

### エラーの種類と対処

1. **接続エラー**
   - 原因: 無効なキー、リージョン、ネットワーク問題
   - 対処: エラーメッセージ表示、再接続促進

2. **ファイルアップロードエラー**
   - 原因: 不正なファイル形式、サイズ超過
   - 対処: ファイル形式・サイズチェック、エラーメッセージ

3. **API エラー**
   - 原因: API クォータ超過、サービス障害
   - 対処: HTTP ステータスコードに応じたエラーメッセージ

4. **音声合成エラー**
   - 原因: 無効な SSML、サポートされていない言語
   - 対処: 入力検証、エラーメッセージ

## セキュリティ考慮事項

### シークレット管理
- サブスクリプションキーは UI 上のパスワードフィールドで入力
- キーはメモリ上にのみ保持（localStorage には保存しない）
- 本番環境では適切な認証機構の実装を推奨

### CORS 対応
- Azure Speech Service は CORS を許可
- ブラウザから直接 API 呼び出しが可能

### 入力検証
- すべてのユーザー入力に対して検証を実施
- XSS 対策として HTML エスケープを実施

## パフォーマンス最適化

### ファイル処理
- FileReader API による非同期ファイル読み込み
- Base64 エンコーディングの効率的な処理

### API 呼び出し
- 適切なローディング表示による UX 向上
- エラー時のリトライ機構（必要に応じて実装可能）

### レスポンシブデザイン
- Tailwind CSS による効率的な CSS 配信
- 最小限のカスタム CSS

## ログ出力

### コンソールログ
すべての重要な処理において `console.log` でログを出力:
- アプリケーション初期化
- API 呼び出し（開始、成功、失敗）
- ユーザーアクション
- エラー詳細

### ログレベル
- **console.log**: 一般的な情報
- **console.warn**: 警告
- **console.error**: エラー

## ブラウザ互換性

### サポートブラウザ
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### 必要な Web API
- Fetch API
- FileReader API
- Blob API
- Audio API
- Promise / async-await

## 今後の拡張可能性

### 実装可能な追加機能
1. **Personal Voice の削除機能**
2. **プロジェクト一覧の表示と管理**
3. **音声ファイルの録音機能（ブラウザ内）**
4. **音声合成パラメータの詳細設定（速度、ピッチなど）**
5. **履歴管理（合成した音声の履歴）**
6. **バッチ処理（複数テキストの一括合成）**
7. **エクスポート機能（設定、音声のバックアップ）**
8. **多言語対応（UI の多言語化）**

## 参考資料

### Azure Personal Voice 公式ドキュメント
- [Personal Voice 概要](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-overview)
- [プロジェクト作成](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-create-project)
- [同意書の作成](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-create-consent)
- [Personal Voice の作成](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-create-voice)
- [使用方法](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-how-to-use)

### API リファレンス
- [Speech Service REST API](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/rest-text-to-speech)
- [Speaker Recognition API](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/rest-speaker-recognition)
