import styled from 'styled-components'

export const ProductContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  background-color: ${(props) => props.theme['gray-100']};
  padding: 7rem 1.5rem 1.25rem;
  border-radius: 6px 36px;

  img {
    position: absolute;
    top: -1.25rem;
    width: 7.5rem;
  }
`

export const Tags = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 1.375rem;

  li {
    list-style: none;
    background-color: ${(props) => props.theme['yellow-100']};
    color: ${(props) => props.theme['yellow-800']};
    font-size: 0.625rem;
    font-weight: 700;
    line-height: 1.3;
    text-align: center;
    text-transform: uppercase;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
  }
`

export const Heading = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  h3 {
    color: ${(props) => props.theme['gray-800']};
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  p {
    color: ${(props) => props.theme['gray-500']};
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.3;
  }
`

export const Buy = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
`

export const Price = styled.span`
  display: flex;
  align-items: baseline;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.3;

  span {
    font-family: ${(props) => props.theme['font-primary']};
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1.3;
    padding-left: 0.25rem;
  }
`

export const AddToCart = styled.div`
  display: flex;
  column-gap: 0.5rem;
  min-width: 7.5rem;
`
