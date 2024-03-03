import React, { useEffect, useState } from "react";
import { history } from "umi";
import UploadFile from "@/components/upload-file";
import Question from "@/components/question";
import * as FileApi from "@/api/file";
import * as HomeApi from "@/api/home";
import { Button, message } from "antd";
import "./index.less";
const App: React.FC = () => {
  const [fileList, setFileList] = useState<any>([]);
  const [isNext, setIsNext] = useState<boolean>(false);

  //获取文件上传数据
  const getFileDetails = () => {
    FileApi.getFileDetails()
      .then((res: any) => {
        fileList.push(res?.data || {});
        setFileList([...fileList]);
      })
      .catch(() => {
        setFileList([]);
      });
  };

  //开始推荐职位
  const startRecommend = () => {
    if (fileList.length > 0) {
      setIsNext(true);
    } else {
      message.warning("Please upload your resume first");
    }
  };

  //上传成功回调
  const successBack = (data: any) => {
    setFileList(data || []);
  };

  //搜索成功回调
  const searchSuccess = async () => {
    await HomeApi.recommendJobs({ resumeId: fileList[0]?.fileKey });

    history.push("/");
  };

  useEffect(() => {
    // getFileDetails();
  }, []);
  return (
    <div className="uploadBox">
      {isNext ? (
        <Question searchSuccess={searchSuccess}></Question>
      ) : (
        <UploadFile fileList={fileList} successBack={successBack}></UploadFile>
      )}
      {fileList.length && !isNext ? (
        <div className="uploadStartBtn">
          <Button type="primary" onClick={startRecommend}>
            Next
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
