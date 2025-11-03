// src/slitherData.ts
export const slitherData = {
  name: "Slither",
  tooltip:
    "Slither is a Python-based static analysis framework for Solidity and Vyper smart contracts maintained by Trail of Bits. With 99+ detectors, 6,000+ GitHub stars, and a 99.9% parsing success rate, it performs fast (<1s per contract), accurate vulnerability detection, code structure analysis, and generates rich intermediate representations for security tooling and auditing workflows.",
  children: [
    // ───────────────────────────── Core Concept ─────────────────────────────
    {
      name: "Core Concept",
      tooltip:
        "Slither statically analyzes Solidity (v0.4+) and Vyper code to detect security vulnerabilities, extract code structure, and support automated or manual reviews. It operates on the contract's AST and IR, producing findings without executing the code.",
      children: [
        {
          name: "Static analysis engine",
          children: [
            {
              name: "Source-to-AST parsing",
              tooltip:
                "Slither parses Solidity source files using the solc frontend and builds an abstract syntax tree as the foundation for its analyses.",
            },
            {
              name: "Intermediate representation (SlithIR)",
              tooltip:
                "SlithIR is a simplified, SSA-like intermediate representation that enables efficient dataflow and taint tracking analyses.",
            },
          ],
        },
        {
          name: "Vulnerability detection",
          children: [
            {
              name: "Detector modules",
              tooltip:
                "Slither includes 99+ built-in detectors across severity levels (High, Medium, Low, Informational, Optimization) for vulnerability classes such as reentrancy, uninitialized storage, and arbitrary ETH sends.",
            },
            {
              name: "Extensible plugin system",
              tooltip:
                "Users can develop and register custom detectors using Slither’s Python API, integrating organization-specific security checks.",
            },
          ],
        },
        {
          name: "Code structure extraction",
          children: [
            {
              name: "Printer modules",
              tooltip:
                "Slither printers output structured information such as function call graphs, inheritance trees, and external call lists, supporting review and visualization.",
            },
            {
              name: "Human-readable and machine-parsable formats",
              tooltip:
                "Output can be directed to stdout, Markdown, JSON, or programmatically consumed for further processing.",
            },
          ],
        },
      ],
    },

    // ───────────────────────────── Value Proposition ─────────────────────────
    {
      name: "Value Proposition",
      tooltip:
        "Slither provides fast, accurate security analysis with a high signal-to-noise ratio, and integrates naturally into professional audit pipelines.",
      children: [
        {
          name: "Security assurance",
          children: [
            {
              name: "Early vulnerability detection",
              tooltip:
                "Slither identifies many critical vulnerabilities at development time, reducing the probability of deploying exploitable contracts.",
            },
            {
              name: "Formalizable analysis",
              tooltip:
                "Analyses are deterministic and repeatable, which allows integration into CI/CD and formal audit processes.",
            },
          ],
        },
        {
          name: "Audit efficiency",
          children: [
            {
              name: "High-speed execution",
              tooltip:
                "Slither parses 99.9% of all public Solidity code and completes analysis in less than 1 second per contract on average, enabling iterative security testing even on large codebases.",
            },
            {
              name: "High signal-to-noise ratio",
              tooltip:
                "Detector results are precise, reducing manual triage overhead compared to traditional linters.",
            },
          ],
        },
        {
          name: "Extensibility",
          children: [
            {
              name: "Custom detector API",
              tooltip:
                "Auditors can write organization-specific checks using Python bindings.",
            },
            {
              name: "Compatible output formats",
              tooltip:
                "JSON and Markdown outputs allow automated pipelines and documentation generation.",
            },
          ],
        },
      ],
    },

    // ───────────────────────────── Installation & Setup ──────────────────────
    {
      name: "Installation & Setup",
      tooltip:
        "Slither is lightweight to install and runs on most development machines without complex dependencies.",
      children: [
        {
          name: "Environment prerequisites",
          children: [
            {
              name: "Python 3.8+ and pip",
              tooltip:
                "Slither is installed as a Python package and runs as a CLI or library.",
            },
            {
              name: "solc compiler availability",
              tooltip:
                "A compatible solc binary is required to parse contracts accurately; Slither respects solc-select settings.",
            },
          ],
        },
        {
          name: "Installation methods",
          children: [
            {
              name: "pip install",
              tooltip:
                "Slither can be installed via `pip install slither-analyzer`.",
            },
            {
              name: "Homebrew formula",
              tooltip: "macOS users can use `brew install slither-analyzer`.",
            },
            {
              name: "Docker image",
              tooltip:
                "A maintained Docker image is available for isolated and reproducible environments.",
            },
          ],
        },
        {
          name: "Environment integration",
          children: [
            {
              name: "Framework support",
              tooltip:
                "Slither automatically detects and integrates with Hardhat, Foundry, Dapp, Brownie, and Truffle projects with zero configuration required.",
            },
            {
              name: "CI/CD compatibility",
              tooltip:
                "Slither integrates with pre-commit hooks, GitHub Actions, and code scanning, supporting automated security checks in development pipelines.",
            },
          ],
        },
      ],
    },

    // ───────────────────────────── Core Analysis Flow ────────────────────────
    {
      name: "Core Analysis Flow",
      tooltip:
        "Slither performs a deterministic static analysis pipeline consisting of parsing, IR generation, detector execution, and reporting.",
      children: [
        {
          name: "1. Parsing",
          children: [
            {
              name: "Source resolution",
              tooltip:
                "Slither resolves imports and parses Solidity source files with the configured solc version.",
            },
            {
              name: "AST construction",
              tooltip:
                "An abstract syntax tree is built for subsequent analysis passes.",
            },
          ],
        },
        {
          name: "2. IR Generation",
          children: [
            {
              name: "SlithIR transformation",
              tooltip:
                "The AST is lowered to SlithIR, simplifying control and dataflow representation.",
            },
          ],
        },
        {
          name: "3. Detector Execution",
          children: [
            {
              name: "Built-in detectors",
              tooltip:
                "Slither runs a suite of detectors targeting known vulnerability classes.",
            },
            {
              name: "Custom detectors",
              tooltip:
                "If present, organization-specific detectors execute within the same pipeline.",
            },
          ],
        },
        {
          name: "4. Reporting",
          children: [
            {
              name: "CLI output",
              tooltip:
                "Default output includes vulnerability class, impact, and confidence.",
            },
            {
              name: "Structured output formats",
              tooltip:
                "Reports can be emitted in JSON or Markdown for programmatic consumption or documentation.",
            },
          ],
        },
      ],
    },

    // ───────────────────────────── Key Features ──────────────────────────────
    {
      name: "Key Features",
      tooltip:
        "Slither offers a broad range of analysis capabilities supporting both security auditing and code understanding.",
      children: [
        {
          name: "Vulnerability detection",
          children: [
            {
              name: "Detector coverage",
              tooltip:
                "Built-in detectors cover reentrancy, arbitrary send, uninitialized storage, tx.origin usage, unprotected upgrades, and more.",
            },
            {
              name: "Confidence and impact levels",
              tooltip:
                "Findings are annotated with impact and confidence to guide triage.",
            },
          ],
        },
        {
          name: "Code comprehension tooling",
          children: [
            {
              name: "Function summary printer",
              tooltip:
                "The function-summary printer gives a per-function overview of visibility, state mutability, and external calls.",
            },
            {
              name: "Call graph and inheritance visualization",
              tooltip:
                "Printers expose contract structure to help auditors understand complex systems.",
            },
          ],
        },
        {
          name: "Automation support",
          children: [
            {
              name: "Machine-readable output",
              tooltip:
                "JSON output enables integration with dashboards, bots, and pipelines.",
            },
            {
              name: "Pre-commit and CI hooks",
              tooltip:
                "Slither can block PRs or commits that introduce vulnerabilities.",
            },
          ],
        },
        {
          name: "Extensibility",
          children: [
            {
              name: "Custom detectors and printers",
              tooltip:
                "Developers can write Python plugins to extend functionality without modifying core.",
            },
          ],
        },
        {
          name: "Speed and scalability",
          children: [
            {
              name: "Low overhead",
              tooltip:
                "Slither can analyze large codebases in seconds, enabling frequent execution in development workflows.",
            },
          ],
        },
      ],
    },

    // ───────────────────────────── Detectors (Selected High-Value) ───────────
    {
      name: "Detectors (Selected High-Value)",
      tooltip:
        "Some detectors are critical in most audits and commonly appear in bug bounty reports.",
      children: [
        {
          name: "Reentrancy",
          children: [
            {
              name: "Detection of external calls before state updates",
              tooltip:
                "Flags reentrancy opportunities, a top-class Ethereum vulnerability.",
            },
          ],
        },
        {
          name: "Arbitrary send ETH",
          children: [
            {
              name: "Unrestricted ETH transfers",
              tooltip:
                "Detects functions that allow ETH to be sent without constraints.",
            },
          ],
        },
        {
          name: "Uninitialized storage",
          children: [
            {
              name: "Missing initialization",
              tooltip:
                "Identifies uninitialized storage variables leading to unexpected state.",
            },
          ],
        },
        {
          name: "tx.origin usage",
          children: [
            {
              name: "Authentication bypass",
              tooltip: "Flags unsafe reliance on tx.origin for access control.",
            },
          ],
        },
        {
          name: "Unprotected upgradeability",
          children: [
            {
              name: "Missing access control on upgrade functions",
              tooltip:
                "Detects upgrade functions callable without proper authorization.",
            },
          ],
        },
      ],
    },

    // ───────────────────────────── Advantages for Security Engineers ─────────
    {
      name: "Advantages for Security Engineers",
      tooltip:
        "Slither fits into modern security pipelines and supports professional audit workflows.",
      children: [
        {
          name: "Fast and deterministic",
          children: [
            {
              name: "Seconds per analysis",
              tooltip:
                "Analysis completes rapidly and yields the same output for the same code.",
            },
          ],
        },
        {
          name: "High signal-to-noise",
          children: [
            {
              name: "Precise findings",
              tooltip:
                "Detectors aim to minimize false positives, focusing reviewers on real issues.",
            },
          ],
        },
        {
          name: "Integration-ready",
          children: [
            {
              name: "API and CLI interoperability",
              tooltip:
                "Slither can run locally, in CI, or within larger security orchestration stacks.",
            },
          ],
        },
        {
          name: "Developer education",
          children: [
            {
              name: "Code structure visibility",
              tooltip:
                "Printers make complex contracts easier to reason about, improving review speed.",
            },
          ],
        },
        {
          name: "Extensible foundation",
          children: [
            {
              name: "Plugin ecosystem",
              tooltip:
                "Custom rulesets can evolve with organizational security standards.",
            },
          ],
        },
      ],
    },

    // ───────────────────────────── Comparative Analysis ──────────────────────────
    {
      name: "Comparative Analysis",
      tooltip:
        "Slither occupies a distinct role in the smart contract ecosystem, complementing development frameworks rather than competing with them.",
      children: [
        {
          name: "Slither vs Development Frameworks",
          tooltip:
            "Slither is a security analysis tool, while frameworks like Hardhat, Foundry, and Truffle are development environments—they serve complementary purposes.",
          children: [
            {
              name: "Hardhat comparison",
              tooltip:
                "Hardhat is a development framework providing compilation, testing (Mocha/Chai), debugging, and deployment tooling. Slither analyzes the contracts built with Hardhat to find vulnerabilities. They work together, not as alternatives.",
            },
            {
              name: "Foundry comparison",
              tooltip:
                "Foundry excels at dynamic testing, fuzzing, and real-world simulations. Slither provides fast static analysis for unreachable code and access control issues. Using both gives comprehensive coverage.",
            },
            {
              name: "Zero-configuration integration",
              tooltip:
                "Slither automatically detects Hardhat, Foundry, Truffle, Brownie, and Dapp projects without requiring configuration changes, making it easy to add security scanning to existing workflows.",
            },
          ],
        },
        {
          name: "Slither vs Other Security Tools",
          tooltip:
            "Compared to other security analyzers, Slither offers unique trade-offs in speed, precision, and extensibility.",
          children: [
            {
              name: "Static vs Dynamic analysis",
              tooltip:
                "Slither (static) finds issues without execution, complementing dynamic tools like Echidna (fuzzing) and Manticore (symbolic execution) which explore runtime behaviors.",
            },
            {
              name: "Speed advantage",
              tooltip:
                "With <1 second per contract execution time, Slither is significantly faster than symbolic execution tools, making it ideal for CI/CD integration and iterative development.",
            },
            {
              name: "Breadth of detection",
              tooltip:
                "99+ detectors across multiple severity levels provide broad coverage of known vulnerability patterns, from critical exploits to code quality optimizations.",
            },
            {
              name: "Open source extensibility",
              tooltip:
                "Unlike commercial tools like MythX, Slither's Python API and AGPL-3.0 license enable custom detector development and full pipeline customization without licensing constraints.",
            },
          ],
        },
        {
          name: "Best Practice: Multi-Tool Approach",
          tooltip:
            "Professional security audits combine multiple tools to achieve comprehensive coverage across different analysis dimensions.",
          children: [
            {
              name: "Development + Static + Dynamic",
              tooltip:
                "Recommended workflow: develop with Hardhat/Foundry, run Slither for fast static analysis, add Echidna for fuzzing, and use Manticore for deep symbolic analysis on critical functions.",
            },
            {
              name: "CI/CD integration strategy",
              tooltip:
                "Slither runs on every commit for fast feedback, while heavier tools like symbolic execution run nightly or pre-deployment to balance speed with thoroughness.",
            },
          ],
        },
      ],
    },

    // ───────────────────────────── Slither + Tameshi ──────────────────────────
    {
      name: "Slither + Tameshi Complement",
      tooltip:
        "Slither and Tameshi work together to provide layered security analysis with different strengths, speeds, and analysis approaches.",
      children: [
        {
          name: "Why use both?",
          tooltip:
            "Slither and Tameshi complement each other by offering different trade-offs in speed, analysis depth, AI augmentation, and development workflow integration.",
          children: [
            {
              name: "Established vs Emerging",
              tooltip:
                "Slither (6,000+ stars, mature ecosystem) provides battle-tested detection from Trail of Bits with 99+ detectors. Tameshi brings modern multi-modal analysis combining deterministic scanners with LLM reasoning for edge cases.",
            },
            {
              name: "Python vs Rust ecosystems",
              tooltip:
                "Slither leverages Python for easy scripting and integration. Tameshi is built in Rust for performance and memory safety, with custom ThalIR representation optimized for smart contract analysis.",
            },
            {
              name: "Different intermediate representations",
              tooltip:
                "Slither uses SlithIR for SSA-based analysis. Tameshi uses ThalIR with explicit smart contract primitives (storage slots, call contexts, revert semantics), enabling different vulnerability detection strategies.",
            },
          ],
        },
        {
          name: "Complementary strengths",
          tooltip:
            "Each tool excels in different dimensions, making them valuable in different stages of development and audit workflows.",
          children: [
            {
              name: "Slither: Breadth & speed",
              tooltip:
                "Slither's 99+ detectors and <1s execution time make it ideal for comprehensive scanning during CI/CD, catching a wide range of known vulnerability patterns instantly.",
            },
            {
              name: "Tameshi: Depth & AI assistance",
              tooltip:
                "Tameshi's hybrid deterministic+LLM analysis finds semantic vulnerabilities that rigid rules miss, with cross-validation boosting confidence and explainable provenance for audit trails.",
            },
            {
              name: "Slither: CLI-first workflow",
              tooltip:
                "Slither integrates naturally into command-line workflows, CI pipelines, and GitHub Actions with minimal setup, outputting JSON/Markdown/SARIF for automation.",
            },
            {
              name: "Tameshi: Editor-native experience",
              tooltip:
                "Tameshi's VSCode extension provides real-time inline diagnostics and vulnerability triage panels, working on incomplete code without requiring full compilation.",
            },
          ],
        },
        {
          name: "Recommended workflow",
          tooltip:
            "Use both tools at different stages to maximize security coverage while maintaining development velocity.",
          children: [
            {
              name: "Development phase",
              tooltip:
                "Run Tameshi in VSCode for real-time feedback on code as you write, catching issues before they reach version control.",
            },
            {
              name: "Pre-commit/CI phase",
              tooltip:
                "Run Slither in CI pipelines for fast, comprehensive scanning across all 99+ detectors, blocking merges that introduce known vulnerabilities.",
            },
            {
              name: "Pre-audit phase",
              tooltip:
                "Run both tools with full LLM analysis enabled: Slither catches broad patterns, Tameshi's AI reasoning surfaces subtle logic flaws and complex interactions.",
            },
            {
              name: "Cross-validation",
              tooltip:
                "When both tools flag the same issue, confidence increases significantly. When they disagree, investigate carefully—different IRs may reveal different aspects of the same problem.",
            },
          ],
        },
        {
          name: "Tool selection guidance",
          tooltip:
            "Choose based on your current needs, but using both provides the most comprehensive security coverage.",
          children: [
            {
              name: "Choose Slither when...",
              tooltip:
                "You need fast CI integration, broad detector coverage, Python ecosystem compatibility, or integration with existing Trail of Bits tooling (Echidna, Manticore).",
            },
            {
              name: "Choose Tameshi when...",
              tooltip:
                "You want VSCode integration, LLM-augmented analysis for edge cases, explainable provenance chains, or analysis of incomplete/in-progress code without compilation.",
            },
            {
              name: "Use both when...",
              tooltip:
                "You're conducting professional security audits, preparing for mainnet deployment, or building security-critical DeFi protocols where comprehensive coverage is essential.",
            },
          ],
        },
      ],
    },
  ],
};
