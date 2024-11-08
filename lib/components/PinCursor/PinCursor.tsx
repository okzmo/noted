import { useCallback, useEffect, useRef } from "react";
import styles from "./PinCursor.module.css";
import { usePin } from "../../hooks/usePin";

function getElementPath(element: HTMLElement) {
  const path = [];
  while (element.parentElement) {
    let selector = element.tagName.toLowerCase();
    const siblings = Array.from(element.parentElement.children);
    if (siblings.length > 1) {
      const index = siblings.indexOf(element) + 1;
      selector += `:nth-child(${index})`;
    }
    path.unshift(selector);
    element = element.parentElement;
  }
  return path.join(" > ");
}

export const PinCursor = () => {
  const pinCursorRef = useRef<HTMLDivElement>(null);
  const { pinning, setPinInfos } = usePin();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!pinCursorRef.current) return; 

    pinCursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

		const target = e.target as HTMLElement;

		if (target.classList.contains('ntd-input-wrapper') || 
      target.classList.contains('ntd-wrapper-content') || 
      target.classList.contains('ntd-inbox-btn') ||
      target.classList.contains('ntd-pin')
    ) {
			pinCursorRef.current.style.opacity = '0';
		} else if (pinning) {
			pinCursorRef.current.style.opacity = '1';
		}
  }, [pinning])

  const handleClick = useCallback((e: MouseEvent) => {
    if (!pinCursorRef.current || !pinning) return;

    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    if (elements[0] && ( 
        elements[0].classList.contains("ntd-input-wrapper") || 
        elements[0].classList.contains("ntd-inbox-btn") ||
        elements[0].classList.contains("ntd-wrapper-content")
    )) return;

    const target = elements[1];
    const rect = target!.getBoundingClientRect();
    const path = getElementPath(target as HTMLElement);

    setPinInfos({
      pathToTarget: path,
      clickX: e.clientX - rect.left,
      clickY: e.clientY - rect.top,
      pinned: true,
      hasTitle: false,
    });
  }, [pinning, setPinInfos])


  useEffect(() => {
    if (!pinCursorRef.current) return;
    const controller = new AbortController();

    window.addEventListener("mousemove", handleMouseMove, { signal: controller.signal });
    document.addEventListener("click", handleClick, { signal: controller.signal });

    if (pinning) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      controller.abort();
    }
  }, [handleMouseMove, handleClick, pinning])

  return (
    <>
      <div className={styles.overlay} style={{ pointerEvents: pinning ? "auto" : "none" }}></div>
      <div className={styles.pinCursor} style={{ opacity: pinning ? 1 : 0 }} ref={pinCursorRef}></div>
    </>
  )
}

