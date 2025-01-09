import styled from 'styled-components'

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.25rem;
  background-color: ${(props) => props.theme['gray-300']};
  color: ${(props) => props.theme['gray-700']};
  font-size: 0.75rem;
  font-weight: 400;
  text-transform: uppercase;
  padding: 0.5rem;
  border-radius: 6px;

  &:hover {
    background-color: ${(props) => props.theme['gray-400']};
    transition: background-color 300ms;
  }

  svg {
    fill: ${(props) => props.theme['purple-700']};
  }
`
