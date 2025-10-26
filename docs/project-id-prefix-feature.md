# プロジェクト ID プレフィックスのカスタマイズ機能

## 概要

Personal Voice プロジェクトを作成する際に、プロジェクト ID に使用するプレフィックスを UI 上で自由に指定できる機能です。

## 背景

以前のバージョンでは、プロジェクト ID のプレフィックスは "project" に固定されていました。この実装では、`generateUniqueId('project')` というハードコードされた値が使用されていました。

この制約により、以下の課題がありました：
- 複数のプロジェクトを区別しにくい
- プロジェクトの用途や種類をプレフィックスで識別できない
- カスタマイズの自由度が低い

## 実装内容

### UI の変更

**ステップ 1: プロジェクト作成** セクションに新しい入力フィールドを追加しました。

- **フィールド名**: プロジェクト ID プレフィックス
- **デフォルト値**: `project`
- **プレースホルダー**: プロジェクト ID のプレフィックスを入力してください
- **説明テキスト**: プロジェクト ID の先頭に付けるプレフィックスを指定できます（例: myvoice, personalvoice など）

### コードの変更

#### 定数の追加 (src/js/script.js)

```javascript
const API_CONFIG = {
    VERSION: '2024-02-01-preview',
    AUTO_CONNECT_DELAY: 1000,
    DEFAULT_PROJECT_ID_PREFIX: 'project' // デフォルトのプロジェクトIDプレフィックス
};
```

#### createProject 関数の改善

1. **安全な要素取得**: 要素が存在しない場合のエラー処理を追加
   ```javascript
   const projectIdPrefixElement = document.getElementById('projectIdPrefix');
   const projectIdPrefix = projectIdPrefixElement ? projectIdPrefixElement.value.trim() : '';
   ```

2. **プレフィックスの決定**: 入力値または定数のデフォルト値を使用
   ```javascript
   const prefix = projectIdPrefix || API_CONFIG.DEFAULT_PROJECT_ID_PREFIX;
   currentProjectId = generateUniqueId(prefix);
   ```

3. **ログ出力の強化**: 使用したプレフィックスをコンソールに出力
   ```javascript
   console.log(`使用したプレフィックス: ${prefix}`);
   ```

## プロジェクト ID の生成ルール

プロジェクト ID は以下の形式で生成されます：

```
{プレフィックス}-{タイムスタンプ}-{ランダム文字列}
```

### 例

- プレフィックス `myvoice` を指定した場合:
  ```
  myvoice-1729972800000-abc123x
  ```

- プレフィックス `personalvoice` を指定した場合:
  ```
  personalvoice-1729972800000-xyz789p
  ```

- プレフィックスを空にした場合（デフォルト "project" を使用）:
  ```
  project-1729972800000-def456y
  ```

## 使用方法

1. 「新規作成」タブを選択
2. 「プロジェクト ID プレフィックス」フィールドに任意の文字列を入力
   - 例: `myvoice`, `personalvoice`, `demo`, `test` など
   - 空のままにするとデフォルト値 `project` が使用されます
3. プロジェクト名とプロジェクト説明を入力
4. 「プロジェクトを作成」ボタンをクリック
5. 作成されたプロジェクト ID がステータス欄に表示されます

## 技術的な詳細

### コード品質の改善

1. **定数化**: デフォルト値をハードコードから定数 `API_CONFIG.DEFAULT_PROJECT_ID_PREFIX` に変更
   - メンテナンス性の向上
   - コードの重複を削減

2. **エラーハンドリング**: DOM 要素が存在しない場合の安全な処理
   - ランタイムエラーの防止
   - より堅牢なコード

3. **ロギング**: デバッグ用のログ出力を追加
   - 実際に使用されたプレフィックスを確認可能
   - トラブルシューティングが容易

## セキュリティ

- CodeQL によるセキュリティスキャンを実施し、問題がないことを確認済み
- XSS 攻撃への対策は既存の実装で対応済み（DOM 操作による安全な要素生成）
- ユーザー入力は `trim()` で空白を除去

## 今後の拡張可能性

- プレフィックスのバリデーション（使用可能文字の制限など）
- プレフィックスのプリセット選択機能
- 最近使用したプレフィックスの履歴表示
- プレフィックスに基づくプロジェクトの分類・フィルタリング

## 関連ドキュメント

- [機能仕様書](specification.md)
- [使用ガイド](usage-guide.md)
