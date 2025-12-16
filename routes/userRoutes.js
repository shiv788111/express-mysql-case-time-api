import { Router } from "express";
import { AddData, getDataByLastDays, GetDataWithDate, getOrdersSummary, getStatus, statusWithACase } from "../controller/userContoller.js";

const router=Router();

router.post("/Add",AddData)
router.get("/status/:status",getStatus)

router.get("/amount/:amount",statusWithACase)
router.get("/date/:start/:end", GetDataWithDate);

// day ke behalf data find krna h

router.get("/days/:days",getDataByLastDays)


// Last 7 days orders summary by status
router.get("/summary/:days", getOrdersSummary);





export default router;