import { client } from '../utils';

export default {
  login (data, cb, errorCb) {
    client.post('', { data }, (res) => {
      cb(res);
    }, (error) => {
      errorCb(error);
    });
  }
};
