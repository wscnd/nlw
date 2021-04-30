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
import styles from '../styles/app.module.scss'
import { PlayerContextProvider } from '../context/PlayerContext'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
   Component,
   pageProps
}: AppProps) => {
   return (
      <PlayerContextProvider>
         <div className={styles.wrapper}>
            <Player />
            <main>
               <Header />
               <Component {...pageProps} />
            </main>
         </div>
      </PlayerContextProvider>
   )
}

export default MyApp
