import React, { useState, useRef } from 'react';
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
const StepOptions = [
  [
    {
      img: require("@/assets/image4.png"),
    },
    {
      title: "Step 1. Upload your resume",
      content: "Our AI assistant reads your resume and analyzes your skills and experiences",
    },
  ],
  [
    {
      title: "Step 2. Find your matches!",
      content: "Our job matching engine will find your top matches based on your resume and a few simple inputs such as your preferred industries, job level, location<br /><br />Our algorithm is purely based on skills and experiences, not your current industry or job title - and therefore, making it perfect for people considering a change in career",
    },
    {
      img: require("@/assets/image7.png"),
    },
  ],
  [
    {
      img: require("@/assets/image8.png"),
    },
    {
      title: "Step 3. View and refine your results",
      content: "Your results can be available within less than 1 minute! Provide your feedback on your results or begin a new search to receive more jobs tailored for you!",
    },
  ]
];

const App: React.FC = () => {
  const loginContentRef = useRef<HTMLDivElement>(null);
  const loginStepsRef = useRef<HTMLDivElement>(null);
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
  const handleClickScrollToTarget = (targetRef: any) => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (<div className={styles.loginBox}>
    <HeaderComponent border={false} styleClass={{[styles.loginHeader]: true,}}></HeaderComponent>
    <div className={styles.loginContent} ref={loginContentRef}>
      {/* <img src={VectorIcon} className={styles.loginContentIcon}/> */}
      <div className={styles.loginLeft}>
        <div className={styles.loginLeftContent}>
          <div className={styles.loginLeftContentTitleIcon}>
            <img src={TitleIcon} alt="logo" />
            <div className={styles.loginLeftContentTitleIconContent}>
              Hi, I'm your job search assistant xxx.
            </div>
          </div>
          <div className={styles.loginLeftContentTitle}>
            <span style={{color: "#2B67FF",}}>Don’t let your current job define your future - explore your possibilities with us.</span><br/>
            <span>
              AI job search tool specifically designed for career exploration
            </span>
          </div>
          {/* <div className={styles.loginLeftContentSubTitle}>
            Are you still spending hours browsing for jobs?<br/> 
            Let your AI assistant xxx analyze newly posted jobs and select ones that you have a higher chance of success.
          </div> */}
          <div className={styles.loginLeftContentBottom} onClick={() => handleClickScrollToTarget(loginStepsRef)}>
            How it works
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
    <div className={styles.loginSteps} ref={loginStepsRef}>
      {
        StepOptions?.map((item: any, key) => {
          return (<div className={styles.loginStepsBox} key={key}>
            {
              item?.map((value: any, index: number) => {
                return (<div className={styles.loginStepsLeft} key={index}>
                  { 
                    value?.img ? <img src={value?.img} alt="logo" /> :
                    <div className={styles.loginStepsLeftContent}>
                      <div>
                        {value.title}
                      </div>
                      <div  dangerouslySetInnerHTML={{ __html: value.content }}>
                      </div>
                    </div>
                  }
                </div>);
              })
            }
          </div>);
        })
      }
      <div className={styles.loginStepsBottom} onClick={() => handleClickScrollToTarget(loginContentRef)}>
        Get started
      </div>
    </div>
  </div>);
};

export default App;
