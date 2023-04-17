import customTheme from '@/styles/theme'
import  {ChakraProvider} from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import '@fontsource/lexend'
import "@/styles/menuList.css"
import "@/styles/formStyle.css"


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
 
   
  )
}
