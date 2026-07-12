# AstroInterior.in — Static Site Generator & Compiler
# Automates the creation of Zodiac, Planets, Rooms, Colours, and Cities subpages using JSON data.

$currentDirectory = Get-Location

# --- 1. Define Directories ---
$dirs = @("zodiac", "planets", "rooms", "colours", "cities")
foreach ($dir in $dirs) {
    $path = Join-Path $currentDirectory $dir
    if (-not (Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
    }
}

# --- 2. Shared Templates ---
$CommonHead = @'
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="author" content="Richa Agarwal">
  <meta name="theme-color" content="#121316">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="icon" type="image/png" href="/assets/logo.png">
  <link rel="apple-touch-icon" href="/assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
'@

$CommonHeader = @'
  <div class="scroll-progress-bar" id="scroll-progress-bar" aria-hidden="true"></div>
  <header id="main-header" role="banner">
    <div class="nav-container">
      <a href="/index.html" class="logo-wrap" id="brand-logo" aria-label="AstroInterior Home">
        <img src="/assets/logo.png" alt="AstroInterior Logo" class="logo-img" width="40" height="40">
        <div class="logo-text-group">
          <span class="logo-title" style="letter-spacing: 0.15em;">ASTROINTERIOR</span>
          <span class="logo-sub">Spatial Advisory</span>
        </div>
      </a>
      <button class="mobile-menu-toggle" id="menu-toggle" aria-expanded="false" aria-label="Toggle navigation menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <nav id="navbar-links" role="navigation" aria-label="Main navigation">
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/index.html#about">About</a></li>
          <li><a href="/index.html#services">Services</a></li>
          <li><a href="/index.html#portfolio">Portfolio</a></li>
          <li><a href="/index.html#packages">Packages</a></li>
          <li><a href="/index.html#contact">Contact</a></li>
        </ul>
      </nav>
      <div class="nav-actions">
        <a href="/index.html#contact" class="btn-gold" id="header-cta">Book Consultation</a>
      </div>
    </div>
  </header>
'@

$CommonFooter = @'
  <footer class="minimal-footer">
    <div class="footer-grid-layout">
      <div class="footer-brand-column">
        <div class="footer-logo-wrap">
          <img src="/assets/logo.png" alt="AstroInterior Logo" class="footer-logo-img" width="36" height="36">
          <span class="footer-brand-title">ASTROINTERIOR</span>
        </div>
        <p class="footer-brand-desc">India's premier Astro Interior Design consultancy — merging Vedic astrology with luxury interior architecture to create birth-chart-aligned living environments.</p>
      </div>
      <div class="footer-links-column">
        <h4>Quick Navigation</h4>
        <nav aria-label="Footer navigation">
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/index.html#about">About Astro Interior</a></li>
          <li><a href="/index.html#services">Services</a></li>
          <li><a href="/index.html#portfolio">Portfolio</a></li>
          <li><a href="/index.html#process">Our Process</a></li>
          <li><a href="/index.html#packages">Consultation Packages</a></li>
          <li><a href="/index.html#faq">FAQs</a></li>
          <li><a href="/index.html#contact">Book Consultation</a></li>
          <li><a href="/blog.html">Knowledge Hub</a></li>
          <li><a href="/gallery.html">Design Gallery</a></li>
        </ul>
        </nav>
      </div>
      <div class="footer-social-column">
        <h4>Connect</h4>
        <div class="footer-socials-grid">
          <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
          <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://wa.me/917838048195" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom-line">
      <span>&copy; 2026 AstroInterior by Richa Agarwal. All Rights Reserved.</span>
      <div class="footer-bottom-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
    </div>
  </footer>
  <a href="https://wa.me/917838048195?text=Hello%20AstroInterior%2C%20I%20would%20like%20to%20book%20an%20Astro%20Interior%20Consultation." target="_blank" rel="noopener" class="whatsapp-fab" id="whatsapp-fab" aria-label="Chat on WhatsApp">
    <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.863-9.848.001-2.63-1.019-5.101-2.874-6.958C16.402 1.982 13.93 1.95 12.012 1.95c-5.438 0-9.863 4.414-9.865 9.847-.001 1.562.41 3.09 1.189 4.453l-.993 3.629 3.714-.975zm11.367-7.651c-.139-.232-.51-.372-1.066-.651-.556-.279-3.285-1.622-3.795-1.807-.51-.186-.88-.279-1.25.279-.371.558-1.437 1.808-1.761 2.18-.324.372-.649.418-1.205.139-.556-.278-2.348-.865-4.473-2.761-1.653-1.475-2.768-3.298-3.092-3.856-.324-.558-.035-.86.243-1.138.25-.251.556-.651.834-.976.278-.326.37-.558.556-.93.186-.372.093-.698-.046-.977-.14-.279-1.25-3.018-1.714-4.133-.453-1.087-.912-.94-1.25-.958-.323-.017-.695-.02-1.066-.02-.37 0-.973.139-1.482.697-.509.558-1.946 1.906-1.946 4.647 0 2.741 1.993 5.39 2.271 5.762.278.372 3.922 5.99 9.504 8.393 1.328.571 2.364.912 3.172 1.17.132.042.855.37 1.385.292.593-.088 1.821-.745 2.077-1.465.257-.72.257-1.339.18-1.464z"/>
    </svg>
    <span class="fab-tooltip">Chat with us</span>
  </a>
  <div class="mobile-sticky-cta" id="mobile-sticky-cta">
    <a href="/index.html#contact" class="mobile-sticky-btn mobile-sticky-book">Book Consultation</a>
    <a href="https://wa.me/917838048195?text=Hello%20AstroInterior%2C%20I%20would%20like%20to%20book%20an%20Astro%20Interior%20Consultation." target="_blank" rel="noopener" class="mobile-sticky-btn mobile-sticky-whatsapp">
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.455L0 24z"/></svg>
      WhatsApp
    </a>
  </div>
  <script src="/app.js"></script>
'@

$NavigationIndexHTML = @'
    <!-- Astro-Spatial Navigation Index -->
    <section style="background-color: var(--c-bg-primary); padding: 5rem 2rem; border-top: 1px solid var(--c-accent-border);">
      <div style="max-width: 1100px; margin: 0 auto;">
        <h3 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 3rem; text-align: center; color: var(--c-text-primary); font-weight: 400; letter-spacing: 0.05em;">Astro-Spatial Navigation Index</h3>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2.5rem; text-align: left;">
          
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 1.15rem; color: var(--c-accent); margin-bottom: 1rem; font-weight: 500;">Zodiac Alignments</h4>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.85rem; line-height: 2.2;">
              <li><a href="/zodiac/aries" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Aries (Mesha)</a></li>
              <li><a href="/zodiac/taurus" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Taurus (Vrishabha)</a></li>
              <li><a href="/zodiac/gemini" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Gemini (Mithuna)</a></li>
              <li><a href="/zodiac/cancer" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Cancer (Karka)</a></li>
              <li><a href="/zodiac/leo" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Leo (Simha)</a></li>
              <li><a href="/zodiac/virgo" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Virgo (Kanya)</a></li>
              <li><a href="/zodiac/libra" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Libra (Tula)</a></li>
              <li><a href="/zodiac/scorpio" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Scorpio (Vrishchika)</a></li>
              <li><a href="/zodiac/sagittarius" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Sagittarius (Dhanu)</a></li>
              <li><a href="/zodiac/capricorn" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Capricorn (Makara)</a></li>
              <li><a href="/zodiac/aquarius" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Aquarius (Kumbha)</a></li>
              <li><a href="/zodiac/pisces" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Pisces (Meena)</a></li>
            </ul>
          </div>

          <div>
            <h4 style="font-family: var(--font-heading); font-size: 1.15rem; color: var(--c-accent); margin-bottom: 1rem; font-weight: 500;">Planetary Energies</h4>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.85rem; line-height: 2.2;">
              <li><a href="/planets/sun" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Sun (Sol)</a></li>
              <li><a href="/planets/moon" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Moon (Luna)</a></li>
              <li><a href="/planets/mars" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Mars (Mangal)</a></li>
              <li><a href="/planets/mercury" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Mercury (Budh)</a></li>
              <li><a href="/planets/jupiter" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Jupiter (Guru)</a></li>
              <li><a href="/planets/venus" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Venus (Shukra)</a></li>
              <li><a href="/planets/saturn" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Saturn (Shani)</a></li>
              <li><a href="/planets/rahu" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Rahu (Shadow North)</a></li>
              <li><a href="/planets/ketu" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Ketu (Shadow South)</a></li>
            </ul>
          </div>

          <div>
            <h4 style="font-family: var(--font-heading); font-size: 1.15rem; color: var(--c-accent); margin-bottom: 1rem; font-weight: 500;">Room Blueprints</h4>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.85rem; line-height: 2.2;">
              <li><a href="/rooms/bedroom" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Master Bedroom</a></li>
              <li><a href="/rooms/living-room" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Living Room</a></li>
              <li><a href="/rooms/kitchen" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Kitchen</a></li>
              <li><a href="/rooms/study" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Study Room</a></li>
              <li><a href="/rooms/temple" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Pooja Temple</a></li>
              <li><a href="/rooms/office" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Executive Office</a></li>
              <li><a href="/rooms/hotel" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Hotel Suite</a></li>
            </ul>
          </div>

          <div>
            <h4 style="font-family: var(--font-heading); font-size: 1.15rem; color: var(--c-accent); margin-bottom: 1rem; font-weight: 500;">Color Psychology</h4>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.85rem; line-height: 2.2;">
              <li><a href="/colours/blue" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Blue Strategy</a></li>
              <li><a href="/colours/white" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">White Strategy</a></li>
              <li><a href="/colours/green" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Green Strategy</a></li>
              <li><a href="/colours/yellow" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Yellow Strategy</a></li>
              <li><a href="/colours/grey" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Grey Strategy</a></li>
              <li><a href="/colours/gold" style="color: var(--c-text-secondary); text-decoration: none; transition: color 0.2s ease;">Gold Strategy</a></li>
            </ul>
          </div>

        </div>
      </div>
    </section>
'@

# --- 3. Page Generator Compiler Function ---
function Generate-Page {
    param(
        [string]$FilePath,
        [string]$Title,
        [string]$Description,
        [string]$Keywords,
        [string]$Canonical,
        [string]$ElementClass = "",
        [string]$BreadcrumbsHTML = "",
        [string]$MainContentHTML = "",
        [string]$JSONSchema = ""
    )
    
    $template = @'
<!DOCTYPE html>
<html lang="en" class="__ELEMENT_CLASS__">
<head>
  __COMMON_HEAD__
  <title>__TITLE__</title>
  <meta name="description" content="__DESCRIPTION__">
  <meta name="keywords" content="__KEYWORDS__">
  <link rel="canonical" href="__CANONICAL__">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="AstroInterior">
  <meta property="og:title" content="__TITLE__">
  <meta property="og:description" content="__DESCRIPTION__">
  <meta property="og:url" content="__CANONICAL__">
  <meta property="og:image" content="https://www.astrointerior.in/assets/portfolio_apartment_living.jpg">
  <meta property="og:locale" content="en_IN">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="__TITLE__">
  <meta name="twitter:description" content="__DESCRIPTION__">
  <meta name="twitter:image" content="https://www.astrointerior.in/assets/portfolio_apartment_living.jpg">
  __JSON_SCHEMA__
</head>
<body>
  __COMMON_HEADER__
  <main role="main">
    __BREADCRUMBS__
    __MAIN_CONTENT__
  </main>
  __NAVIGATION_INDEX__
  __COMMON_FOOTER__
</body>
</html>
'@

    $output = $template.Replace("__COMMON_HEAD__", $CommonHead)
    $output = $output.Replace("__COMMON_HEADER__", $CommonHeader)
    $output = $output.Replace("__COMMON_FOOTER__", $CommonFooter)
    $output = $output.Replace("__TITLE__", $Title)
    $output = $output.Replace("__DESCRIPTION__", $Description)
    $output = $output.Replace("__KEYWORDS__", $Keywords)
    $output = $output.Replace("__CANONICAL__", $Canonical)
    $output = $output.Replace("__ELEMENT_CLASS__", $ElementClass)
    $output = $output.Replace("__BREADCRUMBS__", $BreadcrumbsHTML)
    $output = $output.Replace("__MAIN_CONTENT__", $MainContentHTML)
    $output = $output.Replace("__JSON_SCHEMA__", $JSONSchema)
    $output = $output.Replace("__NAVIGATION_INDEX__", $NavigationIndexHTML)

    $output | Out-File -FilePath $FilePath -Encoding utf8 -Force
}

# --- 4. Load Data from JSON ---
$dataJson = Get-Content -Raw -Path (Join-Path $currentDirectory "data.json") | ConvertFrom-Json

# --- A. ZODIAC SIGNS ---
$zodiacTemplate = @'
    <section class="editorial-hero" style="background-color: var(--c-bg-secondary); padding: 6rem 2rem; border-bottom: 1px solid var(--c-accent-border);">
      <div style="max-width: 900px; margin: 0 auto; text-align: center;">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--c-accent); font-weight: 600; letter-spacing: 0.15em; display: block; margin-bottom: 1rem;">Zodiac Spatial Alignment Guide</span>
        <h1 style="font-family: var(--font-heading); font-size: 3.2rem; line-height: 1.2; margin-bottom: 1.5rem; color: var(--c-text-primary);">__NAME__ Room Alignment</h1>
        <p style="font-size: 1.1rem; color: var(--c-text-secondary); max-width: 700px; margin: 0 auto; line-height: 1.8;">__DESC__</p>
      </div>
    </section>

    <section style="max-width: 1100px; margin: 4rem auto; padding: 0 1.5rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; margin-bottom: 4rem;">
        
        <div style="border: 1px solid var(--c-accent-border); border-radius: 12px; padding: 2rem; background: #FFF;">
          <h3 style="color: var(--c-accent); font-size: 1.3rem; margin-bottom: 1rem;">Astrological Coordinates</h3>
          <ul style="list-style: none; padding: 0; margin: 0; line-height: 2; font-size: 0.95rem; color: var(--c-text-secondary);">
            <li><strong>Element:</strong> <span style="text-transform: capitalize;">__ELEMENT__</span></li>
            <li><strong>Ruling Planet:</strong> __PLANET__</li>
            <li><strong>Ideal Room:</strong> __ROOM__</li>
          </ul>
        </div>

        <div style="border: 1px solid var(--c-accent-border); border-radius: 12px; padding: 2rem; background: #FFF;">
          <h3 style="color: var(--c-accent); font-size: 1.3rem; margin-bottom: 1rem;">Color Spectrum Guidance</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary);">__COLOR__</p>
        </div>

        <div style="border: 1px solid var(--c-accent-border); border-radius: 12px; padding: 2rem; background: #FFF;">
          <h3 style="color: var(--c-accent); font-size: 1.3rem; margin-bottom: 1rem;">Material &amp; Layout</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary);">__FURNITURE__</p>
        </div>

      </div>

      <div style="background-color: var(--c-bg-secondary); border-radius: 16px; padding: 3rem 2.5rem; border: 1px solid var(--c-accent-border); margin-bottom: 4rem;">
        <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 2rem; text-align: center;">Spatial Calibration Rules</h2>
        
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--c-text-primary); margin-bottom: 0.5rem;">1. Spatial Layout Directions</h4>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary); margin: 0;">__LAYOUT__</p>
          </div>
          <hr style="border: 0; border-top: 1px solid var(--c-accent-border);">
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--c-text-primary); margin-bottom: 0.5rem;">2. Lighting Frequency &amp; Lux Calibrations</h4>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary); margin: 0;">__LIGHTING__</p>
          </div>
          <hr style="border: 0; border-top: 1px solid var(--c-accent-border);">
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--c-text-primary); margin-bottom: 0.5rem;">3. Decor, Accents &amp; Accessories</h4>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary); margin: 0;">__DECOR__</p>
          </div>
          <hr style="border: 0; border-top: 1px solid var(--c-accent-border);">
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: #a04020; margin-bottom: 0.5rem;">4. Critical Design Mistakes to Avoid</h4>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary); margin: 0;">__MISTAKES__</p>
          </div>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #1E1E1E 0%, #2E2E2E 100%); border-radius: 16px; padding: 4rem 3rem; text-align: center; color: #FFF; box-shadow: var(--card-shadow);">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--c-accent); font-weight: 600; letter-spacing: 0.15em; display: block; margin-bottom: 1rem;">✦ Align Your Personal Spaces</span>
        <h2 style="font-family: var(--font-heading); font-size: 2.4rem; color: #FFF; margin-bottom: 1.5rem; font-weight: 400;">Want a Room Calibrated to Your Birth Chart?</h2>
        <p style="font-size: 1rem; color: #999; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.7;">Get a detailed room-by-room design blueprint designed by Richa Agarwal, calculated using your date, place, and exact time of birth.</p>
        <a href="/index.html#contact" class="btn-gold" style="padding: 1rem 3.5rem;">Request Birth-Chart Alignment</a>
      </div>
    </section>
