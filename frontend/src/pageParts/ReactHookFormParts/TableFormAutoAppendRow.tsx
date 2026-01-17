import { FormValues, newMember } from "./type"
import { useFieldArray, UseFieldArrayAppend, useForm, UseFormGetValues, UseFormRegister } from "react-hook-form"
import { uniqueId } from "../../util/uniqueId"

export const TableFormAutoAppendRow = () => {
  const onSubmitted = () => {}
  return <TeamForm onSubmitted={onSubmitted} />
}

const TeamForm = ({ onSubmitted }: { onSubmitted: (s: FormValues) => void }) => {
  const { control, register, handleSubmit, getValues } = useForm<FormValues>({
    defaultValues: {
      // age:undefinedにしても内部的に""になる模様。なぞ。
      members: [{ index: uniqueId(), name: "", age: 0 }],
    },
  })

  const { fields, append } = useFieldArray({
    control,
    name: "members",
  })

  return (
    <form onSubmit={handleSubmit(onSubmitted)} className="text-white space-y-4">
      <table className="border-2 border-zinc-400">
        <thead>
          <tr>
            <th className="border-2 border-zinc-400">name</th>
            <th className="border-2 border-zinc-400">age</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((member, i) => (
            <Row key={i} RowIndex={i} RowLength={fields.length} register={register} append={append} getValues={getValues} values={member} />
          ))}
        </tbody>
      </table>
    </form>
  )
}

type RowProps = {
  RowIndex: number
  RowLength: number
  values: newMember
  register: UseFormRegister<FormValues>
  append: UseFieldArrayAppend<FormValues, "members">
  getValues: UseFormGetValues<FormValues>
}

const Row = ({ RowIndex: i, RowLength, register, append, values, getValues }: RowProps) => {
  const addMemberIfWrittenLastRow = () => {
    console.log("called addMemberIfWrittenLastRow, index:", i)
    if (i != RowLength - 1) return

    const member = getValues("members")?.[i]
    if (!member) return
    console.log("入力値 getValuesから取得：", member)
    if (member.name == "" && member.age === 0) return

    // 親から配列の要素を貰ってきても、入力値が空のまま
    console.log("入力値 fields.mapから取得：", values)

    append({
      index: uniqueId(),
      name: "",
      age: 0,
    })
  }

  return (
    <tr>
      <td className="bg-red-200">
        <input className="bg-zinc-200 border-2 border-zinc-400 text-black" placeholder="user name" {...register(`members.${i}.name`)} onBlur={addMemberIfWrittenLastRow} />
      </td>
      <td>
        <input className="bg-zinc-200 border-2 border-zinc-400 text-black" placeholder="age" {...register(`members.${i}.age`)} type="number" onBlur={addMemberIfWrittenLastRow} />
      </td>
    </tr>
  )
}
