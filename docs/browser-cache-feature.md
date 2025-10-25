# ブラウザキャッシュ機能

## 概要

Azure Personal Voice Playground では、サブスクリプションキーとサービスリージョンをブラウザの localStorage に保存し、次回アクセス時に自動的に読み込む機能を実装しています。

## 機能詳細

### 1. 自動保存機能

接続ボタンをクリックして Azure Speech Service への接続に成功すると、入力されたサブスクリプションキーとサービスリージョンが自動的にブラウザの localStorage に保存されます。

**保存されるデータ:**
- サブスクリプションキー: `azureSpeech_subscriptionKey`
- サービスリージョン: `azureSpeech_serviceRegion`

### 2. 自動読み込み機能

ページを開いた際、localStorage に保存されたデータが存在する場合は、自動的に入力フィールドに設定されます。

**動作:**
- 保存データあり → 入力フィールドに自動入力 + 接続パネルを閉じた状態で表示
- 保存データなし → 入力フィールドは空 + 接続パネルを開いた状態で表示

### 3. UI の自動調整

保存されたデータの有無によって、接続設定パネルの表示状態が自動的に調整されます。

**初回アクセス時（保存データなし）:**
- 接続設定パネルが展開された状態
- ユーザーはすぐに設定を入力可能

**2回目以降のアクセス（保存データあり）:**
- 接続設定パネルが折りたたまれた状態
- 画面がすっきりと表示される
- 必要に応じて「表示」ボタンで展開可能

## 使用方法

### 初回設定

1. アプリケーションを開く
2. サブスクリプションキーを入力
3. サービスリージョンを入力（例: eastus）
4. 「接続」ボタンをクリック
5. 接続に成功すると、設定が自動的に保存される

### 2回目以降のアクセス

1. アプリケーションを開く
2. 保存された設定が自動的に読み込まれる
3. 接続パネルは閉じた状態で表示される
4. 必要に応じて「表示」ボタンで設定を確認・変更可能

### 設定の変更

1. 「表示」ボタンをクリックして接続パネルを展開
2. サブスクリプションキーまたはリージョンを変更
3. 「接続」ボタンをクリック
4. 新しい設定が保存される

### 設定のクリア

保存された設定をクリアしたい場合は、ブラウザの開発者ツールを使用します。

**Chrome / Edge:**
1. F12 キーを押して開発者ツールを開く
2. Console タブを選択
3. 以下のコマンドを実行:
   ```javascript
   localStorage.removeItem('azureSpeech_subscriptionKey');
   localStorage.removeItem('azureSpeech_serviceRegion');
   ```
4. ページをリロード

**Firefox:**
1. F12 キーを押して開発者ツールを開く
2. コンソールタブを選択
3. 上記と同じコマンドを実行
4. ページをリロード

## 技術仕様

### localStorage のキー

```javascript
const STORAGE_KEYS = {
    SUBSCRIPTION_KEY: 'azureSpeech_subscriptionKey',
    SERVICE_REGION: 'azureSpeech_serviceRegion'
};
```

### 主要な関数

#### loadSavedSettings()
ページ読み込み時に localStorage から設定を読み込みます。

```javascript
function loadSavedSettings() {
    const savedSubscriptionKey = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTION_KEY);
    const savedServiceRegion = localStorage.getItem(STORAGE_KEYS.SERVICE_REGION);
    
    if (savedSubscriptionKey && savedServiceRegion) {
        // 設定を入力フィールドに設定
        // 接続パネルを閉じる
    }
}
```

#### saveSettings(subscriptionKey, serviceRegion)
接続成功時に設定を localStorage に保存します。

```javascript
function saveSettings(subscriptionKey, serviceRegion) {
    localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION_KEY, subscriptionKey);
    localStorage.setItem(STORAGE_KEYS.SERVICE_REGION, serviceRegion);
}
```

## セキュリティとプライバシー

### 重要な注意事項

⚠️ **本機能はテスト・デモ用途を想定しています**

- サブスクリプションキーは localStorage に**平文**で保存されます
- localStorage のデータはブラウザ上に永続的に保存されます
- 共有PCや公共の環境では使用しないでください

### セキュリティのベストプラクティス

1. **個人のPC でのみ使用する**
   - 共有環境では設定をクリアすることをお勧めします

2. **定期的なキーのローテーション**
   - Azure Portal でサブスクリプションキーを定期的に再生成してください

3. **本番環境での使用について**
   - 本番環境では、より安全な認証方式（Azure AD、Managed Identity など）の使用を検討してください
   - バックエンドサーバーを経由した API 呼び出しを推奨します

## トラブルシューティング

### 設定が保存されない

**原因:**
- ブラウザのプライベートモード（シークレットモード）を使用している
- ブラウザの localStorage が無効化されている
- ブラウザのストレージ容量が不足している

**解決策:**
- 通常モードでブラウザを使用する
- ブラウザの設定で localStorage を有効にする
- ブラウザのキャッシュをクリアして再試行

### 古い設定が読み込まれる

**原因:**
- localStorage に古いデータが残っている

**解決策:**
1. 開発者ツールのコンソールで設定をクリア
2. ページをリロード
3. 新しい設定を入力して接続

### 接続パネルが自動的に閉じない

**原因:**
- 接続に失敗している
- localStorage へのアクセスがブロックされている

**解決策:**
1. ブラウザのコンソールでエラーを確認
2. 正しい認証情報で接続を試行
3. ブラウザの設定を確認

## デバッグ

### コンソールログの確認

アプリケーションは詳細なログを出力します。ブラウザの開発者ツール（F12）のコンソールタブで確認できます。

**保存データがある場合:**
```
保存された設定を読み込んでいます...
保存された設定が見つかりました
リージョン: eastus
接続パネルを折りたたんでいます...
保存された設定をフィールドに設定し、接続パネルを閉じました
```

**保存データがない場合:**
```
保存された設定を読み込んでいます...
保存された設定が見つかりません。接続パネルを開いた状態にします
```

**接続成功時:**
```
設定をブラウザキャッシュに保存しています...
設定の保存に成功しました
保存したリージョン: eastus
```

### localStorage の内容確認

開発者ツールのコンソールで以下を実行:

```javascript
console.log('Subscription Key:', localStorage.getItem('azureSpeech_subscriptionKey'));
console.log('Service Region:', localStorage.getItem('azureSpeech_serviceRegion'));
```

## まとめ

ブラウザキャッシュ機能により、ユーザーは毎回サブスクリプションキーとリージョンを入力する必要がなくなり、スムーズにアプリケーションを使用できます。ただし、セキュリティ上の制限があるため、テスト・デモ用途でのみ使用し、本番環境ではより安全な認証方式を検討してください。