'@

$articleSchemaTemplate = @'
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "__CANON__"
    },
    "headline": "__HEADLINE__",
    "description": "__DESC__",
    "image": "https://www.astrointerior.in/assets/portfolio_apartment_living.jpg",
    "author": {
      "@type": "Person",
      "name": "Richa Agarwal"
    },
    "publisher": {
      "@type": "Organization",
      "name": "AstroInterior",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.astrointerior.in/assets/logo.png"
      }
    },
    "datePublished": "2026-07-12"
  }
  </script>
'@

$localBusinessSchemaTemplate = @'
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AstroInterior by Richa Agarwal - __NAME__",
    "description": "__DESC__",
    "url": "__CANON__",
    "telephone": "+917838048195",
    "image": "https://www.astrointerior.in/assets/logo.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "__NAME__",
      "addressCountry": "IN"
    },
    "areaServed": [
      {"@type": "City", "name": "__NAME__"}
    ],
    "founder": {
      "@type": "Person",
      "name": "Richa Agarwal"
    }
  }
  </script>
'@

$zodiacBreadcrumbsTemplate = @'
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        <li class="breadcrumb-item"><a href="/index.html">Home</a></li>
        <li class="breadcrumb-item"><a href="/blog.html">Knowledge Hub</a></li>
        <li class="breadcrumb-item active" aria-current="page">__NAME__</li>
      </ol>
    </nav>
