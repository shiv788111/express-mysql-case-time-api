import db from "../config/db.js";

export async function AddData(req, res) {
  const { user_name, amount, status, created_at } = req.body;

  const sql =
    "INSERT INTO orders (user_name, amount, status, created_at) VALUES (?, ?, ?, ?)";

  db.query(sql, [user_name, amount, status, created_at], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    }

    return res.status(201).json({
      message: "Data Added Successfully",
      result,
    });
  });
}

// get all-data

export async function getalldata(req, res) {
  db.query("select * from orders", (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "something went wrong",
        err,
      });
    }
    return res.status(200).json({
      message: "data fetch succcessfully!",
      result,
    });
  });
}

//-----Delete data

export async function deleteData(req, res) {
  const { id } = req.params;
  const sql = "delete from orders where id=?";
  db.query(sql, [id], (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "something went wrong",
        err,
      });
    }

    if (data.affectedRows == 0) {
      return res.status(404).json({
        message: "user not found !",
      });
    }
    return res.status(200).json({
      message: "delete successfully",
      data,
    });
  });
}


//-------------update data---------------


export async function updateData(req,res) {
    const{id}=req.params;
const { user_name, amount, status } = req.body;
    
const sql="update orders set user_name=?, amount=?,status =? where id=?"
db.query(sql,[user_name,amount,status,id],(err,data)=>{
    if(err){
        return res.status(500).json({
            message:"something went wrong",
            err
        })
       
    }
     if(data.affectedRows>0){
            return res.status(200).json({
                message:"updated successfully",
                data
            })
        }
}) 
}





// get data bahalf of status status

export async function getStatus(req, res) {
  const { status } = req.params;
  const sql = "select * from orders where status=?";

  db.query(sql, [status], (err, data) => {
    if (err) {
      return res.status(400).json({
        message: "fetch error",
        err,
      });
    }
    return res.status(200).json({
      message: "data fetch successfully !",
      data,
    });
  });
}

// price ke behalf pr status find krna use "case "

export async function statusWithACase(req, res) {
  const { amount } = req.params;

  const sql = `
      SELECT
        user_name,
        amount,
        status,
       
        CASE
          WHEN amount >= 200000 THEN 'Your order is shipped'
          WHEN amount >= 150000 THEN 'Your order is pending'
          ELSE 'Your order is cancelled'
        END AS status_details
      FROM orders
      WHERE amount >= ?
    `;

  db.query(sql, [amount], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    }

    return res.status(200).json({
      message: "Data fetched successfully!",
      filter_amount: amount,
      total: result.length,
      result,
    });
  });
}

// date ke bahalf pr data find krna

export async function GetDataWithDate(req, res) {
  const { start, end } = req.params;
  const sql = `
      SELECT *
      FROM orders
      WHERE created_at BETWEEN ? AND ?
    `;

  db.query(sql, [start, end], (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong!",
        error: err,
      });
    }

    return res.status(200).json({
      message: "Data fetched successfully",
      start_date: start,
      end_date: end,
      total: data.length,
      data,
    });
  });
}

//get data by day 

export async function getDataByLastDays(req, res) {
  const days = req.params.days;
  const sql = "select * from orders where created_at>=now() -interval ? day";
  db.query(sql, [days], (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "something went wrong",
        error: err,
      });
    }
    return res.status(200).json({
      message: "data fetch successfully!",

      data,
    });
  });
}



//get summary

export async function getOrdersSummary(req, res) {
  const days = req.params.days;
  const sql = `
      SELECT group_concat(user_name) as users,status, COUNT(*) total, SUM(amount) revenue
      FROM orders
      WHERE created_at >= NOW() - INTERVAL ? DAY
      GROUP BY status
    `;

  db.query(sql, [days], (err, data) => {
    if (err) {
      return res.status(500).json({
        message: "Something went wrong",
        error: err,
      });
    }

    res.status(200).json({
      message: `Last ${days} days orders summary fetched successfully`,
      total_status: data.length,
      data,
    });
  });
}
