"use client";
import { useAuthContext } from "@/context/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const { user } = useAuthContext();
  console.log("got user", user);

  const router = useRouter();
  const handleSignout = async () => {
    await fetch("/api/users/signout", { method: "POST" });
    router.refresh();
  };

  return (
    <div className="bg-slate-600 text-white p-2">
      {user?.currentUser?.email ? (
        <div>
          <span>Hello! {user.currentUser.email}</span>
          <button onClick={handleSignout}>Sign out</button>
        </div>
      ) : (
        <div>
          <div>
            <Link href={"sign-in"}>Sign in</Link>
          </div>
          <div>
            <Link href={"sign-up"}>Sign up</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
