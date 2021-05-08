import firebase from "firebase";
import { call, put, takeLatest } from "@redux-saga/core/effects";

import actions from "../../actions";
import { orderListItemPostRequestActionType } from "../../actions/orderList";
import api from "../../apis";
import { Order, OrderList } from "../../interface";
import { isDefined } from "../../util/typeGuard";

function* watchOrderList() {
  yield takeLatest("orderList/get/request", getOrderList);
  yield takeLatest("orderList/item/post/request", postOrder);
}

function* getOrderList() {
  try {
    const response: firebase.firestore.DocumentSnapshot<Order>[] = yield call(
      api.orderList.get
    );

    const orders: Order[] = response
      .map((order) => order.data())
      .filter(isDefined);

    const orderList: OrderList = { orderList: orders };

    yield put(actions.orderList.get.success(orderList));
  } catch (error) {
    yield put(
      actions.orderList.get.failure({ requestErrorMessage: error.message })
    );
  }
}

function* postOrder(action: orderListItemPostRequestActionType) {
  try {
    yield call(api.order.post, action.payload);

    yield put(actions.orderList.item.post.success());
  } catch (error) {
    yield put(
      actions.orderList.item.post.failure({
        requestErrorMessage: error.message,
      })
    );
  }
}

export default watchOrderList;
