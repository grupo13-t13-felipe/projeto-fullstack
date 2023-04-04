import {createGlobalStyle} from 'styled-components'
import {Lexend} from 'next/font/google'

// const lexend = Lexend({subsets: ['latin']})

export const GlobalStyle = createGlobalStyle`

    :root {
        --color-primary: #4529E6;
        --color-secundary: #5126EA;
        --color-tertiary: #B0A6F0;
        --color-quaternary: #EDEAFD;

        --color-grey0: #0B0D0D;
        --color-grey1: #212529;
        --color-grey2: #495057;
        --color-grey3: #868E96;
        --color-grey4: #ADB5BD;
        --color-grey5: #CED4DA;
        --color-grey6: #DEE2E6;
        --color-grey7: #E9ECEF;
        --color-grey8: #F1F3F5;
        --color-grey9: #F8F9FA;
        --color-grey10: #FDFDFD;
        --color-whiteFixed: #FFFFFF;

        --color-alert: #CD2B31;
        --color-success: #18794E;

        --radius-1: 4px;
        --radius-2: 8px;

        --font-weigth-1: 800;
        --font-weigth-2: 700;
        --font-weigth-3: 600;
        --font-weigth-4: 500;
        --font-weigth-5: 400;

        --font-heading-1: 44px;
        --font-heading-2: 36px;
        --font-heading-3: 32px;
        --font-heading-4: 28px;
        --font-heading-5: 24px;
        --font-heading-6: 20px;
        --font-heading-7: 16px;

        --font-body-1: 16px;
        --font-body-2: 14px;
        
        --font-button-1: 16px;
        --font-button-2: 14px;

        --font-input-placeholder: 16px;
        --font-input-label: 14px;
    }

    html,
    body,
    header,
    ul,
    li,
    img,
    p,
    h1,
    h2,
    h3,
    nav,
    div,
    a,
    section,
    form,
    input,
    select,
    button,
    option,
    label {
        margin: 0;
        padding: 0;
        list-style: none;
        text-decoration: none;
        outline: none;
        border: none;
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
    }
`