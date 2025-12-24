"use client";

import { useState, useEffect } from "react";
import ModeSwitch from "./components/ModeSwitch";
import SpinWheel from "./components/SpinWheel";
import SpinButton from "./components/SpinButton";
import Winner from "./components/Winner";
import { DUMMY_DATA } from "./lib/dummyData";

type Mode = "followers" | "subscribers";

export default function SpinwheelPage() {
  const [mode, setMode] = useState<Mode>("followers");
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  // Controlled input state
  const [inputText, setInputText] = useState<string>(DUMMY_DATA[mode].join(", "));

  // Parse textarea into items array
  const items = inputText
    .split(/\n|,/)           // split by new line or comma
    .map(name => name.trim()) // trim spaces
    .filter(Boolean);    // remove empty strings

  // Update textarea when mode changes
  useEffect(() => {
    setInputText(DUMMY_DATA[mode].join(", "));
  }, [mode]);

  const spin = () => {
    if (spinning || items.length === 0) return;

    setSpinning(true);
    setWinner(null);

    const fullSpins = 5 * 360;
    const anglePerItem = 360 / items.length;

    const randomIndex = Math.floor(Math.random() * items.length);
    const randomOffsetInSlice = Math.random() * anglePerItem;

    const finalAngle = fullSpins + randomIndex * anglePerItem + randomOffsetInSlice;

    setRotation(prev => prev + finalAngle);

    setTimeout(() => {
      setWinner(items[randomIndex]);
      setSpinning(false);
    }, 4000);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10 w-full">
      <div className="text-center mb-2">
        <h1 className="text-3xl font-bold">Spinwheel</h1>
      </div>
      <div className="flex flex-row gap-24">
        <div className="flex flex-col items-center gap-8">
          {/* Mode Switch */}
          <ModeSwitch mode={mode} setMode={setMode} setWinner={setWinner} spinning={spinning} />

          {/* Wheel */}
          <SpinWheel items={items} rotation={rotation} spinning={spinning} onFinish={(winner) => setWinner(winner)} />

          {/* Spin Button */}
          <SpinButton spin={spin} spinning={spinning} />

          {/* Winner */}
          {winner && <Winner winner={winner} />}

          {/* Twitch Placeholder */}
          <div className="mt-6 text-white/40 text-sm">
            Twitch login coming next 👀
          </div>
        </div>

        {/* Editable Dummy Data */}
        <div className="w-[300px]">
          <label className="text-white font-bold mb-2 block">Edit Names:</label>
          <textarea
            className="w-full h-[600px] p-2 rounded-md bg-transparent border-1 border-purple-900/50 text-white text-sm"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter names separated by commas or new lines"
          />
        </div>
      </div>
    </section>
  );
}
