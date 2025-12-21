"use client";

import React, { useEffect, useRef, useState } from "react";
import WheelPointer from "./WheelPointer";

interface Props {
    items: string[];
    rotation: number; // in degrees
    width?: number;
    height?: number;
    onFinish?: (winner: string) => void;
    spinning: boolean
}

const defaultColors = [
    "#00f0ff",
    "#ff00aa",
    "#8844ff",
    "#00ff88",
    "#ffaa00",
    "#ff4444",
    "#44aaff",
    "#aa44ff",
    "#ff8844",
    "#44ffaa",
    "#ff44aa",
    "#aaff44",
];

export default function SpinWheel({
    items,
    rotation,
    width = 360,
    height = 360,
    onFinish,
    spinning
}: Readonly<Props>) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    // Draw the wheel once
    const drawWheel = (activeIndex: number | null = null) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(centerX, centerY) - 5;

        ctx.clearRect(0, 0, width, height);

        if (!items.length) return;

        const sliceAngle = (2 * Math.PI) / items.length;

        items.forEach((name, i) => {
            const startAngle = i * sliceAngle;
            const endAngle = startAngle + sliceAngle;

            // Gradient for slice
            const gradient = ctx.createRadialGradient(centerX, centerY, radius / 4, centerX, centerY, radius);
            gradient.addColorStop(0, defaultColors[i % defaultColors.length]);
            gradient.addColorStop(1, "#0a0a0f");

            // Draw slice
            ctx.save();
            ctx.shadowBlur = 5;
            ctx.shadowColor = "#6e11b0";
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#6e11b055";
            ctx.stroke();
            ctx.restore();

            // Draw text
            ctx.save();
            ctx.translate(centerX, centerY);
            const textAngle = startAngle + sliceAngle / 2;
            ctx.rotate(textAngle);
            ctx.textAlign = "right";
            ctx.fillStyle = "#fff";
            ctx.font = "bold 14px Inter";
            ctx.shadowColor = "#6e11b0aa";
            ctx.shadowBlur = 4;
            const displayName = name.length > 12 ? name.substring(0, 10) + ".." : name;
            ctx.fillText(displayName, radius - 15, 5);
            ctx.restore();
        });

        // Center circle with glow
        ctx.save();
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#6e11b099";
        ctx.beginPath();
        ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
        ctx.fillStyle = "#0a0a0f";
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#6e11b0aa";
        ctx.stroke();
        ctx.restore();

        // Outer ring glow
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "#6e11b0aa";
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.restore();
    };

    useEffect(() => {
        drawWheel(spinning ? null : activeIndex);
    }, [rotation, items, spinning]);

    // Compute winner **only when spin ends**
    useEffect(() => {
        if (spinning) return; // wait until spin finishes
        if (!items.length || !onFinish) return;

        const normalizedRotation = ((rotation % 360) + 360) % 360;
        const angleAtTop = (270 - normalizedRotation + 360) % 360; // pointer at top
        const anglePerItem = 360 / items.length;
        const winnerIndex = Math.floor(angleAtTop / anglePerItem) % items.length;


        setActiveIndex(winnerIndex);
        onFinish(items[winnerIndex]);
    }, [spinning, rotation, items, onFinish]);

    return (
        <div className="relative">
            <WheelPointer />

            <div
                className={`relative w-[${width}] h-[${height}]`}
                style={{ transform: `rotate(${rotation}deg)`, transition: "transform 4s ease-out" }}
            >
                <canvas ref={canvasRef} width={width} height={height} />
                {/* Pointer */}
            </div>
        </div>
    );
}
