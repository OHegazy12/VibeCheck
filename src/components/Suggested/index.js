import React, { useState } from "react";
import "./style.css";
import { Typography } from "@mui/material";

import MuiButton from "../Button";
import UserHeader from "../UserHeader";

function Suggested({ SuggestedPeopleData }) {
  const [more, setMore] = useState(3);
  return (
    <div className="SuggestedPeople">
      <Typography variant="h5" fontWeight={700} marginBottom={2}>
        People you may known
      </Typography>
      {/* State hook "more" to keep trac of the number of suggested people to display  */}
      {/* uses the array method slice to only display the first more (3) number of suggested people */}
      {SuggestedPeopleData.slice(0, more).map((data, index) => {
        return (
          <UserHeader
            avatar={data.avatar}
            name={data.name}
            location={data.location}
            rightIcon="PersonAdd"
            key={data?._id || index}
          />
        );
      })}
      {/* when clicked, increses the more state by 3 */}
      {SuggestedPeopleData.length > more && (
        <MuiButton
          label="see more"
          variant="dark"
          onClick={() => setMore(more + 3)}
        />
      )}
    </div>
  );
}

export default Suggested;
