// Azure Personal Voice Playground - Main Script
// このスクリプトは Azure Speech Service の Personal Voice 機能を管理します

// グローバル変数
let config = {
    subscriptionKey: '',
    serviceRegion: '',
    isConnected: false
};

let currentProjectId = null;
let currentConsentId = null;
let currentPersonalVoiceId = null;
let voices = [];

// localStorage のキー
const STORAGE_KEYS = {
    SUBSCRIPTION_KEY: 'azureSpeech_subscriptionKey',
    SERVICE_REGION: 'azureSpeech_serviceRegion'
};

// API設定
const API_CONFIG = {
    VERSION: '2024-02-01-preview',
    AUTO_CONNECT_DELAY: 1000, // メインコンテンツ表示前の遅延時間（ミリ秒）
    DEFAULT_PROJECT_ID_PREFIX: 'project' // デフォルトのプロジェクトIDプレフィックス
};

// ユニークな ID を生成するヘルパー関数
function generateUniqueId(prefix = '') {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('アプリケーションを初期化しています...');
    initializeEventListeners();
    loadSavedSettings();
    console.log('イベントリスナーの初期化が完了しました');
});

// イベントリスナーの初期化
function initializeEventListeners() {
    console.log('イベントリスナーを設定しています...');
    
    // 接続パネル
    document.getElementById('connectButton').addEventListener('click', handleConnect);
    document.getElementById('toggleConnectionPanel').addEventListener('click', toggleConnectionPanel);
    
    // タブ切り替え
    document.getElementById('listTab').addEventListener('click', () => switchTab('list'));
    document.getElementById('createTab').addEventListener('click', () => switchTab('create'));
    
    // Personal Voice リスト
    document.getElementById('refreshVoicesButton').addEventListener('click', refreshVoiceList);
    
    // 新規作成フロー
    document.getElementById('createProjectButton').addEventListener('click', createProject);
    document.getElementById('uploadConsentButton').addEventListener('click', uploadConsent);
    document.getElementById('uploadVoiceButton').addEventListener('click', uploadVoice);
    
    // 音声合成
    document.getElementById('synthesizeButton').addEventListener('click', synthesizeSpeech);
    document.getElementById('downloadAudioButton').addEventListener('click', downloadAudio);
    
    console.log('すべてのイベントリスナーが設定されました');
}

// 保存された設定を読み込む
function loadSavedSettings() {
    console.log('保存された設定を読み込んでいます...');
    
    try {
        const savedSubscriptionKey = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTION_KEY);
        const savedServiceRegion = localStorage.getItem(STORAGE_KEYS.SERVICE_REGION);
        
        if (savedSubscriptionKey && savedServiceRegion) {
            console.log('保存された設定が見つかりました');
            console.log(`リージョン: ${savedServiceRegion}`);
            
            // フィールドに値を設定
            document.getElementById('subscriptionKey').value = savedSubscriptionKey;
            document.getElementById('serviceRegion').value = savedServiceRegion;
            
            // 接続パネルを閉じる
            collapseConnectionPanel();
            
            console.log('保存された設定をフィールドに設定し、接続パネルを閉じました');
            console.log('自動接続を試行します...');
            
            // 自動接続を試行
            autoConnect();
        } else {
            console.log('保存された設定が見つかりません。接続パネルを開いた状態にします');
            // 接続パネルは開いたまま（デフォルト状態）
        }
    } catch (error) {
        console.error('設定の読み込みエラー:', error);
        console.log('エラーが発生しましたが、接続パネルは開いた状態を維持します');
    }
}

// 設定を保存する
function saveSettings(subscriptionKey, serviceRegion) {
    console.log('設定をブラウザキャッシュに保存しています...');
    
    try {
        localStorage.setItem(STORAGE_KEYS.SUBSCRIPTION_KEY, subscriptionKey);
        localStorage.setItem(STORAGE_KEYS.SERVICE_REGION, serviceRegion);
        console.log('設定の保存に成功しました');
        console.log(`保存したリージョン: ${serviceRegion}`);
    } catch (error) {
        console.error('設定の保存エラー:', error);
        console.log('設定の保存に失敗しましたが、アプリケーションは動作を継続します');
    }
}

