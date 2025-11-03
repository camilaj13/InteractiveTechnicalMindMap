// src/canonGuardData.ts
export const canonguarddata = {
  name: "Canon Guard",
  tooltip:
    "Canon Guard is a guard contract for Gnosis Safe that eliminates off-chain coordination by enforcing on-chain transaction approval and dynamic timelocks. It introduces Action Builders and Hubs that can be pre-approved to create fast and slow execution paths, reducing cognitive fatigue for routine transactions while maintaining security through time buffers.",
  children: [
    // ───────────────────── What is Canon Guard? ─────────────────────
    {
      name: "What is Canon Guard?",
      tooltip:
        "Canon Guard is a guard contract that extends an existing Gnosis Safe's behavior, not a new Safe itself. It enforces that all Safe transactions go through a structured workflow with timelocks and pre-approval mechanisms.",
      children: [
        {
          name: "Guard for Gnosis Safe",
          tooltip:
            "Canon Guard is installed as a guard on an existing Gnosis Safe, extending its capabilities.",
          children: [
            {
              name: "Extends Safe behavior",
              tooltip:
                "Canon Guard sits on top of an existing Safe multisig, routing all transactions through its approval and timelock system via the guard mechanism.",
            },
            {
              name: "Not a new Safe",
              tooltip:
                "Canon Guard does not replace your Safe - it enhances it. Your existing Safe signers and threshold remain unchanged.",
            },
          ],
        },
        {
          name: "Core innovation: Pre-approved transaction patterns",
          tooltip:
            "Action Builders define reusable transaction patterns that can be pre-approved to reduce verification overhead.",
          children: [
            {
              name: "Action Builders",
              tooltip:
                "Smart contracts that encode specific transaction patterns (e.g., SimpleActions, CappedTokenTransfers, token staking). Each builder's getActions() method returns the exact transactions to execute.",
            },
            {
              name: "Action Hubs",
              tooltip:
                "Container contracts that manage collections of related Action Builders. Approving a hub pre-approves all its children, enabling modular governance.",
            },
            {
              name: "Pre-approval reduces cognitive load",
              tooltip:
                "By pre-approving specific Action Builders or Hubs, signers don't need to verify every routine transaction's calldata - they only verify the pattern once during approval.",
            },
          ],
        },
        {
          name: "Eliminates off-chain coordination",
          tooltip: "All proposal, approval, and execution logic is on-chain.",
          children: [
            {
              name: "No off-chain signatures",
              tooltip:
                "Signers approve transaction hashes directly on-chain using the Safe's approveHash function, eliminating the need for signature collection and relay infrastructure.",
            },
            {
              name: "On-chain transaction queue",
              tooltip:
                "Proposed transactions are queued on-chain with full visibility of their actions, timelock status, and expiry.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Core Architecture ─────────────────────
    {
      name: "Core Architecture",
      tooltip:
        "Canon Guard's architecture centers on the guard contract, Action Builders, Action Hubs, and the timelock execution system.",
      children: [
        {
          name: "CanonGuard (Main Contract)",
          tooltip:
            "The guard contract that Safe transactions must pass through.",
          children: [
            {
              name: "Transaction queue management",
              tooltip:
                "Maintains a queue of proposed transactions with their Action Builder addresses, proposer, execution timestamps, and pre-approval status.",
            },
            {
              name: "Timelock enforcement",
              tooltip:
                "Enforces SHORT_TX_EXECUTION_DELAY for pre-approved actions and LONG_TX_EXECUTION_DELAY for non-approved actions before execution is allowed.",
            },
            {
              name: "Approval tracking",
              tooltip:
                "Tracks which Action Builders and Hubs are pre-approved, with configurable expiry timestamps to ensure approvals don't last indefinitely.",
            },
            {
              name: "Safe execution integration",
              tooltip:
                "Builds Safe-compatible transactions using MultiSendCallOnly and approved-hash signatures, executing batched actions atomically.",
            },
          ],
        },
        {
          name: "Action Builders",
          tooltip: "Contracts that define specific transaction patterns.",
          children: [
            {
              name: "SimpleActions",
              tooltip:
                "General-purpose Action Builder for executing arbitrary contract calls with specified targets, signatures, calldata, and values.",
            },
            {
              name: "CappedTokenTransfers",
              tooltip:
                "Specialized Action Builder for ERC20 token transfers with amount caps, working with CappedTokenTransfersHub to enforce periodic limits.",
            },
            {
              name: "SimpleTransfers",
              tooltip:
                "Action Builder for simple ETH or token transfers to specified recipients.",
            },
            {
              name: "Governance-specific builders",
              tooltip:
                "Specialized builders for meta-governance: ApproveAction, DisapproveAction, SetGuardAction, SetEmergencyTriggerAction, and more.",
            },
            {
              name: "Custom builders",
              tooltip:
                "Protocol-specific builders like EverclearTokenStake, EverclearTokenConversion, OPxAction that encode domain-specific transaction logic.",
            },
          ],
        },
        {
          name: "Action Hubs",
          tooltip:
            "Container contracts for managing collections of Action Builders.",
          children: [
            {
              name: "Parent-child relationship",
              tooltip:
                "Hubs act as parents to multiple Action Builders. When a hub is pre-approved, all its children inherit that approval status.",
            },
            {
              name: "CappedTokenTransfersHub",
              tooltip:
                "Example hub that manages state for capped token transfers, enforcing time-based spending limits across multiple transfer actions.",
            },
            {
              name: "Deterministic deployment",
              tooltip:
                "Hubs use CREATE3 to deploy child Action Builders with deterministic addresses, ensuring predictable contract addresses across chains.",
            },
          ],
        },
        {
          name: "Supporting contracts",
          tooltip:
            "Additional contracts that provide safety and integration features.",
          children: [
            {
              name: "OnlyCanonGuard",
              tooltip:
                "Guard contract that can be set on the Safe to ensure all transactions route through CanonGuard, preventing bypass attacks.",
            },
            {
              name: "EmergencyModeHook",
              tooltip:
                "Safety mechanism allowing designated emergency trigger addresses to pause CanonGuard operations in crisis scenarios.",
            },
            {
              name: "SafeManageable",
              tooltip:
                "Base contract providing Safe integration utilities and access control modifiers (isSafe, isSafeOwner).",
            },
          ],
        },
      ],
    },

    // ───────────────────── Fast vs Slow Paths ─────────────────────
    {
      name: "Fast vs Slow Execution Paths",
      tooltip:
        "Pre-approval determines whether a transaction takes the fast path (short delay) or slow path (long delay).",
      children: [
        {
          name: "Fast path (pre-approved)",
          tooltip:
            "Pre-approved Action Builders or Hubs execute with SHORT_TX_EXECUTION_DELAY.",
          children: [
            {
              name: "Pre-approval mechanism",
              tooltip:
                "The Safe calls CanonGuard.approveActionsBuilderOrHub() to pre-approve a specific Action Builder or Hub for a configured duration.",
            },
            {
              name: "Reduced timelock",
              tooltip:
                "Pre-approved transactions wait only SHORT_TX_EXECUTION_DELAY (e.g., 1 hour) before execution, enabling faster routine operations.",
            },
            {
              name: "Lower cognitive burden",
              tooltip:
                "Signers have already vetted the transaction pattern during pre-approval, so they don't need to scrutinize every instance's calldata.",
            },
            {
              name: "Use cases",
              tooltip:
                "Regular token transfers, recurring payments, routine protocol interactions that follow established patterns.",
            },
          ],
        },
        {
          name: "Slow path (not pre-approved)",
          tooltip:
            "Non-approved Action Builders execute with LONG_TX_EXECUTION_DELAY.",
          children: [
            {
              name: "No pre-approval",
              tooltip:
                "Any Action Builder that hasn't been pre-approved automatically uses the slow path with extended timelock.",
            },
            {
              name: "Extended timelock",
              tooltip:
                "Non-approved transactions wait LONG_TX_EXECUTION_DELAY (e.g., 7 days) before execution, providing maximum safety buffer for novel or high-risk operations.",
            },
            {
              name: "Full verification required",
              tooltip:
                "Signers must carefully review all transaction details and calldata before approving the transaction hash.",
            },
            {
              name: "Use cases",
              tooltip:
                "One-off transactions, new protocol interactions, governance proposals, emergency actions, or any operation not fitting a pre-approved pattern.",
            },
          ],
        },
        {
          name: "Security model",
          tooltip:
            "The dual-path approach balances operational efficiency with security.",
          children: [
            {
              name: "Time-based safety",
              tooltip:
                "Even fast-path transactions have mandatory delays, providing monitoring time to detect anomalies or malicious proposals.",
            },
            {
              name: "Flexible risk management",
              tooltip:
                "Teams can tune SHORT_TX_EXECUTION_DELAY and LONG_TX_EXECUTION_DELAY based on their risk tolerance and operational needs.",
            },
            {
              name: "Expiring approvals",
              tooltip:
                "Pre-approvals expire after MAX_APPROVAL_DURATION, requiring periodic renewal to ensure continued governance oversight.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Transaction Lifecycle ─────────────────────
    {
      name: "Transaction Lifecycle",
      tooltip:
        "Transactions flow through a structured lifecycle: queue → approve → wait → execute.",
      children: [
        {
          name: "1. Queue Transaction",
          tooltip:
            "A Safe owner proposes a transaction by queueing an Action Builder.",
          children: [
            {
              name: "Call queueTransaction()",
              tooltip:
                "Any Safe owner calls CanonGuard.queueTransaction(actionBuilderAddress). The guard fetches actions from the builder and stores them on-chain.",
            },
            {
              name: "Determine execution path",
              tooltip:
                "CanonGuard checks if the Action Builder (or its parent Hub) is pre-approved. This determines whether SHORT or LONG delay applies.",
            },
            {
              name: "Set timelock and expiry",
              tooltip:
                "The transaction's executableAt timestamp is set to block.timestamp + delay. An expiry timestamp (executableAt + TX_EXPIRY_DELAY) prevents stale transactions.",
            },
            {
              name: "Emit event",
              tooltip:
                "TransactionQueued event is emitted with proposer, Action Builder address, parent hub (if any), and pre-approval status for indexers and UIs.",
            },
          ],
        },
        {
          name: "2. Approve Transaction Hash",
          tooltip:
            "Safe owners approve the transaction on-chain using Safe's approveHash.",
          children: [
            {
              name: "Get transaction hash",
              tooltip:
                "Anyone can call CanonGuard.getSafeTransactionHash(actionBuilder) to retrieve the Safe transaction hash for the queued transaction.",
            },
            {
              name: "Owners approve hash",
              tooltip:
                "Safe owners call Safe.approveHash(txHash) on-chain. No off-chain signature collection needed - all approvals are transparent and verifiable.",
            },
            {
              name: "Reach threshold",
              tooltip:
                "Once the Safe's signature threshold is reached (e.g., 3 of 5 owners), the transaction is ready for execution after the timelock.",
            },
          ],
        },
        {
          name: "3. Wait for Timelock",
          tooltip: "Mandatory delay provides monitoring and reaction time.",
          children: [
            {
              name: "Delay enforcement",
              tooltip:
                "CanonGuard prevents execution until block.timestamp >= executableAt. No one can bypass this delay, even with full signer approval.",
            },
            {
              name: "Monitoring window",
              tooltip:
                "During the delay, monitoring bots, governance participants, and stakeholders can review the queued transaction and raise alerts if malicious.",
            },
            {
              name: "Cancellation option",
              tooltip:
                "The transaction proposer (or any owner in emergency mode) can call cancelEnqueuedTransaction() to remove it from the queue before execution.",
            },
          ],
        },
        {
          name: "4. Execute Transaction",
          tooltip: "After the timelock expires, anyone can trigger execution.",
          children: [
            {
              name: "Call executeTransaction()",
              tooltip:
                "Anyone (not just owners) can call CanonGuard.executeTransaction(actionBuilder) after executableAt, enabling permissionless execution bots.",
            },
            {
              name: "Verify signatures and timing",
              tooltip:
                "CanonGuard verifies that: (1) executableAt has passed, (2) expiresAt hasn't passed, (3) sufficient owners approved the hash.",
            },
            {
              name: "Safe execution",
              tooltip:
                "CanonGuard builds MultiSendCallOnly calldata from the Action Builder's actions and calls Safe.execTransaction() with approved-hash signatures.",
            },
            {
              name: "Clean up",
              tooltip:
                "The transaction is removed from the queue and storage is cleared. TransactionExecuted event is emitted with full details for auditability.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Key Features ─────────────────────
    {
      name: "Key Features",
      tooltip:
        "Canon Guard introduces several features that improve multisig security, transparency, and operational efficiency.",
      children: [
        {
          name: "Dynamic timelocks",
          tooltip:
            "Context-aware delays based on transaction risk and pre-approval status.",
          children: [
            {
              name: "Risk-based delays",
              tooltip:
                "Pre-approved patterns use SHORT delay; unknown patterns use LONG delay. This enables fast routine ops while maintaining safety for novel transactions.",
            },
            {
              name: "Configurable parameters",
              tooltip:
                "Each CanonGuard deployment sets its own SHORT_TX_EXECUTION_DELAY, LONG_TX_EXECUTION_DELAY, TX_EXPIRY_DELAY, and MAX_APPROVAL_DURATION.",
            },
          ],
        },
        {
          name: "On-chain transaction proposals",
          tooltip:
            "All transaction details are stored on-chain, not in off-chain databases.",
          children: [
            {
              name: "Full calldata visibility",
              tooltip:
                "Action Builder actions (target, data, value) are stored in CanonGuard's transactionsInfo mapping, fully visible to anyone querying the chain.",
            },
            {
              name: "No reliance on external services",
              tooltip:
                "Unlike traditional Safe workflows that use off-chain APIs to store proposals, Canon Guard stores everything on-chain with no external dependencies.",
            },
          ],
        },
        {
          name: "Approved-hash signatures",
          tooltip:
            "Uses Safe's native on-chain approval mechanism instead of collecting ECDSA signatures.",
          children: [
            {
              name: "On-chain approvals only",
              tooltip:
                "Signers approve transaction hashes directly on-chain via Safe.approveHash(), eliminating the need to collect and relay off-chain signatures.",
            },
            {
              name: "Transparent voting",
              tooltip:
                "Anyone can query Safe.approvedHashes(owner, txHash) to see which owners have approved, providing real-time governance visibility.",
            },
          ],
        },
        {
          name: "Emergency controls",
          tooltip: "Safety mechanisms for crisis scenarios.",
          children: [
            {
              name: "Emergency mode",
              tooltip:
                "Designated emergency trigger can activate emergency mode, pausing all CanonGuard executions and allowing any owner to cancel queued transactions.",
            },
            {
              name: "Transaction cancellation",
              tooltip:
                "Proposers can cancel their queued transactions if they haven't been approved yet, preventing accidental or outdated proposals from executing.",
            },
          ],
        },
        {
          name: "Batch execution",
          tooltip: "Execute multiple queued transactions atomically.",
          children: [
            {
              name: "executeTransactions()",
              tooltip:
                "CanonGuard supports executing multiple queued Action Builders in a single transaction, useful for coordinated multi-step operations.",
            },
            {
              name: "Atomic batches",
              tooltip:
                "All actions in a batch execute or revert together, ensuring consistent state transitions across complex governance operations.",
            },
          ],
        },
        {
          name: "Factory pattern for deterministic deployment",
          tooltip:
            "CREATE3-based factories for predictable contract addresses.",
          children: [
            {
              name: "Cross-chain address consistency",
              tooltip:
                "Using CREATE3, Action Builders and Hubs can have identical addresses across different chains, simplifying multi-chain governance.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Setup & Usage ─────────────────────
    {
      name: "Setup & Usage",
      tooltip:
        "How to install Canon Guard on your Safe and interact with it. Use the canon-guard-scripts repository for setup and operations.",
      children: [
        {
          name: "Installation",
          tooltip: "Deploy and configure Canon Guard for your Safe.",
          children: [
            {
              name: "Prerequisites",
              tooltip:
                "You need an existing Gnosis Safe deployment. Canon Guard does not create a new Safe - it extends your existing one.",
            },
            {
              name: "Deploy CanonGuard",
              tooltip:
                "Deploy the CanonGuard contract with your Safe's address and chosen timelock parameters (shortDelay, longDelay, expiryDelay, maxApprovalDuration).",
            },
            {
              name: "Set guard on Safe",
              tooltip:
                "Execute a Safe transaction calling Safe.setGuard(canonGuardAddress) to install the guard. After this, all Safe transactions must go through CanonGuard.",
            },
            {
              name: "Optional: Install OnlyCanonGuard",
              tooltip:
                "For maximum security, also set OnlyCanonGuard as the Safe's guard to prevent anyone from removing or bypassing the CanonGuard.",
            },
          ],
        },
        {
          name: "Using canon-guard-scripts",
          tooltip:
            "The canon-guard-scripts repository provides scripts for interacting with Canon Guard.",
          children: [
            {
              name: "Setup scripts",
              tooltip:
                "Scripts to deploy CanonGuard, configure initial parameters, set up emergency controls, and install the guard on your Safe.",
            },
            {
              name: "Proposal scripts",
              tooltip:
                "Scripts to deploy Action Builders, queue transactions, and retrieve transaction hashes for approval.",
            },
            {
              name: "Action and Hub management",
              tooltip:
                "Scripts to pre-approve Action Builders or Hubs, check approval status, and manage expiry timestamps.",
            },
            {
              name: "Execution scripts",
              tooltip:
                "Scripts to execute queued transactions once timelocks expire, including batch execution support.",
            },
            {
              name: "Repository reference",
              tooltip:
                "Find the canon-guard-scripts repository in the Canon Guard GitHub organization for complete setup and usage examples.",
            },
          ],
        },
        {
          name: "Workflow example",
          tooltip: "Typical workflow for using Canon Guard.",
          children: [
            {
              name: "1. Pre-approve common patterns",
              tooltip:
                "Deploy Action Builders for routine operations (e.g., CappedTokenTransfers for payroll). Queue a transaction to approve these builders via CanonGuard.approveActionsBuilderOrHub().",
            },
            {
              name: "2. Propose a transaction",
              tooltip:
                "Deploy an Action Builder encoding your desired transaction. Call CanonGuard.queueTransaction(builderAddress) to propose it.",
            },
            {
              name: "3. Approve on-chain",
              tooltip:
                "Safe owners call Safe.approveHash(txHash) until the threshold is reached. Use CanonGuard.getSafeTransactionHash() to get the correct hash.",
            },
            {
              name: "4. Wait and execute",
              tooltip:
                "Wait for the timelock (short or long depending on pre-approval). After executableAt, anyone calls CanonGuard.executeTransaction(builderAddress).",
            },
          ],
        },
      ],
    },

    // ───────────────────── Testing & Quality Assurance ─────────────────────
    {
      name: "Testing & Quality Assurance",
      tooltip:
        "Canon Guard includes comprehensive test suites covering unit tests, integration tests, invariant testing, and symbolic execution.",
      children: [
        {
          name: "Test architecture",
          tooltip:
            "Multi-layered testing strategy for correctness and security.",
          children: [
            {
              name: "Unit tests",
              tooltip:
                "Isolated tests using Foundry's forge test framework, structured with .tree files (bulloak specification). Cover individual contract methods and edge cases.",
            },
            {
              name: "Integration tests",
              tooltip:
                "Fork-based tests on Ethereum and Optimism mainnet, verifying Canon Guard integrates correctly with real Safe deployments and token contracts.",
            },
            {
              name: "Invariant tests (fuzzing)",
              tooltip:
                "Medusa fuzzer runs property-based tests to verify system invariants hold across arbitrary transaction sequences and state transitions.",
            },
            {
              name: "Symbolic execution",
              tooltip:
                "Halmos symbolic execution tests explore all possible execution paths, uncovering subtle bugs unreachable by traditional fuzzing.",
            },
          ],
        },
        {
          name: "What the tests cover",
          tooltip:
            "Specific areas of functionality verified by the test suite.",
          children: [
            {
              name: "Action Builder correctness",
              tooltip:
                "Tests verify each Action Builder (SimpleActions, CappedTokenTransfers, governance actions) produces correct calldata and follows expected behavior.",
            },
            {
              name: "Hub management",
              tooltip:
                "Tests verify Action Hubs correctly track children, pre-approval propagates to children, and CREATE3 deployments are deterministic.",
            },
            {
              name: "Timelock enforcement",
              tooltip:
                "Tests verify transactions cannot execute before executableAt, expire after expiresAt, and correctly distinguish between short and long delays.",
            },
            {
              name: "Pre-approval mechanism",
              tooltip:
                "Tests verify pre-approval status is correctly determined, expiries are enforced, and fast/slow paths are chosen appropriately.",
            },
            {
              name: "Safe integration",
              tooltip:
                "Tests verify CanonGuard builds correct MultiSendCallOnly calldata, constructs valid approved-hash signatures, and executes transactions via Safe.execTransaction().",
            },
            {
              name: "Emergency controls",
              tooltip:
                "Tests verify emergency mode pauses execution, allows cancellation by any owner, and can be triggered only by authorized addresses.",
            },
            {
              name: "Access control",
              tooltip:
                "Tests verify only Safe owners can queue transactions, only the Safe can approve builders, and only authorized callers can trigger emergency mode.",
            },
          ],
        },
        {
          name: "Running tests",
          tooltip: "Commands to execute the test suite.",
          children: [
            {
              name: "yarn test",
              tooltip:
                "Runs all tests (unit + integration) using Foundry's forge test.",
            },
            {
              name: "yarn test:unit",
              tooltip:
                "Runs only unit tests, isolated from external blockchain state.",
            },
            {
              name: "yarn test:integration",
              tooltip:
                "Runs integration tests on forked Ethereum and Optimism networks.",
            },
            {
              name: "yarn test:fuzz",
              tooltip:
                "Launches Medusa fuzzing campaign for invariant testing (requires Medusa installed).",
            },
            {
              name: "yarn test:symbolic",
              tooltip:
                "Runs symbolic execution tests via Halmos (requires Halmos installed).",
            },
            {
              name: "yarn coverage",
              tooltip:
                "Generates code coverage report showing which lines are tested.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Benefits ─────────────────────
    {
      name: "Benefits",
      tooltip:
        "Why use Canon Guard? Key advantages for multisig security, transparency, and operational efficiency.",
      children: [
        {
          name: "Eliminates off-chain dependencies",
          tooltip:
            "No reliance on external APIs or signature relay infrastructure.",
          children: [
            {
              name: "No off-chain databases",
              tooltip:
                "Traditional Safe workflows rely on Safe Transaction Service API to store proposals. Canon Guard stores everything on-chain.",
            },
            {
              name: "No signature collection",
              tooltip:
                "No need to collect ECDSA signatures from signers and relay them. All approvals happen on-chain via Safe.approveHash().",
            },
            {
              name: "Resilient to infrastructure failures",
              tooltip:
                "If Safe's API goes down, traditional workflows break. Canon Guard continues working with just blockchain RPC access.",
            },
          ],
        },
        {
          name: "Reduces cognitive fatigue",
          tooltip:
            "Signers don't need to verify every routine transaction's calldata.",
          children: [
            {
              name: "Pre-approved patterns",
              tooltip:
                "Once an Action Builder or Hub is pre-approved, signers trust the pattern and don't need to scrutinize every instance's calldata in detail.",
            },
            {
              name: "Focus on high-risk transactions",
              tooltip:
                "Signers can focus their verification effort on novel, high-risk transactions (slow path) while routine transactions (fast path) require less scrutiny.",
            },
          ],
        },
        {
          name: "Improves transparency and auditability",
          tooltip:
            "All governance actions are visible on-chain with full context.",
          children: [
            {
              name: "On-chain audit trail",
              tooltip:
                "Every queued transaction, approval, and execution is logged on-chain with events, enabling complete governance history reconstruction.",
            },
            {
              name: "Real-time monitoring",
              tooltip:
                "Anyone can monitor queued transactions in real-time, enabling community oversight and alerting on suspicious activity.",
            },
            {
              name: "No hidden operations",
              tooltip:
                "All transaction details are on-chain - no off-chain coordination that could hide malicious proposals from public view.",
            },
          ],
        },
        {
          name: "Enhances security",
          tooltip: "Timelocks and on-chain approvals provide defense-in-depth.",
          children: [
            {
              name: "Mandatory time buffers",
              tooltip:
                "Even pre-approved transactions have delays, providing reaction time to detect compromised signers or malicious proposals.",
            },
            {
              name: "Prevent signature phishing",
              tooltip:
                "On-chain hash approval is less susceptible to phishing than blind ECDSA signature requests, as owners see the exact transaction hash.",
            },
            {
              name: "Cancellation capability",
              tooltip:
                "Proposers can cancel queued transactions, and emergency mode enables any owner to cancel, providing escape hatches for mistakes.",
            },
          ],
        },
        {
          name: "Enables automation and tooling",
          tooltip:
            "On-chain state enables rich ecosystem of monitoring and execution bots.",
          children: [
            {
              name: "Permissionless execution",
              tooltip:
                "Anyone can execute a queued transaction after its timelock, enabling automation bots that monitor the queue and execute when ready.",
            },
            {
              name: "Dashboard integration",
              tooltip:
                "UIs can query CanonGuard's on-chain state to show queued transactions, approval status, and time-to-execution without relying on proprietary APIs.",
            },
            {
              name: "Alert systems",
              tooltip:
                "Monitoring bots can watch TransactionQueued events and alert stakeholders about high-risk or unusual proposals during the timelock window.",
            },
          ],
        },
      ],
    },

    // ───────────────────── Technical Details ─────────────────────
    {
      name: "Technical Details",
      tooltip:
        "Implementation details, design patterns, and technical decisions in Canon Guard.",
      children: [
        {
          name: "Safe integration patterns",
          tooltip: "How Canon Guard integrates with Gnosis Safe.",
          children: [
            {
              name: "Guard mechanism",
              tooltip:
                "Canon Guard uses Safe's guard hook (checkTransaction and checkAfterExecution) to intercept and validate all Safe transactions.",
            },
            {
              name: "MultiSendCallOnly for batching",
              tooltip:
                "Action Builder actions are batched into a single Safe transaction via MultiSendCallOnly, ensuring atomicity and minimizing Safe nonce usage.",
            },
            {
              name: "Approved-hash signature encoding",
              tooltip:
                "Canon Guard builds signatures in the format {r: signer_address, s: 0, v: 1} for each approving owner, which Safe recognizes as approved-hash signatures.",
            },
          ],
        },
        {
          name: "Storage and gas optimization",
          tooltip: "Design choices for efficient on-chain storage.",
          children: [
            {
              name: "Action caching",
              tooltip:
                "When queueing, Canon Guard calls builder.getActions() once and stores the encoded actions in transactionsInfo, avoiding repeated external calls.",
            },
            {
              name: "Enumerable set for queue",
              tooltip:
                "Uses Solady's EnumerableSetLib for efficient queue management, preventing duplicate queueing and enabling getQueuedActionBuilders().",
            },
            {
              name: "Minimal storage per transaction",
              tooltip:
                "TransactionInfo struct stores only essential data: proposer, actionsData, executableAt, expiresAt, isPreApproved.",
            },
          ],
        },
        {
          name: "Security patterns",
          tooltip: "Defensive programming and security best practices.",
          children: [
            {
              name: "Immutable critical parameters",
              tooltip:
                "PARENT, MULTI_SEND_CALL_ONLY, SHORT_TX_EXECUTION_DELAY, LONG_TX_EXECUTION_DELAY, TX_EXPIRY_DELAY, MAX_APPROVAL_DURATION are immutable to prevent governance attacks.",
            },
            {
              name: "Reentrancy protection",
              tooltip:
                "Deletion of transactionsInfo before external calls (checks-effects-interactions pattern) prevents reentrancy attacks on execution.",
            },
            {
              name: "Expiry enforcement",
              tooltip:
                "All queued transactions have mandatory expiry timestamps, preventing stale transactions from executing indefinitely.",
            },
            {
              name: "Signature validation",
              tooltip:
                "CanonGuard verifies Safe's threshold is met by counting approved-hash signers before execution, preventing under-signed transactions.",
            },
          ],
        },
        {
          name: "Deployment patterns",
          tooltip: "How contracts are deployed and initialized.",
          children: [
            {
              name: "Factory contracts",
              tooltip:
                "Each Action Builder type has a Factory contract for standardized deployment with consistent initialization.",
            },
            {
              name: "CREATE3 deterministic addresses",
              tooltip:
                "Hubs use CREATE3 (via Solady) to deploy children with addresses determined solely by deployer and salt, enabling cross-chain address consistency.",
            },
            {
              name: "CanonGuardFactory",
              tooltip:
                "Factory for deploying CanonGuard instances with standardized parameters, simplifying multi-Safe deployments.",
            },
          ],
        },
        {
          name: "Event-driven architecture",
          tooltip: "Rich event emission for indexing and monitoring.",
          children: [
            {
              name: "TransactionQueued",
              tooltip:
                "Emitted when a transaction is queued, with proposer, Action Builder, parent Hub, and pre-approval status.",
            },
            {
              name: "TransactionExecuted",
              tooltip:
                "Emitted on successful execution, with Action Builder, Safe tx hash, signers, and pre-approval status.",
            },
            {
              name: "ActionsBuilderOrHubApproved",
              tooltip:
                "Emitted when an Action Builder or Hub is pre-approved, with approval duration and expiry timestamp.",
            },
            {
              name: "EnqueuedTransactionCancelled",
              tooltip:
                "Emitted when a queued transaction is cancelled, with Action Builder, canceller, and Safe tx hash.",
            },
          ],
        },
      ],
    },
  ],
};
