import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LinkPage } from "@/pages/linkPage/LinkPage";
import { Layout } from "./Layout";
import { HomePage } from "@/pages/homePage/HomePage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/:id" element={<LinkPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
