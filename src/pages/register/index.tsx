import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import classNames from 'classnames';
import styles from './index.less';
import HeaderComponent from "@/components/header"
import { history } from 'umi';
import * as LOGIN from '@/api/login';
import { checkMobilePhoneRule, checkEmailRule } from "@/utils/util";

type FieldType = {
  userName?: string;
  password?: string;
  [key: string]: any;
};
const TitleIcon = require("@/assets/group.png");
const VectorIcon = require("@/assets/vector.png");

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [userData, setUserData] = useState<FieldType>({});
  const handleChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const onFinish = async (values: any) => {
    let params = {
      ...userData,
    };
    const res = await LOGIN.accountRegister(params);
    skipPage("/login");
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const skipPage = (path: string) => {
    history.replace(path);
  };

  return (<div className={styles.registerBox}>
    <HeaderComponent border={false} styleClass={{[styles.registerHeader]: true,}}></HeaderComponent>
    <div className={styles.registerContent}>
      <img src={VectorIcon} className={styles.registerContentIcon}/>
      <div className={styles.registerLeft}>
        <div className={styles.registerLeftContent}>
          <div className={styles.registerLeftContentTitleIcon}>
            <img src={TitleIcon} alt="logo" />
            <div className={styles.registerLeftContentTitleIconContent}>
              Hi, I'm your job search assistant xxx.
            </div>
          </div>
          <div className={styles.registerLeftContentTitle}>
            <span style={{color: "#2B67FF",}}>World's most intelligent</span><br/>
            <span>
              job search, <br/>
              powered by an AI assistant.<br/>
            </span>
          </div>
          <div className={styles.registerLeftContentSubTitle}>
            Are you still spending hours browsing for jobs?<br/> 
            Let your AI assistant xxx analyze newly posted jobs and select ones that you have a higher chance of success.
          </div>
        </div>
      </div>
      <div className={styles.registerRight}>
        <div className={styles.registerRightContent}>
          <div className={styles.registerRightTitle}>
            Sign up
          </div>
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form}
          >
            <Form.Item label="userName">
              <Form.Item<FieldType>
                name="userName"
                noStyle
                rules={[{ required: true, message: 'Please input your userName!' }]}
              >
                <Input name="userName" className={styles.registerCommHeight} value={userData.userName} onChange={handleChange}/>
              </Form.Item>
            </Form.Item>
            <Form.Item label="email">
              <Form.Item<FieldType>
                name="email"
                noStyle
                rules={[{ required: true, message: 'Please input your email!' }, 
                  {
                    validator: checkEmailRule,
                  },
                ]}
              >
                <Input name="email" className={styles.registerCommHeight} value={userData.email} onChange={handleChange}/>
              </Form.Item>
            </Form.Item>
            <Form.Item label="phoneNumber">
              <Form.Item<FieldType>
                name="phoneNumber"
                noStyle
                rules={[{ required: true, message: 'Please input your phoneNumber!' },
                  {
                    validator: checkMobilePhoneRule,
                  },
                ]}
              >
                <Input name="phoneNumber" className={styles.registerCommHeight} value={userData.phoneNumber} onChange={handleChange}/>
              </Form.Item>
            </Form.Item>
            <Form.Item label="Password">
              <Form.Item<FieldType>
                name="password"
                noStyle
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password name="password" className={styles.registerCommHeight} value={userData.password} onChange={handleChange}/>
              </Form.Item>
            </Form.Item>
            <Form.Item className={styles.registerFormRegister}>
              <span onClick={() => skipPage("/login")}>
                Sign in
              </span>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className={classNames(styles.registerSubmit,styles.registerCommHeight)}>
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
