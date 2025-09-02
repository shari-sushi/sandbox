import deepEqual from "deep-equal"
import { useState } from "react"

export function ExcessPropertyPage() {
  return (
    <div className="flex flex-col gap-y-8">
      <PrototypeEqualityDemo />
      <hr />
      <ExcessPropertyUseStatePage />
    </div>
  )
}

// Activityの上位型になる
interface UserActivity extends Activity {
  userId: string
}

interface Activity {
  iconId: string
  message: string
}

const PrototypeEqualityDemo = () => {
  const isSameActivity = (a: Activity, b: Activity): boolean => {
    return deepEqual(a, b)
  }

  const updateActivity = (newActivity: Activity) => {
    console.log(newActivity) // {iconId: '👻', message: '離席中'}

    // どこかから既存のアクションを取得する処理をイメージ
    const current = getCurrentActivity()
    console.log(current) // {userId: '1', iconId: '👻', message: '離席中' }
    // ※ console.log(currentActivity.userId) はコンパイルエラーになる

    const isSame = isSameActivity(current, newActivity)
    if (isSame) {
      return
    }

    // サーバーへ送信する処理
    // void api.activity.update({ workspaceId, newActivity })
    console.log("アクティビティが変更されたのでサーバーへ送信しました")
  }

  updateActivity(subtypeActivity1)

  return (
    <div className="flex flex-col gap-y-4 ml-4">
      <h1 className="text-2xl">TypeScriptは名前的構造型を採用している</h1>
      <div className="flex gap-6">
        <div>
          〇上位型
          {Object.keys(subtypeActivity1).map((key) => (
            <div key={key}>
              {key}: {subtypeActivity1[key as keyof Activity]}
            </div>
          ))}
        </div>
        <div>
          〇部分型
          {Object.keys(currentActivity).map((key) => (
            <div key={key}>
              {key}: {currentActivity[key as keyof Activity]}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="underline">上位型と部分型の等価比較</div>
        <div className="ml-4">
          deepEqualでの比較：
          {/* falseになる */}
          <span className="text-red-400">{isSameActivity(currentActivity, subtypeActivity1) ? "true" : "false"}</span>
        </div>
      </div>
    </div>
  )
}

const getCurrentActivity = (): UserActivity => {
  return currentActivity
}

const supertypeActivity: UserActivity = {
  iconId: "👻",
  message: "離席中",
  userId: "workspace_1",
}

const currentActivity = supertypeActivity

const subtypeActivity1: Activity = {
  iconId: "👻",
  message: "離席中",
}

const subtypeActivity2: Activity = {
  iconId: "🏪",
  message: "外出中",
}

const ExcessPropertyUseStatePage = () => {
  const [activity, setActivity] = useState<Activity>(subtypeActivity1)

  return (
    <div className="ml-4 flex flex-col gap-y-2">
      <h1 className="text-2xl">useStateでは余剰プロパティは削除される</h1>
      <div className="flex flex-col gap-6 ml-4">
        <Buttons activity={activity} setActivity={setActivity} />
        <div>
          〇useStateが保持している値
          <div className="ml-4">
            {Object.keys(activity).map((key) => (
              <div key={key}>
                {key}: {activity[key as keyof Activity]}
              </div>
            ))}
          </div>
        </div>
        <Result activity={activity} />
      </div>
    </div>
  )
}

const Buttons = ({ activity, setActivity }: { activity: Activity; setActivity: (activity: Activity) => void }) => {
  const [selected, setSelected] = useState<number>(1)

  return (
    <div className="flex gap-x-6">
      <div
        className={`flex flex-col gap-y-2 rounded p-2 cursor-pointer group ${selected === 1 ? "border-2 border-blue-400" : "m-0.5"}`}
        onClick={() => {
          setActivity(activity)
          setSelected(1)
          console.log("元の値をセット")
        }}>
        <div className="h-24">
          〇上位型
          <div className="ml-4">
            {Object.keys(currentActivity).map((key) => (
              <div key={key}>
                {key}: {currentActivity[key as keyof UserActivity]}
              </div>
            ))}
          </div>
        </div>
        <button className="bg-blue-500 group-hover:bg-blue-700 text-white text-sm px-2 py-1 rounded w-32 cursor-pointer mx-auto text-center">この値をセット</button>
      </div>

      <div
        className={`flex flex-col gap-y-2 p-2 rounded cursor-pointer group ${selected === 2 ? "border-2 border-blue-400" : "m-0.5"}`}
        onClick={() => {
          setActivity(subtypeActivity1)
          setSelected(2)
        }}>
        <div className="h-24">
          〇部分型１
          <div className="ml-4">
            {Object.keys(subtypeActivity1).map((key) => (
              <div key={key}>
                {key}: {subtypeActivity1[key as keyof Activity]}
              </div>
            ))}
          </div>
        </div>
        <button className="bg-blue-500 group-hover:bg-blue-700 text-white text-sm px-2 py-1 rounded w-32 cursor-pointer mx-auto text-center">この値をセット</button>
      </div>

      <div
        className={`flex flex-col gap-y-2 p-2 rounded cursor-pointer group ${selected === 3 ? "border-2 border-blue-400" : "m-0.5"}`}
        onClick={() => {
          setActivity(subtypeActivity2)
          setSelected(3)
        }}>
        <div className="h-24">
          〇部分型２
          <div className="ml-4">
            {Object.keys(subtypeActivity2).map((key) => (
              <div key={key}>
                {key}: {subtypeActivity2[key as keyof Activity]}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-blue-500 group-hover:bg-blue-700 text-white text-sm px-2 py-1 rounded w-32 cursor-pointer mx-auto text-center">この値をセット</div>
      </div>
    </div>
  )
}

const Result = ({ activity }: { activity: Activity }) => {
  const isSameActivity = (a: Activity, b: Activity): boolean => {
    return a.iconId === b.iconId && a.message === b.message
  }

  const isSame = isSameActivity(activity, currentActivity)
  const isDeepEqual = deepEqual(activity, currentActivity)

  return (
    <div className="mt-4">
      <span className="underline">セットした値とuseStateで保持している値の等価比較</span>
      <div className="ml-4">
        <div className="">
          deepEqualの比較結果: <span className="text-blue-400">{JSON.stringify(isDeepEqual)}</span>
        </div>
        <div>
          上位型のプロパティのみの比較結果: <span className={`${isDeepEqual ? "text-blue-400" : "text-red-400"}`}>{JSON.stringify(isSame)}</span>
        </div>
      </div>
    </div>
  )
}
