/* eslint-disable no-empty-pattern */
import { useForm, useFieldArray } from "react-hook-form"
import { uniqueId } from "../../util/uniqueId"
import { useState } from "react"

export default function ReactHookFromPage() {
  return <Component />
}

export interface Props {
  id?: string
}

export const Component = ({}: Props) => {
  const [submittedData, setSubmittedData] = useState<FormValues>({
    teamName: "",
    members: [],
  })

  return (
    <>
      <TeamForm onSubmitted={setSubmittedData} />
      <SubmittedData submittedData={submittedData} />
      <div className="bg-zinc-700 my-3 mt-20">
        <div>react-hook-formを使わなかった人の話</div>
        <a href="https://zenn.dev/makumattun/articles/a1a4477a1a5e6c" target="blank" className="underline text-blue-400">
          https://zenn.dev/makumattun/articles/a1a4477a1a5e6c
        </a>
        <div>データどうしが絡み合うバリデートやそのタイミングが大変なんて話当等、 useReducer（Reactの標準機能）を使った方が良い場合がある様子</div>
      </div>
    </>
  )
}

type newMember = {
  index: string
  name: string
  age: number | undefined
}

type FormValues = {
  teamName: string
  members: newMember[]
}

function TeamForm({ onSubmitted }: { onSubmitted: (s: FormValues) => void }) {
  const { control, register, handleSubmit, getValues, setValue } = useForm<FormValues>({
    defaultValues: {
      teamName: "",
      members: [{ index: uniqueId(), name: "" }],
    },
  })

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "members",
  })

  const addMember = () => {
    append({
      index: uniqueId(),
      name: "",
      age: undefined,
    })
  }

  const sortAge = () => {
    const currentMembers = getValues("members")
    const sortedMembers = [...currentMembers].sort((a, b) => {
      const ageA = a.age ?? Infinity
      const ageB = b.age ?? Infinity
      return ageA - ageB
    })
    setValue("members", sortedMembers)
  }

  const altSubmitted = () => {
    onSubmitted(getValues())
  }

  return (
    <form onSubmit={handleSubmit(onSubmitted)} className="text-white space-y-4">
      <div>ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー</div>
      <label>team name: </label>
      <input className="bg-zinc-200 w-96 border-2 border-zinc-400 text-black" placeholder="team name" {...register(`teamName`)} />
      <table className="border-2 border-zinc-400">
        <thead>
          <tr>
            <th className="border-2 border-zinc-400">並び替え</th>
            <th className="border-2 border-zinc-400">name</th>
            <th className="border-2 border-zinc-400">age</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, i) => (
            <tr key={field.index}>
              <td className="border-2 border-zinc-400 ">
                <div className="flex">
                  <button
                    type="button"
                    className="bg-blue-700 grow border-zinc-600 border-2 hover:bg-blue-400 cursor-pointer disabled:bg-gray-500 disabled:cursor-default"
                    onClick={() => move(i, i - 1)}
                    disabled={i === 0}>
                    ↑
                  </button>
                  <button
                    type="button"
                    className="bg-blue-700 grow border-zinc-600 border-2 hover:bg-blue-400 cursor-pointer disabled:bg-gray-500 disabled:cursor-default"
                    onClick={() => move(i, i + 1)}
                    disabled={i === fields.length - 1}>
                    ↓
                  </button>
                </div>
              </td>
              {/* 注意：map内の第２引数のindexを入れ替えに使用しない*/}
              <td className="bg-red-200">
                <input className="bg-zinc-200 border-2 border-zinc-400 text-black" placeholder="user name" {...register(`members.${i}.name`)} />
              </td>
              <td>
                <input className="bg-zinc-200 border-2 border-zinc-400 text-black" placeholder="age" {...register(`members.${i}.age`)} />
              </td>
              <td>
                <button type="button" className="bg-blue-700 h-5 w-10 rounded-md hover:bg-blue-400 cursor-pointer" onClick={() => remove(i)}>
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="space-x-1">
        <button className="bg-blue-700 h-5 w-20 rounded-md hover:bg-blue-400 cursor-pointer" type="button" onClick={addMember}>
          メンバー追加
        </button>
        <button className="bg-blue-700 h-5 rounded-md hover:bg-blue-400 cursor-pointer" type="submit" onClick={sortAge}>
          年齢順に並び替える
        </button>
      </div>
      <button className="bg-blue-700 h-5 w-10 rounded-md hover:bg-blue-400 cursor-pointer" type="submit" onClick={altSubmitted}>
        送信
      </button>
      <div>ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー</div>
    </form>
  )
}

type SubmittedDataProps = {
  submittedData: FormValues
}

const SubmittedData = ({ submittedData }: SubmittedDataProps) => {
  return (
    <>
      <div>{submittedData.teamName}</div>
    </>
  )
}