// 接続処理
async function handleConnect() {
    console.log('Azure Speech Service への接続を開始しています...');
    
    const subscriptionKey = document.getElementById('subscriptionKey').value.trim();
    const serviceRegion = document.getElementById('serviceRegion').value.trim();
    
    if (!subscriptionKey || !serviceRegion) {
        console.error('サブスクリプションキーまたはサービスリージョンが入力されていません');
        showToast('サブスクリプションキーとサービスリージョンを入力してください', 'error');
        return;
    }
    
    config.subscriptionKey = subscriptionKey;
    config.serviceRegion = serviceRegion;
    
    showSpinner('connectionSpinner', true);
    updateStatus('connectionStatus', '接続確認中...', 'info');
    
    try {
        console.log(`リージョン: ${serviceRegion} に接続しています...`);
        // 接続テスト: プロジェクトリストの取得を試みる
        const response = await fetch(
            `https://${serviceRegion}.api.cognitive.microsoft.com/customvoice/projects?api-version=${API_CONFIG.VERSION}`,
            {
                method: 'GET',
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey
                }
            }
        );
        
        console.log(`接続テストのレスポンスステータス: ${response.status}`);
        
        if (response.ok) {
            config.isConnected = true;
            console.log('Azure Speech Service への接続に成功しました');
            updateStatus('connectionStatus', '接続成功！', 'success');
            showToast('Azure Speech Service に接続しました', 'success');
            
            // 設定をブラウザキャッシュに保存
            saveSettings(subscriptionKey, serviceRegion);
            
            // 接続パネルを閉じてメインコンテンツを表示
            setTimeout(() => {
                collapseConnectionPanel();
                document.getElementById('mainContent').classList.remove('hidden');
                // 初期データを読み込み
                refreshVoiceList();
            }, 1000);
        } else {
            console.error(`接続に失敗しました: ${response.status} ${response.statusText}`);
            throw new Error(`接続に失敗しました: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('接続エラー:', error);
        config.isConnected = false;
        updateStatus('connectionStatus', '接続失敗', 'error');
        showToast('接続に失敗しました。キーとリージョンを確認してください', 'error');
    } finally {
        showSpinner('connectionSpinner', false);
    }
}

// 自動接続処理
async function autoConnect() {
    console.log('自動接続を開始しています...');
    
    const subscriptionKey = document.getElementById('subscriptionKey').value.trim();
    const serviceRegion = document.getElementById('serviceRegion').value.trim();
    
    if (!subscriptionKey || !serviceRegion) {
        console.error('自動接続: サブスクリプションキーまたはサービスリージョンが入力されていません');
        expandConnectionPanel();
        return;
    }
    
    config.subscriptionKey = subscriptionKey;
    config.serviceRegion = serviceRegion;
    
    showSpinner('connectionSpinner', true);
    updateStatus('connectionStatus', '自動接続中...', 'info');
    
    try {
        console.log(`自動接続: リージョン ${serviceRegion} に接続しています...`);
        // 接続テスト: プロジェクトリストの取得を試みる
        const response = await fetch(
            `https://${serviceRegion}.api.cognitive.microsoft.com/customvoice/projects?api-version=${API_CONFIG.VERSION}`,
            {
                method: 'GET',
                headers: {
                    'Ocp-Apim-Subscription-Key': subscriptionKey
                }
            }
        );
        
        console.log(`自動接続: 接続テストのレスポンスステータス: ${response.status}`);
        
        if (response.ok) {
            config.isConnected = true;
            console.log('自動接続: Azure Speech Service への接続に成功しました');
            updateStatus('connectionStatus', '自動接続成功！', 'success');
            showToast('保存された設定で自動接続しました', 'success');
            
            // メインコンテンツを表示
            setTimeout(() => {
                document.getElementById('mainContent').classList.remove('hidden');
                // 初期データを読み込み
                refreshVoiceList();
            }, API_CONFIG.AUTO_CONNECT_DELAY);
        } else {
            console.error(`自動接続失敗: ${response.status} ${response.statusText}`);
            throw new Error(`自動接続に失敗しました: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('自動接続エラー:', error);
        config.isConnected = false;
        updateStatus('connectionStatus', '自動接続失敗 - 手動で接続してください', 'error');
        showToast('自動接続に失敗しました。設定を確認して手動で接続してください', 'error');
        // 接続パネルを展開して手動接続を促す
        expandConnectionPanel();
    } finally {
        showSpinner('connectionSpinner', false);
    }
}

// 接続パネルの展開
function expandConnectionPanel() {
    console.log('接続パネルを展開しています...');
    const panel = document.getElementById('connectionPanel');
    const form = document.getElementById('connectionForm');
    const toggleBtn = document.getElementById('toggleConnectionPanel');
    
    panel.classList.remove('connection-panel-collapsed');
    panel.classList.add('connection-panel-expanded');
    form.classList.remove('hidden');
    toggleBtn.classList.add('hidden');
}

// 接続パネルの折りたたみ
function collapseConnectionPanel() {
    console.log('接続パネルを折りたたんでいます...');
    const panel = document.getElementById('connectionPanel');
    const form = document.getElementById('connectionForm');
    const toggleBtn = document.getElementById('toggleConnectionPanel');
    
    panel.classList.remove('connection-panel-expanded');
    panel.classList.add('connection-panel-collapsed');
    form.classList.add('hidden');
    toggleBtn.classList.remove('hidden');
}

// 接続パネルのトグル
function toggleConnectionPanel() {
    console.log('接続パネルの表示状態を切り替えています...');
    const panel = document.getElementById('connectionPanel');
    const form = document.getElementById('connectionForm');
    const toggleBtn = document.getElementById('toggleConnectionPanel');
    
    if (panel.classList.contains('connection-panel-collapsed')) {
        panel.classList.remove('connection-panel-collapsed');
        panel.classList.add('connection-panel-expanded');
        form.classList.remove('hidden');
        toggleBtn.classList.add('hidden');
    } else {
        collapseConnectionPanel();
    }
}

// タブ切り替え
function switchTab(tab) {
    console.log(`タブを切り替えています: ${tab}`);
    
    const listTab = document.getElementById('listTab');
    const createTab = document.getElementById('createTab');
    const listPanel = document.getElementById('listPanel');
    const createPanel = document.getElementById('createPanel');
    
    if (tab === 'list') {
        listTab.classList.add('border-blue-500', 'text-blue-600');
        listTab.classList.remove('border-transparent', 'text-gray-500');
        createTab.classList.remove('border-blue-500', 'text-blue-600');
        createTab.classList.add('border-transparent', 'text-gray-500');
        
        listPanel.classList.remove('hidden');
        createPanel.classList.add('hidden');
    } else {
        createTab.classList.add('border-blue-500', 'text-blue-600');
        createTab.classList.remove('border-transparent', 'text-gray-500');
        listTab.classList.remove('border-blue-500', 'text-blue-600');
        listTab.classList.add('border-transparent', 'text-gray-500');
        
        createPanel.classList.remove('hidden');
        listPanel.classList.add('hidden');
    }
}

// Personal Voice リストの更新
async function refreshVoiceList() {
    console.log('Personal Voice リストを更新しています...');
    
    if (!config.isConnected) {
        console.warn('Speech Service に接続していません');
        showToast('先に Azure Speech Service に接続してください', 'error');
        return;
    }
    
    showSpinner('voiceListSpinner', true);
    const voiceListContainer = document.getElementById('voiceList');
    voiceListContainer.innerHTML = '';
    
    try {
        console.log('話者プロファイルを取得しています...');
        const response = await fetch(
            `https://${config.serviceRegion}.api.cognitive.microsoft.com/customvoice/personalvoices?api-version=${API_CONFIG.VERSION}`,
            {
                method: 'GET',
                headers: {
                    'Ocp-Apim-Subscription-Key': config.subscriptionKey
                }
            }
        );
        
        console.log(`話者プロファイル取得のレスポンスステータス: ${response.status}`);
        
        if (response.ok) {
            const data = await response.json();
            voices = Array.isArray(data) ? data : (data.value || []);
            console.log(`${voices.length} 件の Personal Voice を取得しました`);
            
            if (voices.length === 0) {
                voiceListContainer.innerHTML = '<p class="text-gray-500 text-center py-4">Personal Voice が見つかりません</p>';
            } else {
                voices.forEach(voice => {
                    const voiceCard = createVoiceCard(voice);
                    voiceListContainer.appendChild(voiceCard);
                });
                
                // 音声合成用のセレクトボックスも更新
                updateVoiceSelector();
            }
            
            showToast('Personal Voice リストを更新しました', 'success');
        } else {
            const errorText = await response.text();
            console.error('リスト取得エラー:', errorText);
            throw new Error('Personal Voice の取得に失敗しました');
        }
    } catch (error) {
        console.error('Personal Voice リストの取得エラー:', error);
        voiceListContainer.innerHTML = '<p class="text-red-500 text-center py-4">リストの取得に失敗しました</p>';
        showToast('Personal Voice リストの取得に失敗しました', 'error');
    } finally {
        showSpinner('voiceListSpinner', false);
    }
}

// Voice カードの作成
function createVoiceCard(voice) {
    console.log('Voice カードを作成しています:', voice);
    
    const card = document.createElement('div');
    card.className = 'border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer';
    
    const voiceId = voice.speakerProfileId || voice.id || 'unknown';
    const voiceName = voice.id || voice.name || voiceId;
    
    // XSS 対策: DOM 操作で安全に要素を作成
    const contentDiv = document.createElement('div');
    contentDiv.className = 'flex justify-between items-start';
    
    const infoDiv = document.createElement('div');
    
    const nameHeading = document.createElement('h4');
    nameHeading.className = 'font-semibold text-gray-800';
    nameHeading.textContent = voiceName;
    
    const idParagraph = document.createElement('p');
    idParagraph.className = 'text-sm text-gray-600';
    idParagraph.textContent = `Speaker Profile ID: ${voiceId}`;
    
    infoDiv.appendChild(nameHeading);
    infoDiv.appendChild(idParagraph);
    
    if (voice.status) {
        const statusParagraph = document.createElement('p');
        statusParagraph.className = 'text-xs text-gray-500';
        statusParagraph.textContent = `ステータス: ${voice.status}`;
        infoDiv.appendChild(statusParagraph);
    }
    
    const selectButton = document.createElement('button');
    selectButton.className = 'select-voice-btn px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600';
    selectButton.textContent = '選択';
    selectButton.setAttribute('data-voice-id', voiceId);
    selectButton.addEventListener('click', (e) => {
        e.stopPropagation();
        selectVoiceForSynthesis(voiceId);
    });
    
    contentDiv.appendChild(infoDiv);
    contentDiv.appendChild(selectButton);
    card.appendChild(contentDiv);
    
    return card;
}

// 音声合成用の Voice を選択
function selectVoiceForSynthesis(voiceId) {
    console.log(`音声合成用に Voice を選択しました: ${voiceId}`);
    const selector = document.getElementById('selectedVoice');
    selector.value = voiceId;
    showToast('Personal Voice を選択しました', 'success');
    
    // 右側パネルにスクロール（安全な方法で）
    const rightPanel = document.getElementById('mainContent');
    if (rightPanel) {
        const synthesisPanel = rightPanel.querySelector('.lg\\:grid-cols-2');
        if (synthesisPanel && synthesisPanel.children.length > 1) {
            synthesisPanel.children[1].scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Voice セレクターの更新
function updateVoiceSelector() {
    console.log('Voice セレクターを更新しています...');
    const selector = document.getElementById('selectedVoice');
    const currentValue = selector.value;
    
    // オプションをクリア（最初のプレースホルダーは残す）
    selector.innerHTML = '<option value="">-- Personal Voice を選択してください --</option>';
    
    voices.forEach(voice => {
        const option = document.createElement('option');
        const voiceId = voice.speakerProfileId || voice.id || 'unknown';
        const voiceName = voice.id || voice.name || voiceId;
        option.value = voiceId;
        option.textContent = voiceName;
        selector.appendChild(option);
    });
    
    // 以前の選択を復元
    if (currentValue) {
        selector.value = currentValue;
    }
    
    console.log(`${voices.length} 件の Voice をセレクターに追加しました`);
}

// プロジェクトの作成
async function createProject() {
    console.log('新規プロジェクトを作成しています...');
    
    const projectIdPrefixElement = document.getElementById('projectIdPrefix');
    const projectIdPrefix = projectIdPrefixElement ? projectIdPrefixElement.value.trim() : '';
    const projectName = document.getElementById('projectName').value.trim();
    const projectDescription = document.getElementById('projectDescription').value.trim();
    
    if (!projectName) {
        console.error('プロジェクト名が入力されていません');
        showToast('プロジェクト名を入力してください', 'error');
        return;
    }
    
    updateStatus('projectStatus', 'プロジェクトを作成中...', 'info');
    
    try {
        // 一意のプロジェクト ID を生成（カスタムプレフィックスを使用）
        const prefix = projectIdPrefix || API_CONFIG.DEFAULT_PROJECT_ID_PREFIX;
        currentProjectId = generateUniqueId(prefix);
        console.log(`プロジェクト "${projectName}" を作成しています... (ID: ${currentProjectId})`);
        console.log(`使用したプレフィックス: ${prefix}`);
        
        const response = await fetch(
            `https://${config.serviceRegion}.api.cognitive.microsoft.com/customvoice/projects/${currentProjectId}?api-version=${API_CONFIG.VERSION}`,
            {
                method: 'PUT',
                headers: {
                    'Ocp-Apim-Subscription-Key': config.subscriptionKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: projectDescription || projectName,
                    kind: 'PersonalVoice'
                })
            }
        );
        
        console.log(`プロジェクト作成のレスポンスステータス: ${response.status}`);
        
        if (response.ok) {
            const project = await response.json();
            console.log('プロジェクトを作成しました:', project);
            updateStatus('projectStatus', `プロジェクト作成成功！ ID: ${currentProjectId}`, 'success');
            showToast('プロジェクトを作成しました', 'success');
            
            // 次のステップのボタンを有効化
            document.getElementById('uploadConsentButton').disabled = false;
        } else {
            const errorText = await response.text();
            console.error('プロジェクト作成エラー:', errorText);
            throw new Error('プロジェクトの作成に失敗しました');
        }
    } catch (error) {
        console.error('プロジェクト作成エラー:', error);
        currentProjectId = null;
        updateStatus('projectStatus', 'プロジェクト作成に失敗しました', 'error');
        showToast('プロジェクトの作成に失敗しました', 'error');
    }
}

// 同意書のアップロード
async function uploadConsent() {
    console.log('同意書をアップロードしています...');
    
    const consentFile = document.getElementById('consentFile').files[0];
    const voiceTalentName = document.getElementById('voiceTalentName').value.trim();
    const companyName = document.getElementById('companyName').value.trim();
    
    if (!consentFile) {
        console.error('同意書ファイルが選択されていません');
        showToast('同意書ファイルを選択してください', 'error');
        return;
    }
    
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
    
    if (!currentProjectId) {
        console.error('プロジェクトが作成されていません');
        showToast('先にプロジェクトを作成してください', 'error');
        return;
    }
    
    updateStatus('consentStatus', '同意書をアップロード中...', 'info');
    
    try {
        // 一意の同意書 ID を生成
        currentConsentId = generateUniqueId('consent');
        console.log(`同意書ファイル "${consentFile.name}" をアップロードしています... (ID: ${currentConsentId})`);
        console.log(`話者名: ${voiceTalentName}, 会社名: ${companyName}`);
        
        // FormData を使用してマルチパートリクエストを構築
        const formData = new FormData();
        formData.append('projectId', currentProjectId);
        formData.append('voiceTalentName', voiceTalentName);
        formData.append('companyName', companyName);
        formData.append('audiodata', consentFile);
        formData.append('locale', 'ja-JP');
        
        const response = await fetch(
            `https://${config.serviceRegion}.api.cognitive.microsoft.com/customvoice/consents/${currentConsentId}?api-version=${API_CONFIG.VERSION}`,
            {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key': config.subscriptionKey
                },
                body: formData
            }
        );
        
        console.log(`同意書アップロードのレスポンスステータス: ${response.status}`);
        
        if (response.ok) {
            const consent = await response.json();
            console.log('同意書をアップロードしました:', consent);
            updateStatus('consentStatus', `同意書アップロード成功！ ID: ${currentConsentId}`, 'success');
            showToast('同意書をアップロードしました', 'success');
            
            // 次のステップのボタンを有効化
            document.getElementById('uploadVoiceButton').disabled = false;
        } else {
            const errorText = await response.text();
            console.error('同意書アップロードエラー:', errorText);
            throw new Error('同意書のアップロードに失敗しました');
        }
    } catch (error) {
        console.error('同意書アップロードエラー:', error);
        currentConsentId = null;
        updateStatus('consentStatus', '同意書アップロードに失敗しました', 'error');
        showToast('同意書のアップロードに失敗しました', 'error');
    }
}

// 音声のアップロード
async function uploadVoice() {
    console.log('学習用音声をアップロードしています...');
    
    const voiceFile = document.getElementById('voiceFile').files[0];
    
    if (!voiceFile) {
        console.error('音声ファイルが選択されていません');
        showToast('音声ファイルを選択してください', 'error');
        return;
    }
    
    if (!currentProjectId || !currentConsentId) {
        console.error('プロジェクトまたは同意書が作成されていません');
        showToast('先にプロジェクトと同意書を作成してください', 'error');
        return;
    }
    
    updateStatus('voiceStatus', '音声をアップロード中...', 'info');
    
    try {
        // 一意の Personal Voice ID を生成
        currentPersonalVoiceId = generateUniqueId('personalvoice');
        console.log(`音声ファイル "${voiceFile.name}" をアップロードしています... (ID: ${currentPersonalVoiceId})`);
        
        // FormData を使用してマルチパートリクエストを構築
        const formData = new FormData();
        formData.append('projectId', currentProjectId);
        formData.append('consentId', currentConsentId);
        formData.append('audiodata', voiceFile);
        
        const response = await fetch(
            `https://${config.serviceRegion}.api.cognitive.microsoft.com/customvoice/personalvoices/${currentPersonalVoiceId}?api-version=${API_CONFIG.VERSION}`,
            {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key': config.subscriptionKey
                },
                body: formData
            }
        );
        
        console.log(`音声アップロードのレスポンスステータス: ${response.status}`);
        
        if (response.ok) {
            const personalVoice = await response.json();
            console.log('Personal Voice を作成しました:', personalVoice);
            const speakerProfileId = personalVoice.speakerProfileId || 'processing';
            updateStatus('voiceStatus', `音声アップロード成功！Speaker Profile ID: ${speakerProfileId}`, 'success');
            showToast('音声をアップロードしました。処理が完了するまでお待ちください', 'success');
            
            // リストを更新
            setTimeout(() => {
                refreshVoiceList();
            }, 2000);
        } else {
            const errorText = await response.text();
            console.error('音声アップロードエラー:', errorText);
            throw new Error('音声のアップロードに失敗しました');
        }
    } catch (error) {
        console.error('音声アップロードエラー:', error);
        currentPersonalVoiceId = null;
        updateStatus('voiceStatus', '音声アップロードに失敗しました', 'error');
        showToast('音声のアップロードに失敗しました', 'error');
    }
}

// 音声合成
async function synthesizeSpeech() {
    console.log('音声合成を実行しています...');
    
    const selectedVoice = document.getElementById('selectedVoice').value;
    const selectedLanguage = document.getElementById('selectedLanguage').value;
    const synthesisText = document.getElementById('synthesisText').value.trim();
    
    if (!selectedVoice) {
        console.error('Personal Voice が選択されていません');
        showToast('Personal Voice を選択してください', 'error');
        return;
    }
    
    if (!synthesisText) {
        console.error('合成するテキストが入力されていません');
        showToast('合成するテキストを入力してください', 'error');
        return;
    }
    
    showSpinner('synthesisSpinner', true);
    updateStatus('synthesisStatus', '音声を合成中...', 'info');
    
    try {
        console.log(`Personal Voice (Speaker Profile ID: ${selectedVoice}) で音声合成を実行しています...`);
        console.log(`言語: ${selectedLanguage}, テキスト: ${synthesisText.substring(0, 50)}...`);
        
        // SSML を構築 - Personal Voice には speakerProfileId と base model voice name が必要
        const ssml = `
            <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="${selectedLanguage}">
                <voice name="DragonLatestNeural">
                    <mstts:ttsembedding speakerProfileId="${selectedVoice}">
                        ${synthesisText}
                    </mstts:ttsembedding>
                </voice>
            </speak>
        `;
        
        const response = await fetch(
            `https://${config.serviceRegion}.tts.speech.microsoft.com/cognitiveservices/v1`,
            {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key': config.subscriptionKey,
                    'Content-Type': 'application/ssml+xml',
                    'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3'
                },
                body: ssml
            }
        );
        
        console.log(`音声合成のレスポンスステータス: ${response.status}`);
        
        if (response.ok) {
            const audioBlob = await response.blob();
            console.log(`音声合成に成功しました。音声サイズ: ${audioBlob.size} bytes`);
            
            // 音声プレイヤーに設定
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioPlayer = document.getElementById('audioPlayer');
            const audioSource = document.getElementById('audioSource');
            
            audioSource.src = audioUrl;
            audioPlayer.load();
            
            // プレイヤーを表示
            document.getElementById('audioPlayerContainer').classList.remove('hidden');
            
            // ダウンロードボタンにデータを設定
            document.getElementById('downloadAudioButton').onclick = () => {
                const a = document.createElement('a');
                a.href = audioUrl;
                a.download = `personal_voice_${Date.now()}.mp3`;
                a.click();
                console.log('音声ファイルをダウンロードしました');
            };
            
            updateStatus('synthesisStatus', '音声合成が完了しました', 'success');
            showToast('音声合成が完了しました', 'success');
        } else {
            const errorText = await response.text();
            console.error('音声合成エラー:', errorText);
            throw new Error('音声合成に失敗しました');
        }
    } catch (error) {
        console.error('音声合成エラー:', error);
        updateStatus('synthesisStatus', '音声合成に失敗しました', 'error');
        showToast('音声合成に失敗しました', 'error');
    } finally {
        showSpinner('synthesisSpinner', false);
    }
}

