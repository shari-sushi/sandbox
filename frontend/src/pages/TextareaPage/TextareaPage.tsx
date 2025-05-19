import { useState } from "react";
import Textarea from "../../components/Textarea";
import { getStringByCharCount } from "../../util/getStringByCharCount";

interface TextareaState {
  text: string;
  disabled: boolean;
}

const maxLength = 10;

export function TextareaPage() {
  return (
    <div>
      <div className="rounded-md border-[1px] border-gray-300 p-4">
        1つのコンポーネントで実装した場合
        <SingleComponent />
      </div>
      <div className="rounded-md border-[1px] border-gray-300 p-4">
        コンポーネントを分割した場合
        <DividedComponents />
      </div>
    </div>
  );
}

function SingleComponent() {
  const [data, setData] = useState<TextareaState>({
    text: "データ取得中",
    disabled: true,
  });

  const getData = () => {
    // 本来は外部apiからデータ取得し、それをsetterに渡す
    setData({ text: "取得したデータ", disabled: false });
  };

  const onChanged = (text: string) => {
    setData((prev) => {
      return { ...prev, text };
    });
  };

  const submit = () => {
    console.log(data);
  };
  return (
    <>
      <div className="flex gap-1 py-2">
        <button
          className="bg-blue-500 text-white p-2 rounded-md mr-2 hover:bg-blue-600 cursor-pointer"
          onClick={getData}
        >
          データ取得
        </button>
        {/* 後で消す */}
        <button
          className="bg-blue-500 text-white p-2 rounded-md mr-2 hover:bg-blue-600 cursor-pointer"
          onClick={() => setData({ text: "データ取得中", disabled: true })}
        >
          リセット
        </button>
      </div>
      <div className="relative w-[500px]">
        <textarea
          className="bg-zinc-600 text-white w-full h-[100px] p-1 disabled:opacity-50 "
          value={data.disabled ? undefined : data.text}
          disabled={data.disabled}
          maxLength={maxLength}
          onChange={(e) => onChanged(e.target.value)}
        />
        <div
          className={`flex justify-end ${data.disabled ? "opacity-50" : ""}`}
        >
          {`${
            data.disabled
              ? "データ取得中"
              : `${getStringByCharCount(data.text, maxLength).count}
         / ${maxLength}`
          }`}
        </div>
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md mr-2 hover:bg-blue-600 cursor-pointer"
        onClick={submit}
      >
        送信
      </button>
    </>
  );
}

function DividedComponents() {
  const [data, setData] = useState<TextareaState>({
    text: "データ取得中",
    disabled: true,
  });

  const getData = () => {
    // 本来は外部apiからデータ取得し、それをsetterに渡す
    setData({ text: "取得したデータ", disabled: false });
  };

  const onChangedText = (text: string) => {
    console.log("onChangedText", text);
  };

  const submit = () => {
    console.log(data);
  };

  return (
    <>
      <div className="flex gap-1 py-2">
        <button
          className="bg-blue-500 text-white p-2 rounded-md mr-2 hover:bg-blue-600 cursor-pointer"
          onClick={getData}
        >
          データ取得
        </button>
        {/* 後で消す */}
        <button
          className="bg-blue-500 text-white p-2 rounded-md mr-2 hover:bg-blue-600 cursor-pointer"
          onClick={() => setData({ text: "データ取得中", disabled: true })}
        >
          リセット
        </button>
      </div>
      <Textarea
        text={data.text}
        disabled={data.disabled}
        maxLength={maxLength}
        onChangedProperty={onChangedText}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-md mr-2 hover:bg-blue-600 cursor-pointer"
        onClick={submit}
        disabled={data.disabled}
      >
        送信
      </button>
    </>
  );
}

export default TextareaPage;
