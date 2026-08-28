export const LEGAL_LAST_UPDATED = 'August 28, 2026';

export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
};

export const termsDocument: LegalDocument = {
  lastUpdated: LEGAL_LAST_UPDATED,
  intro:
    'These Terms of Use ("Terms") govern your use of pgmoutfitters.com (the "Site") and any deer feeder orders you place with PGM Outfitters ("PGM," "we," "us"). By using the Site or placing an order, you agree to these Terms.',
  sections: [
    {
      heading: '1. Who we are',
      blocks: [
        {
          type: 'paragraph',
          text: 'PGM Outfitters sells Next Generation deer feeders. Our pickup location is 908 Joseph St, Shreveport, LA 71107. Phone: (318) 227-8145. Email: sales@pgmoutfitters.com.',
        },
      ],
    },
    {
      heading: '2. The Site',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Site is provided for information about our feeders, dealers, and pickup orders. We may update products, prices, photos, and other content at any time. We do not warrant that the Site is uninterrupted or error-free.',
        },
      ],
    },
    {
      heading: '3. Orders and payment',
      blocks: [
        {
          type: 'paragraph',
          text: 'Orders placed on the Site are for pickup only at 908 Joseph St, Shreveport, LA 71107. We do not ship. Please call (318) 227-8145 before you come so we can confirm your order is ready. Payment is processed by Stripe. PGM keeps the sale. A completed Stripe Checkout is an offer to buy; we may cancel or refund an order if a product is unavailable or we cannot fulfill it. Prices shown on the Site may change until checkout is completed.',
        },
      ],
    },
    {
      heading: '4. Inquiries',
      blocks: [
        {
          type: 'paragraph',
          text: 'The inquiry form is a request for information or pricing, not an order. Submitting it does not reserve a feeder.',
        },
      ],
    },
    {
      heading: '5. Acceptable use',
      blocks: [
        {
          type: 'paragraph',
          text: 'You may not misuse the Site, attempt to break it, scrape it in a way that harms the service, or use it for any unlawful purpose.',
        },
      ],
    },
    {
      heading: '6. Intellectual property',
      blocks: [
        {
          type: 'paragraph',
          text: 'Site text, photos, logos, and product names are owned by PGM Outfitters or our licensors. You may not copy them for commercial use without our written permission.',
        },
      ],
    },
    {
      heading: '7. Disclaimer',
      blocks: [
        {
          type: 'paragraph',
          text: 'Feeders and the Site are provided as described. To the extent allowed by law, we disclaim implied warranties. Product use is your responsibility. Follow safe hunting and feeder-use practices.',
        },
      ],
    },
    {
      heading: '8. Limitation of liability',
      blocks: [
        {
          type: 'paragraph',
          text: 'To the extent allowed by law, PGM Outfitters is not liable for indirect, incidental, or consequential damages arising from the Site or a purchase. Our total liability for an order is limited to the amount you paid for that order.',
        },
      ],
    },
    {
      heading: '9. Governing law',
      blocks: [
        {
          type: 'paragraph',
          text: 'These Terms are governed by the laws of the State of Louisiana, without regard to conflict-of-law rules. Venue is Caddo Parish, Louisiana.',
        },
      ],
    },
    {
      heading: '10. Changes',
      blocks: [
        {
          type: 'paragraph',
          text: 'We may update these Terms by posting a new version on this page and changing the last-updated date. Continued use of the Site after a change means you accept the new Terms.',
        },
      ],
    },
    {
      heading: '11. Contact',
      blocks: [
        {
          type: 'paragraph',
          text: 'Questions about these Terms: sales@pgmoutfitters.com or (318) 227-8145.',
        },
      ],
    },
  ],
};

export const privacyDocument: LegalDocument = {
  lastUpdated: LEGAL_LAST_UPDATED,
  intro:
    'This Privacy Policy explains how PGM Outfitters ("PGM," "we," "us") collects and uses information when you use pgmoutfitters.com, submit an inquiry, or place a pickup order.',
  sections: [
    {
      heading: '1. Who we are',
      blocks: [
        {
          type: 'paragraph',
          text: 'PGM Outfitters, 908 Joseph St, Shreveport, LA 71107. Phone: (318) 227-8145. Email: sales@pgmoutfitters.com. Privacy questions go to that email.',
        },
      ],
    },
    {
      heading: '2. Information we collect',
      blocks: [
        {
          type: 'list',
          items: [
            'Inquiry form: name and the contact details and message you submit.',
            'Checkout: name, email, phone, and order details needed to take payment and arrange pickup. Card numbers are collected and processed by Stripe. We do not store your full card number on our servers.',
            'Order records: products, amounts, pickup notes, and payment status, stored so we can fulfill the order and send confirmation email.',
            'Technical data: standard server and browser logs (IP address, browser type, pages viewed) and any analytics cookies the Site uses.',
          ],
        },
      ],
    },
    {
      heading: '3. How we use it',
      blocks: [
        {
          type: 'paragraph',
          text: 'We use this information to answer inquiries, take payment, confirm and fulfill pickup orders, email the buyer and our staff an order summary, improve the Site, and comply with law. We do not sell your personal information.',
        },
      ],
    },
    {
      heading: '4. Who we share it with',
      blocks: [
        {
          type: 'list',
          items: [
            'Stripe, to process payment.',
            'Email delivery, to send the order summary to you and to sales@pgmoutfitters.com.',
            'Service providers who host the Site or database, only as needed to run the business.',
            'Law enforcement or others if required by law.',
          ],
        },
        {
          type: 'paragraph',
          text: 'We do not share your information with dealers for their marketing unless you ask us to connect you with a dealer.',
        },
      ],
    },
    {
      heading: '5. Cookies',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Site may use cookies or similar tools for basic function and analytics. You can block cookies in your browser. The Site may not work fully without them.',
        },
      ],
    },
    {
      heading: '6. Retention',
      blocks: [
        {
          type: 'paragraph',
          text: 'We keep inquiry and order records as long as needed to fulfill the order, answer questions, and meet tax or legal duties, then delete or archive them.',
        },
      ],
    },
    {
      heading: '7. Your choices',
      blocks: [
        {
          type: 'paragraph',
          text: 'To request a copy, correction, or deletion of information we hold about you, email sales@pgmoutfitters.com. We may keep information we are required to keep.',
        },
      ],
    },
    {
      heading: '8. Children',
      blocks: [
        {
          type: 'paragraph',
          text: 'The Site is not directed at children under 13. We do not knowingly collect personal information from them.',
        },
      ],
    },
    {
      heading: '9. Changes',
      blocks: [
        {
          type: 'paragraph',
          text: 'We may update this policy by posting a new version on this page and changing the last-updated date.',
        },
      ],
    },
    {
      heading: '10. Contact',
      blocks: [
        {
          type: 'paragraph',
          text: 'PGM Outfitters, 908 Joseph St, Shreveport, LA 71107. sales@pgmoutfitters.com. (318) 227-8145.',
        },
      ],
    },
  ],
};
