import React from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import SearchCard from "../components/SearchCard";
import arcData from "../data/arcsMin.json";

function SearchPage() {
  const [search, setSearch] = React.useState("");
  let [arcs, setArcs] = React.useState(arcData);
  const itemsPerPage = 10;

  React.useEffect(() => {
    let newArcs = [];
    if (search === "") {
      setArcs(arcData);
      return;
    }
    arcs.forEach((arc) => {
      if (arc.flyFrom.toUpperCase().includes(search.toUpperCase())) {
        newArcs.push(arc);
      }
    });
    setArcs(newArcs);
  }, [search, arcs]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0, transition: { type: "tween", duration: 1 } }}
      exit={{ opacity: 0 }}
      className="search-page"
    >
      <SearchBar handler={setSearch} />
      <div className="search-results">Results for {search}</div>
      <div className="search-card-container">
        {arcs.slice(0, itemsPerPage).map((arc, index) => (
          <SearchCard key={index} flight={arc} />
        ))}
        <div className="search-card-container__pagination">
          <button
            className="search-load-more"
            onClick={() => {
              if (arcs.length > itemsPerPage) {
                setArcs(arcs.slice(itemsPerPage, itemsPerPage * 2));
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
