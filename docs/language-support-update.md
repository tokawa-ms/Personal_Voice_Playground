# 音声合成対応言語の拡張

## 概要

Azure Personal Voice Playground の音声合成機能で、対応言語を 8 言語から 18 言語に拡張しました。

## 実装日
2025-10-27

## 変更内容

### 追加された言語（10言語）

1. **zh-TW** - 中国語 (台湾標準中国語、繁体字)
2. **zh-HK** - 中国語 (繁体字)
3. **vi-VN** - ベトナム語 (ベトナム)
4. **tr-TR** - トルコ語
5. **th-TH** - タイ語
6. **ms-MY** - マレー語 (マレーシア)
7. **en-SG** - 英語 (シンガポール)
8. **en-GB** - 英語 (イギリス)
9. **en-NZ** - 英語 (ニュージーランド)
10. **en-AU** - 英語 (オーストラリア)

### 表記が変更された言語（8言語）

言語コードを削除してよりシンプルで読みやすい表記に統一しました：

1. **ja-JP** - 旧: 日本語 (ja-JP) → 新: 日本語
2. **zh-CN** - 旧: 中国語 (zh-CN) → 新: 中国語 (標準、簡体字)
3. **en-US** - 旧: 英語 (en-US) → 新: 英語 (米国)
4. **ko-KR** - 旧: 韓国語 (ko-KR) → 新: 韓国語
5. **de-DE** - 旧: ドイツ語 (de-DE) → 新: ドイツ語
6. **fr-FR** - 旧: フランス語 (fr-FR) → 新: フランス語
7. **es-ES** - 旧: スペイン語 (es-ES) → 新: スペイン語
8. **it-IT** - 旧: イタリア語 (it-IT) → 新: イタリア語

## サポート言語一覧（全18言語）

### アジア太平洋地域
- 🇯🇵 日本語 (ja-JP)
- 🇨🇳 中国語 (標準、簡体字) - zh-CN
- 🇹🇼 中国語 (台湾標準中国語、繁体字) - zh-TW
- 🇭🇰 中国語 (繁体字) - zh-HK
- 🇰🇷 韓国語 (ko-KR)
- 🇻🇳 ベトナム語 (ベトナム) - vi-VN
- 🇹🇭 タイ語 - th-TH
- 🇲🇾 マレー語 (マレーシア) - ms-MY

### 英語圏
- 🇺🇸 英語 (米国) - en-US
- 🇬🇧 英語 (イギリス) - en-GB
- 🇦🇺 英語 (オーストラリア) - en-AU
- 🇳🇿 英語 (ニュージーランド) - en-NZ
- 🇸🇬 英語 (シンガポール) - en-SG

### ヨーロッパ
- 🇩🇪 ドイツ語 (de-DE)
- 🇫🇷 フランス語 (fr-FR)
- 🇪🇸 スペイン語 (es-ES)
- 🇮🇹 イタリア語 (it-IT)
- 🇹🇷 トルコ語 - tr-TR

## 技術的な詳細

### 変更されたファイル

1. **src/index.html** (行 298-325)
   - 言語選択ドロップダウン（`<select id="selectedLanguage">`）に新しいオプションを追加
   - 既存の言語の表記を変更

2. **docs/specification.md** (行 87-107)
   - サポート言語のリストを更新

3. **Readme.md**
   - 対応言語数を 8 言語から 18 言語に更新
   - 主な機能説明を更新

### 実装方法

言語選択ドロップダウンに `<option>` 要素を追加する形で実装されています。各オプションには以下の情報が含まれています：

```html
<option value="言語コード">表示名</option>
```

例：
```html
<option value="zh-TW">中国語 (台湾標準中国語、繁体字)</option>
<option value="en-GB">英語 (イギリス)</option>
```

### Azure Speech Service との互換性

これらの言語コードは Azure Speech Service の Personal Voice 機能でサポートされている言語コードに基づいています。音声合成時には、SSML の `xml:lang` 属性に選択された言語コードが設定されます。

## 使用方法

1. アプリケーションの「音声合成テスト」パネルを開く
2. 「言語を選択」ドロップダウンから希望の言語を選択
3. Personal Voice を選択
4. テキストを入力して「音声合成を実行」ボタンをクリック

## 注意事項

- Personal Voice の品質は、学習に使用した音声データの言語に依存します
- 学習データと異なる言語で合成を行う場合、音声の品質が低下する可能性があります
- すべての言語コードが Azure のすべてのリージョンでサポートされているとは限りません

## 今後の拡張可能性

Azure Speech Service が新しい言語をサポートした場合、同様の方法で追加できます：

1. `src/index.html` の言語選択ドロップダウンに新しい `<option>` を追加
2. `docs/specification.md` のサポート言語リストを更新
3. このドキュメントを更新

## 参考リンク

- [Azure Speech Service - 言語と音声のサポート](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/language-support)
- [Personal Voice 概要](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-overview)
