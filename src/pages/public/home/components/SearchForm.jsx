import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState({
    text: "",
    location: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchQuery);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-wrap flex-col sm:flex-row gap-4 w-[90%] lg:w-1/2 mx-auto my-16"
    >
      <div className="flex flex-grow items-center gap-2 border border-gray-700 rounded-md px-4 py-2">
        <SearchIcon />
        <input
          onChange={(e) =>
            setSearchQuery({ ...searchQuery, text: e.target.value })
          }
          value={searchQuery.text}
          className="border-none p-0 outline-none"
          type="text"
          id="searchText"
          name="searchText"
          placeholder="Lagos party near me"
          required
        />
      </div>

      <select
        className="bg-gray-100 outline-none border rounded-md px-4"
        name="location"
        id="location"
      >
        <option defaultValue="" disabled>
          Location
        </option>
        <option value="Abuja">Abuja</option>
        <option value="Abuja">Port Harcourt</option>
        <option value="Abuja">Delta</option>
        <option value="Abuja">Lagos</option>
        <option value="Abuja">Ibadan</option>
      </select>

      <button className="btn btn-accent py-3">Search</button>
    </form>
  );
};

export default SearchForm;
