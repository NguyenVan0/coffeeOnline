import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
    }

    @media (max-width: 1080px) {
        html {
            font-size: 93.75%;
        }
    }

    @media (max-width: 728px) {
        html {
            font-size: 87.5%;
        }
    }

    body {
        background-color: ${(props) => props.theme['gray-50']};
        color: ${(props) => props.theme['gray-700']};
        font-family: ${(props) => props.theme['font-secondary']};
        -webkit-font-smoothing: antialiased;
    }

    h1,
    h2,
    h3 {
        font-family: ${(props) => props.theme['font-primary']};
        font-weight: 800;
    }

    h4,
    h5,
    h6 {
        font-family: ${(props) => props.theme['font-primary']};
        font-weight: 700;
    }

    img {
        max-width: 100%;
        height: auto;
        display: block;
    }

    input, textarea, button {
        font-family: ${(props) => props.theme['font-secondary']};
        outline: 0;
    }

    button {
        cursor: pointer;
    }
`
