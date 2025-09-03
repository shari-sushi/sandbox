import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { WindowSize, WindowSizeControllerRow } from "./internal/WindowSizeControllerRow"
import ReactPlayer from "react-player"

export default function LiveChatPage() {
  return <Component />
}

export interface Props {
  id?: string
}

const ANIMATION_DURATION: number = 1.5
const comment1 = "こんすし🍣"
const comment2 = "こんいも🍃"

type AnimatedComment = {
  id: string
  comment: string
  posX: number
  startedTime: number
}

export const Component = () => {
  const [animatedComment, setAnimatedComment] = useState<Map<string, AnimatedComment>>(new Map())
  const [videoSize, setVideoSize] = useState<WindowSize>({
    width: 480,
    height: 270,
  })

  const makeComment = (comment: string): AnimatedComment | undefined => {
    const id = `${Date.now()}_${comment}`
    if (animatedComment.has(id)) return

    return {
      id: id,
      comment: comment,
      posX: 0,
      startedTime: Date.now(),
    }
  }

  const onClickComment = (comment: string) => {
    const newComment = makeComment(comment)
    if (newComment == null) return

    setAnimatedComment((prevMap) => {
      const newMap = new Map(prevMap)
      newMap.set(newComment.id, newComment)
      return newMap
    })
  }

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="text-2xl">〇コメントが流れるようなアニメーション</div>
      <div className="ml-4">
        <div className="mb-6">
          <WindowSizeControllerRow size={videoSize} setSize={setVideoSize} />
        </div>
        <h2 className="font-bold text-xl">#blender 】しもべクリスマス衣装作るつづき！【妹望おいも】</h2>

        <div className="relative aspect-video" style={{ width: videoSize.width, height: videoSize.height }}>
          <ReactPlayer
            src="https://youtu.be/u6QR6mr_eg8?t=4340"
            controls
            playing
            volume={0.01}
            config={{
              youtube: {
                color: "white",
                start: 4340,
              },
            }}
            style={{
              width: videoSize.width,
              height: videoSize.height,
            }}
          />
          <div className="absolute top-0 left-0 h-full w-full pointer-events-none">
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
            コメント(こんすし🍣)
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer" onClick={() => onClickComment(comment2)}>
            コメント(こんいも🍃)
          </button>
        </div>
      </div>
    </div>
  )
}

interface LiveCommentProps {
  id: number
  posX: number
  comment: string
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
      }}
      animate={{ bottom: "70%", opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: ANIMATION_DURATION,
        ease: "easeInOut",
      }}>
      {comment}
    </motion.div>
  )
}
