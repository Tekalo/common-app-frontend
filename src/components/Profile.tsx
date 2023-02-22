/* eslint-disable @next/next/no-img-element */
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import React from "react";

function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div className="space-y-5">
        <p>Hello {user.name}!</p>
        <p>Your profile information is available below</p>
        <div>
          <Image src={user.picture!} alt={user.name!} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div>
          <a href="/api/auth/logout">Logout</a>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <h1>You need to login first!</h1>
      <a href="/api/auth/login">Login</a>
    </div>
  );
}

export default Profile;
