"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { userSearch, addFriend } from "@/lib/supabase/helpers";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
interface Framework {
  value: string;
  label: string;
}

interface User {
  id: string;
  created_at: string;
  full_name: string;
  avatar_url: string;
  email: string;
}
export default function Search() {
  const { toast } = useToast();
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const [users, setUsers] = React.useState<User[]>([]);
  const [selectedId, setSelectedId] = React.useState<string>("");
  const handleAddFriend = async () => {
    console.log(users, value);
    const selectedUser = users.find((user) => user.id === selectedId);
    console.log(selectedUser);
    const sendFriendRequest = await addFriend(selectedUser?.id ?? "", 2);
    toast({ title: "status", description: sendFriendRequest?.data });
  };
  React.useEffect(() => {
    const fetchUsers = async () => {
      const userstemp = await userSearch();
      setUsers(userstemp || []);
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex w-screen justify-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? users.find(
                  (user) => user.full_name.toLowerCase() === value.toLowerCase()
                )?.full_name
              : "Select user..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search user..." />
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users &&
                users.map((user, index) => (
                  <CommandItem
                    key={index}
                    value={user.full_name}
                    className="w-16"
                    onSelect={(currentValue) => {
                      console.log(currentValue);
                      setValue(currentValue === value ? "" : currentValue);
                      setSelectedId(currentValue === value ? "" : user.id);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "h-4 !w-16",
                        value === user.full_name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {user.full_name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Button onClick={handleAddFriend}>Add Friend</Button>
    </div>
  );
}
