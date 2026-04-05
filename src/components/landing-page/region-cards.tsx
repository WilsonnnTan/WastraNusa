import { regionCards } from './data';

export function RegionCards() {
  return (
    <section className="mx-auto mt-16 w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
      <span className="inline-flex rounded-lg border border-[#e4dac8] bg-[#f3ecdd] px-3 py-1 text-xs font-semibold text-[#b09c80]">
        Jelajahi Wilayah
      </span>

      <h3 className="mt-3 text-4xl font-bold tracking-tight text-[#2d5f48]">
        Wastra dari Seluruh Nusantara
      </h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {regionCards.map((card) => (
          <article
            key={card.region}
            className="group relative overflow-hidden rounded-2xl border border-[#ddd4c6]"
          >
            <div
              className={`${card.bgClass} absolute inset-0 transition duration-500 group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

            <div className="relative flex min-h-[188px] flex-col justify-end p-4 text-[#f6f2e8]">
              <span className="mb-2 inline-flex h-4 w-4 rotate-45 border border-[#e9dec8]" />
              <p className="text-sm text-[#e5dcca]">{card.style}</p>
              <p className="mt-2 text-2xl font-bold leading-tight">
                {card.region}
              </p>
              <p className="text-sm text-[#d3ccb8]">{card.count}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
