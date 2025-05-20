import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { WindowSize, WindowSizeControllerRow } from "./WindowSizeControllerRow";
import { UnknownAvatar } from "../../assets/UnknownAvatar";

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
  message: `くまぁ\nどおだったぁ？`,
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
    width: 480 * 2.5,
    height: 270 * 2.5,
  });

  const makeComment = (chat: ChatMessage): AnimatedMessage => {
    const timeStamp = Date.now();

    return {
      id: `${timeStamp}_${chat.author}`,
      author: chat.author,
      message: chat.message,
      timeStamp: timeStamp,
    };
  };

  const onClickComment = (chat: ChatMessage) => {
    setAnimatedMessages((prev) => {
      const newMessages = [...prev, makeComment(chat)];
      if (newMessages.length > MAX_COMMENT_COUNT) {
        return newMessages.slice(-1 * MAX_COMMENT_COUNT);
      }

      return newMessages;
    });
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <div>[耐久配信]チャンネル登録者数1万人なるまでおし○ま!!</div>
      <WindowSizeControllerRow size={videoSize} setSize={setVideoSize} />

      <div className="relative aspect-video" style={{ width: videoSize.width, height: videoSize.height }}>
        <div className="h-full w-full bg-gray-700"></div>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/UdqAimX-CL8"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoPlay"
        />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-full flex flex-col justify-end truncate to:opacity">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => {
              let opacity = 1;
              switch (messages.length - i) {
                case 1:
                  opacity = 1;
                  break;
                case 2:
                  opacity = 0.95;
                  break;
                case 3:
                  opacity = 0.9;
                  break;
                case 4:
                  opacity = 0.7;
                  break;
                case 5:
                  opacity = 0.6;
                  break;
              }

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 40 }} // 下から出現
                  animate={{ opacity: opacity, y: 0 }} // 所定の位置に
                  exit={{ y: -60, opacity: 0 }} // 上に消えていく
                  layout
                  layoutId={`message-${msg.id}`}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 1,
                    layout: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    },
                  }}
                  className="flex items-start mb-2"
                >
                  <div className="flex gap-1 items-center bg-none py-1 pr-2 bg-gray-700/80 rounded-md">
                    {/* index確認用。本番では消す。 */}
                    {i}
                    <UnknownAvatar className="fill-gray-300" width={35} height={35} />
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-300">{msg.author}</span>
                      <span className="text-sm text-white">{msg.message}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
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
