import { useEffect } from 'react';

const BASE_TITLE = 'Shopee Affiliate Academy';

export function usePageTitle(title?: string, description?: string) {
  useEffect(() => {
    if (title) {
      document.title = `${title} — ${BASE_TITLE}`;
    } else {
      document.title = `${BASE_TITLE} — Bangun Bisnis Affiliate Berdasarkan Data`;
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);
}
