import { motion } from "framer-motion";
import React, { type ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
      duration: 0.2,
    }}
  >
    {children}
  </motion.div>
);
export default Layout;
