import { deleteCatergory, getCatergory, getSearch, postCatergory, putCatergory } from "../controllers/catergory.controller";
import {Express } from 'express';


export const catergoryRouter=(app:Express)=>{
    app.get("/api/v1/catergory", getCatergory);
    app.post("/api/v1/catergory", postCatergory);
    app.delete("/api/v1/catergory/:id", deleteCatergory);
    app.put("/api/v1/catergory/:id", putCatergory);
    app.get("/api/v1/search", getSearch)
};

