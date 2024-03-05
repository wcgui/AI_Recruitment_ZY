import React, { useEffect, useState, useRef } from "react";
import { Empty, Drawer, Pagination } from "antd";
import JobCard, { OperateType } from "@/components/job-card";
import Question from "@/components/question";
import * as Home from "@/api/home";
import classNames from "classnames";
import { history } from "umi";
import * as Utils from "@/utils/util";
import "./index.less";
const LikeIcon = require("@/assets/like.png");
const GroupIcon = require("@/assets/group.png");
interface pageType {
  current: number;
  total: number;
  pageSize: number;
}
//当前查询方式
enum LookType {
  liked = 1,
  history = 2,
}
const pageParams = {
  page: 1,
  pageSize: 1000,
};

const defaultNoData = "No Data";

const App: React.FC = () => {
  const [progressInfo, setProgressInfo] = useState("");
  const historyData = useRef<any>([]);
  const [likedHistory, setLikedHistory] = useState([]);
  const [detailsData, setDetailsData] = useState<any>({});
  const pageParamsData = useRef<pageType>({
    current: 1,
    pageSize: 8,
    total: 0,
  });
  const currentSelect = useRef({
    index: 0,
    type: LookType.history,
  });
  const [open, setOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const showQuDrawer = () => {
    setOpenQuestion(true);
  };
  const onQuClose = () => {
    setOpenQuestion(false);
  };

  //获取历史列表数据
  const getHistoryList = (bool: boolean = false) => {
    Home.getHistoryList({ ...pageParams })
      .then((res: any) => {
        let array = res?.data?.list || [];

        if (!array.length) {
          history.push("/upload");
        }
        historyData.current = array;
        if (bool) {
          lookDataList(LookType.history, 0);
        }
      })
      .catch(() => {
        historyData.current = [];
      }).
      finally(() => {
        onQuClose();
      });
  };
  //获取点赞列表数据
  const getFavourites = () => {
    let params = {
      page: pageParamsData.current.current,
      pageSize: pageParamsData.current.pageSize,
    };
    Home.getFavourites(params)
      .then((res: any) => {
        let array = res?.data?.list || [];
        setLikedHistory(array);
        pageParamsData.current.total = res?.data?.total || 0;
      })
      .catch(() => {
        setLikedHistory([]);
        pageParamsData.current.total = 0;
      });
  };
  //获取点赞列表数据
  const getRecommendJobs = () => {
    let params = {
      page: pageParamsData.current.current,
      pageSize: pageParamsData.current.pageSize,
      taskId: historyData.current[currentSelect.current.index]?.taskId,
    };
    if (params.taskId) {
      Home.getRecommendJobs(params)
        .then((res: any) => {
          setLikedHistory(res?.data?.jobVos?.list || []);
          pageParamsData.current.total = res?.data?.jobVos?.total || 0;
          setProgressInfo(res?.data?.progressInfo || defaultNoData);
        })
        .catch(() => {
          setLikedHistory([]);
          pageParamsData.current.total = 0;
          setProgressInfo(defaultNoData);
        });
    }
  };

  //分页发生变化
  const pageChange = (page: number, pageSize: number) => {
    pageParamsData.current.current = page;
    pageParamsData.current.pageSize = pageSize;
    let type = currentSelect.current.type;

    if (type == LookType.history) {
      getRecommendJobs();
    } else if (type == LookType.liked) {
      getFavourites();
    }
  };

  //点击当前操作模式
  const lookDataList = (type: LookType, index?: number) => {
    currentSelect.current = { type, index: index || index === 0 ? index : -1 };
    pageParamsData.current.current = 1;
    if (type == LookType.history) {
      getRecommendJobs();
    } else if (type == LookType.liked) {
      getFavourites();
    }
  };

  //点赞点踩操作
  const likeOperateFunc = (type: OperateType, data: any, index: number) => {
    let currentData: any = likedHistory[index];

    if ([OperateType.like, OperateType.unlike].includes(type)) {
      if (currentSelect.current.type == LookType.liked) {
        getFavourites();
        return;
      }
      currentData.like = !currentData.like;
      likedHistory[index] = currentData;
      setLikedHistory([...likedHistory]);
    } else if (OperateType.details == type) {
      setDetailsData(data);
      showDrawer();
    } else if (OperateType.delete == type) {
      likedHistory.splice(index, 1);
      setLikedHistory([...likedHistory]);
    }
  };

  useEffect(() => {
    getHistoryList(true);
  }, []);
  return (
    <div className="homeBox">
      <div className="homeLeft">
        <div className="homeLeftSearch">
          <img src={GroupIcon} />
          <div className="homeCommHeight" onClick={showQuDrawer}>
            New search
          </div>
        </div>
        <div className="homeLeftTitle">All jobs for me</div>
        <div className="homeLeftHistory">
          <div className="homeLeftHistorySub homeCommColor homeCommHeight">
            History
          </div>
          <div className="homeLeftCommonContent">
            {historyData.current.length ? (
              historyData.current.map((item: any, index: number) => {
                return (
                  <div
                    className={classNames(
                      "homeCommHeight",
                      currentSelect.current.index == index ? "isCurrent" : ""
                    )}
                    key={index}
                    onClick={() => lookDataList(LookType.history, index)}
                    title={Utils.formatUtcString(item.createdTime)}
                  >
                    {Utils.formatUtcString(item.createdTime)}
                  </div>
                );
              })
            ) : (
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 60 }}
              />
            )}
          </div>
        </div>
        <div className="homeLeftLiked">
          <div
            className="homeLeftLikeSub homeCommColor homeCommHeight"
            onClick={() => lookDataList(LookType.liked)}
          >
            <img src={LikeIcon} />
            Liked
          </div>
        </div>
        <div className="homeLeftProfile" onClick={() => history.push("/user")}>
          My profile
        </div>
      </div>
      <div className="homeRight">
        <div className="homeCommHeight homeCommColor">
          {pageParamsData.current.total} results
        </div>
        <div className="homeRightContentBox">
          {likedHistory.length ? (
            <div className="homeRightContent">
              {likedHistory.map((item: any, index: number) => {
                return (
                  <JobCard
                    key={index}
                    cardData={item}
                    styleClass="homeRightContentCard"
                    callBack={(type: OperateType, data: any) =>
                      likeOperateFunc(type, data, index)
                    }
                  ></JobCard>
                );
              })}
            </div>
          ) : (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 60 }}
              description={progressInfo}
            />
          )}
        </div>
        <div className="homeRightContentPage">
          <Pagination
            pageSize={pageParamsData.current.pageSize}
            current={pageParamsData.current.current}
            total={pageParamsData.current.total}
            onChange={pageChange}
          />
        </div>
        <Drawer
          title="Detailed JD"
          placement="right"
          onClose={onClose}
          open={open}
          width="50%"
        >
          <div
            dangerouslySetInnerHTML={{ __html: detailsData.jobDescription }}
          ></div>
        </Drawer>
        <Drawer
          title="Search for suitable jobs"
          placement="right"
          onClose={onQuClose}
          open={openQuestion}
          width="50%"
        >
          {openQuestion && (
            <Question
              subtitle="please tell me what kind of positions you are looking for."
              submitTitle="Got it！And now I'm working hard to find positions that suit you. Please wait a moment… You can close the chat and check the result later on home page."
              searchSuccess={getHistoryList}
            ></Question>
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default App;
