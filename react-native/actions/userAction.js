'use strict';

import userStorage from '../proxy/userStorage'

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
    id: 1,
    category: '亲情',
    icon: categoryIconList[1]
  },
  {
    id: 1,
    category: '娱乐',
    icon: categoryIconList[2]
  },
  {
    id: 1,
    category: '校园生活',
    icon: categoryIconList[3]
  },
];

const initData = {
  scheduleCnt: 1,
  starCnt: 1,
  scheduleList: [
    {
      title: '元旦',
      timestamp: 1546272000000,
      category: initCategory[0],
      alert: false,
      top: false,
      star: true,
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
          // userStorage.storage.initCategoryData(initCategory);
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

module.exports = {
  initLocalData,
  initCategoryData
};
