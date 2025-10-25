# Azure Personal Voice API 修正サマリー

## 修正日
2025年10月25日

## 問題の概要
script.js で使用されている REST API のパスが Azure の公式ドキュメントと一致していませんでした。古い API エンドポイントを使用していたため、実際の Azure Personal Voice サービスとの連携ができない状態でした。

## 修正内容の詳細

### 1. API エンドポイントのパス修正

#### 1.1 接続テスト
**修正前:**
```javascript
GET https://{region}.api.cognitive.microsoft.com/speechapi/tts/projects
```

**修正後:**
```javascript
GET https://{region}.api.cognitive.microsoft.com/customvoice/projects?api-version=2024-02-01-preview
```

#### 1.2 プロジェクト作成
**修正前:**
```javascript
POST https://{region}.api.cognitive.microsoft.com/speechapi/tts/projects
Content-Type: application/json

{
  "name": "プロジェクト名",
  "description": "説明",
  "locale": "ja-JP"
}
```

**修正後:**
```javascript
PUT https://{region}.api.cognitive.microsoft.com/customvoice/projects/{ProjectId}?api-version=2024-02-01-preview
Content-Type: application/json

{
  "description": "説明",
  "kind": "PersonalVoice"
}
```

**主な変更点:**
- HTTP メソッドを POST から PUT に変更
- URL にプロジェクト ID を含める
- `kind: "PersonalVoice"` フィールドを追加
- `name` と `locale` フィールドを削除

#### 1.3 同意書アップロード
**修正前:**
```javascript
POST https://{region}.api.cognitive.microsoft.com/speechapi/tts/projects/{projectId}/consents
Content-Type: application/json

{
  "audiodata": "base64エンコードされた音声データ",
  "locale": "ja-JP"
}
```

**修正後:**
```javascript
POST https://{region}.api.cognitive.microsoft.com/customvoice/consents/{ConsentId}?api-version=2024-02-01-preview
Content-Type: multipart/form-data

projectId: {ProjectId}
voiceTalentName: "話者名"
companyName: "会社名"
audiodata: [音声ファイル]
locale: "ja-JP"
```

**主な変更点:**
- URL パスを変更
- URL に同意書 ID を含める
- Content-Type を JSON から multipart/form-data に変更
- Base64 エンコーディングの代わりに直接ファイルを送信
- `projectId`, `voiceTalentName`, `companyName` フィールドを追加

#### 1.4 Personal Voice 作成（音声アップロード）
**修正前:**
```javascript
POST https://{region}.api.cognitive.microsoft.com/speechapi/tts/projects/{projectId}/speakers
Content-Type: application/json

{
  "name": "話者名",
  "audiodata": "base64エンコードされた音声データ",
  "consentId": "{ConsentId}",
  "locale": "ja-JP"
}
```

**修正後:**
```javascript
POST https://{region}.api.cognitive.microsoft.com/customvoice/personalvoices/{PersonalVoiceId}?api-version=2024-02-01-preview
Content-Type: multipart/form-data

projectId: {ProjectId}
consentId: {ConsentId}
audiodata: [音声ファイル]
```

**主な変更点:**
- URL パスを `/speakers` から `/personalvoices` に変更
- URL に Personal Voice ID を含める
- Content-Type を JSON から multipart/form-data に変更
- Base64 エンコーディングの代わりに直接ファイルを送信
- `name` と `locale` フィールドを削除

#### 1.5 Personal Voice リスト取得
**修正前:**
```javascript
GET https://{region}.api.cognitive.microsoft.com/speaker-recognition/profiles
```

**修正後:**
```javascript
GET https://{region}.api.cognitive.microsoft.com/customvoice/personalvoices?api-version=2024-02-01-preview
```

**主な変更点:**
- エンドポイントを Speaker Recognition API から Custom Voice API に変更
- レスポンス形式の変更に対応

#### 1.6 音声合成（SSML 形式）
**修正前:**
```xml
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ja-JP">
    <voice name="{VoiceId}">
        テキスト
    </voice>
</speak>
```

**修正後:**
```xml
<speak version="1.0" 
       xmlns="http://www.w3.org/2001/10/synthesis" 
       xmlns:mstts="http://www.w3.org/2001/mstts" 
       xml:lang="ja-JP">
    <voice name="DragonLatestNeural">
        <mstts:ttsembedding speakerProfileId="{SpeakerProfileId}">
            テキスト
        </mstts:ttsembedding>
    </voice>
</speak>
```

