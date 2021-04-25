export default function Home(props: {
   episodes: Record<string, any>
}): JSX.Element {
   return (
      <div>
         <h1>Index</h1>
         <pre>{JSON.stringify(props.episodes, null, 2)}</pre>
      </div>
   )
}

export async function getStaticProps() {
   const response = await fetch('http://localhost:3333/episodes')
   const data = await response.json()

   return {
      props: {
         episodes: data
      },
      revalidate: 60 * 60 * 8
   }
}
