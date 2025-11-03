export const talirdata = {
  name: "thalir",
  tooltip:
    "ThalIR is a Solidity-focused intermediate representation and tooling suite that expresses smart contracts in SSA form with explicit control-flow, storage, and context semantics for downstream security analysis, transformation, and debugging.",
  children: [
    // ───────────────────── What is ThalIR? ─────────────────────
    {
      name: "What is ThalIR?",
      tooltip:
        "ThalIR is an opinionated IR designed for Ethereum smart contracts. It normalizes Solidity programs into analysis-friendly building blocks consumed by scanners, debuggers, and compilers such as Tameshi.",
      children: [
        {
          name: "SSA-first contract IR",
          tooltip:
            "Functions are converted into Static Single Assignment form with explicit blocks, instruction streams, and typed value definitions so data flow and dominance relations are straightforward to inspect.",
          children: [
            {
              name: "Structured control flow",
              tooltip:
                "Every function is split into basic blocks with ordered predecessors, terminators, and phi-less SSA to simplify graph traversals and CFG analysis.",
            },
            {
              name: "Explicit side effects",
              tooltip:
                "State changes are encoded as instruction variants (StorageStore, MappingStore, ArrayStore, EmitEvent, ExternalCall, etc.), making stateful effects easy to locate.",
            },
            {
              name: "Typed value lattice",
              tooltip:
                "Values capture Solidity-specific primitives like storage references, memory refs, calldata pointers, msg.sender, and literal constants, preserving semantics for analysis.",
            },
          ],
        },
        {
          name: "Security-analysis orientation",
          tooltip:
            "The IR emphasizes provenance, storage access modeling, and call context so vulnerability detectors can reason about privilege, reentrancy, and state transitions.",
          children: [
            {
              name: "Contextual metadata",
              tooltip:
                "Instructions track contextual information such as call targets, gas forwarding, and revert branches enabling detectors to differentiate external interactions from internal control flow.",
            },
            {
              name: "Storage key abstraction",
              tooltip:
                "StorageKey models slots, mappings, arrays, and custom layouts to allow alias analyses and state-modification scanners to link reads and writes accurately.",
            },
            {
              name: "Cross-tool integration",
              tooltip:
                "ThalIR feeds directly into Tameshi scanners, LLM extractors, and visualization tooling while remaining standalone for other analyzers.",
            },
          ],
        },
        {
          name: "Ecosystem crates",
          tooltip:
            "The repository exposes modular crates—thalir-core, thalir-transform, thalir-emit, thalir-parser—so downstream projects can depend on only what they need.",
          children: [
            {
              name: "thalir-core",
              tooltip:
                "Core data structures for contracts, functions, instructions, values, analysis passes, serialization, and provenance helpers.",
            },
            {
              name: "thalir-transform",
              tooltip:
                "Solidity → ThalIR lowering pipeline powered by Tree-sitter parsers, bigint arithmetic, hashing, and tracing for diagnostics.",
            },
            {
              name: "thalir-emit & parser",
              tooltip:
                "Emitters format IR back to text (plain or annotated) while the pest-based parser rehydrates textual IR for round-trip testing and tooling.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Core Architecture ─────────────────────
    {
      name: "Core Architecture",
      tooltip:
        "ThalIR's architecture is organized into layered crates: core types, transformation pipeline, emitters, and parsers that together support deterministic Solidity lowering and inspection.",
      children: [
        {
          name: "thalir-core",
          tooltip:
            "Defines canonical IR entities plus utilities for analysis, serialization, and hashing.",
          children: [
            {
              name: "Contracts & functions",
              tooltip:
                "Contracts aggregate functions, constructors, fallback/receive handlers, and metadata (state variables, events, inheritance graphs). Each function carries visibility, mutability, and payable flags.",
            },
            {
              name: "Blocks & terminators",
              tooltip:
                "Blocks maintain ordered instruction lists ending with terminators (Return, Revert, Jump, Branch) capturing control flow and conditions.",
            },
            {
              name: "Instruction algebra",
              tooltip:
                "Instruction enums encode arithmetic ops, storage access, memory operations, logs, create/destroy, and Ethereum-specific opcodes with strongly typed operands.",
            },
            {
              name: "Values & references",
              tooltip:
                "Value variants represent temporaries, storage refs, memory refs, calldata slices, context variables (msg.sender, tx.origin, block.timestamp) and constant literals for precise tracking.",
            },
            {
              name: "Analysis support",
              tooltip:
                "Utilities build dominator trees, traverse CFGs, and encode reusable Pattern/Pass abstractions leveraged by detectors such as reentrancy and state mutation scans.",
            },
            {
              name: "Serialization & hashing",
              tooltip:
                "Serde-based serializers and SHA-256 hashing produce deterministic fingerprints for contracts, enabling cacheing and reproducibility across builds.",
            },
          ],
        },
        {
          name: "thalir-transform",
          tooltip:
            "Runs the Solidity → ThalIR lowering process, wrapping parsing, semantic enrichment, and IR construction in ergonomic APIs.",
          children: [
            {
              name: "Tree-sitter pipeline",
              tooltip:
                "Tree-sitter and tree-sitter-solidity-traverse parse Solidity sources into CST nodes that the transformer walks to emit structured IR events.",
            },
            {
              name: "Semantic enrichment",
              tooltip:
                "Transformation annotates AST nodes with inferred types, inheritance context, and canonical storage layout so instructions are produced with resolved types and offsets.",
            },
            {
              name: "Error reporting",
              tooltip:
                "Anyhow + thiserror-based diagnostics capture parser and lowering failures with spans, enabling CLI integrations to provide actionable feedback.",
            },
            {
              name: "Keccak-based slot math",
              tooltip:
                "tiny-keccak & num-bigint compute canonical storage keys for mappings and arrays, matching EVM slot derivations exactly.",
            },
          ],
        },
        {
          name: "thalir-emit",
          tooltip:
            "Formats IR into human-readable text for debugging, regression tests, and documentation.",
          children: [
            {
              name: "Plain emitter",
              tooltip:
                "ThalIREmitter prints minimal IR with blocks, instructions, and metadata for deterministic diffing across builds.",
            },
            {
              name: "Annotated emitter",
              tooltip:
                "AnnotatedIREmitter augments IR with inline comments (source locations, storage slots, resolved symbols) configurable through AnnotationConfig.",
            },
            {
              name: "Colorized output",
              tooltip:
                "Colored crate integration provides syntax-highlighted CLI output to improve readability when inspecting IR in terminals.",
            },
          ],
        },
        {
          name: "thalir-parser",
          tooltip:
            "Parses textual IR back into structured contracts using pest grammars for round-tripping and fuzzing workflows.",
          children: [
            {
              name: "Grammar coverage",
              tooltip:
                "Custom pest grammar mirrors emitter syntax, covering contract headers, function signatures, block labels, instruction operands, and metadata directives.",
            },
            {
              name: "Serde integration",
              tooltip:
                "Parsed IR is deserialized into thalir-core structures ready for analysis or pipeline re-entry without losing metadata.",
            },
            {
              name: "Walkdir-based loaders",
              tooltip:
                "Helper utilities traverse directories of IR artifacts, enabling batch ingestion for regression suites and CLI commands.",
            },
          ],
        },
      ],
    },

    // ───────────────────── IR Design Highlights ─────────────────────
    {
      name: "IR Design Highlights",
      tooltip:
        "ThalIR models Ethereum-specific semantics explicitly so analyzers can reason about execution context, storage, and call stacks.",
      children: [
        {
          name: "Execution context primitives",
          tooltip:
            "Dedicated instruction/value variants expose msg.sender, tx.origin, block.timestamp, block.number, and callvalue, enabling detectors to track privileged flows.",
          children: [
            {
              name: "ContextVariable enum",
              tooltip:
                "ContextVariable discriminates between caller, origin, gas price, coinbase, and other environment reads; scanners match on variants to detect auth bypasses.",
            },
            {
              name: "Call targets",
              tooltip:
                "Call instructions differentiate External addresses, Internal function references, and library dispatches allowing analyses to reason about cross-contract effects.",
            },
            {
              name: "Event emission",
              tooltip:
                "EmitEvent instructions record topic hashes and argument bindings, retaining provenance between Solidity events and IR operations.",
            },
          ],
        },
        {
          name: "State access modeling",
          tooltip:
            "Storage operations encode slot derivation, nested mapping indices, and array offsets with precise Value operands.",
          children: [
            {
              name: "StorageKey structure",
              tooltip:
                "Hierarchical representation differentiates plain slots, mapping keys (with hashed index expressions), and array indices for alias analysis.",
            },
            {
              name: "State modification catalog",
              tooltip:
                "Dedicated variants for StorageStore, MappingStore, ArrayStore, BalanceTransfer, and SelfDestruct make state writes easy to enumerate.",
            },
            {
              name: "Read tracking",
              tooltip:
                "Complementary StorageLoad, MappingLoad, and ArrayLoad instructions retain offsets and parent keys enabling scanners to relate reads and writes.",
            },
          ],
        },
        {
          name: "Control-flow expressiveness",
          tooltip:
            "ThalIR encodes structured control-flow with explicit branch terminators, revert edges, and function exit semantics.",
          children: [
            {
              name: "Branch & switch terminators",
              tooltip:
                "Conditional terminators include metadata about compared values and branch probabilities, aiding symbolic exploration and heuristics.",
            },
            {
              name: "Loop representation",
              tooltip:
                "Loops manifest as back-edges between blocks; analysis helpers mark natural loops and latch blocks for overflow and reentrancy scans.",
            },
            {
              name: "Interprocedural edges",
              tooltip:
                "Internal calls record callee function IDs enabling call-graph construction and recursion detection.",
            },
          ],
        },
        {
          name: "Metadata surfaces",
          tooltip:
            "Each instruction carries source span, contract path, and optional inline comments enabling precise diagnostics.",
          children: [
            {
              name: "Source mapping",
              tooltip:
                "Span objects capture file path, line/column offsets, and snippet hashes so downstream tools can emit accurate findings.",
            },
            {
              name: "Trace provenance",
              tooltip:
                "Provenance handles link instructions back to original AST nodes and storage declarations for auditing.",
            },
            {
              name: "Hashing & IDs",
              tooltip:
                "Stable identifiers for blocks, instructions, and values allow caching, deduplication, and deterministic serialization.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Solidity → ThalIR Pipeline ─────────────────────
    {
      name: "Solidity → ThalIR Pipeline",
      tooltip:
        "End-to-end lowering orchestrates parsing, contract assembly, IR emission, and round-trip validation.",
      children: [
        {
          name: "Parsing stage",
          tooltip:
            "Tree-sitter produces CST nodes with full lexical fidelity, ensuring even incomplete or experimental Solidity features can be traversed.",
          children: [
            {
              name: "Traverse utilities",
              tooltip:
                "tree-sitter-solidity-traverse helpers simplify walking parents/children, extracting identifiers, and mapping operator precedence.",
            },
            {
              name: "Preprocessing",
              tooltip:
                "Optional preprocessing normalizes import paths, collects pragmas, and records compiler hints consumed during lowering.",
            },
          ],
        },
        {
          name: "Lowering stage",
          tooltip:
            "Semantic builder constructs contracts, resolves inheritance, and emits SSA instructions while tracking storage layout and function signatures.",
          children: [
            {
              name: "Storage layout resolver",
              tooltip:
                "Combines declared state variables with computed slot math (Keccak hashing) to map each variable to canonical StorageKey structures.",
            },
            {
              name: "Expression lowering",
              tooltip:
                "Expression visitors create temporaries for arithmetic, boolean logic, memory ops, and builtin calls while preserving evaluation order.",
            },
            {
              name: "Control-flow builder",
              tooltip:
                "Control-flow graph builder emits blocks and terminators from Solidity statements (if/else, require/revert, loops, try/catch).",
            },
            {
              name: "Error propagation",
              tooltip:
                "Lowering captures custom errors, require strings, and revert reasons as structured values to keep revert semantics explicit.",
            },
          ],
        },
        {
          name: "Emission & validation",
          tooltip:
            "ThalIR emitters produce deterministic outputs and optionally re-parse them to ensure stability across changes.",
          children: [
            {
              name: "Round-trip tests",
              tooltip:
                "Parser + emitter loops validate that textual IR maps back to identical in-memory structures, catching formatting regressions.",
            },
            {
              name: "Annotated dumps",
              tooltip:
                "Annotated emitter overlays IR with source context, dominator ordering, and storage commentary for debugging transformations.",
            },
            {
              name: "Version pinning",
              tooltip:
                "Downstream clients (e.g., Tameshi) pin semver releases ensuring pipeline determinism and reproducible findings.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Analysis & Tooling ─────────────────────
    {
      name: "Analysis & Tooling",
      tooltip:
        "ThalIR ships helper APIs, passes, and integrations that empower static analyzers, LLM pipelines, and debugging tools.",
      children: [
        {
          name: "Analysis passes",
          tooltip:
            "Pattern and Pass traits let consumers register reusable analyses—dominance, reachability, data-flow—that operate uniformly across contracts.",
          children: [
            {
              name: "Reentrancy helpers",
              tooltip:
                "Utilities track external calls, state writes, and follow-up control flow so detectors can flag call-before-state-write sequences.",
            },
            {
              name: "State modification tracking",
              tooltip:
                "Iterators expose StorageKey reads/writes for audits, enabling detectors to diff mutated state within functions or across call graphs.",
            },
            {
              name: "Loop detection",
              tooltip:
                "Loop-finding helpers compute strongly connected components and latch blocks used in overflow and DoS analyses.",
            },
          ],
        },
        {
          name: "LLM integration",
          tooltip:
            "IR extractors format ThalIR snippets with source mappings for prompt engineering, allowing language models to reason about contract behavior.",
          children: [
            {
              name: "Position-marked formatter",
              tooltip:
                "Formatters annotate each instruction with block IDs, indices, and source lines so prompts can reference precise code locations.",
            },
            {
              name: "Selective emission",
              tooltip:
                "APIs allow slicing IR to specific functions or blocks to keep prompts concise while preserving necessary context.",
            },
          ],
        },
        {
          name: "Debugging utilities",
          tooltip:
            "CLI integrations expose inspect, explain, and diff commands to analyze IR outputs during development.",
          children: [
            {
              name: "Instruction pretty-printers",
              tooltip:
                "Helper functions format instructions, values, and terminators for logging and debugging within CLI tools.",
            },
            {
              name: "CFG visualization hooks",
              tooltip:
                "Contracts can be exported into graph-friendly formats (e.g., DOT) enabling visualization of control-flow for manual audits.",
            },
            {
              name: "Source provenance queries",
              tooltip:
                "APIs map IR instructions back to Solidity spans enabling integration with IDE diagnostics and test harnesses.",
            },
          ],
        },
        {
          name: "Interoperability",
          tooltip:
            "ThalIR artifacts can be serialized to JSON or textual formats enabling ingestion by other languages and pipelines.",
          children: [
            {
              name: "Serde-friendly schema",
              tooltip:
                "Contracts, functions, and instructions derive Serialize/Deserialize so they can be saved to disk or transmitted over RPC.",
            },
            {
              name: "Cranelift bridges",
              tooltip:
                "Cranelift dependencies allow translation to lower-level representations for experimentation with alternative backends.",
            },
            {
              name: "Versioned metadata",
              tooltip:
                "Artifacts embed version info and build metadata enabling consumers to verify compatibility before processing.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Developer Workflow ─────────────────────
    {
      name: "Developer Workflow",
      tooltip:
        "The project provides commands, libraries, and conventions that streamline extending or consuming ThalIR.",
      children: [
        {
          name: "CLI & scripts",
          tooltip:
            "Consumers invoke transform, emit, and validate commands (surfaced via Tameshi CLI) to generate IR, inspect output, and run sanity checks.",
          children: [
            {
              name: "Transform commands",
              tooltip:
                "`transform_solidity_to_ir` and filename-aware variants convert Solidity sources into IR contracts returning Vec<Contract> for further processing.",
            },
            {
              name: "Annotated dumps",
              tooltip:
                "CLI flags select annotated emission (showing spans, storage keys, control-flow ordering) for debugging complex cases.",
            },
            {
              name: "Validation mode",
              tooltip:
                "Round-trip validator parses emitted IR again, surfacing parser discrepancies or formatting drift before publishing releases.",
            },
          ],
        },
        {
          name: "Extending the IR",
          tooltip:
            "Contributors add new instructions, value types, or metadata while maintaining compatibility guarantees enforced through tests and serialization checks.",
          children: [
            {
              name: "Instruction evolution",
              tooltip:
                "New variants require updating enums, visitor match arms, emitters, parser grammar, and serializer implementations in lockstep.",
            },
            {
              name: "Analysis hooks",
              tooltip:
                "Reusable traits (InstructionVisitor, Pass) allow hooking new passes without modifying existing consumers.",
            },
            {
              name: "Release cadence",
              tooltip:
                "Semantic versioning communicates breaking changes; Tameshi pins versions to ensure scanners update intentionally.",
            },
          ],
        },
        {
          name: "Documentation & examples",
          tooltip:
            "Repository examples showcase Solidity snippets alongside generated IR, illustrating how constructs map to instructions.",
          children: [
            {
              name: "Cookbook samples",
              tooltip:
                "Annotated IR samples demonstrate mappings for modifiers, fallback functions, events, libraries, and inheritance.",
            },
            {
              name: "Design notes",
              tooltip:
                "Docs explain SSA choices, storage modeling, and analysis-oriented constraints to guide new contributors.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Testing & Quality Assurance ─────────────────────
    {
      name: "Testing & Quality Assurance",
      tooltip:
        "ThalIR includes extensive test coverage spanning unit, integration, round-trip, and property-based suites to guarantee deterministic IR output.",
      children: [
        {
          name: "Unit tests",
          tooltip:
            "Crate-level unit tests validate individual components—storage key computation, instruction formatting, parser rules, and error messages.",
          children: [
            {
              name: "Storage hashing checks",
              tooltip:
                "Tests confirm Keccak computations for mapping and array slots produce expected values for representative indices.",
            },
            {
              name: "Instruction serialization",
              tooltip:
                "serde_json snapshots assert stable encoding/decoding of instructions, values, and contracts.",
            },
            {
              name: "Parser grammars",
              tooltip:
                "pest-based tests feed canonical IR snippets to ensure grammar changes don\'t break backwards compatibility.",
            },
          ],
        },
        {
          name: "Integration tests",
          tooltip:
            "End-to-end tests feed Solidity fixtures through transform → emit → parse to verify deterministic round trips and metadata preservation.",
          children: [
            {
              name: "Fixture corpus",
              tooltip:
                "Curated Solidity contracts (ERC standards, governance modules, DeFi primitives) detect regressions in lowering semantics.",
            },
            {
              name: "Annotated comparisons",
              tooltip:
                "Annotated emitter outputs are diffed across versions ensuring metadata (spans, slots) remains consistent.",
            },
            {
              name: "CLI smoke tests",
              tooltip:
                "Command-line workflows (transform, emit, validate) run in CI to guarantee packaging and binary integration stay functional.",
            },
          ],
        },
        {
          name: "Property-based & fuzzing",
          tooltip:
            "Fuzz harnesses randomly generate Solidity ASTs or IR sequences to stress parser/transformer resilience and detect panics.",
          children: [
            {
              name: "Tree-sitter fuzzers",
              tooltip:
                "Random syntax trees exercise corner cases in the traversal pipeline, catching panic-inducing node assumptions.",
            },
            {
              name: "IR round-trip fuzzing",
              tooltip:
                "Generated IR graphs are emitted and parsed repeatedly to ensure idempotence under varied block structures and instruction mixes.",
            },
          ],
        },
        {
          name: "Continuous integration",
          tooltip:
            "GitHub Actions run cargo fmt, clippy, and multi-crate test suites across stable/nightly toolchains ensuring cross-platform determinism.",
          children: [
            {
              name: "MSRV enforcement",
              tooltip:
                "CI validates the minimum supported Rust version so downstream consumers know compatible toolchains.",
            },
            {
              name: "Crate publishing checks",
              tooltip:
                "dry-run publish steps ensure Cargo manifests, feature flags, and docs are valid before releasing.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Benefits ─────────────────────
    {
      name: "Benefits",
      tooltip:
        "ThalIR delivers deterministic, security-aware representations that streamline vulnerability detection and developer tooling.",
      children: [
        {
          name: "Deterministic analysis surface",
          tooltip:
            "Explicit SSA instructions with stable serialization make it easy to diff IR across revisions and reproduce analysis results.",
          children: [
            {
              name: "Stable hashing",
              tooltip:
                "Content-addressable fingerprints allow caching, deduplicating, and memoizing expensive analyses across CI runs.",
            },
            {
              name: "Predictable output",
              tooltip:
                "Tree-sitter-based parsing avoids compiler heuristics, producing consistent IR even for partially valid Solidity.",
            },
          ],
        },
        {
          name: "Security insight",
          tooltip:
            "Fine-grained modeling of storage, calls, and context enables sophisticated detectors for reentrancy, auth bypass, DoS, and financial risks.",
          children: [
            {
              name: "Precise provenance",
              tooltip:
                "Metadata ensures findings reference exact Solidity spans, improving developer trust and remediation speed.",
            },
            {
              name: "Cross-tool synergy",
              tooltip:
                "Shared IR lets deterministic analyzers, LLM scanners, and visualization tools operate on a common substrate.",
            },
          ],
        },
        {
          name: "Extensibility",
          tooltip:
            "Modular crates and visitor patterns make it straightforward to add new instructions, passes, or emitters without disrupting consumers.",
          children: [
            {
              name: "Language evolution",
              tooltip:
                "Solidity feature updates only require localized transformer + grammar extensions, keeping the overall architecture stable.",
            },
            {
              name: "Backend experimentation",
              tooltip:
                "Cranelift integration enables experimenting with alternative code generation or symbolic execution pipelines on top of the IR.",
            },
          ],
        },
        {
          name: "Tooling enablement",
          tooltip:
            "Readable emitters and JSON serialization accelerate building IDE plugins, dashboards, and CI bots around ThalIR artifacts.",
          children: [
            {
              name: "Editor integrations",
              tooltip:
                "Extensions can show annotated IR, step through instructions, and surface cross-references between source and IR.",
            },
            {
              name: "Automation friendly",
              tooltip:
                "Permissionless emission + parsing means automation bots can diff IR snapshots, enforce invariants, or auto-file issues in pipelines.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Technical Details ─────────────────────
    {
      name: "Technical Details",
      tooltip:
        "Implementation details highlight dependencies, performance strategies, and design conventions used throughout the ThalIR project.",
      children: [
        {
          name: "Dependency stack",
          tooltip:
            "Relies on Tree-sitter for parsing, Pest for IR grammar, num-bigint for wide integers, chrono for timestamp metadata, and tiny-keccak/sha2 for hashing.",
          children: [
            {
              name: "Cranelift integration",
              tooltip:
                "Cranelift crates support potential lowering of IR into executable representations or further analysis via the Cranelift ecosystem.",
            },
            {
              name: "Tracing instrumentation",
              tooltip:
                "Tracing crate hooks emit structured events during transformation for debugging and performance measurement.",
            },
          ],
        },
        {
          name: "Performance considerations",
          tooltip:
            "Transformer caches intermediate computations, uses arena-like entity indices, and leverages indexmap for deterministic iteration order.",
          children: [
            {
              name: "Entity indices",
              tooltip:
                "Cranelift-entity style arenas assign compact indices to blocks, instructions, and values, reducing allocation churn.",
            },
            {
              name: "Deterministic iteration",
              tooltip:
                "IndexMap maintains insertion order while providing hash-map semantics, ensuring stable emission across runs.",
            },
          ],
        },
        {
          name: "Error handling",
          tooltip:
            "Anyhow + thiserror wrap parser and transformer failures with rich context; errors propagate spans so IDEs can surface them inline.",
          children: [
            {
              name: "Diagnostic layering",
              tooltip:
                "Errors capture root causes (parse failure, unsupported construct) plus remediation hints for developers.",
            },
            {
              name: "Graceful degradation",
              tooltip:
                "Transformer emits partial IR when possible, flagging missing sections but still allowing tools to inspect available context.",
            },
          ],
        },
        {
          name: "Versioning & publishing",
          tooltip:
            "Crates publish to crates.io with synchronized versions; changelogs document IR additions, breaking changes, and new analysis helpers.",
          children: [
            {
              name: "Feature flags",
              tooltip:
                "Optional cargo features toggle heavy dependencies (e.g., annotated emitter, experimental analyses) for consumers that want minimal footprints.",
            },
            {
              name: "Release automation",
              tooltip:
                "CI pipelines verify docs, run tests, and perform `cargo publish --dry-run` before tagging new versions consumed by Tameshi and other tools.",
            },
          ],
        },
      ],
    },
  ],
};
