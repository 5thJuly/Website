import React, { useEffect, useState } from "react";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import CurrencyDropdown from "./Dropdown";
import CurrencyComparison from "./CurrencyComparison";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertAmount, setConvertAmount] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [conversionHistory, setConversionHistory] = useState<Array<{
    from: string;
    to: string;
    amount: number;
    result: string;
    date: string;
  }>>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Get initial favorites from localStorage
  const getInitialFavorites = (): string[] => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : ["INR", "EUR"];
  };

  const [favorites, setFavorites] = useState<string[]>(getInitialFavorites());

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
      setError(null);
    } catch (error) {
      setError("Failed to fetch currencies. Please try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
    // Load conversion history from localStorage
    const savedHistory = localStorage.getItem("conversionHistory");
    if (savedHistory) {
      setConversionHistory(JSON.parse(savedHistory));
    }
  }, []);

  const currencyConvert = async () => {
    if (!amount) {
      setError("Please enter an amount");
      setConverting(true);
      return;
    }

    setConverting(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      if (data && data.rates && data.rates[toCurrency]) {
        const result = `${data.rates[toCurrency]} ${toCurrency}`;
        setConvertAmount(result);
        
        // Add to history
        const newHistory = [{
          from: fromCurrency,
          to: toCurrency,
          amount: amount,
          result: result,
          date: new Date().toLocaleString()
        }, ...conversionHistory.slice(0, 9)]; // Keep last 10 conversions
        
        setConversionHistory(newHistory);
        localStorage.setItem("conversionHistory", JSON.stringify(newHistory));
      } else {
        setError("Invalid conversion data received");
      }
    } catch (error) {
      setError("Error during conversion. Please try again.");
      console.error("Error during currency conversion:", error);
    } finally {
      setConverting(false);
    }
  };

  const handleFavorite = (currency: string) => {
    let updateFavorites = [...favorites];
    if (favorites.includes(currency)) {
      updateFavorites = updateFavorites.filter((curr) => curr !== currency);
    } else {
      updateFavorites.push(currency);
    }
    setFavorites(updateFavorites);
    localStorage.setItem("favorites", JSON.stringify(updateFavorites));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <motion.h2
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold text-white text-center"
          >
            Currency Converter
          </motion.h2>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="space-y-4"
            >
              <CurrencyDropdown
                currencies={currencies}
                title="From"
                currency={fromCurrency}
                setCurrency={setFromCurrency}
                favorites={favorites}
                handleFavorite={handleFavorite}
              />
              
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={swapCurrencies}
                  className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"
                >
                  <HiArrowsRightLeft className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              <CurrencyDropdown
                currencies={currencies}
                title="To"
                currency={toCurrency}
                setCurrency={setToCurrency}
                favorites={favorites}
                handleFavorite={handleFavorite}
              />
            </motion.div>

            <motion.div
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              className="space-y-4"
            >
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                type="number"
                min="0"
                step="0.01"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter amount"
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={currencyConvert}
                disabled={converting}
                className={`w-full p-4 text-white rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                          hover:from-indigo-700 hover:to-purple-700 transition-all
                          ${converting ? "opacity-75" : ""}`}
              >
                {converting ? "Converting..." : "Convert Now"}
              </motion.button>
            </motion.div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 text-red-700 bg-red-50 rounded-lg"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {convertAmount && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl"
            >
              <div className="text-sm text-gray-600">Converted Amount:</div>
              <div className="text-3xl font-bold text-green-600">
                {convertAmount}
              </div>
            </motion.div>
          )}

          {/* Conversion History */}
          <div className="mt-8">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              {showHistory ? "Hide History" : "Show History"}
            </button>
            
            <AnimatePresence>
              {showHistory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-2"
                >
                  {conversionHistory.map((conversion, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium">
                          {conversion.amount} {conversion.from}
                        </span>
                        {" → "}
                        <span className="font-medium">{conversion.result}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {conversion.date}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
      <CurrencyComparison currencies={currencies} />
      </div>
    </div>
  );
};

export default CurrencyConverter;