"use client";

type FoodFooterProps = {
  currentYear: number;
};

const companyLinks = [
  { label: "About us", href: "#about" },
  { label: "Team", href: "#team" },
  { label: "Careers", href: "#careers" },
  { label: "Blog", href: "#blog" },
];

const contactLinks = [
  { label: "Help & Support", href: "#support" },
  { label: "Partner with us", href: "#partner" },
  { label: "Ride with us", href: "#ride" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "#terms" },
  { label: "Refund & Cancellation", href: "#refunds" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Cookie Policy", href: "#cookie" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#instagram",
    icon: (
      <svg
        aria-hidden="true"
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <rect width={14} height={14} x={5} y={5} rx={4} ry={4} />
        <circle cx={12} cy={12} r={3.25} />
        <circle cx={16.25} cy={7.75} r={0.75} fill="currentColor" stroke="none" />
      </svg>
    ),
    className:
      "text-slate-200 hover:border-orange-400 hover:text-orange-200",
  },
  {
    label: "Facebook",
    href: "#facebook",
    icon: (
      <svg
        aria-hidden="true"
        className="h-8 w-8"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M13.2 21v-7.2h2.4l.3-2.8h-2.7v-1.6c0-.8.3-1.2 1.2-1.2h1.5V5.6c-.6-.1-1.4-.2-2.3-.2-2.1 0-3.5 1.3-3.5 3.6v2h-2.3v2.8h2.3V21h3.1Z" />
      </svg>
    ),
    className:
      "bg-white text-[#212121] hover:bg-orange-500 hover:text-white",
  },
  {
    label: "Twitter",
    href: "#twitter",
    icon: (
      <svg
        aria-hidden="true"
        className="h-8 w-8"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M19.9 7.9c.1.2.1.5.1.7 0 4.6-3.5 9.9-9.9 9.9-2 0-3.8-.6-5.4-1.6.3 0 .6.1.9.1 1.6 0 3-.5 4.2-1.4-1.5 0-2.7-1-3.1-2.3.2 0 .4.1.6.1.3 0 .6-.1.9-.2-1.6-.3-2.7-1.7-2.7-3.3.4.2.8.3 1.2.3-.7-.5-1.2-1.4-1.2-2.3 0-.5.1-.9.4-1.4 1.7 2.1 4.2 3.4 7 3.6-.1-.2-.1-.5-.1-.7 0-1.7 1.4-3.1 3.1-3.1.9 0 1.7.4 2.3 1 .7-.1 1.4-.4 2-.7-.2.7-.7 1.3-1.4 1.7.6-.1 1.2-.2 1.7-.5-.4.6-.9 1.1-1.4 1.5Z" />
      </svg>
    ),
    className:
      "text-slate-100 hover:text-orange-200",
  },
];

export function FoodFooter({ currentYear }: FoodFooterProps) {
  return (
    <footer className="bg-[#1f1f1f] px-4 py-16 text-gray-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row md:justify-between">
        <div className="grid flex-1 gap-10 sm:grid-cols-3">
          <FooterColumn  title="Company" links={companyLinks} />
          <FooterColumn title="Contact" links={contactLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>
        <div className="w-full max-w-sm">
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#969696]">
            Follow us
          </span>
          <div className="mt-5 flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                aria-label={link.label}
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${link.className}`}
                href={link.href}
              >
                {link.icon}
              </a>
            ))}
          </div>

          <p className="mt-6 text-sm font-bold text-gray-400">
            Receive exclusive food offers in your mailbox
          </p>

          <form className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="sr-only" htmlFor="food-subscribe">
              Email address
            </label>
            <div className="flex flex-1 items-center gap-3 rounded-xl bg-[#424242] px-4 py-2 shadow-inner transition focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-400/20">
              <svg
                aria-hidden="true"
                className="h-7 w-7 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 7c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
                />
                <path d="m4 7 8 5 8-5" />
              </svg>
              <input
                className="flex-1 bg-[#424242] text-sm text-slate-200 placeholder:text-slate-500"
                id="food-subscribe"
                name="food-subscribe"
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <button
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#f39c1d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(243,156,29,0.35)] transition hover:bg-[#f0a83c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1f1f1f] sm:w-auto"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-14 w-full max-w-6xl border-t border-white/10 pt-6">
        <div className="flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <span>All rights Reserved</span>
            <span aria-hidden="true">©</span>
            <span className="font-semibold text-white">Food Wagen, {currentYear}</span>
          </p>
          <p className="flex items-center gap-1">
            <span>Made with</span>
            <svg
              aria-hidden="true"
              className="h-4 w-4 text-orange-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 17.1a.75.75 0 0 1-.45-.15C8 15.72 3 11.76 3 7.29A4.29 4.29 0 0 1 7.29 3c1.44 0 2.6.76 3.21 1.74C11.1 3.76 12.26 3 13.71 3 16.09 3 18 4.95 18 7.29c0 4.47-5 8.43-6.55 9.66a.75.75 0 0 1-.45.15Z" />
            </svg>
            <span>by</span>
            <a
              className="font-semibold text-white transition-colors hover:text-orange-400"
              href="https://themewagon.com/"
              rel="noreferrer"
              target="_blank"
            >
              Themewagon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-slate-400">
        {links.map((link) => (
          <li key={link.label}>
            <a
              className="transition-colors hover:text-white"
              href={link.href}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

