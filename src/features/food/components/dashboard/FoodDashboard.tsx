"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createFood, deleteFood, fetchFoods, updateFood } from "@/lib/api";
import {
  FoodFormErrors,
  FoodFormValues,
  FoodItem,
  RestaurantStatus,
} from "@/types/food";
import { FoodCard } from "../card/FoodCard";
import { FoodFooter } from "../layout/FoodFooter";
import { FoodHeader } from "../layout/FoodHeader";
import { FoodHero } from "../hero/FoodHero";
import { FoodForm } from "../form/FoodForm";
import { FoodModal } from "../modal/FoodModal";

const buttonBaseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";
const ghostButtonClasses =
  `${buttonBaseClasses} border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50`;
const dangerButtonClasses =
  `${buttonBaseClasses} bg-rose-500 text-white shadow-md shadow-rose-500/30 hover:bg-rose-600`;
const confirmDeleteButtonClasses =
  `${buttonBaseClasses} rounded-2xl bg-gradient-to-r from-[#f9a53d] to-[#f88c1d] text-white w-full shadow-[0_18px_35px_rgba(248,140,29,0.35)] hover:from-[#f88c1d] hover:to-[#f7780a] focus-visible:ring-[#f9a53d]`;
const cancelDeleteButtonClasses =
  `${buttonBaseClasses} rounded-2xl w-full border border-[#f9a53d] bg-white text-black shadow-none hover:bg-[#fff2e3] focus-visible:ring-[#f9a53d]`;
const inlineSpinnerClasses =
  "inline-flex h-5 w-5 animate-spin rounded-full border-2 border-transparent";
const largeSpinnerClasses =
  "inline-flex h-10 w-10 animate-spin rounded-full border-4 border-orange-100 border-t-orange-500";

type ModalMode = "add" | "edit" | "delete" | null;

const initialFormValues: FoodFormValues = {
  food_name: "",
  food_rating: "",
  food_image: "",
  restaurant_name: "",
  restaurant_logo: "",
  restaurant_status: "Open",
};

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_STEP = 8;

const validateUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return Boolean(parsed.protocol && parsed.host);
  } catch {
    return false;
  }
};

const validateForm = (values: FoodFormValues): FoodFormErrors => {
  const errors: FoodFormErrors = {};

  if (!values.food_name.trim()) {
    errors.food_name = "Food Name is required";
  }

  if (!values.food_rating.trim()) {
    errors.food_rating = "Food Rating must be a number";
  } else {
    const ratingNumber = Number(values.food_rating);
    if (Number.isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
      errors.food_rating = "Food Rating must be a number";
    }
  }

  if (!values.food_image.trim() || !validateUrl(values.food_image)) {
    errors.food_image = "Food Image URL is required";
  }

  if (!values.restaurant_name.trim()) {
    errors.restaurant_name = "Restaurant Name is required";
  }

  if (!values.restaurant_logo.trim() || !validateUrl(values.restaurant_logo)) {
    errors.restaurant_logo = "Restaurant Logo URL is required";
  }

  if (
    values.restaurant_status !== "Open" &&
    values.restaurant_status !== "Closed"
  ) {
    errors.restaurant_status = "Restaurant Status must be 'Open' or 'Closed'";
  }

  return errors;
};

