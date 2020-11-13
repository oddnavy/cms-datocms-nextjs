export default async (req, res) => {
  const secret = process.env.PREVIEW_SECRET;

  if (req.query.secret !== secret || !req.query.slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  console.log('setting preview data');

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect(`/${req.query.slug}`);
  res.end();
};
