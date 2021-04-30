import {
   createContext, //
   ReactElement,
   useEffect,
   useState
} from 'react'
import { IEpisode } from '../pages/index'

type Episode = IEpisode & {
   duration: string
   url: string
}

type PlayerContextData = {
   // episodeList: Episode[]
   // currentEpisodeIndex: number
   isPlaying: boolean
   // playNext: () => void
   // playPrevious: () => void
   setPlayingState: ({
      state,
      toggle
   }: {
      state?: boolean
      toggle?: boolean
   }) => void
   playList: (arg0: Episode[], arg1: number) => void
   play: {
      hasNext: boolean
      hasPrevious: boolean
      next: () => void
      previous: () => void
   }
   episode: Episode
}

type ChildrenProps = {
   children: ReactElement
}

export const PlayerContext = createContext({} as PlayerContextData)

export const PlayerContextProvider = ({ children }: ChildrenProps) => {
   const [episodeList, setEpisodeList] = useState<Episode[] | []>([])
   const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
   const [isPlaying, setIsPlaying] = useState(false)
   const [episode, setEpisode] = useState(episodeList[currentEpisodeIndex])

   function playList(list: Episode[], episodeIndex: number) {
      setEpisodeList(list)
      setCurrentEpisodeIndex(episodeIndex)
      setIsPlaying(true)
   }

   useEffect(() => {
      setEpisode(episodeList[currentEpisodeIndex])

      console.log('current', currentEpisodeIndex)
   }, [isPlaying, currentEpisodeIndex])

   const play = {
      hasNext: currentEpisodeIndex + 1 < episodeList.length,
      hasPrevious: currentEpisodeIndex - 1 >= 0,
      next: () => setCurrentEpisodeIndex((current) => current + 1),
      previous: () => setCurrentEpisodeIndex((current) => current - 1)
   }

   function setPlayingState({ state = false, toggle = false }) {
      const setTo = toggle ? !isPlaying : state
      setIsPlaying(setTo)
   }

   // function playNext() {
   //    const nextEpisode = currentEpisodeIndex + 1
   //    if (nextEpisode >= episodeList.length) {
   //       return
   //    }
   //    setCurrentEpisodeIndex((current) => current + 1)
   //    console.log('next')
   // }

   // function playPrevious() {
   //    console.log('previous')
   //    const previousEpisode = currentEpisodeIndex - 1
   //    if (previousEpisode < 0) {
   //       return
   //    }
   //    setCurrentEpisodeIndex((current) => current - 1)
   // }

   const data = {
      episode,
      isPlaying,
      setPlayingState,
      playList,
      play
      // playPrevious,
      // playNext
   }
   return (
      <PlayerContext.Provider value={data}>{children}</PlayerContext.Provider>
   )
}
