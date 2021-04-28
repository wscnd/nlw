import '../styles/global.scss'

import { useState } from 'react'

import type { NextComponentType } from 'next'
import type {
   AppContext, //
   AppInitialProps,
   AppProps
} from 'next/app'

import { Header } from '../components/Header'
import { Player } from '../components/Player'
import { PlayerContext } from '../context/PlayerContext'
import styles from '../styles/app.module.scss'

import { IEpisode } from '../pages/index'

type Episode = IEpisode & {
   duration: string
   url: string
}

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
   Component,
   pageProps
}: AppProps) => {
   const [episodeList, setEpisodeList] = useState<Episode[] | []>([])
   const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
   const [isPlaying, setIsPlaying] = useState(false)

   const data = {
      episodeList: episodeList,
      currentEpisodeIndex: currentEpisodeIndex,
      play,
      isPlaying,
      togglePlay,
      setPlayingState
   }

   function play(episode: Episode) {
      setEpisodeList([episode])
      setCurrentEpisodeIndex(0)
      setIsPlaying(true)

   }

   function togglePlay() {
      setIsPlaying((playing) => !playing)
   }
   
   function setPlayingState(state: boolean){
      setIsPlaying(state)
   }

   return (
      <div className={styles.wrapper}>
         <PlayerContext.Provider value={data}>
            <Player />
            <main>
               <Header />
               <Component {...pageProps} />
            </main>
         </PlayerContext.Provider>
      </div>
   )
}

export default MyApp
