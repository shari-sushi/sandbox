import { RefObject, useRef, useState } from "react"
import { DOMRectProperty } from "../../hooks/useElementProperty"

export default function ElementPosition() {
  return <Component />
}

export interface Props {
  id?: string
}

export const Component = ({ id }: Props) => {
  // NOTE: useRegの初期値null!について https://qiita.com/FumioNonaka/items/feb2fd5b362f2558acfa
  const targetRef1 = useRef(null!)
  const targetRef2 = useRef(null!)
  const targetRef3 = useRef(null!)

  const initialPosition = {
    top: 200,
    left: 200,
    height: 100,
    width: 100,
  }

  const [position, setPosition] = useState(initialPosition)

  const moveComponent = (ref: React.RefObject<HTMLElement>) => {
    return setPosition(getElementPosition(ref))
  }

  console.log(id)

  return (
    <div className="flex flex-col gap-y-1">
      <div className="w-[500px] h-[400px] bg-gray-700">
        <div ref={targetRef1} className="ml-72 w-40 h-10 bg-green-900 cursor-pointer" onClick={() => moveComponent(targetRef1)}>
          <div>ここに移動</div>
        </div>
        <div ref={targetRef2} className="m-2 w-40 aspect-video bg-green-900 cursor-pointer" onClick={() => moveComponent(targetRef2)}>
          <div>ここに移動</div>
        </div>
        <div ref={targetRef3} className="ml-20 mt-20 w-40 aspect-square bg-green-900 cursor-pointer" onClick={() => moveComponent(targetRef3)}>
          <div>ここに移動</div>
        </div>
      </div>
      <div className="absolute flex justify-center items-center bg-green-600 opacity-50" style={position}>
        <p>表示したい要素</p>
      </div>
      <div
        className="bg-blue-500 cursor-pointer w-20 rounded-md p-1 hover:bg-blue-600 flex justify-center"
        onClick={() => {
          setPosition(initialPosition)
        }}>
        リセット
      </div>
    </div>
  )
}

// hooks版はこっち→ frontend/src/hooks/useElementProperty.ts
const getElementProperty = <T extends HTMLElement>(elementRef: RefObject<T>) => {
  const getElementProperty = (targetProperty: DOMRectProperty): number => {
    const clientRect = elementRef.current?.getBoundingClientRect()
    if (clientRect) {
      return clientRect[targetProperty]
    }

    // clientRect が undefined のときはデフォルトで0を返すようにする
    return 0
  }

  return getElementProperty
}

const getElementPosition = <T extends HTMLElement>(elementRef: RefObject<T>) => {
  const getPosition = getElementProperty(elementRef)

  return {
    top: getPosition("top"),
    left: getPosition("left"),
    height: getPosition("height"),
    width: getPosition("width"),
  }
}

// NOTE: 記事通り
// export const Component = ({ id }: Props) => {
//   const targetRef1 = useRef(null)
//   const targetRef2 = useRef(null)
//   const targetRef3 = useRef(null)

//   const { getElementProperty: getElementProperty1 } = useElementProperty<HTMLDivElement>(targetRef1)
//   const { getElementProperty: getElementProperty2 } = useElementProperty<HTMLDivElement>(targetRef2)
//   const { getElementProperty: getElementProperty3 } = useElementProperty<HTMLDivElement>(targetRef3)

//   const [position, setPosition] = useState<1 | 2 | 3>(1)

//   const positionData = (position: 1 | 2 | 3) => {
//     switch (position) {
//       case 1:
//         return {
//           top: getElementProperty1("top"),
//           left: getElementProperty1("left"),
//           height: getElementProperty1("height"),
//           width: getElementProperty1("width"),
//         }
//       case 2:
//         return {
//           top: getElementProperty2("top"),
//           left: getElementProperty2("left"),
//           height: getElementProperty2("height"),
//           width: getElementProperty2("width"),
//         }
//       case 3:
//         return {
//           top: getElementProperty3("top"),
//           left: getElementProperty3("left"),
//           height: getElementProperty3("height"),
//           width: getElementProperty3("width"),
//         }
//       default:
//         return { top: 0, left: 0, height: 0, width: 0 }
//     }
//   }

//   console.log(id)

//   return (
//     <div className="w-[500px] h-[400px] bg-gray-700">
//       <div ref={targetRef1} className="ml-72 w-40 h-10 bg-green-900 cursor-pointer" onClick={() => setPosition(1)}>
//         <div>ここに移動</div>
//       </div>
//       <div ref={targetRef2} className="m-2 w-40 aspect-video bg-green-900 cursor-pointer" onClick={() => setPosition(2)}>
//         <div>ここに移動</div>
//       </div>
//       <div ref={targetRef3} className="m-20 w-40 aspect-square bg-green-900 cursor-pointer" onClick={() => setPosition(3)}>
//         <div>ここに移動</div>
//       </div>
//       <div className="absolute flex justify-center items-center bg-green-600 opacity-50" style={positionData(position)}>
//         <p>表示したい要素</p>
//       </div>
//     </div>
//   )
// }
