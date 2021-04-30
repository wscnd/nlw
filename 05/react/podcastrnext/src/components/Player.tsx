import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import styles from './Player.module.scss'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

export function Player() {
   const audioRef = useRef<HTMLAudioElement>(null)

   const {
      episode,
      isPlaying,
      setPlayingState,
      play
   } = useContext(PlayerContext)

   useEffect(() => {
      if (!audioRef.current) {
         return
      }

      if (isPlaying) {
         audioRef.current.play()
      } else {
         audioRef.current.pause()
      }
   }, [isPlaying])

   return (
      <div className={styles.playerContainer}>
         <header>
            <img src="/playing.svg" alt="Playing Now" />
            <strong>Tocando agora </strong>
         </header>

         {episode ? (
            <div className={styles.currentEpisode}>
               <Image
                  width={592}
                  height={592}
                  src={episode.thumbnail}
                  objectFit="cover"
               />
               <strong>{episode.title}</strong>
               <span>{episode.title}</span>
            </div>
         ) : (
            <div className={styles.emptyPlayer}>
               <strong>Selecione um podcast para ouvir</strong>
            </div>
         )}

         <footer className={!episode ? styles.empty : ''}>
            <div className={styles.progress}>
               <span>00:00</span>
               <div className={styles.slider}>
                  {episode ? (
                     <Slider
                        trackStyle={{ backgroundColor: '#04d361' }}
                        railStyle={{ backgroundColor: '#9f75ff' }}
                        handleStyle={{ borderColor: '#04d361', borderWidth: 5 }}
                     />
                  ) : (
                     <div className={styles.emptySlider} />
)}
               </div>
               <span>00:00</span>
            </div>
            {episode ? (
               <audio
                  src={episode.url}
                  autoPlay
                  ref={audioRef}
                  onPlay={() => setPlayingState({ to: true })}
                  onPause={() => setPlayingState({ to: false })}>
                  <track kind="captions" />
               </audio>
            ) : null}
            <div className={styles.buttons}>
               <button type="button" disabled={!episode}>
                  <img src="/shuffle.svg" alt="Shuffle" />
               </button>
               <button
                  type="button"
                  disabled={!episode || !play.hasPrevious}
                  onClick={() => play.previous()}
               >
                  <img src="/play-previous.svg" alt="Play Previous" />
               </button>
               <button
                  type="button"
                  className={styles.playButton}
                  disabled={!episode}
                  onClick={() => setPlayingState({ toggle: true })}>
                  {isPlaying ? (
                     <img src="/pause.svg" alt="Pause" />
                  ) : (
                     <img src="/play.svg" alt="Play" />
                  )}
               </button>
               <button
                  type="button"
                  // onClick={() => playNext()}
                  disabled={!episode || !play.hasNext}
                  onClick={() => play.next()}>
                  <img src="/play-next.svg" alt="Play Next" />
               </button>
               <button type="button" disabled={!episode}>
                  <img src="/repeat.svg" alt="Repeat" />
               </button>
            </div>
         </footer>
      </div>
   )
}