'@

foreach ($z in $dataJson.zodiac) {
    $title = $z.name + " Astro Interior Design Guide - Aligned Spaces by Richa Agarwal | AstroInterior"
    $desc = "Bespoke Astro Interior Design tips for " + $z.name + ". Calibrate colors, layout, furniture, and lighting to match your natal element (" + $z.element + ")."
    $keys = "astro interior design " + $z.id + ", " + $z.id + " zodiac decor, vastu for " + $z.id + ", richa agarwal " + $z.id + " home design"
    $canon = "https://www.astrointerior.in/zodiac/" + $z.id + ".html"
    
    $breadcrumbs = $zodiacBreadcrumbsTemplate.Replace("__NAME__", $z.name)

    $mainHTML = $zodiacTemplate.Replace("__NAME__", $z.name)
    $mainHTML = $mainHTML.Replace("__DESC__", $z.desc)
    $mainHTML = $mainHTML.Replace("__ELEMENT__", $z.element)
    $mainHTML = $mainHTML.Replace("__PLANET__", $z.rulingPlanet)
    $mainHTML = $mainHTML.Replace("__ROOM__", $z.roomRecs)
    $mainHTML = $mainHTML.Replace("__COLOR__", $z.color)
    $mainHTML = $mainHTML.Replace("__FURNITURE__", $z.furniture)
    $mainHTML = $mainHTML.Replace("__LAYOUT__", $z.layout)
    $mainHTML = $mainHTML.Replace("__LIGHTING__", $z.lighting)
    $mainHTML = $mainHTML.Replace("__DECOR__", $z.decor)
    $mainHTML = $mainHTML.Replace("__MISTAKES__", $z.mistakes)

    $schema = $articleSchemaTemplate.Replace("__CANON__", $canon)
    $schema = $schema.Replace("__HEADLINE__", ($z.name + " Astro Interior Design Guide"))
    $schema = $schema.Replace("__DESC__", $desc)

    $fileOut = Join-Path $currentDirectory ("zodiac\" + $z.id + ".html")
    Generate-Page -FilePath $fileOut -Title $title -Description $desc -Keywords $keys -Canonical $canon -ElementClass $z.elementClass -BreadcrumbsHTML $breadcrumbs -MainContentHTML $mainHTML -JSONSchema $schema
}

# --- B. PLANETS ---
$planetTemplate = @'
    <section class="editorial-hero" style="background-color: var(--c-bg-secondary); padding: 6rem 2rem; border-bottom: 1px solid var(--c-accent-border);">
      <div style="max-width: 900px; margin: 0 auto; text-align: center;">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--c-accent); font-weight: 600; letter-spacing: 0.15em; display: block; margin-bottom: 1rem;">Celestial &amp; Spatial Mechanics Guide</span>
        <h1 style="font-family: var(--font-heading); font-size: 3.2rem; line-height: 1.2; margin-bottom: 1.5rem; color: var(--c-text-primary);">__NAME__ Planetary Alignment</h1>
        <p style="font-size: 1.1rem; color: var(--c-text-secondary); max-width: 700px; margin: 0 auto; line-height: 1.8;">Harmonizing the spatial impact, color palettes, and material selections associated with __NAME__ (__SYMBOL__) to optimize your home or workspace.</p>
      </div>
    </section>

    <section style="max-width: 1000px; margin: 4rem auto; padding: 0 1.5rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
        <div style="border: 1px solid var(--c-accent-border); border-radius: 12px; padding: 2rem; background: #FFF;">
          <h3 style="color: var(--c-accent); font-size: 1.25rem; margin-bottom: 0.8rem;">Ideal Coordinate Axis</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary);">__SPATIAL__</p>
        </div>
        <div style="border: 1px solid var(--c-accent-border); border-radius: 12px; padding: 2rem; background: #FFF;">
          <h3 style="color: var(--c-accent); font-size: 1.25rem; margin-bottom: 0.8rem;">Planetary Color Spectrum</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary);">__COLOR__</p>
        </div>
        <div style="border: 1px solid var(--c-accent-border); border-radius: 12px; padding: 2rem; background: #FFF;">
          <h3 style="color: var(--c-accent); font-size: 1.25rem; margin-bottom: 0.8rem;">Design Finishes &amp; Textures</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary);">__MATERIALS__</p>
        </div>
      </div>

      <div style="line-height: 1.8; color: var(--c-text-secondary); font-size: 1rem; margin-bottom: 4rem;">
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--c-text-primary); margin-bottom: 1.5rem;">Design Implications of __NAME__ Energy</h2>
        <p>In Vedic astrology, every physical item, color frequency, and directional axis holds a resonance with a specific planetary body. When a particular planet is weak or conflicting in an occupant's natal chart, introducing its positive material and color counterparts can balance or amplify its cosmic frequencies.</p>
        <p>For example, placing __NAME__-aligned fixtures in the __SPATIAL__ quadrant acts as a natural energetic remedy. This balance supports mental clarity, health, and relationship success without requiring structural demolition.</p>
      </div>

      <div style="background: var(--c-bg-secondary); border: 1px solid var(--c-accent-border); border-radius: 16px; padding: 3rem 2.5rem; text-align: center;">
        <h3 style="font-family: var(--font-heading); font-size: 1.6rem; color: var(--c-text-primary); margin-bottom: 1rem;">Get an Astro-Planetary Spatial Audit</h3>
        <p style="font-size: 0.95rem; max-width: 600px; margin: 0 auto 2rem; line-height: 1.6;">Let Richa Agarwal trace your chart's primary dashas and map out the exact planetary balance needed for your rooms.</p>
        <a href="/index.html#contact" class="btn-gold" style="padding: 0.8rem 2.5rem;">Book Spatial Alignment</a>
      </div>
    </section>
