import type { NextComponentType } from 'next'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
   Component,
   pageProps
}: AppProps) => {
   return <Component {...pageProps} />
}

export default MyApp
