# Universal Handle Protocol (UHP)

## A Quantum-Resistant Decentralized Identity Standard for the Post-Email Internet

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Discord](https://img.shields.io/badge/Discord-Join%20Us-7289da)](https://discord.gg/uhp-protocol)

---

## 🚀 What is UHP?

Universal Handle Protocol (UHP) is an **open-source, decentralized identity protocol** that replaces email-based authentication with quantum-resistant handles.

**One handle. One login. Everywhere.**

```
@yourname → Works on:
├─ Web2: Netflix, Spotify, Reddit, Medium
├─ Web3: DeFi, NFTs, DAOs, dApps  
├─ Professional: LinkedIn, company tools
└─ Social: Twitter, Discord, Telegram
```

### Key Features

- ✅ **Quantum-Resistant:** Built on QRL blockchain (XMSS signatures)
- ✅ **Passwordless:** WebAuthn (Face ID, fingerprint, hardware keys)
- ✅ **Decentralized:** Federated like email - anyone can run an instance
- ✅ **Email-Free:** No email required for authentication
- ✅ **Open Protocol:** MIT licensed, community-governed
- ✅ **Privacy-First:** You own your data, not corporations

---

## 📚 Documentation

- **[Whitepaper (Full Technical Spec)](./uhp-whitepaper.md)** - 25 pages, academic-grade
- **[2-Page Explainer](./UHP-Explainer.md)** - Quick overview for non-technical readers
- **[Protocol Specification](./docs/protocol-spec.md)** - API endpoints, data formats *(coming soon)*
- **[Integration Guide](./docs/integration-guide.md)** - How to add "Sign in with UHP" *(coming soon)*

---

## 🎯 The Problem

**Email-based identity is broken:**

- **Centralized:** Google/Microsoft control 90% of email
- **Privacy Invasion:** Email providers scan your messages for ads
- **Quantum Vulnerable:** RSA/ECDSA will break by 2030-2035
- **Fragmented:** 130+ accounts, 130+ passwords

**Existing solutions don't solve it:**
- ENS: Ethereum-only, annual fees, no Web2 integration
- Google OAuth: Centralized surveillance
- Unstoppable Domains: No comprehensive authentication
- DID (W3C): Too complex, zero adoption

---

## 💡 The UHP Solution

### Architecture Overview

```
┌──────────────────────────────────────────────┐
│         UHP INSTANCES (Federated)            │
│  uhp.org  |  uhp.xyz  |  uni.edu  |  dao.io │
└────────────────┬─────────────────────────────┘
                 │
         ┌───────▼────────┐
         │ QRL Blockchain │  ← Quantum-resistant verification
         │ (Handle Registry)│
         └────────────────┘
                 │
         ┌───────▼────────┐
         │    Websites    │  ← "Sign in with UHP" button
         │  Apps, dApps   │
         └────────────────┘
```

### How It Works

1. **Claim your handle:** `@alice@uhp.org`
2. **Set up biometrics:** Face ID, fingerprint, or hardware key
3. **Use anywhere:** Click "Sign in with UHP" on any website
4. **Done:** No email, no password, no tracking

---

## 🛠️ Project Status

**Current Phase:** Pre-Alpha (Whitepaper & Specification)

### Roadmap

| Phase | Timeline | Status | Goals |
|-------|----------|--------|-------|
| **Phase 1: Reference Implementation** | Months 1-6 | 🔄 In Progress | Whitepaper, `uhp-server`, SDK, testnet |
| **Phase 2: Mainnet Launch** | Months 7-12 | 📅 Planned | Production v1.0, 10K handles, 50 sites |
| **Phase 3: Ecosystem Growth** | Year 2 | 📅 Planned | Mobile apps, plugins, 100K handles |
| **Phase 4: Quantum Transition** | Years 3-5 | 📅 Planned | Full PQC WebAuthn, mainstream adoption |

---

## 🤝 Get Involved

We need contributors! Here's how you can help:

### For Developers

- **Backend:** Node.js/TypeScript developers for `uhp-server`
- **Smart Contracts:** Solidity/QRL developers for blockchain integration
- **SDKs:** Build libraries for React, Vue, Python, Go, Rust
- **DevOps:** Docker, Kubernetes, deployment automation

### For Cryptographers

- **Security Review:** Audit cryptographic primitives
- **Formal Verification:** Prove protocol security properties
- **PQC Research:** Evaluate alternative quantum-resistant algorithms

### For Designers

- **UX/UI:** Design instance dashboards, consent screens
- **Brand:** Logo, website, marketing materials
- **Documentation:** Diagrams, tutorials, explainer videos

### For Community Builders

- **Writing:** Blog posts, tutorials, documentation
- **Social Media:** Twitter, Reddit, Discord moderation
- **Advocacy:** Spread the word, recruit developers

---

## 📋 Contributing

**We welcome all contributors!** Here's how to get started:

1. **Read the docs:**
   - [Whitepaper](./uhp-whitepaper.md) - Understand the protocol
   - [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guidelines
   - [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) - Community standards

2. **Join the community:**
   - [Discord](https://discord.gg/uhp-protocol) - Daily discussions
   - [GitHub Discussions](https://github.com/uhp-protocol/uhp/discussions) - Long-form Q&A
   - [Twitter](https://twitter.com/UHProtocol) - Announcements

3. **Pick an issue:**
   - Check [`good-first-issue`](https://github.com/uhp-protocol/uhp/labels/good-first-issue) label
   - Or propose your own feature/fix

4. **Submit a PR:**
   - Fork the repo
   - Create a feature branch
   - Write tests
   - Open a pull request

---

## 📦 Repository Structure

```
uhp-protocol/
├── whitepaper/              # Technical whitepaper
│   ├── uhp-whitepaper.md    # Full spec
│   └── UHP-Explainer.md     # 2-page summary
├── uhp-server/              # Reference implementation (Node.js)
│   ├── src/
│   │   ├── api/             # REST API endpoints
│   │   ├── auth/            # WebAuthn integration
│   │   ├── blockchain/      # QRL integration
│   │   └── federation/      # Instance-to-instance protocol
│   └── tests/
├── uhp-sdk/                 # JavaScript SDK for websites
│   ├── src/
│   └── examples/
├── uhp-cli/                 # Command-line tool
├── smart-contracts/         # QRL smart contracts
│   ├── HandleRegistry.sol
│   └── InstancePKI.sol
├── docs/                    # Documentation
│   ├── protocol-spec.md
│   ├── integration-guide.md
│   └── deployment.md
├── examples/                # Example integrations
│   ├── nextjs/
│   ├── react/
│   └── wordpress/
└── README.md
```

---

## 🔐 Security

**Security is our top priority.**

- **Report vulnerabilities:** security@uhprotocol.org (PGP key in repo)
- **Bug bounty:** Coming soon (TBD)
- **Audits:** Security audits planned for Phase 2 (Mainnet Launch)

**Current security measures:**
- XMSS signatures (quantum-resistant)
- WebAuthn (phishing-resistant)
- OAuth 2.0 (industry standard)
- Federated trust (no single point of failure)

---

## 💰 Funding & Governance

**UHP is an open protocol, not a company.**

### Funding Model

- **Grants:** Applying to Protocol Labs, Ethereum Foundation, Gitcoin
- **Donations:** GitHub Sponsors, cryptocurrency donations
- **DAO Treasury:** (Planned) Community-governed funding
- **For-Profit Layer:** (Optional) Managed instance hosting by third parties

### Governance

- **Technical Steering Committee:** 7-9 core contributors, 2/3 majority
- **Working Groups:** Security, Cryptography, Federation, DevRel
- **Community Voting:** (If DAO launches) Token holders vote on major decisions

**License:** MIT (permissive open-source)

---

## 📊 Market Opportunity

- **Decentralized Identity Market:** $1B (2024) → $371B (2034)
- **Auth0 acquisition:** $6.5B (2021)
- **ENS revenue:** $22.5M in 9 months (2024)
- **Unstoppable Domains sales:** $300M+ lifetime

**UHP's unique position:**
- Only quantum-resistant federated identity protocol
- Works across Web2 and Web3
- Open protocol (not tied to single blockchain)
- Email-free by design

---

## 🌟 Why UHP Will Succeed

**1. Technology is Ready**
- WebAuthn: Widely supported (Chrome, Firefox, Safari, Edge)
- QRL: Live since 2018, battle-tested
- OAuth 2.0: Developers already know it

**2. Timing is Perfect**
- NIST released PQC standards (2024)
- BlackRock warned of quantum threat (May 2025)
- Privacy concerns at all-time high
- Web3 identity is still unsolved

**3. Open-Source Advantage**
- No vendor lock-in
- Community-driven development
- Censorship-resistant
- Transparent and auditable

---

## 📞 Contact

- **Email:** dev@uhprotocol.org
- **Discord:** [Join our server](https://discord.gg/uhp-protocol)
- **Twitter:** [@UHProtocol](https://twitter.com/UHProtocol)
- **GitHub Discussions:** [Ask questions](https://github.com/uhp-protocol/uhp/discussions)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Patent Policy:** All contributors grant royalty-free patent licenses. Defensive patent pool (LOT Network model).

---

## 🙏 Acknowledgments

- **QRL Foundation** - Quantum-resistant blockchain technology
- **FIDO Alliance** - WebAuthn standards
- **IETF OAuth Working Group** - OAuth 2.0 framework
- **Ethereum community** - Pioneering decentralized identity research
- **All contributors** - Thank you for building the future!

---

## 🚀 Call to Action

**The future of internet identity is:**
- ✅ Decentralized (not controlled by corporations)
- ✅ Quantum-safe (future-proof)
- ✅ Privacy-first (you own your data)
- ✅ Universal (works everywhere)

**Join us in building it.**

[Read the Whitepaper](./uhp-whitepaper.md) | [Join Discord](https://discord.gg/uhp-protocol) | [Contribute Code](./CONTRIBUTING.md)

---

*"Own your identity. Own your future."*

**Universal Handle Protocol** - Decentralized Identity for the Post-Email Internet
