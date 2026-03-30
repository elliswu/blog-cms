import { siteConfig } from "@/../data/site-config";
import type { BlogPost, Product } from "@/types";

interface JsonLdProps {
  type: "article" | "product" | "breadcrumb" | "website";
  data?: BlogPost | Product;
  breadcrumbs?: { name: string; url: string }[];
}

export function JsonLd({ type, data, breadcrumbs }: JsonLdProps) {
  let structuredData: Record<string, unknown>;

  switch (type) {
    case "website":
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      };
      break;

    case "article": {
      const post = data as BlogPost;
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        image: post.coverImage
          ? `${siteConfig.url}${post.coverImage}`
          : undefined,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: {
          "@type": "Person",
          name: post.author ?? siteConfig.author.name,
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteConfig.url}/blog/${post.slug}`,
        },
        keywords: post.keywords?.join(", "),
      };
      break;
    }

    case "product": {
      const product = data as Product;
      const twdLink = product.affiliateLinks.find(
        (l) => l.currency === "TWD" && l.price
      );
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        brand: {
          "@type": "Brand",
          name: product.brand,
        },
        image: product.coverImage
          ? `${siteConfig.url}${product.coverImage}`
          : undefined,
        review: {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: product.rating,
            bestRating: 5,
          },
          author: {
            "@type": "Organization",
            name: siteConfig.name,
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          bestRating: 5,
          ratingCount: 1,
        },
        offers: twdLink
          ? {
              "@type": "Offer",
              price: twdLink.price,
              priceCurrency: "TWD",
              availability: "https://schema.org/InStock",
              url: twdLink.url,
            }
          : undefined,
      };
      break;
    }

    case "breadcrumb": {
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: (breadcrumbs ?? []).map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${siteConfig.url}${item.url}`,
        })),
      };
      break;
    }

    default:
      return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
