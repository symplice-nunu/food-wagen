"use client";

import type { FormEvent } from "react";

interface FoodHeroProps {
  fulfillment: "Delivery" | "Pickup";
  onFulfillmentChange: (value: "Delivery" | "Pickup") => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100";

const secondaryButtonClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 bg-orange-500 text-white shadow-md shadow-orange-500/30 hover:-translate-y-0.5";

const toggleBaseClasses =
  "flex-1 cursor-pointer rounded-full px-4 py-2 text-center text-sm font-semibold transition";
const toggleActiveClasses =
  "bg-orange-500 text-white shadow-lg shadow-orange-500/40";
const toggleInactiveClasses =
  "text-orange-700 hover:bg-orange-100";

export function FoodHero({
  fulfillment,
  onFulfillmentChange,
  searchTerm,
  onSearchChange,
  onSubmit,
  isLoading,
}: FoodHeroProps) {
  return (
    <section className="bg-gradient-to-r from-yellow-300 via-orange-400 to-orange-500 px-4 pb-16 pt-14 text-orange-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="mb-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Are you starving?
          </h1>
          <p className="max-w-md text-base font-medium text-orange-50/90">
            Within a few clicks, find meals that are accessible near you.
          </p>
        </div>
      </div>

      <form
        className="mx-auto mt-8 grid w-full max-w-3xl gap-4 rounded-3xl bg-white p-6 shadow-2xl shadow-orange-500/20"
        onSubmit={onSubmit}
        data-test-id="food-search-form"
      >
        <div
          className="flex items-center gap-2 rounded-full bg-orange-50 p-1"
          role="radiogroup"
          aria-label="Delivery options"
        >
          {(["Delivery", "Pickup"] as const).map((option) => (
            <label
              key={option}
              className={`${toggleBaseClasses} ${
                fulfillment === option
                  ? toggleActiveClasses
                  : toggleInactiveClasses
              }`}
            >
              <input
                type="radio"
                name="food-fulfillment"
                value={option}
                checked={fulfillment === option}
                onChange={() => onFulfillmentChange(option)}
                data-test-id={`food-fulfillment-${option.toLowerCase()}`}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            className={inputClasses}
            name="food-search"
            placeholder="What food do you feel like eating today?"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            data-test-id="food-search-input"
          />
          <button
            type="submit"
            className={secondaryButtonClasses}
            disabled={isLoading}
            data-test-id="food-search-button"
          >
            {isLoading ? "Finding Food..." : "Find Food"}
          </button>
        </div>
      </form>
    </section>
  );
}

