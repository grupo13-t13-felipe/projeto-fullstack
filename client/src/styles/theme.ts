import {extendTheme} from '@chakra-ui/react'

const customTheme = extendTheme({
    colors: {
        blue: {
            100: "#EDEAFD",
            200: "#B0A6F0",
            300: "#4529E6",
            400: "#5126EA",
        },

        grey: {
            0: "#FFFFFF",
            25: "#FDFDFD",
            50: "#F8F9FA",
            75: "#F1F3F5",
            100: "#E9ECEF",
            125: "#DEE2E6",
            150: "#CED4DA",
            200: "#ADB5BD",
            250: "#868E96",
            300: "#495057",
            400: "#212529",
            500: "#0B0D0D"
        },

        red: {
            100: "#FFE5E5",
            200: "#FDD8D8",
            700: "#CD2B31",
          },
          green: {
            100: "#DDF3E4",
            200: "#CCEBD7",
            700: "#18794E",
            800: "#349974"
          },
    },
    fonts: {
        heading: "Lexend, sans-serif",
        body: "Lexend, sans-serif",
      },
       fontSizes: {
        xs: "0.75rem", //12px
        sm: "0.875rem", //14px
        md: "1rem",  //16px
        lg: "1.125rem", //18px
        xl: "1.25rem", //20px
        "2xl": "1.5rem", //24px
        "3xl": "1.75rem", //28px
        "4xl": "2rem", //32px
        "5xl": "2.25rem", //36px
        "6xl": "2.75rem", //44px,
      },
      fontWeights: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
    
      radii: {
        none: "0",
        sm: "0.125rem", //2px
        base: "0.25rem", //4px
        md: "0.375rem", //6px
        lg: "0.5rem", //8px
        xl: "0.75rem", //12px
        "2xl": "1rem", //16px
        "3xl": "1.5rem", //24px
      }
})

export default customTheme

