import api from "./api";
import AuthenticatedApi from "./AuthenticatedApi";

export default class EntryApi extends AuthenticatedApi {
  getEntries() {
    return api.get("/entry", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  addEntry(body) {
    return api.post("/entry", body, {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }

  getMonthlyTotal() {
    return api.get("/entry/monthly", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
