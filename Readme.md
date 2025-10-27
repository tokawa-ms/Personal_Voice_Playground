# 🎤 Azure Personal Voice Playground

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Azure](https://img.shields.io/badge/Azure-0078D4?style=flat&logo=microsoft-azure&logoColor=white)](https://azure.microsoft.com/)

> **Azure Speech Service の Personal Voice** 機能を簡単にテストできる静的 HTML + JavaScript アプリケーション

## 📋 概要

Azure Personal Voice Playground は、Azure Speech Service の Personal Voice 機能をブラウザ上で簡単にテストできるウェブアプリケーションです。サーバーセットアップ不要で、ローカル PC のブラウザから直接実行できます。

## ✅ Quick Test
以下の URL でアクセス可能なページの接続先情報に、Speech Service の接続先リージョンとアクセスキーを入力するだけで、Personal Voice の作成から合成テストまで行うことが可能です。

https://tokawa-ms.github.io/Personal_Voice_Playground/src/

### ✨ 主な機能

- 🎙️ **Personal Voice の作成** - 音声ファイルから独自の AI 音声を生成
- 📋 **Voice 管理** - 作成した Personal Voice の一覧表示と選択
- 🔊 **音声合成テスト** - 任意のテキストを Personal Voice で音声化
- 🌐 **多言語UI** - 日本語と英語の UI 切り替えに対応
- 🌍 **多言語音声合成** - 日本語、英語、中国語など 18 言語での音声合成をサポート
- 💾 **音声ダウンロード** - 合成した音声を MP3 形式で保存
- 📱 **レスポンシブデザイン** - PC、タブレット、スマートフォンに対応

## 🛠️ 技術スタック

### フロントエンド

| 技術                                     | バージョン | 用途                         |
| ---------------------------------------- | ---------- | ---------------------------- |
| HTML5                                    | Latest     | セマンティックなマークアップ |
| CSS3                                     | Latest     | スタイリング                 |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x (CDN)  | ユーティリティファースト CSS |
| JavaScript                               | ES6+       | Azure API 連携とインタラクション |

### 外部サービス

- **Azure Speech Service** - Personal Voice 作成と音声合成
- **Azure Cognitive Services API** - REST API 経由での連携

## 🎯 Personal Voice とは

[Azure Personal Voice](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-overview) は、少量の音声サンプルから個人の声を再現できる AI 音声合成技術です。

### ユースケース
- 📖 個人用のオーディオブックやポッドキャスト
- 🎥 動画コンテンツのナレーション
- 🤖 パーソナライズされた音声アシスタント
- 🎓 教育コンテンツの音声化

## 📁 プロジェクト構造

```
Personal_Voice_Playground/
├── 📄 README.md                    # このファイル
├── 📄 LICENSE                       # MIT ライセンス
├── 📁 .github/
│   └── 📄 copilot-instructions.md  # Copilot 設定
├── 📁 src/                          # アプリケーションソース
│   ├── 📄 index.html               # メイン HTML
│   ├── 📁 css/
│   │   └── 📄 styles.css           # カスタム CSS
│   └── 📁 js/
│       └── 📄 script.js            # メインスクリプト
└── 📁 docs/                         # ドキュメント
    ├── 📄 specification.md         # 機能仕様書
    └── 📄 usage-guide.md           # 使用ガイド
```

## 🚀 クイックスタート

### 前提条件

- 📌 モダンな Web ブラウザ (Chrome 90+, Firefox 88+, Safari 14+)
- 📌 Azure サブスクリプション
- 📌 Azure Speech Service リソース

### Azure リソースのセットアップ

1. **Azure Portal にアクセス**
   - [Azure Portal](https://portal.azure.com) にサインイン

2. **Speech Service リソースを作成**
   ```
   リソースの作成 → AI + Machine Learning → Speech
   ```

3. **必要な情報を取得**
   - サブスクリプションキー（キー 1 または キー 2）
   - サービスリージョン（例: eastus, westeurope）

### アプリケーションの起動

#### 方法 1: ローカルファイルから直接起動

```bash
# リポジトリをクローン
git clone https://github.com/tokawa-ms/Personal_Voice_Playground.git
cd Personal_Voice_Playground

# ブラウザで開く
open src/index.html  # Mac
start src/index.html # Windows
xdg-open src/index.html # Linux
```

#### 方法 2: ローカルサーバーを使用（推奨）

```bash
# Python を使用
cd src
python -m http.server 8000

# または Node.js (npx) を使用
cd src
npx http-server -p 8000
```

ブラウザで `http://localhost:8000` を開く

### 使い方

1. **Azure Speech Service に接続**
   - サブスクリプションキーとリージョンを入力
   - 「接続」ボタンをクリック

2. **Personal Voice を作成（左側パネル）**
   - プロジェクト作成
   - 同意書音声ファイルをアップロード
   - 学習用音声ファイルをアップロード

3. **音声合成をテスト（右側パネル）**
   - Personal Voice を選択
   - 言語を選択
   - テキストを入力
   - 「音声合成を実行」をクリック

詳細な使用方法は [使用ガイド](docs/usage-guide.md) を参照してください。

## 📸 スクリーンショット

### 接続設定画面
Azure Speech Service への接続設定を行います。

### Personal Voice 管理画面
Personal Voice の一覧表示と新規作成ができます。

### 音声合成テスト画面
作成した Personal Voice でテキストを音声化します。

## 🎨 主要機能の詳細

### 1. Azure Speech Service 接続
- サブスクリプションキーとリージョンの入力
- 接続テストと検証
- 折りたたみ可能な UI

### 2. Personal Voice 作成フロー
1. **プロジェクト作成**: 新規プロジェクトの作成
2. **同意書アップロード**: 話者の同意音声（WAV）をアップロード
3. **音声アップロード**: 学習用音声サンプル（WAV）をアップロード
4. **処理完了**: 話者プロファイル ID の取得

### 3. Personal Voice 管理
- 作成済み Personal Voice の一覧表示
- Voice の選択と情報表示
- リストの更新機能

### 4. 多言語UI
- 日本語と英語のUI切り替え
- 画面右上の言語切り替えボタン
- localStorage による言語設定の保存
- ページ全体のテキストが即座に切り替わる
- 詳細は [多言語UI機能ドキュメント](docs/multilingual-ui-feature.md) を参照

### 5. 音声合成
- Personal Voice の選択
- 多言語音声合成対応（18言語）
  - 日本語
  - 英語（米国、イギリス、オーストラリア、ニュージーランド、シンガポール）
  - 中国語（標準/簡体字、台湾/繁体字、香港/繁体字）
  - 韓国語
  - ベトナム語、タイ語、マレー語、トルコ語
  - ドイツ語、フランス語、スペイン語、イタリア語
- テキスト入力と音声合成
- 音声の再生とダウンロード（MP3）

## 📋 音声ファイルの準備

### 同意書音声
- **形式**: WAV（16kHz、16bit、モノラル推奨）
- **内容例**: 「私は自分の音声を AI モデルの学習に使用することに同意します」
- **長さ**: 5〜10秒程度

### 学習用音声
- **形式**: WAV（16kHz、16bit、モノラル推奨）
- **内容**: 話者の特徴を表す自然な発話
- **長さ**: 30秒以上推奨

## 🔒 セキュリティとベストプラクティス

### API キーの取り扱い

- ✅ UI 上のパスワードフィールドで入力
- ✅ メモリ上にのみ保持（localStorage に保存しない）
- ❌ ハードコーディングは禁止
- 🔐 テストやデモ用途のみで使用

### データプライバシー

- 🔒 音声データは Azure に送信されます
- 🔒 本番利用時は適切な同意取得プロセスを実装してください
- 🔒 個人を特定できる情報の取り扱いに注意

### CORS 対応

- Azure Speech Service は CORS を許可しているため、ブラウザから直接 API を呼び出し可能
- クロスオリジンリクエストが正常に動作します

## 📱 レスポンシブデザイン

以下の画面サイズに最適化されています：

- 📱 **モバイル**: 320px〜768px（1カラム）
- 📊 **タブレット**: 768px〜1024px（2カラム）
- 💻 **デスクトップ**: 1024px 以上（2カラム）

## 🐛 トラブルシューティング

### 接続エラー
```
エラー: 接続に失敗しました
```
**解決策**:
- サブスクリプションキーを確認
- リージョン名を小文字で入力（例: `eastus`）
- Azure リソースがアクティブか確認

### CORS エラー
```
エラー: CORS policy
```
**解決策**:
- ローカルサーバーを使用（`python -m http.server`）
- `file://` プロトコルではなく `http://` でアクセス

### ファイルアップロードエラー
```
エラー: ファイルのアップロードに失敗しました
```
**解決策**:
- WAV 形式のファイルを使用
- ファイルサイズを確認（10MB 以下推奨）
- プロジェクトが正しく作成されているか確認

詳細は [使用ガイド](docs/usage-guide.md) のトラブルシューティングセクションを参照してください。

## 📚 ドキュメント

- [機能仕様書](docs/specification.md) - 詳細な機能仕様とAPI情報
- [使用ガイド](docs/usage-guide.md) - ステップバイステップの使用方法

## 🔗 関連リンク

### Azure Personal Voice 公式ドキュメント
- [Personal Voice 概要](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-overview)
- [プロジェクト作成](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-create-project)
- [同意書の作成](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-create-consent)
- [Personal Voice の作成](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-create-voice)
- [使用方法](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-how-to-use)

### Azure Speech Service
- [Speech Service ドキュメント](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/)
- [REST API リファレンス](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/rest-text-to-speech)

## 🤝 コントリビューション

プロジェクトへの貢献を歓迎します！

### コントリビューション方法

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Request を作成

### 改善アイデア

- 🎯 Personal Voice の削除機能
- 🎯 プロジェクト管理機能の強化
- 🎯 ブラウザ内での音声録音機能
- 🎯 音声合成パラメータの詳細設定
- 🎯 バッチ処理機能
- 🎯 UI の多言語化

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 🆘 サポートとリソース

- 📖 **ドキュメント**: [docs/](docs/)
- 💬 **Issue 報告**: [GitHub Issues](https://github.com/tokawa-ms/Personal_Voice_Playground/issues)
- 🐛 **バグ報告**: バグを見つけた場合は Issue を作成してください
- 💡 **機能リクエスト**: 新機能の提案も歓迎します

## 🙏 謝辞

このプロジェクトは以下の技術を使用して構築されています：

- [Azure Speech Service](https://azure.microsoft.com/services/cognitive-services/speech-services/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GitHub Copilot](https://github.com/features/copilot)

## 📊 プロジェクト統計

![GitHub stars](https://img.shields.io/github/stars/tokawa-ms/Personal_Voice_Playground?style=social)
![GitHub forks](https://img.shields.io/github/forks/tokawa-ms/Personal_Voice_Playground?style=social)
![GitHub issues](https://img.shields.io/github/issues/tokawa-ms/Personal_Voice_Playground)

---

<div align="center">
  <strong>🎤 Happy Voice Synthesis with Azure Personal Voice! 🤖</strong><br>
  Made with ❤️ using Azure Speech Service and GitHub Copilot
</div>

---

# 🌏 English Version / 英語版

---

# 🎤 Azure Personal Voice Playground

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Azure](https://img.shields.io/badge/Azure-0078D4?style=flat&logo=microsoft-azure&logoColor=white)](https://azure.microsoft.com/)

> **A static HTML + JavaScript application for easily testing Azure Speech Service's Personal Voice feature**

## 📋 Overview

Azure Personal Voice Playground is a web application that allows you to easily test Azure Speech Service's Personal Voice feature in your browser. No server setup required - runs directly from your local PC browser.

## ✅ Quick Test
You can create and test Personal Voice synthesis by simply entering your Speech Service region and access key in the connection settings at the URL below:

https://tokawa-ms.github.io/Personal_Voice_Playground/src/

### ✨ Key Features

- 🎙️ **Personal Voice Creation** - Generate custom AI voices from audio files
- 📋 **Voice Management** - List and select created Personal Voices
- 🔊 **Voice Synthesis Testing** - Convert any text to speech using Personal Voice
- 🌐 **Multilingual UI** - Support for Japanese and English UI switching
- 🌍 **Multilingual Voice Synthesis** - Support for voice synthesis in 18 languages including Japanese, English, and Chinese
- 💾 **Audio Download** - Save synthesized audio in MP3 format
- 📱 **Responsive Design** - Support for PC, tablet, and smartphone

## 🛠️ Technology Stack

### Frontend

| Technology                               | Version   | Purpose                        |
| ---------------------------------------- | --------- | ------------------------------ |
| HTML5                                    | Latest    | Semantic markup                |
| CSS3                                     | Latest    | Styling                        |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x (CDN) | Utility-first CSS framework    |
| JavaScript                               | ES6+      | Azure API integration and interaction |

### External Services

- **Azure Speech Service** - Personal Voice creation and speech synthesis
- **Azure Cognitive Services API** - Integration via REST API

## 🎯 What is Personal Voice?

[Azure Personal Voice](https://learn.microsoft.com/azure/ai-services/speech-service/personal-voice-overview) is an AI-powered speech synthesis technology that can reproduce an individual's voice from a small amount of audio samples.

### Use Cases
- 📖 Personal audiobooks and podcasts
- 🎥 Video content narration
- 🤖 Personalized voice assistants
- 🎓 Educational content vocalization

## 📁 Project Structure

```
Personal_Voice_Playground/
├── 📄 README.md                    # This file
├── 📄 LICENSE                       # MIT License
├── 📁 .github/
│   └── 📄 copilot-instructions.md  # Copilot configuration
├── 📁 src/                          # Application source
│   ├── 📄 index.html               # Main HTML
│   ├── 📁 css/
│   │   └── 📄 styles.css           # Custom CSS
│   └── 📁 js/
│       └── 📄 script.js            # Main script
└── 📁 docs/                         # Documentation
    ├── 📄 specification.md         # Feature specifications
    └── 📄 usage-guide.md           # Usage guide
```

## 🚀 Quick Start

### Prerequisites

- 📌 Modern web browser (Chrome 90+, Firefox 88+, Safari 14+)
- 📌 Azure subscription
- 📌 Azure Speech Service resource

### Azure Resource Setup

1. **Access Azure Portal**
   - Sign in to [Azure Portal](https://portal.azure.com)

2. **Create Speech Service Resource**
   ```
   Create a resource → AI + Machine Learning → Speech
   ```

3. **Get Required Information**
   - Subscription key (Key 1 or Key 2)
   - Service region (e.g., eastus, westeurope)

### Launch Application

#### Method 1: Direct Launch from Local Files

```bash
# Clone the repository
git clone https://github.com/tokawa-ms/Personal_Voice_Playground.git
cd Personal_Voice_Playground

# Open in browser
open src/index.html  # Mac
start src/index.html # Windows
xdg-open src/index.html # Linux
```

#### Method 2: Using Local Server (Recommended)

```bash
# Using Python
cd src
python -m http.server 8000

# Or using Node.js (npx)
cd src
npx http-server -p 8000
```

Open `http://localhost:8000` in your browser

### How to Use

1. **Connect to Azure Speech Service**
   - Enter subscription key and region
   - Click "Connect" button

2. **Create Personal Voice (Left Panel)**
   - Create project
   - Upload consent audio file
   - Upload training audio file

3. **Test Voice Synthesis (Right Panel)**
   - Select Personal Voice
   - Select language
   - Enter text
   - Click "Execute Voice Synthesis"

For detailed usage instructions, refer to the [Usage Guide](docs/usage-guide.md).

## 📸 Screenshots

### Connection Settings Screen
Configure connection to Azure Speech Service.

### Personal Voice Management Screen
View Personal Voice list and create new voices.

### Voice Synthesis Test Screen
Convert text to speech using created Personal Voice.

## 🎨 Detailed Features

### 1. Azure Speech Service Connection
- Input subscription key and region
- Connection testing and validation
- Collapsible UI

### 2. Personal Voice Creation Flow
1. **Project Creation**: Create new project
2. **Consent Upload**: Upload speaker consent audio (WAV)
3. **Audio Upload**: Upload training audio samples (WAV)
4. **Processing Complete**: Obtain speaker profile ID

### 3. Personal Voice Management
- List created Personal Voices
- Select and display voice information
- List refresh functionality

### 4. Multilingual UI
- Switch between Japanese and English UI
- Language toggle button in upper right corner
- Language settings saved in localStorage
- Instant switching of all page text
- See [Multilingual UI Feature Documentation](docs/multilingual-ui-feature.md) for details

### 5. Voice Synthesis
- Personal Voice selection
- Multilingual voice synthesis support (18 languages)
  - Japanese
  - English (US, UK, Australia, New Zealand, Singapore)
  - Chinese (Simplified, Traditional Taiwan, Traditional Hong Kong)
  - Korean
  - Vietnamese, Thai, Malay, Turkish
  - German, French, Spanish, Italian
- Text input and voice synthesis
- Audio playback and download (MP3)

## 📋 Preparing Audio Files

### Consent Audio
- **Format**: WAV (16kHz, 16bit, mono recommended)
- **Content Example**: "I consent to the use of my voice for training AI models"
- **Length**: 5-10 seconds

### Training Audio
- **Format**: WAV (16kHz, 16bit, mono recommended)
- **Content**: Natural speech representing speaker characteristics
- **Length**: 30+ seconds recommended

## 🔒 Security and Best Practices

### API Key Handling

- ✅ Enter via password field in UI
- ✅ Keep only in memory (do not save to localStorage)
- ❌ Hard-coding is prohibited
- 🔐 Use only for testing and demo purposes

### Data Privacy

- 🔒 Audio data is sent to Azure
- 🔒 Implement proper consent process for production use
- 🔒 Handle personally identifiable information with care

### CORS Support

- Azure Speech Service allows CORS, enabling direct API calls from browser
- Cross-origin requests work normally

## 📱 Responsive Design

Optimized for the following screen sizes:

- 📱 **Mobile**: 320px-768px (1 column)
- 📊 **Tablet**: 768px-1024px (2 columns)
- 💻 **Desktop**: 1024px+ (2 columns)

## 🐛 Troubleshooting

### Connection Error
```
Error: Connection failed
```
**Solution**:
- Verify subscription key
- Enter region name in lowercase (e.g., `eastus`)
- Confirm Azure resource is active

### CORS Error
```
Error: CORS policy
```
**Solution**:
- Use local server (`python -m http.server`)
- Access via `http://` instead of `file://` protocol

### File Upload Error
```
Error: File upload failed
```
**Solution**:
- Use WAV format files
- Check file size (10MB or less recommended)
- Verify project is correctly created

For details, refer to the Troubleshooting section in the [Usage Guide](docs/usage-guide.md).

## 📚 Documentation

- [Feature Specifications](docs/specification.md) - Detailed feature specifications and API information
- [Usage Guide](docs/usage-guide.md) - Step-by-step usage instructions

## 🔗 Related Links

### Azure Personal Voice Official Documentation
- [Personal Voice Overview](https://learn.microsoft.com/azure/ai-services/speech-service/personal-voice-overview)
- [Create Project](https://learn.microsoft.com/azure/ai-services/speech-service/personal-voice-create-project)
- [Create Consent](https://learn.microsoft.com/azure/ai-services/speech-service/personal-voice-create-consent)
- [Create Personal Voice](https://learn.microsoft.com/azure/ai-services/speech-service/personal-voice-create-voice)
- [How to Use](https://learn.microsoft.com/azure/ai-services/speech-service/personal-voice-how-to-use)

### Azure Speech Service
- [Speech Service Documentation](https://learn.microsoft.com/azure/ai-services/speech-service/)
- [REST API Reference](https://learn.microsoft.com/azure/ai-services/speech-service/rest-text-to-speech)

## 🤝 Contributing

Contributions to the project are welcome!

### How to Contribute

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

### Improvement Ideas

- 🎯 Personal Voice deletion functionality
- 🎯 Enhanced project management features
- 🎯 In-browser audio recording functionality
- 🎯 Detailed voice synthesis parameter settings
- 🎯 Batch processing functionality
- 🎯 UI internationalization

## 📄 License

This project is released under the [MIT License](LICENSE).

## 🆘 Support and Resources

- 📖 **Documentation**: [docs/](docs/)
- 💬 **Issue Reports**: [GitHub Issues](https://github.com/tokawa-ms/Personal_Voice_Playground/issues)
- 🐛 **Bug Reports**: Create an issue if you find a bug
- 💡 **Feature Requests**: Feature suggestions are also welcome

## 🙏 Acknowledgments

This project is built using the following technologies:

- [Azure Speech Service](https://azure.microsoft.com/services/cognitive-services/speech-services/)
- [Tailwind CSS](https://tailwindcss.com/)
- [GitHub Copilot](https://github.com/features/copilot)

## 📊 Project Statistics

![GitHub stars](https://img.shields.io/github/stars/tokawa-ms/Personal_Voice_Playground?style=social)
![GitHub forks](https://img.shields.io/github/forks/tokawa-ms/Personal_Voice_Playground?style=social)
![GitHub issues](https://img.shields.io/github/issues/tokawa-ms/Personal_Voice_Playground)

---

<div align="center">
  <strong>🎤 Happy Voice Synthesis with Azure Personal Voice! 🤖</strong><br>
  Made with ❤️ using Azure Speech Service and GitHub Copilot
</div>
