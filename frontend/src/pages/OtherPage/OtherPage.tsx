import React, { ReactElement, useState } from "react";

export default function OtherPage() {
  return <Component />;
}

export interface Props {
  id?: string;
}

export const Component = () => {
  return (
    <div className="flex flex-col gap-4">
      <BG>
        <LengthComponent />
      </BG>
      <BG>
        <BoolOrUndefinedComponent />
      </BG>
    </div>
  );
};

const BG = ({ children }: { children: ReactElement }) => {
  return <div className="bg-zinc-600 w-fit h-full p-2">{children}</div>;
};

const LengthComponent = () => {
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

const BoolOrUndefinedComponent = () => {
  const [value, setValue] = useState<boolean | undefined>(undefined);

  const message1 = value === undefined ? "undefined" : value ? "true" : "false";
  const message2 = value ? "true" : "false";

  return (
    <>
      <div className="flex gap-2">
        <div className="p-1 rounded-md bg-amber-700 cursor-pointer hover:bg-amber-600 active:bg-amber-900" onClick={() => setValue(true)}>
          true
        </div>
        <div className="p-1 rounded-md bg-amber-700 cursor-pointer hover:bg-amber-600 active:bg-amber-900" onClick={() => setValue(false)}>
          false
        </div>
        <div className="p-1 rounded-md bg-amber-700 cursor-pointer hover:bg-amber-600 active:bg-amber-900" onClick={() => setValue(undefined)}>
          undefined
        </div>
      </div>
      <div>{message1}</div>
      <div>{message2}</div>
    </>
  );
};
