import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/input";
import Icon from "@/components/atoms/icon";

interface ISearchSectionProps {
  className?: string;
  testId?: string;
  onSearch?: (query: string) => void;
  onFilter?: (filters: any) => void;
  placeholder?: string;
}

const SearchSection = (props: ISearchSectionProps) => {
  const {
    className = "",
    testId,
    onSearch,
    onFilter,
    placeholder = "Search products, suppliers, categories...",
  } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    priceRange: "",
    location: "",
    rating: "",
  });

  const handleSearchSubmit = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
    console.log("Search query:", searchQuery);
  };

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterApply = () => {
    if (onFilter) {
      onFilter(selectedFilters);
    }
    setIsFilterOpen(false);
    console.log("Applied filters:", selectedFilters);
  };

  const handleFilterReset = () => {
    setSelectedFilters({
      category: "",
      priceRange: "",
      location: "",
      rating: "",
    });
  };

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Industrial",
    "Automotive",
    "Health & Beauty",
    "Sports",
    "Books",
  ];

  const priceRanges = [
    "Under $100",
    "$100 - $500",
    "$500 - $1000",
    "$1000 - $5000",
    "Above $5000",
  ];

  const locations = [
    "United States",
    "China",
    "Germany",
    "India",
    "United Kingdom",
    "Japan",
    "South Korea",
    "Canada",
  ];

  const ratings = ["4+ Stars", "3+ Stars", "2+ Stars", "1+ Stars"];

  const sectionVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
  };

  const searchVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
  };

  const filterVariants = {
    initial: { opacity: 0, y: -20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  };

  const activeFiltersCount =
    Object.values(selectedFilters).filter(Boolean).length;

  return (
    <motion.section
      className={`bg-gradient-to-r from-neutral-50 to-white border-b border-neutral-200 shadow-sm relative ${className}`}
      data-testid={testId || "search-section"}
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="py-6"
          variants={searchVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Main Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3 items-center">
              {/* Search Input Container */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="search" size="md" className="text-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder={placeholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchSubmit();
                    }
                  }}
                  className="w-full pr-4 pl-12 py-3 text-base border-2 border-neutral-300 hover:border-brand-400 focus:border-brand-500 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  data-testid="main-search-input"
                />
              </div>

              {/* Search Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSearchSubmit}
                  className="px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                  testId="search-button"
                >
                  <Icon name="search" size="md" className="mr-2" />
                  Search
                </Button>
              </motion.div>

              {/* Filter Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={isFilterOpen ? "primary" : "outline"}
                  size="lg"
                  onClick={handleFilterToggle}
                  className="relative"
                  testId="filter-button"
                >
                  <Icon name="menu" size="md" className="mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <motion.span
                      className="absolute -top-2 -right-2 bg-brand-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {activeFiltersCount}
                    </motion.span>
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              variants={filterVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="border-t border-neutral-200 bg-white/80 backdrop-blur-sm"
            >
              <div className="py-6">
                <div className="max-w-4xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Category
                      </label>
                      <select
                        value={selectedFilters.category}
                        onChange={(e) =>
                          setSelectedFilters({
                            ...selectedFilters,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                      >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Price Range
                      </label>
                      <select
                        value={selectedFilters.priceRange}
                        onChange={(e) =>
                          setSelectedFilters({
                            ...selectedFilters,
                            priceRange: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                      >
                        <option value="">Any Price</option>
                        {priceRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Location Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Location
                      </label>
                      <select
                        value={selectedFilters.location}
                        onChange={(e) =>
                          setSelectedFilters({
                            ...selectedFilters,
                            location: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                      >
                        <option value="">Any Location</option>
                        {locations.map((loc) => (
                          <option key={loc} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        Rating
                      </label>
                      <select
                        value={selectedFilters.rating}
                        onChange={(e) =>
                          setSelectedFilters({
                            ...selectedFilters,
                            rating: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                      >
                        <option value="">Any Rating</option>
                        {ratings.map((rating) => (
                          <option key={rating} value={rating}>
                            {rating}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Filter Actions */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-neutral-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleFilterReset}
                      className="text-neutral-600 hover:text-neutral-800"
                    >
                      <Icon name="close" size="sm" className="mr-1" />
                      Reset Filters
                    </Button>

                    <div className="flex gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsFilterOpen(false)}
                        className="px-4"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleFilterApply}
                        className="px-6"
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent opacity-0"
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      />
    </motion.section>
  );
};

export default SearchSection;
