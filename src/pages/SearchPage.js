import React from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import SearchCard from "../components/SearchCard";
import airportData from "../data/airports_data.json";

function SearchPage() {
  const [airports, setAirports] = React.useState(airportData);
  const [search, setSearch] = React.useState("");
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  React.useEffect(() => {
    if (search === "") {
      setAirports(airportData);
    } else {
      setAirports(
        airportData.filter((airport) =>
          airport.iata.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0, transition: { type: "tween", duration: 1 } }}
      exit={{ opacity: 0 }}
      className="search-page"
    >
      <SearchBar handler={setSearch} />
      <div className="search-card-container">
        {airports.slice(0, itemsPerPage).map((airport, index) => (
          <SearchCard key={index} airport={airport} />
        ))}
        <div className="search-card-container__pagination">
          <button
            className="search-load-more"
            onClick={() => {
              if (airports.length > itemsPerPage) {
                setAirports(airports.slice(itemsPerPage, itemsPerPage * 2));
              }
            }}
          >
            Load More
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SearchPage;
