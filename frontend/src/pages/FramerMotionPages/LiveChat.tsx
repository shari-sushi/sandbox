import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { WindowSize, WindowSizeControllerRow } from "./internal/WindowSizeControllerRow";

export default function LiveChatPage() {
  return <Component />;
}

export interface Props {
  id?: string;
}

const ANIMATION_DURATION_SEC: number = 1.5;
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

  const makeComment = (comment: string): AnimatedComment | undefined => {
    const id = `${Date.now()}_${comment}`;
    if (animatedComment.has(id)) return;

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
      <WindowSizeControllerRow size={videoSize} setSize={setVideoSize} />

      <div className="relative aspect-video" style={{ width: videoSize.width, height: videoSize.height }}>
        <iframe
          src="https://www.youtube.com/embed/9-sULuZT6Ao"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoPlay"
          width={videoSize.width}
          height={videoSize.height}
        />
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

// NOTE: 弾幕表示はドワンゴの著作物なので実装不可
const LiveComment = ({ id, comment, posX }: LiveCommentProps) => {
  return (
    <motion.div
      key={id}
      className={`absolute text-2xl`}
      initial={{
        bottom: 0,
        right: posX,
        opacity: 1,
      }}
      animate={{ bottom: "70%", opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: ANIMATION_DURATION_SEC / 1000,
        ease: "easeInOut",
      }}
    >
      {comment}
    </motion.div>
  );
};
