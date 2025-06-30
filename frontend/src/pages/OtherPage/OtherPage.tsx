import { useState } from "react";

export default function OtherPage() {
  return <Component />;
}

export interface Props {
  id?: string;
}

export const Component = () => {
  const [itemList, setItemList] = useState<(null | undefined | string)[]>([]);

  const pushNull = () => {
    setItemList([...itemList, null]);
  };

  const pushUndefined = () => {
    setItemList((prev) => [...prev, undefined]);
  };

  const pushString = () => {
    setItemList((prev) => [...prev, "文字列"]);
  };

  const reset = () => {
    setItemList([]);
  };

  return (
    <>
      <div>配列長：{itemList.length}</div>
      <div>
        配列：
        {itemList.map((item, i) => {
          return (
            <div className="inline">
              <span>{item}</span>
              {i < itemList.length - 1 && ", "}
            </div>
          );
        })}
      </div>
      <div className="flex gap-x-1">
        <div onClick={pushNull} className="bg-blue-700 w-20 text-center rounded-md cursor-pointer">
          null
        </div>
        <div onClick={pushUndefined} className="bg-blue-700 w-20 text-center rounded-md cursor-pointer">
          undefined
        </div>
        <div onClick={pushString} className="bg-blue-700 w-20 text-center rounded-md cursor-pointer">
          文字列
        </div>
        <div onClick={reset} className="bg-red-700 w-20 text-center rounded-md cursor-pointer">
          リセット
        </div>
      </div>
    </>
  );
};
