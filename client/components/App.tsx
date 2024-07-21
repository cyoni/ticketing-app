//"use client";
import AuthProvider from "@/context/AuthProvider";
import React from "react";

function App({ user, children }) {
  return <AuthProvider user={user}>{children}</AuthProvider>;
}

export default App;
