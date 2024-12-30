// Base properties common to all elements
export interface BaseElement {
  id: string; // Unique identifier
  type: string; // Discriminator for element type
  backgroundColor?: string; // Optional background color
  textColor: 'white' | 'black'; // Add textColor for dynamic text color control

}

// Specific properties for a Leaderboard element
export interface LeaderboardElement extends BaseElement {
  type: 'leaderboard'; // Discriminator for Leaderboard
  title: string; // Title of the leaderboard
  data: {
    place: number; // Rank of the player
    player: string; // Player name
    points: number; // Points scored
    prize: number; // Prize amount
    image?: string; // Optional player/medal image
  }[]; // Array of leaderboard rows
  textColor: "black" | "white";
}

// Specific properties for a Banner element
export interface BannerElement extends BaseElement {
  type: 'banner'; // Discriminator for Banner
  text: string; // Banner text
  imageUrl: string; // URL of the banner image
}

// Specific properties for a new element type (e.g., Button)
export interface ButtonElement extends BaseElement {
  type: 'button'; // Discriminator for Button
  label: string; // Button label text
  onClick?: () => void; // Optional click handler
}

// Union type for all element types
export type Element = LeaderboardElement | BannerElement | ButtonElement;