'@

$planetBreadcrumbsTemplate = @'
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <ol class="breadcrumb-list">
        <li class="breadcrumb-item"><a href="/index.html">Home</a></li>
        <li class="breadcrumb-item"><a href="/blog.html">Knowledge Hub</a></li>
        <li class="breadcrumb-item active" aria-current="page">__NAME__</li>
      </ol>
    </nav>
'@

foreach ($p in $dataJson.planets) {
    $title = $p.name + " Astro Interior Design Guidance - Material & Color Strategy | AstroInterior"
    $desc = "Learn how the energy of " + $p.name + " (" + $p.symbol + ") shapes your home layout. Detailed guide on recommended materials, color palettes, and directional gridding by Richa Agarwal."
    $keys = "astro interior " + $p.id + ", " + $p.id + " astrology decor, vastu planet " + $p.id + ", spatial alignment " + $p.id
    $canon = "https://www.astrointerior.in/planets/" + $p.id + ".html"
    
    $breadcrumbs = $planetBreadcrumbsTemplate.Replace("__NAME__", $p.name)

    $mainHTML = $planetTemplate.Replace("__NAME__", $p.name)
    $mainHTML = $mainHTML.Replace("__SYMBOL__", $p.symbol)
    $mainHTML = $mainHTML.Replace("__SPATIAL__", $p.spatial)
    $mainHTML = $mainHTML.Replace("__COLOR__", $p.color)
    $mainHTML = $mainHTML.Replace("__MATERIALS__", $p.materials)

    $schema = $articleSchemaTemplate.Replace("__CANON__", $canon)
    $schema = $schema.Replace("__HEADLINE__", ($p.name + " Astro Interior Design Guidance"))
    $schema = $schema.Replace("__DESC__", $desc)

    $fileOut = Join-Path $currentDirectory ("planets\" + $p.id + ".html")
    Generate-Page -FilePath $fileOut -Title $title -Description $desc -Keywords $keys -Canonical $canon -BreadcrumbsHTML $breadcrumbs -MainContentHTML $mainHTML -JSONSchema $schema
}

# --- C. CITIES ---
$cityTemplate = @'
    <section class="editorial-hero" style="background-color: var(--c-bg-secondary); padding: 7rem 2rem; border-bottom: 1px solid var(--c-accent-border);">
      <div style="max-width: 900px; margin: 0 auto; text-align: center;">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--c-accent); font-weight: 600; letter-spacing: 0.15em; display: block; margin-bottom: 1rem;">Premium Spatial Alignment Advisory</span>
        <h1 style="font-family: var(--font-heading); font-size: 3.2rem; line-height: 1.2; margin-bottom: 1.5rem; color: var(--c-text-primary);">Astro Interior Design in __NAME__</h1>
        <p style="font-size: 1.1rem; color: var(--c-text-secondary); max-width: 700px; margin: 0 auto; line-height: 1.8;">Aligning luxury residential, corporate offices, and commercial spaces with personalized birth-chart intelligence. Serving elite clients across __LOC__.</p>
      </div>
    </section>

    <section style="max-width: 1000px; margin: 5rem auto; padding: 0 1.5rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; margin-bottom: 4rem;">
        <div>
          <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 1.5rem; color: var(--c-text-primary);">Why Astro Interior Design Matters in __NAME__</h2>
          <p style="line-height: 1.7; color: var(--c-text-secondary); font-size: 0.95rem; margin-bottom: 1.2rem;">Modern homes and corporate boardrooms in __NAME__ are beautifully styled but often suffer from energetic imbalances. Standard Vastu guidelines apply a flat, one-size-fits-all formula, ignoring the individual energies of the primary occupants.</p>
          <p style="line-height: 1.7; color: var(--c-text-secondary); font-size: 0.95rem;">Richa Agarwal overlays traditional Vastu with your personal birth chart coordinates. This custom gridding ensures colors, layouts, and materials harmonize with your specific planetary configurations, inviting peace, focus, and career progress.</p>
        </div>
        <div>
          <div style="border: 1px solid var(--c-accent-border); border-radius: 12px; padding: 2.5rem; background: #FFF; box-shadow: var(--card-shadow);">
            <h3 style="color: var(--c-accent); font-size: 1.3rem; margin-bottom: 1.2rem;">Service Area Details</h3>
            <ul style="list-style: none; padding: 0; margin: 0; line-height: 2; font-size: 0.95rem; color: var(--c-text-secondary);">
              <li><strong>Serving Locations:</strong> __LOC__</li>
              <li><strong>Property Types:</strong> Villas, Penthouses, Executive Offices, Hotels</li>
              <li><strong>Lead Consultant:</strong> Richa Agarwal (25+ Yrs Exp)</li>
              <li><strong>Vastu Focus:</strong> Non-destructive spatial remedies</li>
            </ul>
          </div>
        </div>
      </div>

      <div style="background-color: var(--c-bg-secondary); border-radius: 16px; padding: 3rem 2.5rem; border: 1px solid var(--c-accent-border); margin-bottom: 4rem;">
        <h2 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 2rem; text-align: center;">Frequently Asked Questions</h2>
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--c-text-primary); margin-bottom: 0.4rem;">Do you visit properties in __NAME__ physically?</h4>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary); margin: 0;">Yes. For premium and elite signature packages, we conduct physical site gridding and energy audits across __NAME__. We also offer virtual consultations for immediate spatial remedies.</p>
          </div>
          <hr style="border: 0; border-top: 1px solid var(--c-accent-border);">
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--c-text-primary); margin-bottom: 0.4rem;">How long does the spatial analysis take?</h4>
            <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary); margin: 0;">Casting the birth charts of primary occupants and matching them with your building's directional layout takes approximately 3 to 5 business days, after which we deliver the comprehensive Astro-Interior blueprint.</p>
          </div>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #1E1E1E 0%, #2E2E2E 100%); border-radius: 16px; padding: 4rem 3rem; text-align: center; color: #FFF;">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--c-accent); font-weight: 600; letter-spacing: 0.15em; display: block; margin-bottom: 1rem;">✦ Luxury Spatial Alignment</span>
        <h2 style="font-family: var(--font-heading); font-size: 2.4rem; color: #FFF; margin-bottom: 1.5rem; font-weight: 400;">Calibrate Your Space in __NAME__</h2>
        <p style="font-size: 1rem; color: #999; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.7;">Secure your consultation with Richa Agarwal. Get a customized, non-destructive design layout aligned to your horoscope.</p>
        <a href="/index.html#contact" class="btn-gold" style="padding: 1rem 3.5rem;">Request Consultation</a>
      </div>
    </section>
