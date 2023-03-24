import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import Pocketbase from "pocketbase";

const pocketbase = new Pocketbase("http://127.0.0.1:8090")

export const picShareRouter = createTRPCRouter({

});
