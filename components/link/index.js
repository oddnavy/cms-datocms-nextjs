import NextLink from 'next/link';
import PropTypes from 'prop-types';

const Link = ({ href, as, replace, scroll, shallow, passHref, prefetch, ...props }) => {
  // If a href does not start with `http` or is an object, handle it with NextLink
  if (!String(href).startsWith('http') || isObject(href)) {
    // Checks the href passed in starts with a leading slash, adds it if not
    const hrefUrl = href && !String(href).startsWith('/') ? `/${href}` : href;

    return (
      <NextLink
        href={hrefUrl}
        as={hrefUrl}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref
        prefetch={prefetch || false}
      >
        <a {...props} />
      </NextLink>
    );
  }

  return <a href={href} {...props} />;
};

Link.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  passHref: PropTypes.bool,
  prefetch: PropTypes.string,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
};

Link.defaultProps = {
  as: undefined,
  passHref: true,
  prefetch: undefined,
  replace: undefined,
  scroll: undefined,
  shallow: undefined,
};

export { Link };
