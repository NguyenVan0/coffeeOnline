import styled from 'styled-components'

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0.25rem 2.375rem;
  margin-bottom: 1.875rem;
  border-bottom: 1px solid ${(props) => props.theme['gray-300']};

  svg {
    fill: ${(props) => props.theme['yellow-800']};
    margin-bottom: 1rem;
  }

  span {
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
  }

  a {
    color: ${(props) => props.theme['yellow-800']};
    font-size: 0.875rem;
    text-align: center;
    text-decoration: none;
    margin-top: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`
