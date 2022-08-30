import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren
} from 'react'
import { theme } from '@/styles/theme'

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

const tc = (dark = false) => (dark ? 'theme-dark' : 'theme-light')

const defaultContextData = {
  dark: false,
  themeClass: 'theme-light',
  hasThemeMounted: false,
  toggle: () => {}
}

const ThemeContext = createContext(defaultContextData)
const useTheme = () => useContext(ThemeContext)

const useEffectDarkMode = () => {
  const [themeState, setThemeState] = useState(defaultContextData)
  useEffect(() => {
    const matchMediaDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const lsDark = localStorage.getItem('dark') === 'true'
    const dark = lsDark || matchMediaDark // use localStorage setting first, fallback to matchMedia
    const themeClass = tc(dark)
    document.body.className = themeClass
    setThemeState(t => ({
      ...themeState,
      dark,
      themeClass,
      hasThemeMounted: true
    }))
    // eslint-disable-next-line
  }, [])

  return { themeState, setThemeState }
}

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { themeState, setThemeState } = useEffectDarkMode()

  if (!themeState.hasThemeMounted) {
    return <></>
  }

  const toggle = () => {
    const dark = !themeState.dark
    const themeClass = tc(dark)
    localStorage.setItem('dark', JSON.stringify(dark))
    setThemeState({ ...themeState, dark, themeClass })
    document.body.className = themeClass
  }

  const computedTheme = theme(themeState.dark)
  return (
    <EmotionThemeProvider theme={computedTheme}>
      <ThemeContext.Provider
        value={{
          ...themeState,
          dark: themeState.dark,
          themeClass: themeState.themeClass,
          toggle
        }}
      >
        {children}
      </ThemeContext.Provider>
    </EmotionThemeProvider>
  )
}

export { ThemeProvider, useTheme }
