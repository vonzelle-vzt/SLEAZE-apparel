'use client';

declare global {
  interface Window {
    ShopifyBuy: typeof import('@shopify/buy-button-js');
    shopifyClient: ReturnType<typeof import('@shopify/buy-button-js').buildClient>;
    shopifyUI: ReturnType<typeof import('@shopify/buy-button-js').UI>;
  }
}

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'sleaze-apparel.myshopify.com';
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || '';

export async function initShopify() {
  if (typeof window === 'undefined') return null;

  const ShopifyBuy = await import('@shopify/buy-button-js');
  
  if (!window.shopifyClient) {
    window.shopifyClient = ShopifyBuy.buildClient({
      domain: SHOPIFY_DOMAIN,
      storefrontAccessToken: SHOPIFY_TOKEN,
    });
  }

  if (!window.shopifyUI) {
    window.shopifyUI = ShopifyBuy.UI.init(window.shopifyClient);
  }

  return {
    client: window.shopifyClient,
    ui: window.shopifyUI,
  };
}

export const buyButtonStyles = {
  product: {
    '@media (min-width: 601px)': {
      'max-width': '100%',
      'margin-left': '0',
      'margin-bottom': '0',
    },
    'text': {
      'color': '#f5f5dc',
    },
  },
  button: {
    'font-family': 'var(--font-bebas), sans-serif',
    'font-size': '18px',
    'padding-top': '16px',
    'padding-bottom': '16px',
    ':hover': {
      'background-color': '#a01830',
    },
    'background-color': '#c41e3a',
    ':focus': {
      'background-color': '#a01830',
    },
    'border-radius': '0px',
    'letter-spacing': '2px',
  },
  quantityInput: {
    'font-size': '16px',
    'padding-top': '16px',
    'padding-bottom': '16px',
  },
  title: {
    'font-family': 'var(--font-bebas), sans-serif',
    'font-size': '28px',
    'color': '#f5f5dc',
    'letter-spacing': '2px',
  },
  price: {
    'font-family': 'var(--font-inter), sans-serif',
    'font-size': '20px',
    'color': '#c41e3a',
  },
  compareAt: {
    'font-family': 'var(--font-inter), sans-serif',
    'font-size': '16px',
    'color': '#888',
  },
  options: {
    'font-family': 'var(--font-inter), sans-serif',
    'color': '#f5f5dc',
  },
};

export const cartStyles = {
  button: {
    'font-family': 'var(--font-bebas), sans-serif',
    'font-size': '18px',
    'padding-top': '16px',
    'padding-bottom': '16px',
    ':hover': {
      'background-color': '#a01830',
    },
    'background-color': '#c41e3a',
    ':focus': {
      'background-color': '#a01830',
    },
    'border-radius': '0px',
    'letter-spacing': '2px',
  },
  title: {
    'color': '#f5f5dc',
    'font-family': 'var(--font-bebas), sans-serif',
    'letter-spacing': '2px',
  },
  header: {
    'color': '#f5f5dc',
    'background-color': '#1a1a1a',
  },
  lineItems: {
    'color': '#f5f5dc',
  },
  subtotalText: {
    'color': '#f5f5dc',
  },
  subtotal: {
    'color': '#c41e3a',
  },
  notice: {
    'color': '#f5f5dc',
  },
  currency: {
    'color': '#c41e3a',
  },
  close: {
    'color': '#f5f5dc',
    ':hover': {
      'color': '#c41e3a',
    },
  },
  cart: {
    'background-color': '#1a1a1a',
  },
  footer: {
    'background-color': '#1a1a1a',
  },
};

export const toggleStyles = {
  toggle: {
    'font-family': 'var(--font-bebas), sans-serif',
    'background-color': '#c41e3a',
    ':hover': {
      'background-color': '#a01830',
    },
    ':focus': {
      'background-color': '#a01830',
    },
  },
  count: {
    'font-size': '16px',
  },
};

