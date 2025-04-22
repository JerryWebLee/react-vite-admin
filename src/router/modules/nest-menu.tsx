import { Link, type RouteObject } from "react-router-dom";
import { ProgressBar } from "@/components/progress-bar";
import { ROUTE_PATHS } from "@/constants/common";

export const nestMenuRoute: RouteObject = {
  path: ROUTE_PATHS.nestMenu,
  lazy: async () => ({
    Component: (await import("@/pages/nest-menu")).default,
  }),
  HydrateFallback: ProgressBar,
  handle: {
    title: "嵌套菜单",
    crumb: () => "嵌套菜单",
  },
  children: [
    {
      path: ROUTE_PATHS.subMenu1,
      lazy: async () => ({
        Component: (await import("@/pages/nest-menu/sub-menu-1")).default,
      }),
      HydrateFallback: ProgressBar,
      handle: {
        title: "webgl-clearColor",
        crumb: () => <Link to={ROUTE_PATHS.subMenu1}>webgl-clearColor</Link>,
      },
    },
    {
      path: ROUTE_PATHS.subMenu2,
      lazy: async () => ({
        Component: (await import("@/pages/nest-menu/sub-menu-2")).default,
      }),
      HydrateFallback: ProgressBar,
      handle: {
        title: "webgl-绘制一个点",
        crumb: () => <Link to={ROUTE_PATHS.subMenu2}>webgl-绘制一个点</Link>,
      },
    },
    {
      path: ROUTE_PATHS.subMenu3,
      lazy: async () => ({
        Component: (await import("@/pages/nest-menu/sub-menu-3")).default,
      }),
      HydrateFallback: ProgressBar,
      handle: {
        title: "webgl-变量绘制点",
        crumb: () => <Link to={ROUTE_PATHS.subMenu3}>webgl-变量绘制点</Link>,
      },
    },
    {
      path: ROUTE_PATHS.subMenu4,
      lazy: async () => ({
        Component: (await import("@/pages/nest-menu/sub-menu-4")).default,
      }),
      HydrateFallback: ProgressBar,
      handle: {
        title: "webgl-鼠标点击绘制点",
        crumb: () => <Link to={ROUTE_PATHS.subMenu3}>webgl-鼠标点击绘制点</Link>,
      },
    },
    {
      path: ROUTE_PATHS.subMenu5,
      lazy: async () => ({
        Component: (await import("@/pages/nest-menu/sub-menu-5")).default,
      }),
      HydrateFallback: ProgressBar,
      handle: {
        title: "webgl-",
        crumb: () => <Link to={ROUTE_PATHS.subMenu5}>webgl-</Link>,
      },
    },
  ],
};
