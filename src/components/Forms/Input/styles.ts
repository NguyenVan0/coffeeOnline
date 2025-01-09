import styled from 'styled-components'

interface InputGroupProps {
  $cols?: number
}

export const InputGroup = styled.div<InputGroupProps>`
  display: flex;
  flex-direction: column;
  grid-column: span ${(props) => (props.$cols ? props.$cols : 12)};
  position: relative;
`

export const InputControl = styled.input`
  background-color: ${(props) => props.theme['gray-200']};
  color: ${(props) => props.theme['gray-700']};
  font-size: 0.875rem;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme['gray-300']};
  border-radius: 4px;

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
    font-size: 0.875rem;
    font-weight: 400;
  }

  &:hover,
  &:focus {
    border-color: ${(props) => props.theme['yellow-800']};
    transition: border-color 300ms;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${(props) => props.theme['gray-700']};
    -webkit-box-shadow: 0 0 0 40rem ${(props) => props.theme['gray-200']} inset;
  }
`

export const Optional = styled.span`
  position: absolute;
  top: 0;
  right: 0.75rem;
  color: ${(props) => props.theme['gray-500']};
  font-size: 0.75rem;
  font-style: italic;
  transform: translateY(100%);

  ${InputControl}:focus + & {
    width: 1px;
    height: 1px;
    position: absolute;
    padding: 0;
    margin: -1px;
    border-width: 0;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    overflow: hidden;
  }
`

export const InputError = styled.div`
  color: ${(props) => props.theme['yellow-800']};
  font-size: 0.75rem;
  font-weight: 700;
  margin-top: 0.5rem;
`
