// src/pages/user/index.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { history, Outlet } from "umi";
import classNames from "classnames";
import styles from "./index.less";

export default function UserPage() {
  const location = useLocation();
  const leftRoute = [
    {
      path: "/user/profile",
      label: "Upload Reume",
    },
    {
      path: "/user/password",
      label: "Change Password",
    },
  ];
  return (
    <div className={styles.userPage}>
      <div className={styles.userPageLeft}>
        <div className={styles.userPageLeftContent}>
          {leftRoute.map((item: any, index: number) => {
            return (
              <div
                className={classNames(
                  styles.userCommHeight,
                  item.path == location.pathname ? styles.isCurrent : ""
                )}
                key={index}
                onClick={() => history.push(item.path)}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.userPageRight}>
        <Outlet />
      </div>
    </div>
  );
}
