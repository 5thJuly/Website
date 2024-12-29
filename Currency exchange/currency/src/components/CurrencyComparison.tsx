import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { Plus, X, RefreshCcw } from 'lucide-react';


interface CurrencyComparisonProps {
  currencies: string[];
}

interface ComparisonDataItem {
  name: string;
  value: number;
  fill: string;
}

const CurrencyComparison: React.FC<CurrencyComparisonProps> = ({ currencies }) => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [selectedCurrencies, setSelectedCurrencies] = useState(['EUR', 'GBP', 'JPY']);
  const [comparisonData, setComparisonData] = useState<ComparisonDataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComparisonData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${baseCurrency}&to=${selectedCurrencies.join(',')}`
      );
      const data = await response.json();
      
      if (data.rates) {
        const formattedData = [{
          name: baseCurrency,
          value: 1,
          fill: '#4F46E5'
        },
        ...Object.entries(data.rates).map(([currency, rate]) => ({
          name: currency,
          value: Number(rate),
          fill: '#7C3AED'
        }))];
        setComparisonData(formattedData);
      }
    } catch (err) {
      setError('Failed to fetch comparison data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCurrencies.length > 0) {
      fetchComparisonData();
    }
  }, [baseCurrency, selectedCurrencies]);

  const addCurrency = (currency: string) => {
    if (!selectedCurrencies.includes(currency)) {
      setSelectedCurrencies([...selectedCurrencies, currency]);
    }
  };

  const removeCurrency = (currency: string) => {
    setSelectedCurrencies(selectedCurrencies.filter(c => c !== currency));
  };

  const CustomTooltip = ({ 
    active, 
    payload 
  }: {
    active?: boolean;
    payload?: Array<{
      value: number;
      payload: {
        name: string;
      };
    }>;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">
            1 {baseCurrency} = {payload[0].value.toFixed(4)} {payload[0].payload.name}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Currency Comparison</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchComparisonData}
          className="p-2 text-indigo-600 hover:text-indigo-700"
          disabled={loading}
        >
          <RefreshCcw className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Base Currency
          </label>
          <select
            value={baseCurrency}
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="w-full md:w-48 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Currency to Compare
          </label>
          <div className="flex gap-2">
            <select
              className="w-full md:w-48 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => addCurrency(e.target.value)}
              value=""
            >
              <option value="" disabled>Select currency</option>
              {currencies
                .filter(c => c !== baseCurrency && !selectedCurrencies.includes(c))
                .map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedCurrencies.map((currency) => (
          <motion.div
            key={currency}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="inline-flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full"
          >
            {currency}
            <button
              onClick={() => removeCurrency(currency)}
              className="ml-2 text-indigo-600 hover:text-indigo-800"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
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

      <div className="h-80 w-full">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" name={`Value (in ${baseCurrency})`} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default CurrencyComparison;