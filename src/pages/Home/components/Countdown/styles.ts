import styled from 'styled-components'

export const CountdownContainer = styled.div`
  font-size: 10rem;
  font-family: 'Roboto Mono', monospace;
  line-height: 8rem;
  color: ${({ theme }) => theme['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background-color: ${({ theme }) => theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  color: ${({ theme }) => theme['green-500']};
  padding: 2rem 0;

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
`
