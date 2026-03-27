import { loadHeaderSection } from "./sections/header.js";
import { loadNavbarSection } from "./sections/navbar.js";
import { loadHeroSection } from "./sections/hero.js";
import { loadWhatAreMetaGamesSection } from "./sections/what-are-metagames.js";
import { loadMarqueeSection } from "./sections/marquee.js";
import { loadNewsUpdateSection } from "./sections/news.js";
import { loadSportsAndGames } from "./sections/sports-and-games.js";
import { loadMetaMovement } from "./sections/meta-movement.js";
import { loadMetagamesEmblems } from "./sections/metagames-emblems.js";
import { loadThemeSongSection } from "./sections/theme-song.js";
import { loadHostNationSection } from "./sections/host-nation.js";
import { loadFooterSection } from "./sections/footer.js";

const loadAllSections = async () => {
    try {
        await loadHeaderSection();
        await loadNavbarSection();
        await loadHeroSection();
        await loadWhatAreMetaGamesSection();
        await loadMarqueeSection();
        await loadNewsUpdateSection();
        await loadSportsAndGames();
        await loadMetaMovement();
        await loadMetagamesEmblems();
        await loadThemeSongSection();
        await loadHostNationSection();
        await loadFooterSection();
    } catch (err) {
        console.error("Failed to load sections:", err);
    }
};

loadAllSections();