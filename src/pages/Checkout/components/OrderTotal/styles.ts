import styled, { css } from 'styled-components'

export const OrderTotalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  row-gap: 0.75rem;
  margin-bottom: 1.5rem;
`

interface SpanProps {
  $bold?: boolean
}

export const Label = styled.span<SpanProps>`
  font-size: 0.875rem;
  font-weight: 400;

  ${(props) =>
    props.$bold &&
    css`
      color: ${(props) => props.theme['gray-800']};
      font-size: 1.25rem;
      font-weight: 700;
    `}
`

export const Price = styled.span<SpanProps>`
  text-align: right;
  font-weight: 400;

  ${(props) =>
    props.$bold &&
    css`
      color: ${(props) => props.theme['gray-800']};
      font-size: 1.25rem;
      font-weight: 700;
    `}
`
