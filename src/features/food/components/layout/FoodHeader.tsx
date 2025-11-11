"use client";

import Image from "next/image";

import burgerIcon from "@/assets/icons/burger.png";

interface FoodHeaderProps {
  onAddFood: () => void;
}

const primaryButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2 text-sm font-semibold bg-[#ffb121] text-white";

export function FoodHeader({ onAddFood }: FoodHeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-orange-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <span className="relative flex h-10 w-10 items-center">
            <Image
              src={burgerIcon}
              alt="FoodWagen burger icon"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="sr-only">FoodWagen logo</span>
          </span>
          <span className="text-xl font-bold tracking-tight text-orange-500 sm:text-2xl">
            <span className="text-orange-500">Food</span>
            <span className="text-amber-500">Wagen</span>
          </span>
        </div>
        <button
          className={primaryButtonClasses}
          type="button"
          onClick={onAddFood}
          data-test-id="food-add-button"
        >
          Add Meal
        </button>
      </div>
    </header>
  );
}
