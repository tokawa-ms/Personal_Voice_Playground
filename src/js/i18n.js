// 多言語対応リソースファイル
// Language resource file for internationalization

const i18n = {
    ja: {
        // ページタイトル
        pageTitle: 'Azure Personal Voice Playground',
        
        // 接続設定パネル
        connectionSettings: 'Azure Speech Service 接続設定',
        show: '表示',
        hide: '非表示',
        subscriptionKey: 'サブスクリプションキー *',
        subscriptionKeyPlaceholder: 'Azure Speech Service のサブスクリプションキーを入力してください',
        serviceRegion: 'サービスリージョン *',
        serviceRegionPlaceholder: '例: eastus, westeurope など',
        connect: '接続',
        connectionSuccess: '接続成功！',
        connectionFailed: '接続失敗',
        autoConnectionSuccess: '自動接続成功！',
        autoConnectionFailed: '自動接続失敗 - 手動で接続してください',
        
        // Personal Voice 管理
        personalVoiceManagement: 'Personal Voice 管理',
        existingVoices: '既存の Voice',
        createNew: '新規作成',
        refreshList: 'リストを更新',
        
        // 新規作成パネル
        step1: 'ステップ 1: プロジェクト作成',
        projectIdPrefix: 'プロジェクト ID プレフィックス',
        projectIdPrefixPlaceholder: 'プロジェクト ID のプレフィックスを入力してください',
        projectIdPrefixHelp: 'プロジェクト ID の先頭に付けるプレフィックスを指定できます（例: myvoice, personalvoice など）',
        projectName: 'プロジェクト名 *',
        projectNamePlaceholder: 'プロジェクト名を入力してください',
        projectDescription: 'プロジェクト説明',
        projectDescriptionPlaceholder: 'プロジェクトの説明を入力してください',
        createProject: 'プロジェクトを作成',
        
        step2: 'ステップ 2: 同意書アップロード',
        consentFile: '同意書ファイル (WAV) *',
        consentFileHelp: '話者の同意を記録した音声ファイル（WAV形式）をアップロードしてください。以下のURLにある文例のうち、自分の母国語の文章を、自分の名前と社名を組み込んだうえで読み上げてください：',
        consentFileUrlLabel: 'サンプル文例URL：',
        consentFileUrl: 'https://github.com/Azure-Samples/Cognitive-Speech-TTS/blob/master/CustomVoice/script/verbal-statement-all-locales.txt',
        voiceTalentName: '話者名 *',
        voiceTalentNamePlaceholder: '音声を提供する話者の名前を入力してください',
        voiceTalentNameHelp: '実際に音声を作る話者の名前を入力してください',
        companyName: '会社名 *',
        companyNamePlaceholder: '利用する会社名を入力してください',
        companyNameHelp: 'Personal Voiceを利用する企業名を入力してください',
        consentLocale: '同意書の言語 *',
        consentLocaleHelp: '同意書で読み上げた言語を選択してください。サンプル文例の言語と一致させる必要があります。',
        uploadConsent: '同意書をアップロード',
        
        step3: 'ステップ 3: 学習用音声アップロード',
        voiceIdPrefix: 'Voice ID プレフィックス',
        voiceIdPrefixPlaceholder: 'Voice ID のプレフィックスを入力してください',
        voiceIdPrefixHelp: 'Voice ID の先頭に付けるプレフィックスを指定できます（例: myvoice, personalvoice など）。ここで設定した値を含む Voice 名が Voice List で表示されます。',
        voiceFile: '音声ファイル (WAV) *',
        voiceFileHelp: '話者プロファイル作成用の音声ファイル（WAV形式）をアップロードしてください。音声の長さは5秒以上90秒未満である必要があります。',
        uploadVoice: '音声をアップロード',
        
        // 音声合成テスト
        speechSynthesisTest: '音声合成テスト',
        selectPersonalVoice: 'Personal Voice を選択 *',
        selectPersonalVoicePlaceholder: '-- Personal Voice を選択してください --',
        selectLanguage: '言語を選択 *',
        synthesisText: '合成するテキスト *',
        synthesisTextPlaceholder: '音声合成したいテキストを入力してください',
        executeSynthesis: '音声合成を実行',
        synthesizedAudio: '合成された音声',
        downloadAudio: '音声をダウンロード',
        
        // 言語オプション
        languageJapanese: '日本語',
        languageEnglishUS: '英語 (米国)',
        languageEnglishGB: '英語 (イギリス)',
        languageEnglishAU: '英語 (オーストラリア)',
        languageEnglishNZ: '英語 (ニュージーランド)',
        languageEnglishSG: '英語 (シンガポール)',
        languageChineseCN: '中国語 (標準、簡体字)',
        languageChineseTW: '中国語 (台湾標準中国語、繁体字)',
        languageChineseHK: '中国語 (繁体字)',
        languageKorean: '韓国語',
        languageVietnamese: 'ベトナム語 (ベトナム)',
        languageThai: 'タイ語',
        languageMalay: 'マレー語 (マレーシア)',
        languageTurkish: 'トルコ語',
        languageGerman: 'ドイツ語',
        languageFrench: 'フランス語',
        languageSpanish: 'スペイン語',
        languageItalian: 'イタリア語',
        
        // メッセージ
        connectionError: '接続に失敗しました。キーとリージョンを確認してください',
        autoConnectionError: '自動接続に失敗しました。設定を確認して手動で接続してください',
        listFetchError: 'Personal Voice リストの取得に失敗しました',
        listFetchErrorDetail: 'リストの取得に失敗しました',
        projectCreated: 'プロジェクト作成成功！ ID: ',
        projectCreateError: 'プロジェクトの作成に失敗しました',
        consentUploaded: '同意書のアップロード成功！',
        consentUploadError: '同意書のアップロードに失敗しました',
        voiceUploaded: '音声のアップロード成功！話者プロファイル ID: ',
        voiceUploadError: '音声のアップロードに失敗しました',
        synthesisSuccess: '音声合成が完了しました',
        synthesisError: '音声合成に失敗しました',
        noVoicesFound: 'Personal Voice が見つかりませんでした',
        loading: '読み込み中...',
        processing: '処理中...',
        
        // バリデーションメッセージ
        pleaseConnect: 'まず Azure Speech Service に接続してください',
        pleaseEnterProjectName: 'プロジェクト名を入力してください',
        pleaseCreateProject: 'まずプロジェクトを作成してください',
        pleaseSelectConsentFile: '同意書ファイルを選択してください',
        pleaseEnterVoiceTalentName: '話者名を入力してください',
        pleaseEnterCompanyName: '会社名を入力してください',
        pleaseSelectValidLocale: '有効な言語を選択してください',
        pleaseUploadConsent: 'まず同意書をアップロードしてください',
        pleaseSelectVoiceFile: '音声ファイルを選択してください',
        pleaseSelectVoice: 'Personal Voice を選択してください',
        pleaseEnterText: '合成するテキストを入力してください',
        pleaseEnterSubscriptionKey: 'サブスクリプションキーとサービスリージョンを入力してください',
        pleaseCreateProjectFirst: '先にプロジェクトを作成してください',
        pleaseCreateProjectAndConsent: '先にプロジェクトと同意書を作成してください',
        
        // ボタンテキスト
        selectVoice: '選択',
        
        // ステータスメッセージ
        connecting: '接続確認中...',
        autoConnecting: '自動接続中...',
        creatingProject: 'プロジェクトを作成中...',
        uploadingConsent: '同意書をアップロード中...',
        uploadingVoice: '音声をアップロード中...',
        synthesizing: '音声を合成中...',
        
        // 成功メッセージ
        connectedToService: 'Azure Speech Service に接続しました',
        autoConnectedWithSaved: '保存された設定で自動接続しました',
        listRefreshed: 'Personal Voice リストを更新しました',
        voiceSelected: 'Personal Voice を選択しました',
        projectCreatedSuccess: 'プロジェクトを作成しました',
        consentUploadedSuccess: '同意書をアップロードしました',
        voiceUploadedSuccess: '音声をアップロードしました。処理が完了するまでお待ちください',
        
        // その他
        audioNotSupported: 'お使いのブラウザは音声要素をサポートしていません',
    },
    
    en: {
        // Page title
        pageTitle: 'Azure Personal Voice Playground',
        
        // Connection settings panel
        connectionSettings: 'Azure Speech Service Connection Settings',
        show: 'Show',
        hide: 'Hide',
        subscriptionKey: 'Subscription Key *',
        subscriptionKeyPlaceholder: 'Enter your Azure Speech Service subscription key',
        serviceRegion: 'Service Region *',
        serviceRegionPlaceholder: 'e.g., eastus, westeurope',
        connect: 'Connect',
        connectionSuccess: 'Connection successful!',
        connectionFailed: 'Connection failed',
        autoConnectionSuccess: 'Auto-connection successful!',
        autoConnectionFailed: 'Auto-connection failed - Please connect manually',
        
        // Personal Voice management
        personalVoiceManagement: 'Personal Voice Management',
        existingVoices: 'Existing Voices',
        createNew: 'Create New',
        refreshList: 'Refresh List',
        
        // Create new panel
        step1: 'Step 1: Create Project',
        projectIdPrefix: 'Project ID Prefix',
        projectIdPrefixPlaceholder: 'Enter project ID prefix',
        projectIdPrefixHelp: 'Specify a prefix for the project ID (e.g., myvoice, personalvoice)',
        projectName: 'Project Name *',
        projectNamePlaceholder: 'Enter project name',
        projectDescription: 'Project Description',
        projectDescriptionPlaceholder: 'Enter project description',
        createProject: 'Create Project',
        
        step2: 'Step 2: Upload Consent',
        consentFile: 'Consent File (WAV) *',
        consentFileHelp: 'Upload an audio file (WAV format) recording the speaker\'s consent. Please read the sample text in your native language from the URL below, incorporating your name and company name:',
        consentFileUrlLabel: 'Sample text URL:',
        consentFileUrl: 'https://github.com/Azure-Samples/Cognitive-Speech-TTS/blob/master/CustomVoice/script/verbal-statement-all-locales.txt',
        voiceTalentName: 'Speaker Name *',
        voiceTalentNamePlaceholder: 'Enter the name of the voice talent',
        voiceTalentNameHelp: 'Enter the name of the actual speaker providing the voice',
        companyName: 'Company Name *',
        companyNamePlaceholder: 'Enter company name',
        companyNameHelp: 'Enter the name of the company using Personal Voice',
        consentLocale: 'Consent Language *',
        consentLocaleHelp: 'Select the language used in the consent recording. Must match the language of the sample text.',
        uploadConsent: 'Upload Consent',
        
        step3: 'Step 3: Upload Training Audio',
        voiceIdPrefix: 'Voice ID Prefix',
        voiceIdPrefixPlaceholder: 'Enter Voice ID prefix',
        voiceIdPrefixHelp: 'Specify a prefix for the Voice ID (e.g., myvoice, personalvoice). Voice names containing this prefix will be displayed in the Voice List.',
        voiceFile: 'Audio File (WAV) *',
        voiceFileHelp: 'Upload an audio file (WAV format) for creating the speaker profile. The audio must be between 5 and 90 seconds in length.',
        uploadVoice: 'Upload Voice',
        
        // Speech synthesis test
        speechSynthesisTest: 'Speech Synthesis Test',
        selectPersonalVoice: 'Select Personal Voice *',
        selectPersonalVoicePlaceholder: '-- Please select a Personal Voice --',
        selectLanguage: 'Select Language *',
        synthesisText: 'Text to Synthesize *',
        synthesisTextPlaceholder: 'Enter text to synthesize',
        executeSynthesis: 'Execute Synthesis',
        synthesizedAudio: 'Synthesized Audio',
        downloadAudio: 'Download Audio',
        
        // Language options
        languageJapanese: 'Japanese',
        languageEnglishUS: 'English (US)',
        languageEnglishGB: 'English (UK)',
        languageEnglishAU: 'English (Australia)',
        languageEnglishNZ: 'English (New Zealand)',
        languageEnglishSG: 'English (Singapore)',
        languageChineseCN: 'Chinese (Simplified)',
        languageChineseTW: 'Chinese (Traditional, Taiwan)',
        languageChineseHK: 'Chinese (Traditional, Hong Kong)',
        languageKorean: 'Korean',
        languageVietnamese: 'Vietnamese (Vietnam)',
        languageThai: 'Thai',
        languageMalay: 'Malay (Malaysia)',
        languageTurkish: 'Turkish',
        languageGerman: 'German',
        languageFrench: 'French',
        languageSpanish: 'Spanish',
        languageItalian: 'Italian',
        
        // Messages
        connectionError: 'Connection failed. Please check your key and region',
        autoConnectionError: 'Auto-connection failed. Please check your settings and connect manually',
        listFetchError: 'Failed to fetch Personal Voice list',
        listFetchErrorDetail: 'Failed to fetch list',
        projectCreated: 'Project created successfully! ID: ',
        projectCreateError: 'Failed to create project',
        consentUploaded: 'Consent uploaded successfully!',
        consentUploadError: 'Failed to upload consent',
        voiceUploaded: 'Voice uploaded successfully! Speaker profile ID: ',
        voiceUploadError: 'Failed to upload voice',
        synthesisSuccess: 'Speech synthesis completed',
        synthesisError: 'Speech synthesis failed',
        noVoicesFound: 'No Personal Voices found',
        loading: 'Loading...',
        processing: 'Processing...',
        
        // Validation messages
        pleaseConnect: 'Please connect to Azure Speech Service first',
        pleaseEnterProjectName: 'Please enter a project name',
        pleaseCreateProject: 'Please create a project first',
        pleaseSelectConsentFile: 'Please select a consent file',
        pleaseEnterVoiceTalentName: 'Please enter speaker name',
        pleaseEnterCompanyName: 'Please enter company name',
        pleaseSelectValidLocale: 'Please select a valid language',
        pleaseUploadConsent: 'Please upload consent first',
        pleaseSelectVoiceFile: 'Please select an audio file',
        pleaseSelectVoice: 'Please select a Personal Voice',
        pleaseEnterText: 'Please enter text to synthesize',
        pleaseEnterSubscriptionKey: 'Please enter subscription key and service region',
        pleaseCreateProjectFirst: 'Please create a project first',
        pleaseCreateProjectAndConsent: 'Please create a project and upload consent first',
        
        // ボタンテキスト
        selectVoice: 'Select',
        
        // ステータスメッセージ
        connecting: 'Connecting...',
        autoConnecting: 'Auto-connecting...',
        creatingProject: 'Creating project...',
        uploadingConsent: 'Uploading consent...',
        uploadingVoice: 'Uploading voice...',
        synthesizing: 'Synthesizing speech...',
        
        // 成功メッセージ
        connectedToService: 'Connected to Azure Speech Service',
        autoConnectedWithSaved: 'Auto-connected with saved settings',
        listRefreshed: 'Personal Voice list refreshed',
        voiceSelected: 'Personal Voice selected',
        projectCreatedSuccess: 'Project created successfully',
        consentUploadedSuccess: 'Consent uploaded successfully',
        voiceUploadedSuccess: 'Voice uploaded successfully. Please wait for processing to complete',
        
        // Others
        audioNotSupported: 'Your browser does not support the audio element',
    }
};

