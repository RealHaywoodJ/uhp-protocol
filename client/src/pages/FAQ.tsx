import { useState } from 'react';
import Card from '../components/ui/Card';
import { ChevronDownIcon, ShieldIcon } from '../components/ui/Icons';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'What is the Universal Handle Protocol (UHP)?',
    answer:
      'UHP is an open, decentralized identity protocol that replaces email-based logins with portable, quantum-resistant handles. Your handle (like @alice@uhp.org) works across every UHP-compatible service — no passwords, no central authority, and no email required.',
  },
  {
    question: 'How is UHP different from "Sign in with Google"?',
    answer:
      'When you sign in with Google, your identity is controlled by Google. They can revoke access, track your logins, and you are locked into their ecosystem. UHP is federated — like email — so anyone can run an instance. Your handle is portable and you truly own it. No single company is in control.',
  },
  {
    question: 'What does "quantum-resistant" mean?',
    answer:
      'Current cryptographic algorithms (like RSA) will be breakable by sufficiently powerful quantum computers. UHP is built with crypto-agility: it uses Ed25519 signatures today and has a clear upgrade path to post-quantum algorithms like ML-DSA-87 and SLH-DSA. When quantum computers arrive, your identity upgrades seamlessly.',
  },
  {
    question: 'Can I self-host my own UHP instance?',
    answer:
      'Yes. UHP is designed to be federated, just like email. Anyone can run their own instance and federate with the rest of the network. Self-hosting documentation is coming soon. In the meantime, you can explore the source code on GitHub.',
  },
  {
    question: 'When will quantum computers break current encryption?',
    answer:
      'Estimates vary, but most experts believe cryptographically relevant quantum computers are 10-20 years away. However, "harvest now, decrypt later" attacks mean adversaries are already collecting encrypted data to break in the future. Building quantum-resistant systems today is about being proactive, not reactive.',
  },
  {
    question: 'Is UHP production-ready?',
    answer:
      'Not yet. This is the Phase 1 reference implementation — a working proof of concept that demonstrates the core protocol: handle registration, WebAuthn authentication, Ed25519 signatures, and OAuth 2.0 + PKCE integration. It is meant for testing, feedback, and contribution, not production workloads.',
  },
  {
    question: 'How does the OAuth flow work?',
    answer:
      'UHP acts as a standard OAuth 2.0 provider with PKCE. Third-party websites redirect users to UHP for authentication, the user approves with biometrics (WebAuthn), and UHP issues an authorization code. The website exchanges this code for tokens. Developers already familiar with OAuth will find the integration straightforward.',
  },
  {
    question: 'How can I contribute to UHP?',
    answer:
      'UHP is open source under the MIT license. You can contribute by filing issues, submitting pull requests, improving documentation, or running your own instance. Visit the GitHub repository at github.com/RealHaywoodJ/uhp-protocol to get started.',
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  function toggleItem(index: number): void {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-uhp-50 dark:bg-uhp-950/50 mb-6">
          <ShieldIcon size={28} className="text-uhp-600 dark:text-uhp-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-surface-500 dark:text-surface-400 max-w-2xl mx-auto">
          Everything you need to know about the Universal Handle Protocol.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openItems.has(index);

          return (
            <Card
              key={index}
              padding="none"
              className="cursor-pointer"
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
              >
                <span className="text-base font-semibold text-surface-900 dark:text-white">
                  {item.question}
                </span>
                <span
                  className={`flex-shrink-0 text-surface-400 dark:text-surface-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDownIcon size={20} />
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0">
                  <p className="text-sm text-surface-500 dark:text-surface-400 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Still have questions?{' '}
          <a
            href="https://github.com/RealHaywoodJ/uhp-protocol/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-uhp-600 dark:text-uhp-400 hover:text-uhp-700 dark:hover:text-uhp-300 font-medium"
          >
            Start a discussion on GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
