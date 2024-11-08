import { useEffect, useRef, useState } from "react";
import styles from "./Pin.module.css";
import clsx from "clsx";

interface PinProps {
  pathToTarget: string;
  clickX: number;
  clickY: number;
  author: string;
  bgColor: string;
}

function handleResize(target: HTMLElement, clickX: number, clickY: number) {
  const rect = target.getBoundingClientRect();

  return { x: rect.left + clickX + window.scrollX, y: rect.top + clickY + window.scrollY };
}

export const Pin = ({ author, bgColor, pathToTarget, clickX, clickY }: PinProps) => {
  const pinRef = useRef<HTMLDivElement>(null);
  const [ coordinates, setCoordinates ] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const controller = new AbortController();
    const target = document.querySelector(pathToTarget) as HTMLElement;
    if (!target) return;

    const { x, y } = handleResize(target, clickX, clickY);
    setCoordinates({ x, y });

    window.addEventListener("resize", () => {
      const { x, y } = handleResize(target, clickX, clickY);
      setCoordinates({ x, y });
    }, { signal: controller.signal });

    return () => {
      controller.abort();
    }
  }, [pathToTarget, clickX, clickY])

  return (
    <div className={clsx("ntd-pin", styles.pin)} ref={pinRef} style={{ top: `${coordinates.y}px`, left: `${coordinates.x}px`, backgroundColor: bgColor }}>
      {author.slice(0,1)}
    </div>
  )
}

