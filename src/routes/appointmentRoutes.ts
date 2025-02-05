import express, { Request, Response, NextFunction } from "express";
import { getSuggestedAppointment } from "../controllers/appointmentController";

const router = express.Router();

router.post("/suggest", (req: Request, res: Response, next: NextFunction) => {
  getSuggestedAppointment(req, res).catch(next);
});

export default router;
