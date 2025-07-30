import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Icon4 } from "../../Icons/4-icons";
import { Icon5 } from "../../Icons/5-icons";
import { Icon6 } from "../../Icons/6-icons";

export default function BehaviorMotionDivPage() {
  return <Component />;
}

export interface Props {
  id?: string;
}

export const Component = () => {
  const [isDisplay, setIsDisplay] = useState<boolean>(true);

  const test1 = "test1";

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex flex-col gap-2 w-fit p-2 bg-zinc-700">
        <div className="ml-3">
          <li>layoutIdが一致して入れば、表示/非表示にするだけで繋ぐようなモーションを作ってくれる</li>
          <li>layoutIdは変数での共通化可</li>
        </div>
        <div className="relative flex h-40 w-40 bg-zinc-600">
          <AnimatePresence>
            <motion.div layoutId={test1} className="w-6 h-6">
              {isDisplay && <Icon4 />}
            </motion.div>
            {!isDisplay && (
              <motion.div layoutId={test1} className="absolute right-0 bottom-0 w-6 h-6">
                <Icon5 />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="ml-3">
          <li>同時に同じlayoutIdが2つ存在するとき、片方は要素ごと消されるっぽい</li>
        </div>
        <div className="relative flex h-40 w-40 bg-zinc-600">
          <AnimatePresence>
            <motion.div layoutId="test2" className="w-6 h-6">
              {isDisplay && <Icon4 />}
            </motion.div>
            {!isDisplay && (
              <motion.div layoutId="test2" className="absolute right-0 bottom-0 w-6 h-6">
                <Icon5 />
              </motion.div>
            )}
            {!isDisplay && (
              <motion.div layoutId="test2" className="absolute left-0 bottom-0 w-6 h-6">
                <Icon6 />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="ml-3"></div>

        <div className="bg-blue-800 hover:bg-blue-700 w-20 flex items-center justify-center rounded-md cursor-pointer active:bg-blue-900" onClick={() => setIsDisplay((b) => !b)}>
          切り替え
        </div>
      </div>
    </div>
  );
};