'@

foreach ($c in $dataJson.cities) {
    $title = "Astro Interior Designer in " + $c.name + " - Vastu Consultancy | AstroInterior"
    $desc = "India's premier Astro Interior Design consultant in " + $c.name + ". Richa Agarwal combines 25+ years of luxury interior styling with birth-chart energy gridding. Serving " + $c.loc + "."
    $keys = "astro interior designer " + $c.id + ", vastu consultant " + $c.id + ", luxury interior designer " + $c.id + ", richa agarwal " + $c.id
    $canon = "https://www.astrointerior.in/cities/" + $c.id + ".html"
    
    $breadcrumbs = '<nav class="breadcrumb-nav" aria-label="Breadcrumb"><ol class="breadcrumb-list"><li class="breadcrumb-item"><a href="/index.html">Home</a></li><li class="breadcrumb-item active" aria-current="page">' + $c.name + '</li></ol></nav>'

    $mainHTML = $cityTemplate.Replace("__NAME__", $c.name)
    $mainHTML = $mainHTML.Replace("__LOC__", $c.loc)

    $schema = $localBusinessSchemaTemplate.Replace("__CANON__", $canon)
    $schema = $schema.Replace("__NAME__", $c.name)
    $schema = $schema.Replace("__DESC__", $desc)

    $fileOut = Join-Path $currentDirectory ("cities\" + $c.id + ".html")
    Generate-Page -FilePath $fileOut -Title $title -Description $desc -Keywords $keys -Canonical $canon -BreadcrumbsHTML $breadcrumbs -MainContentHTML $mainHTML -JSONSchema $schema
}

# --- D. ROOMS ---
$roomTemplate = @'
    <section class="editorial-hero" style="background-color: var(--c-bg-secondary); padding: 6rem 2rem; border-bottom: 1px solid var(--c-accent-border);">
      <div style="max-width: 900px; margin: 0 auto; text-align: center;">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--c-accent); font-weight: 600; letter-spacing: 0.15em; display: block; margin-bottom: 1rem;">Room-by-Room Spatial Alignment Guide</span>
        <h1 style="font-family: var(--font-heading); font-size: 3.2rem; line-height: 1.2; margin-bottom: 1.5rem; color: var(--c-text-primary);">__NAME__ Spatial Guide</h1>
        <p style="font-size: 1.1rem; color: var(--c-text-secondary); max-width: 700px; margin: 0 auto; line-height: 1.8;">__DESC__</p>
      </div>
    </section>

    <section style="max-width: 1000px; margin: 4rem auto; padding: 0 1.5rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
        <div style="border: 1px solid var(--c-accent-border); border-radius: 12px; padding: 2rem; background: #FFF;">
          <h3 style="color: var(--c-accent); font-size: 1.25rem; margin-bottom: 0.8rem;">Associated Element</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary); text-transform: capitalize;">__ELEMENT__</p>
        </div>
        <div style="border: 1px solid var(--c-accent-border); border-radius: 12px; padding: 2rem; background: #FFF;">
          <h3 style="color: var(--c-accent); font-size: 1.25rem; margin-bottom: 0.8rem;">Ideal Vastu Quadrant</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary);">__VASTU__</p>
        </div>
        <div style="border: 1px solid var(--c-accent-border); border-radius: 12px; padding: 2rem; background: #FFF;">
          <h3 style="color: var(--c-accent); font-size: 1.25rem; margin-bottom: 0.8rem;">Alignment Remedies</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary);">Non-destructive layout swap, element balance, color therapy.</p>
        </div>
      </div>

      <div style="background-color: var(--c-bg-secondary); border-radius: 16px; padding: 3rem 2.5rem; border: 1px solid var(--c-accent-border); margin-bottom: 4rem;">
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 1.5rem; text-align: center;">How to align a __NAME__</h2>
        <p style="font-size: 0.95rem; line-height: 1.7; color: var(--c-text-secondary); margin-bottom: 1.5rem;">Aligning a __NAME__ starts with mapping out its compass directions. If the room lies in an unfavourable natal quadrant, you do not need to demolish walls. Instead, we correct the energy using color notes, balancing raw metals, choosing specific lighting warmth, and orienting key furniture (like desks or beds) to the occupant's natal coordinate axes.</p>
      </div>

      <div style="background: linear-gradient(135deg, #1E1E1E 0%, #2E2E2E 100%); border-radius: 16px; padding: 4rem 3rem; text-align: center; color: #FFF;">
        <h2 style="font-family: var(--font-heading); font-size: 2.2rem; color: #FFF; margin-bottom: 1.5rem;">Optimize Your __NAME__ Layout</h2>
        <p style="font-size: 1rem; color: #999; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.7;">Secure your room alignment audit. Get a personalized report designed specifically for your home and birth chart.</p>
        <a href="/index.html#contact" class="btn-gold" style="padding: 1rem 3.5rem;">Optimize Layout</a>
      </div>
    </section>
