import React, { useState } from "react";
import { Button, Rate, Modal, Form, Radio, Space } from "antd";
import styles from "./index.less";
import className from "classnames";
import * as Home from "@/api/home";
import * as Utils from "@/utils/util";

//当前操作方式
export enum OperateType {
  like = 1,
  unlike = 2,
  delete = 3,
  details = 4,
}

const LikeIcon = require("@/assets/like.png");
const UnLikeIcon = require("@/assets/group79.png");
const DeleteIcon = require("@/assets/group80.png");
const DefaultBoxHeight = 150; //容器默认高度
const ConfigQuestionOptions = [
  {
    label: "I'm not interested in this company",
    value: "UNLIKE_REASON_00001",
  },
  {
    label: "I'm not interested in this job title",
    value: "UNLIKE_REASON_00002",
  },
  {
    label: "I think the requirements don't match my skillset",
    value: "UNLIKE_REASON_00003",
  },
  {
    label: "I think it's irrelevant to my search",
    value: "UNLIKE_REASON_00004",
  },
  {
    label: "I already applied",
    value: "UNLIKE_REASON_00005",
  },
  {
    label: "Other",
    value: "UNLIKE_REASON_00006",
  },
];
type Props = {
  cardData: any;
  [key: string]: any;
};
const JobCard: React.FC<Props> = (prop) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  let { cardData = {}, isDelete = true } = prop;
  const hideModal = () => {
    setOpen(false);
  };
  const submitModal = async () => {
    if (formData.reasonCode) {
      let params = {
        taskId: cardData.taskId,
        jobId: cardData.jobId,
        ...formData,
      },
      reqFun = Home.unLikeJob;

      if (reqFun) {
        const res = await reqFun(params);
      }
      hideModal();
      prop.callBack && prop.callBack(OperateType.delete);
    }
  };
  const radioChange = (e: any) => {
    setFormData({ ...formData, reasonCode: e?.target?.value });
  }
  //操作
  const operateFun = async (type: OperateType) => {
    let reqFunc = null,
      params = {
        taskId: cardData.taskId,
        jobId: cardData.jobId,
      },
      data = {};
    if (type == OperateType.like) {
      reqFunc = Home.likeJob;
    } else if (type == OperateType.unlike) {
      reqFunc = Home.revokeLikeJob;
    } else if (type == OperateType.details) {
      reqFunc = Home.getJobDetail;
    } else if (type == OperateType.delete) {
      setOpen(true);
      reqFunc = Home.unLikeJob;
      return;
    }
    if (reqFunc) {
      const res = await reqFunc(params);

      data = res.data;
    }
    prop.callBack && prop.callBack(type, data || {});
  };
  const showOptions = [
    [
      {
        key: "companyName",
        label: "Company",
      },
      {
        key: "location",
        label: "Location",
      },
      {
        key: "experienceLevel",
        label: "Experience Level",
      },
      {
        key: "jobPostTime",
        label: "Post time",
        customValue: (value: any, item?: any) => {
          return Utils.formatUtcString(value);
        },
      },
    ],
    [
      {
        key: "salary",
        label: "Salary",
        styleClass: "ellipsis-multiline2",
      },
      {
        key: "jobType",
        label: "Job Type",
        styleClass: "ellipsis-multiline2",
        // isNoDefault: true,//是否不展示默认值
      },
      {
        key: "remoteStatus",
        label: "Remote/Onsite",
        styleClass: "ellipsis-multiline2",
        // isNoDefault: true,//是否不展示默认值
      },
    ],
    [
      {
        key: "companySummary",
        label: "Company Info",
        styleClass: "ellipsis-multiline3",
      },
      {
        key: "top3SkillsTitle",
        label: "Job Core skills",
        styleClass: "ellipsis-multiline3",
        customValue: (value: any, item?: any) => {
          return value?.map((val: any, key: any) => {
            return (
              <div key={key}>
                {key+1}. {val}
              </div>
            );
          });
        },
      },
    ],
  ];

  return (
    <div className={className(styles.JobCardBox, prop.styleClass)}>
      <div
        className={className("overflow", styles.JobCardHeader)}
        title={cardData.jobTitle}
      >
        {cardData.jobTitle}
      </div>
      <div className={className(styles.JobCardContent)}>
      {
        showOptions?.map((value, valueKey) => {
        return (
          <div className={styles.JobCardContentLeft} style={{width: 100/showOptions?.length + "%"}} key={valueKey}>
            {
              value?.map((item: any, key) => {
                return (
                  <div className={styles.JobCardContentLeftContent} style={{height: DefaultBoxHeight/value?.length + "px"}} key={key}>
                    {
                      item.label && <div className={styles.JobCardContentLeftContentLabel}>
                        {item.label}:
                      </div>
                    }
                    <div
                      className={className(
                        item.styleClass || "overflow",
                        styles.JobCardContentLeftContentLabelContent
                      )}
                      title={(item.customValue && item.customValue(cardData[item.key])) ||
                        cardData[item.key]}
                    >
                      {(item.customValue && item.customValue(cardData[item.key])) ||
                        cardData[item.key] ||
                        (!item.isNoDefault && "-")
                      }
                    </div>
                  </div>
                );
              })
            }
          </div>
        );
        })
      }
        {/* <div className={styles.JobCardContentRight}>
          {showRightOptions?.map((item, key) => {
            return (
              <div className={styles.JobCardContentRightContent} key={key}>
                <div className={styles.JobCardContentRightContentLabel}>
                  {item.label}
                </div>
                <div className={styles.JobCardContentLeftContentLabelContent}>
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={
                      (cardData.jobRate && cardData.jobRate[item.key]) || 0
                    }
                    style={{ color: "#FFA800" }}
                  />
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
      <div className={className(styles.JobCardBottom)}>
        <div className={className(styles.JobCardBottomRight, "overflow")} title={ cardData?.industries?.join(",")}>
          {
            cardData?.industries?.join(",")
          }
        </div>
        <div className={styles.JobCardBottomLeft}>
          {
            isDelete && <img
              src={DeleteIcon}
              onClick={() => operateFun(OperateType.delete)}
            />
            }
          <img
            src={cardData.like ? LikeIcon : UnLikeIcon}
            onClick={() =>
              operateFun(cardData.like ? OperateType.unlike : OperateType.like)
            }
          />
          <Button
            type="primary"
            onClick={() => operateFun(OperateType.details)}
          >
            View details
          </Button>
        </div>
      </div>
      <Modal
        title="Tell us a little more"
        open={open}
        onOk={submitModal}
        onCancel={hideModal}
        okText="Submit"
        cancelText="Cancel"
        width={"50%"}
      >
        <Form.Item
            name="reasonCode"
            label=""
          >
            <div>Letting us know why you're not interested helps us fine-tuneyour future recommendations.</div>
            <Radio.Group value={formData.reasonCode}>
              <Space direction="vertical">
                {
                  ConfigQuestionOptions.map((item: any, key) => {
                    return (<Radio key={key} value={item.value} onChange={radioChange}>{item.label}</Radio>);
                  })
                }
              </Space>
            </Radio.Group>
          </Form.Item>
      </Modal>
      {prop.children}
    </div>
  );
};

export default JobCard;
