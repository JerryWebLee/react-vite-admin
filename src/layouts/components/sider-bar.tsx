import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChartOutlined, HomeOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, type MenuProps } from "antd";
import ReactIcon from "@/assets/svg/react.svg?react";
import { useTheme } from "@/components/theme-provider";
import { ROUTE_PATHS } from "@/constants/common";
import { useSelector, useSettingsStore } from "@/stores";

// 递归函数，找到匹配的菜单项
const findSelectedKeys = (items: MenuProps["items"], pathname: string, path: string[] = []) => {
  const selectedKeys: string[] = [];
  let openKeys: string[] = [];

  const travel = (items: MenuProps["items"], pathname: string, path: string[]) => {
    for (const item of items!) {
      if (item!.key === pathname) {
        selectedKeys.push(item!.key);
        openKeys = [...path];
        return;
      }
      if ((item as any).children) {
        path.push(item!.key as string);
        travel((item as any).children, pathname, path);
        path.pop();
      }
    }
  };

  travel(items, pathname, path);
  return { selectedKeys, openKeys };
};

const items: MenuProps["items"] = [
  {
    icon: <HomeOutlined />,
    label: <Link to={ROUTE_PATHS.landing}>首页</Link>,
    key: ROUTE_PATHS.landing,
  },
  {
    icon: <UserOutlined />,
    label: <Link to={ROUTE_PATHS.userManagement}>用户管理</Link>,
    key: ROUTE_PATHS.userManagement,
  },
  {
    icon: <MenuOutlined />,
    label: "一级菜单",
    key: ROUTE_PATHS.nestMenu,
    children: [
      {
        key: ROUTE_PATHS.subMenu1,
        label: <Link to={ROUTE_PATHS.subMenu1}>webgl-clearColor</Link>,
      },
      {
        key: ROUTE_PATHS.subMenu2,
        label: <Link to={ROUTE_PATHS.subMenu2}>webgl-绘制一个点</Link>,
      },
      {
        key: ROUTE_PATHS.subMenu3,
        label: <Link to={ROUTE_PATHS.subMenu3}>webgl-变量绘制点</Link>,
      },
      {
        key: ROUTE_PATHS.subMenu4,
        label: <Link to={ROUTE_PATHS.subMenu4}>webgl-鼠标点击绘制点</Link>,
      },
      {
        key: ROUTE_PATHS.subMenu5,
        label: <Link to={ROUTE_PATHS.subMenu5}>webgl-</Link>,
      },
    ],
  },
  {
    icon: <BarChartOutlined />,
    label: <Link to={ROUTE_PATHS.echartsDemo}>Echarts Demo</Link>,
    key: ROUTE_PATHS.echartsDemo,
  },
];

export default function SiderBar() {
  const location = useLocation();

  const firstRenderRef = useRef(true);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const { collapsed } = useSettingsStore(useSelector(["collapsed"]));

  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (location.pathname === "/") return;

    const { selectedKeys, openKeys } = findSelectedKeys(items, location.pathname);
    setSelectedKeys(selectedKeys);
    // 首次渲染时，设置默认值
    if (firstRenderRef.current) {
      setOpenKeys(openKeys);
    }
    // 将首次渲染标记设置为false
    firstRenderRef.current = false;
  }, [location.pathname]);

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme={isDarkMode ? "dark" : "light"}
      className="h-screen overflow-auto !sticky top-0 left-0 start-0"
    >
      <Link
        className="font-bold text-xl hover:text-current h-16 flex justify-center items-center gap-2 text-nowrap"
        to="/"
      >
        <ReactIcon className="size-6" />
        {collapsed ? null : <span className="text-gradient-ripple">React Admin</span>}
      </Link>
      <Menu
        theme={isDarkMode ? "dark" : "light"}
        mode="inline"
        items={items}
        selectedKeys={selectedKeys}
        // onSelect={({ selectedKeys }) => setSelectedKeys(selectedKeys)}
        openKeys={openKeys}
        onOpenChange={(openKeys) => setOpenKeys(openKeys)}
        className="!border-e-0"
      />
    </Layout.Sider>
  );
}
