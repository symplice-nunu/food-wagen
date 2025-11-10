"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FoodFormErrors,
  FoodFormValues,
  RestaurantStatus,
} from "@/types/food";

const buttonBaseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";
// const primaryButtonClasses =
//   `${buttonBaseClasses} bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 text-white shadow-lg shadow-orange-500/40 hover:-translate-y-0.5`;
// const ghostButtonClasses =
//   `${buttonBaseClasses} border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50`;
const inlineSpinnerClasses =
  "inline-flex h-5 w-5 animate-spin rounded-full border-2 border-transparent border-t-white";
const inputClasses =
  "w-full rounded-xl border border-slate-200 bg-gray-100 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100";
const fieldClasses = "flex flex-col gap-2";
const labelClasses = "text-sm font-semibold text-slate-700";
const errorClasses = "text-sm font-medium text-rose-500";
const statusOptions: RestaurantStatus[] = ["Open", "Closed"];

interface FoodFormProps {
  values: FoodFormValues;
  errors: FoodFormErrors;
  submitting: boolean;
  submitLabel: string;
  loadingLabel: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export function FoodForm({ values, errors, submitting, submitLabel, loadingLabel, onChange, onSubmit, onCancel }: FoodFormProps) {
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);
  const statusMenuRef = useRef<HTMLDivElement>(null);

  const toggleStatusMenu = () => {
    setStatusMenuOpen((prev) => !prev);
  };

  const handleStatusSelect = (option: RestaurantStatus) => {
    const syntheticEvent = {
      target: {
        name: "restaurant_status",
        value: option,
      },
    } as ChangeEvent<HTMLSelectElement>;
    onChange(syntheticEvent);
    setStatusMenuOpen(false);
  };

  useEffect(() => {
    if (!statusMenuOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusMenuRef.current &&
        event.target instanceof Node &&
        !statusMenuRef.current.contains(event.target)
      ) {
        setStatusMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setStatusMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [statusMenuOpen]);

  return (
    <form className="grid gap-4" onSubmit={onSubmit} noValidate>
      <div className={fieldClasses}>
        <label htmlFor="food_name" className={labelClasses}>
          Food name
        </label>
        <input
          id="food_name"
          name="food_name"
          placeholder="Enter food name"
          value={values.food_name}
          onChange={onChange}
          aria-describedby="food-name-error"
          className={inputClasses}
          required
          data-test-id="food-name-input"
        />
        {errors.food_name && (
          <p className={errorClasses} id="food-name-error">
            {errors.food_name}
          </p>
        )}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="food_rating" className={labelClasses}>
          Food rating
        </label>
        <input
          id="food_rating"
          name="food_rating"
          type="number"
          min={1}
          max={5}
          placeholder="Enter food rating (1-5)"
          value={values.food_rating}
          onChange={onChange}
          aria-describedby="food-rating-error"
          className={inputClasses}
          required
          data-test-id="food-rating-input"
        />
        {errors.food_rating && (
          <p className={errorClasses} id="food-rating-error">
            {errors.food_rating}
          </p>
        )}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="food_image" className={labelClasses}>
          Food image (link)
        </label>
        <input
          id="food_image"
          name="food_image"
          placeholder="Paste food image link"
          value={values.food_image}
          onChange={onChange}
          aria-describedby="food-image-error"
          className={inputClasses}
          required
          data-test-id="food-image-input"
        />
        {errors.food_image && (
          <p className={errorClasses} id="food-image-error">
            {errors.food_image}
          </p>
        )}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="restaurant_name" className={labelClasses}>
          Restaurant name
        </label>
        <input
          id="restaurant_name"
          name="restaurant_name"
          placeholder="Enter food restaurant name"
          value={values.restaurant_name}
          onChange={onChange}
          aria-describedby="restaurant-name-error"
          className={inputClasses}
          required
          data-test-id="food-restaurant-name-input"
        />
        {errors.restaurant_name && (
          <p className={errorClasses} id="restaurant-name-error">
            {errors.restaurant_name}
          </p>
        )}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="restaurant_logo" className={labelClasses}>
          Restaurant logo (link)
        </label>
        <input
          id="restaurant_logo"
          name="restaurant_logo"
          placeholder="Paste food restaurant logo link"
          value={values.restaurant_logo}
          onChange={onChange}
          aria-describedby="restaurant-logo-error"
          className={inputClasses}
          required
          data-test-id="food-restaurant-logo-input"
        />
        {errors.restaurant_logo && (
          <p className={errorClasses} id="restaurant-logo-error">
            {errors.restaurant_logo}
          </p>
        )}
      </div>

      <div className={fieldClasses}>
        <label htmlFor="restaurant_status" className={labelClasses}>
          Restaurant status (open/close)
        </label>
        <div className="relative" ref={statusMenuRef}>
          <input
            type="hidden"
            name="restaurant_status"
            value={values.restaurant_status}
          />
          <button
            type="button"
            id="restaurant_status"
            aria-haspopup="listbox"
            aria-expanded={statusMenuOpen}
            onClick={toggleStatusMenu}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
            data-test-id="food-restaurant-status-input"
          >
            <span>{values.restaurant_status}</span>
            <svg
              aria-hidden="true"
              className={`h-4 w-4 transform text-slate-500 transition ${
                statusMenuOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.062l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0l-4.25-4.39a.75.75 0 0 1 .02-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {statusMenuOpen ? (
            <div
              role="listbox"
              aria-labelledby="restaurant_status"
              className="absolute left-0 top-full z-30 mt-2 w-[130px] rounded bg-white p-1 shadow-xl"
            >
              {statusOptions.map((option) => {
                const isSelected = values.restaurant_status === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleStatusSelect(option)}
                    className={`flex w-full items-center justify-between rounded px-4 py-1 text-sm font-semibold transition ${
                      isSelected
                        ? "text-slate-900 hover:bg-slate-50"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={
                        option === "Closed"
                          ? "text-rose-500"
                          : "text-slate-700"
                      }
                    >
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
        {errors.restaurant_status && (
          <p className={errorClasses} id="restaurant-status-error">
            {errors.restaurant_status}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className={`bg-[#ffaf1c] rounded-xl py-3 font-bold text-white w-full`}
          disabled={submitting}
          data-test-id="food-submit-btn"
        >
          {submitting ? (
            <>
              <span className={inlineSpinnerClasses} aria-hidden="true" />
              {loadingLabel}
            </>
          ) : (
            submitLabel
          )}
        </button>
        <button
          type="button"
          className={`border border-[#ffaf1c] rounded-xl py-3  text-black font-bold w-full`}
          onClick={onCancel}
          disabled={submitting}
          data-test-id="food-cancel-btn"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
