### 遊び場
- [backend: Golang](https://github.com/shari-sushi/sanbox/tree/main/backend/cmd)
  - init関数の挙動確認
- [frontend: TS, React, Tailwind](https://github.com/shari-sushi/sanbox/tree/main/frontend/src/pages)
  - TopPage: 目次的な 
  - FramerMotion
    - motion.divにて、基本的な挙動確認や同じlayoutIdが同時に2つ存在する場合の挙動確認
    - AnimetionPresence(消失時のアニメーション)の基本的な挙動確認
  - PostImagePage
    - snsでありがちな画像投稿機能を作ってみた(画像投稿だけ)
  - TailwindOpacity
    - [Zenn:Tailwind CSS でカスタムクラスに bg-opacity ができなかった話](https://zenn.dev/portalkeyinc/articles/61d7eb132de9e2)
  - TextareaPage
    - なんだっけ… 
  - OtherPage
    - TSのnullable typeの挙動確認等 

こっちのsandboxと合流したいなぁ
https://github.com/shari-sushi/0015Laboratory/blob/main/README.md

---

### ローカルで動かす
npm管理なのでpackage.jsonのあるディレクトリで`npm install`し、`npm run dev`で動かせるはず。
実際に起動させてるviteなのでviteのデフォportを開いてね。
`http://localhost:5173/`
