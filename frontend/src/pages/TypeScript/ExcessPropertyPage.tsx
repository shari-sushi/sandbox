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

  const setActivity = (newActivity: Activity) => {
    console.log(newActivity) // {iconId: '👻', message: '離席中'}

    // どこかから既存のアクションを取得する処理をイメージ
    const current = getCurrentActivity()
    console.log(current) // {userId: '1', iconId: '👻', message: '離席中' }
    // ※ console.log(currentActivity.userId) はコンパイルエラーになる

    const isSame = isSameActivity(current, newActivity)
    if (isSame) {
      return
    }

    // apiを叩く
    // void api.activity.update({ workspaceId, activity })
    console.log("アクティビティが変更されたのでサーバーへ送信しました")
  }

  setActivity(newActivity)

  return (
    <div className="flex flex-col gap-y-4 ml-4">
      <div>
        〇下位型
        {Object.keys(newActivity).map((key) => (
          <div key={key}>
            {key}: {newActivity[key as keyof Activity]}
          </div>
        ))}
      </div>
      <div>
        〇上位型
        {Object.keys(currentActivity).map((key) => (
          <div key={key}>
            {key}: {currentActivity[key as keyof Activity]}
          </div>
        ))}
      </div>
      〇deepEqualでの比較： {isSameActivity(currentActivity, newActivity) ? "true" : "false"}
    </div>
  )
}

const getCurrentActivity = (): UserActivity => {
  return currentActivity
}

const currentActivity: UserActivity = {
  userId: "workspace-1",
  iconId: "👻",
  message: "離席中",
}

const newActivity: Activity = {
  iconId: "👻",
  message: "離席中",
}

const ExcessPropertyUseStatePage = () => {
  const [activity, setActivity] = useState<Activity>(newActivity)

  return (
    <div>
      <h1 className="text-2xl">useStateで管理した場合</h1>
      <div className="flex flex-col gap-y-4 ml-4">
        <div>
          〇初期値として入れた値
          {Object.keys(newActivity).map((key) => (
            <div key={key}>
              {key}: {newActivity[key as keyof Activity]}
            </div>
          ))}
        </div>
        <div>
          〇useStateが保持している値
          {Object.keys(activity).map((key) => (
            <div key={key}>
              {key}: {activity[key as keyof Activity]}
            </div>
          ))}
        </div>
        <div>
          〇上位型
          {Object.keys(currentActivity).map((key) => (
            <div key={key}>
              {key}: {currentActivity[key as keyof UserActivity]}
            </div>
          ))}
        </div>
        <div className="flex gap-x-2">
          <button
            onClick={() => {
              setActivity(newActivity)
              console.log("上位型をセット")
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded w-32 cursor-pointer">
            上位型をuseStateにセット
          </button>
          <button
            onClick={() => {
              setActivity(activity)
              console.log("元の値をセット")
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded w-32 cursor-pointer">
            リセット
            <br />
            (初期値をセット)
          </button>
        </div>
      </div>
    </div>
  )
}
