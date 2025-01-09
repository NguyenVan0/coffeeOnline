import styled from 'styled-components'
import { InputError, InputGroup } from '../../components/Forms/Input/styles'
import { RadioGroup } from '../../components/Forms/InputRadio/styles'

export const Container = styled.section`
  max-width: calc(70rem + 4.5rem);
  padding: 2.5rem 2.25rem;
  margin-right: auto;
  margin-left: auto;
`

export const CheckoutForm = styled.form`
  width: 100%;
  flex-direction: row;
  display: flex;
  gap: 2rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

export const Delivery = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 640px) {
    width: 100%;
  }

  > h2 {
    color: ${(props) => props.theme['gray-800']};
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 1.375rem;
  }
`

const RoundedBackground = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  background-color: ${(props) => props.theme['gray-100']};
  padding: 2.5rem;
  border-radius: 6px;
`

export const Address = styled(RoundedBackground)`
  margin-bottom: 0.75rem;

  header {
    display: flex;
    column-gap: 0.625rem;

    svg {
      fill: ${(props) => props.theme['yellow-800']};
    }

    h3 {
      color: ${(props) => props.theme['gray-800']};
      font-family: ${(props) => props.theme['font-secondary']};
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.3;
    }

    p {
      font-size: 0.875rem;
      line-height: 1.3;
    }
  }
`

export const AddressFields = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem 0.75rem;

  > ${InputGroup} {
    @media (max-width: 1024px) {
      grid-column: span 12;
    }
  }
`

export const PaymentMethods = styled(RoundedBackground)`
  header {
    display: flex;
    column-gap: 0.625rem;

    svg {
      fill: ${(props) => props.theme['purple-700']};
    }

    h3 {
      color: ${(props) => props.theme['gray-800']};
      font-family: ${(props) => props.theme['font-secondary']};
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.3;
    }

    p {
      font-size: 0.875rem;
      line-height: 1.3;
    }
  }
`

export const InputRadioError = styled(InputError)``

export const PaymentMethodsFields = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }

  > ${RadioGroup} {
    display: grid;
  }

  > ${InputRadioError} {
    grid-column: span 3;
    margin-top: -0.25rem;
  }
`

export const Cart = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    width: 50%;
  }

  @media (max-width: 640px) {
    width: 100%;
  }

  h2 {
    color: ${(props) => props.theme['gray-800']};
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 1.375rem;
  }
`

export const Order = styled(RoundedBackground)`
  border-radius: 6px 36px;
  row-gap: 0;
`
