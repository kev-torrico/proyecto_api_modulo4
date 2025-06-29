import { User } from "../models/user.js";
import { Task } from "../models/task.js";
import { Status } from "../constants/index.js";
import { OrderDir } from "../constants/index.js";
import { OrderBy } from "../constants/index.js";
import { encriptar } from "../common/bcrypt.js";
import { Op } from "sequelize";

async function getUsers(req, res, next) {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "password", "status"],
      order: [["id", "DESC"]],
      where: {
        status: Status.ACTIVE,
      },
    });
    return res.json(users);
  } catch (error) {
    next(error);
  }
}

async function createUser(req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await User.create({
      username,
      password,
    });
    return res.json(user);
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      attributes: ["username", "status"],
      where: {
        id,
      },
    });
    if (!user) res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    if (!username && password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const passwordEncrypted = await encriptar(password);
    const user = await User.update(
      {
        username,
        password: passwordEncrypted,
      },
      {
        where: {
          id,
        },
      }
    );
    return res.json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  const { id } = req.params;
  try {
    await User.destroy({
      where: {
        id,
      },
    });
    return res.status(204).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
}

async function activateInactivate(req, res, next) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    if (!status) res.status(400).json({ message: "Status is required" });
    const user = await User.findByPk(id);
    if (!user) res.status(404).json({ message: "User not found" });

    if (user.status === status) {
      res.status(409).json({
        message: "Same status",
      });
    }
    user.status = status;
    await user.save();
    return res.json(user);
  } catch (error) {
    next(error);
  }
}

async function getTasks(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      attributes: ["username"],
      include: [
        {
          model: Task,
          attributes: ["name", "done"],
        },
      ],
      where: {
        id,
      },
    });
    return res.json(user);
  } catch (error) {
    next(error);
  }
}

async function getPagination(req, res, next) {
  let {
    page = 1,
    limit = 10,
    search = "",
    orderBy = "id",
    orderDir = "DESC",
  } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || isNaN(limit)) {
    return res.status(400).json({ message: "Page and limit must be numbers" });
  }

  if (![5, 10, 15, 20].includes(limit)) {
    return res.status(400).json({ message: "Limit must be 5, 10, 15 or 20" });
  }
  if (![OrderDir.ASC, OrderDir.DESC].includes(orderDir)) {
    return res.status(400).json({
      message: `Order direction must be ${OrderDir.ASC} or ${OrderDir.DESC}`,
    });
  }

  if (![OrderBy.ID, OrderBy.USERNAME, OrderBy.STATUS].includes(orderBy)) {
    return res.status(400).json({
      message: `Order by must be ${OrderBy.ID}, ${OrderBy.USERNAME} or ${OrderBy.STATUS}`,
    });
  }

  const offset = (page - 1) * limit;
  try {
    const where = search
      ? {
          username: {
            [Op.iLike]: `%${search}%`,
          },
        }
      : {};

    const { count, rows } = await User.findAndCountAll({
      where,
      limit,
      offset,
      order: [[orderBy, orderDir]],
    });

    const totalPages = Math.ceil(count / limit);
    return res.status(200).json({
      total: count,
      page,
      pages: totalPages,
      data: rows,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  activateInactivate,
  getTasks,
  getPagination,
};
