# ベースモデル選択機能

## 概要

音声合成テストパネルにベースモデル選択機能を追加しました。これにより、ユーザーは Personal Voice で使用するベースモデルを UI から選択できるようになります。

## 実装内容

### 1. UI の追加

音声合成テストパネルに「ベースモデルを選択」ドロップダウンを追加しました。このドロップダウンは、Personal Voice の選択欄と言語選択欄の間に配置されています。

**選択可能なベースモデル:**
- **DragonLatestNeural** (デフォルト)
- **DragonV2.1Neural**
- **PhoenixLatestNeural**

### 2. 多言語対応

日本語と英語の両方の UI をサポートしています。

**日本語:**
- ラベル: `ベースモデルを選択 *`
- オプション: `DragonLatestNeural`, `DragonV2.1Neural`, `PhoenixLatestNeural`

**英語:**
- ラベル: `Select Base Model *`
- オプション: `DragonLatestNeural`, `DragonV2.1Neural`, `PhoenixLatestNeural`

### 3. 機能実装

`synthesizeSpeech()` 関数を更新し、ユーザーが選択したベースモデルを取得して SSML に適用するようにしました。

**変更前:**
```javascript
const ssml = `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="${selectedLanguage}">
        <voice name="DragonLatestNeural">
            <mstts:ttsembedding speakerProfileId="${selectedVoice}">
                ${synthesisText}
            </mstts:ttsembedding>
        </voice>
    </speak>
`;
```

**変更後:**
```javascript
const selectedBaseModel = document.getElementById('selectedBaseModel').value;

const ssml = `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="${selectedLanguage}">
        <voice name="${selectedBaseModel}">
            <mstts:ttsembedding speakerProfileId="${selectedVoice}">
                ${synthesisText}
            </mstts:ttsembedding>
        </voice>
    </speak>
`;
```

## 使用方法

1. Azure Speech Service に接続します
2. Personal Voice を作成または既存のものを選択します
3. 音声合成テストパネルで:
   - Personal Voice を選択
   - **ベースモデルを選択** (DragonLatestNeural または PhoenixLatestNeural)
   - 言語を選択
   - 合成するテキストを入力
   - 「音声合成を実行」をクリック

## ベースモデルについて

### DragonLatestNeural (デフォルト)
- 高品質な音声合成を提供
- 幅広い言語とシナリオに対応

### DragonV2.1Neural
- Dragon シリーズの改良版モデル
- より高度な音声品質と表現力を提供

### PhoenixLatestNeural
- 最新のニューラル音声モデル
- より自然な音声表現が可能

## 技術的な詳細

### 変更されたファイル

1. **src/index.html**
   - ベースモデル選択用の `<select>` 要素を追加
   - ID: `selectedBaseModel`
   - デフォルト値: `DragonLatestNeural`

2. **src/js/i18n.js**
   - 日本語翻訳キーを追加:
     - `selectBaseModel`: "ベースモデルを選択 *"
     - `baseModelDragon`: "DragonLatestNeural"
     - `baseModelDragonV2`: "DragonV2.1Neural"
     - `baseModelPhoenix`: "PhoenixLatestNeural"
   - 英語翻訳キーを追加:
     - `selectBaseModel`: "Select Base Model *"
     - `baseModelDragon`: "DragonLatestNeural"
     - `baseModelDragonV2`: "DragonV2.1Neural"
     - `baseModelPhoenix`: "PhoenixLatestNeural"

3. **src/js/script.js**
   - `synthesizeSpeech()` 関数を更新
   - 選択されたベースモデルを取得し、SSML の `voice name` 属性に適用
   - コンソールログに選択されたベースモデルを出力

## スクリーンショット

### 日本語 UI
![日本語でのベースモデル選択](https://github.com/user-attachments/assets/bdf6f56e-8b11-471e-9936-ed1e672cbab4)

### 英語 UI
![英語でのベースモデル選択](https://github.com/user-attachments/assets/c09865da-704d-4be8-b7b0-65599d5d83f8)

### PhoenixLatestNeural を選択した状態
![PhoenixLatestNeural 選択](https://github.com/user-attachments/assets/33837dca-6f8c-4f6f-bf3e-4bfd4694631a)

## 関連する Issue

- [Issue #XX: ベースモデルの選択肢について](https://github.com/tokawa-ms/Personal_Voice_Playground/issues/XX)

## 備考

- この機能は最小限の変更で実装されており、既存の機能には影響を与えません
- ベースモデルの選択は音声合成時にのみ使用され、Personal Voice の作成には影響しません
- デフォルト値は従来通り `DragonLatestNeural` に設定されているため、既存のユーザーエクスペリエンスは維持されます
