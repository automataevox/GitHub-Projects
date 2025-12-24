"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { Button, Input, Slider, Select, SelectItem } from "@heroui/react";

type ColorMode =
  | "black-white"
  | "white-black"
  | "black-transparent"
  | "white-transparent";

const COLOR_MODES: Record<ColorMode, { fg: string; bg: string }> = {
  "black-white": {
    fg: "#000000",
    bg: "#ffffff",
  },
  "white-black": {
    fg: "#ffffff",
    bg: "#000000",
  },
  "black-transparent": {
    fg: "#000000",
    bg: "transparent",
  },
  "white-transparent": {
    fg: "#ffffff",
    bg: "transparent",
  },
};

export default function Home() {
  const [value, setValue] = useState("");
  const [size, setSize] = useState(256);
  const [mode, setMode] = useState<ColorMode>("black-white");

  const { fg, bg } = COLOR_MODES[mode];

  const downloadSVG = () => {
    const svg = document.getElementById("orixa-qr");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);

    const blob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orixa-qr.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    const svg = document.getElementById("orixa-qr");
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (bg !== "transparent") {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, size, size);
    }

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const png = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = png;
      a.download = "orixa-qr.png";
      a.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10 w-full">

      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">QR Code Generator</h1>
        <p className="text-default-500">
          Export high-quality QR codes as SVG or PNG.
        </p>
      </div>

      <div className="w-full max-w-md flex flex-col gap-6 rounded-xl border border-default-200 bg-content1 p-6 shadow-md">

        <Input
          label="Text or URL"
          placeholder="https://orixa.dev"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="bordered"
        />

        <div className="flex flex-col gap-2">
          <span className="text-sm text-default-500">
            Size: {size}px
          </span>
          <Slider
            minValue={128}
            maxValue={512}
            step={32}
            value={size}
            onChange={(v) => setSize(Number(v))}
          />
        </div>

        <Select
          label="Color Mode"
          selectedKeys={[mode]}
          onSelectionChange={(keys) =>
            setMode(Array.from(keys)[0] as ColorMode)
          }
        >
          <SelectItem key="black-white">Black on White</SelectItem>
          <SelectItem key="white-black">White on Black</SelectItem>
          <SelectItem key="black-transparent">Black on Transparent</SelectItem>
          <SelectItem key="white-transparent">White on Transparent</SelectItem>
        </Select>
        {value && (

          <div
            className="flex justify-center rounded-lg p-4"
            style={{
              background:
                bg === "transparent"
                  ? ""
                  : bg,
            }}

          >
            <QRCode
              id="orixa-qr"
              value={value}
              size={size}
              fgColor={fg}
              bgColor={bg}
            />
          </div>
        )}

        <div className="flex gap-3">
          <Button
            color="primary"
            isDisabled={!value}
            onPress={downloadPNG}
            className="flex-1"
          >
            Download PNG
          </Button>
          <Button
            variant="bordered"
            isDisabled={!value}
            onPress={downloadSVG}
            className="flex-1"
          >
            Download SVG
          </Button>
        </div>
      </div>
    </section >
  );
}
