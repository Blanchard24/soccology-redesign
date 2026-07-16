import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** Date ISO (YYYY-MM-DD). */
  date: string;
};

/**
 * Aperçu du blog (BRIEF §5 — 3 derniers articles).
 * Le contenu réel viendra du blog MDX. En attendant, `posts` peut être vide :
 * on affiche un état vide honnête plutôt que des articles inventés.
 */
export function BlogPreview({
  index = 5,
  posts = [],
}: {
  index?: number;
  posts?: BlogPost[];
}) {
  const latest = posts.slice(0, 3);

  return (
    <section aria-label="From the blog" className="bg-background text-foreground">
      <div className="container-editorial py-20 md:py-28">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading index={index} eyebrow="Journal" title="Latest stories" />
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1 font-heading text-sm font-semibold text-foreground transition-colors hover:text-accent"
          >
            All articles
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </Link>
        </div>

        {latest.length > 0 ? (
          <ul className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {latest.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col border-t-2 border-t-accent bg-surface p-6 transition-colors hover:bg-surface-muted"
                >
                  <time
                    dateTime={post.date}
                    className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                  <h3 className="mt-4 font-heading text-lg font-bold leading-tight group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-14 border-t border-border pt-8 text-muted-foreground">
            Articles are on their way. Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}