// 音声ダウンロード機能は synthesizeSpeech 内で動的に設定されます
// この関数は現在使用されていません
function downloadAudio() {
    console.log('音声ダウンロード機能は synthesizeSpeech 内で動的に設定されます');
    // 動的に設定されるため、この関数は呼ばれません
}

// ユーティリティ関数

// ファイルを Base64 に変換
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// スピナー表示の制御
function showSpinner(spinnerId, show) {
    const spinner = document.getElementById(spinnerId);
    if (!spinner) {
        console.warn(`スピナー要素が見つかりません: ${spinnerId}`);
        return;
    }
    
    if (show) {
        spinner.classList.remove('hidden');
    } else {
        spinner.classList.add('hidden');
    }
}

// ステータス表示の更新
function updateStatus(statusId, message, type = 'info') {
    const statusElement = document.getElementById(statusId);
    if (!statusElement) {
        console.warn(`ステータス要素が見つかりません: ${statusId}`);
        return;
    }
    
    statusElement.textContent = message;
    
    // スタイルをリセット
    statusElement.classList.remove('text-gray-600', 'text-blue-600', 'text-green-600', 'text-red-600');
    
    // タイプに応じてスタイルを設定
    switch(type) {
        case 'success':
            statusElement.classList.add('text-green-600');
            break;
        case 'error':
            statusElement.classList.add('text-red-600');
            break;
        case 'info':
            statusElement.classList.add('text-blue-600');
            break;
        default:
            statusElement.classList.add('text-gray-600');
    }
}

// トースト通知の表示
function showToast(message, type = 'info') {
    console.log(`トースト通知: ${message} (タイプ: ${type})`);
    
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    
    // スタイルをリセット
    toast.classList.remove('bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500');
    
    // タイプに応じてスタイルを設定
    switch(type) {
        case 'success':
            toast.classList.add('bg-green-500');
            break;
        case 'error':
            toast.classList.add('bg-red-500');
            break;
        case 'warning':
            toast.classList.add('bg-yellow-500');
            break;
        default:
            toast.classList.add('bg-blue-500');
    }
    
    // トーストを表示
    toast.classList.remove('hidden');
    
    // 3秒後に非表示
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

console.log('スクリプトの読み込みが完了しました');
