export const unwrapCheckoutUrl = (res: any): string | undefined => {
  if (typeof res?.url === 'string' && res.url) {
    return res.url;
  }
  if (typeof res?.data?.url === 'string' && res.data.url) {
    return res.data.url;
  }
  return undefined;
};

export const unwrapSessionPayment = (res: any): { paid: boolean; status?: string } => {
  const body = typeof res?.paid === 'boolean' ? res : res?.data;
  return {
    paid: body?.paid === true,
    status: typeof body?.status === 'string' ? body.status : undefined,
  };
};
