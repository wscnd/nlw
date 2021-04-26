import { GetStaticProps } from 'next'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'
import styles from './home.module.scss'

interface Episode {
   id: string
   title: string
   members: string
   thumbnail: string
   description: string
}

type EpisodeProps = Episode & {
   publishedAt: string
   duration: string
   url: string
}

type EpisodeData = Episode & {
   published_at: string
   file: {
      url: string
      duration: string
   }
}

type Data = {
   data: EpisodeData[]
}

type HomeProps = {
   latestEpisodes: Array<EpisodeProps>
   otherEpisodes: Array<EpisodeProps>
}

export default function Home({
   latestEpisodes,
   otherEpisodes
}: HomeProps): JSX.Element {
   return (
      <div className={styles.homepage}>
         <section className={styles.latestEpisodes}>
            <h2>Últimos lançamentos</h2>
            <ul>
               {latestEpisodes.map((epi) => {
                  return (
                     <li key={epi.id}>
                        <Image
                           width={192}
                           height={192}
                           objectFit="cover"
                           src={epi.thumbnail}
                           alt={epi.title}
                        />

                        <div className={styles.episodeDetails}>
                           <a href={epi.url}>{epi.title}</a>
                           <p>{epi.members}</p>
                           <span>{epi.publishedAt}</span>
                           <span>{epi.duration}</span>
                        </div>

                        <button type="button">
                           <img src="/play-green.svg" alt="Play Episode" />
                        </button>
                     </li>
                  )
               })}
            </ul>
         </section>
         <section className={styles.allEpisodes}>
            <h2>Todos os episódios</h2>
            <table cellSpacing={0}>
               <thead>
                  <th></th>
                  <th>Podcast</th>
                  <th>Integrantes</th>
                  <th>Data</th>
                  <th>Duracao</th>
                  <th></th>
               </thead>

               <tbody>
                  {otherEpisodes.map((episode) => {
                     return (
                        <tr key={episode.id}>
                           <td style={{ width: 72 }}>
                              <Image
                                 width={120}
                                 height={120}
                                 src={episode.thumbnail}
                                 alt={episode.title}
                                 objectFit="cover"
                              />
                           </td>
                           <td>
                              <a href={episode.url}>{episode.title}</a>
                           </td>
                           <td>{episode.members}</td>
                           <td style={{ width: 100 }}>{episode.publishedAt}</td>
                           <td>{episode.duration}</td>
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
         url: episode.file.url,
         description: episode.description
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
