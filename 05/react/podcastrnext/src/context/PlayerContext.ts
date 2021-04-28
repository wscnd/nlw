import { createContext } from 'react'

import { IEpisode } from '../pages/index'

type Episode = IEpisode & {
   duration: string
   url: string
}

type PlayerContextData = {
   episodeList: Episode[]
   currentEpisodeIndex: number
   play: (arg0: Episode) => void
   isPlaying: boolean
   togglePlay: () => void
   setPlayingState: (arg0: boolean)=>void
}

export const PlayerContext = createContext({} as PlayerContextData)
