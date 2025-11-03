export const tameshidata = {
  name: "Tameshi",
  tooltip:
    "Tameshi is a multi-modal security analysis platform for Solidity that combines deterministic scanners, intermediate representations, and LLM reasoning to deliver real-time vulnerability triage across CLI and VSCode workflows.",
  children: [
    // ───────────────────── What is Tameshi? ─────────────────────
    {
      name: "What is Tameshi?",
      tooltip:
        "Tameshi is an end-to-end vulnerability scanner for Solidity smart contracts that blends static analysis, IR reasoning, and AI assistance to find high-impact issues quickly while preserving developer ergonomics.",
      children: [
        {
          name: "Multi-modal vulnerability detection",
          tooltip:
            "Deterministic rule-based scanners run alongside LLM-driven analyses, enabling both hard guarantees and semantic reasoning for edge cases.",
          children: [
            {
              name: "Deterministic scanners",
              tooltip:
                "Source- and IR-level analyzers detect classic bugs such as reentrancy, access control bypasses, integer overflows, and DoS patterns using explicit program analysis.",
            },
            {
              name: "LLM augmentation",
              tooltip:
                "LLM scanners consume curated Solidity and ThalIR snippets via provider-agnostic prompts to surface context-aware findings that are difficult to encode as static rules.",
            },
            {
              name: "Correlation-aware results",
              tooltip:
                "Cross-validation logic boosts confidence when deterministic and LLM scanners agree while preserving separate findings when signals conflict.",
            },
          ],
        },
        {
          name: "Developer-first delivery",
          tooltip:
            "The project ships both a VSCode extension and CLI tooling so teams can integrate scanning into editors, CI pipelines, and automated workflows.",
          children: [
            {
              name: "VSCode extension",
              tooltip:
                "Marketplace extension provides inline diagnostics, a vulnerability triage panel, and rescan commands that invoke the language server in real time.",
            },
            {
              name: "CLI commands",
              tooltip:
                "The `tameshi` binary exposes scan, analyze, transform, pipeline, debug, and validate subcommands for scripted execution and IR inspection.",
            },
            {
              name: "Works on incomplete code",
              tooltip:
                "Scanners operate on syntactically parsed Solidity without requiring full compilation, enabling feedback on in-progress code.",
            },
          ],
        },
        {
          name: "Security coverage",
          tooltip:
            "25+ detectors span nine vulnerability families, covering governance, asset safety, availability, and correctness flaws encountered in production contracts.",
          children: [
            {
              name: "Reentrancy variants",
              tooltip:
                "Classic, loop-based, and cross-function reentrancy issues are flagged across source and ThalIR representations.",
            },
            {
              name: "Economic and state risks",
              tooltip:
                "Detectors catch unchecked return values, price manipulation primitives, dangerous function exposure, and unbounded state mutation.",
            },
            {
              name: "Temporal and DoS flaws",
              tooltip:
                "Modules watch for timestamp dependence, gas griefing, and call bombing patterns that can freeze funds or degrade availability.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Core Architecture ─────────────────────
    {
      name: "Core Architecture",
      tooltip:
        "Tameshi's architecture centers on the scanners crate, which orchestrates representations, deterministic analyses, LLM integrations, and correlation to produce explainable findings.",
      children: [
        {
          name: "Scanner framework",
          tooltip:
            "The scanners crate defines shared abstractions for loading representations, executing analyzers, tracking provenance, and aggregating reports.",
          children: [
            {
              name: "Scanner trait & registry",
              tooltip:
                "All detectors implement a common Scanner interface and register with ScannerRegistry so the engine can instantiate and list capabilities dynamically.",
            },
            {
              name: "Representation bundle",
              tooltip:
                "RepresentationBundle packages Solidity source metadata, parsed AST views, and ThalIR control-flow graphs so scanners can mix perspectives per finding.",
            },
            {
              name: "Analysis context",
              tooltip:
                "AnalysisContext wires contract metadata, configuration, and provenance sinks into each scan invocation, enabling consistent evidence collection.",
            },
          ],
        },
        {
          name: "ThalIR (Core Intermediate Representation)",
          tooltip:
            "ThalIR, maintained at github.com/camilaj13/ThalIR, is the canonical SSA-style intermediate representation that Tameshi consumes for precise control- and data-flow analysis.",
          children: [
            {
              name: "Purpose-built for smart contracts",
              tooltip:
                "ThalIR models Solidity-specific execution primitives—including storage slots, call contexts, and revert semantics—to preserve intent during lowering.",
            },
            {
              name: "SSA form with explicit side effects",
              tooltip:
                "Instructions operate in Static Single Assignment with effect annotations so analyzers can reason about state writes, external calls, and arithmetic operations.",
            },
            {
              name: "Extensible library ecosystem",
              tooltip:
                "Shared utilities in the ThalIR repo provide dominator tree traversal, data-flow solving, and IR serialization used directly by Tameshi scanners and debuggers.",
            },
            {
              name: "Version alignment",
              tooltip:
                "Tameshi vendors tagged ThalIR releases to ensure deterministic transforms and reproducible findings across CLI and editor integrations.",
            },
          ],
        },
        {
          name: "Deterministic scanner suite",
          tooltip:
            "Source- and IR-based scanners implement precise pattern detection with safe-pattern suppressions, confidence scoring, and deduplication heuristics.",
          children: [
            {
              name: "IR analyzers",
              tooltip:
                "ThalIR-powered scanners (reentrancy, DoS, integer overflow, price manipulation, state modification) leverage instruction-level data flow and control flow.",
            },
            {
              name: "Source analyzers",
              tooltip:
                "Source modules inspect modifiers, inheritance, loops, and call graphs to flag missing access control, unchecked arithmetic, and gas-sensitive constructs.",
            },
            {
              name: "Confidence scoring",
              tooltip:
                "SafePatternRecognizer, ConfidenceScorer, and deduplication pipelines lower false positives by discounting guarded code and merging equivalent alerts.",
            },
          ],
        },
        {
          name: "LLM subsystem",
          tooltip:
            "Feature-gated LLM scanners extract hybrid context, build structured prompts, and parse JSON responses to augment deterministic coverage with semantic reasoning.",
          children: [
            {
              name: "Extractor pipeline",
              tooltip:
                "IRExtractor, SoliditySourceExtractor, and HybridExtractor slice code into position-marked snippets and vulnerability-focused narratives for model consumption.",
            },
            {
              name: "Provider abstraction",
              tooltip:
                "LLMProvider and OpenAIProvider encapsulate API access, streaming, retries, and model selection so deployments can switch backends without code changes.",
            },
            {
              name: "Schema validation",
              tooltip:
                "Typed schemas enforce structured findings (location, severity, reasoning) to guarantee downstream tooling can parse AI responses deterministically.",
            },
          ],
        },
        {
          name: "Correlation & provenance",
          tooltip:
            "CorrelationEngine, provenance records, and severity calculators fuse results across scanners, boost confidence when signals align, and maintain audit trails.",
          children: [
            {
              name: "Cross-validation",
              tooltip:
                "Correlation strategies compare locations, patterns, and semantic fingerprints to detect overlapping findings and produce cross-validated alerts.",
            },
            {
              name: "Evidence chains",
              tooltip:
                "FindingProvenance stores evidence snippets, contributing confidence factors, and related finding relationships for explainable remediation guidance.",
            },
            {
              name: "Severity modeling",
              tooltip:
                "SeverityCalculator derives final severity and confidence from scanner metadata, correlation boosts, and contextual signals to prioritize triage.",
            },
          ],
        },
        {
          name: "CLI & tooling",
          tooltip:
            "The CLI crate wraps scanning infrastructure with user-facing commands for scanning, analysis, and IR transformation workflows.",
          children: [
            {
              name: "Scan & analyze commands",
              tooltip:
                "`tameshi scan` orchestrates deterministic scanners, while `tameshi analyze` runs the full deterministic + LLM + correlation pipeline with async execution.",
            },
            {
              name: "Transform & pipeline",
              tooltip:
                "Transform subcommands convert Solidity to ThalIR, and the pipeline mode runs end-to-end conversion with optional annotated IR output for debugging.",
            },
            {
              name: "Debug & validate",
              tooltip:
                "Debug and validate modes dump intermediate representations and check pipeline invariants for regression testing and CI hardening.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Analysis Pipeline ─────────────────────
    {
      name: "Analysis Pipeline",
      tooltip:
        "A single scan traverses intake, representation building, deterministic analysis, optional LLM passes, correlation, and report generation for actionable results.",
      children: [
        {
          name: "1. Intake & configuration",
          tooltip:
            "AnalysisRequest captures source inputs (file, memory, directory) plus scanner, LLM, correlation, output, and performance preferences.",
          children: [
            {
              name: "Scanner selection",
              tooltip:
                "Users enable deterministic or LLM scanners, include/exclude IDs, and filter by vulnerability families before execution begins.",
            },
            {
              name: "LLM + correlation settings",
              tooltip:
                "LLMConfig holds model, temperature, token limits, and debug flags, while CorrelationConfig tunes strategy thresholds and cross-validation boosts.",
            },
            {
              name: "Output controls",
              tooltip:
                "OutputConfig chooses Markdown, JSON, SARIF, or LSP formats and toggles snippet, data-flow, and remediation detail levels.",
            },
          ],
        },
        {
          name: "2. Representation build",
          tooltip:
            "Solidity source is parsed into structured metadata, AST views, and ThalIR blocks bundled inside RepresentationBundle for downstream scanners.",
          children: [
            {
              name: "Solidity source abstraction",
              tooltip:
                "SoliditySource tracks files, pragma versions, inheritance graphs, modifiers, and function metadata for source-oriented analysis.",
            },
            {
              name: "ThalIR generation",
              tooltip:
                "The transform pipeline lowers Solidity into ThalIR with control-flow blocks, dominator order traversal, and instruction semantics for IR scanners.",
            },
            {
              name: "Cranelift adapters",
              tooltip:
                "Adapters convert IR structures into analysis-friendly traits so data-flow utilities and loop analyzers can walk instructions uniformly.",
            },
          ],
        },
        {
          name: "3. Deterministic scanning",
          tooltip:
            "ScanningEngine executes registered scanners (optionally in parallel), collects findings, and runs deduplication to collapse equivalent alerts.",
          children: [
            {
              name: "Parallel execution",
              tooltip:
                "Rayon-backed parallelism runs scanners concurrently when configured, recording failures without aborting the entire scan.",
            },
            {
              name: "Deduplication",
              tooltip:
                "FindingFingerprint groups alerts by normalized location and metadata, pruning near-duplicates within a configurable line window.",
            },
            {
              name: "Contract context",
              tooltip:
                "AnalysisContext injects contract info, environment config, and optional raw source to ensure scanners share consistent provenance state.",
            },
          ],
        },
        {
          name: "4. LLM evaluation",
          tooltip:
            "When enabled, LLMScannerFactory builds provider-backed scanners that emit prompts, parse structured responses, and map reasoning back to source.",
          children: [
            {
              name: "Prompt assembly",
              tooltip:
                "PromptBuilder mixes vulnerability focus hints with extracted snippets and question templates tailored to each vulnerability family.",
            },
            {
              name: "Response parsing",
              tooltip:
                "Structured schemas deserialize model output, capturing reasoning, impacted assets, mitigation guidance, and location metadata.",
            },
            {
              name: "Timeout & retries",
              tooltip:
                "Provider configuration enforces per-request timeouts, streaming toggles, and retry policies to keep scans reliable under API variability.",
            },
          ],
        },
        {
          name: "5. Correlation & severity",
          tooltip:
            "AnalysisEngine merges deterministic and AI findings, computes performance metrics, and synthesizes summaries for reports and dashboards.",
          children: [
            {
              name: "Correlation statistics",
              tooltip:
                "CorrelationStatistics track group counts, strategy usage, and average scores so teams can audit agreement between scanner types.",
            },
            {
              name: "Cross-validation",
              tooltip:
                "CrossValidationResult notes confirmed findings and applied confidence boosts when independent scanners corroborate vulnerabilities.",
            },
            {
              name: "Performance telemetry",
              tooltip:
                "PerformanceMetrics records deterministic, LLM, and correlation durations plus scanner timing breakdowns for profiling and SLA tracking.",
            },
          ],
        },
        {
          name: "6. Reporting & export",
          tooltip:
            "ReportGenerator renders Markdown, JSON, SARIF, or LSP payloads enriched with provenance evidence and remediation guidance for downstream tooling.",
          children: [
            {
              name: "Evidence-rich output",
              tooltip:
                "Provenance metadata includes evidence types (IR sequences, data flow, LLM reasoning) and related finding relationships for explainability.",
            },
            {
              name: "Integration targets",
              tooltip:
                "SARIF feeds GitHub code scanning, JSON powers CI automation, Markdown supports human triage, and LSP responses drive editor diagnostics.",
            },
            {
              name: "Versioned metadata",
              tooltip:
                "Responses embed engine versioning, scanner configurations, and timestamps so audits can trace which rule set produced each finding.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Detection Capabilities ─────────────────────
    {
      name: "Detection Capabilities",
      tooltip:
        "Deterministic scanners cover critical vulnerability classes while sharing analysis utilities for consistent confidence and provenance output.",
      children: [
        {
          name: "Reentrancy family",
          tooltip:
            "IRReentrancyScanner and IRCrossFunctionReentrancyScanner inspect ThalIR instruction streams to detect external-call-before-state-write variants, loop reentry, and cross-function callbacks.",
          children: [
            {
              name: "Safe pattern suppression",
              tooltip:
                "Recognizes Mutex-style guards, Checks-Effects-Interactions, and known OpenZeppelin protections to avoid noisy reports.",
            },
            {
              name: "Cross-function reasoning",
              tooltip:
                "InterproceduralAnalyzer builds call graphs and summaries to connect state reads/writes across functions invoked during reentry.",
            },
          ],
        },
        {
          name: "Access control & provenance",
          tooltip:
            "Access-control scanners evaluate modifier usage, ownership checks, and privileged function exposure while tying findings to precise source spans.",
          children: [
            {
              name: "Modifier analysis",
              tooltip:
                "SourceRepresentation enumerates modifiers per function and verifies required guard patterns are present for sensitive operations.",
            },
            {
              name: "Evidence mapping",
              tooltip:
                "Provenance helpers map findings to Solidity locations, enabling actionable diagnostics inside editors and SARIF viewers.",
            },
          ],
        },
        {
          name: "Arithmetic & state safety",
          tooltip:
            "Integer overflow, unchecked arithmetic, and state modification scanners flag dangerous math and storage patterns by combining IR data flow with safe-pattern heuristics.",
          children: [
            {
              name: "Unchecked operations",
              tooltip:
                "UncheckedArithmeticScanner and IRIntegerOverflowScanner look for arithmetic executed outside Solidity's checked blocks or lacking custom guards.",
            },
            {
              name: "State mutation tracking",
              tooltip:
                "IRStateModificationScanner records storage writes following external calls, ownerless setters, and large-value transfers without caps.",
            },
          ],
        },
        {
          name: "Availability & economic risks",
          tooltip:
            "DoS, time, price manipulation, and dangerous function scanners monitor external calls, gas usage, timestamp dependence, and oracle trust boundaries.",
          children: [
            {
              name: "Gas-focused DoS",
              tooltip:
                "SourceGasLimitDoSScanner and IRDoSVulnerabilityScanner detect unbounded loops, external iteration, and gas-inefficient patterns callable by untrusted actors.",
            },
            {
              name: "Market manipulation",
              tooltip:
                "IRPriceManipulationScanner flags reliance on manipulable data sources and missing sanity checks for price feeds or liquidity-sensitive operations.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Representations & Analysis Utilities ─────────────────────
    {
      name: "Representations & Analysis Utilities",
      tooltip:
        "Supporting modules provide reusable analyses, safe-pattern knowledge, and conversion layers that power both deterministic and LLM scanners.",
      children: [
        {
          name: "Representation toolkit",
          tooltip:
            "SoliditySource, SourceRepresentation, and RepresentationBundle expose AST, CFG, modifier, and loop metadata to any scanner through unified traits.",
          children: [
            {
              name: "Visitable interfaces",
              tooltip:
                "Visitable trait abstracts traversal across representations so scanners can iterate over functions, loops, and calls without coupling to parser internals.",
            },
            {
              name: "External call catalog",
              tooltip:
                "SourceRepresentation records call sites, loop contexts, and modifier stacks, enabling targeted analyses of risky patterns.",
            },
          ],
        },
        {
          name: "Analysis utilities",
          tooltip:
            "CallGraphBuilder, LoopAnalyzer, PathExplorer, and SafePatternRecognizer offer higher-level reasoning primitives reused across vulnerability modules.",
          children: [
            {
              name: "Call graph & hooks",
              tooltip:
                "CallGraphBuilder enumerates interprocedural edges, while HookAnalyzer identifies ERC777 and NFT callbacks that influence reentrancy surfaces.",
            },
            {
              name: "Loop & path exploration",
              tooltip:
                "LoopAnalyzer models nested loops and triggers, and PathExplorer explores conditional flows to understand state-dependent vulnerability triggers.",
            },
            {
              name: "Secure pattern recognition",
              tooltip:
                "OpenZeppelinPatternRecognizer and SafePatternRecognizer recognize vetted guard constructs and reduce false positives automatically.",
            },
          ],
        },
        {
          name: "Provenance infrastructure",
          tooltip:
            "FindingProvenance, Evidence, and related metadata structures capture why a finding exists, what evidence supports it, and how confident the engine is.",
          children: [
            {
              name: "Evidence taxonomy",
              tooltip:
                "EvidenceType enumerates IR sequences, source excerpts, control/data flow, pattern matches, LLM reasoning, and symbol usage artifacts.",
            },
            {
              name: "Confidence factors",
              tooltip:
                "ConfidenceFactor entries quantify positive and negative signals, forming the score rationale surfaced to developers.",
            },
            {
              name: "Related findings",
              tooltip:
                "RelatedFinding links correlated issues (root cause, consequence, confirms) to support triage decisions across scanners.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Developer Workflow ─────────────────────
    {
      name: "Developer Workflow",
      tooltip:
        "Tooling and integrations deliver findings where engineers work and support automation across SDLC stages.",
      children: [
        {
          name: "Editor integration",
          tooltip:
            "VSCode extension exposes commands like 'Scan Current File', surfaces diagnostics inline, and renders findings inside a triage panel.",
          children: [
            {
              name: "Quick iteration",
              tooltip:
                "Inline feedback loops allow developers to rescan edited files in under a second, tightening fix-verify cycles.",
            },
            {
              name: "LLM toggle",
              tooltip:
                "Workspace settings can enable or disable LLM analysis and configure API keys for privacy-conscious environments.",
            },
          ],
        },
        {
          name: "CLI automation",
          tooltip:
            "Scripts can run `tameshi scan` over files or directories, emit SARIF for GitHub code scanning, or export JSON/Markdown for CI dashboards.",
          children: [
            {
              name: "Pipeline mode",
              tooltip:
                "Pipeline command runs Solidity→ThalIR transformation with optional annotated output, capturing contract counts and runtime for instrumentation.",
            },
            {
              name: "Validation utilities",
              tooltip:
                "Debug and validate commands print internal state and verify IR invariants, making regressions observable during development.",
            },
          ],
        },
        {
          name: "Configuration management",
          tooltip:
            "AnalysisConfig defaults enable both deterministic and LLM scanners, but teams can tailor scanner lists, performance parallelism, and dedup windows.",
          children: [
            {
              name: "Performance tuning",
              tooltip:
                "PerformanceConfig controls parallel execution, per-scanner timeouts, and caching toggles to balance throughput with resource usage.",
            },
            {
              name: "Output customization",
              tooltip:
                "Verbosity levels (quiet→debug) and snippet/data-flow toggles let teams choose between terse CI logs and rich security reports.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Testing & Quality Assurance ─────────────────────
    {
      name: "Testing & Quality Assurance",
      tooltip:
        "Regression suites validate provenance mapping, scanner accuracy, and orchestrator behavior across representative Solidity samples.",
      children: [
        {
          name: "Integration-style Solidity fixtures",
          tooltip:
            "Tests feed real contracts (vulnerable wallets, unchecked arithmetic, DoS loops) through the scanning pipeline to assert findings and locations.",
          children: [
            {
              name: "Provenance assertions",
              tooltip:
                "`test_all_scanners_provenance.rs` ensures every scanner emits evidence metadata and consistent location mapping across findings.",
            },
            {
              name: "Location validation",
              tooltip:
                "`test_location_provenance.rs` cross-checks reported file, line, and column data against Solidity fixtures to guarantee accurate diagnostics.",
            },
          ],
        },
        {
          name: "Scanner-specific coverage",
          tooltip:
            "Unit tests such as `test_unchecked_arithmetic.rs` and `test_withdraw_access_control.rs` validate individual scanners and safe-pattern suppressions.",
          children: [
            {
              name: "DoS regression",
              tooltip:
                "`test_dos_multiple_calls_locations.rs` verifies gas- and loop-based DoS detectors report all affected call sites with precise provenance.",
            },
            {
              name: "Arithmetic edge cases",
              tooltip:
                "Unchecked arithmetic fixtures ensure detectors differentiate between intentionally unchecked blocks and missing guard patterns.",
            },
          ],
        },
        {
          name: "LLM mocking",
          tooltip:
            "Mock provider implementations allow deterministic tests of prompt assembly and schema parsing without external API dependencies.",
          children: [
            {
              name: "Provider overrides",
              tooltip:
                "Mock providers simulate streaming, retries, and structured responses to validate LLM scanner behavior under controlled conditions.",
            },
            {
              name: "Schema conformance",
              tooltip:
                "Structured response tests ensure JSON outputs match expected vulnerability schemas before correlation consumes them.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Benefits ─────────────────────
    {
      name: "Benefits",
      tooltip:
        "Tameshi balances depth, speed, and explainability so security teams can scale smart contract reviews without sacrificing trust.",
      children: [
        {
          name: "Fast feedback loops",
          tooltip:
            "Parallel deterministic scanners and lightweight parsing deliver sub-second scans on typical files, supporting iterative development.",
          children: [
            {
              name: "No compilation requirement",
              tooltip:
                "Operating directly on source and IR representations avoids full compiler runs, keeping turnaround times low even for incomplete projects.",
            },
            {
              name: "Automation ready",
              tooltip:
                "CLI exports (SARIF/JSON) slot into CI/CD, GitHub code scanning, and alerting pipelines with minimal glue code.",
            },
          ],
        },
        {
          name: "Explainable security",
          tooltip:
            "Confidence factors, evidence chains, and correlation statistics show why each finding exists, enabling engineers to trust automated decisions.",
          children: [
            {
              name: "Audit trail",
              tooltip:
                "FindingProvenance logs environment, representation versions, and related findings for compliance-ready traceability.",
            },
            {
              name: "Confidence boosts",
              tooltip:
                "Cross-validation raises severity only when independent analyses agree, avoiding overconfident false positives.",
            },
          ],
        },
        {
          name: "Comprehensive coverage",
          tooltip:
            "Hybrid deterministic + LLM architecture covers both well-known vulnerability patterns and emergent behaviors beyond rigid rules.",
          children: [
            {
              name: "Extensible design",
              tooltip:
                "ScannerRegistry and modular representations make it straightforward to add new detectors or swap LLM backends as threats evolve.",
            },
            {
              name: "Correlation insights",
              tooltip:
                "Correlation reports quantify agreement between scanners, highlighting findings worthy of immediate human review.",
            },
          ],
        },
      ],
    },
  ],
};