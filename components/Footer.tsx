import React from 'react';

const FooterLogo: React.FC = () => (
    <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
            <img src="/fave-removebg-preview.png" alt="Fave" className="h-20 w-30 rounded full" />
        </div>
    </div>
);

const FooterLink = ({ href, children }: {href: string; children: React.ReactNode}) => (
    <a href={href} className="text-gray-500 hover:text-gray-800 transition-colors">{children}</a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-light text-gray-800 py-16 px-6 md:px-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-1">
                    <FooterLogo />
                    <p className="mt-4 text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} Fave Inc. <br />
                        All Rights Reserved.
                    </p>
                </div>
                <div className="md:col-span-1">
                    <h3 className="font-bold mb-4">Company</h3>
                    <ul className="space-y-3">
                        <li><FooterLink href="#">About</FooterLink></li>
                        <li><FooterLink href="#">Careers</FooterLink></li>
                        <li><FooterLink href="#">Press</FooterLink></li>
                        <li><FooterLink href="#">Blog</FooterLink></li>
                    </ul>
                </div>
                <div className="md:col-span-1">
                    <h3 className="font-bold mb-4">Resources</h3>
                    <ul className="space-y-3">
                        <li><FooterLink href="#">Help Center</FooterLink></li>
                        <li><FooterLink href="#">Community</FooterLink></li>
                        <li><FooterLink href="#">For Artists</FooterLink></li>
                        <li><FooterLink href="#">Developers</FooterLink></li>
                    </ul>
                </div>
                <div className="md:col-span-1">
                    <h3 className="font-bold mb-4">Support</h3>
                    <ul className="space-y-3">
                        <li><FooterLink href="#">Contact Us</FooterLink></li>
                        <li><FooterLink href="#">Terms of Service</FooterLink></li>
                        <li><FooterLink href="#">Privacy Policy</FooterLink></li>
                        <li><FooterLink href="#">Cookie Policy</FooterLink></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
