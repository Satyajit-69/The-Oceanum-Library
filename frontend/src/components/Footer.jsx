import { Brain, Mail, MapPin, Phone, Github, Linkedin, ArrowRight } from 'lucide-react';

function Footer() {
    const footerLinks = {
        product: [
            { name: 'Lexa RAG Agent', path: '/rag' },
            { name: 'Meeku Voice Agent', path: '/voice-memo' },
            { name: 'Documentation', path: '/docs' },
            { name: 'API Reference', path: '/api' },
        ],
        company: [
            { name: 'About Us', path: '/about' },
            { name: 'Careers', path: '/careers' },
            { name: 'Blog', path: '/blog' },
            { name: 'Press Kit', path: '/press' },
        ],
        resources: [
            { name: 'Tutorials', path: '/tutorials' },
            { name: 'Community', path: '/community' },
            { name: 'Support', path: '/support' },
            { name: 'Status', path: '/status' },
        ],
        legal: [
            { name: 'Privacy Policy', path: '/privacy' },
            { name: 'Terms of Service', path: '/terms' },
            { name: 'Cookie Policy', path: '/cookies' },
            { name: 'Licenses', path: '/licenses' },
        ],
    };

    const socialLinks = [
        { icon: Github, href: 'https://github.com', label: 'GitHub' },
        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    ];

    return (
        <footer className="relative bg-black overflow-hidden border-t border-zinc-900 mt-20">
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 pt-20 pb-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <h3 className="text-2xl font-bold text-white">The Oceanum Library 🐬</h3>
                        </div>
                        <p className="text-zinc-400 mb-6 leading-relaxed">
                            Empowering the future with neural intelligence. Advanced AI agents for retrieval-augmented generation and voice interactions.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">satyajitsahoo28252@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm">7064539367</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                                <MapPin className="w-4 h-4" />
                                <span className="text-sm">Dhenkanal Odisha </span>
                            </div>
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-lg">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link, i) => (
                                <li key={i}>
                                    <a href={link.path} className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group">
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                                        <span>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-lg">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, i) => (
                                <li key={i}>
                                    <a href={link.path} className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group">
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                                        <span>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-lg">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link, i) => (
                                <li key={i}>
                                    <a href={link.path} className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group">
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                                        <span>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-lg">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, i) => (
                                <li key={i}>
                                    <a href={link.path} className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group">
                                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                                        <span>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Copyright */}
                    <p className="text-zinc-500 text-sm">
                        © 2026 Oceanum AI Library. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-4">
                        {socialLinks.map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                aria-label={social.label}
                                className="w-10 h-10 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-black hover:bg-white hover:border-white transition-all hover:scale-110"
                            >
                                <social.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;