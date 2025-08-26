import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SkipIcon } from "../../Icons/1-icons";
import { BackIcon } from "../../Icons/2-icons";
import { NoteCircleIcon } from "../../Icons/3-cons";

export default function ControllerPage() {
  return <Component />;
}

export interface Props {
  id?: string;
}

export const Component = () => {
  const [isDisplay, setIsDisplay] = useState<boolean>(false);

  return (
    <div>
      <div className="flex flex-col w-40 h-60 bg-zinc-600 justify-between overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <div>その他の要素</div>
          <div className="pt-6">{isDisplay ? "ボタン多" : "ボタン少"}</div>
        </div>
        <div className="flex flex-col h-fit w-40 bg-zinc-700">
          <div className="relative flex flex-col w-full bg-gray-800">
            {/* １ */}
            <AnimatePresence>
              {/* ４ */}
              {isDisplay && (
                <MotionDiv key="top-section1">
                  <div className={`flex bg-green-800 h-8 `}>動画を再生中</div>
                </MotionDiv>
              )}
              {isDisplay && (
                // ５
                <MotionDiv key="top-section2">
                  <div className={`flex bg-green-700 h-8`}>動画タイトル</div>
                </MotionDiv>
              )}
            </AnimatePresence>

            <div className="flex z-10">
              <div>
                {/* ３ */}
                <div className={`flex bg-blue-700 h-8 w-16`}>
                  <BackIcon />
                  <BackIcon />
                </div>

                {/* ７ */}
                {/* 高さが3段目⇔2段目になるように調整 */}
                <motion.div
                  className="absolute z-20 right-0 hover:bg-blue-600 bg-blue-700 hover:bg-opacity-20 rounded-full p-1 cursor-pointer"
                  layout
                  style={{ bottom: isDisplay ? movingHeight : 0 }}
                  transition={{
                    mass: 1,
                  }}
                >
                  <NoteCircleIcon />
                </motion.div>
              </div>

              {/* ６ */}
              <AnimatePresence>
                {isDisplay && (
                  <MotionDiv key="skip-section" className={`flex bg-yellow-700 h-8 w-24 }`}>
                    {/* <BackIcon /> */}
                    <SkipIcon />
                    <SkipIcon />
                    <SkipIcon />
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ２ */}
          <div className="h-8 bg-blue-700 relative z-10">user_name</div>
        </div>
      </div>
      <div className="bg-green-600 text-sm w-fit m-2 p-1 rounded hover:bg-green-700 cursor-pointer" onClick={() => setIsDisplay((b) => !b)}>
        表示切替
      </div>
    </div>
  );
};

const movingHeight = 32; // 動く高さ

const MotionDiv = ({ children, className }: { layoutId?: string; children: React.ReactNode; className?: string }) => {
  return (
    <>
      <motion.div
        className={`${className} z-0`}
        initial={{ y: movingHeight }} // 下から出現
        animate={{ opacity: 1, y: 0 }} // 所定の位置に
        exit={{ y: movingHeight, opacity: 0 }} // 下に消えていく
        transition={{
          mass: 1,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
