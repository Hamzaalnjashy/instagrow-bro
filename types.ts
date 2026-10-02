export type Language = 'ar' | 'en';

export type ServiceType = 
  | 'followers' 
  | 'likes' 
  | 'views' 
  | 'comments' 
  | 'story' 
  | 'saves' 
  | 'tiktok' 
  | 'youtube' 
  | 'telegram';

export type QualityTier = 'arab_gulf' | 'global_active' | 'high_retention' | 'verified_network';

export type DeliverySpeed = 'instant' | 'drip_safe' | 'scheduled';

export interface InstagramProfile {
  username: string;
  fullName: string;
  avatarUrl: string;
  followers: number;
  following: number;
  postsCount: number;
  bio: string;
  isVerified: boolean;
  isPrivate: boolean;
}

export interface InstagramPost {
  id: string;
  url: string;
  imageUrl: string;
  caption: string;
  likes: number;
  commentsCount: number;
  timestamp: string;
  authorUsername: string;
}

export interface SmmProviderInfo {
  id: string;
  name: string;
  apiUrl: string;
  hasKey: boolean;
  maskedKey: string;
  apiKey?: string;
  followerServiceId: string;
  likesServiceId: string;
  isEnabled: boolean;
  isActive: boolean;
  isPrimary?: boolean;
  balance?: string | null;
  currency?: string;
  inAppBalance?: number;
  portalUrl?: string;
}

export interface RechargeReceipt {
  id: string;
  providerId: string;
  providerName: string;
  amount: number;
  paymentMethod: string;
  currency: string;
  status: 'completed' | 'pending';
  timestamp: string;
  receiptNumber: string;
  txHash?: string;
}

export interface BoostCampaign {
  id: string;
  serviceType: ServiceType;
  targetUsername: string;
  targetPostUrl?: string;
  postThumbnail?: string;
  quantityRequested: number;
  quantityDelivered: number;
  qualityTier: QualityTier;
  deliverySpeed: DeliverySpeed;
  status: 'pending' | 'delivering' | 'completed' | 'paused';
  createdAt: string;
  estimatedCompletionTime: string;
  serverNode?: string;
  serviceId?: string;
  providerId?: string;
  providerName?: string;
  estimatedCost?: number;
  customCommentsText?: string;
  targetPlatform?: 'instagram' | 'tiktok' | 'youtube' | 'telegram';
  addons?: {
    freeSaves?: boolean;
    freeViews?: boolean;
    customComments?: boolean;
  };
}

export interface IncomingAccount {
  id: string;
  username: string;
  name: string;
  avatar: string;
  country: string;
  timeAgo: string;
  tier: string;
}

export interface ServerNode {
  id: string;
  name: string;
  region: string;
  activePoolSize: number;
  status: 'optimal' | 'busy' | 'syncing';
  latency: number;
  successRate: number;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'dispatch' | 'warning';
  message: string;
  target?: string;
}

export interface SmmServiceOffer {
  serviceId: string;
  name: string;
  nameAr: string;
  category: ServiceType;
  ratePer1k: number;
  min: number;
  max: number;
  speedAr: string;
  refillAr: string;
  badgeAr?: string;
  descriptionAr: string;
  providerId: 'peakerr' | 'jap' | string;
  providerName: string;
  platform?: 'instagram' | 'tiktok' | 'youtube' | 'telegram';
}
