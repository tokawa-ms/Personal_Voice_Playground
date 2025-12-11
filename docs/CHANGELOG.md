# 変更履歴

## 2024-12-11: Base Model API 連携機能の追加

### 概要
Base Model の選択肢を、固定値から Azure Speech Service の Base Models API を使用した動的取得に変更しました。

### 主な変更点

#### 1. 新機能
- **Base Models API 連携**: `fetchBaseModels()` 関数を追加し、利用可能なモデルを API から取得
- **Personal Voice フィルタリング**: 取得したモデルから Personal Voice 対応モデルのみを自動抽出
- **動的セレクター更新**: `updateBaseModelSelector()` 関数で Base Model ドロップダウンを動的に更新

#### 2. UI の改善
- Base Model ドロップダウンにローディングメッセージを追加
- API から自動取得されることを示すヘルプテキストを追加
- モデルの説明を取得して表示に含める

#### 3. エラーハンドリング
- API 取得失敗時のフォールバック機能（デフォルトモデルを使用）
- 詳細なコンソールログによるデバッグサポート
- レスポンス構造の検証を追加

#### 4. 多言語対応
- 日本語と英語の両方に対応
- 新しいメッセージキーを追加：
  - `loadingBaseModels`: Base Models 読み込み中のメッセージ
  - `baseModelHelp`: Base Model 選択のヘルプテキスト

### 影響を受けるファイル

#### 変更されたファイル
- `src/index.html`: Base Model セレクターのHTMLを更新
- `src/js/script.js`: Base Models API 連携機能を実装
- `src/js/i18n.js`: 多言語メッセージを追加

#### 追加されたファイル
- `docs/base-model-api-integration.md`: 機能詳細ドキュメント
- `docs/CHANGELOG.md`: このファイル

### API 仕様

**エンドポイント**: 
```
GET https://{region}.api.cognitive.microsoft.com/customvoice/basemodels?api-version=2024-02-01-preview
```

**認証**: Ocp-Apim-Subscription-Key ヘッダー

**レスポンス例**:
```json
{
  "value": [
    {
      "name": "PhoenixV2Neural",
      "description": "Phoenix V2 base model",
      "releaseDateTime": "2023-12-01T00:00:00.000Z",
      "capabilities": ["PersonalVoice"]
    }
  ]
}
```

### デフォルトモデル

API 取得に失敗した場合、以下のデフォルトモデルが使用されます：
- DragonLatestNeural
- DragonV2.1Neural
- PhoenixLatestNeural
- PhoenixV2Neural

### セキュリティ

- CodeQL スキャン実施済み: 問題なし
- API キーは既存の接続設定を使用（変更なし）
- XSS 対策: DOM 操作による安全な要素生成

### テスト結果

- ✅ ページの初期読み込み
- ✅ ローディングメッセージの表示
- ✅ ヘルプテキストの表示
- ✅ エラーハンドリング（フォールバック機能）
- ✅ コードレビュー完了
- ✅ セキュリティスキャン完了

### 今後の改善案

1. モデル情報の詳細表示（ツールチップやモーダル）
2. モデルのソート機能
3. お気に入りモデルの保存機能
4. モデルの有効期限通知

### 参考資料

- [Base Models List API リファレンス](https://learn.microsoft.com/ja-jp/rest/api/aiservices/speechapi/base-models/list?view=rest-aiservices-speechapi-2024-02-01-preview&tabs=HTTP)
- [Personal Voice の使用方法](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-how-to-use)
