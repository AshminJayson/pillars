"use client";
import * as React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import { fetchFriendRequests } from "@/lib/supabase/helpers";
import { deleteFriendRequests } from "@/lib/supabase/helpers";
import { makeFriend } from "@/lib/supabase/helpers";
interface Requests {
  id: string;
  full_name: string;
}

export default function Inbox() {
  const [requests, setRequests] = React.useState<Requests[] | null>(null);
  const [istobeaccepted, setIstobeaccepted] = React.useState<boolean[]>([]);
  const [reload, setReload] = React.useState<boolean>(false);
  const requestDoing = async (key: number) => {
    const check = istobeaccepted[key];
    if (check && requests) {
      const isUpdated = await makeFriend(requests[key].id);
      if (isUpdated) {
        console.log("updated");
      } else {
        console.log("not updated");
      }
    } else {
      if (requests) {
        console.log(requests[key].id);
        const isdeleted = await deleteFriendRequests(requests[key].id);
        if (isdeleted) {
          console.log("deleted");
        } else {
          console.log("not deleted");
        }
      }
    }
    setReload(!reload);
  };
  React.useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetchFriendRequests();
      const requests: Requests[] = (response as Requests[]) || [];
      setRequests(requests);
      console.log(requests);
      const tempistobeaccepted = requests.map(() => false);
      setIstobeaccepted(tempistobeaccepted);
    };
    fetchRequests();
  }, [reload]);

  return (
    <div className="p-4 hover:bg-slate-200 rounded-md">
      <Sheet>
        <SheetTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
            />
          </svg>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Pillar and Friend Request</SheetTitle>
            <SheetDescription>The Pillar request are here</SheetDescription>
            {requests?.map((request, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{request.full_name} </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="pillarrequest">
                        Accept Pillar Request
                      </Label>
                      <Switch
                        id="pillarrequest"
                        checked={istobeaccepted[index]}
                        onCheckedChange={() => {
                          const newIstobeaccepted = [...istobeaccepted];
                          newIstobeaccepted[index] = !newIstobeaccepted[index];
                          setIstobeaccepted(newIstobeaccepted);
                          console.log(newIstobeaccepted);
                        }}
                      />
                    </div>
                    <Button onClick={() => requestDoing(index)}>Submit</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
