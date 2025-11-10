"use client";

interface FoodHeaderProps {
  onAddFood: () => void;
}

const primaryButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold bg-[#ffb121] text-white";

function FoodLogoIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6 text-white"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M4 10c0-3.866 3.582-7 8-7s8 3.134 8 7H4Z" />
      <path
        d="M5 12h14a2 2 0 0 1 2 2c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1a2 2 0 0 1 2-2Z"
        opacity={0.8}
      />
      <path d="M5 17.5A2.5 2.5 0 0 1 7.5 15h9a2.5 2.5 0 0 1 2.5 2.5V19a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1.5Z" />
    </svg>
  );
}

export function FoodHeader({ onAddFood }: FoodHeaderProps) {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-orange-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 ">
            <FoodLogoIcon />
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
