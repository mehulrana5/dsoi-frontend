"use client"; // Ensure it runs only on the client side

import { useEffect, useState } from "react";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSamsungBrowser, setIsSamsungBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();

      // Detect if the user is on a mobile device
      setIsMobile(/iphone|ipod|android|blackberry|windows phone|mobile/i.test(ua));

      // Detect Samsung Internet Browser
      setIsSamsungBrowser(ua.includes("samsung"));

    }
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        outline: "red solid",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        {!isMobile
          ? <p>Please open this site on a phone.</p>
          :
          <LoginForm />
        }
        {/* <LoginForm /> */}
      </div>
    </div>
  );
}
