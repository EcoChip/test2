"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_POSTS } from "@/lib/blogData";
import { ArrowRightIcon, ClockIcon } from "@/components/ui/Icons";
import { NewsletterSection } from "@/components/ui/NewsletterSection";

const CATEGORIES = [
  "Todos",
  "Ortodoncia Invisible",
  "Estética Biomimética",
  "Implantología Quirúrgica",
  "Rehabilitación Oral",
];

export default function BlogHubPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredPosts =
    activeCategory === "Todos"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featuredPost = BLOG_POSTS[0];
  const regularPosts = filteredPosts.filter((p) =>
    activeCategory === "Todos" ? p.slug !== featuredPost.slug : true
  );

  return (
    <div className="w-full bg-porcelain pt-24 pb-24">
      {/* Blog Hero */}
      <section className="py-16 md:py-20 border-b border-ink/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              El Cuaderno Clínico
            </span>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-ink font-normal mt-3 leading-tight text-balance">
              Artículos médicos, biomecánica y criterios de preservación.
            </h1>
            <p className="mt-6 text-base sm:text-lg text-ink-muted font-sans leading-relaxed text-pretty">
              Publicaciones redactadas por nuestro cuerpo médico colegiado para entender la ciencia 
              detrás de la ortodoncia invisible, las carillas cerámicas y la cirugía guiada por ordenador.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 pt-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs uppercase tracking-wider px-4 py-2 rounded-sm border transition-all ${
                  activeCategory === cat
                    ? "bg-sage text-porcelain border-sage font-semibold shadow-sm"
                    : "bg-white text-ink-muted border-ink/15 hover:border-ink/40 hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article (when viewing all categories) */}
      {activeCategory === "Todos" && (
        <section className="py-16 border-b border-ink/10 bg-porcelain-light">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-ink/10 rounded-sm overflow-hidden p-6 sm:p-10 shadow-editorial group">
              <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] rounded-sm overflow-hidden border border-ink/10 bg-ink">
                <Image
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-sage text-porcelain text-[10px] uppercase tracking-wider px-2.5 py-1 rounded font-semibold">
                  Artículo Destacado
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3 text-xs text-ink-muted">
                  <span className="text-coral font-semibold uppercase tracking-wider">
                    {featuredPost.category}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5 text-sage" />
                    <span>{featuredPost.readTime}</span>
                  </span>
                  <span>·</span>
                  <span>{featuredPost.publishedDate}</span>
                </div>

                <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-ink font-normal leading-tight group-hover:text-sage transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-ink/10">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-ink/10">
                      <Image
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-ink block leading-snug">
                        {featuredPost.author.name}
                      </span>
                      <span className="text-[10px] text-ink-muted block leading-none">
                        {featuredPost.author.role.split("&")[0].trim()}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sage hover:text-coral transition-colors"
                  >
                    <span>Leer artículo</span>
                    <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-ink/10 rounded-sm overflow-hidden flex flex-col justify-between shadow-subtle hover:shadow-editorial hover:border-ink/25 transition-all group"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-ink/5 border-b border-ink/5 overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-[11px] mb-3">
                      <span className="text-sage font-semibold uppercase tracking-wider">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-ink-muted">
                        <ClockIcon className="w-3 h-3 text-sage" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl text-ink font-normal group-hover:text-sage transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-ink-muted mt-3 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-ink/5 mt-4">
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-[11px] text-ink-muted font-medium">
                      {post.author.name}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-sage hover:text-coral transition-colors"
                    >
                      <span>Leer más</span>
                      <ArrowRightIcon className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Box at the bottom of blog */}
          <div className="mt-20">
            <NewsletterSection variant="full" />
          </div>
        </div>
      </section>
    </div>
  );
}
