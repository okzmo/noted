import html2canvas from "html2canvas-pro";

export const captureArea = async (selectionCoords: {
  x: number;
  y: number;
  width: number;
  height: number;
}) => {
  const dpr = window.devicePixelRatio || 1;

  // Capture the entire viewport
  const canvas = await html2canvas(document.body, {
    useCORS: true,
    scale: dpr * 2,
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    allowTaint: true,
    foreignObjectRendering: true,
    x: window.scrollX,
    y: window.scrollY,
    backgroundColor: getBackgroundColor(),
  });

  const croppedCanvas = document.createElement("canvas");
  const croppedContext = croppedCanvas.getContext("2d");

  const x = Math.round(selectionCoords.x * dpr * 2) + 16;
  const y = Math.round(selectionCoords.y * dpr * 2) + 16;
  const width = Math.round(selectionCoords.width * dpr * 2);
  const height = Math.round(selectionCoords.height * dpr * 2);

  const imageData = canvas.getContext("2d")?.getImageData(x, y, width, height);

  croppedCanvas.width = width;
  croppedCanvas.height = height;
  croppedContext?.putImageData(imageData!, 0, 0);

  return new Promise<Blob>((resolve) => {
    croppedCanvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          throw new Error("Failed to create blob from canvas");
        }
      },
      "image/png",
      1.0,
    );
  });
};

function getBackgroundColor(): string {
  const bodyColor = getComputedStyle(document.body).backgroundColor;
  const rootColor = getComputedStyle(document.documentElement).backgroundColor;

  const isTransparent = (color: string) => {
    const rgba = color.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/,
    );
    return rgba && (rgba[4] === "0" || rgba[4] === "0.0");
  };

  if (bodyColor && !isTransparent(bodyColor)) {
    return bodyColor;
  }

  if (rootColor && !isTransparent(rootColor)) {
    return rootColor;
  }

  return "#ffffff";
}
