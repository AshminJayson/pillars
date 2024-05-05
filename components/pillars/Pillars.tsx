"use client";
import * as React from "react";
import { fetchFriends } from "@/lib/supabase/helpers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const mooods = [
  {
    name: "Elated",
    value: "Elated",
    color: "bg-green-500",
  },
  {
    name: "Joyful",
    value: "Joyful",
    color: "bg-green-400",
  },
  {
    name: "Serene",
    value: "Serene",
    color: "bg-green-300",
  },
  {
    name: "Happy",
    value: "Happy",
    color: "bg-green-200",
  },
  {
    name: "Neutral",
    value: "Neutral",
    color: "bg-white",
  },
  {
    name: "Sad",
    value: "Sad",
    color: "bg-red-100",
  },
  {
    name: "Lonely",
    value: "Lonely",
    color: "bg-red-200",
  },
  {
    name: "Scared",
    value: "Scared",
    color: "bg-red-300",
  },
  {
    name: "Depressed",
    value: "Depressed",
    color: "bg-red-400",
  },
];

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { setFriendMoodrecord } from "@/lib/supabase/helpers";
import { depressionCal } from "@/lib/supabase/helpers";

export default function Pillars() {
  const [friends, setFriends] = React.useState([]);
  const [depressionFriends, setDepressionFriends] = React.useState([]);
  const [name, setName] = React.useState<string>("");
  const [mood, setMood] = React.useState<string>("");
  const moodInputRef = React.useRef<HTMLInputElement | null>(null);
  const [submittingMoodReport, setSubmittingMoodReport] =
    React.useState<boolean>(false);
  React.useEffect(() => {
    const fetchFriendsData = async () => {
      const friendsData: any = await fetchFriends();
      console.log("fetching friends", friendsData);
      setFriends(friendsData);
      let tempdepressionFriends = [];
      friendsData.map(async (friend: any) => {
        const check = await depressionCal(friend.user_id);
        console.log("check", check);
        tempdepressionFriends.push(check);
      });
      setDepressionFriends(tempdepressionFriends);
      console.log("depressionFriends", tempdepressionFriends);
    };
    fetchFriendsData();
  }, []);
  const submitMoodReport = async (user_id: string) => {
    console.log("hey in this submitMoodREport");
    const check = await setFriendMoodrecord(
      user_id,
      mood,
      moodInputRef.current?.value
    );
    if (check) {
      console.log("friendmoodrecord updated");
    }
    console.log("not updated friendmoodrecord");
  };

  return (
    <>
      <div className="w-screen">
        <div className="flex   justify-center">
          <div className="w-5/6 flex flex-wrap gap-2 p-4 ">
            {friends &&
              friends.map((request: any, index) => (
                <Dialog key={index}>
                  <DialogTrigger>
                    <Card className="max-w-56 hover:bg-slate-200 h-fit min-h-64 ">
                      <CardHeader>
                        <CardTitle>{request.full_name} </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>See what he is doing</p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="p-4 min-h-64 min-w-fit">
                    <DialogHeader>
                      <DialogTitle>
                        Hey what did you think about {request.full_name}&apos;s
                        mood today ?
                      </DialogTitle>
                      {depressionFriends[index] && (
                        <div>
                          <p className="text-red-600 text-xl">
                            Hey {request.full_name} is feeling low{" "}
                          </p>
                        </div>
                      )}
                      {!depressionFriends[index] && (
                        <div>
                          <p className="text-green-500 text-xl">
                            Hey {request.full_name} is feeling Fine{" "}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-4 p-4 items-center justify-center  pt-10">
                        <Select onValueChange={(value) => setMood(value)}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Mood" />
                          </SelectTrigger>
                          <SelectContent>
                            {mooods.map((mood, idx) => (
                              <SelectItem
                                className={`${mood.color} my-2`}
                                value={mood.value}
                                key={idx}
                              >
                                {mood.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Input
                          ref={moodInputRef}
                          placeholder="How are you feeling today?"
                        />
                        <Button
                          disabled={!mood || submittingMoodReport}
                          onClick={() => {
                            submitMoodReport(request.user_id);
                          }}
                        >
                          Submit
                        </Button>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ))}
          </div>
        </div>
        <div className="w-full flex justify-center p-4">
          <div className="w-5/6">
            <Link href="/search">
              <Button>Search and Find Pillars</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
