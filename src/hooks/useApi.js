import CategoryApi from "../services/CategoryApi";
import EntryApi from "../services/EntryApi";
import UserApi from "../services/UserApi";

export default function useApi() {
  return {
    category: new CategoryApi(),
    entry: new EntryApi(),
    user: new UserApi(),
  };
}
