import React from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";
import SearchCard from "../components/SearchCard";
import arcData from "../data/arcs.json";
import InfiniteScroll from "react-infinite-scroller";
import "../App.css";

function SearchPage() {
  const [search, setSearch] = React.useState("");
  const itemsPerPage = 10;
  const [hasMore, setHasMore] = React.useState(true);
  const [arcs, setArcs] = React.useState(arcData.slice(0, itemsPerPage));

  const showItems = (records, searchInput) => {
    var items = [];
    for (var i = 0; i < records.length; i++) {
      /*
      if (records[i].source.toLowerCase().includes(search.toLowerCase())) {
        items.push(records[i]);
      }
      */
      items.push(<SearchCard flight={records[i]} key={i} />);
    }
  };

  const loadMore = () => {
    if (arcs.length >= arcData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setArcs(
        arcs.concat(arcData.slice(arcs.length, arcs.length + itemsPerPage))
      );
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0, transition: { type: "tween", duration: 1 } }}
      exit={{ opacity: 0 }}
      className="search-page"
    >
      <SearchBar handler={setSearch} />
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<div className="loader">Loading ...</div>}
        useWindow={false}
      >
        <div className="search-cards">
          {arcs.map((arc, index) => {
            return <SearchCard flight={arc} key={index} />;
          })}
        </div>
      </InfiniteScroll>
    </motion.div>
  );
}

export default SearchPage;