**主な変更点:**
- `mstts` 名前空間を追加
- Base model voice name（DragonLatestNeural）を指定
- `<mstts:ttsembedding>` 要素で `speakerProfileId` を指定

### 2. コードの改善

#### 2.1 ユニーク ID 生成関数の追加
```javascript
function generateUniqueId(prefix = '') {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
}
```

この関数は以下の場所で使用されます:
- プロジェクト ID の生成
- 同意書 ID の生成
- Personal Voice ID の生成

#### 2.2 グローバル変数の追加
```javascript
let currentPersonalVoiceId = null;
```

Personal Voice の ID を保存するための変数を追加しました。

#### 2.3 レスポンス処理の更新
Personal Voice リストのレスポンス形式が変更されたため、以下を更新:
- `voice.profileId` → `voice.speakerProfileId`
- `voice.name` → `voice.id`

### 3. API バージョンの統一
すべての Custom Voice API 呼び出しに `api-version=2024-02-01-preview` パラメータを追加しました。

## 影響範囲

### 変更されたファイル
1. **src/js/script.js**
   - すべての API 呼び出し関数を更新
   - ヘルパー関数を追加
   - レスポンス処理を更新

2. **docs/specification.md**
   - API エンドポイント情報を更新
   - リクエスト/レスポンス形式を更新
   - 注意事項を追加

### 互換性への影響
- **後方互換性なし**: 古い API エンドポイントは使用できません
- **データ移行不要**: 新しい API で新規にリソースを作成します

## 参照資料

### Azure 公式ドキュメント
1. [Personal Voice 概要](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-overview)
2. [プロジェクト作成](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-create-project)
3. [同意書の作成](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-create-consent)
4. [Personal Voice の作成](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-create-voice)
5. [使用方法](https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/personal-voice-how-to-use)

### API リファレンス
- [Projects API](https://learn.microsoft.com/en-us/rest/api/aiservices/speechapi/projects)
- [Consents API](https://learn.microsoft.com/en-us/rest/api/aiservices/speechapi/consents)
- [Personal Voices API](https://learn.microsoft.com/en-us/rest/api/aiservices/speechapi/personal-voices)

## CURL 例（修正後）

### プロジェクト作成
```bash
curl -v -X PUT \
  -H "Ocp-Apim-Subscription-Key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "My Personal Voice Project",
    "kind": "PersonalVoice"
  }' \
  "https://YOUR_REGION.api.cognitive.microsoft.com/customvoice/projects/my-project-id?api-version=2024-02-01-preview"
```

### 同意書アップロード
```bash
curl -v -X POST \
  -H "Ocp-Apim-Subscription-Key: YOUR_KEY" \
  -F "projectId=my-project-id" \
  -F "voiceTalentName=John Doe" \
  -F "companyName=My Company" \
  -F "audiodata=@consent.wav" \
  -F "locale=ja-JP" \
  "https://YOUR_REGION.api.cognitive.microsoft.com/customvoice/consents/my-consent-id?api-version=2024-02-01-preview"
```

### Personal Voice 作成
```bash
curl -v -X POST \
  -H "Ocp-Apim-Subscription-Key: YOUR_KEY" \
  -F "projectId=my-project-id" \
  -F "consentId=my-consent-id" \
  -F "audiodata=@voice-sample.wav" \
  "https://YOUR_REGION.api.cognitive.microsoft.com/customvoice/personalvoices/my-voice-id?api-version=2024-02-01-preview"
```

## テスト方法

1. Azure Portal で Speech Service リソースを作成
2. サブスクリプションキーとリージョンを取得
3. アプリケーションを開いて接続情報を入力
4. Personal Voice を作成してテスト
5. 音声合成が正常に動作することを確認

## 既知の制限事項

1. Personal Voice API はプレビュー版（`api-version=2024-02-01-preview`）です
2. Personal Voice の利用には申請が必要な場合があります
3. 音声ファイルは WAV 形式（16kHz、16bit、モノラル推奨）が必要です

## まとめ

この修正により、アプリケーションは Azure の最新の Personal Voice API と正しく連携できるようになりました。すべての API エンドポイントが公式ドキュメントに準拠し、正しいリクエスト形式とレスポンス処理が実装されています。
