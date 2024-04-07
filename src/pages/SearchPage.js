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
      let airportsFiltered = [];
      for (let i = 0; i < airportData.length; i++) {
        if (airportData[i].name.toLowerCase().includes(search.toLowerCase())) {
          airportsFiltered.push(airportData[i]);
        } else if (
          airportData[i].city.toLowerCase().includes(search.toLowerCase())
        ) {
          airportsFiltered.push(airportData[i]);
        } else if (
          airportData[i].iata.toLowerCase().includes(search.toLowerCase())
        ) {
          airportsFiltered.push(airportData[i]);
        } else if (
          airportData[i].icao.toLowerCase().includes(search.toLowerCase())
        ) {
          airportsFiltered.push(airportData[i]);
        }
      }
      setAirports(airportsFiltered);
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
