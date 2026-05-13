/**
 * Centralized Slide Content Configuration
 * 
 * This file contains all content for the case study deck.
 * Decks reference this content with optional redaction flags.
 * Only design and styling differ across deck variants.
 */

export interface ContentConfig {
  // Company names
  companies: {
    starbucks: string;
    carmax: string;
    passport: string;
    healthcare: string;
    walmart: string;
  };
  
  // Product specifics
  products: {
    starbucksExample: string;
  };
  
  // Colors (for brand-specific accent colors)
  brandColors: {
    starbucks: string;
    starbucksGradientFrom: string;
    starbucksGradientTo: string;
  };
}

// Original content (non-redacted)
export const originalContent: ContentConfig = {
  companies: {
    starbucks: 'Starbucks',
    carmax: 'CarMax',
    passport: 'Passport',
    healthcare: 'Regional Healthcare Network',
    walmart: 'Walmart',
  },
  products: {
    starbucksExample: 'grande caramel macchiato',
  },
  brandColors: {
    starbucks: 'bg-emerald-600',
    starbucksGradientFrom: 'from-emerald-500',
    starbucksGradientTo: 'to-teal-500',
  },
};

// Redacted content
export const redactedContent: ContentConfig = {
  companies: {
    starbucks: 'Major Coffee Retailer',
    carmax: 'Car Rental and Retail Platform',
    passport: 'Parking and Transportation Customer App',
    healthcare: 'Large Medical Services Institution',
    walmart: 'Major International Retailer',
  },
  products: {
    starbucksExample: 'large vanilla latte',
  },
  brandColors: {
    starbucks: 'bg-amber-600',
    starbucksGradientFrom: 'from-amber-500',
    starbucksGradientTo: 'to-orange-500',
  },
};

// Helper function to get content based on deck type
export function getContent(isRedacted: boolean): ContentConfig {
  return isRedacted ? redactedContent : originalContent;
}
