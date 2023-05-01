import React from "react";
import MuiAppBar from "../../components/AppBar";
import "./style.css";
import RobertPicture from "../../assets/profilepicture/image1.jpg";
import postImg from "../../assets/logo.png";
import StevePicture from "../../assets/profilepicture/image2.jpg";
import Post from "../../components/Post";
import Suggested from "../../components/Suggested";
import ProfileDetails from "../../components/ProfileDetails";
import Interests from "../../components/Interests";
import { Brush, RocketLaunch } from "@mui/icons-material";

function Profile() {
  const InterestsData = [
    {
      name: "Painting",
      icon: <Brush />,
      badge: "",
    },
    {
      name: "Space",
      icon: <RocketLaunch />,
      badge: "+99",
    },
  ];
  const KnownPeople = [
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
  const UserPost = [
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
  return (
    <div className="profileContainer">
      <MuiAppBar />
      <div className="ProfileSection">
        <div className="ProfileExtra" />
        <div className="ProfileScreen">
          <ProfileDetails
            userName="Robert Jr"
            location="New York, New York"
            avatar={RobertPicture}
            numberOfPost={4}
            numberOfFollowings={100}
            numberOfFollowers={200}
          />
          {/* Map over the user post array and render the post component for each post */}
          {UserPost.map((data) => {
            return (
              <Post
                userName={data.name}
                location={data.location}
                avatar={data.avatar}
                caption={data.caption}
                postImage={data.image}
              />
            );
          })}
        </div>
        <div className="ProfileExtra">
          <Suggested SuggestedPeopleData={KnownPeople} />
          <Interests InterestData={InterestsData} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
