import React, { useEffect, useState} from 'react';
import UploadFile from '@/components/upload-file';
import * as FileApi from "@/api/file";
import { Button, message } from 'antd';
import './index.less';
const App: React.FC = () => {
  const [fileList, setFileList] = useState<any>([]);

  //获取文件上传数据
  const getFileDetails = () => {
    FileApi.getFileDetails().then((res: any) => {
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

    } else {
      message.warning("Please upload your resume first");
    }
  }

  useEffect(() => {
    getFileDetails();
  }, []);
  return (
    <div className='uploadBox'>
      <UploadFile fileList={fileList}></UploadFile>
      <div className='uploadStartBtn'>
        <Button type="primary" onClick={startRecommend}>
          Start searching
        </Button>
      </div>
    </div>
  );
};

export default App;
