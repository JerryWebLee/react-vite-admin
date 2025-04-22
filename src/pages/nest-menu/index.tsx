import { Outlet } from "react-router-dom";
import { Typography } from "antd";

export default function NavLayout() {
  return (
    <div className="text-indigo-700">
      <Typography.Title level={3} className="text-center">
        WEBGL 练习
      </Typography.Title>
      <Outlet />
    </div>
  );
}
