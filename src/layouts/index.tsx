import { Link, Outlet, history, useModel } from "umi";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import HeaderComponent from "@/components/header";
import styles from "./index.less";
import cache from "@/utils/cache";

export default function Layout() {
  const usersInfo = useModel("users");
  const dopdownData = [
    {
      key: "exit",
      label: "Signout",
    },
  ];
  const dropClick = (item: any) => {
    if (item.key == "exit") {
      exitLogin();
    }
  };
  const exitLogin = () => {
    cache.clearCache();
    history.replace("/login");
  };
  return (
    <div className={styles.navs}>
      <HeaderComponent title="Saladjobs" logoClick={() => history.replace("/")}>
        <Dropdown menu={{ items: dopdownData, onClick: dropClick }}>
          <Space>
            {"Hi" + usersInfo.userInfo.email}
            <DownOutlined />
          </Space>
        </Dropdown>
        {/* <span className={styles.exitBtn} onClick={exitLogin}>退出</span> */}
      </HeaderComponent>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
