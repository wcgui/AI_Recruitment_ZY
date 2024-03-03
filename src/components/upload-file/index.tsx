import React, { useState, useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload, message } from "antd";
import { generateRandomString, exportApiFile } from "@/utils/util";
import { useModel } from "umi";
import * as FileApi from "@/api/file";
type Props = {
  [key: string]: any;
};
const { Dragger } = Upload;

const App: React.FC<Props> = (prop) => {
  const usersInfo = useModel("users");
  const [fileList, setFileList] = useState([]);

  const props: UploadProps = {
    name: "file",
    onChange(info) {
      const formData = new FormData(),
        file = info.file;
      // let arr = file?.name?.split(".");

      formData.append("file", file as any);
      // formData.append("fileKey", "cos-" + usersInfo.userInfo?.userId + "/" + generateRandomString(24) + "." + arr[arr.length - 1]);
      FileApi.uploadFile(formData, { fileType: prop.fileType || "RESUME" })
        .then((res: any) => {
          info.fileList[info.fileList.length - 1] = {
            ...info.fileList[info.fileList.length - 1],
            status: "done",
            fileKey: res.data,
          };
          setFileList([info.fileList[info.fileList.length - 1]]);
          prop.successBack && prop.successBack(info.fileList);
          message.success("Upload successfully.");
        })
        .catch(() => {
          setFileList([]);
        });
    },
    showUploadList: {
      // showDownloadIcon: true,
      downloadIcon: "Download",
      showRemoveIcon: false,
    },
    beforeUpload: () => {
      return false;
    },
    onDownload: (file: any) => {
      FileApi.downloadFile({ fileKey: file.fileKey }).then((res: any) => {
        exportApiFile(res, file.name);
      });
    },
    fileList,
  };

  useEffect(() => {
    setFileList(prop.fileList || []);
  }, [prop.fileList]);
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};

export default App;
