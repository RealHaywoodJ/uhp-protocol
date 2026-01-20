# UHP Protocol Technical Roadmap

## Phase 1: Reference Implementation (Months 1-6) ✅ In Progress

### Core Protocol Development
- [ ] Finalize protocol specification (API endpoints, data formats)
- [ ] Implement `uhp-server` (Rust/Node.js backend)
- [ ] WebAuthn integration (FIDO2 authentication)
- [ ] Basic OAuth 2.0 provider functionality
- [ ] QRL testnet integration (XMSS signing)

### Deliverables
- Functional handle registration on QRL testnet
- Passwordless authentication demo
- Developer SDK (JavaScript/TypeScript)
- CLI tool for instance management
- Documentation site

**Success Criteria:** 100+ GitHub stars, 10+ contributors, working testnet demo

---

## Phase 2: Mainnet Launch (Months 7-12) 📅 Planned

### Production Readiness
- [ ] Security audit (smart contracts + backend)
- [ ] QRL mainnet deployment
- [ ] Production-grade `uhp-server` v1.0
- [ ] Rate limiting, DDoS protection, monitoring
- [ ] Backup/recovery mechanisms

### Ecosystem Integrations
- [ ] "Sign in with UHP" SDKs (React, Vue, Next.js)
- [ ] WordPress plugin
- [ ] Browser extension (Chrome, Firefox)
- [ ] Mobile SDKs (iOS, Android)

**Success Criteria:** 10,000 handles, 50+ website integrations, zero critical CVEs

---

## Phase 3: Ecosystem Growth (Year 2) 📅 Planned

### User Experience
- [ ] Native mobile apps (iOS, Android)
- [ ] Browser extension with auto-fill
- [ ] Social verification (Twitter, GitHub, LinkedIn)
- [ ] Handle marketplace (transfers, sales)

### Developer Tools
- [ ] Shopify plugin
- [ ] Webflow integration
- [ ] Python SDK
- [ ] Go SDK
- [ ] Rust SDK

**Success Criteria:** 100,000 handles, 500+ integrations, 10+ independent instances

---

## Phase 4: Crypto-Agility & Quantum Evolution (Years 2-5) 📅 Planned

### Signature Scheme Modularity

**Quarter 1-2 (Months 13-18): Design & Abstraction**
- [ ] Design `PqSigner` trait/interface for pluggable signature backends
  - Abstract sign/verify operations
  - Support for key generation, serialization
  - Metadata (algorithm type, key size, signature size)
- [ ] Refactor existing XMSS implementation into modular backend
- [ ] Add signature scheme negotiation to protocol (capabilities exchange)
- [ ] Backwards compatibility layer for existing XMSS handles

**Quarter 3-4 (Months 19-24): ML-DSA-87 Implementation**
- [ ] Implement ML-DSA-87 (Dilithium) backend via liboqs or Rust crypto libraries
  - **Priority:** Post-QRL Zond 2.0 mainnet migration
  - Target: Primary signature scheme for new handles
- [ ] Performance benchmarking vs XMSS
  - Sign/verify latency (target: <10ms per operation)
  - Signature size comparison (ML-DSA-87 ~4.5KB vs XMSS ~2.5KB)
  - Memory footprint for DID workloads
- [ ] Migration tooling for XMSS → ML-DSA-87 handle upgrades
- [ ] Dual-signing support during transition period

**Year 3-4: Advanced PQC Features**
- [ ] SLH-DSA (SPHINCS+) backend implementation
  - Evaluate for high-security, low-frequency signing use cases
  - Assess signature size trade-offs (~50KB signatures)
- [ ] Hybrid signature schemes (optional)
  - XMSS + ML-DSA-87 dual signatures for ultra-paranoid mode
  - Classical + PQC hybrid for transitional compatibility
- [ ] Threshold signatures for multi-party control (DAO governance)
- [ ] Hardware security module (HSM) integration

