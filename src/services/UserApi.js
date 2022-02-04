import api from "./api";

export default class UserApi {
  signUp(body) {
      return api.post("/sign-up", body);
  }

  signIn(body) {
      return api.post("/sign-in", body);
  }
}
