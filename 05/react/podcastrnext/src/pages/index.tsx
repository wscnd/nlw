import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { api } from '../services/api'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString'

type Episode = {
   id: string
   title: string
   members: string
   published_at: string
   thumbnail: string
   description: string
   file: {
      url: string
      type: string
      duration: string
   }
}

type Data = {
   data: Episode[]
}

type HomeProps = {
   episodes: Array<Episode>
}

export default function Home(props: HomeProps): JSX.Element {
   return (
      <div>
         <pre>{JSON.stringify(props.episodes, null, 2)}</pre>
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

   return {
      props: {
         episodes
      },
      revalidate: 60 * 60 * 8
   }
}
