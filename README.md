# Interactive Technical Mind Map

## Overview

**Interactive Technical Mind Map** is a Vite-powered React application that transforms complex technical projects into interactive, explorable visual maps.

Instead of reading long technical documents, engineers and stakeholders can **visualize the entire system structure**, explore relationships, and understand architecture through expandable branches and rich tooltips.

### Perfect For Visualizing

- **Cybersecurity product roadmaps**
- **Software architectures and dependencies**
- **Integration workflows**
- **Technical platform diagrams**

This project also serves as a **template for developers** who want to build their own D3-powered mind maps using React.

## Key Features

🔵 **Multiple datasets in one interface** — Quickly switch between CanonGuard, Slither, Tameshi, BullOak, Talir, and Wazuh.

🟢 **Expandable nodes** — Click nodes to expand or collapse while preserving view state.

🟣 **Rich tooltips** — Each node can show contextual descriptions, tags, or external links.

🟠 **Responsive layout** — The map adjusts dynamically with zooming and panning.

⚫ **Dark theme** — Clean, minimal visuals suitable for presentations and documentation.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/camilaj13/Interactive-Technical-MindMap.git
cd Interactive-Technical-MindMap
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Then open your browser at **http://localhost:5173**

## How to Add Your Own Project

### 1. Create your dataset file

Add a new file named `Xdata.ts` inside the **src/** directory (next to other datasets).

This file represents your project structure as a hierarchy of folders and files.

**Example:**
```
src/
  Xdata.ts
```

The file must export an object named `Xdata` that defines your map nodes.

### 2. Edit MindMap.tsx

Open **src/components/MindMap.tsx** and add your dataset import:

```typescript
import { Xdata } from "../Xdata"; // Add your dataset
```

Then register it inside the **DATA_SOURCES** map:

```typescript
x: Xdata, // Register your dataset key
```

### 3. Run the app

```bash
npm run dev
```

Open **http://localhost:5173** and select your dataset from the dropdown menu.

**Your project now appears as an interactive visual map!**

## Using OpenAI Code or Claude Code

This project is designed to work seamlessly with **AI tools** like OpenAI Code and Claude Code to automatically generate dataset files.

### Workflow:

**1. Fork this repository** into your own GitHub account.
You'll use it as your visualization base.

**2. Ask your AI code assistant to analyze this project.**
Request: *"Analyze the code and create a data.ts file that represents how the mind map data is structured."*

**3. Fork the repository you want to visualize.**
In your AI workspace, ask: *"Generate a data.ts file for this project following the same format as in Interactive Technical MindMap."*

**4. Copy the generated data.ts file** into your local project and rename it to `Xdata.ts`.

**5. Edit MindMap.tsx** to import your new data file and register it in the dataset map.

**6. Run the application** with `npm run dev` and open it in your browser at **http://localhost:5173**

You'll now see your project visualized as part of the interactive map selector.

## Future Updates & Appreciated Contributions

We welcome contributions that advance the following technical objectives:

### 🔵 Automated Repository Parsing
Implement automated GitHub repository analysis and AST parsing to dynamically generate mind map data structures without manual dataset creation. This includes:
- **Repository introspection** via GitHub API integration
- **Static analysis** of project structure and dependencies
- **Automated data.ts generation** from codebase metadata

### 🟢 Zero-Interaction Workflow
Develop CI/CD pipeline integration and file system watchers to enable automatic dataset synchronization:
- **Hot-reload** dataset updates on source repository changes
- **Automated import registration** in MindMap.tsx
- **Version control hooks** for seamless updates

### 🟣 AI-Native Semantic Layer
Integrate LLM-powered analysis for intelligent context enrichment:
- **Semantic code analysis** for enhanced node descriptions
- **Relationship inference** between architectural components
- **Natural language queries** for interactive exploration
- **Context-aware tooltips** with AI-generated insights

Contributions should maintain type safety, follow the existing D3.js architecture, and include comprehensive documentation.

## License

**MIT**
