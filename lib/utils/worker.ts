let worker: Worker | null = null;

export const createWorker = () => {
  if (!worker) {
    const workerCode = `
      self.onmessage = async (event) => {
        const { selectionCoords, dataUrl, dpr } = event.data;

        try {
          const response = await fetch(dataUrl);
          const blob = await response.blob();
          const imageBitmap = await createImageBitmap(blob);

          const canvas = new OffscreenCanvas(
            Math.round(selectionCoords.width * dpr * 1.5),
            Math.round(selectionCoords.height * dpr * 1.5)
          );
          const ctx = canvas.getContext("2d");
          const x = Math.round(selectionCoords.x * dpr * 1.5);
          const y = Math.round(selectionCoords.y * dpr * 1.5);
          const width = Math.round(selectionCoords.width * dpr * 1.5);
          const height = Math.round(selectionCoords.height * dpr * 1.5);

          ctx.drawImage(imageBitmap, x, y, width, height, 0, 0, width, height);

          const resultBlob = await canvas.convertToBlob({ type: "image/png", quality: 0.9 });

          const arrayBuffer = await resultBlob.arrayBuffer();
          self.postMessage({ arrayBuffer: arrayBuffer }, [arrayBuffer]);
        } catch (error) {
          self.postMessage({ error: error.message });
        }
      };

      self.onerror = (error) => {
        console.error("Worker global error:", error);
      };
    `;

    const blob = new Blob([workerCode], { type: "text/javascript" });
    const workerUrl = URL.createObjectURL(blob);
    worker = new Worker(workerUrl);
  }

  return worker;
};
