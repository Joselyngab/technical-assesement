import React from "react";
import "./layouts.less";
import { Route } from "react-router-dom";
import DashboardLayout from "./dashboardLayout";

const DashboardLayoutRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <DashboardLayout>
          <Component {...props} />
        </DashboardLayout>
      )}
    />
  );
};

export default DashboardLayoutRoute;
