import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { ContainerFluid, Content, Image, Perk, PerkIcon, Perks, Wrapper } from './styles'

import heroImg from '../../../../assets/images/coffee-delivery-mockup.svg'

export function Hero() {
  return (
    <ContainerFluid>
      <Wrapper>
        <Content>
          <header>
            <h1>Khám phá cà phê hoàn hảo cho mọi thời điểm trong ngày</h1>
            <p>Với Coffee Delivery, bạn sẽ nhận được cà phê ở bất cứ đâu, bất cứ lúc nào</p>
          </header>

          <Perks>
            <Perk>
              <PerkIcon $variant="yellow-800">
                <ShoppingCart size={16} weight="fill" />
              </PerkIcon>
              Mua sắm đơn giản và an toàn
            </Perk>

            <Perk>
              <PerkIcon $variant="gray-700">
                <Package size={16} weight="fill" />
              </PerkIcon>
              Đóng gói giữ cà phê nguyên vẹn
            </Perk>

            <Perk>
              <PerkIcon $variant="yellow-500">
                <Timer size={16} weight="fill" />
              </PerkIcon>
              Giao hàng nhanh chóng và có thể theo dõi
            </Perk>

            <Perk>
              <PerkIcon $variant="purple-700">
                <Coffee size={16} weight="fill" />
              </PerkIcon>
              Cà phê đến tay bạn luôn tươi ngon
            </Perk>
          </Perks>
        </Content>

        <Image>
          <img src={heroImg} alt="" />
        </Image>
      </Wrapper>
    </ContainerFluid>
  )
}
