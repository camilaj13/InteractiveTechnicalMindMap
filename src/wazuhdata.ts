export const wazuhdata = {

  name: "Wazuh",

  tooltip:

    "Wazuh is an open-source unified XDR and SIEM platform that provides threat detection, visibility, and compliance for workloads across on-premises, virtualized, containerized, and cloud environments through log analysis, intrusion detection, vulnerability detection, and security compliance monitoring.",

  children: [

    // ───────────────────── What is Wazuh? ─────────────────────

    {

      name: "What is Wazuh?",

      tooltip:

        "Wazuh is a free, open-source security platform that unifies XDR (Extended Detection and Response) and SIEM (Security Information and Event Management) capabilities to protect workloads across diverse environments with real-time threat detection, incident response, and regulatory compliance features.",

      children: [

        {

          name: "Unified XDR and SIEM",

          tooltip:

            "Wazuh combines Extended Detection and Response with Security Information and Event Management to provide comprehensive visibility and protection across all IT infrastructure layers.",

          children: [

            {

              name: "Extended Detection and Response (XDR)",

              tooltip:

                "Correlates security telemetry from endpoints, networks, and cloud services to detect sophisticated threats and automate response actions across the entire technology stack.",

            },

            {

              name: "Security Information and Event Management (SIEM)",

              tooltip:

                "Aggregates, normalizes, and analyzes security events from diverse sources to provide centralized monitoring, forensic analysis, and compliance reporting.",

            },

            {

              name: "Real-time threat intelligence",

              tooltip:

                "Integrates threat intelligence feeds and vulnerability databases to enrich detections with contextual information and prioritize risks.",

            },

          ],

        },

        {

          name: "Core capabilities",

          tooltip:

            "Wazuh delivers multiple security functions through a unified agent and manager architecture that scales from small deployments to enterprise environments.",

          children: [

            {

              name: "Intrusion and malware detection",

              tooltip:

                "Monitors system and application logs, file integrity, rootkits, and suspicious processes to identify intrusions and malicious software in real time.",

            },

            {

              name: "Vulnerability detection",

              tooltip:

                "Scans systems for known vulnerabilities by correlating installed software inventories with CVE databases and security advisories.",

            },

            {

              name: "Security compliance",

              tooltip:

                "Evaluates system configurations and security controls against regulatory standards like PCI DSS, GDPR, HIPAA, NIST 800-53, and CIS benchmarks.",

            },

            {

              name: "Cloud security monitoring",

              tooltip:

                "Monitors cloud infrastructure events from AWS, Azure, Google Cloud, and other providers to detect misconfigurations, suspicious access, and data exfiltration.",

            },

            {

              name: "Container security",

              tooltip:

                "Secures Docker and Kubernetes environments by monitoring container events, orchestrator APIs, and runtime security violations.",

            },

          ],

        },

        {

          name: "Open-source foundation",

          tooltip:

            "Wazuh is built on open-source components with transparent code, community contributions, and commercial support options for enterprises.",

          children: [

            {

              name: "GPL v2 license",

              tooltip:

                "Wazuh is licensed under GPLv2 with source code available on GitHub, enabling security audits, custom modifications, and community contributions.",

            },

            {

              name: "OSSEC roots",

              tooltip:

                "Wazuh originated as a fork of OSSEC HIDS, extending it with scalable architecture, cloud integrations, and modern management interfaces.",

            },

            {

              name: "Community and commercial support",

              tooltip:

                "Active community forums, documentation, and optional commercial support from Wazuh Inc. provide assistance for deployments of all sizes.",

            },

          ],

        },

      ],

    },

 

    // ───────────────────── Core Architecture ─────────────────────

    {

      name: "Core Architecture",

      tooltip:

        "Wazuh architecture consists of agents collecting security data from endpoints, a central manager processing and correlating events, and an indexer cluster storing and searching data with a web-based dashboard for visualization.",

      children: [

        {

          name: "Three-tier architecture",

          tooltip:

            "Wazuh follows a distributed architecture with agents, managers, and indexers that can scale horizontally to support thousands of endpoints and high event throughput.",

          children: [

            {

              name: "Wazuh agents",

              tooltip:

                "Lightweight agents installed on monitored endpoints (servers, workstations, containers) collect security data and forward it to managers for analysis.",

            },

            {

              name: "Wazuh manager",

              tooltip:

                "Central server that receives agent data, decodes events, applies detection rules, generates alerts, and forwards results to the indexer for storage.",

            },

            {

              name: "Wazuh indexer",

              tooltip:

                "OpenSearch-based storage and search cluster that indexes security events, alerts, and vulnerability data for fast retrieval and analysis.",

            },

            {

              name: "Wazuh dashboard",

              tooltip:

                "Web-based user interface built on OpenSearch Dashboards that provides visualizations, search capabilities, and management functions.",

            },

          ],

        },

        {

          name: "Agent architecture",

          tooltip:

            "Agents are multi-threaded daemons that monitor local system activity, collect logs, scan files, execute commands, and communicate securely with managers.",

          children: [

            {

              name: "Data collection modules",

              tooltip:

                "Modules within agents gather logs from files and Windows Event Logs, monitor file integrity, scan for rootkits, inventory software, and execute security checks.",

            },

            {

              name: "Secure communication",

              tooltip:

                "Agents authenticate to managers using pre-shared keys and encrypt all communication with AES over TLS to protect data in transit.",

            },

            {

              name: "Local processing",

              tooltip:

                "Agents perform initial filtering and compression to reduce network bandwidth and manager load while preserving critical security events.",

            },

            {

              name: "Multi-platform support",

              tooltip:

                "Native agents available for Linux, Windows, macOS, Solaris, AIX, and HP-UX with architecture-specific builds for x86, ARM, and other CPUs.",

            },

          ],

        },

        {

          name: "Manager architecture",

          tooltip:

            "Managers are event processing engines that decode, enrich, correlate, and generate alerts from incoming agent data using a rule-based detection framework.",

          children: [

            {

              name: "Event processing pipeline",

              tooltip:

                "Remote daemon receives agent messages, decoders extract fields from raw logs, analysis engine applies rules to generate alerts, and output modules forward results.",

            },

            {

              name: "Rule engine",

              tooltip:

                "XML-based rules define detection logic with pattern matching, frequency analysis, field correlation, and severity scoring to identify security events.",

            },

            {

              name: "Decoders",

              tooltip:

                "Decoders parse structured and unstructured log formats to extract fields (timestamp, source IP, user, action) that rules can match against.",

            },

            {

              name: "Active response",

              tooltip:

                "Automated response framework executes scripts on agents or firewalls to block IPs, disable accounts, or quarantine files when threats are detected.",

            },

            {

              name: "Manager clustering",

              tooltip:

                "Multiple managers can share agent connections and distribute workload while synchronizing configuration and custom rules across the cluster.",

            },

          ],

        },

        {

          name: "Indexer and storage",

          tooltip:

            "Wazuh indexer is a distributed OpenSearch cluster that provides scalable, highly available storage for security data with full-text search and aggregation.",

          children: [

            {

              name: "OpenSearch foundation",

              tooltip:

                "Built on OpenSearch (open-source fork of Elasticsearch), providing battle-tested indexing, search, and analytics capabilities for security data.",

            },

            {

              name: "Index management",

              tooltip:

                "Index lifecycle management automatically rotates, compresses, and deletes old indices based on retention policies to manage storage costs.",

            },

            {

              name: "High availability",

              tooltip:

                "Cluster architecture with replica shards ensures data durability and query availability even when nodes fail or undergo maintenance.",

            },

            {

              name: "Performance optimization",

              tooltip:

                "Sharding strategies, index templates, and query caching optimize ingest rates and search latency for real-time security monitoring.",

            },

          ],

        },

        {

          name: "Communication protocols",

          tooltip:

            "Wazuh components communicate using encrypted protocols with authentication, compression, and resilience features for reliable data flow.",

          children: [

            {

              name: "Agent-Manager protocol",

              tooltip:

                "Custom binary protocol with AES encryption, message queuing, and automatic reconnection ensures secure, reliable agent-to-manager communication.",

            },

            {

              name: "Manager-Indexer protocol",

              tooltip:

                "RESTful HTTPS API to OpenSearch handles bulk indexing of alerts and events with retry logic and backpressure management.",

            },

            {

              name: "API authentication",

              tooltip:

                "JWT-based authentication secures the Wazuh API used by the dashboard and external integrations with role-based access control.",

            },

          ],

        },

      ],

    },

 

    // ───────────────────── Components & Modules ─────────────────────

    {

      name: "Components & Modules",

      tooltip:

        "Wazuh functionality is organized into specialized modules within agents and managers that handle specific security monitoring tasks like log analysis, file integrity, vulnerability detection, and compliance scanning.",

      children: [

        {

          name: "Log data analysis",

          tooltip:

            "Log collection and analysis modules monitor system logs, application logs, and audit trails to detect security events and policy violations.",

          children: [

            {

              name: "Logcollector",

              tooltip:

                "Agent module that reads log files, Windows Event Logs, and command output, applying filters and formatting before sending to managers.",

            },

            {

              name: "Syslog receiver",

              tooltip:

                "Manager component that accepts remote syslog messages (UDP/TCP) from network devices, applications, and systems without agents.",

            },

            {

              name: "Windows Event Channel",

              tooltip:

                "Collects events from Windows Event Log channels including Security, System, Application, and custom application logs with XPath filtering.",

            },

            {

              name: "Multi-line log handling",

              tooltip:

                "Supports logs that span multiple lines (stack traces, XML, JSON) by concatenating messages before analysis.",

            },

          ],

        },

        {

          name: "File Integrity Monitoring (FIM)",

          tooltip:

            "FIM module tracks changes to files and directories, detecting unauthorized modifications, additions, or deletions that may indicate compromise.",

          children: [

            {

              name: "Real-time monitoring",

              tooltip:

                "Uses kernel APIs (inotify on Linux, ReadDirectoryChangesW on Windows) to detect file system changes immediately without polling.",

            },

            {

              name: "Scheduled scans",

              tooltip:

                "Periodic full scans verify file hashes against baseline to detect changes that bypass real-time monitoring or occur when agent is offline.",

            },

            {

              name: "Who-data enrichment",

              tooltip:

                "Linux audit system integration captures which user and process modified files, providing attribution for integrity violations.",

            },

            {

              name: "Windows registry monitoring",

              tooltip:

                "Monitors registry keys and values for changes that affect system configuration, installed software, and security settings.",

            },

            {

              name: "Exclusions and filters",

              tooltip:

                "Configurable patterns exclude frequently changing files (logs, caches) and filter by file type, size, or attributes to reduce noise.",

            },

          ],

        },

        {

          name: "Rootkit detection",

          tooltip:

            "Rootkit detection module scans systems for kernel-level malware, hidden processes, network connections, and system call hooking.",

          children: [

            {

              name: "Signature-based detection",

              tooltip:

                "Database of known rootkit signatures (file names, MD5 hashes, process names) identifies common rootkit families.",

            },

            {

              name: "Anomaly detection",

              tooltip:

                "Detects hidden processes by comparing process lists from different system APIs, finding discrepancies that indicate hiding.",

            },

            {

              name: "System call analysis",

              tooltip:

                "Checks for modifications to system call tables, kernel modules, and device drivers that rootkits use to hide their presence.",

            },

            {

              name: "Port and interface scanning",

              tooltip:

                "Identifies listening ports and network interfaces that don't appear in standard process listings, indicating potential backdoors.",

            },

          ],

        },

        {

          name: "Vulnerability detection",

          tooltip:

            "Vulnerability detector correlates software inventory from agents with CVE databases to identify outdated packages and missing patches.",

          children: [

            {

              name: "Software inventory",

              tooltip:

                "Collects lists of installed packages (RPM, DEB, Windows programs) with versions to build comprehensive asset inventories.",

            },

            {

              name: "CVE correlation",

              tooltip:

                "Matches installed software against NVD (National Vulnerability Database) and vendor security bulletins to identify known vulnerabilities.",

            },

            {

              name: "CVSS scoring",

              tooltip:

                "Assigns Common Vulnerability Scoring System (CVSS) scores to vulnerabilities for risk prioritization and remediation planning.",

            },

            {

              name: "Continuous scanning",

              tooltip:

                "Periodic rescans detect newly disclosed vulnerabilities in existing software and new installations that introduce risks.",

            },

            {

              name: "Vendor feed integration",

              tooltip:

                "Integrates with Red Hat, Debian, Ubuntu, Microsoft, and other vendor security feeds for distribution-specific vulnerability data.",

            },

          ],

        },

        {

          name: "Security Configuration Assessment (SCA)",

          tooltip:

            "SCA module evaluates system hardening and compliance posture by running policy checks against operating system and application configurations.",

          children: [

            {

              name: "Policy frameworks",

              tooltip:

                "Built-in policies for CIS benchmarks, PCI DSS, NIST, GDPR, HIPAA, and custom organizational standards define expected configurations.",

            },

            {

              name: "Policy checks",

              tooltip:

                "Checks evaluate file permissions, service states, kernel parameters, user accounts, and software versions against policy requirements.",

            },

            {

              name: "Pass/fail reporting",

              tooltip:

                "Each policy check returns pass, fail, or not applicable status with remediation guidance for failed controls.",

            },

            {

              name: "Compliance scoring",

              tooltip:

                "Aggregates check results into compliance scores and trends over time to measure security posture improvements.",

            },

            {

              name: "Custom policies",

              tooltip:

                "YAML-based policy format allows security teams to define custom checks tailored to organizational requirements and technologies.",

            },

          ],

        },

        {

          name: "Cloud security monitoring",

          tooltip:

            "Cloud modules monitor cloud provider APIs and services to detect misconfigurations, suspicious activities, and compliance violations.",

          children: [

            {

              name: "AWS integration",

              tooltip:

                "Monitors CloudTrail logs, GuardDuty findings, VPC Flow Logs, S3 bucket access, IAM changes, and EC2 instance events.",

            },

            {

              name: "Azure integration",

              tooltip:

                "Collects events from Azure Active Directory, Activity Logs, Storage accounts, and Security Center recommendations.",

            },

            {

              name: "Google Cloud integration",

              tooltip:

                "Ingests GCP audit logs, Cloud Security Command Center findings, and resource configuration changes.",

            },

            {

              name: "Office 365 monitoring",

              tooltip:

                "Tracks user activities, mailbox access, file sharing, and administrative changes in Microsoft 365 tenants.",

            },

            {

              name: "GitHub monitoring",

              tooltip:

                "Monitors repository events, organization changes, and audit logs to detect code exfiltration and unauthorized access.",

            },

          ],

        },

        {

          name: "Container security",

          tooltip:

            "Container security modules monitor Docker engines and Kubernetes clusters to secure containerized workloads and orchestration platforms.",

          children: [

            {

              name: "Docker monitoring",

              tooltip:

                "Collects Docker daemon events (container lifecycle, image pulls, network changes) and monitors running containers for security violations.",

            },

            {

              name: "Kubernetes audit logs",

              tooltip:

                "Ingests Kubernetes API server audit logs to track resource creations, deletions, and policy changes across clusters.",

            },

            {

              name: "Container runtime security",

              tooltip:

                "Monitors processes, network connections, and file accesses within containers to detect anomalous behavior and container escapes.",

            },

            {

              name: "Image vulnerability scanning",

              tooltip:

                "Scans container images for vulnerabilities in base OS packages and application dependencies before deployment.",

            },

          ],

        },

        {

          name: "Osquery integration",

          tooltip:

            "Integrates with osquery to execute SQL queries against endpoint operating systems for advanced threat hunting and forensics.",

          children: [

            {

              name: "On-demand queries",

              tooltip:

                "Security teams can dispatch SQL queries to agents to collect process lists, network connections, loaded modules, or custom data.",

            },

            {

              name: "Scheduled queries",

              tooltip:

                "Recurring queries run at intervals to monitor for persistence mechanisms, lateral movement artifacts, or configuration drift.",

            },

            {

              name: "Query packs",

              tooltip:

                "Predefined query collections for threat hunting, compliance, and incident response scenarios accelerate investigations.",

            },

          ],

        },

        {

          name: "System inventory",

          tooltip:

            "System call monitoring (Syscollector) gathers comprehensive hardware, software, network, and process inventories for asset management.",

          children: [

            {

              name: "Hardware inventory",

              tooltip:

                "Collects CPU, memory, disk, and network interface specifications for capacity planning and asset tracking.",

            },

            {

              name: "Software packages",

              tooltip:

                "Inventories installed operating system packages and applications with versions for license management and vulnerability correlation.",

            },

            {

              name: "Network configuration",

              tooltip:

                "Records IP addresses, MAC addresses, routing tables, and listening ports to map network topology and detect changes.",

            },

            {

              name: "Running processes",

              tooltip:

                "Snapshots running processes periodically to establish baselines and detect new or suspicious executables.",

            },

          ],

        },

      ],

    },

 

    // ───────────────────── Detection & Analysis ─────────────────────

    {

      name: "Detection & Analysis",

      tooltip:

        "Wazuh detection engine combines rule-based pattern matching, statistical analysis, threat intelligence, and behavioral analytics to identify security threats across diverse log sources.",

      children: [

        {

          name: "Rule-based detection",

          tooltip:

            "Rules define detection logic using XML syntax with pattern matching, field comparisons, frequency thresholds, and alert severity levels.",

          children: [

            {

              name: "Rule syntax",

              tooltip:

                "Rules specify conditions (regex patterns, field values, frequencies) that trigger alerts when matched against decoded log events.",

            },

            {

              name: "Rule hierarchy",

              tooltip:

                "Rules can inherit from parent rules and add additional conditions, enabling reuse of common patterns and progressive refinement.",

            },

            {

              name: "Rule groups",

              tooltip:

                "Rules are organized into groups (authentication, web, firewall, malware) for categorization and selective enabling/disabling.",

            },

            {

              name: "Custom rules",

              tooltip:

                "Organizations can write custom rules in local_rules.xml to detect application-specific threats or organizational policy violations.",

            },

            {

              name: "Rule testing",

              tooltip:

                "wazuh-logtest utility allows testing rules against sample logs to verify detection logic before deploying to production.",

            },

          ],

        },

        {

          name: "Decoders",

          tooltip:

            "Decoders parse log messages to extract structured fields that rules can match against, supporting regex and predefined formats.",

          children: [

            {

              name: "Decoder library",

              tooltip:

                "Built-in decoders handle syslog, web server logs (Apache, Nginx), firewalls (iptables, Palo Alto), and application logs (SSH, FTP).",

            },

            {

              name: "Multi-tier decoding",

              tooltip:

                "Parent-child decoder chains progressively parse complex logs, extracting fields at each stage for granular analysis.",

            },

            {

              name: "JSON and XML parsing",

              tooltip:

                "Native support for JSON and XML logs automatically extracts nested fields without custom regex patterns.",

            },

            {

              name: "Custom decoders",

              tooltip:

                "Security teams define custom decoders for proprietary application logs using regex groups and field mappings.",

            },

          ],

        },

        {

          name: "Correlation and aggregation",

          tooltip:

            "Advanced correlation rules combine events across time windows or multiple sources to detect multi-stage attacks and anomalous patterns.",

          children: [

            {

              name: "Frequency analysis",

              tooltip:

                "Rules can trigger on event repetition (e.g., 5 failed logins in 60 seconds) to detect brute force and DoS attacks.",

            },

            {

              name: "Correlated events",

              tooltip:

                "Rules match sequences of related events (successful login after failures) to identify credential stuffing or privilege escalation.",

            },

            {

              name: "Same source correlation",

              tooltip:

                "Tracks repeated events from the same IP, user, or hostname to detect scanning, enumeration, or persistence attempts.",

            },

            {

              name: "Time-based windows",

              tooltip:

                "Configurable time windows (seconds to hours) define how long rules retain state for frequency and correlation matching.",

            },

          ],

        },

        {

          name: "Threat intelligence integration",

          tooltip:

            "Enriches detections with threat intelligence by checking IPs, domains, and file hashes against reputation databases and blocklists.",

          children: [

            {

              name: "CDB lists",

              tooltip:

                "Constant Database (CDB) lists store IP ranges, domains, and hashes for fast lookup during rule evaluation.",

            },

            {

              name: "AlienVault OTX",

              tooltip:

                "Integrates with AlienVault Open Threat Exchange to enrich alerts with indicators of compromise and threat actor attribution.",

            },

            {

              name: "VirusTotal integration",

              tooltip:

                "Queries VirusTotal API to check file hashes and URLs against malware databases, adding reputation scores to alerts.",

            },

            {

              name: "MITRE ATT&CK mapping",

              tooltip:

                "Rules are tagged with MITRE ATT&CK technique IDs to map detections to adversary tactics for threat profiling.",

            },

          ],

        },

        {

          name: "Behavioral analytics",

          tooltip:

            "Statistical models and machine learning detect anomalies by comparing current activity against historical baselines and peer groups.",

          children: [

            {

              name: "Baseline establishment",

              tooltip:

                "Learns normal behavior patterns for users, hosts, and network flows over time to establish deviation thresholds.",

            },

            {

              name: "Anomaly scoring",

              tooltip:

                "Assigns anomaly scores to events based on statistical deviation from baselines, flagging outliers for investigation.",

            },

            {

              name: "Peer group analysis",

              tooltip:

                "Compares user behavior against peers with similar roles to detect insider threats and account compromises.",

            },

          ],

        },

      ],

    },

 

    // ───────────────────── Active Response & Remediation ─────────────────────

    {

      name: "Active Response & Remediation",

      tooltip:

        "Active response framework automatically executes scripts and commands on agents or external systems to contain threats, block attackers, and restore security posture.",

      children: [

        {

          name: "Response actions",

          tooltip:

            "Predefined and custom scripts perform defensive actions like firewall rule updates, account disables, and process termination.",

          children: [

            {

              name: "Firewall blocking",

              tooltip:

                "Automatically adds firewall rules (iptables, pf, Windows Firewall) to block source IPs detected as attackers.",

            },

            {

              name: "Account lockout",

              tooltip:

                "Disables user accounts exhibiting suspicious behavior (brute force, privilege abuse) to prevent further compromise.",

            },

            {

              name: "Process termination",

              tooltip:

                "Kills malicious processes detected by rootkit scans or integrity monitoring to stop active threats.",

            },

            {

              name: "File quarantine",

              tooltip:

                "Moves or deletes files identified as malware by integrity monitoring or threat intelligence lookups.",

            },

            {

              name: "Custom scripts",

              tooltip:

                "Executes custom shell scripts or PowerShell commands for organization-specific response workflows (ticket creation, backups, notifications).",

            },

          ],

        },

        {

          name: "Response triggers",

          tooltip:

            "Active responses are triggered by rules exceeding severity thresholds, specific rule IDs, or manual analyst commands.",

          children: [

            {

              name: "Severity-based triggers",

              tooltip:

                "Responses activate automatically for alerts meeting configured severity levels (e.g., level 10+ triggers IP blocking).",

            },

            {

              name: "Rule-specific bindings",

              tooltip:

                "Responses can be bound to specific rule IDs for granular control over which detections trigger automated actions.",

            },

            {

              name: "Stateful responses",

              tooltip:

                "Responses track state (IP addresses blocked, accounts disabled) and can automatically reverse actions after timeout periods.",

            },

          ],

        },

        {

          name: "Response execution",

          tooltip:

            "Manager dispatches response commands to agents, which execute scripts locally and report results back for audit trails.",

          children: [

            {

              name: "Agent-based execution",

              tooltip:

                "Agents receive response commands from manager and execute local scripts with appropriate privileges (root on Linux, SYSTEM on Windows).",

            },

            {

              name: "Timeout and cleanup",

              tooltip:

                "Responses can specify timeout durations after which blocking rules are removed and accounts re-enabled automatically.",

            },

            {

              name: "Audit logging",

              tooltip:

                "All response actions are logged with timestamps, triggering alerts, and command outputs for compliance and forensics.",

            },

          ],

        },

        {

          name: "External integrations",

          tooltip:

            "Active response can trigger actions on external systems like firewalls, SIEMs, ticketing systems, and orchestration platforms.",

          children: [

            {

              name: "Firewall APIs",

              tooltip:

                "Integrates with network firewall APIs (Palo Alto, Cisco, Check Point) to push blocking rules at network perimeter.",

            },

            {

              name: "SOAR platforms",

              tooltip:

                "Sends alerts to Security Orchestration, Automation, and Response (SOAR) platforms like Splunk Phantom or Cortex XSOAR for playbook execution.",

            },

            {

              name: "Ticketing systems",

              tooltip:

                "Creates tickets in Jira, ServiceNow, or other ITSM platforms for analyst review and incident tracking.",

            },

            {

              name: "Slack and PagerDuty",

              tooltip:

                "Sends notifications to collaboration tools and on-call systems for immediate human response to critical threats.",

            },

          ],

        },

      ],

    },

 

    // ───────────────────── Configuration & Deployment ─────────────────────

    {

      name: "Configuration & Deployment",

      tooltip:

        "Wazuh configuration is managed through XML files on managers and agents, with centralized agent configuration, management API, and deployment automation.",

      children: [

        {

          name: "Manager configuration",

          tooltip:

            "ossec.conf on manager defines global settings, module enables, output destinations, and agent connection policies.",

          children: [

            {

              name: "Global settings",

              tooltip:

                "Configures email alerts, log retention, white/blacklists, and manager-level processing options.",

            },

            {

              name: "Module enables",

              tooltip:

                "Enables or disables specific detection modules (vulnerability detector, SCA, cloud modules) and sets scan frequencies.",

            },

            {

              name: "Output configuration",

              tooltip:

                "Defines destinations for alerts (indexer, syslog, database, email) with filtering by severity or rule group.",

            },

            {

              name: "Agent registration",

              tooltip:

                "Configures authentication methods (password, certificates) and auto-enrollment settings for new agents.",

            },

          ],

        },

        {

          name: "Agent configuration",

          tooltip:

            "Agents have local ossec.conf but can receive centralized configuration from manager for consistent policy enforcement.",

          children: [

            {

              name: "Centralized configuration",

              tooltip:

                "Manager pushes agent.conf to agents, overriding local settings for logs to monitor, FIM directories, and module settings.",

            },

            {

              name: "Configuration profiles",

              tooltip:

                "Define different configuration profiles (Linux servers, Windows workstations, DMZ) and assign agents based on operating system or group.",

            },

            {

              name: "Local agent settings",

              tooltip:

                "Agents maintain local settings for manager connection, log compression, and anti-flood limits.",

            },

          ],

        },

        {

          name: "Deployment methods",

          tooltip:

            "Wazuh supports multiple deployment patterns from single-server to distributed architectures with load balancing and high availability.",

          children: [

            {

              name: "All-in-one deployment",

              tooltip:

                "Single server hosts manager, indexer, and dashboard for small environments (up to ~100 agents) with simplified management.",

            },

            {

              name: "Distributed deployment",

              tooltip:

                "Separate manager, indexer cluster, and dashboard instances scale to thousands of agents with dedicated resources per tier.",

            },

            {

              name: "Multi-tier architecture",

              tooltip:

                "Large environments use multiple manager nodes behind load balancers with clustered indexers for high availability and throughput.",

            },

            {

              name: "Cloud deployments",

              tooltip:

                "Deploy on AWS, Azure, or GCP using marketplace images, CloudFormation/Terraform templates, or Kubernetes Helm charts.",

            },

          ],

        },

        {

          name: "Agent enrollment",

          tooltip:

            "Agents register with managers using authentication credentials, obtaining certificates or keys for secure ongoing communication.",

          children: [

            {

              name: "Password-based registration",

              tooltip:

                "Agents register using shared password, receiving encryption keys from manager for subsequent communication.",

            },

            {

              name: "Certificate-based registration",

              tooltip:

                "PKI infrastructure issues certificates to agents for mutual TLS authentication and encryption.",

            },

            {

              name: "Auto-enrollment",

              tooltip:

                "Manager can auto-approve agent registrations matching IP ranges or hostnames, simplifying large-scale deployments.",

            },

            {

              name: "Agent groups",

              tooltip:

                "Assign agents to groups (prod, dev, DMZ) to apply group-specific configuration profiles and policies.",

            },

          ],

        },

        {

          name: "Automation and IaC",

          tooltip:

            "Infrastructure as Code tools and configuration management platforms automate Wazuh deployment and configuration at scale.",

          children: [

            {

              name: "Ansible playbooks",

              tooltip:

                "Official Ansible roles deploy managers, agents, and indexers with templated configurations for repeatable infrastructure.",

            },

            {

              name: "Puppet modules",

              tooltip:

                "Puppet manifests manage Wazuh server and agent installations, configurations, and updates across server fleets.",

            },

            {

              name: "Chef cookbooks",

              tooltip:

                "Chef recipes automate Wazuh deployment and integrate with Chef's configuration management workflows.",

            },

            {

              name: "Terraform providers",

              tooltip:

                "Terraform modules provision cloud infrastructure for Wazuh with security groups, load balancers, and auto-scaling.",

            },

            {

              name: "Docker and Kubernetes",

              tooltip:

                "Official Docker images and Kubernetes Helm charts deploy Wazuh as containerized services with orchestration.",

            },

          ],

        },

      ],

    },

 

    // ───────────────────── Use Cases & Scenarios ─────────────────────

    {

      name: "Use Cases & Scenarios",

      tooltip:

        "Wazuh addresses diverse security use cases from threat detection and incident response to compliance monitoring and cloud security across enterprise environments.",

      children: [

        {

          name: "Threat detection and incident response",

          tooltip:

            "Real-time monitoring and alerting enable security teams to detect and respond to attacks, malware, and insider threats.",

          children: [

            {

              name: "Intrusion detection",

              tooltip:

                "Detects unauthorized access attempts, brute force attacks, privilege escalations, and lateral movement across the network.",

            },

            {

              name: "Malware detection",

              tooltip:

                "Identifies malware through file integrity changes, rootkit scans, suspicious process execution, and command-and-control communication.",

            },

            {

              name: "Insider threat detection",

              tooltip:

                "Monitors privileged user activities, data exfiltration attempts, and policy violations to detect malicious insiders.",

            },

            {

              name: "Forensic investigation",

              tooltip:

                "Provides historical event data, alert timelines, and system snapshots for post-incident analysis and root cause determination.",

            },

          ],

        },

        {

          name: "Regulatory compliance",

          tooltip:

            "Automates compliance monitoring and reporting for regulatory frameworks through continuous configuration assessment and audit logging.",

          children: [

            {

              name: "PCI DSS compliance",

              tooltip:

                "Maps controls to PCI DSS requirements (file integrity, log monitoring, access control) with automated reporting for audit evidence.",

            },

            {

              name: "HIPAA compliance",

              tooltip:

                "Monitors healthcare systems for HIPAA security rule compliance including access controls, encryption, and audit logs.",

            },

            {

              name: "GDPR data protection",

              tooltip:

                "Tracks data access, modifications, and deletions to demonstrate GDPR compliance for personal data processing.",

            },

            {

              name: "NIST and CIS benchmarks",

              tooltip:

                "Validates system configurations against NIST 800-53 controls and CIS hardening benchmarks with pass/fail reporting.",

            },

          ],

        },

        {

          name: "Vulnerability management",

          tooltip:

            "Continuous vulnerability scanning and prioritization help security teams identify and remediate exploitable weaknesses.",

          children: [

            {

              name: "Patch management",

              tooltip:

                "Identifies missing security patches and outdated software across endpoints to prioritize update deployments.",

            },

            {

              name: "Risk prioritization",

              tooltip:

                "Ranks vulnerabilities by CVSS score, exploit availability, and asset criticality to focus remediation efforts.",

            },

            {

              name: "Vulnerability trending",

              tooltip:

                "Tracks vulnerability counts over time to measure remediation effectiveness and exposure reduction.",

            },

          ],

        },

        {

          name: "Cloud security",

          tooltip:

            "Monitors cloud infrastructure, SaaS applications, and cloud workloads for misconfigurations, threats, and compliance violations.",

          children: [

            {

              name: "AWS security monitoring",

              tooltip:

                "Monitors CloudTrail for suspicious API calls, GuardDuty findings, S3 bucket exposure, and IAM policy changes.",

            },

            {

              name: "Azure security monitoring",

              tooltip:

                "Tracks Azure AD sign-ins, resource changes, Security Center recommendations, and storage account access.",

            },

            {

              name: "Multi-cloud visibility",

              tooltip:

                "Provides unified monitoring across AWS, Azure, and GCP to detect cross-cloud threats and maintain consistent policies.",

            },

            {

              name: "Cloud compliance",

              tooltip:

                "Validates cloud configurations against CIS benchmarks and regulatory requirements specific to cloud environments.",

            },

          ],

        },

        {

          name: "Container and Kubernetes security",

          tooltip:

            "Secures containerized applications and orchestration platforms with runtime monitoring, configuration assessment, and audit logging.",

          children: [

            {

              name: "Container runtime security",

              tooltip:

                "Monitors container processes, network connections, and file accesses to detect compromises and container escapes.",

            },

            {

              name: "Kubernetes security",

              tooltip:

                "Analyzes Kubernetes audit logs for unauthorized access, privilege escalations, and resource manipulations.",

            },

            {

              name: "Image security",

              tooltip:

                "Scans container images for vulnerabilities and misconfigurations before deployment to reduce attack surface.",

            },

          ],

        },

        {

          name: "File integrity monitoring",

          tooltip:

            "Tracks changes to critical system files, configurations, and application code to detect unauthorized modifications and ensure integrity.",

          children: [

            {

              name: "System file monitoring",

              tooltip:

                "Monitors /etc, /bin, Windows system directories, and registry keys for changes indicating compromise or misconfiguration.",

            },

            {

              name: "Application integrity",

              tooltip:

                "Tracks web application files, database configurations, and application binaries to detect tampering or malware injection.",

            },

            {

              name: "Compliance evidence",

              tooltip:

                "Provides audit trails of file changes with timestamps and user attribution for compliance reporting.",

            },

          ],

        },

      ],

    },

 

    // ───────────────────── Integration & Extensibility ─────────────────────

    {

      name: "Integration & Extensibility",

      tooltip:

        "Wazuh integrates with security tools, workflows, and custom applications through APIs, webhooks, and modular architecture.",

      children: [

        {

          name: "RESTful API",

          tooltip:

            "Comprehensive REST API provides programmatic access to agents, rules, alerts, and configuration for automation and integration.",

          children: [

            {

              name: "Agent management",

              tooltip:

                "API endpoints list, create, delete, and update agents; retrieve agent status, configuration, and inventory data.",

            },

            {

              name: "Rule and decoder management",

              tooltip:

                "Programmatically add, modify, and test custom rules and decoders without manual file editing.",

            },

            {

              name: "Alert queries",

              tooltip:

                "Search and filter alerts by time range, severity, agent, rule ID, or custom fields for external reporting.",

            },

            {

              name: "System status",

              tooltip:

                "Monitor manager health, cluster status, queue sizes, and performance metrics for operational visibility.",

            },

          ],

        },

        {

          name: "Integrator module",

          tooltip:

            "Integrator daemon forwards alerts to external systems via webhooks, enabling real-time notifications and workflow automation.",

          children: [

            {

              name: "Slack integration",

              tooltip:

                "Sends formatted alert messages to Slack channels for team notification and collaboration.",

            },

            {

              name: "PagerDuty integration",

              tooltip:

                "Creates PagerDuty incidents for high-severity alerts to trigger on-call escalations.",

            },

            {

              name: "Custom webhooks",

              tooltip:

                "Posts alert JSON to any HTTP endpoint for integration with ticketing, SOAR, or custom applications.",

            },

            {

              name: "VirusTotal automation",

              tooltip:

                "Automatically submits file hashes from FIM alerts to VirusTotal for malware analysis.",

            },

          ],

        },

        {

          name: "SIEM and log management",

          tooltip:

            "Wazuh forwards alerts and events to external SIEMs and log management platforms for centralized analysis.",

          children: [

            {

              name: "Splunk integration",

              tooltip:

                "Splunk app for Wazuh provides dashboards, reports, and search capabilities within Splunk environment.",

            },

            {

              name: "Elastic Stack",

              tooltip:

                "Native integration with Elasticsearch/OpenSearch for indexing with Kibana/OpenSearch Dashboards visualization.",

            },

            {

              name: "Syslog forwarding",

              tooltip:

                "Forwards alerts as syslog messages to legacy SIEM platforms and log aggregators.",

            },

            {

              name: "JSON output",

              tooltip:

                "Writes alerts as JSON to files or sockets for ingestion by any tool supporting JSON logs.",

            },

          ],

        },

        {

          name: "Threat intelligence platforms",

          tooltip:

            "Enriches detections with threat intelligence and shares indicators to collaborative defense platforms.",

          children: [

            {

              name: "MISP integration",

              tooltip:

                "Queries MISP (Malware Information Sharing Platform) for IoCs and publishes detected threats back to community.",

            },

            {

              name: "AlienVault OTX",

              tooltip:

                "Checks IPs, domains, and hashes against AlienVault's Open Threat Exchange for reputation and threat context.",

            },

            {

              name: "Custom CTI feeds",

              tooltip:

                "Imports custom threat intelligence feeds into CDB lists for rule matching against internal or commercial IoCs.",

            },

          ],

        },

        {

          name: "Custom integrations",

          tooltip:

            "Modular architecture allows custom decoders, rules, active response scripts, and integrator modules.",

          children: [

            {

              name: "Custom decoders and rules",

              tooltip:

                "Organizations create custom detection logic for proprietary applications and unique threat models.",

            },

            {

              name: "Active response scripts",

              tooltip:

                "Write custom bash or PowerShell scripts to execute organization-specific response workflows.",

            },

            {

              name: "API integrations",

              tooltip:

                "Build custom applications using Wazuh API to automate agent provisioning, configuration, and reporting.",

            },

            {

              name: "Module development",

              tooltip:

                "Advanced users can develop custom C modules to extend Wazuh core functionality for specialized use cases.",

            },

          ],

        },

      ],

    },

 

    // ───────────────────── Scalability & Performance ─────────────────────

    {

      name: "Scalability & Performance",

      tooltip:

        "Wazuh architecture scales from small deployments to enterprise environments with thousands of agents through clustering, load balancing, and performance tuning.",

      children: [

        {

          name: "Agent scalability",

          tooltip:

            "Single manager handles thousands of agents with tuning; multiple managers behind load balancers scale to tens of thousands.",

          children: [

            {

              name: "Connection pooling",

              tooltip:

                "Manager maintains connection pools for agent communication, indexer writes, and API requests to maximize throughput.",

            },

            {

              name: "Event queuing",

              tooltip:

                "Multi-threaded queues buffer agent events during traffic spikes, preventing data loss and manager overload.",

            },

            {

              name: "Load balancing",

              tooltip:

                "Agents connect to manager cluster through load balancer, distributing connections and processing across nodes.",

            },

          ],

        },

        {

          name: "Manager clustering",

          tooltip:

            "Manager cluster shares agent connections and synchronizes configuration, rules, and agent keys for high availability.",

          children: [

            {

              name: "Master-worker architecture",

              tooltip:

                "Cluster has single master that distributes configuration to workers; workers handle agent connections and event processing.",

            },

            {

              name: "Configuration synchronization",

              tooltip:

                "Changes to rules, decoders, and agent configurations on master automatically replicate to all cluster workers.",

            },

            {

              name: "Agent failover",

              tooltip:

                "Agents configured with multiple manager addresses automatically reconnect to healthy node if primary manager fails.",

            },

          ],

        },

        {

          name: "Indexer performance",

          tooltip:

            "OpenSearch cluster with sharding, replication, and tuning handles high ingest rates and fast queries.",

          children: [

            {

              name: "Horizontal scaling",

              tooltip:

                "Add indexer nodes to cluster to increase indexing throughput and query parallelization as data volumes grow.",

            },

            {

              name: "Shard optimization",

              tooltip:

                "Configure shard count and size based on data volume to balance indexing performance and query latency.",

            },

            {

              name: "Index lifecycle policies",

              tooltip:

                "Automatically move old indices to slower storage, compress, and delete based on retention policies to manage costs.",

            },

            {

              name: "Caching and tuning",

              tooltip:

                "JVM heap sizing, query caching, and merge policies optimize indexer performance for workload characteristics.",

            },

          ],

        },

        {

          name: "Performance monitoring",

          tooltip:

            "Built-in metrics and external monitoring tools track Wazuh performance for capacity planning and troubleshooting.",

          children: [

            {

              name: "Manager metrics",

              tooltip:

                "API exposes metrics for event rates, queue sizes, rule execution times, and agent connection counts.",

            },

            {

              name: "Cluster health",

              tooltip:

                "Dashboard displays cluster status, node availability, and synchronization state for operational awareness.",

            },

            {

              name: "Indexer monitoring",

              tooltip:

                "OpenSearch APIs provide cluster health, indexing rates, search latency, and resource utilization metrics.",

            },

          ],

        },

      ],

    },

 

    // ───────────────────── Benefits & Value Proposition ─────────────────────

    {

      name: "Benefits & Value Proposition",

      tooltip:

        "Wazuh delivers comprehensive security monitoring with zero license costs, full source code transparency, and enterprise-grade capabilities.",

      children: [

        {

          name: "Open source advantages",

          tooltip:

            "Open-source licensing eliminates vendor lock-in and enables security audits, custom modifications, and community collaboration.",

          children: [

            {

              name: "No licensing costs",

              tooltip:

                "Free to download, deploy, and scale without per-agent fees or capacity limitations common in commercial SIEMs.",

            },

            {

              name: "Source code transparency",

              tooltip:

                "Full source code availability allows security audits, custom extensions, and understanding of detection logic.",

            },

            {

              name: "Community ecosystem",

              tooltip:

                "Active community contributes rules, integrations, and knowledge through forums, GitHub, and documentation.",

            },

            {

              name: "No vendor lock-in",

              tooltip:

                "Open formats and APIs prevent dependency on single vendor; easily migrate or integrate with other tools.",

            },

          ],

        },

        {

          name: "Comprehensive coverage",

          tooltip:

            "Single platform covers endpoint security, cloud monitoring, vulnerability detection, compliance, and SIEM functions.",

          children: [

            {

              name: "Unified visibility",

              tooltip:

                "Centralizes security monitoring across on-premises servers, cloud workloads, containers, and SaaS applications.",

            },

            {

              name: "Multi-layered defense",

              tooltip:

                "Combines log analysis, file integrity, rootkit detection, and vulnerability scanning for defense in depth.",

            },

            {

              name: "Cross-platform support",

              tooltip:

                "Monitors Linux, Windows, macOS, Solaris, AIX, and HP-UX with consistent detection capabilities.",

            },

          ],

        },

        {

          name: "Operational efficiency",

          tooltip:

            "Automated response, pre-built integrations, and compliance reporting reduce manual security operations workload.",

          children: [

            {

              name: "Automated response",

              tooltip:

                "Active response automatically blocks attackers and contains threats without manual intervention.",

            },

            {

              name: "Compliance automation",

              tooltip:

                "Continuous compliance monitoring and reporting reduce audit preparation time and demonstrate controls.",

            },

            {

              name: "Integration ecosystem",

              tooltip:

                "Pre-built integrations with SIEMs, ticketing, and collaboration tools streamline security workflows.",

            },

          ],

        },

        {

          name: "Enterprise scalability",

          tooltip:

            "Architecture scales from small businesses to large enterprises with clustering, high availability, and performance tuning.",

          children: [

            {

              name: "Flexible deployment",

              tooltip:

                "Deploy on-premises, in cloud, or hybrid with all-in-one or distributed architectures matching organizational needs.",

            },

            {

              name: "High availability",

              tooltip:

                "Manager clustering and indexer replication ensure monitoring continues during maintenance and failures.",

            },

            {

              name: "Growth accommodation",

              tooltip:

                "Start small and scale horizontally by adding managers and indexers as agent count and data volume increase.",

            },

          ],

        },

        {

          name: "Community and support",

          tooltip:

            "Active community, comprehensive documentation, and commercial support options provide assistance at all levels.",

          children: [

            {

              name: "Documentation",

              tooltip:

                "Extensive documentation covers installation, configuration, rule writing, API usage, and troubleshooting.",

            },

            {

              name: "Community forums",

              tooltip:

                "Community members and Wazuh team answer questions and share knowledge on official forums and Slack.",

            },

            {

              name: "Commercial support",

              tooltip:

                "Wazuh Inc. offers paid support subscriptions with SLAs, priority assistance, and professional services.",

            },

            {

              name: "Training and certification",

              tooltip:

                "Official training courses and certification programs help teams build Wazuh expertise.",

            },

          ],

        },

      ],

    },

  ],

};