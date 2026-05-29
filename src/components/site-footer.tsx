import { Globe, AtSign, MessageCircle, Share2 } from "lucide-react";
import { Brand } from "./brand";
import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "AI Tools", href: "/ai" },
    { label: "Test Engine", href: "/tests" },
  ],
  Resources: [
    { label: "Branches", href: "/branches" },
    { label: "Question Bank", href: "/admin/questions" },
    { label: "Leaderboard", href: "/dashboard/leaderboard" },
    { label: "Analytics", href: "/dashboard/analytics" },
  ],
  Company: [
    { label: "About BEU", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "DMCA", href: "#" },
  ],
};

const socials = [
  { icon: Globe, href: "#", label: "Website" },
  { icon: AtSign, href: "#", label: "Email" },
  { icon: MessageCircle, href: "#", label: "Chat" },
  { icon: Share2, href: "#", label: "Share" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <Brand />
            <p className="mt-4 text-sm text-muted max-w-xs">
              AI-powered test preparation platform for BEU engineering students. Practice, learn, and excel.
            </p>
            <div className="flex gap-3 mt-4">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition-colors" aria-label={s.label}>
                  <s.icon className="w-4 h-4 text-muted" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-foreground mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-xs text-muted hover:text-foreground transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">2024 Infinity Test Panel. All rights reserved.</p>
          <p className="text-xs text-muted">Made with care for BEU students</p>
        </div>
      </div>
    </footer>
  );
}