'@

foreach ($r in $dataJson.rooms) {
    $title = "Astro Interior Guidelines for " + $r.name + " - Design Blueprint | AstroInterior"
    $desc = "Calibrate your " + $r.name + " with Vedic Vastu and Astro Interior coordinates. Learn the recommended element (" + $r.element + ") and quadrant placement (" + $r.vastu + ")."
    $keys = "astro interior " + $r.id + ", " + $r.id + " vastu, " + $r.id + " spatial alignment, richa agarwal " + $r.id + " layout"
    $canon = "https://www.astrointerior.in/rooms/" + $r.id + ".html"
    
    $breadcrumbs = '<nav class="breadcrumb-nav" aria-label="Breadcrumb"><ol class="breadcrumb-list"><li class="breadcrumb-item"><a href="/index.html">Home</a></li><li class="breadcrumb-item"><a href="/blog.html">Knowledge Hub</a></li><li class="breadcrumb-item active" aria-current="page">' + $r.name + '</li></ol></nav>'

    $mainHTML = $roomTemplate.Replace("__NAME__", $r.name)
    $mainHTML = $mainHTML.Replace("__DESC__", $r.desc)
    $mainHTML = $mainHTML.Replace("__ELEMENT__", $r.element)
    $mainHTML = $mainHTML.Replace("__VASTU__", $r.vastu)

    $schema = $articleSchemaTemplate.Replace("__CANON__", $canon)
    $schema = $schema.Replace("__HEADLINE__", ("Astro Interior Guidelines for " + $r.name))
    $schema = $schema.Replace("__DESC__", $desc)

    $fileOut = Join-Path $currentDirectory ("rooms\" + $r.id + ".html")
    Generate-Page -FilePath $fileOut -Title $title -Description $desc -Keywords $keys -Canonical $canon -BreadcrumbsHTML $breadcrumbs -MainContentHTML $mainHTML -JSONSchema $schema
}

# --- E. COLOURS ---
$colourTemplate = @'
    <section class="editorial-hero" style="background-color: var(--c-bg-secondary); padding: 6rem 2rem; border-bottom: 1px solid var(--c-accent-border);">
      <div style="max-width: 900px; margin: 0 auto; text-align: center;">
        <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--c-accent); font-weight: 600; letter-spacing: 0.15em; display: block; margin-bottom: 1rem;">Astrological Colour Therapy Guide</span>
        <h1 style="font-family: var(--font-heading); font-size: 3.2rem; line-height: 1.2; margin-bottom: 1.5rem; color: var(--c-text-primary);">__NAME__ Colour Strategy</h1>
        <p style="font-size: 1.1rem; color: var(--c-text-secondary); max-width: 700px; margin: 0 auto; line-height: 1.8;">__IMPACT__</p>
      </div>
    </section>

    <section style="max-width: 1000px; margin: 4rem auto; padding: 0 1.5rem;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 4rem;">
        <div style="border: 1px solid var(--c-accent-border); border-radius: 12px; padding: 2rem; background: #FFF;">
          <h3 style="color: var(--c-accent); font-size: 1.25rem; margin-bottom: 0.8rem;">Associated Element</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary); text-transform: capitalize;">__ELEMENT__</p>
        </div>
        <div style="border: 1px solid var(--c-accent-border); border-radius: 12px; padding: 2rem; background: #FFF;">
          <h3 style="color: var(--c-accent); font-size: 1.25rem; margin-bottom: 0.8rem;">Ruling Planet Resonance</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary);">__PLANET__</p>
        </div>
        <div style="border: 1px solid var(--c-accent-border); border-radius: 12px; padding: 2rem; background: #FFF;">
          <h3 style="color: var(--c-accent); font-size: 1.25rem; margin-bottom: 0.8rem;">Optimal Space Zones</h3>
          <p style="font-size: 0.95rem; line-height: 1.6; color: var(--c-text-secondary);">Bedrooms, lounge panels, study corners, accent walls.</p>
        </div>
      </div>

      <div style="background-color: var(--c-bg-secondary); border-radius: 16px; padding: 3rem 2.5rem; border: 1px solid var(--c-accent-border); margin-bottom: 4rem;">
        <h2 style="font-family: var(--font-heading); font-size: 1.8rem; margin-bottom: 1.5rem; text-align: center;">Vedic Colour Therapy in Interior Design</h2>
        <p style="font-size: 0.95rem; line-height: 1.7; color: var(--c-text-secondary);">Colours carry electromagnetic frequencies that impact our nervous systems and subtle energy fields. In Astro Interior design, we use __NAME__ as a spatial energy remedy. If a planet like __PLANET__ dominates your birth chart dasha, introducing or balancing __NAME__ in key quadrants helps stabilize planetary energies and align your space with your health and wealth goals.</p>
      </div>

      <div style="background: linear-gradient(135deg, #1E1E1E 0%, #2E2E2E 100%); border-radius: 16px; padding: 4rem 3rem; text-align: center; color: #FFF;">
        <h2 style="font-family: var(--font-heading); font-size: 2.2rem; color: #FFF; margin-bottom: 1.5rem;">Get Your Personalized Color Code</h2>
        <p style="font-size: 1rem; color: #999; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.7;">Find the exact colour spectrums that align with your birth chart. Order a custom spatial alignment consultation.</p>
        <a href="/index.html#contact" class="btn-gold" style="padding: 1rem 3.5rem;">Request Color Alignment</a>
      </div>
    </section>
