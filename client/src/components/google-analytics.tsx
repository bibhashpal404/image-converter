import { Helmet } from 'react-helmet';

export function GoogleAnalytics() {
  return (
    <Helmet>
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-TEW52S6G3Z"></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TEW52S6G3Z');
        `}
      </script>
    </Helmet>
  );
}
