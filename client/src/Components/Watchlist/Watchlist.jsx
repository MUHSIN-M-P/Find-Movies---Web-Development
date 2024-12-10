import React, { useEffect, useState } from "react";
import { WatchlistItem } from "./WatchlistItem";
import "./Watchlist.css";
import axios from "axios";
export const Watchlist = () => {
  const [watchList, setWatchList] = useState([]);

  const refreshWatchList = async () => {
    try {
      const result = await axios.get("http://localhost:5000/watch-list", {
        withCredentials: true,
      });
      const updatedWatchlist = result.data.watchlist?.rows || []; // Handle null or undefined watchlist
      setWatchList(updatedWatchlist);
      if(result.data.watchList){

      }
    } catch (error) {
      console.log("Error in fetching watch-list items:", error);
    }
  };

  useEffect(() => {
    refreshWatchList();
  }, []);

  return (
    <div className="watch-list">
      <div className="header">
        <h1>Watch List</h1>
        <div className="no-items">
          No of items in the list: <span>{Object.keys(watchList).length}</span>
        </div>
      </div>
      {
        watchList.length > 0 ? (
          watchList.map((item, index) => (
            <WatchlistItem
              key={item.itemid}
              id={item.itemid}
              movie_or_tvshow={item.movie_or_tvshow}
              refreshWatchList={refreshWatchList}
            />
          ))
        ) : (
          <p className="no-item">No items in Watch List</p>
        )
      }
      
    </div>
  );
};
