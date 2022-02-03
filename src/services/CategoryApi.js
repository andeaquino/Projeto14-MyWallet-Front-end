import api from "./api";
import AuthenticatedApi from "./AuthenticatedApi";

export default class CategoryApi extends AuthenticatedApi {
  getCategories() {
    return api.get("/category", {
      headers: {
        ...this.getAuthorizationHeader(),
      },
    });
  }
}
