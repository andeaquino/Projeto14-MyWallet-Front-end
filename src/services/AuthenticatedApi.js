import { useContext } from "react";

import UserContext from "../contexts/UserContext";

export default class AuthenticatedApi {
  constructor() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
		const context = useContext(UserContext);
    const userInfo = context?.userInfo;
    this.token = userInfo?.token;
  }

	getAuthorizationHeader() {
    return {
      Authorization: `Bearer ${this.token}`,
    };
  }
}
