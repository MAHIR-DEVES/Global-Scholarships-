"use client";

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomCategory();
    }
  };

  const removeCategory = (categoryName) => {
    onCategoriesChange(
      selectedCategories.filter((cat) => cat.name !== categoryName)
    );
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
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
              className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:border-blue-500"
              }`}
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
          onKeyPress={handleKeyPress}
          placeholder="Add custom category"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        <button
          type="button"
          onClick={addCustomCategory}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium"
        >
          Add
        </button>
      </div>

      {/* Selected Categories */}
      {selectedCategories.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Selected ({selectedCategories.length}):
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <span
                key={category.name}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {category.name}
                <button
                  type="button"
                  onClick={() => removeCategory(category.name)}
                  className="ml-2 hover:text-red-600 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
