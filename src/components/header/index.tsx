import React from "react";
import styles from "./index.less";
import className from "classnames";

const defaultPng = require("@/assets/yay.jpg");
type Props = {
  title?: string; //标题
  imgUrl?: string; //图片地址
  border?: boolean; //是否展示横线
  [key: string]: any;
};
const Header: React.FC<Props> = ({
  title = "Saladjobs",
  imgUrl = defaultPng,
  border = true,
  styleClass,
  children,
  logoClick,
}) => (
  <div
    className={className(styles.header, styleClass)}
    style={{ borderBottom: border ? "1px solid  #E7EAEE" : "" }}
  >
    <div onClick={() => logoClick && logoClick()} style={{ cursor: "pointer" }}>
      {imgUrl && <img src={imgUrl} alt="logo" className={styles.headerLogo} />}
      <span className={styles.headerTitle}>{title}</span>
    </div>
    {children}
  </div>
);

export default Header;
