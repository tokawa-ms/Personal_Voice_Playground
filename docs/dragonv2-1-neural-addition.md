# DragonV2.1Neural ベースモデルの追加

## 概要

Issue の要件に従い、ベースモデルの選択肢に `DragonV2.1Neural` を追加しました。

## 変更内容

### 1. HTML の変更 (src/index.html)

ベースモデル選択ドロップダウンに新しいオプションを追加しました：

```html
<option value="DragonV2.1Neural" data-i18n="baseModelDragonV2">DragonV2.1Neural</option>
```

配置順序：
1. DragonLatestNeural (デフォルト)
2. DragonV2.1Neural (新規追加)
3. PhoenixLatestNeural

### 2. 多言語対応 (src/js/i18n.js)

日本語と英語の両方で翻訳キーを追加しました：

**日本語:**
```javascript
baseModelDragonV2: 'DragonV2.1Neural',
```

**英語:**
```javascript
baseModelDragonV2: 'DragonV2.1Neural',
```

### 3. ドキュメントの更新 (docs/base-model-selection-feature.md)

- 選択可能なベースモデルのリストに DragonV2.1Neural を追加
- DragonV2.1Neural の説明を追加：
  - Dragon シリーズの改良版モデル
  - より高度な音声品質と表現力を提供
- 多言語対応の翻訳キー一覧を更新

## 動作確認

### テスト結果

- ✅ 日本語 UI でドロップダウンに DragonV2.1Neural が表示される
- ✅ 英語 UI でドロップダウンに DragonV2.1Neural が表示される
- ✅ DragonV2.1Neural を選択できる
- ✅ 選択した値が適切に保持される
- ✅ 既存機能に影響なし

### スクリーンショット

**日本語 UI（ドロップダウン展開）:**
https://github.com/user-attachments/assets/7aa115fc-2c6b-4dfa-82e3-5ea952a234e5

**英語 UI（ドロップダウン展開）:**
https://github.com/user-attachments/assets/cfc6962d-fd4e-4f22-b88b-c56013be45c0

## 技術的な詳細

### ベースモデルについて

#### DragonV2.1Neural
- Dragon シリーズの改良版ニューラル音声モデル
- より高度な音声品質と表現力を提供
- Personal Voice との組み合わせで使用可能

### SSML での使用方法

音声合成時に以下のように SSML で指定されます：

```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" 
       xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="ja-JP">
    <voice name="DragonV2.1Neural">
        <mstts:ttsembedding speakerProfileId="[Speaker Profile ID]">
            [合成するテキスト]
        </mstts:ttsembedding>
    </voice>
</speak>
```

## コードレビューとセキュリティチェック

- ✅ コードレビュー完了：指摘事項なし
- ✅ CodeQL セキュリティチェック完了：問題なし

## 影響範囲

- **既存機能への影響**: なし
- **互換性**: 完全に後方互換性を保持
- **デフォルト動作**: 変更なし（DragonLatestNeural がデフォルトのまま）

## 今後の拡張性

新しいベースモデルを追加する場合は、同様の手順で以下を実施します：

1. `src/index.html` の `<select id="selectedBaseModel">` に `<option>` を追加
2. `src/js/i18n.js` の日本語・英語両方に翻訳キーを追加
3. `docs/base-model-selection-feature.md` のドキュメントを更新

## 関連リンク

- [Azure Personal Voice 公式ドキュメント](https://learn.microsoft.com/azure/ai-services/speech-service/personal-voice-overview)
- [Azure Speech Service REST API リファレンス](https://learn.microsoft.com/azure/ai-services/speech-service/rest-text-to-speech)

## まとめ

DragonV2.1Neural ベースモデルの追加が正常に完了しました。ユーザーは音声合成テストパネルで3つのベースモデル（DragonLatestNeural、DragonV2.1Neural、PhoenixLatestNeural）から選択できるようになりました。
