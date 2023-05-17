import React, { useContext } from "react";
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
import { ProfileContext } from "../../context/ProfileContext";
import { CommunityContext } from "../../context/CommunityContext";

function Profile() {
  const { profilePost, userDetails, suggestedPeople } =
    useContext(ProfileContext);
  const { communityData } = useContext(CommunityContext);

  return (
    <div className="profileContainer">
      <MuiAppBar />
      <div className="ProfileSection">
        <div className="ProfileExtra" />
        <div className="ProfileScreen">
          <ProfileDetails
            userName={userDetails.userName}
            location={`${userDetails.firstName} ${userDetails.lastName}`}
            avatar={userDetails.profilePicture}
            numberOfPost={userDetails.numberOfPost}
            numberOfFollowings={userDetails.numberOfFollowings}
            numberOfFollowers={userDetails.numberOfFollowers}
          />
          {/* Map over the user post array and render the post component for each post */}

          {profilePost?.length > 0 &&
            profilePost?.map((data) => {
              return (
                <Post
                  userName={data.name}
                  location={data.location}
                  avatar={data.avatar}
                  caption={data.caption}
                  postImage={data.image}
                  headerRightIcon="Remove"
                  handleHeaderRightIcon={() => alert("Post removed!")}
                />
              );
            })}
        </div>
        <div className="ProfileExtra">
          <Suggested SuggestedPeopleData={suggestedPeople} />
          <Interests InterestData={communityData} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
