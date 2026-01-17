/* eslint-disable no-empty-pattern */
import { TableFormAutoAppendRow } from "../../pageParts/ReactHookFormParts/TableFormAutoAppendRow"
import { TableFormBasic } from "../../pageParts/ReactHookFormParts/TableFormBasic"

export default function ReactHookFromPage() {
  return <Component />
}

export interface Props {
  id?: string
}

export const Component = ({}: Props) => {
  return (
    <div>
      <h1>React Hook Formを使ったtable形式のフォーム</h1>
      <div>ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー</div>
      <h2 className="text-lg underline">基本形</h2>
      <TableFormBasic />
      <div>ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー</div>
      <h2 className="text-lg underline">自動で行が増える</h2>
      <TableFormAutoAppendRow />
      <div>ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー</div>
      <Supplement />
    </div>
  )
}

const Supplement = () => {
  return (
    <div className="bg-zinc-700 my-3 mt-10">
      <div>react-hook-formを使わなかった人の話</div>
      <a href="https://zenn.dev/makumattun/articles/a1a4477a1a5e6c" target="blank" className="underline text-blue-400">
        https://zenn.dev/makumattun/articles/a1a4477a1a5e6c
      </a>
      <div>データどうしが絡み合うバリデートやそのタイミングが大変なんて話当等、 useReducer（Reactの標準機能）を使った方が良い場合がある様子</div>
    </div>
  )
}
