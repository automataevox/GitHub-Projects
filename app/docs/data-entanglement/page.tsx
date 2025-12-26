"use client";

import React from "react";

export default function WhitepaperPage() {
  return (
    <div className="w-full min-h-screen p-10 text-white font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Whitepaper: Chained Reinforcement Learning (CRL) via Data Entanglement
        </h1>

        <p className="mb-4 text-lg text-gray-300">
          This document introduces a novel approach to multi-agent reinforcement
          learning, called <strong>Chained Reinforcement Learning (CRL)</strong>,
          which leverages the concept of <em>data entanglement</em> for rapid
          cooperative learning among autonomous agents.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Background</h2>
        <p className="mb-4 text-gray-300">
          In traditional Reinforcement Learning (RL), each agent learns from its
          own interactions with the environment. This isolated learning process
          often leads to slow convergence, especially for complex tasks, since
          the agent must explore the environment repeatedly to gather sufficient
          experience.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Chained RL via Data Entanglement</h2>
        <p className="mb-4 text-gray-300">
          In <strong>CRL</strong>, multiple autonomous agents share their
          knowledge and learned experiences in real time through a process we
          term <em>data entanglement</em>. Each new piece of information learned
          by one agent is propagated to all entangled agents, creating a
          multiplicative effect on learning efficiency.
        </p>

        <ul className="list-disc list-inside mb-4 text-gray-300">
          <li>Knowledge sharing increases effective sample size, accelerating learning.</li>
          <li>Cooperative learning prevents interference and optimizes the global reward.</li>
          <li>Agents evolve faster: greater accumulated knowledge improves learning speed and transfer efficiency.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Advantages over Standard RL</h2>
        <p className="mb-4 text-gray-300">
          Compared to standard RL:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-300">
          <li>CRL converges faster due to shared experience.</li>
          <li>Learning is reinforced across multiple agents, reducing redundancy.</li>
          <li>Complex behaviors emerge more efficiently in multi-agent systems.</li>
          <li>Scalable to large networks of entangled agents for distributed AI applications.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Implementation Notes</h2>
        <p className="mb-4 text-gray-300">
          - Each agent maintains its own knowledge base and evolution level.<br/>
          - Agents interact in a chain-like manner; interactions occur based on individual speed multipliers.<br/>
          - Achievements and evolution milestones are recorded to track knowledge growth.<br/>
          - The system allows visualization of knowledge transfer, entropy, and agent evolution.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
        <p className="mb-4 text-gray-300">
          Chained Reinforcement Learning with data entanglement represents a
          significant improvement over isolated RL. By enabling agents to
          interact, share knowledge, and evolve cooperatively, CRL accelerates
          learning, improves efficiency, and provides a framework for
          distributed intelligence in multi-agent systems.
        </p>

        <p className="text-gray-500 mt-6 text-sm">
          Disclaimer: This approach is conceptual and experimental; results
          depend on the implementation of knowledge sharing, agent design, and
          environment complexity.
        </p>
      </div>
    </div>
  );
}
