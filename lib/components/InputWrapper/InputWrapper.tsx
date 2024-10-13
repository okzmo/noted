import { ReactNode } from "react";
import { motion } from "framer-motion";
import styles from "./InputWrapper.module.css";
import { useNotion } from "../../hooks/useNotion";

export const InputWrapper = ({ children }: { children: ReactNode }) => {
  const { bugTitle } = useNotion();
  return (
    <motion.div
      initial={{
        width: "350px",
        y: 5,
        opacity: 0,
        x: "-50%",
      }}
      animate={{
        y: 0,
        x: "-50%",
        opacity: 1,
        width: bugTitle ? "450px" : "350px",
        height: bugTitle ? "300px" : "48px",
        transition: {
          type: "spring",
          damping: 18,
          stiffness: 150,
          delay: bugTitle ? 0.1 : 0,
        },
      }}
      exit={{
        y: 5,
        x: "-50%",
        opacity: 0,
        transition: {
          type: "spring",
          damping: 18,
          stiffness: 150,
          delay: 0.1,
        },
      }}
      className={styles.inputWrapper}
    >
      {children}
    </motion.div>
  );
};
