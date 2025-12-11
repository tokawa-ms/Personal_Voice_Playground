# Base Model API 連携機能

## 概要

Base Model の選択肢を、Azure Speech Service の Base Models API から動的に取得する機能を実装しました。

## 実装内容

### 1. API エンドポイント

以下の API エンドポイントを使用して、利用可能な Base Model の一覧を取得します：

```
GET https://{region}.api.cognitive.microsoft.com/customvoice/basemodels?api-version=2024-02-01-preview
```

### 2. 実装された機能

- **動的モデル取得**: Azure Speech Service への接続成功時に、自動的に Base Models API を呼び出してモデルリストを取得
- **Personal Voice フィルタリング**: 取得したモデルから Personal Voice に対応しているモデルのみを自動抽出
- **フォールバック機構**: API からの取得に失敗した場合は、デフォルトのモデルリストを使用
- **多言語対応**: 日本語・英語の両方に対応したメッセージを表示

### 3. 取得されるモデル情報

Base Models API から取得される各モデルには以下の情報が含まれます：

- `name`: モデル名（例: "DragonLatestNeural", "PhoenixV2Neural"）
- `description`: モデルの説明
- `capabilities`: モデルの機能（PersonalVoice 対応かどうか）
- `releaseDateTime`: モデルのリリース日時
- `expirationDateTime`: モデルの有効期限（オプション）

### 4. UI の変更点

#### 変更前
- Base Model のドロップダウンには、固定の3つのオプションが表示されていました
  - DragonLatestNeural
  - DragonV2.1Neural
  - PhoenixLatestNeural

#### 変更後
- 接続時に "Base Models を読み込んでいます..." というプレースホルダーが表示されます
- API から取得したモデルがドロップダウンに動的に表示されます
- モデルの説明がある場合は、モデル名と一緒に表示されます（例: "DragonLatestNeural - Dragon Latest Neural"）
- ヘルプテキストが追加され、API から自動取得されることが明示されます

### 5. エラーハンドリング

以下のシナリオに対応しています：

1. **API 呼び出し失敗**: エラーをコンソールにログ出力し、デフォルトモデルを使用
2. **ネットワークエラー**: 同様にデフォルトモデルにフォールバック
3. **空のレスポンス**: デフォルトモデルを使用

デフォルトモデル：
- DragonLatestNeural
- DragonV2.1Neural
- PhoenixLatestNeural
- PhoenixV2Neural

### 6. ログ出力

詳細なログ出力により、以下の情報がブラウザコンソールに表示されます：

- Base Models API 呼び出しの開始
- レスポンスのステータスコード
- 取得したモデルの数とモデル名のリスト
- エラー発生時のエラーメッセージ
- セレクターの更新状況

## 使用方法

### ユーザー側

1. Azure Speech Service のサブスクリプションキーとリージョンを入力
2. 「接続」ボタンをクリック
3. 接続成功後、Base Model のドロップダウンが自動的に更新されます
4. 利用可能なモデルの中から選択できます

### 開発者側

#### 関数の説明

**`fetchBaseModels()`**
- Base Models API を呼び出してモデルリストを取得します
- Personal Voice に対応したモデルのみをフィルタリングします
- エラー時はコンソールにログを出力し、処理を継続します

**`updateBaseModelSelector()`**
- Base Model のドロップダウンを更新します
- 取得したモデルがない場合はデフォルトモデルを使用します
- 以前の選択値がある場合は復元を試みます

#### グローバル変数

```javascript
let baseModels = []; // 取得した Base Model のリスト
```

#### 呼び出しタイミング

- `handleConnect()`: 手動接続成功時
- `autoConnect()`: 自動接続成功時

## API レスポンス例

```json
{
  "value": [
    {
      "name": "PhoenixV2Neural",
      "description": "Phoenix V2 base model",
      "releaseDateTime": "2023-12-01T00:00:00.000Z",
      "capabilities": [
        "PersonalVoice"
      ]
    },
    {
      "name": "DragonLatestNeural",
      "description": "Dragon Latest base model",
      "releaseDateTime": "2024-01-01T00:00:00.000Z",
      "capabilities": [
        "PersonalVoice"
      ]
    }
  ]
}
```

## 技術仕様

- **API バージョン**: 2024-02-01-preview
- **認証方式**: Ocp-Apim-Subscription-Key ヘッダー
- **HTTP メソッド**: GET
- **レスポンス形式**: JSON

## 参考資料

- [Base Models - List API リファレンス](https://learn.microsoft.com/ja-jp/rest/api/aiservices/speechapi/base-models/list?view=rest-aiservices-speechapi-2024-02-01-preview&tabs=HTTP)
- [Personal Voice の使用方法](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-how-to-use)

## 今後の拡張案

1. **モデル情報の詳細表示**: ツールチップやモーダルでモデルの詳細情報を表示
2. **モデルのソート機能**: リリース日時や名前でソート
3. **お気に入りモデル**: ユーザーが好みのモデルを保存できる機能
4. **モデルの有効期限通知**: 有効期限が近いモデルに警告を表示
