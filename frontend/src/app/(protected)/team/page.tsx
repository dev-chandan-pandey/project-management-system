"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

import TeamCard from "@/components/team/TeamCard";
import TeamTable from "@/components/team/TeamTable";

export default function TeamPage() {

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
  const res = await api.get("/users", {
    params: {
      search,
    },
  });

  setUsers(res.data.data);
};

useEffect(() => {
  loadUsers();
}, [search]);

  const filteredUsers = users.filter((user) => {
    return (
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      user.email
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Team Members
        </h1>

        <input
          placeholder="Search Member..."
          className="border rounded p-3 w-80"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <TeamTable users={filteredUsers} />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:hidden">

        {filteredUsers.map((user) => (
          <TeamCard
            key={user._id}
            user={user}
          />
        ))}

      </div>

    </div>
  );
}