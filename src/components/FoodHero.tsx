"use client";

import Image from "next/image";
import type { FormEvent, ReactNode } from "react";

import heroImage from "@/assets/Image.png";

interface FoodHeroProps {
  fulfillment: "Delivery" | "Pickup";
  onFulfillmentChange: (value: "Delivery" | "Pickup") => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const cardClasses =
  "mx-auto my-16 w-full rounded-[28px] bg-white p-6 ";

const toggleBaseClasses =
  "flex flex-1 items-center  justify-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold";
const toggleActiveClasses =
  "bg-[#ffe6d2] text-[#f17228]";
const toggleInactiveClasses = "text-[#7c3b19] hover:bg-[#fff2e7]";

const buttonClasses =
  "inline-flex items-center justify-center gap-2 rounded-md bg-[#fc7154] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_30px_rgba(241,114,40,0.35)] transition hover:bg-[#e8651c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7941d]";

function DeliveryIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 16-1-2V9a2 2 0 0 1 2-2h7v9" />
      <path d="M17 16H9" />
      <path d="M17 16a3 3 0 1 0 5 0 3 3 0 0 0-5 0Z" />
      <path d="M6 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M3 13h2" />
    </svg>
  );
}

function PickupIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 8h14l-1.5 12h-11L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <path d="M12 12v6" />
    </svg>
  );
}

function SearchIcon({ className = "text-[#f17228]" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-5 w-5 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3-3" />
    </svg>
  );
}

function ToggleLabel({
  children,
  isActive,
  onSelect,
  icon,
}: {
  children: string;
  isActive: boolean;
  onSelect: () => void;
  icon: ReactNode;
}) {
  return (
    <label
      className={`${toggleBaseClasses} ${
        isActive ? toggleActiveClasses : toggleInactiveClasses
      }`}
    >
      <input
        type="radio"
        name="food-fulfillment"
        value={children}
        checked={isActive}
        onChange={onSelect}
        data-test-id={`food-fulfillment-${children.toLowerCase()}`}
        className="sr-only"
      />
      {icon}
      {children}
    </label>
  );
}

export function FoodHero({
  fulfillment,
  onFulfillmentChange,
  searchTerm,
  onSearchChange,
  onSubmit,
  isLoading,
}: FoodHeroProps) {
  return (
    <section className=" overflow-hidden bg-[#ffb310] px-4  pt-16 text-white">
      <div className="mx-auto  grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl  items-start relative">
        <div className="w-full">
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Are you starving?
          </h1>
          <p className="mt-3 text-base font-medium text-white/85 sm:text-lg">
            Within a few clicks, find meals that are accessible near you.
          </p>
          <form
            className={cardClasses}
            onSubmit={onSubmit}
            data-test-id="food-search-form"
          >
            <div
              className="flex items-center w-[50%] gap-2 rounded-xl p-1"
              role="radiogroup"
              aria-label="Delivery options"
            >
              <ToggleLabel
                icon={<DeliveryIcon />}
                isActive={fulfillment === "Delivery"}
                onSelect={() => onFulfillmentChange("Delivery")}
              >
                Delivery
              </ToggleLabel>
              <ToggleLabel
                icon={<PickupIcon />}
                isActive={fulfillment === "Pickup"}
                onSelect={() => onFulfillmentChange("Pickup")}
              >
                Pickup
              </ToggleLabel>
            </div>
            <hr className="my-4 w-full border border-gray-100" />

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-3 rounded-md  bg-[#f5f5f5] px-4 py-3 text-sm font-medium text-slate-600 ">
                <SearchIcon />
                <input
                  className="w-full border-none bg-transparent text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  name="food-search"
                  placeholder="What do you like to eat today?"
                  value={searchTerm}
                  onChange={(event) => onSearchChange(event.target.value)}
                  data-test-id="food-search-input"
                  aria-label="Search for food"
                />
              </div>
              <button
                type="submit"
                className={buttonClasses}
                disabled={isLoading}
                data-test-id="food-search-button"
              >
                <SearchIcon className="text-white" />
                {isLoading ? "Finding Meal..." : "Find Meal"}
              </button>
            </div>
          </form>
        </div>

        <div className=" absolute bottom-0 right-0 w-[50%] lg:block hidden">
        <Image
            src={heroImage}
            alt="A delicious bowl of noodles topped with vegetables and egg"
            className=" h-auto w-full "
            priority
          />
          
        </div>
      </div>
    </section>
  );
}

