// src/slitherData.ts
export const slitherData = {
  name: "Slither",
  tooltip:
    "Slither is a static analysis framework for Solidity smart contracts. It performs fast, accurate vulnerability detection, code structure analysis, and generates rich intermediate representations for security tooling and auditing workflows. It is built for speed, precision, and extensibility.",
  children: [
    // ───────────────────────────── Core Concept ─────────────────────────────
    {
      name: "Core Concept",
      tooltip:
        "Slither statically analyzes Solidity code to detect security vulnerabilities, extract code structure, and support automated or manual reviews. It operates on the contract’s AST and IR, producing findings without executing the code.",
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
                "Slither includes dozens of built-in detectors for common vulnerability classes such as reentrancy, uninitialized storage, and arbitrary ETH sends.",
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
                "Slither runs in seconds even on large codebases, enabling iterative security testing.",
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
              name: "Hardhat and Foundry projects",
              tooltip:
                "Slither runs directly in typical Solidity project directories with standard configurations.",
            },
            {
              name: "CI/CD compatibility",
              tooltip:
                "Slither integrates with pre-commit hooks and GitHub Actions for automated checks.",
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
  ],
};
