import { Request,Response,NextFunction } from "express";


export const errorHandling = (err:any,_:Request,res:Response,__:NextFunction) => {
    console.error(err);
    res.status(err.status|| 500).json({
        success:false,
        message:err.message || "internal server error"
    })
}