export const CART_STORAGE_KEY = 'pgmoutfitters.cart';
export const CART_QTY_MAX = 20;
export const QTY_LIMIT_MESSAGE =
  'Limit is 20 per feeder. Call (318) 227-8145 if you need more.';

export type CartLine = {
  slug: string;
  name: string;
  qty: number;
  unitPrice: number;
};

export type CartProductInput = {
  slug: string;
  name: string;
  unitPrice: number;
  qty?: number;
};

const retailPriceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const formatRetailPrice = (amount: number) =>
  retailPriceFormatter.format(Number(amount));

export const toPositiveInt = (value: unknown): number | null => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  const qty = Math.floor(parsed);
  return qty >= 1 ? qty : null;
};

export const clampCartQty = (qty: number) => Math.min(CART_QTY_MAX, Math.max(1, Math.floor(qty)));

export type CartMutation = {
  items: CartLine[];
  limited: boolean;
};

const isCartLine = (value: unknown): value is CartLine => {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const line = value as CartLine;
  return (
    typeof line.slug === 'string' &&
    line.slug.length > 0 &&
    typeof line.name === 'string' &&
    line.name.length > 0 &&
    toPositiveInt(line.qty) !== null &&
    Number.isFinite(Number(line.unitPrice))
  );
};

export const sanitizeCart = (value: unknown): CartLine[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter(isCartLine).map((line) => ({
    slug: line.slug,
    name: line.name,
    qty: clampCartQty(toPositiveInt(line.qty) as number),
    unitPrice: Number(line.unitPrice),
  }));
};

export const readStoredCart = (): CartLine[] => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    return sanitizeCart(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]'));
  } catch (err) {
    return [];
  }
};

export const writeStoredCart = (items: CartLine[]) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(sanitizeCart(items)));
};

export const applyAddLine = (items: CartLine[], incoming: CartProductInput): CartMutation => {
  const addQty = toPositiveInt(incoming.qty ?? 1) ?? 1;
  const existing = items.find((item) => item.slug === incoming.slug);
  const currentQty = existing?.qty ?? 0;
  if (currentQty >= CART_QTY_MAX) {
    return { items, limited: true };
  }

  const nextQty = clampCartQty(currentQty + addQty);
  const limited = currentQty + addQty > CART_QTY_MAX;
  const line = {
    slug: incoming.slug,
    name: incoming.name,
    qty: nextQty,
    unitPrice: incoming.unitPrice,
  };

  if (existing) {
    return {
      items: items.map((item) => (item.slug === incoming.slug ? line : item)),
      limited,
    };
  }
  return { items: [...items, line], limited };
};

export const addLine = (items: CartLine[], incoming: CartProductInput): CartLine[] =>
  applyAddLine(items, incoming).items;

export const setLineQty = (items: CartLine[], slug: string, qty: unknown): CartLine[] => {
  const nextQty = toPositiveInt(qty);
  if (nextQty === null) {
    return items;
  }
  return items.map((item) =>
    item.slug === slug ? { ...item, qty: clampCartQty(nextQty) } : item
  );
};

export const applyIncrementLine = (items: CartLine[], slug: string): CartMutation => {
  const existing = items.find((item) => item.slug === slug);
  if (!existing) {
    return { items, limited: false };
  }
  if (existing.qty >= CART_QTY_MAX) {
    return { items, limited: true };
  }
  return {
    items: items.map((item) =>
      item.slug === slug ? { ...item, qty: item.qty + 1 } : item
    ),
    limited: false,
  };
};

export const incrementLine = (items: CartLine[], slug: string): CartLine[] =>
  applyIncrementLine(items, slug).items;

export const decrementLine = (items: CartLine[], slug: string): CartLine[] => {
  return items.map((item) =>
    item.slug === slug ? { ...item, qty: Math.max(1, item.qty - 1) } : item
  );
};

export const removeLine = (items: CartLine[], slug: string): CartLine[] =>
  items.filter((item) => item.slug !== slug);

export const cartCount = (items: CartLine[]): number =>
  items.reduce((total, item) => total + item.qty, 0);

export const lineTotal = (item: CartLine): number => item.unitPrice * item.qty;

export const cartSubtotal = (items: CartLine[]): number =>
  items.reduce((total, item) => total + lineTotal(item), 0);

export const checkoutItems = (items: CartLine[]) =>
  items.map((item) => ({ slug: item.slug, qty: item.qty }));
