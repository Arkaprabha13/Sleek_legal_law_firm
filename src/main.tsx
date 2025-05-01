
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BlogProvider } from "./contexts/BlogContext";
import { AttorneyProvider } from "./contexts/AttorneyContext";
import { TestimonialProvider } from "./contexts/TestimonialContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BlogProvider>
        <AttorneyProvider>
          <TestimonialProvider>
            <App />
          </TestimonialProvider>
        </AttorneyProvider>
      </BlogProvider>
    </AuthProvider>
  </React.StrictMode>
);
