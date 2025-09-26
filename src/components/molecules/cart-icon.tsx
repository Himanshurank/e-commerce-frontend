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
      className={`group relative p-3 text-neutral-700 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-200 ${className}`}
      data-testid={testId || "cart-icon"}
      aria-label={`Shopping cart${itemCount > 0 ? ` with ${itemCount} items` : " is empty"}`}
      title={`Cart (${itemCount} items)`}
    >
      <Icon
        name="cart"
        size="lg"
        className="group-hover:scale-110 transition-transform duration-300"
      />

      {itemCount > 0 && (
        <>
          {/* Badge with modern styling */}
          <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 shadow-lg animate-pulse">
            {itemCount > 99 ? "99+" : itemCount}
          </span>

          {/* Subtle glow effect for attention */}
          <div className="absolute -top-1 -right-1 bg-red-400 rounded-full min-w-[20px] h-5 animate-ping opacity-20"></div>
        </>
      )}

      {/* Hover background effect */}
      <div className="absolute inset-0 bg-brand-100 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
    </button>
  );
};

export default CartIcon;
