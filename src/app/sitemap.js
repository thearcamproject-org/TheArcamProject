export default function sitemap() {
  const baseUrl = 'https://thearcamproject.in';
  
  const routes = [
    '',
    '/about',
    '/services',
    '/configure',
    '/work',
    '/portal',
    '/contact'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
