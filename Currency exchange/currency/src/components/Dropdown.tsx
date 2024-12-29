import { ReactElement } from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";

type CurrencyDropdownProps = {
  currencies: string[];
  currency: string;
  setCurrency: (value: string) => void;
  favorites: string[];
  handleFavorite: (currency: string) => void;
  title?: string;
};

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
}: CurrencyDropdownProps): ReactElement => {
  const isFavorite = (curr: string) => favorites.includes(curr);

  return (
    <div className="group space-y-2 transition-all duration-200 ease-in-out">
      {title && (
        <label
          htmlFor={title}
          className="block text-sm font-medium text-gray-700 transform transition-all duration-200 group-hover:text-indigo-600"
        >
          {title}
        </label>
      )}
      
      <div className="relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm 
                     bg-white text-gray-700
                     transition-all duration-200 ease-in-out
                     hover:border-indigo-400 
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none
                     appearance-none"
        >
          {favorites.length > 0 && (
            <optgroup label="Favorites" className="bg-gray-50">
              {favorites.map((favCurrency) => (
                <option
                  className="py-2 font-medium text-indigo-600 bg-gray-50"
                  key={favCurrency}
                  value={favCurrency}
                >
                  {favCurrency}
                </option>
              ))}
            </optgroup>
          )}
          
          <optgroup label="All Currencies">
            {currencies
              .filter((c) => !favorites.includes(c))
              .map((currency) => (
                <option
                  key={currency}
                  value={currency}
                  className="py-2 text-gray-600"
                >
                  {currency}
                </option>
              ))}
          </optgroup>
        </select>

        <button
          onClick={() => handleFavorite(currency)}
          className="absolute inset-y-0 right-0 flex items-center px-3
                     text-gray-400 hover:text-yellow-500
                     transition-all duration-200 transform
                     hover:scale-110 focus:outline-none"
          aria-label={isFavorite(currency) ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite(currency) ? (
            <HiStar className="w-5 h-5 text-yellow-500" />
          ) : (
            <HiOutlineStar className="w-5 h-5" />
          )}
        </button>

        <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
          <svg
            className="h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CurrencyDropdown;