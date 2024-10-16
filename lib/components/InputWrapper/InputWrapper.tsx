import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useSelection } from "../../hooks/useSelection";
import styles from "./InputWrapper.module.css";
import clsx from "clsx";

export const InputWrapper = ({ children }: { children: ReactNode }) => {
  const { selectionInfos } = useSelection();
  return (
    <motion.div
      initial={{
        width: "250px",
        y: 5,
        opacity: 0,
        x: "-50%",
      }}
      animate={{
        y: 0,
        x: "-50%",
        opacity: 1,
        width: selectionInfos.hasTitle
          ? "450px"
          : selectionInfos.selectionEnded
            ? "350px"
            : "250px",
        height: selectionInfos.hasTitle ? "300px" : "48px",
        transition: {
          type: "spring",
          damping: 18,
          stiffness: 150,
          delay: selectionInfos.hasTitle ? 0.1 : 0,
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
      className={clsx(styles.inputWrapper)}
      data-ignore-screenshot
    >
      {children}
    </motion.div>
  );
};
