import { Router } from "express";
import { AddData, deleteData, getalldata, getDataByLastDays, GetDataWithDate, getOrdersSummary, getStatus, statusWithACase, updateData } from "../controller/userContoller.js";

const router=Router();


//----add  data-----
router.post("/Add",AddData)
//----get all data---
router.get("/get-all",getalldata)
//----find status
router.get("/status/:status",getStatus)

//--amount ke base pr case ka msg find krna

router.get("/amount/:amount",statusWithACase)

//--date ke base pr data find krna
router.get("/date/:start/:end", GetDataWithDate);

// day ke behalf data find krna h

router.get("/days/:days",getDataByLastDays)


// Last 7 days orders summary by status
router.get("/summary/:days", getOrdersSummary);

//---delete data
router.delete("/delete/:id",deleteData)

//-------update data

router.put("/update/:id",updateData)





export default router;