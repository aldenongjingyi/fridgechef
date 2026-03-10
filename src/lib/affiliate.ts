interface AffiliateParams {
  partner: string;
  baseUrl: string;
  recipeId?: string;
  recipeName?: string;
}

export function generateAffiliateLink({
  partner,
  baseUrl,
  recipeId,
  recipeName,
}: AffiliateParams): string {
  const url = new URL(baseUrl);
  url.searchParams.set('utm_source', 'fridgechef');
  url.searchParams.set('utm_medium', 'referral');
  url.searchParams.set('utm_campaign', 'recipe_partner');
  url.searchParams.set('utm_content', partner.toLowerCase().replace(/\s+/g, '_'));
  if (recipeId) url.searchParams.set('utm_term', recipeId);
  if (recipeName) url.searchParams.set('ref_recipe', encodeURIComponent(recipeName));
  return url.toString();
}
