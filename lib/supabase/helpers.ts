"use server";
import { cookies } from "next/headers";
import { createClient } from "./server";

export async function getUsername(id: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    let { data, error } = await supabase
      .from("users")
      .select("full_name")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching data from status table:", error);
      throw error;
    }

    return data?.full_name;
  } catch (error) {
    console.error("Error fetching data from status table:", error);
    return null;
  }
}

export async function addSelfMoodRecord(mood: string, mood_text: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const moods = [
    "Elated",
    "Joyful",
    "Serene",
    "Happy",
    "Neutral",
    "Sad",
    "Lonely",
    "Scared",
    "Depressed",
  ];

  const user_id = user.id;
  try {
    let { data, error } = await supabase.from("mood_swings").insert([
      {
        ratee: user_id,
        rater: user_id,
        weight: 1,
        mood_score: moods.length - moods.indexOf(mood) + 1,
        mood: mood,
        mood_text: mood_text,
      },
    ]);

    if (error) {
      console.error("Error inserting data into mood table:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error inserting data into mood table:", error);
    return null;
  }
}

export async function userSearch() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    let { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.error("Error fetching data from users table:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching data from users table:", error);
    return null;
  }
}

export async function addFriend(friendId: string, weight: number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;
  if (user.id === friendId)
    return {
      data: "Error inserting data into friends table: Cannot add self as friend",
    };
  const userId = user.id;

  try {
    let { data: checkRelation, error: error2 } = await supabase
      .from("supports")
      .select("*")
      .eq("user_id1", userId)
      .eq("user_id2", friendId);
    if (checkRelation && checkRelation.length > 0) {
      return {
        data: "Error inserting data into friends table: Already friends or Friend request already sent",
      };
    }
    let { data, error } = await supabase.from("supports").insert([
      {
        user_id1: userId,
        user_id2: friendId,
        weight: weight,
        state: false,
      },
    ]);

    if (error) {
      console.error("Error inserting data into friends table:", error);
      throw error;
    }

    return { data: "Friend request sent" };
  } catch (error) {
    console.error("Error inserting data into friends table:", error);
    return null;
  }
}

export async function fetchFriendRequests() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }

  try {
    let { data, error } = await supabase
      .from("supports")
      .select("*")
      .eq("user_id2", user.id)
      .eq("state", false);

    if (error) {
      console.error("Error fetching data from supports table:", error);
      throw error;
    }
    let result_data = await Promise.all(
      (data || []).map(async (item) => {
        let { data: userData, error: userError } = await supabase
          .from("users")
          .select("full_name")
          .eq("id", item.user_id1);
        if (userError || !userData) {
          return null;
        }
        return {
          id: item.id,
          full_name: userData[0]?.full_name,
        };
      })
    );

    return result_data;
  } catch (error) {
    console.error("Error fetching data from supports table:", error);
    return { data: [] };
  }
}

export async function deleteFriendRequests(id: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // if (!user) {
  //   return null;
  // }

  try {
    let { data, error } = await supabase.from("supports").delete().eq("id", id);
    if (error) {
      console.error("Error deleting data from supports table:", error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error("Error deleting data from supports table:", error);
    return false;
  }
}

export async function makeFriend(id: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  try {
    let { data, error } = await supabase
      .from("supports")
      .update({ state: true })
      .eq("id", id)
      .select();
    if (error) {
      console.error("Error deleting data from supports table:", error);
      throw error;
    }
    return true;
  } catch (error) {
    return false;
  }
}
