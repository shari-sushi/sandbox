// NOTE: hooksにしたら不便だったので使わなかった。本番ではこっちの方が良いケースもあるので覚えておく。

// https://zenn.dev/tm35/articles/7ac0a932c15ef8
import { RefObject, useCallback } from "react"

// 引数のtargetProperty をDOMRectのもつPropertyに限定する
export type DOMRectProperty = keyof Omit<DOMRect, "toJSON">

// RefObjectの型は div, span, p, input などのさまざまなHTML要素に対応できるようにextendsで制限をかけつつ抽象化
export const useElementProperty = <T extends HTMLElement>(elementRef: RefObject<T>) => {
  const getElementProperty = useCallback(
    (targetProperty: DOMRectProperty): number => {
      const clientRect = elementRef.current?.getBoundingClientRect()
      if (clientRect) {
        return clientRect[targetProperty]
      }

      // clientRect が undefined のときはデフォルトで0を返すようにする
      return 0
    },
    [elementRef]
  )

  return {
    getElementProperty,
  }
}
