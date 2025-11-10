"use client";

import Image from "next/image";
import { FoodItem } from "@/types/food";
import { useEffect, useRef, useState } from "react";

interface FoodCardProps {
  food: FoodItem;
  onEdit: (food: FoodItem) => void;
  onDelete: (food: FoodItem) => void;
}

function TagIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      height="14"
      viewBox="0 0 16 16"
      width="14"
    >
      <path
        d="M9.733 1.333h-5.4a1.333 1.333 0 0 0-1.333 1.334v5.4a1.333 1.333 0 0 0 .39.943l5.568 5.568a1.333 1.333 0 0 0 1.885 0l5.4-5.4a1.333 1.333 0 0 0 0-1.886l-5.568-5.568a1.333 1.333 0 0 0-.942-.39Zm-3.6 3.467a1.067 1.067 0 1 1 1.067-1.067 1.067 1.067 0 0 1-1.067 1.067Z"
        fill="currentColor"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      fill="none"
      height="14"
      viewBox="0 0 16 16"
      width="14"
    >
      <path
        d="M8 1.333 9.913 5.2l3.754.547-2.714 2.644.64 3.733L8 10.4l-3.593 1.724.64-3.734-2.714-2.64 3.754-.547L8 1.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

function EllipsisIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <circle cx="10" cy="4" r="2" />
      <circle cx="10" cy="10" r="2" />
      <circle cx="10" cy="16" r="2" />
    </svg>
  );
}

export function FoodCard({ food, onEdit, onDelete }: FoodCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const priceValue = food.price ? Number.parseFloat(food.price) : undefined;
  const statusLabel = food.restaurantStatus ?? "Closed";
  const normalizedStatus = statusLabel.toLowerCase().includes("open")
    ? "Open"
    : "Closed";
  const statusStyles =
    normalizedStatus === "Open"
      ? "bg-[#e4f1d8] text-[#7ab93c]"
      : "bg-[#fce3d4] text-[#f17228]";

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const handleToggleMenu = () => {
    setMenuOpen((previous) => !previous);
  };

  const handleEdit = () => {
    setMenuOpen(false);
    onEdit(food);
  };

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete(food);
  };

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-xl "
      data-test-id="food-card"
    >
      <div className="relative h-[200px] w-full overflow-hidden">
        <Image
          src={food.image}
          alt={food.name}
          fill
          sizes="(min-width: 1024px) 260px, 100vw"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {priceValue && Number.isFinite(priceValue) ? (
          <span
            className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-md bg-[#f17228] px-3 py-2 text-xs font-bold text-white backdrop-blur"
            data-test-id="food-card-price"
          >
            <span className="text-white">
              <TagIcon />
            </span>
            <span>${priceValue.toFixed(2)}</span>
          </span>
        ) : null}
        
      </div>
      <div className="flex flex-1 flex-col gap-4 px-0 pb-5 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex  items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-white shadow ring-1 ring-slate-200">
              {food.restaurantLogo ? (
                <Image
                  src={food.restaurantLogo}
                  alt={`${food.restaurantName ?? "Restaurant"} logo`}
                  width={32}
                  height={36}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-slate-100 text-xs font-semibold uppercase tracking-wide text-slate-500"
                  aria-hidden="true"
                >
                  FW
                </div>
              )}
            </div>
            <div className="flex justify-between  gap-2">
              <div>
                <p className="text-md font-semibold text-slate-900">
                {food.name}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 px-0 py-1 text-xs font-medium uppercase tracking-wide text-amber-600"
                  aria-label={`Food rating ${food.rating.toFixed(1)}`}
                >
                  <span aria-hidden="true">
                    <StarIcon />
                  </span>
                  <span aria-hidden="true">{food.rating.toFixed(1)}</span>
                  <span className="sr-only">{food.rating.toFixed(1)}</span>
                </span>
              </div>
            </div>
          </div>
          <div className="" ref={menuRef}>
            <button
              aria-expanded={menuOpen}
              aria-haspopup="true"
              aria-label={`Actions for ${food.name}`}
              className=" "
              type="button"
              onClick={handleToggleMenu}
            >
              <EllipsisIcon />
            </button>
            {menuOpen ? (
              <div
                className="absolute right-0 z-20 mt-0 w-44 origin-top-right rounded-xl border border-slate-200 bg-white p-1 shadow-lg focus:outline-none"
                role="menu"
              >
                <button
                  className="flex w-full items-center justify-start gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900"
                  type="button"
                  onClick={handleEdit}
                  data-test-id="food-edit-btn"
                  role="menuitem"
                >
                  Edit
                </button>
                <button
                  className="flex w-full items-center justify-start gap-2 rounded-lg px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-100 hover:text-rose-700 focus:bg-rose-100 focus:text-rose-700"
                  type="button"
                  onClick={handleDelete}
                  data-test-id="food-delete-btn"
                  role="menuitem"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm">
          
          <span
              className={`rounded-xl px-4 py-2 text-xs font-bold ${statusStyles}`}
            data-test-id="food-card-status"
          >
            {statusLabel}
          </span>
        </div>
      </div>
    </article>
  );
}
