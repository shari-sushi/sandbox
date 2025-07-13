import { AnimatePresence, motion } from "framer-motion";

export default function BehaviorAnimatePresencePage() {
  return <Component />;
}

export interface Props {
  id?: string;
}

export const Component = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="w-fit p-2">
        <div>AnimatePresenceは要素的に無視されてる様子。</div>
        <div className="ml-3">
          <li>AnimatePresenceの親要素にflexを設定したところ、AnimatePresenceの各子要素に効いて横並びになっている</li>
          <li>要素1~3と要素A~Cは別々のAnimatePresenceを親に持つが、全て横並びになっている</li>
          <li>AnimatePresenceにclass, className, Styleプロパティが無い</li>
        </div>
        <div className="flex gap-2 w-80 h-30 items-center justify-center bg-zinc-600 overflow-hidden">
          <AnimatePresence>
            <MotionDivUp>
              <div className={`bg-green-700`}>要素１</div>
            </MotionDivUp>
            <MotionDivUp>
              <div className={`bg-green-800`}>要素２</div>
            </MotionDivUp>
            <MotionDivUp>
              <div className={`bg-green-900`}>要素３</div>
            </MotionDivUp>
          </AnimatePresence>
          <AnimatePresence>
            <MotionDivDown>
              <div className={`bg-blue-700`}>要素A</div>
            </MotionDivDown>
            <MotionDivDown>
              <div className={`bg-blue-800`}>要素B</div>
            </MotionDivDown>
            <MotionDivDown>
              <div className={`bg-blue-900`}>要素C</div>
            </MotionDivDown>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const movingHeight = 32 * 4; // 動く高さ

const MotionDivUp = ({ children, className }: { layoutId?: string; children: React.ReactNode; className?: string }) => {
  return (
    <>
      <motion.div
        className={`${className} z-0`}
        initial={{ y: movingHeight }} // 下から出現
        animate={{ opacity: 1, y: 0 }} // 所定の位置に
        transition={{
          mass: 1,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

const MotionDivDown = ({ children, className }: { layoutId?: string; children: React.ReactNode; className?: string }) => {
  return (
    <>
      <motion.div
        className={`${className} z-0`}
        initial={{ y: -movingHeight }} // 下から出現
        animate={{ opacity: 1, y: 0 }} // 所定の位置に
        transition={{
          mass: 1,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
