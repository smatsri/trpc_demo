"use client";

import { trpc } from "@/utils/trpc";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function ListUsers() {
  let { data: users, isLoading, isFetching } = trpc.getUsers.useQuery();
  let updateUser = trpc.updateUser.useMutation();

  const queryClient = useQueryClient();

  async function handleClick() {
    const a = await updateUser.mutateAsync({
      id: "1",
      name: "test" + Date.now(),
    });
    if (a.status === "success") {
      console.log("Updated user successfully");
    } else {
      console.log("Failed to update user", a.message);
    }

    queryClient.refetchQueries([["getUsers"], { type: "query" }]);
  }

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {users?.map((user) => (
          <div
            key={user.id}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            <img
              src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
              alt={user.name}
              style={{ height: 180, width: 180 }}
            />
            <h3>{user.name}</h3>
          </div>
        ))}
      </div>
      <button onClick={handleClick}>Click me</button>
    </>
  );
}
