# 多言語UI機能 / Multilingual UI Feature

## 概要 / Overview

このドキュメントでは、Azure Personal Voice Playground に実装された多言語UI機能について説明します。

This document describes the multilingual UI feature implemented in Azure Personal Voice Playground.

## サポートされている言語 / Supported Languages

現在、以下の言語がサポートされています：

Currently, the following languages are supported:

- 日本語 (Japanese) - デフォルト / Default
- 英語 (English)

## 実装の詳細 / Implementation Details

### アーキテクチャ / Architecture

多言語対応は以下のコンポーネントで構成されています：

The multilingual support consists of the following components:

1. **i18n.js** - 言語リソースファイル / Language resource file
   - 日本語と英語の翻訳データを含む / Contains Japanese and English translation data
   - 言語切り替え機能を提供 / Provides language switching functionality
   - localStorage を使用して言語設定を保存 / Uses localStorage to persist language settings

2. **index.html** - UIマークアップ / UI Markup
   - `data-i18n` 属性で翻訳キーを指定 / Specifies translation keys with `data-i18n` attributes
   - `data-i18n-placeholder` 属性でプレースホルダーの翻訳を指定 / Specifies placeholder translations with `data-i18n-placeholder` attributes
   - 言語切り替えボタンを右上に配置 / Language switcher buttons positioned at top-right

3. **script.js** - メインアプリケーションロジック / Main application logic
   - `t()` 関数を使用して動的メッセージを翻訳 / Uses `t()` function to translate dynamic messages
   - 初期化時に保存された言語設定を読み込む / Loads saved language settings on initialization

### 主要な機能 / Key Features

#### 1. 言語切り替えボタン / Language Switcher Buttons

画面右上に日本語と英語の切り替えボタンが配置されています。

Language switcher buttons for Japanese and English are positioned at the top-right of the screen.

```html
<div class="fixed top-4 right-4 z-50 flex space-x-2">
    <button id="langJa">日本語</button>
    <button id="langEn">English</button>
</div>
```

#### 2. 動的な言語適用 / Dynamic Language Application

`data-i18n` 属性を持つ全ての要素が自動的に翻訳されます：

All elements with `data-i18n` attributes are automatically translated:

```html
<h2 data-i18n="connectionSettings">Azure Speech Service 接続設定</h2>
```

プレースホルダーテキストも翻訳されます：

Placeholder text is also translated:

```html
<input 
    type="text" 
    data-i18n-placeholder="subscriptionKeyPlaceholder"
    placeholder="Azure Speech Service のサブスクリプションキーを入力してください"
>
```

#### 3. localStorage による永続化 / Persistence with localStorage

選択された言語設定は localStorage に保存され、ページをリロードしても保持されます。

The selected language setting is saved to localStorage and persists across page reloads.

```javascript
const LANGUAGE_STORAGE_KEY = 'azureSpeech_language';
localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
```

#### 4. 動的メッセージの翻訳 / Translation of Dynamic Messages

JavaScriptで生成される動的なメッセージも `t()` 関数を使用して翻訳されます：

Dynamic messages generated in JavaScript are also translated using the `t()` function:

```javascript
showToast(t('connectionSuccess'), 'success');
updateStatus('connectionStatus', t('connecting'), 'info');
```

## 使用方法 / Usage

### エンドユーザー向け / For End Users

1. 画面右上の言語切り替えボタンをクリック
2. 希望する言語（日本語または英語）を選択
3. UI全体が即座に選択した言語に切り替わります
4. 選択した言語はブラウザに保存され、次回アクセス時も適用されます

---

1. Click the language switcher button at the top-right of the screen
2. Select your preferred language (Japanese or English)
3. The entire UI will immediately switch to the selected language
4. Your language preference is saved in the browser and will be applied on your next visit

### 開発者向け / For Developers

#### 新しいテキストの追加 / Adding New Text

新しいUIテキストを追加する場合：

To add new UI text:

1. **i18n.js に翻訳を追加 / Add translations to i18n.js**

```javascript
const i18n = {
    ja: {
        newKey: '新しいテキスト'
    },
    en: {
        newKey: 'New text'
    }
};
```

2. **HTML に data-i18n 属性を追加 / Add data-i18n attribute to HTML**

```html
<button data-i18n="newKey">新しいテキスト</button>
```

または JavaScript で使用 / Or use in JavaScript:

```javascript
showToast(t('newKey'), 'success');
```

#### 新しい言語の追加 / Adding New Languages

新しい言語を追加する場合：

To add a new language:

1. **i18n.js に新しい言語オブジェクトを追加**

```javascript
const i18n = {
    ja: { /* ... */ },
    en: { /* ... */ },
    fr: {
        pageTitle: 'Azure Personal Voice Playground',
        connectionSettings: 'Paramètres de connexion Azure Speech Service',
        // ... すべてのキーを翻訳
    }
};
```

2. **HTML に言語切り替えボタンを追加**

```html
<button id="langFr" class="...">Français</button>
```

3. **イベントリスナーを追加**

```javascript
document.getElementById('langFr').addEventListener('click', () => setLanguage('fr'));
```

## 翻訳カバレッジ / Translation Coverage

