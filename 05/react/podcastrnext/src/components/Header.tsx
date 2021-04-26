import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import Link from 'next/link'

import styles from './Header.module.scss'

export function Header() {
   const createDate = format(new Date(), 'EEEEEE, d MMMM', {
      locale: ptBR
   })

   return (
      <header className={styles.headerContainer}>
         <Link href="/" passHref>
            <img src="/logo.svg" alt="Podcastr" />
         </Link>
         <p>O melhor pra você ouvir, sempre</p>
         <span>{createDate}</span>
      </header>
   )
}
