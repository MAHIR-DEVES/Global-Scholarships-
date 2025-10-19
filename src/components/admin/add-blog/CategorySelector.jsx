import { useState } from "react";

const PREDEFINED_CATEGORIES = [
  "JavaScript",
  "Programming",
  "Web Development",
  "Scholarships",
  "Education",
  "Study Abroad",
  "Career",
  "Technology",
];

export default function CategorySelector({
  selectedCategories = [],
  onCategoriesChange,
  error,
}) {
  const [customCategory, setCustomCategory] = useState("");

  const toggleCategory = (categoryName) => {
    const exists = selectedCategories.find((cat) => cat.name === categoryName);

    if (exists) {
      onCategoriesChange(
        selectedCategories.filter((cat) => cat.name !== categoryName)
      );
    } else {
      onCategoriesChange([...selectedCategories, { name: categoryName }]);
    }
  };

  const addCustomCategory = () => {
    const trimmed = customCategory.trim();

    if (!trimmed) return;

    const exists = selectedCategories.find(
      (cat) => cat.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (!exists) {
      onCategoriesChange([...selectedCategories, { name: trimmed }]);
      setCustomCategory("");
    }
  };

  const removeCategory = (categoryName) => {
    onCategoriesChange(
      selectedCategories.filter((cat) => cat.name !== categoryName)
    );
  };

  return (
    <div className="form-group">
      <label className="form-label">
        Categories
        <span className="text-red-500 ml-1">*</span>
      </label>

      {/* Predefined Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {PREDEFINED_CATEGORIES.map((category) => {
          const isSelected = selectedCategories.some(
            (cat) => cat.name === category
          );
          return (
            <button
              key={category}
              type="button"
              onClick={() => toggleCategory(category)}
              className={`category-chip ${isSelected ? "selected" : ""}`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Custom Category Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          onKeyPress={(e) =>
            e.key === "Enter" && (e.preventDefault(), addCustomCategory())
          }
          placeholder="Add custom category"
          className="form-input flex-1"
        />
        <button
          type="button"
          onClick={addCustomCategory}
          className="btn-secondary"
        >
          Add
        </button>
      </div>

      {/* Selected Categories */}
      {selectedCategories.length > 0 && (
        <div className="selected-categories">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Selected ({selectedCategories.length}):
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <span key={category.name} className="category-badge">
                {category.name}
                <button
                  type="button"
                  onClick={() => removeCategory(category.name)}
                  className="ml-2 hover:text-red-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