// 現在の言語を管理
let currentLanguage = 'ja';

// localStorage のキー
const LANGUAGE_STORAGE_KEY = 'azureSpeech_language';

// 言語を取得する関数
function t(key) {
    console.log(`翻訳キー取得: ${key} (言語: ${currentLanguage})`);
    return i18n[currentLanguage][key] || key;
}

// 言語を設定する関数
function setLanguage(lang) {
    console.log(`言語を設定: ${lang}`);
    if (i18n[lang]) {
        currentLanguage = lang;
        localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
        applyLanguage();
        
        // 動的に生成されたコンテンツを更新
        if (typeof updateVoiceSelector === 'function') {
            updateVoiceSelector();
        }
        // Voice リストが表示されている場合は再描画
        const voiceList = document.getElementById('voiceList');
        if (voiceList && voiceList.children.length > 0 && typeof voices !== 'undefined' && voices.length > 0) {
            voiceList.innerHTML = '';
            voices.forEach(voice => {
                const voiceCard = createVoiceCard(voice);
                voiceList.appendChild(voiceCard);
            });
        }
        
        console.log(`言語設定完了: ${lang}`);
    } else {
        console.error(`サポートされていない言語: ${lang}`);
    }
}

// 保存された言語設定を読み込む
function loadLanguageSettings() {
    console.log('言語設定を読み込んでいます...');
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (savedLanguage && i18n[savedLanguage]) {
        console.log(`保存された言語設定を検出: ${savedLanguage}`);
        currentLanguage = savedLanguage;
    } else {
        console.log('保存された言語設定が見つかりません。デフォルト言語を使用: ja');
    }
}

