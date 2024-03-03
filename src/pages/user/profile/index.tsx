import React, { useEffect, useState } from "react";
import UploadFile from "@/components/upload-file";
import * as FileApi from "@/api/file";
import "./index.less";
const App: React.FC = () => {
  const [fileList, setFileList] = useState<any>([]);

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

  useEffect(() => {
    // getFileDetails();
  }, []);
  return (
    <div className="uploadBox">
      <UploadFile fileList={fileList}></UploadFile>
    </div>
  );
};

export default App;
