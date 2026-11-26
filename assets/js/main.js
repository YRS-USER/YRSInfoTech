(function () {
    const D = window.YRS_DATA || {};
    const $ = s => document.querySelector(s);
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

    /* Sticky Topbar Shadow */
    const hdr = $('#siteHeader');
    if (hdr) {
        const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 8);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* Mobile Drawer */
    const drawer = $('#mobileDrawer');
    const overlay = $('#mobileOverlay');
    const menuBtn = $('#mobileMenuBtn');
    window.toggleMobileMenu = () => drawer && drawer.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
    window.openMobileMenu = () => {
        if (!drawer) return;
        drawer.classList.add('open');
        overlay.classList.add('open');
        menuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };
    window.closeMobileMenu = () => {
        if (!drawer) return;
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    /* Client Logos Marquee (Large Framed Logo Cards across Home & About) */
    const clientTracks = document.querySelectorAll('#clients, .js-client-marquee');
    if (clientTracks.length && D.CLIENT_LOGOS) {
        const formatAlt = slug => slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        const logosHtml = D.CLIENT_LOGOS.concat(D.CLIENT_LOGOS).map(n =>
            `<div class="client-logo-card">
                <img src="assets/img/client/${n}.webp" alt="${formatAlt(n)}" loading="lazy" class="client-logo-item">
            </div>`
        ).join('');
        clientTracks.forEach(track => { track.innerHTML = logosHtml; });
    }

    /* Homepage: Boxed 6-Service Overview Cards */
    const svcOverviewGrid = $('#svcOverviewGrid');
    if (svcOverviewGrid && D.SERVICES) {
        svcOverviewGrid.innerHTML = D.SERVICES.map(s => `
            <a href="services.html#${s.id}" class="group yrs-card p-6 flex flex-col justify-between">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <span class="icon-badge w-10 h-10 rounded-lg bg-[#eef2ff] text-[#172b75] group-hover:bg-[#172b75] group-hover:text-white flex items-center justify-center">
                            <i class="fas ${s.icon} text-sm"></i>
                        </span>
                        <span class="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-600 group-hover:bg-[#eef2ff] group-hover:text-[#172b75] transition">${s.code}</span>
                    </div>
                    <h3 class="card-headline mb-2">${esc(s.title)}</h3>
                    <p class="text-slate-600 text-sm leading-relaxed mb-3">${esc(s.short)}</p>
                    <p class="text-xs font-medium text-slate-500">${esc(s.tagline)}</p>
                </div>
                <div class="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#172b75]">
                    <span>Explore workflow</span>
                    <span class="group-hover:translate-x-1 transition-transform">→</span>
                </div>
            </a>
        `).join('');
    }

    /* Services Page: Full-Width Editorial Showcase Bands (Alternating Layout + Inline SVG Diagrams) */
    const svcShowcaseList = $('#svcShowcaseList');
    const svcJumpBar = $('#svcJumpBar');
    if (svcShowcaseList && D.SERVICES) {
        if (svcJumpBar) {
            svcJumpBar.innerHTML = D.SERVICES.map(s =>
                `<a href="#${s.id}" class="cat-pill">
                    <i class="fas ${s.icon}"></i>
                    <span>${esc(s.title)}</span>
                </a>`
            ).join('');
        }

        svcShowcaseList.innerHTML = D.SERVICES.map((s, idx) => {
            const isEven = idx % 2 === 1;
            return `
            <article id="${s.id}" class="yrs-card bg-white p-7 sm:p-10 reveal">
                <div class="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <!-- Text & Deliverables Column -->
                    <div class="lg:col-span-5 ${isEven ? 'lg:order-2' : ''}">
                        <div class="flex flex-wrap items-center gap-2.5 mb-4">
                            <span class="w-9 h-9 rounded-lg bg-[#172b75] text-white flex items-center justify-center text-xs"><i class="fas ${s.icon}"></i></span>
                            <span class="text-xs font-bold uppercase tracking-wider text-[#172b75]">Service ${s.code} · ${esc(s.category)}</span>
                            <span class="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#fff8eb] border border-[#fde68a] text-slate-800 ml-auto">
                                <i class="far fa-clock mr-1 text-[#172b75]"></i>${esc(s.timeline)}
                            </span>
                        </div>

                        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">${esc(s.title)}</h2>
                        <p class="text-sm font-semibold text-[#172b75] mb-3">${esc(s.headline)}</p>
                        <p class="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">${esc(s.short)}</p>

                        <ul class="space-y-2 text-sm text-slate-700 mb-6">
                            ${s.bullets.map(b => `<li><i class="fas fa-check text-[#172b75] mr-2 text-xs"></i>${esc(b)}</li>`).join('')}
                        </ul>

                        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-xs text-slate-600 leading-relaxed">
                            <strong class="text-slate-900">Key Deliverables:</strong> ${esc(s.deliverables)}
                        </div>

                        <button type="button" onclick="requestService('${s.title.replace(/'/g, "\'")}')" class="btn-primary !py-2.5 !px-5 !text-xs">
                            <i class="fas fa-paper-plane text-[11px]"></i> Request ${esc(s.title)} Quote
                        </button>
                    </div>

                    <!-- Wide Animated Image / Reel Showcase Column (Responsive on Mobile & Desktop) -->
                    <div class="lg:col-span-7 ${isEven ? 'lg:order-1' : ''}">
                        <div class="service-media-stage bg-slate-900 border border-slate-200 rounded-2xl overflow-hidden shadow-lg relative">
                            <div class="relative aspect-[16/10] overflow-hidden">
                                <img src="${s.mediaImg}"
                                     onerror="this.onerror=null; this.src='${s.mediaFallback}';"
                                     alt="${esc(s.title)} Showcase"
                                     loading="lazy"
                                     class="w-full h-full object-cover animate-ken-burns opacity-95">
                                <div class="absolute inset-0 bg-gradient-to-t from-[#0e1c54]/85 via-transparent to-[#0e1c54]/30"></div>

                                <!-- Top Live Metric Badges -->
                                <div class="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2">
                                    <span class="px-3 py-1 rounded-lg bg-[#172b75]/90 backdrop-blur-md text-white !text-xs sm:!text-sm font-bold border border-white/20">
                                        <i class="fas ${s.icon} text-[#fca5a5] mr-1.5"></i> ${esc(s.mediaBadge)}
                                    </span>
                                    <span class="px-3 py-1 rounded-lg bg-[#ea384c] text-white !text-xs sm:!text-sm font-bold shadow-md">
                                        ${esc(s.metric)}
                                    </span>
                                </div>
                            </div>

                            <!-- Workflow Bar: Flows cleanly below image on mobile, overlays bottom on sm+ desktop -->
                            <div class="sm:absolute sm:bottom-4 sm:left-4 sm:right-4 bg-white sm:bg-white/95 sm:backdrop-blur-md sm:rounded-xl p-4 sm:p-5 sm:shadow-lg border-t sm:border border-slate-200">
                                <p class="!text-sm font-semibold text-slate-700 mb-2.5">${esc(s.mediaCaption)}</p>
                                <div class="flex flex-wrap items-center gap-2">
                                    ${s.flow.map((step, i) => `<span class="bg-[#eef2ff] text-[#172b75] px-3 py-1 rounded-md font-bold !text-xs sm:!text-sm">${i + 1}. ${esc(step)}</span>${i < s.flow.length - 1 ? '<span class="text-[#ea384c] font-bold !text-xs">→</span>' : ''}`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>`;
        }).join('');
    }

    window.requestService = serviceName => {
        const select = $('#ps');
        if (select) select.value = serviceName;
        openModal('projModal');
    };

    /* Projects Grid */
    const projGrid = $('#projGrid');
    const projChips = $('#projChips');
    if (projGrid && D.PROJECTS) {
        const limit = parseInt(projGrid.dataset.limit || '0', 10);
        function renderProjects(filter) {
            let list = D.PROJECTS.map((p, i) => ({ p, i })).filter(o => filter === 'All' || o.p.cat === filter);
            if (limit > 0) list = list.slice(0, limit);
            projGrid.innerHTML = list.map(({ p, i }) => `
                <article class="group yrs-card overflow-hidden flex flex-col">
                    <div class="relative h-56 overflow-hidden bg-slate-100 border-b border-slate-200">
                        <img src="${p.img}" onerror="this.onerror=null; this.src='${p.fallback}';" alt="${esc(p.title)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <span class="absolute top-3.5 left-3.5 px-3 py-1 rounded-lg bg-white/95 text-[#172b75] border border-slate-200 text-xs font-bold shadow-xs">${esc(p.cat)}</span>
                        <span class="proj-icon-pop absolute top-3.5 right-3.5 w-11 h-11 rounded-xl bg-[#eef2ff] text-[#172b75] border border-[#c7d2fe] flex items-center justify-center shadow-xs" aria-hidden="true">
                            <i class="fas ${p.icon || 'fa-arrow-up-right-from-square'} text-base"></i>
                        </span>
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <h3 class="card-headline mb-2">${esc(p.title)}</h3>
                        <p class="text-sm text-slate-600 mb-4 flex-1 leading-relaxed">${esc(p.summary)}</p>
                        <div class="flex flex-wrap gap-1.5 mb-4">
                            ${p.tools.slice(0, 3).map(t => `<span class="text-xs font-medium px-2.5 py-1 rounded bg-[#eef2ff] text-[#172b75]">${esc(t)}</span>`).join('')}
                        </div>
                        <button type="button" onclick="openWork(${i})" class="font-semibold text-xs text-[#172b75] hover:text-[#ea384c] inline-flex items-center justify-between pt-3 border-t border-slate-100 w-full transition-colors">
                            <span>View case details</span> <span class="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </article>
            `).join('');
        }

        if (projChips) {
            const catIcons = {
                'All': 'fa-border-all',
                'Websites': 'fa-laptop-code',
                'Branding & Creative': 'fa-photo-film',
                'Digital Marketing': 'fa-bullhorn',
                'SEO': 'fa-magnifying-glass-chart'
            };
            const cats = ['All', ...new Set(D.PROJECTS.map(p => p.cat))];
            projChips.innerHTML = cats.map((c, i) =>
                `<button type="button" data-cat="${esc(c)}" class="cat-pill ${i ? '' : 'active'}" aria-pressed="${!i}">
                    <i class="fas ${catIcons[c] || 'fa-folder'}"></i>
                    <span>${esc(c)}</span>
                </button>`
            ).join('');
            projChips.onclick = e => {
                const b = e.target.closest('.cat-pill');
                if (!b) return;
                projChips.querySelectorAll('.cat-pill').forEach(x => { x.classList.remove('active'); x.setAttribute('aria-pressed', 'false'); });
                b.classList.add('active');
                b.setAttribute('aria-pressed', 'true');
                renderProjects(b.dataset.cat);
            };
        }
        renderProjects('All');
    }

    window.openWork = i => {
        const p = (D.PROJECTS || [])[i];
        if (!p) return;
        const img = $('#workImg');
        img.onerror = () => { img.onerror = null; img.src = p.fallback; };
        img.src = p.img;
        img.alt = p.title;
        $('#workCat').textContent = p.cat;
        $('#workT').textContent = p.title;
        $('#workSummary').textContent = p.summary;
        $('#workDeliverables').innerHTML = p.deliverables.map(d => `<li><i class="fas fa-check text-[#172b75] mr-2 text-xs"></i>${esc(d)}</li>`).join('');
        $('#workTools').innerHTML = p.tools.map(t => `<span class="text-xs font-semibold px-2.5 py-1 rounded bg-white text-[#172b75] border border-[#fde68a]">${esc(t)}</span>`).join('');
        $('#workCta').onclick = () => {
            closeModal();
            requestService(p.service);
        };
        openModal('workModal');
    };

    /* Achievements & Awards Grid */
    const achievementsGrid = $('#achievementsGrid');
    if (achievementsGrid && D.ACHIEVEMENTS) {
        achievementsGrid.innerHTML = D.ACHIEVEMENTS.map(a => `
            <article class="yrs-card overflow-hidden flex flex-col">
                <div class="relative h-48 bg-slate-100 border-b border-slate-200 overflow-hidden">
                    <img src="${a.img}" onerror="this.onerror=null; this.src='${a.fallback}';" alt="${esc(a.title)}" loading="lazy" class="w-full h-full object-cover">
                    <span class="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#172b75] text-white text-xs font-semibold"><i class="fas fa-trophy mr-1 text-[10px]"></i> ${esc(a.year)}</span>
                </div>
                <div class="p-6 flex flex-col flex-1">
                    <p class="text-xs font-semibold uppercase tracking-wider text-[#172b75] mb-1.5">${esc(a.org)}</p>
                    <h3 class="card-headline mb-2">${esc(a.title)}</h3>
                    <p class="text-sm text-slate-600 leading-relaxed flex-1">${esc(a.desc)}</p>
                </div>
            </article>
        `).join('');
    }

    /* Testimonials Grid */
    const testimonialsGrid = $('#testimonialsGrid');
    if (testimonialsGrid && D.TESTIMONIALS) {
        testimonialsGrid.innerHTML = D.TESTIMONIALS.map(item => `
            <figure class="yrs-card p-6 flex flex-col">
                <div class="flex items-center justify-between mb-3">
                    <span class="w-8 h-8 rounded-lg bg-[#eef2ff] text-[#172b75] flex items-center justify-center text-xs"><i class="fas fa-quote-left"></i></span>
                    <span class="text-[11px] font-semibold text-[#172b75]"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                </div>
                <blockquote class="text-slate-700 text-sm mb-5 flex-1 leading-relaxed">${esc(item.quote)}</blockquote>
                <figcaption class="font-semibold text-slate-900 text-sm border-t border-slate-100 pt-3.5">
                    ${esc(item.author)}
                    <span class="block font-normal text-xs text-slate-500 mt-0.5">${esc(item.location)}</span>
                </figcaption>
            </figure>
        `).join('');
    }

    /* Blog Posts Grid */
    const postGrid = $('#postGrid');
    const postChips = $('#chips');
    if (postGrid && D.POSTS) {
        const limit = parseInt(postGrid.dataset.limit || '0', 10);
        function renderPosts(filter) {
            let list = D.POSTS.map((p, i) => ({ p, i })).filter(o => filter === 'All' || o.p.c === filter);
            if (limit > 0) list = list.slice(0, limit);
            postGrid.innerHTML = list.map(({ p, i }) => `
                <article class="yrs-card p-6 flex flex-col">
                    <div class="flex items-center justify-between gap-2 mb-3">
                        <span class="inline-block px-2.5 py-1 rounded bg-[#eef2ff] text-[#172b75] text-xs font-semibold">${esc(p.c)}</span>
                        <span class="text-xs text-slate-500">${esc(p.d)}</span>
                    </div>
                    <h3 class="card-headline mb-2.5">${esc(p.t)}</h3>
                    <p class="text-sm text-slate-600 mb-5 flex-1 leading-relaxed">${esc(p.x)}</p>
                    <div class="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2.5">
                            <span class="w-7 h-7 rounded-md bg-[#eef2ff] text-[#172b75] text-xs font-bold flex items-center justify-center"><i class="fas fa-pen-nib text-[10px]"></i></span>
                            <div>
                                <p class="text-xs font-semibold text-slate-900 leading-none">${esc(p.author)}</p>
                                <p class="text-[11px] text-slate-500 mt-0.5">${esc(p.role)}</p>
                            </div>
                        </div>
                        <button type="button" class="font-semibold text-xs text-[#172b75] hover:underline inline-flex items-center gap-1" onclick="openPost(${i})">
                            Read →
                        </button>
                    </div>
                </article>
            `).join('');
        }

        if (postChips) {
            const cats = ['All', ...new Set(D.POSTS.map(p => p.c))];
            postChips.innerHTML = cats.map((c, i) =>
                `<button type="button" class="chip-btn border border-slate-200 bg-white text-slate-700 px-3.5 py-2 rounded-lg text-xs font-semibold transition ${i ? 'hover:border-[#172b75]' : 'active'}" aria-pressed="${!i}">${c}</button>`
            ).join('');
            postChips.onclick = e => {
                const b = e.target.closest('.chip-btn');
                if (!b) return;
                document.querySelectorAll('.chip-btn').forEach(x => { x.classList.remove('active'); x.setAttribute('aria-pressed', 'false'); });
                b.classList.add('active');
                b.setAttribute('aria-pressed', 'true');
                renderPosts(b.textContent);
            };
        }
        renderPosts('All');
    }

    window.openPost = i => {
        const p = (D.POSTS || [])[i];
        if (!p) return;
        $('#postTag').textContent = p.c + ' · ' + p.d;
        $('#postT').textContent = p.t;
        $('#postAuthorBar').innerHTML = `
            <span class="w-8 h-8 rounded-md bg-[#eef2ff] text-[#172b75] font-bold flex items-center justify-center text-xs"><i class="fas fa-pen-nib"></i></span>
            <div>
                <p class="font-semibold text-slate-900 text-xs">Published by ${esc(p.author)}</p>
                <p class="text-slate-500 text-xs">${esc(p.role)} · YRS Infotech Chennai</p>
            </div>
        `;
        $('#postB').innerHTML = p.b.map(paragraph => `<p>${esc(paragraph)}</p>`).join('');
        openModal('postModal');
    };

    /* Careers Job List */
    const jobList = $('#jobList');
    if (jobList && D.JOBS) {
        jobList.innerHTML = D.JOBS.map(j => `
            <article class="yrs-card p-6">
                <div class="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                    <div>
                        <h3 class="card-headline">${esc(j.title)}</h3>
                        <p class="text-xs text-[#172b75] font-semibold uppercase tracking-wider mt-1 mb-2">${esc(j.meta)}</p>
                        <p class="text-sm text-slate-600">${esc(j.short)}</p>
                    </div>
                    <button type="button" class="btn-primary shrink-0 !py-2.5 !px-4 !text-xs" onclick="openJob('${j.title.replace(/'/g, "\\'")}')">Apply now</button>
                </div>
                <details class="mt-4 pt-3.5 border-t border-slate-100 text-sm text-slate-600" open>
                    <summary class="cursor-pointer font-semibold text-slate-800 hover:text-[#172b75] list-none inline-flex items-center gap-1.5 text-xs">
                        <span>Role responsibilities</span> <i class="fas fa-chevron-down text-[10px]"></i>
                    </summary>
                    <p class="mt-2 leading-relaxed text-slate-600">${esc(j.details)}</p>
                </details>
            </article>
        `).join('') + `<p class="text-sm text-slate-500 pt-2">Do not see your role? Email your résumé to <a class="text-[#172b75] font-semibold underline" href="mailto:${D.MAIL}?subject=General%20application">${D.MAIL}</a>.</p>`;
    }

    window.openJob = role => {
        const sel = $('#jr');
        if (sel) sel.value = role;
        openModal('jobModal');
    };

    /* Copy Helper */
    window.copyText = (text, label) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            showToast(label, text);
        } catch (err) {
            showToast('Contact info', text);
        }
        document.body.removeChild(ta);
    };

    /* Modals & Form Validation */
    let lastFocused = null;
    let currentModal = null;

    window.openModal = id => {
        const m = $('#' + id);
        if (!m) return;
        lastFocused = document.activeElement;
        currentModal = m;
        currentModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            const firstInput = currentModal.querySelector('input, select, button');
            if (firstInput) firstInput.focus();
        }, 40);
    };

    window.closeModal = () => {
        if (!currentModal) return;
        currentModal.classList.remove('open');
        currentModal = null;
        document.body.style.overflow = '';
        if (lastFocused) lastFocused.focus();
    };

    document.querySelectorAll('.modal-hide').forEach(m => {
        m.addEventListener('click', e => { if (e.target === m) closeModal(); });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (currentModal) return closeModal();
            if (drawer && drawer.classList.contains('open')) return closeMobileMenu();
        }
    });

    function showToast(title, body) {
        const tt = $('#tt'), tb = $('#tb'), toast = $('#toast');
        if (!toast) return;
        tt.textContent = title;
        tb.textContent = body;
        toast.classList.add('show');
        clearTimeout(window._toastTimer);
        window._toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
    }

    function validateForm(form, rules) {
        let valid = true;
        form.querySelectorAll('.err').forEach(el => el.classList.add('hidden'));
        rules.forEach(name => {
            const field = form[name];
            if (!field) return;
            const val = field.value.trim();
            const invalid = !val || (name === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val));
            if (invalid) {
                const errEl = field.closest('div').querySelector('.err');
                if (errEl) errEl.classList.remove('hidden');
                field.classList.add('border-[#172b75]');
                valid = false;
            } else {
                field.classList.remove('border-[#172b75]');
            }
        });
        return valid;
    }

    async function sendDirectEnquiry(form, payload, onSuccessClose) {
        const submitBtn = form.querySelector('button[type="submit"], button:not([type])');
        const originalHtml = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }

        try {
            const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(D.MAIL || 'admin@yrsinfotech.com')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _captcha: 'false',
                    _template: 'table',
                    ...payload
                })
            });

            if (!res.ok) throw new Error('Network response was not ok');
            if (onSuccessClose) closeModal();
            showToast('Enquiry sent directly!', 'Thank you. Our Chennai team will contact you shortly.');
            form.reset();
        } catch (err) {
            showToast('Could not send online', 'Please tap WhatsApp or call +91 98400 46168 directly.');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHtml;
            }
        }
    }

    const projF = $('#projF');
    if (projF) {
        projF.onsubmit = e => {
            e.preventDefault();
            if (!validateForm(projF, ['name', 'email', 'service'])) return;
            sendDirectEnquiry(projF, {
                _subject: 'New Project Enquiry: ' + projF.service.value,
                Name: projF.name.value.trim(),
                Email: projF.email.value.trim(),
                Phone: projF.phone.value.trim() || 'Not provided',
                Service: projF.service.value,
                Message: projF.msg.value.trim() || 'No additional notes'
            }, true);
        };
    }

    const inlineContactForm = $('#inlineContactForm');
    if (inlineContactForm) {
        inlineContactForm.onsubmit = e => {
            e.preventDefault();
            if (!validateForm(inlineContactForm, ['name', 'email', 'service'])) return;
            sendDirectEnquiry(inlineContactForm, {
                _subject: 'Website Enquiry: ' + inlineContactForm.service.value,
                Name: inlineContactForm.name.value.trim(),
                Email: inlineContactForm.email.value.trim(),
                Phone: inlineContactForm.phone.value.trim() || 'Not provided',
                Service: inlineContactForm.service.value,
                Message: inlineContactForm.msg.value.trim() || 'No additional notes'
            }, false);
        };
    }

    const jobF = $('#jobF');
    if (jobF) {
        jobF.onsubmit = e => {
            e.preventDefault();
            if (!validateForm(jobF, ['name', 'email', 'phone'])) return;
            sendDirectEnquiry(jobF, {
                _subject: 'Job Application: ' + jobF.role.value,
                Role: jobF.role.value,
                Name: jobF.name.value.trim(),
                Email: jobF.email.value.trim(),
                Phone: jobF.phone.value.trim(),
                Portfolio_or_LinkedIn: jobF.link.value.trim() || 'Not provided'
            }, true);
        };
    }

    
    
    /* Ensure all FAQ items start closed on page load */
    document.querySelectorAll('details.faq-item').forEach(d => d.removeAttribute('open'));

    /* Scroll Reveal & Counters */
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

    document.querySelectorAll('.reveal, .reveal-group').forEach(el => revealObs.observe(el));

    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseFloat(el.dataset.counter);
            const suffix = el.dataset.suffix || '';
            const duration = 1100;
            const start = performance.now();
            const tick = now => {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                el.textContent = Math.round(eased * target) + suffix;
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            counterObs.unobserve(el);
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('[data-counter]').forEach(el => counterObs.observe(el));
})();
