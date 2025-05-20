import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";

export default function LiveChatPage() {
  return <Component />;
}

export interface Props {
  id?: string;
}

const ANIMATION_DURATION: number = 1500; // ms
const comment1 = "こんすし";
const comment2 = "こんいも";

type AnimatedComment = {
  id: string;
  comment: string;
  posX: number;
  startedTime: number;
};

export const Component = () => {
  const [animatedComment, setAnimatedComment] = useState<Map<string, AnimatedComment>>(new Map());
  const [videoSize, setVideoSize] = useState<WindowSize>({
    width: 480,
    height: 270,
  });

  // const [animationProperty, setAnimationProperty] = useState<{
  //   width: number;
  //   height: number;
  // }>({
  //   width: 0,
  //   height: 0,
  // });
  // const movieRef = useRef<HTMLDivElement>(undefined);
  // const { getElementProperty } =
  //   useGetElementProperty<HTMLDivElement>(movieRef);

  const makeComment = (comment: string): AnimatedComment | undefined => {
    const id = `${Date.now()}_${comment}`;
    if (animatedComment.has(id)) return;

    // lastPosX.current += randomNumber(-15, 15); // 0~100%
    // if (lastPosX.current < 0) lastPosX.current = randomNumber(0, 15);
    // else if (lastPosX.current > 30) lastPosX.current = randomNumber(15, 30);

    return {
      id: id,
      comment: comment,
      posX: 0,
      startedTime: Date.now(),
    };
  };

  const onClickComment = (comment: string) => {
    const newComment = makeComment(comment);
    if (!newComment) return;
    setAnimatedComment((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(newComment.id, newComment);
      return newMap;
    });
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <div>耐久配信：チャンネル登録者数1万人耐久</div>
      <VideoWindowSizeInputs size={videoSize} setSize={setVideoSize} />

      <div className="relative aspect-video" style={{ width: videoSize.width, height: videoSize.height }}>
        {/* <div className="relative w-96 aspect-video" ref={movieRef}> */}
        <div className="h-full w-full bg-gray-700"></div>
        {/* <iframe
          width="384"
          height={(384 / 16) * 9}
          src="https://www.youtube.com/embed/9-sULuZT6Ao?autoplay=1"
          title="チルカフェで勉強に集中！ポモドーロタイマーで持続する2時間 25分サイクル"
          // frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoPlay"
          // referrerpolicy="strict-origin-when-cross-origin"
          // allowfullscreen
        /> */}
        <div className="absolute top-0 left-0 h-full w-full">
          {animatedComment.size > 0 && (
            <AnimatePresence>
              {Array.from(animatedComment.entries()).map(([key, value]) => (
                <LiveComment key={key} id={value.startedTime} posX={value.posX} comment={value.comment} />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      <div className="flex gap-1">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" onClick={() => onClickComment(comment1)}>
          コメント１
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" onClick={() => onClickComment(comment2)}>
          コメント２
        </button>
      </div>
    </div>
  );
};

interface LiveCommentProps {
  id: number;
  posX: number;
  comment: string;
}

const LiveComment = ({ id, comment, posX }: LiveCommentProps) => {
  // const randomNumber = (
  //   min: number = 0,
  //   max: number = Number.MAX_SAFE_INTEGER
  // ): number => {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };

  return (
    <motion.div
      key={id}
      className={`absolute text-2xl`}
      initial={{
        bottom: 0,
        // right: `${randomNumber(-15, 15)}%`,
        right: posX,
        opacity: 1,
      }}
      animate={{ bottom: "70%", opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: ANIMATION_DURATION / 1000,
        ease: "easeInOut",
      }}
    >
      {comment}
    </motion.div>
  );
};

type WindowSize = {
  width: number;
  height: number;
};

type WindowSizeInputsProps = {
  size: WindowSize;
  setSize: React.Dispatch<React.SetStateAction<WindowSize>>;
};

const VideoWindowSizeInputs = ({ size, setSize }: WindowSizeInputsProps) => {
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
