const FilterSection = ({ category, setCategory, priceRange, setPriceRange, data }) => {
  const categories = ["all", ...new Set(data.map((item) => item.category))];

  return (
    <div className="w-full md:w-60 border p-4 rounded-lg shadow-lg bg-white
      md:sticky md:top-24">

      <h2 className="text-xl font-bold mb-4 text-gray-700">Filters</h2>

      {/* CATEGORY */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Category</h3>
        <div className="flex flex-wrap md:flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded text-sm ${
                category === cat ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <p className="text-gray-600 text-sm mb-1">
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </p>
        <input
          type="range"
          min={0}
          max={1000}
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full"
        />
      </div>
    </div>
  );
};
export default FilterSection
