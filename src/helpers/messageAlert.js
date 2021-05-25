import { message } from 'antd';
import 'antd/lib/message/style/index.css';

message.config({
  top: 20,
  duration: .5,
  maxCount: 1,
});

export function renderSuccessAlertMessage(messageAlert) {
  return message.success(messageAlert);;
}

export function renderErrorAlertMessage(messageAlert) {
  return message.error(messageAlert);;
}
