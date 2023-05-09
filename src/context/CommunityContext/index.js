import React, { createContext, useEffect, useState } from "react";
import { Biotech, Brush, MusicNote, RocketLaunch } from "@mui/icons-material";

export const CommunityContext = createContext();
export const CommunityAction = createContext();

function CommunityContextProvider({ children }) {
  const [communityData, setCommunityData] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(communityData[0]);

  const CommunityData = [
    {
      title: "Painting",
      userName: "PaintingTogether",
      icon: <Brush />,
      badge: "22",
    },
    {
      title: "Space",
      userName: "Space3",
      icon: <RocketLaunch />,
      badge: "+99",
    },
    {
      title: "Music",
      userName: "MusicPlay",
      icon: <MusicNote />,
      badge: "7",
    },
    {
      title: "Biology",
      userName: "Bio",
      icon: <Biotech />,
      badge: "85",
    },
  ];
  const updateSelectedCommunity = (arg) => {
    setSelectedCommunity(arg);
  };
  const getCommunityData = () => {
    // Data should be call here from the data base

    setCommunityData(CommunityData);
    updateSelectedCommunity(CommunityData[0]);
    // Replace this profile post with the data you receive
  };

  useEffect(() => {
    getCommunityData();
  }, []);
  return (
    <CommunityContext.Provider value={{ communityData, selectedCommunity }}>
      <CommunityAction.Provider value={{ updateSelectedCommunity }}>
        {children}
      </CommunityAction.Provider>
    </CommunityContext.Provider>
  );
}

export default CommunityContextProvider;