以下のUI要素が翻訳されています：

The following UI elements are translated:

### 接続設定パネル / Connection Settings Panel
- タイトル、ラベル、プレースホルダー、ボタン
- Titles, labels, placeholders, buttons

### Personal Voice 管理 / Personal Voice Management
- タブ、ボタン、ラベル
- Tabs, buttons, labels
- プロジェクト作成フォーム
- Project creation form
- 同意書アップロードフォーム
- Consent upload form
- 音声アップロードフォーム
- Voice upload form

### 音声合成テスト / Speech Synthesis Test
- ラベル、プレースホルダー、ボタン
- Labels, placeholders, buttons
- 言語選択オプション
- Language selection options

### 動的メッセージ / Dynamic Messages
- 成功メッセージ
- Success messages
- エラーメッセージ
- Error messages
- バリデーションメッセージ
- Validation messages
- ステータスメッセージ
- Status messages

## 技術仕様 / Technical Specifications

### ファイル構成 / File Structure

```
src/
├── index.html          # data-i18n 属性を含むUI
├── js/
│   ├── i18n.js        # 翻訳リソースと言語切り替えロジック
│   └── script.js      # t() 関数を使用したメインアプリケーション
```

### 主要な関数 / Key Functions

#### `t(key)` - 翻訳取得関数 / Translation Function

指定されたキーの翻訳を現在の言語で取得します。

Gets the translation for the specified key in the current language.

```javascript
const text = t('connectionSuccess'); // "接続成功！" or "Connection successful!"
```

#### `setLanguage(lang)` - 言語設定関数 / Language Setting Function

言語を切り替えて、UIを更新します。

Switches the language and updates the UI.

```javascript
setLanguage('en'); // 英語に切り替え / Switch to English
setLanguage('ja'); // 日本語に切り替え / Switch to Japanese
```

#### `applyLanguage()` - 言語適用関数 / Language Application Function

現在の言語をページ全体に適用します。

Applies the current language to the entire page.

```javascript
applyLanguage(); // すべての data-i18n 要素を更新 / Updates all data-i18n elements
```

#### `loadLanguageSettings()` - 言語設定読み込み関数 / Language Settings Loading Function

localStorage から保存された言語設定を読み込みます。

Loads saved language settings from localStorage.

```javascript
loadLanguageSettings(); // 初期化時に呼び出される / Called on initialization
```

## ベストプラクティス / Best Practices

1. **一貫性のあるキー命名 / Consistent Key Naming**
   - 説明的なキー名を使用する / Use descriptive key names
   - camelCase を使用する / Use camelCase
   - 例: `connectionSettings`, `pleaseEnterProjectName`

2. **翻訳の完全性 / Translation Completeness**
   - 新しいキーを追加する際は、すべてのサポート言語に翻訳を追加
   - Add translations for all supported languages when adding new keys

3. **コンテキストの提供 / Provide Context**
   - 翻訳者のために、キー名から意味が分かるようにする
   - Make key names self-explanatory for translators

4. **テスト / Testing**
   - 各言語でUIをテストして、レイアウトが崩れないことを確認
   - Test the UI in each language to ensure layout doesn't break
   - 長い翻訳テキストに対応できることを確認
   - Ensure long translation texts are handled properly

## トラブルシューティング / Troubleshooting

### 翻訳が表示されない / Translations Not Showing

1. ブラウザのコンソールで翻訳キーのログを確認
2. i18n.js に該当するキーが存在するか確認
3. data-i18n 属性が正しく設定されているか確認

---

1. Check translation key logs in browser console
2. Verify the key exists in i18n.js
3. Ensure data-i18n attribute is correctly set

### 言語設定が保存されない / Language Settings Not Persisting

1. ブラウザが localStorage をサポートしているか確認
2. プライベートブラウジングモードでないか確認
3. ブラウザの開発者ツールで localStorage を確認

---

1. Check if browser supports localStorage
2. Ensure not in private browsing mode
3. Check localStorage in browser developer tools

## 今後の拡張 / Future Enhancements

以下の機能拡張が検討できます：

The following enhancements can be considered:

1. **追加言語のサポート / Additional Language Support**
   - 中国語、韓国語、フランス語、ドイツ語など
   - Chinese, Korean, French, German, etc.

2. **ブラウザ言語の自動検出 / Automatic Browser Language Detection**
   - navigator.language を使用した自動言語選択
   - Automatic language selection using navigator.language

3. **RTL言語のサポート / RTL Language Support**
   - アラビア語、ヘブライ語などの右から左へ読む言語のサポート
   - Support for right-to-left languages like Arabic and Hebrew

4. **翻訳ファイルの外部化 / Externalize Translation Files**
   - JSON ファイルとして翻訳データを管理
   - Manage translation data as JSON files

## まとめ / Summary

この多言語UI機能により、Azure Personal Voice Playground は日本語と英語の両方のユーザーにアクセス可能になりました。実装はシンプルで保守性が高く、将来的な言語追加も容易です。

This multilingual UI feature makes Azure Personal Voice Playground accessible to both Japanese and English users. The implementation is simple, maintainable, and easy to extend with additional languages in the future.
