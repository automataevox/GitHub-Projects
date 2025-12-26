"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

type Knowledge = {
    topic: string
    value: string | number
    category: string
    default: {
        value: string;
    };
}

interface Agent {
    id: string;
    x: number;
    y: number;
    entropy: any
    knowledge: number;
    level: number;
    speed: number;          // learning speed multiplier
    tickCounter: number;    // counts global ticks
    tickInterval: number;   // how many global ticks per interaction
    history: { tick: number; knowledge: number }[];
}

export default function DataEntanglementPage() {
    const svgRef = useRef<SVGSVGElement | null>(null)
    const gRef = useRef<SVGGElement | null>(null)

    const agentsRef = useRef<Agent[]>([])

    const width = 1000
    const height = 600
    const maxAgentSize = 30
    const [history, setHistory] = useState<string[]>([])
    const [topAgents, setTopAgents] = useState<Agent[]>([])
    const [achievements, setAchievements] = useState<string[]>([])
    const [globalTick, setGlobalTick] = useState(0)

    // Fix infinite render issue by moving setGlobalTick to useEffect
    useEffect(() => {
        const interval = setInterval(() => {
            setGlobalTick(prev => prev + 1);
        }, 1000); // Adjust interval as needed

        return () => clearInterval(interval);
    }, [])

    // For each agent, store knowledge history
    agentsRef.current.forEach(agent => {
        if (!agent.history) agent.history = []
        agent.history.push({ tick: globalTick, knowledge: agent.knowledge })
        if (agent.history.length > 50) agent.history.shift() // keep last 50 points
    })


    useEffect(() => {
        if (!svgRef.current) return
        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background", "#05050599")
            .style("position", "relative")

        const g = svg.append("g")
        gRef.current = g.node()

        svg.append("defs").append("marker")
            .attr("id", "arrow")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 10)
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "#00ffff")
        // legend
        const legend = svg.append("g").attr("transform", "translate(20,30)")
        legend.append("text").text("AI Agent Entanglement").attr("fill", "#fff").attr("font-size", 16).attr("font-weight", "bold")
        legend.append("text").attr("y", 24).text("• Node = autonomous agent").attr("fill", "#aaa").attr("font-size", 12)
        legend.append("text").attr("y", 40).text("• Arrow = shared knowledge").attr("fill", "#aaa").attr("font-size", 12)
        legend.append("text").attr("y", 56).text("• Opacity = historical depth").attr("fill", "#aaa").attr("font-size", 12)
        legend.append("text").attr("y", 72).text("• Bigger node = more knowledge").attr("fill", "#aaa").attr("font-size", 12)

        // Initialize history, tickCounter, and tickInterval in agentsRef
        agentsRef.current = Array.from({ length: 6 }).map((_, i) => ({
            id: `Agent-${i + 1}`,
            x: Math.random() * (width - 200) + 100,
            y: Math.random() * (height - 200) + 100,
            entropy: Math.random(),
            knowledge: Math.floor(Math.random() * 5),
            level: 1,
            speed: 1,
            tickCounter: 0,
            tickInterval: Math.max(1, 100 / 1), // Default interval based on speed
            history: [] // Initialize empty history
        }))

        drawAgents()
        updateTopAgents()
    }, [])

    function drawAgents() {
        if (!gRef.current) return
        const g = d3.select(gRef.current)
        g.selectAll("circle")
            .data(agentsRef.current, (d: any) => d.id)
            .enter()
            .append("circle")
            .attr("cx", (d: { x: any }) => d.x)
            .attr("cy", (d: { y: any }) => d.y)
            .attr("r", (d: { knowledge: number }) => Math.min(10 + d.knowledge, maxAgentSize))
            .attr("fill", (d: { entropy: any }) => d3.interpolateCool(d.entropy))
            .attr("stroke", "#fff")
            .attr("stroke-width", 1)

        g.selectAll("text.agent-label")
            .data(agentsRef.current, (d: any) => d.id)
            .enter()
            .append("text")
            .attr("class", "agent-label")
            .attr("x", (d: { x: any }) => d.x)
            .attr("y", (d: { y: number }) => d.y - 16)
            .attr("text-anchor", "middle")
            .attr("fill", "#fff")
            .attr("font-size", 10)
            .text((d: { id: any; level: any }) => `${d.id} Lv.${d.level}`)
    }

    function updateTopAgents() {
        const sorted = [...agentsRef.current].sort((a, b) => b.knowledge - a.knowledge)
        setTopAgents(sorted.slice(0, 5))
    }

    useEffect(() => {
        const interval = setInterval(() => tick(), 10)
        return () => clearInterval(interval)
    }, [])

    // Add logic to draw lines between agents during interactions
    function tick() {
        if (!gRef.current) return;
        const g = d3.select(gRef.current);
        const agents = agentsRef.current;

        agents.forEach((agent) => {
            agent.tickCounter ??= 0;
            agent.tickCounter++;

            const interval = Math.max(1, 100 / agent.speed);

            if (agent.tickCounter >= interval) {
                agent.tickCounter = 0;

                let partner = agents[Math.floor(Math.random() * agents.length)];
                while (partner.id === agent.id) {
                    partner = agents[Math.floor(Math.random() * agents.length)];
                }

                const newInfo = generateRandomKnowledge();

                const learnAmount = 1 * agent.speed;
                agent.knowledge += learnAmount;
                partner.entropy = (partner.entropy + agent.entropy) / 2;

                if (agent.knowledge >= agent.level * 50) {
                    agent.level += 1;
                    agent.speed *= 1.1;
                    const evoText = `${agent.id} evolved to Lv.${agent.level} and upgraded speed!<br/>---`;
                    setAchievements((prev) => [evoText, ...prev].slice(0, 50));
                }

                const histText = `${agent.id} → ${partner.id} :<br/> <strong>[${newInfo.category}]</strong> ${newInfo.topic} = ${newInfo.value}<br/>---`;
                setHistory((prev) => [histText, ...prev].slice(0, 50));

                // Draw arrow line
                const line = g.append("line")
                    .attr("x1", agent.x)
                    .attr("y1", agent.y)
                    .attr("x2", partner.x)
                    .attr("y2", partner.y)
                    .attr("stroke", "#00ffff")
                    .attr("stroke-width", Math.min(1.5 * agent.speed, 3))
                    .attr("marker-end", "url(#arrow)")
                    .attr("opacity", 0.8);

                line.transition()
                    .duration(2000)
                    .attr("opacity", 0)
                    .remove();
            }
        });

        g.selectAll<SVGCircleElement, Agent>("circle")
            .data(agents, (d: any) => d.id)
            .transition()
            .duration(300)
            .attr("r", (d: { knowledge: number }) => Math.min(10 + d.knowledge, maxAgentSize))
            .attr("fill", (d: { entropy: any }) => d3.interpolateCool(d.entropy));

        g.selectAll<SVGTextElement, Agent>("text.agent-label")
            .data(agents, (d: any) => d.id)
            .text((d: { id: any; level: any }) => `${d.id} Lv.${d.level}`)
    }

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 w-full">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">AI Data Entanglement</h1>
                <p className="text-default-500">
                    Autonomous agents sharing state through entanglement.
                </p>
            </div>

            <div className="w-full h-full p-6 text-white flex gap-6 justify-center">
                <div className="flex flex-row gap-12">
                    <div style={{ width: "250px", maxHeight: `${height}px`, overflowY: "auto", padding: "10px", borderRadius: "8px" }} className="bg-neutral-900/30 backdrop-blur-md">
                        <h2 className="text-white font-bold mb-2">Top Agents</h2>
                        <ul className="text-white/70 text-sm">
                            {topAgents.map((a, i) => (
                                <li key={`${a.id}+${i}`}>
                                    {a.id} Lv.{a.level} - Knowledge: {Math.floor(a.knowledge)} - Speed: {a.speed.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <svg ref={svgRef} width={width} height={height} className="rounded-lg bg-transparent"/>
                    <div className="flex gap-4 flex-col">
                        <div style={{ width: "250px", maxWidth: "250px", maxHeight: `${(height / 2) - 7}px`, height: `${(height / 2) - 7}px`, overflowY: "auto", padding: "10px", borderRadius: "8px" }} className="bg-neutral-900/30 backdrop-blur-md">
                            <h2 className="text-white font-bold mb-2">History</h2>
                            <ul className="text-white/70 text-sm">
                                {history.map((h, i) => (
                                    <li key={`${h}+${i}`} dangerouslySetInnerHTML={{ __html: h }}></li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ width: "250px", maxWidth: "250px", maxHeight: `${(height / 2) - 7}px`, height: `${(height / 2) - 7}px`, overflowY: "auto", padding: "10px", borderRadius: "8px" }} className="bg-neutral-900/30 backdrop-blur-md">
                            <h2 className="text-white font-bold mb-2">Achievements</h2>
                            <ul className="text-yellow-400 text-sm">
                                {achievements.map((a, i) => (
                                    <li key={`${a}+${i}`} dangerouslySetInnerHTML={{ __html: a }}></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

function generateRandomKnowledge(): Knowledge {
    const topics = ["Sensor", "Event", "Code", "Emotion", "Parameter", "Message"]
    const categories = ["Tech", "AI", "Env", "Social", "Random"]
    const topic = topics[Math.floor(Math.random() * topics.length)]
    const category = categories[Math.floor(Math.random() * categories.length)]
    let value: string | number = "undefined";
    switch (topic) {
        case "Sensor":
        case "Parameter":
            value = +(Math.random() * 100).toFixed(2);
            break;
        case "Event":
        case "Message":
            value = `Msg_${Math.floor(Math.random() * 1000)}`;
            break;
        case "Code":
            value = `func_${Math.floor(Math.random() * 999)}()`;
            break;
        case "Emotion": {
            const emotions = ["happy", "sad", "angry", "confused"];
            value = emotions[Math.floor(Math.random() * emotions.length)];
            break;
        }
    }
    return { topic, value, category, default: { value: value.toString() } };
}