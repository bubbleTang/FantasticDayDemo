'use strict';
import Storage from './Storage'

let storage = {};

storage.getData = () => {
  return Storage.getItem('data')
};

storage.initData = (initData) => {
  return Storage.setItem('data', initData);
};

storage.setData = (storageData) => {
  return Storage.setItem('data', storageData);
};

storage.initCategoryData = (initCategory) => {
  return Storage.setItem('category', initCategory);
};

storage.getCategoryData = () => {
  return Storage.getItem('category');
};

exports.storage = storage;