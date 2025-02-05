import express, { Request, Response, NextFunction } from "express";
import { getGoogleAuthUrl, authenticateGoogleUser, createCalendarEvent } from "../controllers/googleAuthController";
import { cancelCalendarEvent } from "../controllers/cancelEventController";
import { rescheduleCalendarEvent } from "../controllers/rescheduleEventController";

const router = express.Router();

router.get("/auth/google", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getGoogleAuthUrl(req, res);
  } catch (error) {
    next(error);
  }
});
router.get("/auth/google/callback", (req: Request, res: Response, next: NextFunction) => {
  authenticateGoogleUser(req, res).catch(next);
});
router.post("/calendar/event", (req: Request, res: Response, next: NextFunction) => {
  createCalendarEvent(req, res).catch(next);
});
router.post("/calendar/event/cancel", (req: Request, res: Response, next: NextFunction) => {
  cancelCalendarEvent(req, res).catch(next);
});
router.post("/calendar/event/reschedule", (req: Request, res: Response, next: NextFunction) => {
  rescheduleCalendarEvent(req, res).catch(next);});


export default router;
