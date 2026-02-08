### 遊び場

フロント側だけはvercelで公開したり、気分でやめたりしてます。<br/>
https://sanbox-sigma.vercel.app/


### やったこと
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
  - TailwindGridGap
    - Gridでgapが効かなくなるときの原因と対処
  - TextareaPage
    - なんだっけ… 
  - ElementPositionPage
    - absolute要素の位置を自在に動かす方法。useRefとgetBoundingClientRectを使う
  - excess property
    - TSとReact.UseStateの余剰プロパティが切り捨てられるかを確認した  
  - OtherPage
    - TSのnullable typeの挙動確認等 


### ローカルで動かす
npm管理なのでpackage.jsonのあるディレクトリで`npm install`し、`npm run dev`で動かせるはず。
実際に起動させてるviteなのでviteのデフォportを開いてね。
`http://localhost:5173/`

---

## 備考

### 別リポジトリもあり

https://github.com/shari-sushi/0015Laboratory/blob/main/README.md

> いろいろ試す遊び場。
> - docker導入
> - ポインタの挙動確認
> - AESの暗号化/復号化
> - youtube-player, react-youtube
> - css
> - Next.jsテストコード
> - goでアルゴリズム
>   - LinearSerch
>   - BinarySerach
>   - BubbleSort
>   - SelectionSort
>   - LisertionSort
>   - ShellSort
>   - QuickSort
>   - MergeSort
> - React-hooks
>   - [useContext](https://github.com/shari-sushi/0015Laboratory/tree/main/test0015Next/my-app/src/component) 
> - init関数の動作確認
>   - test時にも動くか([別リポジトリ](https://github.com/shari-sushi/sanbox))
