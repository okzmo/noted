export const selectTextVariants = {
  initial: {
    opacity: 0,
    y: 5,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeOut",
      duration: 0.1,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: 5,
    transition: {
      ease: "easeOut",
      duration: 0.1,
    },
  },
};

export const notionInputsVariants = {
  initial: {
    opacity: 0,
    y: 10,
    x: "-50%",
  },
  animate: {
    opacity: 1,
    y: 0,
    x: "-50%",
    transition: {
      ease: "easeOut",
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
    x: "-50%",
    transition: {
      ease: "easeOut",
      delay: 0,
    },
  },
};

export const textAreaVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.1,
      delay: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ease: "easeOut",
      duration: 0.1,
      delay: 0,
    },
  },
};
