import { useState } from "react";
import { getStringByCharCount } from "../util/getStringByCharCount";

interface TextareaProps {
  text: string;
  onChangedProperty: (description: string) => void;
  maxLength: number;
  disabled?: boolean;
}

export function Textarea({ text, onChangedProperty, maxLength, disabled }: TextareaProps) {
  const [currentText, setCurrentText] = useState<string>(text);
  // const isCompositionStart = useRef<boolean>(false);

  // const handleCompositionStart = () => {
  //   isCompositionStart.current = true;
  // };

  // const handleCompositionEnd = () => {
  //   isCompositionStart.current = false;
  // };

  // 未完成のため応急のコンパイルエラー処置
  console.log(onChangedProperty);

  const onChanged = (text: string) => {
    setCurrentText(text);
  };

  return (
    <div className="relative w-[500px]">
      <textarea
        className="bg-zinc-600 text-white w-full h-[100px] p-1 disabled:opacity-50 "
        value={disabled ? undefined : currentText}
        disabled={disabled}
        maxLength={maxLength}
        onChange={(e) => onChanged(e.target.value)}
      />
      <div className={`flex justify-end ${disabled ? "opacity-50" : ""}`}>
        {`${
          disabled
            ? "データ取得中"
            : `${getStringByCharCount(currentText, maxLength).count}
         / ${maxLength}`
        }`}
      </div>
    </div>
  );
}

export default Textarea;
