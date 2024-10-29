import styles from "./Inbox.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useNotion } from "../../hooks/useNotion";
import { Card } from "../../services/get-cards";

export const Inbox = ({cardsData}: {cardsData: Card[]|undefined}) => {
  const { inboxOpen } = useNotion();

  return (
    <motion.div style={{zIndex: 9999, position: "relative"}} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
      <AnimatePresence>
        {inboxOpen && (
          <motion.div 
            initial={{
              opacity: 0,
              x: "50%",
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: "50%",
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.25,
            }}
            className={styles.inbox}
          >
            {cardsData?.map((card, idx) => (
              <div key={idx} className={styles.card}>
                <span>{card.title}</span>
                <div className={styles.cardMetadata}>
                  <div className={styles.author}>
                    <span className={styles.authorBg} style={{backgroundColor: "#fff"}}></span>
                    <p className={styles.authorText}>{card.author}</p>
                  </div>
                  <div className={styles.status}>
                    <span className={styles.statusBg} style={{backgroundColor: card.status.color}}></span>
                    <p className={styles.statusText}>{card.status.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

