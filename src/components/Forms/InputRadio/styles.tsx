import styled from 'styled-components'

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: auto;
  position: relative;
`

export const RadioControl = styled.input`
  position: absolute;
  clip: rect(0, 0, 0, 0);
  pointer-events: none;

  &:checked + label,
  &:focus + label {
    background-color: ${(props) => props.theme['purple-300']};
    border-color: ${(props) => props.theme['purple-700']};
  }
`

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
  background-color: ${(props) => props.theme['gray-300']};
  color: ${(props) => props.theme['gray-700']};
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.6;
  text-transform: uppercase;
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme['gray-400']};
    transition: background-color 300ms;
  }

  svg {
    fill: ${(props) => props.theme['purple-700']};
    margin-top: -2px;
  }
`
