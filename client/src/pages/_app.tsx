import customTheme from '@/styles/theme'
import  {ChakraProvider} from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import '@fontsource/lexend'
import "@/styles/menuList.css"
import { AnnouncementProvider } from '@/contexts/announcements.context'
import "@/styles/formStyle.css"
import { UserContextProvider } from '@/contexts/users.context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <UserContextProvider>
        <AnnouncementProvider>
          <Component {...pageProps} />
        </AnnouncementProvider>
      </UserContextProvider>
    </ChakraProvider>
  )
}
