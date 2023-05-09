import React, { createContext, useEffect, useState } from "react";
import RobertPicture from "../../assets/profilepicture/image1.jpg";
import StevePicture from "../../assets/profilepicture/image2.jpg";
import postImg from "../../assets/logo.png";

export const HomeContext = createContext();
export const HomeAction = createContext();

function HomeContextProvider({ children }) {
  const [homePost, setHomePost] = useState([]);
  const HomePost = [
    {
      name: "Steve Rogers",
      avatar: StevePicture,
      location: "London, UK",
      caption: "My new house",
      image: postImg,
    },
    {
      name: "Archie",
      avatar: RobertPicture,
      location: "Toronto,Canada",
      caption: "Amaizing view",
    },
    {
      name: "Melinda",
      avatar: RobertPicture,
      location: "Paris, France",
      caption: "My new house",
      image: postImg,
    },
    {
      name: "Marcus",
      avatar: RobertPicture,
      location: "London, UK",
      image: postImg,
    },
    {
      name: "Gary",
      avatar: RobertPicture,
      location: "Toronto,Canada",
      caption: "My new house",
      image: postImg,
    },
    {
      name: "Kevin",
      avatar: RobertPicture,
      location: "Paris, France",
    },
  ];

  const getHomePost = () => {
    // Data should be call here from the data base

    setHomePost(HomePost);
    // Replace this profile post with the data you receive
  };

  useEffect(() => {
    getHomePost();
  }, []);

  return (
    <HomeContext.Provider value={{ homePost }}>
      <HomeAction.Provider value={{}}>{children}</HomeAction.Provider>
    </HomeContext.Provider>
  );
}

export default HomeContextProvider;
