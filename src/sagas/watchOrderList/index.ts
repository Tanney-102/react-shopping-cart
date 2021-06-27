import { call, put, takeLatest } from "@redux-saga/core/effects";

import actions from "../../actions";
import { OrderListItemPostRequestActionType, orderListActionType } from "../../actions/orderList";
import api from "../../apis";

function* watchOrderList() {
  yield takeLatest(orderListActionType.get.request, getOrderList);
  yield takeLatest(orderListActionType.item.post.request, postOrder);
}

function* getOrderList() {
  const { isSucceeded, message, result } = yield call(api.orderList.get);
  
  if (isSucceeded) {
    yield put(actions.orderList.get.success(result));

    return;
  }  

  yield put(actions.alert.request(message));
}

function* postOrder(action: OrderListItemPostRequestActionType) {
  const { message } = yield call(api.orderList.post, action.payload);

  yield put(actions.orderList.get.request());
  yield put(actions.alert.request(message));
}

export default watchOrderList;
