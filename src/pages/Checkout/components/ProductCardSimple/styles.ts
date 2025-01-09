import styled from 'styled-components'

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  padding: 0.5rem 0.25rem 2.375rem;
  margin-bottom: 1.875rem;
  border-bottom: 1px solid ${(props) => props.theme['gray-300']};

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  img {
    width: 4rem;
    height: 4rem;
  }
`

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  flex: 1;
`

export const Heading = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1280px) {
    flex-direction: column;
    align-items: start;
  }

  h3 {
    color: ${(props) => props.theme['gray-800']};
    font-family: ${(props) => props.theme['font-secondary']};
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.3;
  }

  span {
    color: ${(props) => props.theme['gray-700']};
    font-weight: 700;
    line-height: 1.3;
  }
`

export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;
  max-width: 12rem;
  height: 2rem;
`
