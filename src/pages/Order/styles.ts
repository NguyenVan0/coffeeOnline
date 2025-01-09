import styled from 'styled-components'
import { defaultTheme } from '../../styles/themes/default'

export const Container = styled.section`
  max-width: calc(70rem + 4.5rem);
  padding: 5rem 2.25rem;
  margin-right: auto;
  margin-left: auto;

  header {
    margin-bottom: 2.5rem;

    h1 {
      color: ${(props) => props.theme['yellow-800']};
      font-size: 2rem;
      font-weight: 800;
      line-height: 1.3;
    }

    p {
      color: ${(props) => props.theme['gray-800']};
      font-size: 1.25rem;
      font-weight: 400;
      line-height: 1.3;
    }
  }
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 2.5rem;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
  }
`

export const OrderInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  background: ${(props) =>
    `linear-gradient(
            ${props.theme['gray-50']},
            ${props.theme['gray-50']}
        ) padding-box,
        linear-gradient(
            to right,
            ${props.theme['yellow-500']},
            ${props.theme['purple-700']}
        ) border-box`};
  padding: 2.5rem;
  border: 1px solid transparent;
  border-radius: 6px 36px;

  @media (max-width: 640px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
  }
`

export const Info = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  p {
    font-weight: 400;
    line-height: 1.3;
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

interface InfoIconProps {
  $variant: keyof typeof defaultTheme
}

export const InfoIcon = styled(RoundIcon)<InfoIconProps>`
  background-color: ${(props) => props.theme[props.$variant]};
`

export const Illustration = styled.div`
  display: flex;
  justify-content: end;
  width: 50%;

  @media (max-width: 640px) {
    justify-content: center;
    width: 100%;
  }
`
