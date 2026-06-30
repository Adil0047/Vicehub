import { Link } from 'react-router-dom';
import { FaArrowRight, FaBookOpen } from 'react-icons/fa';
import Button from '@components/ui/Button';
import SearchBar from '@components/common/SearchBar';
import { ROUTES } from '@constants/routes';

/**
 * Hero section: large background, dark overlay, title, subtitle,
 * primary/secondary CTAs, and search bar — per UI guidelines section 13.
 *
 * Background uses a layered gradient (synth sunset over near-black) rather
 * than a stock image, since no licensed GTA VI artwork is available here.
 */
function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background-primary pt-20">
      {/* Layered gradient background, evoking a Vice City dusk skyline */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,122,0,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 85% 20%, rgba(255,143,31,0.12), transparent 55%), linear-gradient(180deg, #141414 0%, #0B0B0B 65%)',
          }}
        />
        <div className="absolute inset-0 bg-background-primary/40" />
        <div
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, #0B0B0B 100%)',
          }}
        />
      </div>

      <div className="container-page relative z-10 flex flex-col items-start gap-8 py-24">
        <span className="rounded-full border border-orange/40 bg-orange/10 px-4 py-1.5 text-small font-semibold text-orange">
          Built for GTA VI
        </span>

        <h1 className="max-w-3xl text-[40px] leading-tight font-bold text-text-primary sm:text-[48px] md:text-hero">
          The Ultimate <span className="text-orange">GTA VI</span> Companion
        </h1>

        <p className="max-w-xl text-body text-text-secondary md:text-[18px]">
          Cheat codes, vehicles, weapons, characters, news, and guides — everything you need
          to dominate Vice City, all in one place.
        </p>

        <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
          <Link to={ROUTES.CHEATS} className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Browse Cheats
              <FaArrowRight size={14} />
            </Button>
          </Link>
          <Link to={ROUTES.GUIDES} className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <FaBookOpen size={14} />
              Read Guides
            </Button>
          </Link>
        </div>

        <div className="w-full max-w-xl pt-2">
          <SearchBar placeholder="Search cheats, vehicles, weapons, guides..." />
        </div>
      </div>
    </section>
  );
}

export default Hero;
