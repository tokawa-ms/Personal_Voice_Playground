# 同意書登録フォームフィールド機能

## 概要

同意書アップロード時に必要な話者名（`voiceTalentName`）と会社名（`companyName`）を、ユーザーがテキストボックスで入力できるようにする機能を実装しました。

## 実装日

2025年10月26日

## 背景

以前の実装では：
- `voiceTalentName`：プロジェクト名を流用していた
- `companyName`：'Personal Voice User'とハードコードされていた

これでは実際の話者名や企業名を正しく設定できないため、ユーザーが適切な値を入力できるように改善しました。

## 実装内容

### 1. HTML変更 (`src/index.html`)

同意書アップロードセクション（ステップ2）に以下の2つの入力フィールドを追加：

#### 話者名フィールド
```html
<div>
    <label for="voiceTalentName" class="block text-sm font-medium text-gray-700 mb-2">
        話者名 *
    </label>
    <input 
        type="text" 
        id="voiceTalentName" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="音声を提供する話者の名前を入力してください"
    >
    <p class="text-xs text-gray-500 mt-1">
        実際に音声を作る話者の名前を入力してください
    </p>
</div>
```

#### 会社名フィールド
```html
<div>
    <label for="companyName" class="block text-sm font-medium text-gray-700 mb-2">
        会社名 *
    </label>
    <input 
        type="text" 
        id="companyName" 
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="利用する会社名を入力してください"
    >
    <p class="text-xs text-gray-500 mt-1">
        Personal Voiceを利用する企業名を入力してください
    </p>
</div>
```

### 2. JavaScript変更 (`src/js/script.js`)

`uploadConsent` 関数を更新：

#### 変更前
```javascript
const consentFile = document.getElementById('consentFile').files[0];

// ... 省略 ...

formData.append('voiceTalentName', document.getElementById('projectName').value.trim() || 'Speaker');
formData.append('companyName', 'Personal Voice User');
```

#### 変更後
```javascript
const consentFile = document.getElementById('consentFile').files[0];
const voiceTalentName = document.getElementById('voiceTalentName').value.trim();
const companyName = document.getElementById('companyName').value.trim();

// バリデーション
if (!voiceTalentName) {
    console.error('話者名が入力されていません');
    showToast('話者名を入力してください', 'error');
    return;
}

if (!companyName) {
    console.error('会社名が入力されていません');
    showToast('会社名を入力してください', 'error');
    return;
}

// ... 省略 ...

console.log(`話者名: ${voiceTalentName}, 会社名: ${companyName}`);

formData.append('voiceTalentName', voiceTalentName);
formData.append('companyName', companyName);
```

## 機能詳細

### 入力フィールドの仕様

| フィールド | ID | 必須 | プレースホルダー | 説明 |
|----------|-----|-----|-----------------|------|
| 話者名 | `voiceTalentName` | ✓ | "音声を提供する話者の名前を入力してください" | 実際に音声を作る話者の名前 |
| 会社名 | `companyName` | ✓ | "利用する会社名を入力してください" | Personal Voiceを利用する企業名 |

### バリデーション

1. **話者名の検証**
   - 空の場合：「話者名を入力してください」というエラーメッセージを表示
   - コンソールログにエラーを出力

2. **会社名の検証**
   - 空の場合：「会社名を入力してください」というエラーメッセージを表示
   - コンソールログにエラーを出力

### ログ出力

デバッグのため、以下の情報がコンソールログに出力されます：

```javascript
console.log(`話者名: ${voiceTalentName}, 会社名: ${companyName}`);
```

## UI/UX改善

- 必須フィールドであることを示すアスタリスク（*）を表示
- 各フィールドの下に説明文を配置し、ユーザーが何を入力すべきか明確に示す
- Tailwind CSSを使用した統一感のあるデザイン
- フォーカス時に青色のリングが表示され、入力中のフィールドが視覚的に分かりやすい

## スクリーンショット

### 同意書アップロードセクション
![同意書セクション](https://github.com/user-attachments/assets/3d5bb314-cbb6-4a88-be9c-78cb187178fb)

## テスト結果

### 機能テスト
- ✅ 話者名が空の場合、適切なエラーメッセージが表示される
- ✅ 会社名が空の場合、適切なエラーメッセージが表示される
- ✅ 両方のフィールドに値を入力すると、正常に処理が進む
- ✅ コンソールログに正しい情報が出力される

### セキュリティテスト
- ✅ CodeQLチェック：脆弱性なし
- ✅ XSS対策：入力値は適切にエスケープされる（FormDataを使用）

### コードレビュー
- ✅ 自動コードレビュー：問題なし

## 影響範囲

### 変更されたファイル
- `src/index.html` - 同意書アップロードセクションに2つの入力フィールドを追加
- `src/js/script.js` - `uploadConsent`関数にバリデーションと入力値取得ロジックを追加

### 影響を受ける機能
- 同意書アップロード機能のみ（他の機能には影響なし）

## 使用方法

1. 「新規作成」タブを選択
2. ステップ1でプロジェクトを作成
3. ステップ2で以下を入力：
   - 同意書ファイル（WAV形式）を選択
   - **話者名**：実際に音声を提供する話者の名前を入力
   - **会社名**：Personal Voiceを利用する企業名を入力
4. 「同意書をアップロード」ボタンをクリック

## 技術的な注意事項

- 入力値は`trim()`メソッドで前後の空白が除去される
- バリデーションエラー時は処理が中断され、API呼び出しは行われない
- FormDataを使用してマルチパートリクエストを送信するため、特殊文字も安全に送信される

## 今後の改善案

- 話者名と会社名の文字数制限の追加
- 入力値のフォーマット検証（例：特殊文字の制限）
- 以前に入力した値の保存と自動補完機能
- 話者名と会社名のプリセット機能

## 参照

- Issue: [同意書の登録のためには、話者名と社名の入力が必要。テキストボックスで入れられるようにする。](https://github.com/tokawa-ms/Personal_Voice_Playground/issues/XX)
- Commit: 5c1e504 - 話者名と会社名の入力フィールドを同意書アップロードセクションに追加
