import React from "react";
import {
  Layout,
} from "antd";
import "./layouts.less";
const { Header, Content } = Layout;

const DashboardLayout = (props) => {

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout className="site-layout">
        <Header className="header-layout">
          
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
            }}
          >
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: 20,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;