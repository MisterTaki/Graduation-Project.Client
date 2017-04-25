import { Message } from 'element-ui';

export default function () {
  Message.closeAll();
  Message.error('请按要求填写信息');
}
