import React, { createContext, useContext, useEffect, useState } from "react";
import RobertPicture from "../../assets/profilepicture/image1.jpg";
import StevePicture from "../../assets/profilepicture/image2.jpg";
import postImg from "../../assets/logo.png";
import Hulk from "../../assets/profilepicture/image.jpg";
import { AuthContext } from "../AuthContext";
import { GET } from "../../constant/constant";

export const ProfileContext = createContext();
export const ProfileAction = createContext();

function ProfileContextProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    userName: "Kevin",
    firstName: "Kevin",
    lastName: "Foong",
    email: "kevinFoong@gmail.com",
    profilePicture: Hulk,
    location: "New York, New York",
    numberOfPost: 4,
    numberOfFollowings: 100,
    numberOfFollowers: 200,
  });
  const [profilePost, setProfilePost] = useState([]);
  const [suggestedPeople, setSuggestedPeople] = useState([]);

  useEffect(() => {
    // user: {
    //   id: user.id,
    //   email_address: user.email_address,
    //   username: user.username,
    //   first_name: user.first_name,
    //   last_name: user.last_name,
    //   date_of_birth: user.date_of_birth,
    //   bio: user.bio,
    //   profile_picture: user.pfp,
    //   post_count: user.post_count,
    //   following: user.following,
    //   saved_lst: user.saved_lst,
    //   created_at: user.created_at,
    //   updated_at: user.updated_at,
    // },
    setUserDetails({
      userName: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email_address,
      profilePicture: user.profile_picture || Hulk,

      numberOfPost: user.post_count || 0,
      numberOfFollowings: user.following || 0,
      numberOfFollowers: user.saved_lst || 0,
    });
  }, [user]);

  const ProfilePost = [
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

  const SuggestedPeople = [
    {
      name: "Steve Rogers",
      avatar: StevePicture,
      location: "London, UK",
    },
    {
      name: "Archie",
      avatar: RobertPicture,
      location: "Toronto,Canada",
    },
    {
      name: "Melinda",
      avatar: RobertPicture,
      location: "Paris, France",
    },
    {
      name: "Marcus",
      avatar: RobertPicture,
      location: "London, UK",
    },
    {
      name: "Gary",
      avatar: RobertPicture,
      location: "Toronto,Canada",
    },
    {
      name: "Kevin",
      avatar: RobertPicture,
      location: "Paris, France",
    },
  ];

  const getProfilePost = async () => {
    // Data should be call here from the data base
    await GET("profilePost")
      .then((res) => {
        const postProfileData =
          res?.length > 0
            ? res?.reverse().map((data) => {
                return {
                  name: `${user?.first_name} ${user?.last_name}`,
                  avatar: user?.profile_picture,
                  location: data.type,
                  title: data.title,
                  caption: data.body_text,
                  image: data.img_link,
                  _id: data.post_id,
                };
              })
            : [];

        setProfilePost(postProfileData);
      })
      .catch((error) => console.error("enconter error getting post: ", error));

    // setProfilePost(ProfilePost);
    // Replace this profile post with the data you receive
  };
  const getSuggestedPeople = () => {
    // Data should be call here from the data base

    setSuggestedPeople(SuggestedPeople);
    // Replace this profile post with the data you receive
  };

  useEffect(() => {
    getProfilePost();
    getSuggestedPeople();
  }, [user]);

  return (
    <ProfileContext.Provider
      value={{ profilePost, userDetails, suggestedPeople }}
    >
      <ProfileAction.Provider value={{ getProfilePost }}>
        {children}
      </ProfileAction.Provider>
    </ProfileContext.Provider>
  );
}

export default ProfileContextProvider;
