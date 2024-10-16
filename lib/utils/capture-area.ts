import { toPng } from "html-to-image";
import { createWorker } from "./worker";

export const captureArea = async (selectionCoords: {
  x: number;
  y: number;
  width: number;
  height: number;
}): Promise<Blob | Error> => {
  try {
    const dpr = window.devicePixelRatio || 1;

    const filter = (node: HTMLElement) => {
      if (node.hasAttribute) {
        return !node.hasAttribute("data-ignore-screenshot");
      }

      return true;
    };

    const dataUrl = await toPng(document.body, {
      pixelRatio: dpr * 1.5,
      width: window.innerWidth,
      height: window.innerHeight,
      filter: filter,
    });

    const worker = createWorker();

    return new Promise<Blob>((resolve, reject) => {
      worker!.onmessage = (event) => {
        if (event.data.error) {
          reject(new Error(event.data.error));
        } else if (event.data.arrayBuffer) {
          const blob = new Blob([event.data.arrayBuffer], {
            type: "image/png",
          });
          resolve(blob);
        } else {
          reject(new Error("Unexpected message from worker"));
        }
      };

      worker.onerror = (error) => {
        reject(error);
      };

      worker.postMessage({ selectionCoords, dataUrl, dpr });
    });
  } catch (error) {
    return error as Error;
  }
};
