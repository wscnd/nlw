import {
   format, //
   parseISO
} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { api } from '../services/api'
import {
   convertDurationToTimeString //
} from '../utils/convertDurationToTimeString'
import styles from './index.module.scss'

export interface IEpisode {
   id: string
   title: string
   members: string
   thumbnail: string
   description: string
}

type EpisodeProps = IEpisode & {
   publishedAt: string
   duration: string
   url: string
}

type EpisodeData = IEpisode & {
   published_at: string
   file: {
      url: string
      duration: string
   }
}

type Data = {
   data: EpisodeData[]
}

type Props = {
   latestEpisodes: Array<EpisodeProps>
   otherEpisodes: Array<EpisodeProps>
}

export default function Home({
   latestEpisodes,
   otherEpisodes
}: Props): JSX.Element {
   return (
      <div className={styles.homepage}>
         <Head>
            <title>Home | Podcastr</title>
         </Head>
         <section className={styles.latestEpisodes}>
            <h2>Últimos lançamentos</h2>
            <ul>
               {latestEpisodes.map((epi) => (
                  <li key={epi.id}>
                     <Image
                        width={192}
                        height={192}
                        objectFit="cover"
                        src={epi.thumbnail}
                        alt={epi.title}
                     />

                     <div className={styles.episodeDetails}>
                        <Link href={`/episode/${epi.id}`}>
                           <a>{epi.title}</a>
                        </Link>
                        <p>{epi.members}</p>
                        <span>{epi.publishedAt}</span>
                        <span>{epi.duration}</span>
                     </div>

                     <button type="button">
                        <img src="/play-green.svg" alt="Play Episode" />
                     </button>
                  </li>
               ))}
            </ul>
         </section>
         <section className={styles.allEpisodes}>
            <h2>Todos os episódios</h2>
            <table cellSpacing={0}>
               <thead>
                  <tr>
                     <th></th>
                     <th>Podcast</th>
                     <th>Integrantes</th>
                     <th>Data</th>
                     <th>Duracao</th>
                     <th></th>
                  </tr>
               </thead>

               <tbody>
                  {otherEpisodes.map((epi) => {
                     return (
                        <tr key={epi.id}>
                           <td style={{ width: 72 }}>
                              <Image
                                 width={120}
                                 height={120}
                                 src={epi.thumbnail}
                                 alt={epi.title}
                                 objectFit="cover"
                              />
                           </td>
                           <td>
                              <a href={`/episode/${epi.id}`}>{epi.title}</a>
                           </td>
                           <td>{epi.members}</td>
                           <td style={{ width: 100 }}>{epi.publishedAt}</td>
                           <td>{epi.duration}</td>
                           <td>
                              <button type="button">
                                 <img
                                    src="/play-green.svg"
                                    alt="Play Episode"
                                 />
                              </button>
                           </td>
                        </tr>
                     )
                  })}
               </tbody>
            </table>
         </section>
         {/* <pre>{JSON.stringify(episodes, null, 2)}</pre> */}
      </div>
   )
}

export const getStaticProps: GetStaticProps = async () => {
   const { data }: Data = await api.get('episodes', {
      params: {
         _limit: 12,
         _sort: 'published_at',
         _order: 'desc'
      }
   })

   const episodes = data.map((episode) => {
      return {
         id: episode.id,
         title: episode.title,
         thumbnail: episode.thumbnail,
         members: episode.members,
         publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
            locale: ptBR
         }),
         duration: convertDurationToTimeString(Number(episode.file.duration)),
         url: episode.file.url
      }
   })
   const latestEpisodes = episodes.slice(0, 2)
   const otherEpisodes = episodes.slice(2, episodes.length)

   return {
      props: {
         latestEpisodes,
         otherEpisodes
      },
      revalidate: 60 * 60 * 8
   }
}
