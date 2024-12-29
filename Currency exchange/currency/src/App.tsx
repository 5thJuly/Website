import "./App.css";
import CurrencyConverter from "./components/currency-convert";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="container">
          <CurrencyConverter />
          
        </div>
      </div>
    </>
  );
}

export default App;
