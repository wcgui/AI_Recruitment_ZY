import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import classNames from 'classnames';
import styles from './index.less';
import HeaderComponent from "@/components/header"
import { history, useModel } from 'umi';
import * as LOGIN from '@/api/login';
import { setToken } from '@/utils/cache';

type FieldType = {
  email?: string;
  password?: string;
  [key: string]: any;
};
const TitleIcon = require("@/assets/group.png");
const VectorIcon = require("@/assets/vector.png");

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState<FieldType>({});
  const usersInfo = useModel("users");
  const handleChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const onFinish = async (values: any) => {
    let params = {
      email: userData.email,
      password: userData.password,
      loginType: "email_with_password",
    };
    const res = await LOGIN.accountLogin(params);
    
    usersInfo.setUserInfo(res.data);
    setToken(res.data?.accessToken);
    skipPage("/");
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const skipPage = (path: string) => {
    history.replace(path);
  };

  return (<div className={styles.loginBox}>
    <HeaderComponent border={false} styleClass={{[styles.loginHeader]: true,}}></HeaderComponent>
    <div className={styles.loginContent}>
      <img src={VectorIcon} className={styles.loginContentIcon}/>
      <div className={styles.loginLeft}>
        <div className={styles.loginLeftContent}>
          <div className={styles.loginLeftContentTitleIcon}>
            <img src={TitleIcon} alt="logo" />
            <div className={styles.loginLeftContentTitleIconContent}>
              Hi, I'm your job search assistant xxx.
            </div>
          </div>
          <div className={styles.loginLeftContentTitle}>
            <span style={{color: "#2B67FF",}}>World's most intelligent</span><br/>
            <span>
              job search, <br/>
              powered by an AI assistant.<br/>
            </span>
          </div>
          <div className={styles.loginLeftContentSubTitle}>
            Are you still spending hours browsing for jobs?<br/> 
            Let your AI assistant xxx analyze newly posted jobs and select ones that you have a higher chance of success.
          </div>
        </div>
      </div>
      <div className={styles.loginRight}>
        <div className={styles.loginRightContent}>
          <div className={styles.loginRightTitle}>
            Sign in
          </div>
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item label="Email">
              <Form.Item<FieldType>
                name="email"
                noStyle
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input name="email" className={styles.loginCommHeight} value={userData.email} onChange={handleChange}/>
              </Form.Item>
            </Form.Item>
            <Form.Item label="Password">
              <Form.Item<FieldType>
                name="password"
                noStyle
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password name="password" className={styles.loginCommHeight} value={userData.password} onChange={handleChange}/>
              </Form.Item>
            </Form.Item>

            <Form.Item className={styles.loginFormRegister}>
              <span onClick={() => skipPage("/register")}>
                Sign up
              </span>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={classNames(styles.loginSubmit,styles.loginCommHeight)}>
                Get started
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  </div>);
};

export default App;
