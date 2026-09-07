import { fromNodeHeaders } from "better-auth/node";
import type { RequestHandler } from "express";
import { auth } from "@/auth/auth";
import {
  getCachedAuthUser,
  setCachedAuthUser,
} from "@/common/cache/auth-session-cache";
import { env } from "@/config/env";

export const requireAuth: RequestHandler = async (req, res, next) => {
  try {
    if (
      env.AUTH_DEV_BYPASS &&
      (env.NODE_ENV === "development" || env.NODE_ENV === "test")
    ) {
      const id = req.header("x-user-id");
      if (!id) {
        res.status(401).json({ message: "Missing X-User-Id header" });
        return;
      }
      req.user = {
        email: req.header("x-user-email") ?? "dev@local.test",
        fullName: req.header("x-user-name") ?? "Dev User",
        id,
      };
      next();
      return;
    }
    const cached = await getCachedAuthUser(req);
    if (cached) {
      req.user = cached;
      next();
      return;
    }
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    if (!session?.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const user = {
      email: session.user.email,
      fullName: session.user.name,
      id: session.user.id,
    };
    req.user = user;
    await setCachedAuthUser(req, user);
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};
