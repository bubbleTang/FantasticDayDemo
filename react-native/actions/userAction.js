'use strict';

import userStorage from '../proxy/userStorage'
import {Alert} from 'react-native'

const categoryIconList = [
  require('../images/bat.png'),
  require('../images/chameleon.png'),
  require('../images/clown_fish.png'),
  require('../images/elephant.png'),
  require('../images/giraffe.png'),
  require('../images/kangaroo.png'),
  require('../images/lion.png'),
  require('../images/monkey.png'),
  require('../images/moose.png'),
  require('../images/owl.png'),
  require('../images/panda.png'),
  require('../images/pelican.png'),
  require('../images/penguin.png'),
  require('../images/racoon.png'),
  require('../images/shark.png'),
  require('../images/sloth.png'),
  require('../images/squirrel.png'),
  require('../images/swan.png'),
  require('../images/toucan.png'),
  require('../images/whale.png'),
];

const initCategory = [
  {
    id: 1,
    category: '节日',
    icon: categoryIconList[0]
  },
  {
    id: 2,
    category: '亲情',
    icon: categoryIconList[1]
  },
  {
    id: 3,
    category: '娱乐',
    icon: categoryIconList[2]
  },
  {
    id: 4,
    category: '校园生活',
    icon: categoryIconList[3]
  },
];

const initData = {
  scheduleCnt: 1,
  starCnt: 1,
  scheduleList: [
    {
      id: 1,
      title: '元旦',
      timestamp: 1546272000000,
      category: initCategory[0],
      alert: false,
      top: true,
      remark: ''
    }
  ]
};

let initLocalData = () => {
  return dispatch => {
    userStorage.storage.getData()
      .then((resp) => {
        if (resp) {
          dispatch({
            type: 'INIT_LOCAL_DATA',
            scheduleCnt: resp.scheduleCnt,
            starCnt: resp.starCnt,
            scheduleList: resp.scheduleList
          })
        } else {
          userStorage.storage.initData(initData);
          dispatch({
            type: 'INIT_LOCAL_DATA',
            scheduleCnt: initData.scheduleCnt,
            starCnt: initData.starCnt,
            scheduleList: initData.scheduleList
          });

        }
      })
      .catch((error) => {
        console.warn('初始化', error)
      })
  }
};

let initCategoryData = () => {
  return dispatch => {
    userStorage.storage.getCategoryData()
      .then((resp) => {
        if (resp) {
          dispatch({
            type: 'INIT_CATEGORY',
            categoryList: resp
          })
        } else {
          userStorage.storage.initCategoryData(initCategory);
          dispatch({type: 'INIT_CATEGORY', categoryList: initCategory})
        }
      })
      .catch((error) => {
        console.warn('初始化category', error)
      })
  }
};

let add = (param) => {
  return (dispatch, getState) => {
    let {scheduleCnt, starCnt, scheduleList} = getState().user;
    let id = Date.parse(new Date());
    param['id'] = id;

    scheduleList.push(param);
    scheduleCnt++;
    if (param.top) starCnt++;

    let topList = [];
    let normalList = [];

    scheduleList.map((data, index) => {
      if (data.top) {
        topList.push(data)
      } else {
        normalList.push(data)
      }
    });

    topList = topList.sort((a, b) => {
      return a.timestamp - b.timestamp
    });
    normalList = normalList.sort((a, b) => {
      return a.timestamp - b.timestamp
    });

    topList = topList.concat(normalList);

    let storageData = {
      scheduleCnt: scheduleCnt,
      starCnt: starCnt,
      scheduleList: topList
    };
    userStorage.storage.setData(storageData);
    dispatch({
      type: 'ADD',
      scheduleCnt: scheduleCnt,
      starCnt: starCnt,
      scheduleList: topList
    });
  }
};

let update = (id, param) => {
  return (dispatch, getState) => {
    let {scheduleCnt, starCnt, scheduleList} = getState().user;
    scheduleList.map((data, index) => {
      if (data.id === id) {
        if (data.top !== param.top) {
          if (param.top) {
            starCnt++
          } else {
            starCnt--
          }
        }
        scheduleList.splice(index, 1, param);
      }

      let topList = [];
      let normalList = [];

      scheduleList.map((data, index) => {
        if (data.top) {
          topList.push(data)
        } else {
          normalList.push(data)
        }
      });

      topList = topList.sort((a, b) => {
        return a.timestamp - b.timestamp
      });
      normalList = normalList.sort((a, b) => {
        return a.timestamp - b.timestamp
      });

      topList = topList.concat(normalList);

      let storageData = {
        scheduleCnt: scheduleCnt,
        starCnt: starCnt,
        scheduleList: topList
      };
      userStorage.storage.setData(storageData);
      dispatch({
        type: 'ADD',
        scheduleCnt: scheduleCnt,
        starCnt: starCnt,
        scheduleList: topList
      });
    })
  }
};

let deleteData = (id) => {
  return (dispatch, getState) => {
    if (id === 1) {
      alert('不可删除');
      return
    } else {
      let {scheduleCnt, starCnt, scheduleList} = getState().user;
      scheduleCnt--;
      scheduleList.map((data, index) => {
        if (data.id === id) {
          if (data.top === true) starCnt--;
          scheduleList.splice(index, 1);
        }
      });

      let storageData = {
        scheduleCnt: scheduleCnt,
        starCnt: starCnt,
        scheduleList: scheduleList
      };
      userStorage.storage.setData(storageData);

      dispatch({
        type: 'ADD',
        scheduleCnt: scheduleCnt,
        starCnt: starCnt,
        scheduleList: scheduleList
      });
    }
  }
};

let createCategory = (param) => {
  return (dispatch, getState) => {
    let icon_id = parseInt(Math.random() * (20 - 1 + 1) + 1);
    param['icon'] = categoryIconList[icon_id] || categoryIconList[10];
    let {categoryList} = getState().user;
    categoryList.push(param);
    userStorage.storage.setCategoryData(categoryList);
    dispatch({type: 'INIT_CATEGORY', categoryList: categoryList})
  }
};

module.exports = {
  initLocalData,
  initCategoryData,
  add,

  update,
  deleteData,

  createCategory
};
