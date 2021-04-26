import {
   format,
   parseISO
} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import {
   GetStaticPaths,
   GetStaticProps
} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'

import { api } from '../../services/api'
import {
   convertDurationToTimeString
} from '../../utils/convertDurationToTimeString'
import { IEpisode } from '../index'
import styles from './episode.module.scss'

type Epi = IEpisode & {
   publishedAt: string
   duration: string
   url: string
   description: string
}

type Props = {
   episode: Epi
}

export default function Episode({ episode }: Props) {
   return (
      <div className={styles.episode}>
         <div className={styles.thumbnailContainer}>
            <Link href="/">
               <button>
                  <img src="/arrow-left.svg" alt="Voltar" />
               </button>
            </Link>
            <Image
               width={700}
               height={160}
               src={episode.thumbnail}
               objectFit="cover"
            />
            <button>
               <img src="/play.svg" alt="Play episode!" />
            </button>
         </div>

         <header>
            <h1>{episode.title}</h1>
            <span>{episode.members}</span>
            <span>{episode.publishedAt}</span>
            <span>{episode.duration}</span>
         </header>

         <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: episode.description }}
         />
      </div>
   )
}

export const getStaticPaths: GetStaticPaths = async () => {
   return {
      paths: [],
      fallback: 'blocking'
   }
}

interface Params extends ParsedUrlQuery {
   epi: string
}

export const getStaticProps: GetStaticProps = async (ctx) => {
   const { epi } = ctx.params as Params
   const { data } = await api.get(`episodes/${epi}`)

   const episode = {
      id: data.id,
      title: data.title,
      thumbnail: data.thumbnail,
      members: data.members,
      publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
         locale: ptBR
      }),
      duration: convertDurationToTimeString(Number(data.file.duration)),
      url: data.file.url,
      description: data.description
   }
   return {
      props: { episode },
      revalidate: 60 * 60 * 24
   }
}
