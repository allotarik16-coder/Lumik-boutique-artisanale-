'use client';

import { useState, useCallback } from 'react';

const P = [
  { id: 1, nom: 'Couteau Santoku Seki', prix: 52, region: 'Seki', wm: '刃', img: 'https://images.unsplash.com/photo-1591382386627-349b692688ff?w=400&auto=format&fit=crop' },
  { id: 2, nom: 'Bol à matcha chawan', prix: 24, region: 'Kyoto', wm: '茶', img: 'https://images.unsplash.com/photo-1571650655445-9b4ad4a52bc7?w=400&auto=format&fit=crop' },
  { id: 3, nom: 'Bol Arita céramique', prix: 18, region: 'Arita', wm: '器', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&auto=format&fit=crop' },
  { id: 4, nom: 'Théière Tetsubin fonte', prix: 48, region: 'Iwate', wm: '鉄', img: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&auto=format&fit=crop' },
  { id: 5, nom: 'Couteau Sakai deba', prix: 58, region: 'Osaka', wm: '刃', img: 'https://images.unsplash.com/photo-1591382386627-349b692688ff?w=400&auto=format&fit=crop' },
  { id: 6, nom: 'Papier washi artisanal', prix: 6, region: 'Kyoto', wm: '紙', img: 'https://images.unsplash.com/photo-1585135497279-25c7c2b5dfe8?w=400&auto=format&fit=crop' },
  { id: 7, nom: 'Bento deux étages', prix: 26, region: 'Tokyo', wm: '弁', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&auto=format&fit=crop' },
  { id: 8, nom: 'Plateau laqué rouge', prix: 32, region: 'Kanazawa', wm: '漆', img: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=400&auto=format&fit=crop' },
  { id: 9, nom: 'Furoshiki tissu noué', prix: 14, region: 'Tokyo', wm: '布', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&auto=format&fit=crop' },
  { id: 10, nom: 'Éventail sensu bambou', prix: 13, region: 'Kyoto', wm: '扇', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&auto=format&fit=crop' }
];

const REGIONS = [
  { n: 'Tout le Japon', f: null, img: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&auto=format&fit=crop', tag: 'Seki · Tokyo · Kyoto', title: 'Le quotidien japonais, direct de l\'atelier.', desc: 'Couteaux, céramique, washi. Choisis un à un, sans intermédiaire.' },
  { n: 'Tokyo', f: 'Tokyo', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop', tag: 'Tokyo · 東京', title: 'L\'énergie de la capitale', desc: 'Moderne et traditionnel, Tokyo ne dort jamais.' },
  { n: 'Kyoto', f: 'Kyoto', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop', tag: 'Kyoto · 京都', title: 'L\'âme traditionnelle du Japon', desc: 'Temples, jardins zen et artisanat d\'exception.' },
  { n: 'Osaka', f: 'Osaka', img: 'https://images.unsplash.com/photo-1557404052-f6c27e11a4b0?w=800&auto=format&fit=crop', tag: 'Osaka · 大阪', title: 'Le cœur culinaire du Japon', desc: 'Rue animée, cuisine de rue et couteaux de légende.' },
  { n: 'Seki', f: 'Seki', img: 'https://images.unsplash.com/photo-1591382386627-349b692688ff?w=800&auto=format&fit=crop', tag: 'Seki · 関', title: 'La capitale de la coutellerie', desc: '700 ans de savoir-faire, des lames forgées à la main.' },
  { n: 'Arita', f: 'Arita', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop', tag: 'Arita · 有', title: 'La porcelaine bleu-blanc', desc: 'Des pièces uniques cuites à Saga, berceau de la porcelaine japonaise.' },
  { n: 'Kanazawa', f: 'Kanazawa', img: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=800&auto=format&fit=crop', tag: 'Kanazawa · 金', title: 'L\'art de la laque', desc: 'Laque urushi, un savoir-faire qui se patine avec le temps.' },
  { n: 'Iwate', f: 'Iwate', img: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&auto=format&fit=crop', tag: 'Iwate · 岩', title: 'La fonte Nambu', desc: 'Des théières en fonte qui gardent la chaleur et vieillissent bien.' }
];

export default function Home() {
  const [filtre, setFiltre] = useState<string | null>(null);
  const [panier, setPanier] = useState<number[]>([]);
  const [currentView, setCurrentView] = useState<'shop' | 'cart' | 'compte'>('shop');
  const [heroData, setHeroData] = useState(REGIONS[0]);

  const items = filtre ? P.filter(p => p.region === filtre) : P;

  const add = useCallback((id: number) => {
    setPanier(prev => [...prev, id]);
  }, []);

  const handleFiltre = useCallback((i: number) => {
    const r = REGIONS[i];
    setFiltre(r.f);
    setHeroData(r);
  }, []);

  const panierCount = panier.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const total = panier.reduce((a, id) => a + (P.find(x => x.id === id)?.prix || 0), 0);

  const goTo = (view: 'shop' | 'cart' | 'compte') => {
    setCurrentView(view);
  };

  return (
    <div className="phone">
      <div className="notch"></div>
      <div className="statusbar"><span>9:41</span><span>📶</span></div>

      {/* SHOP VIEW */}
      <div className={`view ${currentView === 'shop' ? 'active' : ''}`} id="v-shop">
        <div className="app-head">
          <div className="brand"><span className="lamp">灯</span> LUMIK</div>
          <button className="icobtn" onClick={() => goTo('cart')}>
            <span>🛒</span>
            {panier.length > 0 && <span className="badge" style={{ display: 'flex' }}>{panier.length}</span>}
          </button>
        </div>

        <div className="hero" id="hero" style={{ backgroundImage: `url('${heroData.img}')` }}>
          <div className="hero-bg" style={{ backgroundImage: `url('${heroData.img}')` }}></div>
          <div className="hero-overlay"></div>
          <div className="seal">灯</div>
          <div className="hero-content">
            <div className="tag">{heroData.tag}</div>
            <h1>{heroData.title}</h1>
            <p>{heroData.desc}</p>
          </div>
        </div>

        <div className="chips">
          {REGIONS.map((r, i) => (
            <button
              key={i}
              className={`chip ${((filtre === null && r.f === null) || filtre === r.f) ? 'on' : ''}`}
              onClick={() => handleFiltre(i)}
            >
              <span className="cjp">{r.n.charAt(0)}</span>{r.n}
            </button>
          ))}
        </div>

        <div className="sec-title">
          <h2>{heroData.n}</h2>
          <span>{items.length} pièces</span>
        </div>

        <div className="grid">
          {items.map(p => (
            <div
              key={p.id}
              className="card"
              onClick={() => {
                alert(`🪭 ${p.nom}\n💰 ${p.prix}€\n📍 ${p.region}\n\nAjouté au panier !`);
                add(p.id);
              }}
            >
              <div className="thumb">
                <img src={p.img} alt={p.nom} loading="lazy" />
                <span className="reg">{p.region}</span>
                <span className="wm">{p.wm}</span>
              </div>
              <div className="b">
                <div className="nm">{p.nom}</div>
                <div className="ft">
                  <span className="pr">{p.prix}<i>€</i></span>
                  <button
                    className="addmini"
                    onClick={(e) => {
                      e.stopPropagation();
                      add(p.id);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CART VIEW */}
      <div className={`view ${currentView === 'cart' ? 'active' : ''}`} id="v-cart">
        <div className="app-head">
          <div className="brand">Panier 籠</div>
          <button className="icobtn" onClick={() => goTo('shop')}>✕</button>
        </div>

        <div id="cartItems">
          {panier.length === 0 ? (
            <div className="cart-empty">
              <span className="e">籠</span>Votre panier est vide.<br />Ajoutez une pièce depuis la boutique.
            </div>
          ) : (
            <>
              {Object.entries(panierCount).map(([id, qty]) => {
                const p = P.find(x => x.id === parseInt(id));
                if (!p) return null;
                return (
                  <div key={id} className="cart-row">
                    <div className="t">{p.wm}</div>
                    <div className="m">
                      <div className="n">{p.nom}</div>
                      <div className="p">{p.prix * qty}€</div>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--muted)' }}>×{qty}</div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {panier.length > 0 && (
          <div className="checkout-bar">
            <div className="tot">
              <span className="l">TOTAL</span>
              <span className="v">{total}€</span>
            </div>
            <button onClick={() => window.open(`https://wa.me/?text=Bonjour! Je souhaite commander: ${panier.length} pièce(s)`)}>
              Commander via WhatsApp
            </button>
          </div>
        )}
      </div>

      {/* COMPTE VIEW */}
      {currentView === 'compte' && (
        <div id="compte" style={{ display: currentView === 'compte' ? 'block' : 'none' }}>
          <div className="compte-content">
            <div className="icon">灯</div>
            <h2>Mon compte</h2>
            <p className="sub">Maquette statique</p>
            <div className="compte-card">
              <div className="row"><span className="label">👤 Nom</span><span className="value">Visiteur</span></div>
              <div className="row"><span className="label">✉️ Email</span><span className="value">non renseigné</span></div>
              <div className="row"><span className="label">🏷️ Statut</span><span className="value gold">Invité</span></div>
            </div>
            <button className="btn-retour" onClick={() => goTo('shop')}>← Retour</button>
          </div>
        </div>
      )}

      {/* TAB BAR */}
      <div className="tabbar">
        <button className={`tab ${currentView === 'shop' ? 'on' : ''}`} onClick={() => goTo('shop')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 10l8-6 8 6v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z"/></svg>Accueil
        </button>
        <button className={`tab ${currentView === 'shop' ? 'on' : ''}`} onClick={() => goTo('shop')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>Boutique
        </button>
        <button className={`tab ${currentView === 'cart' ? 'on' : ''}`} onClick={() => goTo('cart')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6h15l-1.5 9h-12z"/><path d="M6 6L5 2H2"/><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/></svg>Panier
        </button>
        <button className={`tab ${currentView === 'compte' ? 'on' : ''}`} onClick={() => goTo('compte')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>Compte
        </button>
      </div>
      <div className="home-ind"></div>
    </div>
  );
}
