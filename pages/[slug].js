import Head from 'next/head';
import { renderMetaTags, useQuerySubscription } from 'react-datocms';
import { request } from '../lib/datocms';
import { Layout } from '../components/layout';
import { metaTagsFragment, responsiveImageFragment } from '../lib/fragments';
import { ContentBlocks } from '../components/content-blocks';

export async function getStaticPaths() {
  const data = await request({ query: `{ allPages { slug } }` });

  return {
    paths: data.allPages.map((post) => `/${post.slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = {
    query: `
      query PageBySlug($slug: String) {
        page(filter: {slug: { eq: $slug } }) {
          title
          slug
          metaTags: _seoMetaTags {
            ...metaTagsFragment
          }
          contentBlocks {
            ... on TextBlockRecord {
              type: _modelApiKey
              id
              heading
              preHeading
              body
              blockAlignment
              textAlignment
            }
            ... on ImageTextBlockRecord {
              type: _modelApiKey
              id
              heading
              preHeading
              body
              mediaPosition
              variant
              isCard
              image {
                alt
                focalPoint {
                  x
                  y
                }
                src: url
              }
            }
          }
        }
      }

      ${metaTagsFragment}
    `,
    preview,
    variables: {
      slug: params.slug,
    },
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.DATOCMS_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  };
}

export default function Index({ subscription }) {
  const {
    data: { page },
  } = useQuerySubscription(subscription);

  return (
    <>
      <Layout preview={subscription.preview}>
        <Head>{renderMetaTags(page.metaTags)}</Head>
        <ContentBlocks blocks={page.contentBlocks} />
      </Layout>
    </>
  );
}
