import { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePin } from "../../hooks/usePin";
import { useNotion } from "../../hooks/useNotion";
import styles from "./InputWrapper.module.css";
import clsx from "clsx";

export const InputWrapper = ({ children }: { children: ReactNode }) => {
  const { pinInfos } = usePin();
  const { setInboxOpen, inboxOpen } = useNotion();
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
          width: pinInfos.hasTitle
            ? "450px"
            : pinInfos.pinEnded
              ? "350px"
              : "250px",
          height: pinInfos.hasTitle ? "300px" : "48px",
          transition: {
            type: "spring",
            damping: 18,
            stiffness: 150,
            delay: pinInfos.hasTitle ? 0.1 : 0,
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
        className={clsx("ntd-input-wrapper", styles.input)}
      >
        {children}

        <button className={clsx("ntd-inbox-btn", styles.inboxButton)} onClick={() => setInboxOpen(!inboxOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className={styles.inboxIcon}>
            <path fill="currentColor" d="M1 12c0-5.185 0-7.778 1.61-9.39C4.223 1 6.816 1 12 1s7.778 0 9.39 1.61C23 4.223 23 6.816 23 12s0 7.778-1.61 9.39C19.777 23 17.184 23 12 23s-7.778 0-9.39-1.61C1 19.777 1 17.184 1 12" opacity=".5"/>
            <path fill="currentColor" d="M2.61 21.389c1.612 1.61 4.205 1.61 9.39 1.61s7.778 0 9.39-1.61c1.492-1.493 1.601-3.829 1.61-8.29h-3.476c-.996 0-1.494 0-1.931.202c-.438.201-.762.58-1.41 1.335l-.666.777c-.648.756-.972 1.134-1.41 1.335s-.935.202-1.93.202h-.353c-.996 0-1.494 0-1.931-.202c-.438-.2-.762-.579-1.41-1.335l-.666-.777c-.648-.756-.972-1.134-1.41-1.335s-.935-.201-1.93-.201H1c.008 4.46.118 6.796 1.61 8.289"/>
          </svg>
        </button>
      </motion.div>
  );
};
