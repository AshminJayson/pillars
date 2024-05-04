"use client";
import * as React from "react";
import { fetchFriends } from "@/lib/supabase/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Pillars() {
  const [friends, setFriends] = React.useState([]);
  React.useEffect(() => {
    const fetchFriendsData = async () => {
      const friendsData: any = await fetchFriends();
      console.log("fetching friends", friendsData);
      setFriends(friendsData);
    };
    fetchFriendsData();
  }, []);
  return (
    <>
      <div className="w-screen">
        <div className="flex   justify-center">
          <div className="w-5/6 flex flex-wrap ">
            {friends &&
              friends.map((request: any, index) => (
                <Card key={index} className="max-w-56 hover:bg-slate-200 h-fit">
                  <CardHeader>
                    <CardTitle>{request.full_name} </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>See what he is doing</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
        <Button>Search Pillars</Button>
      </div>
    </>
  );
}
