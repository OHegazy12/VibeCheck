import React, { createContext, useState } from "react";
import { POST } from "../../constant/constant";

export const SearchContext = createContext();
export const SearchAction = createContext();

function SearchContextProvider({ children }) {
  const [searchList, setSearchList] = useState([]);

  const getSearchList = async (search) => {
    // Data should be call here from the data base
    const body = {
      searchQuery: search,
    };
    await POST("search", body)
      .then((res) => {
        console.log("Response => ", res);
        const searchData =
          res?.length > 0
            ? res?.map((data) => {
                return {
                  _id: data.id,
                  name: data.username,
                  location: data.email_address,
                  avatar: data.pfp,
                };
              })
            : [];
        setSearchList(searchData);
        console.log(searchData);
      })
      .catch((error) => console.error("enconter error: ", error));
  };

  return (
    <SearchContext.Provider value={{ searchList }}>
      <SearchAction.Provider value={{ getSearchList }}>
        {children}
      </SearchAction.Provider>
    </SearchContext.Provider>
  );
}

export default SearchContextProvider;
