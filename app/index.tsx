import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import Title from "@/components/Title/Title";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import globalStyle from "@/assets/styles/globalStyle";
import UserStory from "@/components/UserStory/UserStory";
import UserPost from "@/components/UserPost/UserPost";

export default function Index() {
  const userStories = [
    {
      firstName: "Joseph",
      id: 1,
      profileImage: require("../assets/images/default_profile.png"),
    },
    {
      firstName: "Jimmy",
      id: 2,
      profileImage: require("../assets/images/default_profile.png"),
    },
    {
      firstName: "John",
      id: 3,
      profileImage: require("../assets/images/default_profile.png"),
    },
    {
      firstName: "Keith",
      id: 4,
      profileImage: require("../assets/images/default_profile.png"),
    },
    {
      firstName: "Nata",
      id: 5,
      profileImage: require("../assets/images/default_profile.png"),
    }, //4
    {
      firstName: "Nicolas",
      id: 6,
      profileImage: require("../assets/images/default_profile.png"),
    },
    {
      firstName: "Nino",
      id: 7,
      profileImage: require("../assets/images/default_profile.png"),
    },
    {
      firstName: "Nana",
      id: 8,
      profileImage: require("../assets/images/default_profile.png"),
    },
    {
      firstName: "Adam",
      id: 9,
      profileImage: require("../assets/images/default_profile.png"),
    }, //8
  ];
  const userPosts = [
    {
      firstName: "Mary",
      lastName: "Lexis",
      location: "Boston, MA",
      likes: 1201,
      comments: 24,
      bookmarks: 55,
      image: require("../assets/images/default_post.png"),
      profileImage: require("../assets/images/default_profile.png"),
      id: 1,
    },
    {
      firstName: "Windy",
      lastName: "Adam",
      location: "Worcester, MA",
      likes: 1301,
      comments: 25,
      bookmarks: 70,
      image: require("../assets/images/default_post.png"),
      profileImage: require("../assets/images/default_profile.png"),
      id: 2,
    },
    {
      firstName: "Adam",
      lastName: "Spera",
      location: "Worcester, MA",
      likes: 100,
      comments: 8,
      bookmarks: 3,
      image: require("../assets/images/default_post.png"),
      profileImage: require("../assets/images/default_profile.png"),
      id: 3,
    },
    {
      firstName: "Nata",
      lastName: "Vacheishvili",
      location: "New York, NY",
      likes: 200,
      comments: 16,
      bookmarks: 6,
      image: require("../assets/images/default_post.png"),
      profileImage: require("../assets/images/default_profile.png"),
      id: 4,
    },
    {
      firstName: "Nicolas",
      lastName: "Namoradze",
      location: "Berlin, Germany",
      likes: 2000,
      comments: 32,
      bookmarks: 12,
      image: require("../assets/images/default_post.png"),
      profileImage: require("../assets/images/default_profile.png"),
      id: 5,
    },
  ];

  const userStoriesPageSize = 4;
  const [userStoriesCurrentPage, setUserStoriesCurrentPage] = useState(1);
  const [userStoriesRenderedData, setUserStoriesRenderedData] = useState([]);
  const [isLoadingUserStories, setIsLoadingUserStories] = useState(false);

  const userPostsPageSize = 4;
  const [userPostsCurrentPage, setUserPostsCurrentPage] = useState(1);
  const [userPostsRenderedData, setUserPostsRenderedData] = useState([]);
  const [isLoadingUserPosts, setIsLoadingUserPosts] = useState(false);

  const pagination = (database, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= database.length) {
      return [];
    }
    return database.slice(startIndex, endIndex);
  };

  useEffect(() => {
    setIsLoadingUserStories(true);
    const getInitialData = pagination(userStories, 1, userStoriesPageSize);
    setUserStoriesRenderedData(getInitialData);
    setIsLoadingUserStories(false);
  }, []);

  return (
    <SafeAreaView>
      <View>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={globalStyle.header}>
                <Title title={"Let’s Explore"} />
                <TouchableOpacity style={globalStyle.messageIcon}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size={20}
                    color={"#898DAE"}
                  />
                  <View style={globalStyle.messageNumberContainer}>
                    <Text style={globalStyle.messageNumber}>2</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={globalStyle.userStoryContainer}>
                <FlatList
                  onEndReachedThreshold={0.5}
                  onEndReached={() => {
                    if (isLoadingUserStories) {
                      return;
                    }
                    setIsLoadingUserStories(true);
                    const contentToAppend = pagination(
                      userStories,
                      userStoriesCurrentPage + 1,
                      userStoriesPageSize
                    );
                    if (contentToAppend.length > 0) {
                      setUserStoriesCurrentPage(userStoriesCurrentPage + 1);
                      setUserStoriesRenderedData((prev) => [
                        ...prev,
                        ...contentToAppend,
                      ]);
                    }
                    setIsLoadingUserStories(false);
                  }}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  data={userStoriesRenderedData}
                  renderItem={({ item }) => (
                    <UserStory
                      key={"userStory" + item.id}
                      firstName={item.firstName}
                      profileImage={item.profileImage}
                    />
                  )}
                />
              </View>
            </>
          }
          data={userPosts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={globalStyle.userPostContainer}>
              <UserPost
                firstName={item.firstName}
                lastName={item.lastName}
                image={item.image}
                likes={item.likes}
                comments={item.comments}
                bookmarks={item.bookmarks}
                profileImage={item.profileImage}
                location={item.location}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
