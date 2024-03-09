import React, { useState, useEffect, useRef } from "react";
import styles from "./index.less";
import className from "classnames";
import FormItem from "@/components/form-item";
import * as QuestionApi from "@/api/question";
import * as HomeApi from "@/api/home";
import { useModel } from "umi";
import { Button, Progress } from "antd";

const GroupIcon = require("@/assets/group.png");

type Props = {
  subtitle?: string;
  submitTitle?: string;
  searchSuccess?: Function; //搜索成功回调
  [key: string]: any;
};
const Question: React.FC<Props> = (prop) => {
  const usersInfo = useModel("users");
  let {
    subtitle = "I've gotten to know you, and now please tell me what kind of positions you are looking for.",
    submitTitle = "Got it！And now I'm working hard to find positions that suit you. Please wait a moment…",
  } = prop;
  const percent = useRef(0);
  const formItemRef = useRef<any>(null);
  const [questionList, setQuestionList] = useState<any>([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const formData = useRef({});
  const formDataChange = (val: any) => {
    formData.current = val || {};
  };
  //获取文件上传数据
  const getInteractiveAsk = () => {
    let params = new URLSearchParams(),
      questionKey = [
        "title",
        "industry",
        "experience_level",
        "location",
        "post_time"
      ];

    questionKey.forEach((item) => {
      params.append("questionKey", item);
    });
    QuestionApi.getInteractiveAsk(params)
      .then((res: any) => {
        setQuestionList(res?.data || []);
      })
      .catch(() => {
        setQuestionList([]);
      });
  };

  //提交数据
  const submitData = async () => {
    let params: any = {};
    formItemRef.current?.formRef &&
      formItemRef.current?.formRef() &&
      formItemRef.current?.formRef()?.validateFields &&
      (await formItemRef.current?.formRef()?.validateFields());
    Object.entries(formData.current).forEach((item: any) => {
      params[item[0]] = {
        value: item[1],
      };
    });
    setIsSubmit(true);
    percent.current = 89;
    try {
      await QuestionApi.interactiveAnswer(params);
      formData.current = {};
      setIsSubmit(false);
      await HomeApi.recommendJobs({ resumeId: usersInfo.userInfo?.mainResumeId });
      prop?.searchSuccess && prop?.searchSuccess();
    } catch {
      setIsSubmit(false);
    };
  };

  useEffect(() => {
    getInteractiveAsk();
  }, []);

  return (
    <div className={className(styles.QuestionBox, prop.styleClass)}>
      <div className={styles.QuestionHeader}>
        <img src={GroupIcon} className={styles.QuestionHeaderIcon} />
        <div className={styles.QuestionHeaderTitle}>{subtitle}</div>
      </div>
      <div className={className(styles.QuestionContent)}>
        <FormItem
          ref={formItemRef}
          options={questionList}
          formData={formData.current}
          onChange={formDataChange}
        />
      </div>
      {!isSubmit ? (
        <div className={styles.QuestionFooter}>
          <Button type="primary" onClick={submitData}>
            Start searching
          </Button>
        </div>
      ) : (
        <div className={styles.QuestionHeader}>
          <img src={GroupIcon} className={styles.QuestionHeaderIcon} />
          <div className={styles.QuestionHeaderTitle}>
            {submitTitle}
            <Progress
              showInfo={false}
              strokeColor="#7A9FFF"
              trailColor="#fff"
              percent={percent.current}
            />
          </div>
        </div>
      )}
      {prop.children}
    </div>
  );
};

export default Question;
