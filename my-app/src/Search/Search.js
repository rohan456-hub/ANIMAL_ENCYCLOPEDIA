import axios from "axios";
import { apiUrl } from '../config';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]); // Reset results before new search

    try {
      const response = await axios.get(apiUrl(`/api/getSearch?Name=${query}`)); 
      
      if (response.status === 200) {
        setResults(response.data.animals);
        navigate(`/SearchAnimaldetails?Name=${query}`, { replace: true }); // Force reload
      } else {
        setError("No results found.");
      }
    } catch (err) {
      setError("Error fetching search results.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Search for an animal..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        onClick={handleSearch}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="mt-4">
        {results.map((item, index) => (
          <li key={index} className="p-2 border-b">{item.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
