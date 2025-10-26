# Voice ID プレフィックスのカスタマイズ機能

## 概要

Personal Voice の音声をアップロードする際に、Voice ID に使用するプレフィックスを UI 上で自由に指定できる機能です。

## 背景

以前のバージョンでは、Voice ID のプレフィックスは "personalvoice" に固定されていました。この実装では、`uploadVoice` 関数内で `generateUniqueId('personalvoice')` というハードコードされた値が使用されていました。

この制約により、以下の課題がありました：
- 複数の Personal Voice を区別しにくい
- Voice の用途や種類をプレフィックスで識別できない
- Personal Voice リストで Voice を特定しにくい
- カスタマイズの自由度が低い

## 実装内容

### UI の変更

**ステップ 3: 学習用音声アップロード** セクションに新しい入力フィールドを追加しました。

- **フィールド名**: Voice ID プレフィックス
- **デフォルト値**: `personalvoice`
- **プレースホルダー**: Voice ID のプレフィックスを入力してください
- **説明テキスト**: Voice ID の先頭に付けるプレフィックスを指定できます（例: myvoice, personalvoice など）。ここで設定した値を含む Voice 名が Voice List で表示されます。

### コードの変更

#### 定数の追加 (src/js/script.js)

```javascript
const API_CONFIG = {
    VERSION: '2024-02-01-preview',
    AUTO_CONNECT_DELAY: 1000,
    DEFAULT_PROJECT_ID_PREFIX: 'project',
    DEFAULT_VOICE_ID_PREFIX: 'personalvoice' // デフォルトのVoice IDプレフィックス
};
```

#### uploadVoice 関数の改善

1. **安全な要素取得**: 要素が存在しない場合のエラー処理を追加
   ```javascript
   const voiceIdPrefixElement = document.getElementById('voiceIdPrefix');
   const voiceIdPrefix = voiceIdPrefixElement ? voiceIdPrefixElement.value.trim() : '';
   ```

2. **プレフィックスの決定**: 入力値または定数のデフォルト値を使用
   ```javascript
   const prefix = voiceIdPrefix || API_CONFIG.DEFAULT_VOICE_ID_PREFIX;
   currentPersonalVoiceId = generateUniqueId(prefix);
   ```

3. **ログ出力の強化**: 使用したプレフィックスをコンソールに出力
   ```javascript
   console.log(`使用した Voice ID プレフィックス: ${prefix}`);
   ```

## Voice ID の生成ルール

Voice ID は以下の形式で生成されます：

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

- プレフィックス `testvoice` を指定した場合:
  ```
  testvoice-1729972800000-def456y
  ```

- プレフィックスを空にした場合（デフォルト "personalvoice" を使用）:
  ```
  personalvoice-1729972800000-ghi789z
  ```

## 使用方法

1. 「新規作成」タブを選択
2. ステップ 1 と ステップ 2 を完了する
3. ステップ 3 の「Voice ID プレフィックス」フィールドに任意の文字列を入力
   - 例: `myvoice`, `personalvoice`, `demo`, `testvoice` など
   - 空のままにするとデフォルト値 `personalvoice` が使用されます
4. 音声ファイル (WAV) を選択
5. 「音声をアップロード」ボタンをクリック
6. 作成された Personal Voice は、指定したプレフィックスを含む Voice 名で Voice List に表示されます

## Voice List での表示

Personal Voice リストで Voice を確認する際、指定した Voice ID プレフィックスが Voice 名の一部として表示されます。これにより、以下のメリットがあります：

- **識別の容易さ**: 複数の Personal Voice を用途や種類で区別できる
- **検索性の向上**: プレフィックスでフィルタリングや検索が可能
- **管理の効率化**: Voice の目的を一目で把握できる

## 技術的な詳細

### コード品質の改善

1. **定数化**: デフォルト値をハードコードから定数 `API_CONFIG.DEFAULT_VOICE_ID_PREFIX` に変更
   - メンテナンス性の向上
   - コードの重複を削減
   - 他の設定値との一貫性を保持

2. **エラーハンドリング**: DOM 要素が存在しない場合の安全な処理
   - ランタイムエラーの防止
   - より堅牢なコード

3. **ロギング**: デバッグ用のログ出力を追加
   - 実際に使用されたプレフィックスを確認可能
   - トラブルシューティングが容易

### プロジェクト ID プレフィックス機能との一貫性

この機能は、既存の「プロジェクト ID プレフィックス」機能と同様のパターンで実装されています：

- UI 入力フィールドの追加
- デフォルト値の定数化
- 安全な要素取得とフォールバック処理
- 詳細なログ出力

これにより、コードベース全体で一貫したアプローチが実現され、保守性が向上しています。

## セキュリティ

- ユーザー入力は `trim()` で空白を除去
- XSS 攻撃への対策は既存の実装で対応済み（DOM 操作による安全な要素生成）
- 入力値は API リクエストのパスパラメータとして使用されるため、適切にエンコードされる

## 今後の拡張可能性

- プレフィックスのバリデーション（使用可能文字の制限など）
- プレフィックスのプリセット選択機能
- 最近使用したプレフィックスの履歴表示
- プレフィックスに基づく Personal Voice の分類・フィルタリング
- プレフィックスと Voice の用途のマッピング

## 関連ドキュメント

- [プロジェクト ID プレフィックス機能](project-id-prefix-feature.md)
- [機能仕様書](specification.md)
- [使用ガイド](usage-guide.md)
