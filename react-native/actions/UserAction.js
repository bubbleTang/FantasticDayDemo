'use strict';

const loadingModalVisible = (visible: boolean) => {
  return dispatch => {
    dispatch({type: 'LOADING_MODAL_VIEW_VISIBLE', visible})
  }
};

module.exports = {
  loadingModalVisible,

};