// ページ全体に言語を適用する関数
function applyLanguage() {
    console.log('ページ全体に言語を適用しています...');
    
    // data-i18n 属性を持つすべての要素を更新
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = t(key);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            if (element.hasAttribute('placeholder')) {
                element.placeholder = text;
            }
        } else if (element.tagName === 'OPTION') {
            element.textContent = text;
        } else {
            element.textContent = text;
        }
    });
    
    // data-i18n-placeholder 属性を持つすべての要素を更新
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // ページタイトルを更新
    document.title = t('pageTitle');
    
    // 言語切り替えボタンの状態を更新
    updateLanguageToggleButton();
    
    console.log('言語適用完了');
}

// 言語切り替えボタンの状態を更新
function updateLanguageToggleButton() {
    const jaButton = document.getElementById('langJa');
    const enButton = document.getElementById('langEn');
    
    if (jaButton && enButton) {
        if (currentLanguage === 'ja') {
            jaButton.classList.add('bg-blue-600', 'text-white');
            jaButton.classList.remove('bg-gray-200', 'text-gray-700');
            enButton.classList.remove('bg-blue-600', 'text-white');
            enButton.classList.add('bg-gray-200', 'text-gray-700');
        } else {
            enButton.classList.add('bg-blue-600', 'text-white');
            enButton.classList.remove('bg-gray-200', 'text-gray-700');
            jaButton.classList.remove('bg-blue-600', 'text-white');
            jaButton.classList.add('bg-gray-200', 'text-gray-700');
        }
    }
}
