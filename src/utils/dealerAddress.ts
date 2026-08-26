import { dealerAddressType } from '../assets/data/dealers';

export const formatDealerAddressQuery = (address: dealerAddressType) =>
  `${address.street} ${address.city} ${address.state} ${address.zip}`;

export const dealerDirectionsUrl = (address: dealerAddressType) =>
  `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${encodeURIComponent(formatDealerAddressQuery(address))}`;

export const dealerMapsEmbedUrl = (address: dealerAddressType) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(formatDealerAddressQuery(address))}&output=embed`;
