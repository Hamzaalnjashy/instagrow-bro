import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  CheckCircle, 
  Grid, 
  Film, 
  UserCheck, 
  Lock, 
  Sparkles,
  Share2,
  MoreHorizontal,
  Camera,
  Plus
} from 'lucide-react';
import { InstagramProfile, InstagramPost } from '../types';
import { formatNumber } from '../utils/formatters';

interface InstagramMockupProps {
  profile: InstagramProfile;
  post?: InstagramPost;
  activeView?: 'profile' | 'post';
  isDelivering?: boolean;
  liveFollowerDelta?: number;
  liveLikesDelta?: number;
  isArabic?: boolean;
}

export const InstagramMockup: React.FC<InstagramMockupProps> = ({
  profile,
  post,
  activeView = 'profile',
  isDelivering = false,
  liveFollowerDelta = 0,
  liveLikesDelta = 0,
  isArabic = true,
}) => {
  const [currentTab, setCurrentTab] = useState<'profile' | 'post'>(activeView);
  const [heartBurst, setHeartBurst] = useState(false);
  const [isLikedByUser, setIsLikedByUser] = useState(true);

  // Sync prop changes
  useEffect(() => {
    if (activeView) {
      setCurrentTab(activeView);
    }
  }, [activeView]);

  // Burst effect when likes delta changes
  useEffect(() => {
    if (liveLikesDelta > 0) {
      setHeartBurst(true);
      const timer = setTimeout(() => setHeartBurst(false), 600);
      return () => clearTimeout(timer);
    }
  }, [liveLikesDelta]);

  const totalFollowers = profile.followers + liveFollowerDelta;
  const totalLikes = (post?.likes || 1240) + liveLikesDelta;

  return (
    <div className="relative mx-auto w-full max-w-[340px] rounded-[36px] border-[5px] border-slate-800 bg-[#000000] p-3 shadow-2xl shadow-purple-950/40 select-none">
      {/* Phone Notch / Dynamic Island */}
      <div className="relative mb-3 flex items-center justify-between px-3 text-[11px] text-slate-400">
        <span className="font-semibold text-white">9:41</span>
        <div className="h-4 w-20 rounded-full bg-slate-900 border border-slate-800" />
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px]">5G</span>
        </div>
      </div>

      {/* View Switcher for simulation preview */}
      <div className="mb-2 flex rounded-lg bg-slate-900/80 p-0.5 text-[11px]">
        <button
          onClick={() => setCurrentTab('profile')}
          className={`flex-1 py-1 rounded-md text-center font-medium transition-all ${
            currentTab === 'profile'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {isArabic ? 'معاينة البروفايل' : 'Profile View'}
        </button>
        <button
          onClick={() => setCurrentTab('post')}
          className={`flex-1 py-1 rounded-md text-center font-medium transition-all ${
            currentTab === 'post'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {isArabic ? 'معاينة المنشور واللايكات' : 'Post View'}
        </button>
      </div>

      {/* Screen Content: Instagram App */}
      <div className="overflow-hidden rounded-2xl bg-[#000000] text-white min-h-[460px] flex flex-col justify-between border border-slate-900">
        {currentTab === 'profile' ? (
          /* Profile Mode */
          <div className="p-3 text-start">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold tracking-tight">@{profile.username}</span>
                {profile.isVerified && (
                  <CheckCircle className="h-3.5 w-3.5 fill-sky-500 text-black inline" />
                )}
                {profile.isPrivate && (
                  <Lock className="h-3 w-3 text-slate-400 inline" />
                )}
              </div>
              <MoreHorizontal className="h-4 w-4 text-slate-400" />
            </div>

            {/* Profile Info Header */}
            <div className="flex items-center justify-between py-3">
              <div className="relative">
                <div className="h-16 w-16 rounded-full p-[2px] bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.username}
                    referrerPolicy="no-referrer"
                    className="h-full w-full rounded-full object-cover border border-black"
                  />
                </div>
                {isDelivering && (
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white shadow">
                    +
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-center">
                <div>
                  <div className="text-sm font-bold font-tabular">{profile.postsCount}</div>
                  <div className="text-[10px] text-slate-400">{isArabic ? 'منشورات' : 'posts'}</div>
                </div>
                <div className="relative">
                  <div className={`text-sm font-bold font-tabular transition-colors ${
                    liveFollowerDelta > 0 ? 'text-emerald-400 scale-105' : 'text-white'
                  }`}>
                    {formatNumber(totalFollowers)}
                  </div>
                  <div className="text-[10px] text-slate-400">{isArabic ? 'متابعين' : 'followers'}</div>
                  {liveFollowerDelta > 0 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold text-emerald-400 animate-bounce">
                      +{liveFollowerDelta}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-bold font-tabular">{profile.following}</div>
                  <div className="text-[10px] text-slate-400">{isArabic ? 'يتابع' : 'following'}</div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="text-xs space-y-0.5 mb-3">
              <div className="font-bold text-[13px]">{profile.fullName || profile.username}</div>
              {profile.bio ? (
                <p className="text-[11px] text-slate-300 leading-relaxed whitespace-pre-line line-clamp-3">
                  {profile.bio}
                </p>
              ) : (
                <p className="text-[11px] text-slate-500 italic">
                  {isArabic ? 'حساب نشط - بانتظار بدء التزويد' : 'Active Account - Ready for Boost'}
                </p>
              )}
            </div>

            {/* Follow / Edit Button */}
            <div className="flex gap-1.5 mb-3">
              <button className="flex-1 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-xs font-semibold text-white transition flex items-center justify-center gap-1">
                <UserCheck className="h-3.5 w-3.5" />
                <span>{isArabic ? 'متابعة' : 'Follow'}</span>
              </button>
              <button className="py-1.5 px-3 rounded-lg bg-slate-800 text-xs font-medium text-slate-200">
                {isArabic ? 'مراسلة' : 'Message'}
              </button>
            </div>

            {/* Highlights preview */}
            {profile.postsCount > 0 ? (
              <div className="flex gap-2.5 overflow-hidden py-1 mb-2">
                {['✨ VIP', '🔥 Highlights', '📍 Travel'].map((hl, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className="h-10 w-10 rounded-full border border-slate-700 bg-slate-900 flex items-center justify-center text-[10px]">
                      ⭐
                    </div>
                    <span className="text-[9px] text-slate-400 truncate w-10 text-center">{hl}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 overflow-hidden py-1.5 mb-2 border-b border-white/5 pb-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-11 w-11 rounded-full border border-slate-700 bg-slate-900/60 flex items-center justify-center text-slate-400">
                    <Plus className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] text-slate-400">{isArabic ? 'جديد' : 'New'}</span>
                </div>
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="h-11 w-11 rounded-full bg-slate-900/40 border border-slate-800/80" />
                ))}
              </div>
            )}

            {/* Posts Grid */}
            <div className="border-t border-white/10 pt-2">
              {profile.postsCount === 0 ? (
                /* Authentic Instagram Empty Posts State */
                <div className="py-7 px-3 flex flex-col items-center justify-center text-center space-y-2">
                  <div className="h-14 w-14 rounded-full border-2 border-slate-700/80 bg-slate-900/60 flex items-center justify-center text-slate-400">
                    <Camera className="h-6 w-6 text-sky-400" />
                  </div>
                  <div className="font-bold text-xs text-white">
                    {isArabic ? 'لم يتم نشر أي منشورات بعد' : 'Capture the moment with a friend'}
                  </div>
                  <p className="text-[10px] text-slate-400 max-w-[210px] leading-relaxed">
                    {isArabic 
                      ? 'الحساب نشط وجاهز لاستقبال المتابعين واللايكات الفورية.' 
                      : 'Account is active and ready to receive followers.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-slate-900 rounded-sm overflow-hidden relative group">
                      <img
                        src={post?.imageUrl || profile.avatarUrl}
                        alt="post"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover opacity-90 group-hover:opacity-100"
                      />
                      {i === 1 && (
                        <div className="absolute top-1 right-1">
                          <Film className="h-3 w-3 text-white drop-shadow" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Post Mode */
          <div className="text-start">
            {/* Post Header */}
            <div className="flex items-center justify-between p-2.5 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-500 via-rose-500 to-fuchsia-600">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.username}
                    referrerPolicy="no-referrer"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold leading-none flex items-center gap-1">
                    {profile.username}
                    {profile.isVerified && <CheckCircle className="h-3 w-3 fill-sky-500 text-black inline" />}
                  </div>
                  <span className="text-[9px] text-slate-400">دبي، الإمارات العربية المتحدة</span>
                </div>
              </div>
              <MoreHorizontal className="h-4 w-4 text-slate-400" />
            </div>

            {/* Post Media */}
            <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
              <img
                src={post?.imageUrl || profile.avatarUrl}
                alt="Instagram post media"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              
              {/* Heart Burst Particle Effect */}
              {heartBurst && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="animate-ping">
                    <Heart className="h-20 w-20 fill-rose-500 text-rose-500 drop-shadow-lg" />
                  </div>
                </div>
              )}

              {liveLikesDelta > 0 && (
                <div className="absolute top-3 left-3 rounded-full bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-500/30">
                  +{liveLikesDelta} {isArabic ? 'إعجاب جديد' : 'new likes'}
                </div>
              )}
            </div>

            {/* Post Action Buttons */}
            <div className="p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsLikedByUser(!isLikedByUser)}
                    className="relative focus:outline-none transition transform active:scale-125"
                  >
                    <Heart className={`h-5 w-5 ${
                      isLikedByUser ? 'fill-rose-500 text-rose-500' : 'text-white'
                    }`} />
                  </button>
                  <MessageCircle className="h-5 w-5 text-white" />
                  <Send className="h-5 w-5 text-white" />
                </div>
                <Bookmark className="h-5 w-5 text-white" />
              </div>

              {/* Likes Counter */}
              <div className="text-xs font-bold font-tabular text-slate-100 mb-1">
                {isArabic ? (
                  <span>{formatNumber(totalLikes)} إعجاباً</span>
                ) : (
                  <span>{formatNumber(totalLikes)} likes</span>
                )}
              </div>

              {/* Caption */}
              <div className="text-[11px] leading-snug text-slate-300">
                <span className="font-bold text-white me-1.5">{profile.username}</span>
                {post?.caption || 'إطلالة استثنائية وبداية أسبوع مليئة بالحماس والإنتاجية ✨ #دبي #اكسبلور'}
              </div>

              <div className="text-[10px] text-slate-500 mt-1">
                {post?.timestamp || 'منذ 3 ساعات'} · {isArabic ? 'عرض جميع التعليقات' : 'View all comments'}
              </div>
            </div>
          </div>
        )}

        {/* Mock Instagram Bottom Nav */}
        <div className="flex items-center justify-around py-2 border-t border-white/10 text-slate-400">
          <div className="h-4 w-4 rounded-sm border border-slate-500" />
          <div className="h-4 w-4 text-[10px] font-bold">🔍</div>
          <div className="h-4 w-4 rounded border border-slate-500 flex items-center justify-center text-[10px]">+</div>
          <div className="h-4 w-4 text-[10px]">🎬</div>
          <div className="h-4 w-4 rounded-full border border-pink-500 bg-pink-500/20" />
        </div>
      </div>
    </div>
  );
};
