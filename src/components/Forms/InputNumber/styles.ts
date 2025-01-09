import styled from 'styled-components'

export const InputGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  flex: 1;
  column-gap: 0.25rem;
  max-width: 4.5rem;
  background-color: ${(props) => props.theme['gray-300']};
  padding: 0.5rem;
  border-radius: 6px;

  span {
    flex: 1;
    background-color: transparent;
    color: ${(props) => props.theme['gray-900']};
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
  }
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  &:disabled {
    cursor: not-allowed;
  }

  svg {
    fill: ${(props) => props.theme['purple-700']};
  }

  &:not(:disabled):hover svg {
    fill: ${(props) => props.theme['purple-900']};
    transition: fill 300ms;
  }
`

export const DecrementButton = styled(Button)``

export const IncrementButton = styled(Button)``
