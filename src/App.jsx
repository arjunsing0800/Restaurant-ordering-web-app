import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  UtensilsCrossed, Zap, CreditCard, Phone, MapPin, ArrowRight, Check,
  ShoppingCart, Search, Star, Plus, Minus, X, ChevronLeft, Trash2
} from "lucide-react";

// ─── Menu Data ──────────────────────────────────────────────────────────────
const menuData = {
  restaurant: {
    name: "The Food Hub",
    logo: "FH",
    tagline: "Crafted with Passion",
    address: "42 MG Road, Connaught Place, Delhi",
    phone: "+91 98765 43210",
  },
  categories: [
    { id: "all", label: "All", emoji: "🍽️" },
    { id: "pizza", label: "Pizza", emoji: "🍕" },
    { id: "burgers", label: "Burgers", emoji: "🍔" },
    { id: "salads", label: "Salads", emoji: "🥗" },
    { id: "indian", label: "Indian", emoji: "🍛" },
    { id: "beverages", label: "Beverages", emoji: "🥤" },
    { id: "desserts", label: "Desserts", emoji: "🍰" },
  ],
  items: [
    { id: 1, name: "Veg Supreme Pizza", category: "pizza", description: "Loaded with bell peppers, mushrooms, olives, onions and creamy mozzarella", price: 349, rating: 4.8, ratingCount: 248, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: true, prepTime: "20 min" },
    { id: 2, name: "Margherita Pizza", category: "pizza", description: "Classic tomato base, fresh basil leaves and the finest mozzarella cheese", price: 279, rating: 4.6, ratingCount: 186, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: false, prepTime: "18 min" },
    { id: 3, name: "Paneer Burger", category: "burgers", description: "Crispy spiced paneer patty with lettuce, tomato and mint-mayo chutney", price: 199, rating: 4.5, ratingCount: 142, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: true, prepTime: "15 min" },
    { id: 4, name: "Cheese Burger", category: "burgers", description: "Double cheese, caramelised onions, gherkins in a toasted sesame bun", price: 229, rating: 4.7, ratingCount: 203, image: "https://images.unsplash.com/photo-1550317138-10000687a72b?w=400&h=280&fit=crop&auto=format", isVeg: false, isPopular: true, prepTime: "15 min" },
    { id: 5, name: "Caesar Salad", category: "salads", description: "Crisp romaine lettuce, parmesan shavings, croutons with classic Caesar dressing", price: 219, rating: 4.4, ratingCount: 98, image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: false, prepTime: "10 min" },
    { id: 6, name: "Garden Fresh Salad", category: "salads", description: "Seasonal greens, cherry tomatoes, cucumber with honey-lemon vinaigrette", price: 179, rating: 4.3, ratingCount: 74, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: false, prepTime: "8 min" },
    { id: 7, name: "Butter Naan", category: "indian", description: "Soft fluffy naan fresh from the tandoor, brushed with cultured butter and herbs", price: 49, rating: 4.7, ratingCount: 312, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: true, prepTime: "10 min" },
    { id: 8, name: "Garlic Naan", category: "indian", description: "Tandoor-fresh naan topped with roasted garlic, coriander and spiced butter", price: 59, rating: 4.8, ratingCount: 289, image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: false, prepTime: "10 min" },
    { id: 9, name: "Paneer Butter Masala", category: "indian", description: "Silky tomato-cashew gravy with soft cottage cheese cubes, slow-cooked to perfection", price: 299, rating: 4.9, ratingCount: 421, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: true, prepTime: "25 min" },
    { id: 10, name: "Kadai Paneer", category: "indian", description: "Paneer with capsicum in a robust spiced tomato and onion gravy", price: 319, rating: 4.7, ratingCount: 198, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: false, prepTime: "25 min" },
    { id: 11, name: "Veg Biryani", category: "indian", description: "Fragrant basmati rice layered with seasonal veggies, saffron and whole spices", price: 269, rating: 4.6, ratingCount: 267, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: true, prepTime: "30 min" },
    { id: 12, name: "Masala Dosa", category: "indian", description: "Crispy golden dosa filled with spiced potato masala, served with sambar and chutney", price: 149, rating: 4.8, ratingCount: 345, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: true, prepTime: "20 min" },
    { id: 13, name: "Cold Coffee", category: "beverages", description: "Chilled espresso blended with milk, vanilla ice cream and chocolate drizzle", price: 129, rating: 4.7, ratingCount: 187, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: true, prepTime: "8 min" },
    { id: 14, name: "Mango Shake", category: "beverages", description: "Alphonso mango pulp blended with full-fat milk and a hint of cardamom", price: 119, rating: 4.8, ratingCount: 231, image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: false, prepTime: "8 min" },
    { id: 15, name: "Chocolate Brownie", category: "desserts", description: "Warm fudgy brownie with a molten centre, served with a scoop of vanilla ice cream", price: 159, rating: 4.9, ratingCount: 308, image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: true, prepTime: "12 min" },
    { id: 16, name: "Ice Cream Sundae", category: "desserts", description: "Three scoops of premium ice cream topped with hot fudge and crushed praline", price: 189, rating: 4.7, ratingCount: 175, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=280&fit=crop&auto=format", isVeg: true, isPopular: false, prepTime: "10 min" },
  ],
};

// ─── Shared CSS ──────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .app-root { background: #0F172A; color: #FFF; min-height: 100vh; font-family: 'Inter', sans-serif; }
  .font-display { font-family: 'Fraunces', serif; color: #FFFFFF; }
  .font-tag { font-family: 'JetBrains Mono', monospace; }
  .text-gold { color: #F59E0B; }
  .text-muted { color: #94A3B8; }

  /* PAGE 1 */
  .p1-blob { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; }
  .p1-blob-1 { width:320px; height:320px; background:rgba(245,158,11,0.18); top:-120px; left:-80px; }
  .p1-blob-2 { width:280px; height:280px; background:rgba(245,158,11,0.10); bottom:10%; right:-100px; }
  @keyframes df-float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(1deg)} }
  @keyframes df-rise  { 0%{transform:translateY(6px) scaleY(0.85);opacity:.25} 50%{transform:translateY(-6px) scaleY(1.05);opacity:.6} 100%{transform:translateY(6px) scaleY(0.85);opacity:.25} }
  @keyframes df-fade-up { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes df-glow    { 0%,100%{box-shadow:0 0 0 1px rgba(245,158,11,.5),0 8px 30px rgba(245,158,11,.35)} 50%{box-shadow:0 0 0 1px rgba(245,158,11,.8),0 8px 40px rgba(245,158,11,.55)} }
  .df-float  { animation: df-float 6s ease-in-out infinite; }
  .df-steam1 { animation: df-rise 3.2s ease-in-out infinite; }
  .df-steam2 { animation: df-rise 3.6s ease-in-out infinite 0.4s; }
  .df-steam3 { animation: df-rise 2.8s ease-in-out infinite 0.8s; }
  .df-fade-up{ animation: df-fade-up .7s ease-out both; }
  .df-glow   { animation: df-glow 2.6s ease-in-out infinite; }
  .glass-card { background:rgba(30,41,59,.6); backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,.08); }
  .table-card { position:relative; background:#1E293B; border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:16px 6px 14px; display:flex; flex-direction:column; align-items:center; gap:4px; transition:transform .2s,border-color .2s,background .2s; cursor:pointer; }
  .table-card:hover { transform:translateY(-3px); border-color:rgba(245,158,11,.45); }
  .table-card.selected { border-color:#F59E0B; background:linear-gradient(180deg,rgba(245,158,11,.14),#1E293B 65%); }
  .table-pin { width:8px; height:8px; border-radius:50%; background:#0F172A; border:1px solid rgba(255,255,255,.2); margin-bottom:6px; transition:background .2s,border-color .2s,box-shadow .2s; }
  .table-card.selected .table-pin { background:#F59E0B; border-color:#F59E0B; box-shadow:0 0 10px rgba(245,158,11,.8); }
  .table-label { font-size:9px; letter-spacing:.15em; color:#94A3B8; font-weight:600; }
  .table-number { font-size:20px; font-weight:700; color:#FFF; transition:color .2s; }
  .table-card.selected .table-number { color:#F59E0B; }
  .table-check { position:absolute; top:-7px; right:-7px; width:18px; height:18px; border-radius:50%; background:#F59E0B; display:flex; align-items:center; justify-content:center; box-shadow:0 0 0 3px #0F172A; }
  .continue-btn { width:100%; padding:16px; border-radius:14px; font-weight:600; font-size:16px; display:flex; align-items:center; justify-content:center; gap:8px; transition:transform .2s,box-shadow .2s,opacity .2s; border:none; cursor:pointer; }
  .continue-btn:disabled { background:rgba(255,255,255,.06); color:#64748B; cursor:not-allowed; }
  .continue-btn:not(:disabled) { color:#0F172A; }
  .continue-btn:not(:disabled):hover { transform:translateY(-1px); }
  .feature-card { background:#1E293B; border:1px solid rgba(255,255,255,.06); border-radius:16px; transition:border-color .2s,transform .2s; }
  .feature-card:hover { border-color:rgba(245,158,11,.3); transform:translateY(-2px); }
  .gold-gradient { background:linear-gradient(135deg,#FBBF24 0%,#F59E0B 55%,#D97706 100%); }

  /* PAGE 2 */
  .dm-blob { position:fixed; border-radius:50%; filter:blur(80px); pointer-events:none; z-index:0; }
  .dm-blob-1 { width:360px; height:360px; background:rgba(245,158,11,.14); top:-100px; right:-100px; }
  .dm-blob-2 { width:300px; height:300px; background:rgba(245,158,11,.07); bottom:80px; left:-100px; }
  .dm-header { position:sticky; top:0; z-index:100; background:rgba(15,23,42,.88); backdrop-filter:blur(22px); border-bottom:1px solid rgba(255,255,255,.06); padding:11px 16px; display:flex; align-items:center; gap:10px; }
  .dm-back-btn { width:36px; height:36px; border-radius:10px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08); display:flex; align-items:center; justify-content:center; cursor:pointer; color:#94A3B8; flex-shrink:0; transition:background .2s,color .2s; }
  .dm-back-btn:hover { background:rgba(255,255,255,.1); color:#FFF; }
  .dm-header-logo { width:36px; height:36px; border-radius:10px; background:rgba(245,158,11,.1); border:1.5px solid rgba(245,158,11,.5); display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:600; color:#F59E0B; flex-shrink:0; font-family:'Fraunces',serif; }
  .dm-header-info { flex:1; min-width:0; }
  .dm-header-name { font-family:'Fraunces',serif; font-size:14px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .dm-table-badge { display:inline-flex; align-items:center; gap:4px; background:rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.35); color:#F59E0B; font-family:'JetBrains Mono',monospace; font-size:9px; font-weight:700; padding:2px 8px; border-radius:20px; letter-spacing:.06em; margin-top:2px; }
  .dm-cart-btn { position:relative; width:40px; height:40px; border-radius:12px; background:rgba(245,158,11,.1); border:1px solid rgba(245,158,11,.3); display:flex; align-items:center; justify-content:center; cursor:pointer; color:#F59E0B; flex-shrink:0; transition:background .2s,transform .2s; }
  .dm-cart-btn:hover { background:rgba(245,158,11,.2); transform:scale(1.05); }
  @keyframes dm-badge-pop { 0%{transform:scale(0)} 70%{transform:scale(1.3)} 100%{transform:scale(1)} }
  .dm-cart-badge { position:absolute; top:-5px; right:-5px; width:18px; height:18px; background:#F59E0B; color:#0F172A; font-size:10px; font-weight:700; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 0 0 2px #0F172A; animation:dm-badge-pop .3s cubic-bezier(.34,1.56,.64,1); }
  .dm-hero { padding:22px 16px 0; position:relative; z-index:1; }
  .dm-hero-tag { display:inline-flex; align-items:center; gap:6px; background:rgba(245,158,11,.1); border:1px solid rgba(245,158,11,.25); color:#F59E0B; font-size:10px; font-weight:600; font-family:'JetBrains Mono',monospace; letter-spacing:.1em; padding:5px 12px; border-radius:20px; margin-bottom:10px; }
  .dm-hero h1 { font-family:'Fraunces',serif; font-size:26px; font-weight:600; line-height:1.2; margin-bottom:6px; }
  .dm-search-wrap { position:relative; margin:18px 16px 0; z-index:1; }
  .dm-search-input { width:100%; background:rgba(30,41,59,.7); border:1px solid rgba(255,255,255,.08); border-radius:14px; padding:12px 40px 12px 42px; color:#FFF; font-family:'Inter',sans-serif; font-size:13px; outline:none; transition:border-color .2s,box-shadow .2s; }
  .dm-search-input::placeholder { color:#475569; }
  .dm-search-input:focus { border-color:rgba(245,158,11,.5); box-shadow:0 0 0 3px rgba(245,158,11,.08); }
  .dm-search-icon { position:absolute; left:14px; top:50%; transform:translateY(-50%); color:#475569; pointer-events:none; }
  .dm-search-clear { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:rgba(255,255,255,.08); border:none; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#94A3B8; transition:background .15s; }
  .dm-search-clear:hover { background:rgba(255,255,255,.15); }
  .dm-cats { display:flex; gap:8px; padding:4px 16px 8px; overflow-x:auto; scrollbar-width:none; margin-top:18px; }
  .dm-cats::-webkit-scrollbar { display:none; }
  .dm-cat-chip { display:inline-flex; align-items:center; gap:5px; padding:8px 14px; border-radius:22px; font-size:12px; font-weight:600; white-space:nowrap; flex-shrink:0; cursor:pointer; border:1px solid rgba(255,255,255,.07); background:rgba(30,41,59,.55); color:#94A3B8; transition:all .22s; }
  .dm-cat-chip:hover { border-color:rgba(245,158,11,.4); color:#F59E0B; }
  .dm-cat-chip.active { background:rgba(245,158,11,.14); border-color:#F59E0B; color:#F59E0B; box-shadow:0 0 18px rgba(245,158,11,.28); }
  .dm-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; padding:0 16px; position:relative; z-index:1; }
  .dm-menu-card { background:#1E293B; border:1px solid rgba(255,255,255,.06); border-radius:16px; overflow:hidden; transition:transform .25s,border-color .25s,box-shadow .25s; }
  .dm-menu-card:hover { transform:translateY(-3px); border-color:rgba(245,158,11,.28); box-shadow:0 10px 30px rgba(0,0,0,.35); }
  .dm-add-btn { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,#FBBF24 0%,#F59E0B 55%,#D97706 100%); border:none; color:#0F172A; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; transition:transform .2s,box-shadow .2s; }
  .dm-add-btn:hover { transform:scale(1.12); box-shadow:0 4px 18px rgba(245,158,11,.55); }
  @keyframes dm-pop { 0%{transform:scale(1)} 45%{transform:scale(1.4)} 100%{transform:scale(1)} }
  .dm-add-pop { animation:dm-pop .35s cubic-bezier(.4,0,.2,1); }
  .dm-qty-ctrl { display:flex; align-items:center; background:rgba(245,158,11,.1); border:1px solid rgba(245,158,11,.35); border-radius:22px; overflow:hidden; height:30px; }
  .dm-qty-btn { width:28px; height:30px; background:transparent; border:none; color:#F59E0B; display:flex; align-items:center; justify-content:center; cursor:pointer; flex-shrink:0; transition:background .15s; }
  .dm-qty-btn:hover { background:rgba(245,158,11,.18); }
  .dm-qty-num { font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700; color:#F59E0B; min-width:20px; text-align:center; }
  @keyframes dm-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  .dm-skeleton { background:linear-gradient(90deg,rgba(30,41,59,1) 25%,rgba(45,63,85,.9) 50%,rgba(30,41,59,1) 75%); background-size:200% 100%; animation:dm-shimmer 1.8s ease-in-out infinite; }
  @keyframes dm-toast-in { from{opacity:0;transform:translateY(-10px) scale(.94)} to{opacity:1;transform:translateY(0) scale(1)} }
  .dm-toast { background:rgba(15,23,42,.96); backdrop-filter:blur(14px); border:1px solid rgba(245,158,11,.4); border-radius:12px; padding:11px 16px; display:flex; align-items:center; gap:10px; box-shadow:0 8px 28px rgba(0,0,0,.5); animation:dm-toast-in .35s cubic-bezier(.34,1.56,.64,1) both; }
  @keyframes dm-cart-up { from{opacity:0;transform:translateX(-50%) translateY(24px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
  @keyframes dm-glow-cart { 0%,100%{box-shadow:0 8px 32px rgba(245,158,11,.5)} 50%{box-shadow:0 8px 44px rgba(245,158,11,.75)} }
  .dm-cart-bar { position:fixed; bottom:20px; left:50%; transform:translateX(-50%); width:calc(100% - 32px); max-width:440px; z-index:200; background:linear-gradient(135deg,#FBBF24 0%,#F59E0B 55%,#D97706 100%); border-radius:18px; padding:13px 16px; display:flex; align-items:center; justify-content:space-between; gap:12px; cursor:pointer; animation:dm-cart-up .45s cubic-bezier(.34,1.56,.64,1) both, dm-glow-cart 2.8s ease-in-out infinite; }
  .dm-cart-bar:hover { transform:translateX(-50%) translateY(-2px); }
  .dm-cart-items { font-size:11px; font-weight:600; color:rgba(15,23,42,.7); }
  .dm-cart-total { font-family:'JetBrains Mono',monospace; font-size:16px; font-weight:700; color:#0F172A; }
  .dm-cart-cta { display:flex; align-items:center; gap:6px; font-size:13px; font-weight:700; color:#0F172A; background:rgba(15,23,42,.12); padding:8px 14px; border-radius:12px; flex-shrink:0; }
  .dm-divider { height:1px; background:linear-gradient(to right,transparent,rgba(255,255,255,.06),transparent); margin:20px 16px 0; }
  .dm-empty { grid-column:1/-1; text-align:center; padding:52px 16px; }
  @keyframes dm-fade-up { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

  /* PAGE 3 CART */
  .cart-item-row { display:flex; align-items:center; gap:12px; padding:12px 0; border-bottom:1px solid rgba(255,255,255,.06); }
  .cart-img { width:56px; height:56px; border-radius:10px; object-fit:cover; flex-shrink:0; }
  .cart-img-fallback { width:56px; height:56px; border-radius:10px; background:#1E293B; display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0; }
  .cart-qty-ctrl { display:flex; align-items:center; gap:6px; }
  .cart-qty-btn { width:26px; height:26px; border-radius:50%; background:rgba(245,158,11,.12); border:1px solid rgba(245,158,11,.3); color:#F59E0B; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .15s; }
  .cart-qty-btn:hover { background:rgba(245,158,11,.25); }
  .place-order-btn { width:100%; padding:16px; border-radius:14px; font-weight:700; font-size:16px; display:flex; align-items:center; justify-content:center; gap:8px; border:none; cursor:pointer; color:#0F172A; transition:transform .2s,box-shadow .2s; }
  .place-order-btn:hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(245,158,11,.5); }

  @media (prefers-reduced-motion: reduce) {
    .df-float,.df-steam1,.df-steam2,.df-steam3,.df-fade-up,.df-glow,
    .dm-skeleton,.dm-toast,.dm-cart-bar,.dm-add-pop,.dm-cart-badge { animation:none !important; }
  }
`;

// ─── Toast Hook ───────────────────────────────────────────────────────────────
let _toastId = 0;
function useToast() {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((message, emoji = "✅") => {
    const id = ++_toastId;
    setToasts(prev => [...prev, { id, message, emoji }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2600);
  }, []);
  return { toasts, push };
}

function Toaster({ toasts }) {
  return (
    <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 9999, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none", width: "min(340px,90vw)" }}>
      {toasts.map(t => (
        <div key={t.id} className="dm-toast">
          <span style={{ fontSize: 15 }}>{t.emoji}</span>
          <span style={{ fontSize: 13, fontWeight: 500, color: "#FFF", fontFamily: "'Inter',sans-serif" }}>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{ background: "#1E293B", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="dm-skeleton" style={{ width: "100%", height: 140 }} />
      <div style={{ padding: "10px 10px 14px" }}>
        <div className="dm-skeleton" style={{ width: "72%", height: 13, borderRadius: 6, marginBottom: 8 }} />
        <div className="dm-skeleton" style={{ width: "90%", height: 9, borderRadius: 6, marginBottom: 5 }} />
        <div className="dm-skeleton" style={{ width: "60%", height: 9, borderRadius: 6, marginBottom: 14 }} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="dm-skeleton" style={{ width: 56, height: 18, borderRadius: 6 }} />
          <div className="dm-skeleton" style={{ width: 32, height: 32, borderRadius: "50%" }} />
        </div>
      </div>
    </div>
  );
}

// ─── Menu Card ────────────────────────────────────────────────────────────────
const catEmoji = { pizza: "🍕", burgers: "🍔", salads: "🥗", indian: "🍛", beverages: "🥤", desserts: "🍰" };

function MenuCard({ item, quantity, onAdd, onIncrement, onDecrement }) {
  const [imgErr, setImgErr] = useState(false);
  const [pop, setPop] = useState(false);

  const handleAdd = () => {
    setPop(true);
    onAdd(item);
    setTimeout(() => setPop(false), 350);
  };

  return (
    <div className="dm-menu-card">
      <div style={{ position: "relative", height: 140, overflow: "hidden", borderRadius: "15px 15px 0 0" }}>
        {imgErr ? (
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#1E293B,#0F172A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>
            {catEmoji[item.category] || "🍽️"}
          </div>
        ) : (
          <img src={item.image} alt={item.name} onError={() => setImgErr(true)} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .45s ease" }} />
        )}
        <div style={{ position: "absolute", top: 8, left: 8, width: 18, height: 18, borderRadius: 3, border: `2px solid ${item.isVeg ? "#22C55E" : "#EF4444"}`, background: "rgba(15,23,42,.85)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.isVeg ? "#22C55E" : "#EF4444" }} />
        </div>
        {item.isPopular && (
          <div style={{ position: "absolute", top: 8, right: 8, background: "#F59E0B", color: "#0F172A", fontSize: 8, fontWeight: 800, padding: "3px 7px", borderRadius: 20, fontFamily: "'Inter',sans-serif", letterSpacing: ".06em" }}>★ POPULAR</div>
        )}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top,rgba(15,23,42,.9),transparent)", padding: "20px 8px 5px", fontSize: 9, color: "rgba(255,255,255,.65)", fontFamily: "'Inter',sans-serif" }}>
          {item.prepTime}
        </div>
      </div>
      <div style={{ padding: "10px 10px 12px" }}>
        <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 13, fontWeight: 600, color: "#FFF", lineHeight: 1.35, marginBottom: 5 }}>{item.name}</h3>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "#94A3B8", lineHeight: 1.55, marginBottom: 8, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{item.description}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
          <Star size={10} fill="#F59E0B" color="#F59E0B" />
          <span style={{ fontSize: 11, color: "#F59E0B", fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>{item.rating}</span>
          <span style={{ fontSize: 10, color: "#475569", fontFamily: "'Inter',sans-serif" }}>({item.ratingCount})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 15, fontWeight: 700, color: "#F59E0B" }}>₹{item.price}</span>
          {quantity === 0 ? (
            <button type="button" onClick={handleAdd} className={`dm-add-btn${pop ? " dm-add-pop" : ""}`} aria-label={`Add ${item.name}`}>
              <Plus size={14} strokeWidth={2.5} />
            </button>
          ) : (
            <div className="dm-qty-ctrl" role="group">
              <button type="button" className="dm-qty-btn" onClick={() => onDecrement(item.id)}><Minus size={10} strokeWidth={2.5} /></button>
              <span className="dm-qty-num">{quantity}</span>
              <button type="button" className="dm-qty-btn" onClick={() => onIncrement(item.id)}><Plus size={10} strokeWidth={2.5} /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 1: Landing ──────────────────────────────────────────────────────────
const TABLES = Array.from({ length: 12 }, (_, i) => i + 1);
const FEATURES = [
  { icon: UtensilsCrossed, title: "Digital Menu", desc: "Browse every dish, photo and price the moment you sit down." },
  { icon: Zap, title: "Fast Ordering", desc: "Build your order and send it to the kitchen in seconds." },
  { icon: CreditCard, title: "Secure Payment", desc: "Pay straight from your phone — no card, no waiting." },
];

function DineFlowLanding({ onContinue }) {
  const [selectedTable, setSelectedTable] = useState(null);

  return (
    <div style={{ position: "relative", maxWidth: 480, margin: "0 auto", padding: "40px 20px 32px", overflow: "hidden" }}>
      <div className="p1-blob p1-blob-1" />
      <div className="p1-blob p1-blob-2" />

      {/* Hero */}
      <header className="df-fade-up" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, border: "1.5px solid #F59E0B", background: "rgba(245,158,11,.08)" }}>
          <span className="font-display text-gold" style={{ fontSize: 18, fontWeight: 600 }}>FH</span>
        </div>
        <h1 className="font-display" style={{ fontSize: 30, fontWeight: 600, color: "#FFFFFF" }}>The Food Hub</h1>
        <p className="text-muted" style={{ fontSize: 14, marginTop: 8, maxWidth: 260, color: "#94A3B8" }}>Order food directly from your table</p>

        <div className="df-float" style={{ marginTop: 28, marginBottom: 8 }}>
          <svg width="200" height="140" viewBox="0 0 200 140" fill="none">
            <ellipse cx="100" cy="108" rx="62" ry="11" fill="#F59E0B" opacity=".08" />
            <ellipse cx="100" cy="100" rx="54" ry="13" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
            <ellipse cx="100" cy="98" rx="40" ry="9" fill="#0F172A" stroke="#F59E0B" strokeOpacity=".4" />
            <path d="M70 38v22M70 38c0 8-4 8-4 16M70 38c0 8 4 8 4 16" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            <path d="M132 38v34M132 50q10 0 10-12" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            <path className="df-steam1" d="M92 70q4-10 0-18q-4-8 0-16" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity=".6" />
            <path className="df-steam2" d="M100 70q-4-10 0-18q4-8 0-16" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity=".6" />
            <path className="df-steam3" d="M108 70q4-10 0-18q-4-8 0-16" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity=".6" />
          </svg>
        </div>
      </header>

      {/* Table Selection */}
      <section className="glass-card df-fade-up" style={{ borderRadius: 24, padding: 24, marginTop: 32, animationDelay: ".1s" }}>
        <h2 className="font-display" style={{ fontSize: 20, fontWeight: 600, textAlign: "center" }}>Select Your Table</h2>
        <p className="text-muted" style={{ fontSize: 12, textAlign: "center", marginTop: 6, marginBottom: 24 }}>Choose your table number to continue</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }} role="group" aria-label="Table selection">
          {TABLES.map(n => {
            const sel = selectedTable === n;
            return (
              <button key={n} type="button" aria-pressed={sel} onClick={() => setSelectedTable(n)} className={`table-card${sel ? " selected" : ""}`}>
                {sel && <span className="table-check"><Check size={11} color="#0F172A" strokeWidth={3} /></span>}
                <span className="table-pin" />
                <span className="table-label">TABLE</span>
                <span className="table-number font-tag">{n}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          disabled={!selectedTable}
          onClick={() => selectedTable && onContinue(selectedTable)}
          className={`continue-btn${selectedTable ? " gold-gradient df-glow" : ""}`}
          style={{ marginTop: 28 }}
        >
          Continue to Menu <ArrowRight size={18} />
        </button>
      </section>

      {/* Features */}
      <section className="df-fade-up" style={{ marginTop: 40, animationDelay: ".2s" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="feature-card" style={{ padding: 16, display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.3)" }}>
                <Icon size={18} className="text-gold" />
              </div>
              <div>
                <h3 className="font-display" style={{ fontSize: 14, fontWeight: 600 }}>{title}</h3>
                <p className="text-muted" style={{ fontSize: 12, marginTop: 2, lineHeight: 1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="df-fade-up" style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.08)", textAlign: "center", animationDelay: ".3s" }}>
        <p className="font-display" style={{ fontSize: 14, fontWeight: 600 }}>The Food Hub</p>
        <p className="text-muted" style={{ fontSize: 12, marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><MapPin size={12} /> 42 MG Road, Connaught Place, Delhi</p>
        <p className="text-muted" style={{ fontSize: 12, marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Phone size={12} /> +91 98765 43210</p>
        <p className="text-muted" style={{ fontSize: 11, marginTop: 16, opacity: .7 }}>© 2026 The Food Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ─── PAGE 2: Menu ─────────────────────────────────────────────────────────────
function DineFlowMenu({ tableNumber, onViewCart, onBack }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { toasts, push: pushToast } = useToast();
  const searchRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1300);
    return () => clearTimeout(t);
  }, []);

  const cartCount = useMemo(() => Object.values(cart).reduce((s, q) => s + q, 0), [cart]);
  const cartTotal = useMemo(() => Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = menuData.items.find(i => i.id === Number(id));
    return sum + (item ? item.price * qty : 0);
  }, 0), [cart]);

  const filteredItems = useMemo(() => {
    let items = menuData.items;
    if (activeCategory !== "all") items = items.filter(i => i.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q));
    }
    return items;
  }, [activeCategory, searchQuery]);

  const addToCart = useCallback((item) => { setCart(p => ({ ...p, [item.id]: (p[item.id] || 0) + 1 })); pushToast(`${item.name} added to cart`, "🛒"); }, [pushToast]);
  const incrementCart = useCallback((id) => { setCart(p => ({ ...p, [id]: (p[id] || 0) + 1 })); }, []);
  const decrementCart = useCallback((id) => { setCart(p => { const n = { ...p }; if (!n[id] || n[id] <= 1) delete n[id]; else n[id]--; return n; }); }, []);

  const handleViewCart = () => {
    const cartItems = Object.entries(cart).map(([id, quantity]) => {
      const item = menuData.items.find(i => i.id === Number(id));
      return { ...item, quantity };
    });
    onViewCart && onViewCart(cartItems, tableNumber);
  };

  const handleCategoryChange = (id) => { setActiveCategory(id); setSearchQuery(""); };

  return (
    <div style={{ position: "relative", paddingBottom: 100 }}>
      <Toaster toasts={toasts} />
      <div className="dm-blob dm-blob-1" />
      <div className="dm-blob dm-blob-2" />

      {/* Header */}
      <header className="dm-header">
        <button type="button" className="dm-back-btn" onClick={onBack} aria-label="Go back"><ChevronLeft size={18} /></button>
        <div className="dm-header-logo">FH</div>
        <div className="dm-header-info">
          <div className="dm-header-name">{menuData.restaurant.name}</div>
          <div className="dm-table-badge">📍 TABLE {tableNumber}</div>
        </div>
        <button type="button" className="dm-cart-btn" onClick={handleViewCart} aria-label={`Cart ${cartCount} items`}>
          <ShoppingCart size={18} />
          {cartCount > 0 && <span className="dm-cart-badge" key={cartCount}>{cartCount}</span>}
        </button>
      </header>

      {/* Hero */}
      <section className="dm-hero" style={{ animation: "dm-fade-up .6s ease-out both" }}>
        <div className="dm-hero-tag">⚡ LIVE MENU</div>
        <h1 style={{ color: "#F8FAFC" }}>Explore Our Menu</h1>
        <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.5 }}>Freshly prepared dishes crafted with quality ingredients.</p>
      </section>
      <div className="dm-divider" />

      {/* Search */}
      <div className="dm-search-wrap" style={{ animation: "dm-fade-up .6s ease-out .08s both" }}>
        <span className="dm-search-icon"><Search size={16} /></span>
        <input ref={searchRef} type="search" className="dm-search-input" placeholder="Search food items..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} aria-label="Search menu items" />
        {searchQuery && (
          <button type="button" className="dm-search-clear" onClick={() => { setSearchQuery(""); searchRef.current?.focus(); }} aria-label="Clear search">
            <X size={11} />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="dm-cats" role="group" aria-label="Menu categories" style={{ animation: "dm-fade-up .6s ease-out .14s both" }}>
        {menuData.categories.map(cat => (
          <button key={cat.id} type="button" className={`dm-cat-chip${activeCategory === cat.id ? " active" : ""}`} onClick={() => handleCategoryChange(cat.id)} aria-pressed={activeCategory === cat.id}>
            <span>{cat.emoji}</span>{cat.label}
          </button>
        ))}
      </div>

      {/* Section header */}
      <div style={{ padding: "20px 16px 12px", display: "flex", alignItems: "baseline", gap: 8, position: "relative", zIndex: 1 }}>
        <span className="font-display" style={{ fontSize: 18, fontWeight: 600 }}>
          {activeCategory === "all" ? "All Items" : menuData.categories.find(c => c.id === activeCategory)?.label}
        </span>
        {!isLoading && <span style={{ fontSize: 12, color: "#475569" }}>{filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""}</span>}
      </div>

      {/* Grid */}
      <main className="dm-grid" style={{ animation: "dm-fade-up .6s ease-out .22s both" }} aria-label="Menu items">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : filteredItems.length === 0
            ? (
              <div className="dm-empty">
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                <div className="font-display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Nothing found</div>
                <p style={{ fontSize: 13, color: "#475569" }}>Try a different search term or category.</p>
              </div>
            )
            : filteredItems.map(item => (
              <MenuCard key={item.id} item={item} quantity={cart[item.id] || 0} onAdd={addToCart} onIncrement={incrementCart} onDecrement={decrementCart} />
            ))
        }
      </main>

      {/* Floating cart bar */}
      {cartCount > 0 && (
        <div className="dm-cart-bar" onClick={handleViewCart} role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && handleViewCart()}>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <span className="dm-cart-items">{cartCount} item{cartCount !== 1 ? "s" : ""} added</span>
            <span className="dm-cart-total">₹{cartTotal}</span>
          </div>
          <div className="dm-cart-cta">View Cart <ArrowRight size={15} /></div>
        </div>
      )}
    </div>
  );
}

// ─── PAGE 3: Cart ─────────────────────────────────────────────────────────────
function DineFlowCart({ cartItems, tableNumber, onBack, onOrderPlaced }) {
  const [items, setItems] = useState(cartItems);
  const [ordered, setOrdered] = useState(false);
  const { toasts, push: pushToast } = useToast();

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const increment = (id) => setItems(p => p.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  const decrement = (id) => {
    setItems(p => {
      const next = p.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i).filter(i => i.quantity > 0);
      return next;
    });
  };
  const remove = (id) => { setItems(p => p.filter(i => i.id !== id)); pushToast("Item removed", "🗑️"); };

  const handleOrder = () => {
    setOrdered(true);
    pushToast("Order placed successfully! 🎉", "🍽️");
    setTimeout(() => onOrderPlaced && onOrderPlaced(), 2500);
  };

  if (ordered) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", padding: 32, textAlign: "center" }}>
        <Toaster toasts={toasts} />
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(34,197,94,.12)", border: "2px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, marginBottom: 24 }}>✅</div>
        <h2 className="font-display" style={{ fontSize: 26, fontWeight: 600, marginBottom: 8 }}>Order Placed!</h2>
        <p className="text-muted" style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 4 }}>Your order for Table <strong style={{ color: "#F59E0B" }}>{tableNumber}</strong> has been sent to the kitchen.</p>
        <p className="text-muted" style={{ fontSize: 13 }}>Estimated time: 20–30 minutes</p>
        <div style={{ marginTop: 32, padding: "12px 24px", borderRadius: 12, background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.3)" }}>
          <span style={{ fontSize: 13, color: "#F59E0B", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>Total Paid: ₹{total}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", paddingBottom: 100 }}>
      <Toaster toasts={toasts} />
      <div className="dm-blob dm-blob-1" />
      <div className="dm-blob dm-blob-2" />

      {/* Header */}
      <header className="dm-header">
        <button type="button" className="dm-back-btn" onClick={onBack} aria-label="Go back"><ChevronLeft size={18} /></button>
        <div className="dm-header-logo">FH</div>
        <div className="dm-header-info">
          <div className="dm-header-name">Your Cart</div>
          <div className="dm-table-badge">📍 TABLE {tableNumber}</div>
        </div>
        <div style={{ width: 40 }} />
      </header>

      <div style={{ padding: "20px 16px", position: "relative", zIndex: 1 }}>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Review Order</h2>
        <p className="text-muted" style={{ fontSize: 13 }}>{count} item{count !== 1 ? "s" : ""} · Table {tableNumber}</p>

        {items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "52px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
            <div className="font-display" style={{ fontSize: 18, fontWeight: 600, marginBottom: 6 }}>Cart is empty</div>
            <button type="button" onClick={onBack} style={{ marginTop: 16, padding: "10px 24px", borderRadius: 12, background: "rgba(245,158,11,.12)", border: "1px solid rgba(245,158,11,.35)", color: "#F59E0B", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Browse Menu</button>
          </div>
        ) : (
          <>
            <div style={{ marginTop: 20 }}>
              {items.map(item => (
                <div key={item.id} className="cart-item-row">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="cart-img" onError={e => e.target.style.display = "none"} />
                  ) : (
                    <div className="cart-img-fallback">{catEmoji[item.category] || "🍽️"}</div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="font-display" style={{ fontSize: 13, fontWeight: 600, color: "#FFF", marginBottom: 2 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#F59E0B", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>₹{item.price}</div>
                  </div>
                  <div className="cart-qty-ctrl">
                    <button type="button" className="cart-qty-btn" onClick={() => decrement(item.id)}><Minus size={10} strokeWidth={2.5} /></button>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: "#F59E0B", minWidth: 20, textAlign: "center" }}>{item.quantity}</span>
                    <button type="button" className="cart-qty-btn" onClick={() => increment(item.id)}><Plus size={10} strokeWidth={2.5} /></button>
                  </div>
                  <button type="button" onClick={() => remove(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", marginLeft: 4, padding: 4 }}><Trash2 size={14} /></button>
                </div>
              ))}
            </div>

            {/* Bill summary */}
            <div style={{ marginTop: 24, background: "#1E293B", borderRadius: 16, padding: 16, border: "1px solid rgba(255,255,255,.06)" }}>
              <div className="font-display" style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Bill Summary</div>
              {items.map(item => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "#94A3B8" }}>{item.name} × {item.quantity}</span>
                  <span style={{ fontSize: 13, color: "#FFF" }}>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div style={{ height: 1, background: "rgba(255,255,255,.06)", margin: "12px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "#94A3B8" }}>Subtotal</span>
                <span style={{ fontSize: 13, color: "#FFF" }}>₹{total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: "#94A3B8" }}>GST (5%)</span>
                <span style={{ fontSize: 13, color: "#FFF" }}>₹{Math.round(total * 0.05)}</span>
              </div>
              <div style={{ height: 1, background: "rgba(255,255,255,.06)", margin: "12px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span className="font-display" style={{ fontSize: 15, fontWeight: 600 }}>Total</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, color: "#F59E0B" }}>₹{Math.round(total * 1.05)}</span>
              </div>
            </div>

            <button type="button" onClick={handleOrder} className="place-order-btn gold-gradient" style={{ marginTop: 20 }}>
              Place Order · ₹{Math.round(total * 1.05)} <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function DineFlowApp() {
  const [page, setPage] = useState("landing");
  const [tableNumber, setTableNumber] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const handleContinue = (table) => { setTableNumber(table); setPage("menu"); };
  const handleViewCart = (items, table) => { setCartItems(items); setTableNumber(table); setPage("cart"); };
  const handleBackToMenu = () => setPage("menu");
  const handleOrderDone = () => { setCartItems([]); setPage("landing"); setTableNumber(null); };

  return (
    <div className="app-root">
      <style>{GLOBAL_CSS}</style>
      {page === "landing" && <DineFlowLanding onContinue={handleContinue} />}
      {page === "menu" && <DineFlowMenu tableNumber={tableNumber} onViewCart={handleViewCart} onBack={() => setPage("landing")} />}
      {page === "cart" && <DineFlowCart cartItems={cartItems} tableNumber={tableNumber} onBack={handleBackToMenu} onOrderPlaced={handleOrderDone} />}
    </div>
  );
}