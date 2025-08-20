import { useWindowSize } from "../../../hooks/useWindowSize";

export type WindowSize = {
  width: number;
  height: number;
};

export type WindowSizeControllerRowProps = {
  size: WindowSize;
  setSize: React.Dispatch<React.SetStateAction<WindowSize>>;
};

export const WindowSizeControllerRow = ({ size, setSize }: WindowSizeControllerRowProps) => {
  const [width] = useWindowSize();

  return (
    <div className="flex gap-2">
      <div>windowサイズ：</div>
      <div>
        height:
        <input
          type={"number"}
          className="w-20 bg-gray-700 "
          value={size.height}
          onChange={(e) => {
            setSize((a) => {
              return {
                width: a.width,
                height: parseInt(e.target.value),
              };
            });
          }}
        />
      </div>
      <div>
        width:
        <input
          className="w-20 bg-gray-700"
          value={size.width}
          onChange={(e) => {
            setSize((a) => {
              return { width: parseInt(e.target.value), height: a.height };
            });
          }}
        />{" "}
      </div>
      <input
        type="range"
        className="w-40 stroke-gray-200"
        onChange={(e) => {
          setSize({
            width: parseInt(e.target.value) * 16,
            height: parseInt(e.target.value) * 9,
          });
        }}
      />
      <div
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded hover:cursor-pointer"
        onClick={() => {
          setSize({ width: width - 20, height: ((width - 20) * 9) / 16 });
        }}
      >
        画面幅に合わせる
      </div>
    </div>
  );
};