**Year 4-5: Standards Alignment**
- [ ] Track NIST PQC standardization updates
- [ ] Implement new NIST-approved algorithms as they emerge
- [ ] IETF standards participation (potential RFC submission)
- [ ] Formal verification of cryptographic implementations

### Post-Quantum WebAuthn
- [ ] Monitor FIDO Alliance PQC specs
- [ ] Implement hybrid WebAuthn (classical ECDSA + PQC)
- [ ] Full PQC WebAuthn when standards finalize

**Success Criteria:** 
- ML-DSA-87 support production-ready within 6 months of QRL Zond mainnet
- <5% performance degradation vs XMSS for typical DID operations
- 500,000+ handles, mainstream adoption trajectory

---

## Phase 5: Global Standardization (Years 5-10) 📅 Vision

### Protocol Maturation
- [ ] IETF RFC publication (UHP as internet standard)
- [ ] W3C DID Method specification
- [ ] Academic peer review and formal security proofs
- [ ] Multi-year security audits

### Ecosystem Dominance
- [ ] 10M+ handles registered
- [ ] 10,000+ websites using "Sign in with UHP"
- [ ] 100+ independent instances worldwide
- [ ] Government/enterprise adoption (passports, corporate SSO)

---

## Crypto-Agility Architecture Notes

### Design Principles
1. **No Hard Lock-Ins:** Every cryptographic primitive must be swappable via interfaces
2. **Performance First:** Stateless schemes (ML-DSA) preferred for scalability
3. **Ecosystem Alignment:** Track QRL's migration (XMSS → ML-DSA-87 → SLH-DSA)
4. **Standards Compliance:** NIST-approved algorithms take priority
5. **Graceful Degradation:** Old handles continue working during transitions

### Signature Backend Interface (Pseudocode)
```rust
trait PqSigner {
    fn generate_keypair(&self) -> Result<(PublicKey, SecretKey)>;
    fn sign(&self, message: &[u8], secret_key: &SecretKey) -> Result<Signature>;
    fn verify(&self, message: &[u8], signature: &Signature, public_key: &PublicKey) -> bool;
    fn algorithm_id(&self) -> AlgorithmId; // XMSS, ML-DSA-87, SLH-DSA, etc.
    fn key_size(&self) -> usize;
    fn signature_size(&self) -> usize;
}

// Implementations:
struct XmssSigner { /* QRL-native XMSS via go-qrllib */ }
struct MlDsa87Signer { /* Dilithium via liboqs */ }
struct SlhDsaSigner { /* SPHINCS+ via liboqs */ }
```

### Migration Strategy
- **Opt-In Upgrades:** Users choose when to migrate XMSS → ML-DSA-87
- **Dual Signing Period:** Instances support both schemes simultaneously (6-12 months)
- **Blockchain Records:** Handle registry stores algorithm metadata per handle
- **Client Compatibility:** SDKs auto-negotiate best supported algorithm

---

## Community Feedback Integration

**From QRL Discord (Jan 2025):**
- ✅ Avoid hard-locking to XMSS forever → Implemented via `PqSigner` abstraction
- ✅ Align with QRL Zond 2.0 (ML-DSA-87 primary) → Roadmap priority post-mainnet
- ✅ Performance over purity → Stateless ML-DSA preferred for scale
- ✅ DID protocol useful for QRL ecosystem → Cross-pollination opportunities

**Ongoing:** Monitor QRL dev channels, NIST announcements, FIDO Alliance PQC working groups

---

## How to Contribute

See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- How to pick a roadmap item
- Development setup
- Testing requirements
- PR process

**High-Priority Help Needed:**
- 🔐 Cryptographers: Review signature scheme design
- 🧑‍💻 Rust/TypeScript devs: Implement modular backends
- 📊 Performance engineers: Benchmark signing latency
- 📝 Technical writers: Document crypto-agility architecture

---

**Last Updated:** January 2025  
**Maintainer:** Ethan Munson (@RealHaywoodJ)
