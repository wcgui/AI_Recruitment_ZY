import { Link, Outlet, history } from 'umi';
import HeaderComponent from "@/components/header"
import styles from './index.less';
import cache from "@/utils/cache";

export default function Layout() {
  const exitLogin = () => {
    cache.clearCache();
    history.replace("/login");
  }
  return (
    <div className={styles.navs}>
      <HeaderComponent title='App Name'>
        <span className={styles.exitBtn} onClick={exitLogin}>退出</span>
      </HeaderComponent>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
