import { useState } from "react"
// import { useRef, useEffect, useState, useId } from "react"
import ReactPlayer from "react-player"

export default function ReactPlayerPage() {
  return <Component />
}

export interface Props {
  id?: string
}

interface VideoInfo {
  id: string
  startTime: number
}

export const Component = ({ id }: Props) => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo>({ id: "", startTime: 0 })

  const setVideo1Song1 = () => {
    setVideoInfo(VIDEO_1_SONG_1)
  }
  const setVideo1Song2 = () => {
    setVideoInfo(VIDEO_1_SONG_2)
  }
  const setVideo2Song1 = () => {
    setVideoInfo(VIDEO_2_SONG_1)
  }
  const setVideo2Song2 = () => {
    setVideoInfo(VIDEO_2_SONG_2)
  }

  return (
    <>
      <>{id}</>
      <YoutubePlayer videoId={videoInfo.id} start={Number(videoInfo.startTime)} style={{ height: 360, width: 640 }} />
      <div className="flex gap-2 p-3">
        <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer w-10 rounded-md " onClick={setVideo1Song1}>
          1-1
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer w-10 rounded-md " onClick={setVideo1Song2}>
          1-2
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer w-10 rounded-md " onClick={setVideo2Song1}>
          2-1
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 cursor-pointer w-10 rounded-md " onClick={setVideo2Song2}>
          2-2
        </button>
      </div>
    </>
  )
}

// const URL = "https://www.youtube.com/watch?v=3aNvEghsmYY&t=376"
const VIDEO_1_SONG_1 = { id: "3aNvEghsmYY", startTime: 376 }
const VIDEO_1_SONG_2 = { id: "3aNvEghsmYY", startTime: 525 }
const VIDEO_2_SONG_1 = { id: "AlHRqSsF--8", startTime: 395 }
const VIDEO_2_SONG_2 = { id: "AlHRqSsF--8", startTime: 825 }

interface YoutubePlayerProps {
  videoId: string
  start: number
  style: {
    height: number
    width: number
  }
}

export const YoutubePlayer = ({ videoId, start, style }: YoutubePlayerProps) => {
  // const playerRef = useRef<ReactPlayer>(null)

  // // だめだった。toSeekもだめだしなんなん？
  // // 動画を指定した位置から再生するFunc
  // const offSetStart = (offSetSeconds: number) => {
  //   if (playerRef != null && playerRef.current != null) {
  //     playerRef.current.seekTo(offSetSeconds)
  //   }
  // }

  // return (
  //   <ReactPlayer
  //     ref={playerRef}
  //     src={`https://www.youtube.com/watch?v=${videoId}`}
  //     playing
  //     onPlay={() => announceMediaSession()}
  //     onProgress={(state) => {
  //       setSecondsPlayed(state.playedSeconds)
  //     }}
  //     onError={(error, data, hlsInstance) => {
  //       console.log({ error, data, hlsInstance })
  //     }}
  //     onEnded={() => nextTrack()}
  //     width={0}
  //     height={0}
  //     style={{ display: "none" }}></ReactPlayer>
  // )

  return (
    // TODO: startが変わるたびに動画が再読み込みになってしまうので、正規の方法を探す
    //       startが同じなら無反応になるし
    <div key={`${videoId}_${start}`}>
      <ReactPlayer
        src={`https://www.youtube.com/watch?v=${videoId}`}
        height={style.height}
        width={style.width}
        controls
        onReady={() => {
          // offSetStart(start)
        }}
        playing
        config={{
          youtube: {
            start: start,
          },
        }}
      />
    </div>
  )
}
