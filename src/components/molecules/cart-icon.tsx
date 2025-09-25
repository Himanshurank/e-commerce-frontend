import React from "react";
import Icon from "../atoms/icon";

interface ICartIconProps {
  itemCount?: number;
  onClick?: () => void;
  className?: string;
  testId?: string;
}

const CartIcon = (props: ICartIconProps) => {
  const { itemCount = 0, onClick, className = "", testId } = props;

  return (
    <button
      onClick={onClick}
      className={`relative p-2 text-gray-700 hover:text-blue-600 transition-colors ${className}`}
      data-testid={testId || "cart-icon"}
    >
      <Icon name="cart" size="lg" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  );
};

export default CartIcon;
