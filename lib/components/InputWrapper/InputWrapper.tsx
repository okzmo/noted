import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useSelection } from "../../hooks/useSelection";
import styles from "./InputWrapper.module.css";

export const InputWrapper = ({ children }: { children: ReactNode }) => {
  const { selectionInfos } = useSelection();
  return (
    <motion.div
      initial={{ width: "250px" }}
      animate={{
        width: selectionInfos.hasTitle
          ? "450px"
          : selectionInfos.selectionEnded
            ? "350px"
            : "250px",
        height: selectionInfos.hasTitle ? "300px" : "48px",
      }}
      transition={{
        type: "spring",
        damping: 18,
        stiffness: 150,
        delay: selectionInfos.hasTitle ? 0.1 : 0,
      }}
      className={styles.inputWrapper}
    >
      {children}
    </motion.div>
  );
};
