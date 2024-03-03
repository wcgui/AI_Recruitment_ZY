import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import styles from "./index.less";
import * as User from "@/api/user";

const App: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    let params = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    if (params.oldPassword == params.newPassword) {
      message.warning("The new password is the same as the old one");
      return;
    }
    const res = await User.changePassword(params);

    if (res.data) {
      message.success("Password changed successfully!");
      form.resetFields();
    } else {
      // message.error(res.msg);
    }
  };

  return (
    <div className={styles.passwordBox}>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          name="oldPassword"
          label="Old Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.passwordSubmit}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
