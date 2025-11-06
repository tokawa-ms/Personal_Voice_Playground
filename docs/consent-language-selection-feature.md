# 同意書言語選択機能

## 概要

同意書アップロード時に、音声で使用されている言語を選択できる機能です。以前は日本語（`ja-JP`）に固定されていましたが、この機能により 18 の言語から適切な言語を選択できるようになりました。

## 機能詳細

### 対応言語

以下の 18 言語に対応しています：

| 言語コード | 言語名（日本語） | 言語名（英語） |
|-----------|-----------------|---------------|
| ja-JP | 日本語 | Japanese |
| en-US | 英語 (米国) | English (US) |
| en-GB | 英語 (イギリス) | English (UK) |
| en-AU | 英語 (オーストラリア) | English (Australia) |
| en-NZ | 英語 (ニュージーランド) | English (New Zealand) |
| en-SG | 英語 (シンガポール) | English (Singapore) |
| zh-CN | 中国語 (標準、簡体字) | Chinese (Simplified) |
| zh-TW | 中国語 (台湾標準中国語、繁体字) | Chinese (Traditional, Taiwan) |
| zh-HK | 中国語 (繁体字) | Chinese (Traditional, Hong Kong) |
| ko-KR | 韓国語 | Korean |
| vi-VN | ベトナム語 (ベトナム) | Vietnamese (Vietnam) |
| th-TH | タイ語 | Thai |
| ms-MY | マレー語 (マレーシア) | Malay (Malaysia) |
| tr-TR | トルコ語 | Turkish |
| de-DE | ドイツ語 | German |
| fr-FR | フランス語 | French |
| es-ES | スペイン語 | Spanish |
| it-IT | イタリア語 | Italian |

### 使用方法

1. **ステップ 2: 同意書アップロード** セクションに移動
2. 「同意書の言語」ドロップダウンメニューから、同意書音声で使用した言語を選択
3. 選択した言語は、[Azure サンプル文例](https://github.com/Azure-Samples/Cognitive-Speech-TTS/blob/master/CustomVoice/script/verbal-statement-all-locales.txt) で読み上げた言語と一致させる必要があります
4. 他の必須フィールド（同意書ファイル、話者名、会社名）と共に入力
5. 「同意書をアップロード」ボタンをクリック

### 技術実装

#### HTML
```html
<div>
    <label for="consentLocale" class="block text-sm font-medium text-gray-700 mb-2" data-i18n="consentLocale">
        同意書の言語 *
    </label>
    <select 
        id="consentLocale" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        <option value="ja-JP" data-i18n="languageJapanese">日本語</option>
        <!-- ... 他の言語オプション ... -->
    </select>
    <p class="text-xs text-gray-500 mt-1" data-i18n="consentLocaleHelp">
        同意書で読み上げた言語を選択してください。サンプル文例の言語と一致させる必要があります。
    </p>
</div>
```

#### JavaScript
```javascript
// uploadConsent() 関数内
const consentLocale = document.getElementById('consentLocale').value;

// FormData に追加
formData.append('locale', consentLocale);
```

### デフォルト値

- デフォルトで日本語（`ja-JP`）が選択されています
- これにより、既存のユーザーエクスペリエンスとの下位互換性を保持しています

## ユーザーへの注意事項

### 重要な注意点

1. **言語の一致**: 選択する言語は、実際に同意書音声で読み上げた言語と一致させる必要があります
2. **サンプル文例の使用**: Azure が提供する[サンプル文例](https://github.com/Azure-Samples/Cognitive-Speech-TTS/blob/master/CustomVoice/script/verbal-statement-all-locales.txt)から、選択した言語に対応する文章を使用してください
3. **名前と会社名の組み込み**: サンプル文例に自分の名前と会社名を組み込んだうえで読み上げてください

### 例：英語で同意書を作成する場合

1. 「同意書の言語」で「英語 (米国)」（en-US）を選択
2. [サンプル文例](https://github.com/Azure-Samples/Cognitive-Speech-TTS/blob/master/CustomVoice/script/verbal-statement-all-locales.txt)から英語（en-US）の文例を確認
3. 自分の名前と会社名を組み込んだ英語の文章を読み上げた音声ファイルをアップロード

## API への影響

選択された言語コードは、Azure Speech Service の Consent API に `locale` パラメータとして送信されます：

```javascript
// API リクエスト例
POST https://{region}.api.cognitive.microsoft.com/customvoice/consents/{consentId}?api-version=2024-02-01-preview

// FormData に含まれるパラメータ
{
  projectId: "project-1234567890-abc123",
  voiceTalentName: "山田太郎",
  companyName: "Microsoft",
  audiodata: [WAVファイル],
  locale: "ja-JP"  // 選択された言語コード
}
```

## トラブルシューティング

### 同意書のアップロードに失敗する場合

1. **言語コードの確認**: 選択した言語が、実際の音声ファイルで使用した言語と一致しているか確認してください
2. **音声品質の確認**: WAV 形式で、16kHz、16bit、モノラルの音声ファイルを使用してください
3. **文例の確認**: Azure が提供するサンプル文例を正確に読み上げているか確認してください

## 関連リンク

- [Azure Personal Voice - 同意書の作成](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-create-consent)
- [サンプル文例（全言語）](https://github.com/Azure-Samples/Cognitive-Speech-TTS/blob/master/CustomVoice/script/verbal-statement-all-locales.txt)
- [Personal Voice 概要](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-overview)

## 更新履歴

| 日付 | バージョン | 変更内容 |
|------|-----------|---------|
| 2025-11-06 | 1.0.0 | 同意書言語選択機能の追加 |
