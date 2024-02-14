import React, { useEffect, useState} from 'react';
import { Empty, Drawer } from "antd";
import JobCard, { OperateType } from '@/components/job-card';
import * as Home from "@/api/home";
import './index.less';
const LikeIcon = require('@/assets/like.png');
const GroupIcon = require('@/assets/group.png');
//当前查询方式
enum LookType {
  liked = 1,
  history = 2,
}

const App: React.FC = () => {
  const [history, setHistory] = useState<any>([]);
  const [likedHistory, setLikedHistory] = useState([]);
  const [detailsData, setDetailsData] = useState<any>({});
  const [current, setCurrent] = useState({
    index: 0,
    type: LookType.history,
  });
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  //获取历史列表数据
  const getHistoryList = () => {
    Home.getHistoryList().then((res: any) => {
      setHistory(res?.data?.list || []);
    })
    .catch(() => {
      setHistory([]);
    });
  };
  //获取点赞列表数据
  const getFavourites = () => {
    Home.getFavourites().then((res: any) => {
      setLikedHistory(res?.data?.list || []);
    })
    .catch(() => {
    });
  };
  //获取点赞列表数据
  const getCecommendHistory = () => {
    let params = {
      seqId: history[current.index]?.seqId,
    }
    Home.getCecommendHistory(params).then((res: any) => {
      setLikedHistory(res?.data?.list || []);
    })
    .catch(() => {
      setLikedHistory([]);
    });
  };

  //点击当前操作模式
  const lookDataList = (type: LookType, index?: number) => {
    setCurrent({type, index: index || 0});

    if (type == LookType.history) {
      getCecommendHistory();
    } else if (type == LookType.liked) {
      getFavourites();
    }
  };

  //点赞点踩操作
  const likeOperateFunc = (type: OperateType, data: any, index: number) => {
    let currentData: any = likedHistory[index];

    if ([OperateType.like, OperateType.unlike].includes(type)) {
      currentData.isLiked = !currentData.isLiked;
      likedHistory[index] = currentData;
      setLikedHistory([...likedHistory]);
    } else if (OperateType.details == type) {
      setDetailsData(data);
      showDrawer();
    } else if (OperateType.delete == type) {
      likedHistory.splice(index, 1);
      setLikedHistory([...likedHistory]);
    }
  }

  useEffect(() => {
    getHistoryList();
  }, []);
  return (
    <div className='homeBox'>
      <div className='homeLeft'>
        <div className='homeLeftSearch'>
          <img src={GroupIcon} />
          <div className='homeCommHeight'>
            New search
          </div>
        </div>
        <div className='homeLeftTitle'>
          All jobs for me
        </div>
        <div className='homeLeftHistory'>
          <div className='homeLeftHistorySub homeCommColor homeCommHeight'>
            History
          </div>
          <div className='homeLeftCommonContent'>
            {
              history.length ? history.map((item: any, index: number) => {
                return <div className='homeCommHeight' key={index} onClick={() => lookDataList(LookType.history, index)}>
                  {item.createdTime}
                </div>
              }) :
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 60 }}
              />
            }
          </div>
        </div>
        <div className='homeLeftLiked'>
          <div className='homeLeftLikeSub homeCommColor homeCommHeight' onClick={() => lookDataList(LookType.liked)}>
            <img src={LikeIcon} />
            Liked
          </div>
        </div>
        <div className='homeLeftProfile'>
          My profile
        </div>
      </div>
      <div className='homeRight'>
        <div className='homeCommHeight homeCommColor'>
          {likedHistory.length} results
        </div>
        {
          likedHistory.length ? 
          <div className='homeRightContent'>
            {
              likedHistory.map((item: any, index: number) => {
                return <JobCard key={index} cardData={item} styleClass="homeRightContentCard" callBack={(type: OperateType, data:any) => likeOperateFunc(type, data, index)}></JobCard>;
              })
            }
          </div>
          :
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
          />
        }
        <Drawer
          title="Detailed JD"
          placement="right"
          onClose={onClose}
          open={open}
          width="50%"
        >
          <div dangerouslySetInnerHTML={{ __html: detailsData.detailRichText }}></div>
        </Drawer>
      </div>
    </div>
  );
};

export default App;
