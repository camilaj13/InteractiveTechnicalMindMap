export const bulloakdata = {
  name: "Bulloak",
  tooltip:
    "Bulloak is DeFi Wonderland's scenario-driven testing framework that layers a tree-structured specification language on top of Foundry to codify invariants, orchestrate actor flows, and deliver reproducible smart-contract simulations.",
  children: [
    // ───────────────────── What is Bulloak? ─────────────────────
    {
      name: "What is Bulloak?",
      tooltip:
        "Bulloak is an opinionated harness for Foundry projects that lets engineers describe complete interaction trees in `.tree` files, replay them deterministically, and couple fuzzing with declarative expectations.",
      children: [
        {
          name: "Scenario-specification layer",
          tooltip:
            "Bulloak introduces a high-level DSL to declare environments, actors, setup steps, and expectations, mapping them to concrete forge tests under the hood.",
          children: [
            {
              name: "Tree-based narratives",
              tooltip:
                "Specifications expand into nested describe/context/it nodes, mirroring user journeys and game-theoretic flows for readability and reuse.",
            },
            {
              name: "Declarative expectations",
              tooltip:
                "Assertions, revert clauses, and invariant checkpoints are encoded as metadata on the nodes rather than embedded in imperative Solidity test code.",
            },
            {
              name: "Environment descriptors",
              tooltip:
                "Reusable environment blocks capture deployment stacks, actor keypairs, token allocations, and chain parameters that subsequent branches inherit.",
            },
          ],
        },
        {
          name: "Foundry-first integration",
          tooltip:
            "Bulloak consumes existing Foundry build artifacts, executes simulations via forge, and reports results back through familiar forge output conventions.",
          children: [
            {
              name: "Uses forge executors",
              tooltip:
                "Every `.tree` node maps to generated Solidity harnesses that leverage Foundry cheatcodes, vm snapshots, and broadcast tooling.",
            },
            {
              name: "Works with multi-chain forks",
              tooltip:
                "Config allows running trees against mainnet fork URLs, controlling block numbers, and injecting RPC snapshots per branch.",
            },
            {
              name: "CI friendly",
              tooltip:
                "The CLI outputs deterministic JSON and junit artifacts so teams can wire Bulloak runs into GitHub Actions and other CI systems.",
            },
          ],
        },
        {
          name: "Purpose",
          tooltip:
            "The project compresses tribal knowledge about exploit paths and invariants into auditable specs, enabling faster onboarding and reducing bespoke scripting.",
          children: [
            {
              name: "Captures operational playbooks",
              tooltip:
                "Protocol teams codify failure scenarios (oracle drift, liquidity drains, emergency governance actions) as first-class branches.",
            },
            {
              name: "Bridges whiteboard to code",
              tooltip:
                "Security researchers outline attack trees collaboratively, then let Bulloak translate them into executable tests.",
            },
            {
              name: "Encourages incremental hardening",
              tooltip:
                "Branches can be appended over time to cover regressions, zero-day reproductions, and newly discovered invariants.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Core Architecture ────────────────────
    {
      name: "Core Architecture",
      tooltip:
        "Bulloak is composed of a parser for `.tree` specs, a planner that maps nodes into Foundry harness templates, and a runtime that orchestrates execution, fuzzing, and reporting.",
      children: [
        {
          name: "Specification parser",
          tooltip:
            "The parser tokenizes `.tree` files into AST nodes with metadata such as actors, fixtures, expectations, and tags.",
          children: [
            {
              name: "Indentation-aware grammar",
              tooltip:
                "Significant indentation and YAML-like key/value pairs define hierarchy, letting engineers author readable branching narratives.",
            },
            {
              name: "Schema validation",
              tooltip:
                "Configs enforce that required keys (description, handler, expect) are present while optional decorators (fuzz, only, skip, tags) attach additional semantics.",
            },
            {
              name: "Error surfacing",
              tooltip:
                "On malformed specs Bulloak highlights exact rows and expected tokens, preventing runtime surprises.",
            },
          ],
        },
        {
          name: "Planning layer",
          tooltip:
            "Planner walks the AST, expands fixtures, and allocates deterministic IDs so the runtime can schedule execution and snapshot management.",
          children: [
            {
              name: "State inheritance",
              tooltip:
                "Each branch inherits parent fixtures and vm snapshots, enabling incremental modifications without redeploying entire environments.",
            },
            {
              name: "Actor binding",
              tooltip:
                "Addresses, roles, and signer labels declared at higher levels are bound to actual Foundry signers that are reused across child nodes.",
            },
            {
              name: "Hook resolution",
              tooltip:
                "Before/after hooks defined per node are collected and ordered deterministically to control environment setup and cleanup.",
            },
          ],
        },
        {
          name: "Execution runtime",
          tooltip:
            "Runtime is a TypeScript service that drives forge via RPC, coordinates snapshots, and collates logs, traces, and coverage.",
          children: [
            {
              name: "Forge process manager",
              tooltip:
                "Spawns forge in child processes with per-branch configs, capturing stdout/stderr and mapping results back to tree nodes.",
            },
            {
              name: "Snapshot & rollback",
              tooltip:
                "Runtime wraps Foundry's snapshot/revert cheatcodes to reset EVM state at every branch boundary.",
            },
            {
              name: "Trace collectors",
              tooltip:
                "Optionally records call traces and gas metrics that are attached to the report for regression analysis.",
            },
          ],
        },
        {
          name: "Reporting",
          tooltip:
            "Bulloak emits rich artifacts that map the tree to pass/fail states, coverage stats, and reproduction commands.",
          children: [
            {
              name: "Structured JSON",
              tooltip:
                "Primary output is a JSON document containing every node's status, gas usage, randomness seeds, and failure metadata.",
            },
            {
              name: "Pretty console UI",
              tooltip:
                "CLI renders the tree with color-coded glyphs, indentation, and failure summaries for quick local debugging.",
            },
            {
              name: "JUnit & markdown",
              tooltip:
                "Optional reporters export CI-friendly junit XML and human-readable markdown summaries for sharing with stakeholders.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Specification Authoring ───────────────
    {
      name: ".tree Specification Authoring",
      tooltip:
        "Bulloak's `.tree` files describe deployments, actors, steps, and expectations using a concise indentation-based DSL.",
      children: [
        {
          name: "Node types",
          tooltip:
            "Root-level `describe` blocks contain nested `context`, `when`, and `it` nodes to express scenarios, variations, and assertions.",
          children: [
            {
              name: "describe/context",
              tooltip:
                "High-level groupings that configure fixtures, actors, and invariants inherited by descendants.",
            },
            {
              name: "when",
              tooltip:
                "Event or state transitions that mutate the environment (e.g., 'when Alice withdraws collateral') and may specify fuzz parameters.",
            },
            {
              name: "it",
              tooltip:
                "Leaf nodes that assert expected outcomes, revert reasons, emitted events, or on-chain state invariants.",
            },
          ],
        },
        {
          name: "Decorators & metadata",
          tooltip:
            "Each node supports decorators to influence execution: `only`, `skip`, `tags`, `focus`, `todo`, `retries`, and `timeout`.",
          children: [
            {
              name: "Tag-based selection",
              tooltip:
                "CLI filters nodes by tags so developers can run targeted subsets (e.g., liquidation, governance, mev).",
            },
            {
              name: "Selective execution",
              tooltip:
                "`only` marks a branch as the sole path to execute; `skip` excludes nodes to temporarily disable flaky flows.",
            },
            {
              name: "Retries & flake guards",
              tooltip:
                "Decorators specify retry counts and backoffs to stabilize integration tests relying on forked infrastructure.",
            },
          ],
        },
        {
          name: "Fixtures & hooks",
          tooltip:
            "Reusable building blocks define deployments, minted balances, or protocol states executed before/after nodes.",
          children: [
            {
              name: "beforeEach/afterEach",
              tooltip:
                "Per-node hooks call TypeScript helpers that interact with the EVM, deploy mocks, or configure oracles.",
            },
            {
              name: "Shared fixtures",
              tooltip:
                "Fixtures can be imported from libraries, parameterized, and referenced across multiple `.tree` files for consistency.",
            },
            {
              name: "Async support",
              tooltip:
                "Hook handlers are async functions so scripts can await RPC calls, external API data, or deterministic randomness sources.",
            },
          ],
        },
        {
          name: "Expectations",
          tooltip:
            "Leaf nodes support expectation DSL entries: `expect`, `revert`, `event`, `state`, and `approx`.",
          children: [
            {
              name: "Revert assertions",
              tooltip:
                "Set `revert: CustomError` or `revert: Panic(0x11)` to assert expected failure types.",
            },
            {
              name: "Event & state checks",
              tooltip:
                "Nodes can confirm events emitted with specific topics and check storage slots or public view return values.",
            },
            {
              name: "Approximate comparisons",
              tooltip:
                "`approx` tolerances allow expressing slippage windows and rounding allowances for DeFi math.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Execution Pipeline ───────────────────
    {
      name: "Execution Pipeline",
      tooltip:
        "Bulloak executes specs in deterministic stages: compile, prepare environment, run branch, collect artifacts, and aggregate results.",
      children: [
        {
          name: "Compilation & build caching",
          tooltip:
            "Invokes `forge build` with caching to ensure bytecode is fresh while avoiding redundant compiles across branches.",
          children: [
            {
              name: "Solidity caching",
              tooltip:
                "Filesystem watchers invalidate caches when `.sol` sources change, triggering incremental rebuilds before reruns.",
            },
            {
              name: "Dependency resolution",
              tooltip:
                "Respects foundry remappings and git submodules, ensuring generated harnesses link against the correct libraries.",
            },
          ],
        },
        {
          name: "Environment preparation",
          tooltip:
            "Runtime seeds randomness, configures RPC endpoints, and loads environment fixtures before executing branches.",
          children: [
            {
              name: "Fork configuration",
              tooltip:
                "Per-branch overrides allow selecting RPC URLs, block numbers, and chain IDs, enabling multi-network test coverage.",
            },
            {
              name: "Snapshot layering",
              tooltip:
                "Parent branch snapshot IDs are reused, drastically reducing time to replay deep trees.",
            },
            {
              name: "Funding & impersonation",
              tooltip:
                "Cheatcode wrappers provide impersonated signers with seeded balances based on fixture definitions.",
            },
          ],
        },
        {
          name: "Branch execution",
          tooltip:
            "Leaves translate to actual forge test invocations with optional fuzzing and state assertions.",
          children: [
            {
              name: "Deterministic step ordering",
              tooltip:
                "Actions defined in nodes execute sequentially with recorded tx hashes, enabling precise reproduction.",
            },
            {
              name: "Fuzz campaigns",
              tooltip:
                "`fuzz` blocks specify parameter domains, seeds, and runs; runtime forwards them to Foundry's property testing harness.",
            },
            {
              name: "Gas & trace capture",
              tooltip:
                "`trace: true` attaches full call traces and gas usage to the output for diagnostics.",
            },
          ],
        },
        {
          name: "Aggregation",
          tooltip:
            "After executing all branches, Bulloak aggregates statuses, deduplicates repeated failures, and surfaces reproduction recipes.",
          children: [
            {
              name: "Failure minimization",
              tooltip:
                "Shrinks fuzz inputs and transaction sequences to minimal reproducing cases using delta-debugging heuristics.",
            },
            {
              name: "Seed persistence",
              tooltip:
                "Seeds for successful fuzz runs are stored so future runs can reproduce coverage-critical randomness.",
            },
            {
              name: "Metrics",
              tooltip:
                "Outputs summary metrics including number of nodes executed, average branch runtime, and failure categories.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Developer Workflow & Tooling ──────────
    {
      name: "Developer Workflow & Tooling",
      tooltip:
        "Bulloak ships CLI commands, configuration files, and integrations that streamline authoring and running specs.",
      children: [
        {
          name: "CLI commands",
          tooltip:
            "`bulloak test`, `bulloak watch`, `bulloak list`, and `bulloak repl` cover the common development loop.",
          children: [
            {
              name: "bulloak test",
              tooltip:
                "Executes `.tree` specs once, respecting tag filters, concurrency flags, and reporter configuration.",
            },
            {
              name: "bulloak watch",
              tooltip:
                "Watches source and `.tree` files, re-running impacted branches with cached builds for rapid iteration.",
            },
            {
              name: "bulloak repl",
              tooltip:
                "Interactive shell exposes helper commands to deploy contracts, impersonate actors, and trial steps before formalizing them in specs.",
            },
          ],
        },
        {
          name: "Configuration",
          tooltip:
            "Projects maintain `bulloak.config.ts` (or `.js`) to register fixtures, reporters, RPC endpoints, and environment defaults.",
          children: [
            {
              name: "Global fixtures",
              tooltip:
                "Config exports typed fixtures accessible from `.tree` nodes without requiring manual imports.",
            },
            {
              name: "Network registry",
              tooltip:
                "Developers set named networks (mainnet, optimism, arbitrum forks) with endpoints and block numbers for quick selection inside specs.",
            },
            {
              name: "Reporter options",
              tooltip:
                "Enable/disable junit, markdown, or JSON reporters and tune verbosity, stack trace depth, and diff output.",
            },
          ],
        },
        {
          name: "TypeScript helpers",
          tooltip:
            "Bulloak exposes helper libraries for deployments, ERC20/721 interactions, time travel, and upgradeable proxies.",
          children: [
            {
              name: "Deploy factories",
              tooltip:
                "Utility wrappers for Foundry's broadcast commands deploy contracts with deterministic salts and verify bytecode.",
            },
            {
              name: "Token operations",
              tooltip:
                "Helpers abstract minting, approvals, and permit flows, ensuring consistent interactions across branches.",
            },
            {
              name: "Oracle & keeper simulators",
              tooltip:
                "Libraries simulate Chainlink updates, keeper bots, or rebalancing operations referenced in scenarios.",
            },
          ],
        },
        {
          name: "IDE support",
          tooltip:
            "VSCode extension highlights `.tree` syntax, offers snippets, and surfaces inline pass/fail badges when paired with watch mode.",
          children: [
            {
              name: "Syntax highlighting",
              tooltip:
                "Grammar definitions colorize node types, decorators, and expectation keys.",
            },
            {
              name: "Go-to definition",
              tooltip:
                "Hover providers link fixtures and handlers in `.tree` files to their TypeScript implementations.",
            },
            {
              name: "Inline diagnostics",
              tooltip:
                "Parser errors and runtime failures appear as diagnostics with quick-fix suggestions.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Integrations & Extensibility ──────────
    {
      name: "Integrations & Extensibility",
      tooltip:
        "Bulloak provides extension points for RPC providers, storage backends, and custom reporters to fit diverse team requirements.",
      children: [
        {
          name: "Provider adapters",
          tooltip:
            "Interfaces allow plugging different RPC providers (Anvil, Foundry fork, Tenderly, Alchemy) while preserving snapshot semantics.",
          children: [
            {
              name: "Tenderly integration",
              tooltip:
                "Optional adapter sends transactions to Tenderly for gas profiling and debugging using the same scenario definition.",
            },
            {
              name: "Anvil hot reload",
              tooltip:
                "Watch mode can spin up ephemeral Anvil instances per run to isolate state across concurrent executions.",
            },
            {
              name: "Custom provider hooks",
              tooltip:
                "Teams can inject middleware to log RPC calls, enforce rate limiting, or automatically reset forks.",
            },
          ],
        },
        {
          name: "Reporter interface",
          tooltip:
            "Implementers can extend the Reporter interface to export results to Slack, Datadog, or bespoke dashboards.",
          children: [
            {
              name: "Slack notifications",
              tooltip:
                "Webhooks broadcast failing branches, attached traces, and reproduction commands to incident channels.",
            },
            {
              name: "Metrics sinks",
              tooltip:
                "Reporters push metrics to Prometheus or Datadog for trend analysis of scenario runtime and failure rates.",
            },
            {
              name: "Custom HTML",
              tooltip:
                "Teams can render visual tree diagrams, linking nodes to docs or runbooks.",
            },
          ],
        },
        {
          name: "Plugin ecosystem",
          tooltip:
            "Plugin API lets teams bundle reusable fixtures, matchers, and expectation helpers for protocols like Uniswap, Aave, or governance frameworks.",
          children: [
            {
              name: "Protocol blueprints",
              tooltip:
                "Blueprint packages deploy canonical protocol stacks (DEX, lending markets) with prewired fixtures and invariants.",
            },
            {
              name: "Matcher libraries",
              tooltip:
                "Plugins ship domain-specific matchers (e.g., `expectHealthFactorGte`, `expectPoolBalanced`) to reduce boilerplate.",
            },
            {
              name: "Workflow automation",
              tooltip:
                "CI plugins coordinate spec runs after deployments, automatically opening GitHub issues when invariants fail.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Testing & Quality Assurance ───────────
    {
      name: "Testing & Quality Assurance",
      tooltip:
        "Bulloak's repository contains tests and automation to guarantee deterministic parsing, execution, and reporting.",
      children: [
        {
          name: "Parser unit tests",
          tooltip:
            "TypeScript tests cover grammar cases, indentation edge cases, decorator parsing, and helpful error messaging.",
          children: [
            {
              name: "Golden files",
              tooltip:
                "Canonical `.tree` inputs are compared against expected AST JSON outputs to guard against regressions.",
            },
            {
              name: "Error fixtures",
              tooltip:
                "Malformed specs confirm that the parser surfaces context-rich diagnostics with accurate line numbers.",
            },
          ],
        },
        {
          name: "Runtime integration tests",
          tooltip:
            "End-to-end tests spin up Anvil, deploy mock contracts, execute sample trees, and verify reports match snapshots.",
          children: [
            {
              name: "Snapshot assertions",
              tooltip:
                "Test harness ensures snapshot/revert semantics behave as expected across nested branches.",
            },
            {
              name: "Reporter snapshots",
              tooltip:
                "JSON and console outputs are snapshot-tested to keep CLI output stable for downstream tooling.",
            },
          ],
        },
        {
          name: "Performance benchmarks",
          tooltip:
            "Benchmarks measure runtime overhead, snapshot reuse efficiency, and concurrency scaling under deep trees.",
          children: [
            {
              name: "Branch depth stress tests",
              tooltip:
                "Synthetic specs with hundreds of branches ensure planner/runtime remain linear and avoid stack overflows.",
            },
            {
              name: "RPC load tests",
              tooltip:
                "Simulated concurrency verifies provider adapters respect rate limits and degrade gracefully.",
            },
          ],
        },
        {
          name: "CI pipelines",
          tooltip:
            "GitHub Actions run linting, type-checking, unit/integration suites, and publish npm packages on tagged releases.",
          children: [
            {
              name: "Type checking",
              tooltip:
                "`pnpm typecheck` ensures TypeScript types remain sound across core and plugin packages.",
            },
            {
              name: "Linting",
              tooltip:
                "ESLint and Prettier enforce code quality and consistent formatting.",
            },
            {
              name: "Release automation",
              tooltip:
                "Semantic-release handles version bumps, changelog generation, and npm publish gated by successful test suites.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Benefits ─────────────────────────────
    {
      name: "Benefits",
      tooltip:
        "Bulloak improves test coverage, collaboration, and reproducibility for Ethereum protocols.",
      children: [
        {
          name: "Shared mental model",
          tooltip:
            "Tree specs mirror how security teams reason about attack surfaces, making tests self-documenting.",
          children: [
            {
              name: "Readable narratives",
              tooltip:
                "Stakeholders can read `.tree` files to understand exactly how a scenario executes without parsing Solidity code.",
            },
            {
              name: "Versioned playbooks",
              tooltip:
                "Specs live alongside code in git, capturing historical knowledge about mitigated exploits and incident responses.",
            },
          ],
        },
        {
          name: "Higher coverage",
          tooltip:
            "Combining deterministic steps, fuzzing, and invariant checkpoints uncovers edge cases missed by unit tests alone.",
          children: [
            {
              name: "Fuzz + scenario blending",
              tooltip:
                "Bulloak runs fuzzers within context-specific flows, covering stateful sequences beyond standalone invariants.",
            },
            {
              name: "Regression detection",
              tooltip:
                "Stored seeds and reproducible snapshots quickly flag regressions introduced by protocol upgrades.",
            },
          ],
        },
        {
          name: "Operational efficiency",
          tooltip:
            "Fixtures, watchers, and CLI features reduce boilerplate and accelerate iteration during audits and incident responses.",
          children: [
            {
              name: "Rapid reproduction",
              tooltip:
                "Command-line reproduction strings generated per failure help developers reproduce issues locally immediately.",
            },
            {
              name: "Integrated documentation",
              tooltip:
                "Reporters output markdown summaries that can be dropped into audit handoffs or runbooks.",
            },
          ],
        },
        {
          name: "Team collaboration",
          tooltip:
            "Role-specific tags and plugin architecture let protocol, security, and DevOps teams collaborate on the same scenario tree.",
          children: [
            {
              name: "Tag-driven ownership",
              tooltip:
                "Teams assign tags to nodes (risk, area, owner) to route alerts and review responsibilities.",
            },
            {
              name: "Reusable modules",
              tooltip:
                "Plugin packages encapsulate shared knowledge and reduce copy/paste across protocols.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Technical Details ─────────────────────
    {
      name: "Technical Details",
      tooltip:
        "Under the hood Bulloak mixes TypeScript, Foundry cheatcodes, and structured metadata to deliver deterministic simulations.",
      children: [
        {
          name: "Runtime stack",
          tooltip:
            "Core runtime is written in TypeScript, using pnpm workspaces, ts-node, and viem/ethers for RPC communication.",
          children: [
            {
              name: "Workspace layout",
              tooltip:
                "Monorepo houses packages for parser, runtime, CLI, plugins, and VSCode extension managed via pnpm.",
            },
            {
              name: "Type safety",
              tooltip:
                "Extensive TypeScript typings ensure `.tree` metadata lines up with handler signatures and reporter outputs.",
            },
            {
              name: "Process orchestration",
              tooltip:
                "Execa (or similar) is used to spawn forge, while cross-spawn ensures compatibility across operating systems.",
            },
          ],
        },
        {
          name: "Generated Solidity",
          tooltip:
            "Planner emits Solidity harness contracts that import user fixtures and call into them using Foundry's scripting conventions.",
          children: [
            {
              name: "Cheatcode usage",
              tooltip:
                "Harnesses rely on vm cheatcodes for warps, roll, deal, prank, and snapshot management, encapsulated behind helper libraries.",
            },
            {
              name: "Library remappings",
              tooltip:
                "Generated code respects foundry remappings so user-defined libraries resolve correctly during compilation.",
            },
            {
              name: "Upgradeable proxies",
              tooltip:
                "Helper libs include proxy deployment and upgrade sequences to model governance-controlled upgrades.",
            },
          ],
        },
        {
          name: "Fuzzing integration",
          tooltip:
            "Bulloak configures Foundry's fuzzing engine via annotations in `.tree` nodes, controlling seeds, cases, and custom generators.",
          children: [
            {
              name: "Deterministic seeds",
              tooltip:
                "Seeds recorded per branch guarantee reproducibility even across CI machines.",
            },
            {
              name: "Custom generators",
              tooltip:
                "Handlers can reference TypeScript generator functions that produce domain-specific inputs for the fuzz harness.",
            },
            {
              name: "Shrinking",
              tooltip:
                "When fuzz fails, Bulloak requests Foundry's shrink traces and surfaces the minimal counterexample alongside reproduction commands.",
            },
          ],
        },
        {
          name: "Caching & performance",
          tooltip:
            "Internal caches store parsed trees, generated harnesses, and build metadata to accelerate repeated runs.",
          children: [
            {
              name: "AST cache",
              tooltip:
                "Parser caches ASTs keyed by file hash; watchers invalidate caches only on edits.",
            },
            {
              name: "Harness reuse",
              tooltip:
                "Generated Solidity harnesses are kept on disk and reused if fixtures and specs remain unchanged.",
            },
            {
              name: "Parallelism",
              tooltip:
                "Runtime can run independent branches concurrently while isolating them with dedicated fork instances.",
            },
          ],
        },
      ],
    },
  ],
};