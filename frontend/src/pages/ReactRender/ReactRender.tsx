import { useState, useCallback } from "react"

export default function ReactRenderPage() {
  return <Component />
}

export interface Props {
  id?: string
}

export const Component = () => {
  const [checked, setChecked] = useState(false)
  const [text, setText] = useState("")
  const AAA = useCallback(() => {
    return <input value={text} onChange={(e) => setText(e.target.value)} />
  }, [text])

  return (
    <div className="p-4">
      <AAA />
      <p>
        <input type="checkbox" checked={checked} onClick={() => setChecked((c) => !c)} />
      </p>
      <div>カウンターがリセットされない</div>
      {checked ? <Counter /> : <Counter />}

      <div>カウンターがリセットされる</div>
      {checked ? (
        <div>
          <Counter />
        </div>
      ) : (
        <section>
          <Counter />
        </section>
      )}

      {checked ? <Counter /> : null}
      {checked ? null : <Counter />}

      <div>カウンターがリセットされない</div>
      {checked ? <Counter /> : <Counter />}
    </div>
  )
}

const Counter = () => {
  const [count, setCount] = useState(0)

  return (
    <p>
      <button type="button" onClick={() => setCount((c) => c + 1)}>
        {count}
      </button>
    </p>
  )
}
