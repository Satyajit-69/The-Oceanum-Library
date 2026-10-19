import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import oceanAcidification from "/ocean-acidification-animate.svg";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Lexa RAG Agent", path: "/rag" },
      { name: "Meeku Voice Agent", path: "/voice-memo" },
      { name: "Documentation", path: "/docs" },
      { name: "API Reference", path: "/api" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Blog", path: "/blog" },
      { name: "Press Kit", path: "/press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Tutorials", path: "/tutorials" },
      { name: "Community", path: "/community" },
      { name: "Support", path: "/support" },
      { name: "Status", path: "/status" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Cookie Policy", path: "/cookies" },
      { name: "Licenses", path: "/licenses" },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/Satyajit-69/The-Oceanum-Library", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/satyajit-sahoo-b16795315/", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer
      className="mt-20 bg-black"
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      <div className="mx-auto w-full px-6 sm:px-12">
        {/* Main grid: tagline on the left, link columns on the right */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 lg:grid-cols-6">
          {/* Left column: tagline, contact, and the SVG at the bottom */}
          <div className="col-span-2 flex flex-col justify-between gap-10">
            <div>
              <p className="max-w-sm text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl">
                Empowering with Tech & AI 
              </p>

              <div className="mt-8 space-y-3 text-sm text-zinc-500">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4" />
                  <span>satyajitsahoo28252@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4" />
                  <span>7064539367</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4" />
                  <span>Dhenkanal, Odisha</span>
                </div>
              </div>
            </div>

            <img
              src={oceanAcidification}
              alt="Ocean acidification illustration"
              className="h-40 w-40 object-contain sm:h-48 sm:w-48"
            />
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title} className="text-center lg:self-center">
              <h4 className="mb-6 text-sm font-medium text-white">{group.title}</h4>
              <ul className="space-y-3.5">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-zinc-500 transition-colors duration-200 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
          <p className="text-sm text-zinc-500">
            © 2026 The Oceanum Library. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-500 transition-all duration-200 hover:border-white hover:bg-white hover:text-black"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}