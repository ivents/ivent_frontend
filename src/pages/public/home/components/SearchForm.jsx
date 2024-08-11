import { Search } from "@mui/icons-material";

const SearchForm = ({ handleSearch, setSearchFormData, searchFormData }) => {
  return (
    <form
      className="w-4/5 mx-auto mb-8 flex gap-2 sm:items-end flex-col sm:flex-row"
      onChange={handleSearch}
    >
      <div className="w-full">
        <label htmlFor="search_query">Search events</label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            onChange={(e) =>
              setSearchFormData({
                ...searchFormData,
                searchQuery: e.target.value,
              })
            }
            type="text"
            name="search_query"
            id="search_query"
            placeholder="Type to search"
            aria-label="Search"
            className="w-full pl-12"
          />
        </div>
      </div>

      <select
        onChange={(e) =>
          setSearchFormData({ ...searchFormData, city: e.target.value })
        }
        defaultValue="location"
        name="city"
        id="city"
        className="bg-gray-200 border border-gray-300 rounded-md p-2"
      >
        <option disabled value="location">
          Location
        </option>
        <option value="abuja">Abuja</option>
        <option value="lagos">Lagos</option>
        <option value="portharcourt">Port Harcourt</option>
      </select>
    </form>
  );
};

export default SearchForm;
