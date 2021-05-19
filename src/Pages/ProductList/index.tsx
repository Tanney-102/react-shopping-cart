import React, { useEffect, FC, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../actions";
import { Product, ProductImage } from "../../Components";
import { CartItem, ProductsObject } from "../../interface";
import { RootState } from "../../store";

import { Container } from "./styles";

const ProductList: FC = () => {
  const dispatch = useDispatch();

  const products: ProductsObject = useSelector(({ products }: RootState) => products);

  useEffect(() => {
    dispatch(actions.products.get.request());
  }, []);

  const onClickCart = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    if (currentTarget.dataset.productId === undefined) {
      return;
    }

    const id = currentTarget.dataset.productId;

    const cartItem: CartItem = {
      id,
      name: products[id].name,
      price: products[id].price,
      imageSrc: products[id].imageSrc,
      quantity: 1,
    };

    dispatch(actions.cart.post.request(cartItem));
  };

  return (
    <Container>
      {Object.entries(products).map(([id, { imageSrc, name, price }]) => (
        <Product
          key={id}
          id={id}
          Image={<ProductImage size="282px" src={imageSrc} />}
          name={name}
          price={price}
          onClickCart={onClickCart}
        />
      ))}
    </Container>
  );
};

export default ProductList;
