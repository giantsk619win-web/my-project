# トラストナビ ～信託銀行業務の道しるべ～

信託銀行の新入社員向けe-Learning教材サイトです。信託銀行の6つの業務領域を、段階的なレベルシステム・クイズ・実務ミニシーンを通じて体系的に学べます。

## 学習セクション

| # | セクション | 内容 | レベル数 | クイズ |
|---|-----------|------|---------|--------|
| 1 | 信託銀行とは | 銀行との違い、信託の基本概念、法的基盤 | 3 | - |
| 2 | 信託・相続業務 | 信託の三者構造、信託商品体系、遺言信託・相続フロー | 4 | 10問 |
| 3 | 証券代行業務 | 株主名簿管理、配当金支払い、株主総会支援、IR | 4 | 10問 |
| 4 | 不動産業務 | 売買仲介、鑑定評価、CRE戦略、不動産信託・REIT | 4 | 10問 |
| 5 | 年金・資産運用業務 | 企業年金（DB/DC）、資産運用、年金ALM | 4 | 10問 |
| 6 | カストディ業務 | 有価証券の保管・決済、NAV算出、グローバル管理 | 4 | 10問 |
| - | 全体理解度テスト | 全セクション横断の総合テスト | - | 20問 |

## ファイル構成

```
trust-bank-learning/
├── index.html              # トップページ（業務マップ・進捗表示）
├── css/
│   └── style.css           # 共通スタイルシート
├── js/
│   ├── common.js           # 共通JS（ヘッダー/フッター生成、進捗管理、
│   │                       #   オウムSVG、ツールチップ、アコーディオン等）
│   └── quiz.js             # クイズエンジン（出題・採点・結果表示）
├── quiz/
│   └── quiz-data.js        # クイズ問題データ（全70問）
├── sections/
│   ├── overview.html       # 信託銀行とは
│   ├── trust.html          # 信託・相続業務
│   ├── stock.html          # 証券代行業務
│   ├── realestate.html     # 不動産業務
│   ├── pension.html        # 年金・資産運用業務
│   └── custody.html        # カストディ業務
└── README.md
```

## ローカルでの起動方法

静的HTMLサイトのため、サーバーが必要です（localStorageの制約上、`file://` では動作しません）。

### 方法1：VS Code Live Server
1. VS Code で `trust-bank-learning` フォルダを開く
2. 拡張機能「Live Server」をインストール
3. `index.html` を右クリック → 「Open with Live Server」

### 方法2：Python
```bash
cd trust-bank-learning
python -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```

### 方法3：Node.js
```bash
npx serve trust-bank-learning
```

## 主な機能

### 段階学習（レベルシステム）
- 各セクションはLv.1～Lv.4（overviewはLv.3まで）の段階構成
- アコーディオン式の開閉で集中して学習可能
- 「学習完了にする」ボタンで進捗を記録

### クイズ
- 3種類の出題形式：用語選択・業務判断・○×
- 問題と選択肢はランダムシャッフル
- 即座にフィードバック（解説付き）
- タイプ別正答率・苦手分野を結果画面で表示

### 実務ミニシーン
- 対話形式（吹き出しUI）で実務場面を体験
- 正解・不正解のフィードバック付き
- 案内キャラクター「トラストン」が5つの表情で反応

### 進捗管理
- 全データは localStorage に保存（サーバー不要）
- トップページに全体進捗・セクション別進捗を表示
- 「学習を再開する」機能（前回の続きから）
- クイズ成績の保存・前回結果の表示

### 用語ツールチップ
- 専門用語にホバー/フォーカスで解説を表示
- セクション内用語集で一覧確認

## カスタマイズ方法

### セクションの追加手順

1. `sections/` に新しいHTMLファイルを作成（既存ファイルをテンプレートにコピー）
2. `js/common.js` の `Progress.SECTIONS` にセクション情報を追加：
   ```js
   newSection: { name: '新セクション名', levels: 4, path: 'sections/newSection.html' },
   ```
3. `index.html` の `.section-grid` 内にカードを追加
4. CSS の `--color-newsection` 変数とカードの `data-section` スタイルを追加
5. ヘッダーテンプレート（`HeaderTemplate.create`）にナビリンクを追加

### クイズの編集・追加

`quiz/quiz-data.js` を編集します。

**4択問題の追加例：**
```js
{
  type: 'term',        // 'term'（用語）, 'judgment'（業務判断）
  question: '問題文をここに書く',
  options: ['選択肢A', '選択肢B', '選択肢C', '選択肢D'],
  answer: 1,           // 正解のインデックス（0始まり）
  explanation: '解説文をここに書く'
}
```

**○×問題の追加例：**
```js
{
  type: 'truefalse',
  question: '○×問題の文をここに書く',
  answer: true,        // true = 正しい, false = 誤り
  explanation: '解説文をここに書く'
}
```

**全体理解度テスト用（セクション情報付き）：**
```js
{
  type: 'judgment',
  section: 'trust',    // 所属セクションID（苦手分野分析に使用）
  question: '...',
  options: ['...', '...', '...', '...'],
  answer: 0,
  explanation: '...'
}
```

### トラストン（オウムキャラ）の表情

`ParrotSVG.create(mood, size)` で以下の5表情を使用可能：
- `'normal'` - 通常
- `'thinking'` - 考え中
- `'correct'` - 正解（にっこり）
- `'incorrect'` - 不正解（しょんぼり）
- `'cheering'` - 応援（星目）

## 使用技術

| カテゴリ | 技術 |
|---------|------|
| マークアップ | HTML5（セマンティック要素、WAI-ARIA） |
| スタイル | CSS3（CSS変数、Grid、Flexbox、アニメーション） |
| スクリプト | Vanilla JavaScript（ES6+、ライブラリ不使用） |
| フォント | Google Fonts（Noto Sans JP） |
| グラフィック | インラインSVG（キャラクター、図解） |
| データ保存 | localStorage（進捗・クイズ成績） |
| ビルドツール | なし（ビルド不要の静的サイト） |

## ブラウザ対応

- Chrome / Edge / Firefox / Safari（最新版）
- モバイル：iOS Safari / Android Chrome

## ライセンス

社内研修教材として作成。
