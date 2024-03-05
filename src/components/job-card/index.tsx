import React from "react";
import { Rate } from "antd";
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

type Props = {
  cardData: any;
  [key: string]: any;
};
const JobCard: React.FC<Props> = (prop) => {
  let { cardData = {} } = prop;
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
      reqFunc = Home.unLikeJob;
    }
    if (reqFunc) {
      const res = await reqFunc(params);

      data = res.data;
    }
    prop.callBack && prop.callBack(type, data || {});
  };
  const showOptions = [
    {
      key: "companyName",
      label: "Company",
    },
    {
      key: "location",
      label: "Location",
    },
    {
      key: "jobTitle",
      label: "Job title",
    },
    {
      key: "jobPostTime",
      label: "Post time",
      customValue: (value: any, item?: any) => {
        return Utils.formatUtcString(value);
      },
    },
  ];
  const showRightOptions = [
    {
      key: "additionalProp1",
      label: "Requirement satisfaction",
    },
    {
      key: "additionalProp2",
      label: "Preferred experiences",
    },
    {
      key: "additionalProp3",
      label: "Experience relevance",
    },
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
        <div className={styles.JobCardContentLeft}>
          {showOptions?.map((item, key) => {
            return (
              <div className={styles.JobCardContentLeftContent} key={key}>
                <div className={styles.JobCardContentLeftContentLabel}>
                  {item.label}:
                </div>
                <div
                  className={className(
                    "overflow",
                    styles.JobCardContentLeftContentLabelContent
                  )}
                  title={cardData[item.key]}
                >
                  {(item.customValue && item.customValue(cardData[item.key])) ||
                    cardData[item.key] ||
                    "--"}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.JobCardContentRight}>
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
        </div>
      </div>
      <div className={className(styles.JobCardBottom)}>
        <div className={styles.JobCardBottomLeft}>
          <img
            src={cardData.like ? LikeIcon : UnLikeIcon}
            onClick={() =>
              operateFun(cardData.like ? OperateType.unlike : OperateType.like)
            }
          />
          <img
            src={DeleteIcon}
            onClick={() => operateFun(OperateType.delete)}
          />
        </div>
        <div
          className={styles.JobCardBottomRight}
          onClick={() => operateFun(OperateType.details)}
        >
          Detailed JD
        </div>
      </div>
      {prop.children}
    </div>
  );
};

export default JobCard;
