"use client";

import { memo, useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { Button } from "./Button";
import { Dropdown } from "./Dropdown";
import { parseSizeOptions } from "../utils/parseOptions";
import { shippmentTaxCalculate } from "@/utils/shippmentTaxCalculate";

interface SizeProps {
  name: string;
  slug: string;
  quantity: string;
  price: number;
}

interface ProductCard {
  name: string;
  slug: string;
  image: string;
  sizes: SizeProps[];
  description: string;
}

interface ProductCardProps {
  product: ProductCard;
  discount?: number | null;
}

interface PriceProps {
  price: number | undefined;
  discount?: number | null;
  discountedPrice?: number | null;
}

interface TotalProps {
  quantity: number;
  price: number;
  setTotal: (total: number) => void;
}

const QUANTITY_OPTIONS = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
];

const ProductCardComponent = ({ product, discount }: ProductCardProps) => {
  const [selectedQuantity, setSelectedQuantity] = useState<string | number>(1);
  const [selectedSize, setSelectedSize] = useState<string | number>(
    product.sizes[0].quantity
  );
  const [total, setTotal] = useState(0);

  const selectedPrice = useMemo(() => {
    return product.sizes.find((size) => size.quantity === selectedSize)?.price;
  }, [product.sizes, selectedSize]);

  const discountedPrice = useMemo(() => {
    return discount && selectedPrice
      ? selectedPrice - (selectedPrice / 100) * discount
      : null;
  }, [discount, selectedPrice]);

  const handleSubmit = () => {
    console.log("submitted");
  };

  const handleDecline = () => {
    console.log("declined");
  };

  return (
    <section
      className="flex gap-[38px] w-full md:items-start items-center md:flex-row flex-col"
      key={product.slug}
    >
      <Image
        className="w-[450px] h-[450px]"
        src={product.image}
        alt={product.slug}
        width={450}
        height={450}
        priority
      />
      <aside className="flex flex-col gap-[14px] w-full md:px-0 px-10">
        <div className="flex flex-col justify-between h-[450px]">
          <h1 className="text-[28px] text-[#585858]">{product.name}</h1>

          <Price
            price={selectedPrice}
            discount={discount}
            discountedPrice={discountedPrice}
          />

          <span className="text-sm text-[#585858]">Surprise yourself! 😃</span>

          <div className="flex flex-col gap-[14px]">
            <label
              htmlFor="one-time"
              className="text-sm text-[#585858] flex items-center  gap-1"
            >
              <input
                id="one-time"
                aria-label="one-time"
                type="radio"
                name="recurrence"
                className="accent-secondary"
                value="ONE_TIME"
              />
              One-time Purchase
            </label>

            <label
              htmlFor="subscribe-and-save"
              className="text-sm text-[#585858] flex items-center gap-1"
            >
              <input
                id="subscribe-and-save"
                aria-label="subscribe-and-save"
                type="radio"
                name="recurrence"
                className="accent-secondary"
                value="SUBSCRIBE_AND_SAVE"
              />
              Subscribe and Save
            </label>
          </div>

          <div className="flex flex-col gap-[14px]">
            <Dropdown
              label="Size"
              options={parseSizeOptions(product.sizes)}
              getSelectedOption={setSelectedSize}
            />

            <Dropdown
              label="Quantity"
              options={QUANTITY_OPTIONS}
              getSelectedOption={setSelectedQuantity}
            />
          </div>

          <Total
            quantity={Number(selectedQuantity)}
            price={discountedPrice ?? selectedPrice ?? 0}
            setTotal={setTotal}
          />
        </div>

        <div className="flex flex-col gap-[14px]">
          <Button
            action={handleSubmit}
            text={`Pay now . $${total.toFixed(2)}`}
          />
          <Button
            action={handleDecline}
            text="Decline this offer"
            type="outline"
          />
        </div>
      </aside>
    </section>
  );
};

export const ProductCard = memo(ProductCardComponent);

const Total = ({ quantity, price, setTotal }: TotalProps) => {
  const subTotal = quantity * price;
  const shippingTaxes = shippmentTaxCalculate(subTotal);
  const taxes = 0;
  const total = subTotal + shippingTaxes + taxes;

  useEffect(() => {
    setTotal(total);
  }, [total]);

  return (
    <>
      <div className="flex flex-col border-y-[1px] border-[#DCDCDC] py-[14px] w-full">
        <p className="w-full text-sm text-[#585858] flex justify-between py-1">
          Subtotal
          <span className="font-medium text-[16px] text-[#403331] ml-auto">
            $ {subTotal.toFixed(2)}
          </span>
        </p>
        <p className="w-full text-sm text-[#585858] flex justify-between py-1">
          Shipping
          <span className="font-medium text-[16px] text-[#403331] ml-auto">
            $ {shippingTaxes.toFixed(2)}
          </span>
        </p>
        <p className="w-full text-sm text-[#585858] flex justify-between py-1">
          Taxes
          <span className="font-medium text-[16px] text-[#403331] ml-auto">
            {taxes > 0 ? `$ ${taxes.toFixed(2)}` : "Free"}
          </span>
        </p>
      </div>
      <p className="w-full text-sm text-[#585858] flex justify-between">
        Total
        <span className="font-medium text-[16px] text-[#403331] ml-auto">
          $ {total.toFixed(2)}
        </span>
      </p>
    </>
  );
};

const Price = ({ discountedPrice, price, discount }: PriceProps) => {
  const Discounted = () => {
    return (
      <div className="font-medium text-lg text-[#403331]">
        $ {discountedPrice?.toFixed(2)}
        <span className="text-sm text-[#585858] line-through ml-1">
          {price?.toFixed(2)}
        </span>
        <span className="font-medium text-lg text-[#0CA127] ml-2">
          (Save {discount}%)
        </span>
      </div>
    );
  };

  return (
    <span className="font-medium text-lg text-[#403331]">
      {discount ? <Discounted /> : `$ ${price?.toFixed(2)}`}
    </span>
  );
};
