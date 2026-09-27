import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blogData";
import { ArrowRightIcon, ClockIcon, ShieldCheckIcon } from "@/components/ui/Icons";
import { NewsletterSection } from "@/components/ui/NewsletterSection";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: "Artículo no encontrado" };
  }
  return {
    title: `${post.title} | El Cuaderno Clínico AURA`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="w-full bg-porcelain pt-24 pb-24">
      {/* Header & Breadcrumb */}
      <section className="py-12 md:py-16 border-b border-ink/10">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-ink-muted mb-6">
            <Link href="/" className="hover:text-ink transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-ink transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-sage font-medium">{post.category}</span>
          </nav>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded bg-sage/10 text-sage font-semibold uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-ink-muted">·</span>
              <span className="flex items-center gap-1 text-ink-muted">
                <ClockIcon className="w-3.5 h-3.5 text-sage" />
                <span>{post.readTime}</span>
              </span>
              <span className="text-ink-muted">·</span>
              <span className="text-ink-muted">{post.publishedDate}</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl md:text-6xl text-ink font-normal leading-[1.12] text-balance">
              {post.title}
            </h1>

            <p className="text-base sm:text-xl text-ink-muted font-sans leading-relaxed pt-2">
              {post.excerpt}
            </p>

            {/* Author Byline */}
            <div className="flex items-center gap-4 pt-6 border-t border-ink/10">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-ink/10">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-sm font-semibold text-ink block leading-snug">
                  {post.author.name}
                </span>
                <span className="text-xs text-ink-muted block">
                  {post.author.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Header Image */}
      <section className="py-8 bg-porcelain-light border-b border-ink/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-ink/10 shadow-editorial bg-ink">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-12">
          {/* Introduction */}
          <div className="text-base sm:text-lg text-ink font-sans leading-relaxed border-l-2 border-sage pl-6 italic bg-white/50 p-6 rounded-r-sm">
            {post.content.intro}
          </div>

          {/* Dynamic Sections */}
          {post.content.sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h2 className="font-editorial text-2xl sm:text-3xl text-ink font-normal leading-snug pt-4 border-t border-ink/10">
                {section.heading}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-ink-muted font-sans leading-relaxed">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Comparison Table if present */}
              {section.table && (
                <div className="my-8 overflow-x-auto border border-ink/15 rounded-sm shadow-subtle bg-white">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-sage text-porcelain">
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3.5 font-semibold tracking-wider uppercase text-[11px] border-b border-sage-deep">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink/10">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-porcelain-light/60"}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={`p-3.5 leading-relaxed ${cIdx === 0 ? "font-semibold text-ink" : "text-ink-muted"}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Highlight callout box if present */}
              {section.highlightBox && (
                <div className="p-6 bg-sage/10 border-l-4 border-sage rounded-r-sm space-y-2 my-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sage">
                    <ShieldCheckIcon className="w-4 h-4" />
                    <span>{section.highlightBox.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans">
                    {section.highlightBox.text}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Conclusion */}
          <div className="p-8 bg-white border border-ink/10 rounded-sm shadow-subtle space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-coral font-semibold">
              Conclusión Médica
            </span>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
              {post.content.conclusion}
            </p>
          </div>

          {/* Consultation CTA Banner */}
          <div className="p-8 sm:p-10 bg-sage-deep text-porcelain rounded-sm shadow-editorial flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-coral font-semibold">
                Diagnóstico 3D en Serrano
              </span>
              <h3 className="font-editorial text-2xl text-porcelain font-normal">
                ¿Deseas valorar tu caso con {post.author.name}?
              </h3>
              <p className="text-xs text-porcelain/70 max-w-md">
                Solicita una primera cita diagnóstica con escaneo óptico intraoral y simulación digital ClinCheck.
              </p>
            </div>
            <Link
              href="/contacto"
              className="btn-slide-left btn-slide-dark inline-flex items-center gap-2 px-6 py-3.5 bg-coral text-white text-xs font-semibold uppercase tracking-wider rounded-sm shadow-cta transition-colors shrink-0"
            >
              <span>Pedir Cita Diagnóstica</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Newsletter Box */}
          <div className="pt-6">
            <NewsletterSection variant="card" />
          </div>

          {/* Back link */}
          <div className="pt-6 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sage hover:text-coral transition-colors"
            >
              <span>← Volver al índice de publicaciones</span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
