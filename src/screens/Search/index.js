import React from "react";
import MuiAppBar from "../../components/AppBar";
import Suggested from "../../components/Suggested";

function Search() {
  const suggestedPeople = {};
  return (
    <div className="searchContainer">
      <MuiAppBar />
      <div className="searchSection">
        <div className="searchExtra" />
        <div className="searchScreen">
          <Suggested SuggestedPeopleData={suggestedPeople} />
        </div>
        <div className="searchExtra">
          {/* <Interests InterestData={communityData} /> */}
        </div>
      </div>
    </div>
  );
}

export default Search;
