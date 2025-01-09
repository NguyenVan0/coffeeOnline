import styled from 'styled-components'
import { defaultTheme } from '../../../../styles/themes/default'

import backgroundImg from '../../../../assets/images/hero-background.svg'

export const ContainerFluid = styled.section`
  width: 100%;
  position: relative;
  background-image: url(${backgroundImg});
  background-size: contain;
  background-repeat: repeat-x;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(80px);
  }
`

export const Wrapper = styled.div`
  max-width: calc(70rem + 4.5rem);
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 5.625rem 2.25rem;
  margin-right: auto;
  margin-left: auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    row-gap: 2rem;
    padding-top: 3.75rem;
    padding-bottom: 3.75rem;
  }
`

export const Content = styled.div`
  width: 58%;
  display: flex;
  flex-direction: column;
  padding-right: 3rem;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 50rem;
    padding-right: 0;
  }

  header {
    margin-bottom: 3.75rem;

    h1 {
      color: ${(props) => props.theme['gray-900']};
      font-size: 3rem;
      line-height: 1.3;
      margin-bottom: 1rem;
    }

    p {
      color: ${(props) => props.theme['gray-800']};
      font-size: 1.25rem;
      font-weight: 400;
      line-height: 1.3;
    }
  }
`

export const Perks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1.25rem;
  list-style: none;
`

export const Perk = styled.li`
  width: 50%;
  display: flex;
  align-items: center;
  flex-grow: 1;
  column-gap: 0.75rem;

  @media (max-width: 640px) {
    width: 100%;
  }

  &:nth-of-type(odd) {
    padding-right: 1.25rem;

    @media (max-width: 640px) {
      padding-right: 0;
    }
  }
`

const RoundIcon = styled.span`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white};
  border-radius: 100%;
`

interface PerkIconProps {
  $variant: keyof typeof defaultTheme
}

export const PerkIcon = styled(RoundIcon)<PerkIconProps>`
  background-color: ${(props) => props.theme[props.$variant]};
`

export const Image = styled.div`
  width: 42%;
  display: flex;
  justify-content: end;
  align-items: center;

  @media (max-width: 1024px) {
    width: 100%;
  }
`