'@

foreach ($co in $dataJson.colours) {
    $title = $co.name + " Astro Interior Colour Guide - Astrological and Spatial Impact | AstroInterior"
    $desc = "Calibrate your home with " + $co.name + " color psychology. Understand the astrological planet resonance (" + $co.planet + ") and ideal design applications by Richa Agarwal."
    $keys = "astro interior " + $co.id + ", " + $co.id + " color psychology, vastu color " + $co.id + ", richa agarwal colour guide"
    $canon = "https://www.astrointerior.in/colours/" + $co.id + ".html"
    
    $breadcrumbs = '<nav class="breadcrumb-nav" aria-label="Breadcrumbs"><ol class="breadcrumb-list"><li class="breadcrumb-item"><a href="/index.html">Home</a></li><li class="breadcrumb-item"><a href="/blog.html">Knowledge Hub</a></li><li class="breadcrumb-item active" aria-current="page">' + $co.name + '</li></ol></nav>'

    $mainHTML = $colourTemplate.Replace("__NAME__", $co.name)
    $mainHTML = $mainHTML.Replace("__IMPACT__", $co.impact)
    $mainHTML = $mainHTML.Replace("__ELEMENT__", $co.element)
    $mainHTML = $mainHTML.Replace("__PLANET__", $co.planet)

    $schema = $articleSchemaTemplate.Replace("__CANON__", $canon)
    $schema = $schema.Replace("__HEADLINE__", ($co.name + " Astro Interior Colour Guide"))
    $schema = $schema.Replace("__DESC__", $desc)

    $fileOut = Join-Path $currentDirectory ("colours\" + $co.id + ".html")
    Generate-Page -FilePath $fileOut -Title $title -Description $desc -Keywords $keys -Canonical $canon -BreadcrumbsHTML $breadcrumbs -MainContentHTML $mainHTML -JSONSchema $schema
}

# --- F. DYNAMIC SITEMAP COMPLIANCE ---
$SitemapLocs = @("https://www.astrointerior.in/", "https://www.astrointerior.in/blog.html", "https://www.astrointerior.in/gallery.html")
foreach ($d in $dirs) {
    $subFiles = Get-ChildItem -Path (Join-Path $currentDirectory $d) -Filter "*.html"
    foreach ($f in $subFiles) {
        $SitemapLocs += ("https://www.astrointerior.in/" + $d + "/" + $f.Name)
    }
}

$SitemapXML = @'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
'@

$SitemapEntryTemplate = @'
  <url>
    <loc>__LOC__</loc>
    <lastmod>2026-07-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
'@

foreach ($l in $SitemapLocs) {
    $entry = $SitemapEntryTemplate.Replace("__LOC__", $l)
    $SitemapXML += "`n" + $entry
}
$SitemapXML += "`n</urlset>"
$SitemapXML | Out-File -FilePath (Join-Path $currentDirectory "sitemap.xml") -Encoding utf8 -Force

Write-Host "Success: Generated all HTML subpages!"
Write-Host "Success: Dynamic sitemap.xml updated!"

