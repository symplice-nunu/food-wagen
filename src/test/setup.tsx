import "@testing-library/jest-dom";
import "whatwg-fetch";
import { vi } from "vitest";
import type { ImgHTMLAttributes } from "react";

vi.mock("next/image", () => {
  return {
    __esModule: true,
    default: ({ src, alt, ...rest }: ImgHTMLAttributes<HTMLImageElement> & { src: string }) => {
      const imgProps = { ...rest } as Record<string, unknown>;
      delete imgProps.fill;
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={typeof src === "string" ? src : ""} alt={alt ?? ""} {...(imgProps as ImgHTMLAttributes<HTMLImageElement>)} />;
    },
  };
});
