import { theme as chakraTheme } from '@chakra-ui/core'

const fonts =   {
  body: "'Roboto Slab', seri",
  heading: "'Bebas Neue', serif",
  mono: "Menlo, monospace",
}

const breakpoints = ['450px', '769px', '1080px']

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: '#000',
  },
  fonts,
  fontWeights: {
    normal: 300,
    medium: 400,
    bold: 600,
    black: 900,
  },
  fontSizes: {
    xs: "10px",
    sm: "12px",
    md: "14px",
    normal: "16px",
    lg: "18px",
    xl: "24px",
    xxl: "28px",
    xxxl: "32px",
    slidermbl: "40px",
    lemaVid: "45px",
    sizemenu: "50px",
    big: "50px",
    huge: "80px",
  },
  breakpoints,
  icons: {
    ...chakraTheme.icons
  }
}

export default theme