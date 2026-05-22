// dummy.ts
import mongoose from "mongoose";
import User from "./models/user.models.js";
import Community from "./models/community.models.js";
import Event from "./models/event.models.js";
import Post from "./models/post.models.js";
import { Comment } from "./models/comments.models.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/hometown_hub";

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB Connected");

    // clear old data
    await User.deleteMany({});
    await Community.deleteMany({});
    await Event.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    console.log("Old data cleared");

    // =========================
    // USERS
    // =========================

    const users = await User.insertMany([
      {
        name: "Puneeth",
        firebaseUid: "firebase_uid_1",
        gender: "Male",
        town: "Angondhalli",
        city: "Bangalore",
        state: "Karnataka",
        email: "puneeth@example.com",
        authProvider: "google",
        role: "Admin",
      },
      {
        name: "Rahul",
        firebaseUid: "firebase_uid_2",
        gender: "Male",
        town: "Whitefield",
        city: "Bangalore",
        state: "Karnataka",
        email: "rahul@example.com",
        authProvider: "email",
      },
      {
        name: "Ananya",
        firebaseUid: "firebase_uid_3",
        gender: "Female",
        town: "Mysore",
        city: "Mysore",
        state: "Karnataka",
        email: "ananya@example.com",
        authProvider: "google",
      },
    ]);

    console.log("Users created");

    // =========================
    // COMMUNITIES
    // =========================

    const communities = await Community.insertMany([
      {
        name: "Angondhalli Community",
        type: "town",
        location: {
          town: "Angondhalli",
          city: "Bangalore",
          state: "Karnataka",
        },
        createdBy: users[0]._id,
        memberCount: 120,
      },
      {
        name: "Bangalore Techies",
        type: "city",
        location: {
          town: "",
          city: "Bangalore",
          state: "Karnataka",
        },
        createdBy: users[1]._id,
        memberCount: 540,
      },
    ]);

    console.log("Communities created");

    // update user communities
    users[0].myCommunities.push(communities[0]._id);
    users[1].myCommunities.push(
      communities[0]._id,
      communities[1]._id
    );
    users[2].myCommunities.push(communities[1]._id);

    await users[0].save();
    await users[1].save();
    await users[2].save();

    // =========================
    // EVENTS
    // =========================

    await Event.insertMany([
      {
        title: "Village Festival",
        description: "Annual village celebration",
        startDate: new Date("2026-06-10"),
        endDate: new Date("2026-06-12"),
        location: "Angondhalli Ground",
        community: communities[0]._id,
        createdBy: users[0]._id,
        status: "upcoming",
      },
      {
        title: "React Meetup",
        description: "Frontend developers meetup",
        startDate: new Date("2026-07-01"),
        location: "Whitefield Tech Park",
        community: communities[1]._id,
        createdBy: users[1]._id,
        status: "upcoming",
      },
    ]);

    console.log("Events created");

    // =========================
    // COMMENTS
    // =========================

    const comments = await Comment.insertMany([
      {
        content: "This is awesome 🔥",
        by: users[1]._id,
        likes: 2,
        likedBy: [users[0]._id, users[2]._id],
      },
      {
        content: "Excited for this event",
        by: users[2]._id,
        likes: 1,
        likedBy: [users[0]._id],
      },
    ]);

    console.log("Comments created");

    // =========================
    // POSTS
    // =========================

    await Post.insertMany([
      {
        userId: users[0]._id,
        communityId: communities[0]._id,
        content: "Welcome to Angondhalli community 🎉",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        commentNumber: 2,
        likes: 5,
        likedBy: [users[1]._id, users[2]._id],
        comments: [comments[0]._id, comments[1]._id],
      },
      {
        userId: users[1]._id,
        communityId: communities[1]._id,
        content: "Anyone interested in React + TypeScript meetup?",
        commentNumber: 0,
        likes: 3,
        likedBy: [users[0]._id],
        comments: [],
      },
    ]);

    console.log("Posts created");

    console.log("Dummy data inserted successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();