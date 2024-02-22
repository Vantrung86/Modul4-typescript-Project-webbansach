import { getUser, putUser } from "../controllers/userManager.controller";
import {Express } from 'express';

export const userManagerRouter = (app:Express) => {
    app.get("/api/v1/users",getUser);
    app.put("/api/v1/users/:id",putUser)
};

