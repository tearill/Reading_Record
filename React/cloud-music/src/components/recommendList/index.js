import React from 'react';
import {
  ListWrapper,
  ListItem,
  List
} from './style';
import { getCount } from '../../api/utils';

function recommendList(props) {
  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {
          props.recommendList.map((item, index) => {
            return (
              <ListItem key={item.id + index}>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  <img src={item.picUrl + "?param=300*300"} width="100%" height="100%" alt="推荐" />
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count"> {getCount(item.playCount)} </span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default React.memo(recommendList);
