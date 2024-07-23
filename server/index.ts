import axios from "axios";

const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";

interface User {
  id: string;
  username: string;
}

const getFollowers = async (userId: string): Promise<User[]> => {
  try {
    const response = await axios.get(
      `https://graph.instagram.com/${userId}/followers`,
      {
        params: {
          fields: "id,username",
          access_token: ACCESS_TOKEN,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `Error fetching followers for user ${userId}:`,
      error.response.data
    );
    return [];
  }
};

const getFollowing = async (userId: string): Promise<User[]> => {
  try {
    const response = await axios.get(
      `https://graph.instagram.com/${userId}/following`,
      {
        params: {
          fields: "id,username",
          access_token: ACCESS_TOKEN,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `Error fetching following for user ${userId}:`,

    );
    return [];
  }
};

const main = async () => {
  // Get your followers
  const myFollowers = await getFollowers("me");
  console.log("My Followers (first 10):", myFollowers.slice(0, 10));

  // Get followers of your followers
  for (const follower of myFollowers.slice(0, 10)) {
    const followerId = follower.id;
    const followersFollowers = await getFollowers(followerId);
    console.log(
      `Followers of ${follower.username} (first 10):`,
      followersFollowers.slice(0, 10)
    );
  }

  // Get the people you follow
  const myFollowing = await getFollowing("me");
  console.log("People I Follow (first 10):", myFollowing.slice(0, 10));

  // Get followers of the people you follow
  for (const follow of myFollowing.slice(0, 10)) {
    const followingId = follow.id;
    const followingFollowers = await getFollowers(followingId);
    console.log(
      `Followers of ${follow.username} (first 10):`,
      followingFollowers.slice(0, 10)
    );
  }
};

main();
