const DATA_THEME_SONG = './src/data/theme-song.json';

const fallbackData = {
  heading: 'Official Theme Song',
  title: '"Legends Rise in the Meta Games"',
  subtitle: 'Meta Games OST',
  poster: {
    src: 'src/images/theme-song.webp',
    alt: 'Legends Rise in the Meta Games OST Poster',
  },
  caption:
    'Launching of the Official OST of Meta Games entitled: Legends Rise in the Meta Games',
  lyrics: [
    {
      label: 'Verse 1',
      text: [
        'Here is where we carve our name',
        'this is more than just a game',
        'We level up with each new quest',
        'and prove ourselves as the very best.',
      ],
    },
    {
      label: 'Verse 2',
      text: [
        'Our minds are sharp, our skills refined',
        'our passion for victory enshrined',
        'in this world where anything can be',
        'We rise to challenge, wild and free',
      ],
    },
    {
      label: 'Chorus',
      text: [
        "Legends rise, the battle's on,",
        'Until the final victory is won.',
        'Meta Games, where heroes play,',
        'To lead the world in every way.',
      ],
    },
  ],
};

const loadThemeSongSection = async () => {
  try {
    const response = await fetch(DATA_THEME_SONG);
    if (!response.ok) throw new Error('Theme song data not found.');
    const data = await response.json();
    renderThemeSongSection(data);
  } catch (err) {
    console.error('Theme song error:', err);
    renderThemeSongSection(fallbackData);
  }
};

const renderThemeSongSection = (data) => {
  const themeSong = document.querySelector('#theme-song');
  if (!themeSong) return;

  const {
    heading,
    title,
    subtitle,
    poster,
    caption,
    lyrics = [],
  } = data;

  const lyricsHtml = lyrics
    .map(
      (part) => `
        <div>
          <h4 class="text-[1.1rem] font-bold mb-2 text-white">${part.label}</h4>
          <p class="text-[1rem] leading-[1.6] text-white/80">
            ${part.text.join('<br />')}
          </p>
        </div>
      `,
    )
    .join('');

  themeSong.innerHTML = `
    <div class="max-w-[1100px] mx-auto">
      <h2
        id="theme-song-heading"
        class="text-[1.8rem] font-bold mb-[30px] text-left max-md:text-center"
      >
        ${heading}
      </h2>
      <div
        class="grid grid-cols-[1.2fr_0.8fr] gap-10 items-start max-md:grid-cols-1 max-md:gap-[30px]"
      >
        <div class="w-full">
          <figure
            class="relative w-full rounded-[15px] overflow-hidden bg-black aspect-video shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <div class="relative w-full h-full">
              <img
                src="${poster.src}"
                alt="${poster.alt}"
                class="w-full h-full object-cover opacity-80"
              />
            </div>
            <figcaption class="sr-only">${caption}</figcaption>
          </figure>
        </div>
        <article class="flex flex-col gap-5 max-md:text-center">
          <header>
            <h3
              class="text-[1.6rem] font-bold text-white mb-1 max-md:text-center"
            >
              ${title}
            </h3>
            <p class="text-[1.2rem] font-semibold mb-5 max-md:text-center">
              ${subtitle}
            </p>
          </header>
          <div
            class="lyrics-scroll flex flex-col gap-6 max-h-[350px] overflow-y-auto pr-5 max-md:text-center"
          >
            ${lyricsHtml}
          </div>
        </article>
      </div>
    </div>
  `;

};

loadThemeSongSection();