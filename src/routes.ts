import { Services } from "./controllers/controller";
import express, { response } from "express";
import { responseHandler } from "./utils/middleware";

const routes = express.Router();

routes.post(`/signIn`, async (req, res, next) => {
  try {
    const result = await Services.userAuth.toLogin(req.body);
    if (result.ok) {
      res.status(200).json(result);
    } else {
      res.status(401).json({ message: "Login failed" });
    }
  } catch (err) {
    next(err);
  }
});
routes.delete(`/signOut`, async (req, res, next) => {
  try {
    const result = await Services.userAuth.toLogout(req.body);
    if (result.ok) {
      res.status(200).json({ message: "Logged out successfully" });
    } else {
      res.status(400).json({ message: "Logout failed" });
    }
  } catch (err) {
    next(err);
  }
});
routes.post(`/createUser`, async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).json({ error: "User data is required" });
    }
    const result = await Services.User.Create(req.body);
    responseHandler(res, result);
  } catch (err) {
    next();
  }
});
routes.put(`/updateUser`, async (req, res, next) => {
  try {
    const { id, data } = req.body;
    if (!id || !data) {
      res.status(400).json({ error: "User ID and update data are required" });
    }
    const result = await Services.User.Update(data, id);
    responseHandler(res, result);
  } catch (err) {
    next(err);
  }
});
routes.delete(`/deleteUser`, async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "User ID is required" });
    }
    const result = await Services.User.Delete(id);
    responseHandler(res, result);
  } catch (err) {
    next(err);
  }
});
routes.get(`/user/:id?`, async (req, res, next) => {
  try {
    const filter = req.query;
    const id = req.params.id;
    let result;
    if (filter && Object.keys(filter).length > 0) {
      result = await Services.User.Get(filter);
    }
    if (id) {
      result = await Services.User.Get({}, id);
    }
    responseHandler(res, result);
  } catch (err) {
    next(err);
  }
});
routes.get(`/users`, async (req, res, next) => {
  try {
    const filter = req.query;
    if (filter && Object.keys(filter).length > 0) {
      const result = await Services.User.GetAll(filter);
      responseHandler(res, result);
    } else {
      throw new Error("the parameters of users filter wasn't defined");
    }
  } catch (err) {
    next(err);
  }
});
routes.post(`/clientUser`, Services.Agenda.Client.Create);
routes.put(`/clientUser`, Services.Agenda.Client.Update);
routes.delete(`/clientUser`, Services.Agenda.Client.Delete);
routes.get(`/client`, Services.Agenda.Client.Get);

export { routes };
