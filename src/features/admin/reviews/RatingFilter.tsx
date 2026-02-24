interface RatingFilterProps {
  selectedRating: number | null;
  onChange: (rating: number | null) => void;
}

export function RatingFilter({ selectedRating, onChange }: RatingFilterProps) {
  return (
    <div className="relative">
      <select
        value={selectedRating || ""}
        onChange={(e) =>
          onChange(e.target.value ? Number(e.target.value) : null)
        }
        className="w-full sm:w-48 pl-4 pr-8 py-2 appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
      >
        <option value="">Tất cả sao</option>
        <option value="5">5 Sao</option>
        <option value="4">4 Sao</option>
        <option value="3">3 Sao</option>
        <option value="2">2 Sao</option>
        <option value="1">1 Sao</option>
      </select>
      <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        arrow_drop_down
      </span>
    </div>
  );
}
