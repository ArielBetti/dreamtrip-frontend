import { Routes, Route } from "react-router-dom";
import * as Page from "@/pages";
import { ROUTE } from "@/routes/routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<div>404</div>} />
      <Route path={ROUTE.login} element={<Page.Login />} />
      <Route path={ROUTE.home} element={<Page.Home />} />
      <Route path={ROUTE.trip} element={<Page.Trip />} >
        <Route path=":id" />
      </Route>
    </Routes>
  );
};
