import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'


  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        {variant === 'on-sale' && <SalePriceSales>Sale</SalePriceSales>}
        {variant === 'new-release' && <SalePriceNew>Just Release!</SalePriceNew>}
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          {variant !== 'on-sale' ? <Price>{formatPrice(price)}</Price>: <Pricetext>{formatPrice(price)}</Pricetext>}

        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && <PriceRed>{formatPrice(salePrice)}</PriceRed>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  padding-right: 32px;
  padding-bottom:62px;
  flex: 1 1 344px;
`;




const Wrapper = styled.article`
position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
width:100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display:flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span``;

const Pricetext = styled(Price) `
text-decoration-line: line-through;
`
const PriceRed = styled(Price) `
color: ${COLORS.primary};
`



const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.white};
  padding: 7px 10px;
  border-radius: 2px;
  position: absolute;
  top: 12px;
  right: -4px;
  z-index:1;
`;

const SalePriceSales = styled(SalePrice)`
  background-color: ${COLORS.primary};
`;

const SalePriceNew = styled(SalePrice)`
  background-color: ${COLORS.secondary};
`;



export default ShoeCard;
