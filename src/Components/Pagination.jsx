import React from "react";

const Pagination = ({ page, pageHandler, totalPages }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-3 mt-8">
      <button
        onClick={() => pageHandler(page - 1)}
        disabled={page === 1}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => pageHandler(p)}
          className={`px-3 py-1 rounded ${page === p ? "bg-red-500 text-white" : "bg-gray-200"}`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => pageHandler(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
