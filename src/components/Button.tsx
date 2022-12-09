import { ButtonContainer, ButtonVariant } from './Button.styles'

interface ButtonProps {
  variant?: ButtonVariant
}

export const Button = ({ variant = 'primary' }: ButtonProps) => (
  <ButtonContainer variant={variant}>Enviar</ButtonContainer>
)
