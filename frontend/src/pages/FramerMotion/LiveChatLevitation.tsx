import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { WindowSize, WindowSizeControllerRow } from "./WindowSizeControllerRow";

export default function LiveChatLevitationPage() {
  return <Component />;
}

export interface Props {
  id?: string;
}

const message1: ChatMessage = {
  author: "すし",
  message: "こんすし🍣",
};

const message2: ChatMessage = {
  author: "いも",
  message: "こんいも～🍃",
};

const message3: ChatMessage = {
  author: "くま",
  message: "くまぁ",
};

type ChatMessage = {
  author: string;
  message: string;
};

type AnimatedMessage = {
  id: string;
  author: string;
  message: string;
  timeStamp: number;
};

const MAX_COMMENT_COUNT = 5;

export const Component = () => {
  const [messages, setAnimatedMessages] = useState<AnimatedMessage[]>([]);
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
      <div>[耐久配信]チャンネル登録者数1万人なるまでおし〇ま！！</div>
      <WindowSizeControllerRow size={videoSize} setSize={setVideoSize} />

      <div className="relative aspect-video" style={{ width: videoSize.width, height: videoSize.height }}>
        <div className="h-full w-full bg-gray-700"></div>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/UdqAimX-CL8"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoPlay"
        />

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
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" onClick={() => setAnimatedMessages([])}>
          クリア
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" onClick={() => onClickComment(message1)}>
          コメント１
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" onClick={() => onClickComment(message2)}>
          コメント２
        </button>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" onClick={() => onClickComment(message3)}>
          コメント３
        </button>
      </div>
    </div>
  );
};
