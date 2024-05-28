import { getStorage } from "./storage";
import { getNowDate } from "./tools";
import sha256 from "crypto-js/sha256";

class Auth {
  getToken = () => {
    return getStorage("token");
  };

  getRefreshToken = () => {
    return getStorage("refresh_token");
  };

  getUid = () => {
    return getStorage("uid");
  };

  getCsrfToken = () => {
    let timestamp = Number(getNowDate("ms"));
    let rid = this.getRid(timestamp);
    let data: { [key: string]: any } = {
      uid: this.getUid(),
      rid: rid,
      token: this.getToken(),
      timestamp: timestamp,
      csrf: null,
    };
    data.csrf = sha256(JSON.stringify(data)).toString();
    let token = "";
    delete data.rid;
    delete data.token;
    Object.keys(data).forEach((key) => {
      token += key + "=" + data[key] + ";";
    });
    return token;
  };

  getRid = (timestamp: number) => {
    let key = import.meta.env.VITE_APP_CSRF_KEY;
    let nonce = this.getNonceStr(timestamp);
    let rid = sha256(key + "-" + nonce).toString();
    return rid;
  };

  getNonceStr(nonce: any) {
    let str = "";
    nonce = nonce.toString();
    for (let i = 0; i < nonce.length; i++) {
      str += "0" + nonce[i];
    }
    return str;
  }
}
export default Auth;
