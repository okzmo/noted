import { toPng } from "html-to-image";

export const captureArea = async () => {
  const dpr = window.devicePixelRatio || 1;

  const filter = (node: HTMLElement) => {
    if (node.hasAttribute) {
      return !node.hasAttribute("data-ignore-screenshot");
    }
    return true;
  };

  const dataUrl = await toPng(document.body, {
    quality: 0.9,
    pixelRatio: dpr * 1.5,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: getBackgroundColor(),
    filter: filter,
    style: {
      transform: `translateY(-${window.scrollY}px)`,
      width: `${document.body.scrollWidth}px`,
      height: `${document.body.scrollHeight}px`,
    },
  });

  return {
    dataUrl: dataUrl,
    dpr: dpr,
  };
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
