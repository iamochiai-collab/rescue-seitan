# あついよ〜！わんこレスキュー（画像素材入り版）

特別支援学校の生活単元学習「天気・暑さ・温度を下げる工夫」の導入用Webゲームです。

## 使い方

1. GitHubで新しいリポジトリを作る
2. このフォルダの中身をそのままアップロードする
3. GitHub PagesをONにする
4. 発行されたURLをiPadで開く

## 追加したこと

- 画像素材を `assets/` に分類
- 背景画像：`assets/backgrounds/`
- 犬の状態差分：`assets/dogs/`
- アイテム画像：`assets/items/`
- UI素材シート：`assets/ui/`
- アイテム一覧のカードに画像を使用
- カーテン・窓などで背景が変わる
- 犬の元気に応じて、犬の画像が変わる
- プレイヤー名と今日のランキング機能つき

## フォルダ構成

```text
wanko-rescue-asset-game/
├── index.html
├── styles.css
├── app.js
├── README.md
└── assets/
    ├── backgrounds/
    ├── dogs/
    ├── items/
    └── ui/
```

## 注意

ランキングは、同じiPad・同じブラウザ内だけで保存されます。複数台で共有するにはFirebase等が必要です。
