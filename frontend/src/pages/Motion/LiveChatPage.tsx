import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

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
  const [animatedComment, setAnimatedComment] = useState<
    Map<string, AnimatedComment>
  >(new Map());
  // const movieRef = useRef<HTMLDivElement>(undefined);
  // const { getElementProperty } =
  //   useGetElementProperty<HTMLDivElement>(movieRef);
  // const comment2 = "こんいも";

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
      <div className="relative w-96 aspect-video">
        {/* <div className="relative w-96 aspect-video" ref={movieRef}> */}
        <div className="h-full w-full bg-gray-700"></div>
        <div className="absolute top-0 left-0 h-full w-full">
          {animatedComment.size > 0 && (
            <AnimatePresence>
              {Array.from(animatedComment.entries()).map(([key, value]) => (
                <LiveComment
                  key={key}
                  id={value.startedTime}
                  posX={value.posX}
                  comment={value.comment}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      <div className="flex gap-1">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
          onClick={() => onClickComment(comment1)}
        >
          コメント１
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
          onClick={() => onClickComment(comment2)}
        >
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
        ease: "easeOut",
      }}
    >
      {comment}
    </motion.div>
  );
};
