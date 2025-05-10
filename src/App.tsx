
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

// 🔌 Підключення до Supabase
const supabase = createClient(
  "https://iorzmhfbvvkpjbzilmbo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvcnptaGZidnZrcGpiemlsbWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4OTI0NTcsImV4cCI6MjA2MjQ2ODQ1N30.d4Kf3iU0s8K2lGlcbZdcKGZmbGf8QY-h6_uhErfvbQ8"
);

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        {!session ? (
          <Route path="*" element={<Auth supabase={supabase} />} />
        ) : (
          <Route path="*" element={<Profile supabase={supabase} session={session} />} />
        )}
      </Routes>
    </Router>
  );
}
