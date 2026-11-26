(function () {
    const D = window.YRS_DATA || {};
    const activePage = document.body.dataset.page || 'home';
    const navCls = key => activePage === key ? 'nav-link active' : 'nav-link';
    const mobCls = key => activePage === key ? 'mob-nav-link active' : 'mob-nav-link';

    const headerMount = document.getElementById('siteHeaderMount');
    if (headerMount) {
        headerMount.innerHTML = `
        <header id="siteHeader" class="topbar">
            <div class="container-yrs h-[82px] flex justify-between items-center">
                <a href="index.html" class="flex items-center gap-3" aria-label="YRS Infotech home">
                    <img src="assets/img/logo/YRS Logo.svg"
                         onerror="this.onerror=null; this.src='https://yrsinfotech.com/assets/img/logo/YRS%20Logo.svg';"
                         alt="YRS Infotech" class="brand-logo">
                </a>

                <nav class="hidden lg:flex gap-9 items-center" aria-label="Primary">
                    <a href="index.html" class="${navCls('home')}">Home</a>
                    <a href="services.html" class="${navCls('services')}">Services</a>
                    <a href="projects.html" class="${navCls('projects')}">Projects</a>
                    <a href="about.html" class="${navCls('about')}">About</a>
                    <a href="careers.html" class="${navCls('careers')}">Careers</a>
                    <a href="contact.html" class="${navCls('contact')}">Contact</a>
                </nav>

                <!-- Icon-Only Hamburger Button (No 'Menu' Text) -->
                <button id="mobileMenuBtn" class="lg:hidden hamb-btn" onclick="toggleMobileMenu()" aria-label="Open navigation" aria-expanded="false" aria-controls="mobileDrawer">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </header>

        <div id="mobileOverlay" class="overlay fixed inset-0 bg-slate-900/40 z-50 lg:hidden" onclick="closeMobileMenu()"></div>
        <aside id="mobileDrawer" class="drawer fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl border-l border-slate-200 overflow-y-auto" aria-label="Mobile navigation">
            <div class="flex justify-between items-center p-5 border-b border-slate-200">
                <img src="assets/img/logo/YRS Logo.svg"
                     onerror="this.onerror=null; this.src='https://yrsinfotech.com/assets/img/logo/YRS%20Logo.svg';"
                     alt="YRS Infotech" class="h-10 w-auto">
                <button onclick="closeMobileMenu()" class="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#fff1f2] hover:text-[#ea384c] text-slate-700 transition" aria-label="Close navigation">
                    <i class="fas fa-times text-lg"></i>
                </button>
            </div>
            <nav class="p-5 flex flex-col gap-1.5" aria-label="Mobile">
                <a href="index.html" class="${mobCls('home')}"><span>Home</span><span class="text-xs opacity-75">→</span></a>
                <a href="services.html" class="${mobCls('services')}"><span>Services</span><span class="text-xs opacity-75">→</span></a>
                <a href="projects.html" class="${mobCls('projects')}"><span>Projects</span><span class="text-xs opacity-75">→</span></a>
                <a href="about.html" class="${mobCls('about')}"><span>About</span><span class="text-xs opacity-75">→</span></a>
                <a href="careers.html" class="${mobCls('careers')}"><span>Careers</span><span class="text-xs opacity-75">→</span></a>
                <a href="contact.html" class="${mobCls('contact')}"><span>Contact</span><span class="text-xs opacity-75">→</span></a>
            </nav>
        </aside>`;
    }

    const footerMount = document.getElementById('siteFooterMount');
    if (footerMount) {
        footerMount.innerHTML = `
        <footer class="yrs-blue-surface text-slate-200 py-8 sm:py-10 border-t border-[#0e1c54]">
            <div class="container-yrs">
                <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 pb-6 border-b border-white/15">
                    <!-- Brand & Both Chennai Office Addresses (Fills the 2-col span cleanly with zero dead space) -->
                    <div class="col-span-2 lg:col-span-2 flex flex-col justify-between gap-4">
                        <a href="index.html" class="inline-flex items-center bg-white px-3.5 py-2 rounded-xl shadow-sm self-start shrink-0" aria-label="YRS Infotech home">
                            <img src="assets/img/logo/YRS Logo.svg"
                                 onerror="this.onerror=null; this.src='https://yrsinfotech.com/assets/img/logo/YRS%20Logo.svg';"
                                 alt="YRS Infotech" class="h-9 sm:h-10 w-auto">
                        </a>
                        <div class="grid sm:grid-cols-2 gap-3.5 text-xs">
                            <div class="bg-white/5 border border-white/10 rounded-xl p-3">
                                <p class="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
                                    <i class="fas fa-location-dot text-[#ea384c] mr-1.5"></i>Head Office · West Mambalam
                                </p>
                                <p class="text-slate-300 leading-relaxed">No:10/1, Jayaram Street, Ethiraj Nagar, West Mambalam, Chennai 600033</p>
                            </div>
                            <div class="bg-white/5 border border-white/10 rounded-xl p-3">
                                <p class="font-bold text-white uppercase tracking-wider text-[11px] mb-1">
                                    <i class="fas fa-building text-[#ea384c] mr-1.5"></i>Branch Office · Saidapet
                                </p>
                                <p class="text-slate-300 leading-relaxed">20, Annamalai Nagar 3rd St, Ethiraj Nagar, Saidapet, Chennai 600033</p>
                            </div>
                        </div>
                    </div>

                    <!-- Quick Links (Left column on mobile 2-col grid) -->
                    <div class="col-span-1">
                        <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-2.5">Quick Links</h4>
                        <ul class="space-y-1">
                            <li><a class="footer-link !text-sm" href="index.html">Home</a></li>
                            <li><a class="footer-link !text-sm" href="services.html">Services</a></li>
                            <li><a class="footer-link !text-sm" href="projects.html">Projects</a></li>
                            <li><a class="footer-link !text-sm" href="about.html">About</a></li>
                        </ul>
                    </div>

                    <!-- Company (Right column on mobile 2-col grid) -->
                    <div class="col-span-1">
                        <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-2.5">Company</h4>
                        <ul class="space-y-1">
                            <li><a class="footer-link !text-sm" href="careers.html">Careers</a></li>
                            <li><a class="footer-link !text-sm" href="contact.html">Contact</a></li>
                            <li><button type="button" onclick="openModal('projModal')" class="footer-link !text-sm">Get a Quote</button></li>
                        </ul>
                    </div>

                    <!-- Connect (Compact 2-column split on mobile: Contact links left, Social icons right) -->
                    <div class="col-span-2 lg:col-span-1 pt-2 lg:pt-0 border-t border-white/10 lg:border-t-0">
                        <h4 class="text-white font-bold text-xs uppercase tracking-wider mb-2.5">Connect</h4>
                        <div class="flex flex-wrap lg:flex-col items-center lg:items-start justify-between gap-3">
                            <ul class="space-y-1 text-xs sm:text-sm">
                                <li><a class="footer-link !text-xs sm:!text-sm" href="mailto:admin@yrsinfotech.com">admin@yrsinfotech.com</a></li>
                                <li><a class="footer-link !text-xs sm:!text-sm" href="tel:+919840046168">+91 98400 46168</a></li>
                            </ul>
                            <div class="flex gap-2 shrink-0">
                                <a href="https://www.facebook.com/profile.php?id=61575268995037" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-white/10 border border-white/20 hover:bg-[#ea384c] hover:border-[#ea384c] text-white flex items-center justify-center transition" aria-label="Facebook"><i class="fab fa-facebook-f text-xs"></i></a>
                                <a href="https://www.instagram.com/yrsinfotech/" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-white/10 border border-white/20 hover:bg-[#ea384c] hover:border-[#ea384c] text-white flex items-center justify-center transition" aria-label="Instagram"><i class="fab fa-instagram text-xs"></i></a>
                                <a href="https://www.linkedin.com/company/yrs-infotech" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-white/10 border border-white/20 hover:bg-[#ea384c] hover:border-[#ea384c] text-white flex items-center justify-center transition" aria-label="LinkedIn"><i class="fab fa-linkedin-in text-xs"></i></a>
                                <a href="https://wa.me/919840046168" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-lg bg-white/10 border border-white/20 hover:bg-[#ea384c] hover:border-[#ea384c] text-white flex items-center justify-center transition" aria-label="WhatsApp"><i class="fab fa-whatsapp text-xs"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Compact Copyright Bar with right clearance on both mobile and desktop so floating buttons never overlap -->
                <div class="pt-4 pr-16 lg:pr-20 flex flex-row justify-between items-center gap-2 text-xs text-slate-300">
                    <p>© 2026 YRS Infotech Pvt. Ltd.</p>
                    <a href="#top" class="footer-link !text-xs shrink-0">Back to top ↑</a>
                </div>
            </div>
        </footer>

        <!-- FIXED BOTTOM-RIGHT WHATSAPP & FAQ QUICK ACTIONS -->
        <div class="fab-dock" aria-label="Quick Support Actions">
            <a href="services.html#faqSection" class="fab-btn fab-faq" aria-label="Frequently Asked Questions">
                <i class="fas fa-circle-question"></i>
                <span class="fab-tooltip">FAQs</span>
            </a>
            <a href="https://wa.me/919840046168?text=Hi%20YRS%20Infotech%2C%20I%20would%20like%20to%20enquire%20about%20a%20project." target="_blank" rel="noopener noreferrer" class="fab-btn fab-wa" aria-label="Chat on WhatsApp">
                <i class="fab fa-whatsapp"></i>
                <span class="fab-tooltip">WhatsApp Enquiry</span>
            </a>
        </div>`;
    }

    const modalsMount = document.getElementById('globalModalsMount');
    if (modalsMount) {
        modalsMount.innerHTML = `
        <!-- START A PROJECT MODAL -->
        <div id="projModal" class="modal-hide fixed inset-0 z-[60] bg-slate-900/45 items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="projT">
            <div class="modal-box bg-white rounded-2xl max-w-md w-full p-7 relative max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
                <button class="absolute top-4 right-4 w-9 h-9 rounded-lg hover:bg-[#fff1f2] hover:text-[#ea384c] text-slate-600 transition" onclick="closeModal()" aria-label="Close"><i class="fas fa-times"></i></button>
                <span class="eyebrow-label mb-2">Start a Project</span>
                <h3 id="projT" class="font-bold text-slate-900 text-2xl mb-1">Discuss your project</h3>
                <p class="text-sm text-slate-500 mb-5">Fill in your project details and send your enquiry directly to <strong>admin@yrsinfotech.com</strong>.</p>
                <form id="projF" class="space-y-4" novalidate>
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1" for="pn">Your name</label>
                        <input id="pn" name="name" class="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#ea384c]" autocomplete="name" placeholder="Full name">
                        <p class="err hidden text-xs text-[#ea384c] font-semibold mt-1">Please enter your name.</p>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1" for="pe">Work email</label>
                        <input id="pe" name="email" type="email" class="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#ea384c]" autocomplete="email" placeholder="you@company.com">
                        <p class="err hidden text-xs text-[#ea384c] font-semibold mt-1">Please enter a valid email address.</p>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1" for="pp">Phone <span class="text-slate-400 font-normal">(optional)</span></label>
                        <input id="pp" name="phone" type="tel" class="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#ea384c]" autocomplete="tel" placeholder="+91 98400 00000">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1" for="ps">Service needed</label>
                        <select id="ps" name="service" class="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#ea384c]">
                            <option value="">Choose a service</option>
                            ${(D.SERVICES || []).map(s => `<option>${s.title}</option>`).join('')}
                            <option>Support and maintenance</option>
                        </select>
                        <p class="err hidden text-xs text-[#ea384c] font-semibold mt-1">Please choose a service.</p>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1" for="pm">About your project <span class="text-slate-400 font-normal">(optional)</span></label>
                        <textarea id="pm" name="msg" rows="3" class="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#ea384c]" placeholder="Website goals, campaign target, or timeline…"></textarea>
                    </div>
                    <button class="btn-contrast w-full">Send Enquiry →</button>
                </form>
            </div>
        </div>

        <!-- PROJECT DETAIL MODAL -->
        <div id="workModal" class="modal-hide fixed inset-0 z-[60] bg-slate-900/45 items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="workT">
            <div class="modal-box bg-white rounded-2xl max-w-2xl w-full overflow-hidden relative max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
                <button class="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg bg-white hover:bg-[#fff1f2] hover:text-[#ea384c] text-slate-700 border border-slate-200 flex items-center justify-center transition" onclick="closeModal()" aria-label="Close"><i class="fas fa-times"></i></button>
                <div class="h-56 sm:h-64 bg-slate-100 border-b border-slate-200">
                    <img id="workImg" src="" alt="" class="w-full h-full object-cover">
                </div>
                <div class="p-6 sm:p-8">
                    <span id="workCat" class="inline-block px-2.5 py-1 rounded bg-[#fff1f2] text-[#ea384c] text-xs font-bold uppercase tracking-wider mb-2"></span>
                    <h3 id="workT" class="font-bold text-slate-900 text-2xl leading-tight mb-3"></h3>
                    <p id="workSummary" class="text-slate-600 text-sm leading-relaxed mb-6"></p>
                    <div class="grid sm:grid-cols-2 gap-4 mb-6">
                        <div class="bg-slate-50 rounded-xl p-4 border border-slate-200">
                            <p class="text-xs font-bold uppercase tracking-wider text-[#172b75] mb-2">Deliverables</p>
                            <ul id="workDeliverables" class="space-y-1.5 text-sm text-slate-700"></ul>
                        </div>
                        <div class="bg-[#eef2ff] rounded-xl p-4 border border-[#c7d2fe]">
                            <p class="text-xs font-bold uppercase tracking-wider text-[#172b75] mb-2">Platforms &amp; Tools</p>
                            <div id="workTools" class="flex flex-wrap gap-1.5"></div>
                        </div>
                    </div>
                    <div class="pt-5 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p class="text-sm font-medium text-slate-700">Need a similar website or campaign?</p>
                        <button id="workCta" type="button" class="btn-contrast w-full sm:w-auto">Discuss similar scope</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- TOAST NOTIFICATION -->
        <div id="toast" class="toast fixed bottom-6 right-6 z-[70] bg-[#172b75] text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 max-w-sm" role="status" aria-live="polite">
            <div class="w-8 h-8 rounded-lg bg-[#ea384c] text-white flex items-center justify-center flex-shrink-0">
                <i class="fas fa-check text-sm"></i>
            </div>
            <div>
                <p class="font-bold text-sm text-white" id="tt"></p>
                <p class="text-xs text-slate-200" id="tb"></p>
            </div>
        </div>`;
    }
})();
