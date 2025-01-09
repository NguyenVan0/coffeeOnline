import styled from 'styled-components'

interface ButtonProps {
  $fill?: boolean
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.25rem;
  width: ${(props) => (props.$fill ? '100%' : 'auto')};
  background-color: ${(props) => props.theme['yellow-500']};
  color: ${(props) => props.theme.white};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.6;
  padding: 0.75rem 0.5rem;
  border-radius: 6px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['yellow-800']};
    transition: background-color 300ms;
  }
`
