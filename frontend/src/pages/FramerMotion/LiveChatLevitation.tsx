import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { WindowSize, WindowSizeControllerRow } from "./WindowSizeControllerRow";

export default function LiveChatLevitationPage() {
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
      <div>[耐久配信]チャンネル登録者数1万人なるまでおし〇ま！！</div>
      <WindowSizeControllerRow size={videoSize} setSize={setVideoSize} />

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
          {/* {animatedComment.size > 0 && (
            <AnimatePresence>
              {Array.from(animatedComment.entries()).map(([key, value]) => (
                <LiveComment key={key} id={value.startedTime} posX={value.posX} comment={value.comment} />
              ))}
            </AnimatePresence>
          )} */}
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