export function FoodDashboard() {
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [formValues, setFormValues] = useState<FoodFormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FoodFormErrors>({});
  const [activeFood, setActiveFood] = useState<FoodItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fulfillment, setFulfillment] = useState<"Delivery" | "Pickup">(
    "Delivery",
  );
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const loadFoods = useCallback(
    async (query?: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchFoods(query);
        setFoods(result);
        setVisibleCount(
          result.length === 0
            ? 0
            : Math.min(result.length, INITIAL_VISIBLE_COUNT),
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load food items",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    void loadFoods();
  }, [loadFoods]);

  useEffect(() => {
    if (foods.length === 0) {
      setVisibleCount(0);
      return;
    }
    setVisibleCount((previous) => {
      if (previous === 0) {
        return Math.min(foods.length, INITIAL_VISIBLE_COUNT);
      }
      return Math.min(previous, foods.length);
    });
  }, [foods.length]);

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loadFoods(searchTerm);
  };

  const handleLoadMore = () => {
    setVisibleCount((previous) =>
      Math.min(previous + LOAD_MORE_STEP, foods.length),
    );
  };

  const openAddModal = () => {
    setModalMode("add");
    setFormValues(initialFormValues);
    setFormErrors({});
    setActiveFood(null);
  };

  const openEditModal = (food: FoodItem) => {
    setModalMode("edit");
    setActiveFood(food);
    setFormValues({
      food_name: food.name,
      food_rating: food.rating ? food.rating.toString() : "",
      food_image: food.image,
      restaurant_name: food.restaurantName ?? "",
      restaurant_logo: food.restaurantLogo ?? "",
      restaurant_status: (food.restaurantStatus ?? "Open") as RestaurantStatus,
    });
    setFormErrors({});
  };

  const openDeleteModal = (food: FoodItem) => {
    setModalMode("delete");
    setActiveFood(food);
  };

  const closeModal = () => {
    setModalMode(null);
    setFormErrors({});
    setFormValues(initialFormValues);
    setActiveFood(null);
    setIsSubmitting(false);
    setIsDeleting(false);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm(formValues);
    setFormErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (modalMode === "edit" && activeFood) {
        const updated = await updateFood(activeFood.id, formValues);
        setFoods((prev) =>
          prev.map((item) => (item.id === activeFood.id ? updated : item)),
        );
      } else {
        const created = await createFood(formValues);
        setFoods((prev) => [created, ...prev]);
      }
      closeModal();
    } catch (err) {
      setFormErrors({
        food_name: err instanceof Error ? err.message : "Unexpected error occurred",
      });
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!activeFood) {
      return;
    }
    setIsDeleting(true);
    try {
      await deleteFood(activeFood.id);
      setFoods((prev) => prev.filter((item) => item.id !== activeFood.id));
      closeModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete food item");
      setIsDeleting(false);
    }
  };

  const hasResults = foods.length > 0;
  const visibleFoods = useMemo(
    () => foods.slice(0, visibleCount),
    [foods, visibleCount],
  );
  const shouldShowLoadMore = visibleCount < foods.length;
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-50 via-white to-white">
        <FoodHeader onAddFood={openAddModal} />
      <FoodHero
        fulfillment={fulfillment}
        onFulfillmentChange={setFulfillment}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSubmit={handleSearchSubmit}
        isLoading={isLoading}
      />

      <main className="flex-1 px-4 pb-20 pt-12">
        <section aria-live="polite" className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Featured Meals
          </h2>

          {error && (
            <div
              className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-600"
              role="alert"
              data-test-id="food-error"
            >
              {error}
            </div>
          )}

          {isLoading ? (
            <div
              className="mt-12 flex items-center justify-center gap-3 text-base font-semibold text-slate-600"
              role="status"
              aria-live="assertive"
            >
              <span className={largeSpinnerClasses} aria-hidden="true" />
              Loading food items...
            </div>
          ) : null}

          {!isLoading && !hasResults && (
            <div
              className="mt-12 text-center text-base font-medium text-slate-500"
              data-test-id="food-empty-state"
            >
              No items available
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {visibleFoods.map((food, index) => {
              const cardKey = `${food.id}-${food.createdAt ?? index}`;

              return (
                <FoodCard
                  key={cardKey}
                  food={food}
                  onEdit={openEditModal}
                  onDelete={openDeleteModal}
                />
              );
            })}
          </div>
          {shouldShowLoadMore ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="inline-flex items-center rounded-xl bg-[#ffa416] px-10 py-3 text-sm font-semibold text-white shadow-[0_20px_30px_rgba(249,115,22,0.35)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
                data-test-id="food-load-more"
              >
                Load more
                <span aria-hidden="true" className="ml-2 text-base">
                  &#8250;
                </span>
              </button>
            </div>
          ) : null}
        </section>
      </main>
      <FoodFooter currentYear={currentYear} />

      <FoodModal
        open={modalMode === "add" || modalMode === "edit"}
        title={modalMode === "edit" ? "Edit Meal" : "Add a Meal"}
        onClose={closeModal}
        testId="food-manage-modal"
      >
        <FoodForm
          key={modalMode === "edit" ? "edit" : "add"}
          values={formValues}
          errors={formErrors}
          submitting={isSubmitting}
          submitLabel={modalMode === "edit" ? "Save" : "Add"}
          loadingLabel={modalMode === "edit" ? "Updating Food..." : "Adding Food..."}
          onChange={handleChange}
          onSubmit={handleAddOrEdit}
          onCancel={closeModal}
          isEditMode={modalMode === "edit"}
        />
      </FoodModal>

      <FoodModal
        open={modalMode === "delete"}
        title="Delete Meal"
        onClose={closeModal}
        testId="food-delete-modal"
      >
        <div className="grid gap-6 text-center text-base text-slate-600">
          <p className="text-sm font-medium text-slate-500">
            Are you sure you want to delete this meal? Actions cannot be reversed.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              className={confirmDeleteButtonClasses}
              onClick={handleDelete}
              disabled={isDeleting}
              data-test-id="food-confirm-delete-btn"
            >
              {isDeleting ? (
                <>
                  <span
                    className={`${inlineSpinnerClasses} border-t-white`}
                    aria-hidden="true"
                  />
                  Deleting Meal...
                </>
              ) : (
                "Yes"
              )}
            </button>
            <button
              type="button"
              className={cancelDeleteButtonClasses}
              onClick={closeModal}
              disabled={isDeleting}
            >
              Cancel
            </button>
          </div>
        </div>
      </FoodModal>
    </div>
  );
}
