import { User } from "../models/user.js";
import { Task } from "../models/task.js";

function getUsers(req, resp) {
  resp.json({
    msg: "Welcome to the Users API from the crontroller",
  });
}

export default { getUsers };
