import { Request, Response } from "express";

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => res.json({ version: '1.0.0' })
