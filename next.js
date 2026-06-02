import React, { useState, useEffect, useRef } from 'react';

export default function App() {
    // CDN Fallback Images (Pengganti dari folder Assets/ lokal Anda agar bisa dirender di Preview)
    const LOGO_URL = "https://images.unsplash.com/photo-1555507036-ab1e4006a2a0?auto=format&fit=crop&w=150&h=150&q=80";
    const HALAL_URL = "https://img.icons8.com/ios/50/e0bb66/halal-sign.png";
    const GAMBAR_1 = "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&h=300&q=80";
    const GAMBAR_2 = "https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=400&h=300&q=80";
    const GAMBAR_3 = "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=400&h=300&q=80";
    const GAMBAR_4 = "https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?auto=format&fit=crop&w=400&h=300&q=80";
    const GAMBAR_5 = "https://images.unsplash.com/photo-1597079910443-60c43fc4f729?auto=format&fit=crop&w=400&h=300&q=80";
    const VID_POSTER = "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=1200&h=400&q=80";

    const [currentView, setCurrentView] = useState('home-view');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [productDetail, setProductDetail] = useState({ name: '', price: 0, img: '' });
    const [showAllStores, setShowAllStores] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedStoreId, setHighlightedStoreId] = useState(null);

    const [showGlobalSearch, setShowGlobalSearch] = useState(false);
    const [globalSearchInput, setGlobalSearchInput] = useState('');
    const [showProfileModal, setShowProfileModal] = useState(false);

    const [showPaymentGate, setShowPaymentGate] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState(null);

    const [cartItems, setCartItems] = useState([
        { id: 'default-1', name: "4pc Cronut Gift Box", price: 55000, img: GAMBAR_1, qty: 1, type: 'regular' }
    ]);

    // STATE ORDER TRACKING
    const [activeOrders, setActiveOrders] = useState([
        {
            id: 'ORD-8921A',
            date: '1 Juni 2026',
            total: 96800,
            items: [
                { name: 'Matcha Pound Cake', qty: 1 },
                { name: 'Signature Brownies', qty: 2 }
            ],
            status: 2 // Status: 1 (Dikonfirmasi), 2 (Diproses), 3 (Dikirim), 4 (Selesai)
        }
    ]);

    const bestSellingItems = [
        { name: "4pc Cronut Gift Box", price: 55000, pax: 4, img: GAMBAR_1, rating: "4.9", sold: "2rb+" },
        { name: "Cronut & DKA Combo", price: 50000, pax: 4, img: GAMBAR_3, rating: "4.8", sold: "1.5rb+" },
        { name: "4pc DKA Gift Box", price: 48000, pax: 4, img: GAMBAR_2, rating: "4.9", sold: "3rb+" },
        { name: "Cookie Shot Gift Box", price: 35000, pax: 3, img: GAMBAR_4, rating: "4.7", sold: "800+" },
        { name: "Signature Brownies", price: 28000, pax: 2, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&h=200&q=80", rating: "4.9", sold: "5rb+" },
        { name: "Strawberry Tart", price: 25000, pax: 1, img: "https://images.unsplash.com/photo-1514517521153-1be72277b32f?auto=format&fit=crop&w=300&h=200&q=80", rating: "4.8", sold: "1.2rb+" },
        { name: "Classic Croissant", price: 18000, pax: 1, img: "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&w=300&h=200&q=80", rating: "4.9", sold: "10rb+" },
        { name: "Cinnamon Roll Box", price: 32000, pax: 2, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&h=200&q=80", rating: "4.7", sold: "900+" },
        { name: "Matcha Pound Cake", price: 24000, pax: 2, img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=300&h=200&q=80", rating: "4.8", sold: "1.1rb+" },
        { name: "Blueberry Muffin Set", price: 22000, pax: 2, img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=300&h=200&q=80", rating: "4.6", sold: "600+" },
        { name: "Tiramisu Slice", price: 20000, pax: 1, img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=300&h=200&q=80", rating: "4.9", sold: "4.5rb+" },
        { name: "Lemon Meringue Pie", price: 25000, pax: 1, img: "https://images.unsplash.com/photo-1513135065346-a098a63a71ee?auto=format&fit=crop&w=300&h=200&q=80", rating: "4.7", sold: "750+" },
        { name: "Choco Lava Cake", price: 22000, pax: 1, img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=300&h=200&q=80", rating: "4.8", sold: "2.3rb+" },
        { name: "Almond Danish", price: 20000, pax: 1, img: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=300&h=200&q=80", rating: "4.8", sold: "1.8rb+" },
        { name: "Red Velvet Cupcakes", price: 25000, pax: 2, img: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&w=300&h=200&q=80", rating: "4.9", sold: "3.2rb+" },
        { name: "Artisan Baguette", price: 15000, pax: 1, img: GAMBAR_5, rating: "4.6", sold: "1.5rb+" }
    ];

    const groupPackages = {
        Kantor: { name: "Dandelion Corporate Coffee Break Platter", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&h=300&q=80", items: "5x Classic Croissant, 5x Artisan Baguette, 5x Matcha Pound Cake, 15x Mini Coffee Cups", price: 350000 },
        UlangTahun: { name: "Dandelion Ultimate Sweet Birthday Bundles", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&h=300&q=80", items: "1x Whole Chocolate Cake, 8x Donat Lumer Favorit, 8x Red Velvet Cupcakes", price: 450000 },
        Kasual: { name: "Dandelion Picnic Party Sharing Box", img: "https://images.unsplash.com/photo-1618923850107-d1a234d7a73a?auto=format&fit=crop&w=600&h=300&q=80", items: "10x Cookie Shots, 5x Choco Lava Cake, 5x Cinnamon Roll Box", price: 250000 }
    };

    const storeLocations = [
        { id: 1, name: "Store Dandelion Bake (Pusat Sukolilo)", lat: -7.2823, lng: 112.7949, address: "Jl. Kampus ITS Sukolilo, Surabaya", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 2, name: "Store Dandelion Bake Rungkut", lat: -7.3204, lng: 112.7845, address: "Jl. Rungkut Madya No.1", img: "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 3, name: "Store Dandelion Bake Waru", lat: -7.3508, lng: 112.7279, address: "Jl. Raya Waru Sidoarjo", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 4, name: "Store Dandelion Bake Sambikerep", lat: -7.2652, lng: 112.6515, address: "Jl. Raya Sambikerep", img: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 5, name: "Store Dandelion Bake Mulyosari", lat: -7.2630, lng: 112.8010, address: "Jl. Raya Mulyosari", img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 6, name: "Store Dandelion Bake Dharmahusada", lat: -7.2690, lng: 112.7660, address: "Jl. Dharmahusada Indah", img: "https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 7, name: "Store Dandelion Bake Tenggilis", lat: -7.3190, lng: 112.7470, address: "Jl. Tenggilis Mejoyo", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 8, name: "Store Dandelion Bake Wiyung", lat: -7.3120, lng: 112.6840, address: "Jl. Raya Wiyung", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 9, name: "Store Dandelion Bake Jakarta", lat: -6.1944, lng: 106.8229, address: "Jl. MH Thamrin, Jakarta Pusat", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 10, name: "Store Dandelion Bake Bandung", lat: -6.9175, lng: 107.6191, address: "Jl. Braga, Bandung", img: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 11, name: "Store Dandelion Bake Yogyakarta", lat: -7.7956, lng: 110.3695, address: "Jl. Malioboro, Yogyakarta", img: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 12, name: "Store Dandelion Bake Semarang", lat: -6.9932, lng: 110.4203, address: "Jl. Pemuda, Semarang", img: "https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 13, name: "Store Dandelion Bake Bali", lat: -8.6705, lng: 115.2126, address: "Jl. Teuku Umar, Denpasar", img: "https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 14, name: "Store Dandelion Bake Medan", lat: 3.5952, lng: 98.6722, address: "Jl. Merdeka, Medan", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 15, name: "Store Dandelion Bake Makassar", lat: -5.1477, lng: 119.4327, address: "Jl. Losari, Makassar", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&h=150&q=80" },
        { id: 16, name: "Store Dandelion Bake Balikpapan", lat: -1.2379, lng: 116.8529, address: "Jl. Jend. Sudirman, Balikpapan", img: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&w=300&h=150&q=80" }
    ];

    const addGroupOrderToCart = () => {
        const selectedPkg = groupPackages[groupEvent];
        const newGroupItem = { id: `group-${Date.now()}`, name: `${selectedPkg.name} (${groupPax} Pax)`, price: selectedPkg.price, img: selectedPkg.img, qty: 1, type: 'group', details: selectedPkg.items };
        setCartItems(prevItems => [...prevItems, newGroupItem]);
        setGroupStep(3);
    };
    
    const removeFromCart = (itemId) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus item ini dari keranjang?")) {
            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        }
    };

    const [groupStep, setGroupStep] = useState(1);
    const [groupEvent, setGroupEvent] = useState('Kantor');
    const [groupPax, setGroupPax] = useState(15);
    
    const [isOpeningBox, setIsOpeningBox] = useState(false);
    const [luckyPrize, setLuckyPrize] = useState(null);

    const handleOpenLuckyBox = () => {
        setIsOpeningBox(true);
        setLuckyPrize(null);
        setTimeout(() => {
            setIsOpeningBox(false);
            const prizePool = [
                { name: "Kupon Potongan Rp10.000", code: "DANDELION10K", desc: "Potongan langsung tanpa minimal pembelian." },
                { name: "Gratis Ongkir Eksklusif", code: "BAKEOFFONGKIR", desc: "Subsidi ongkir s/d Rp15.000 untuk pengiriman kemanapun." },
                { name: "Kupon Buy 1 Get 1 Croissant", code: "B1G1CROISSANT", desc: "Beli 1 Classic Croissant gratis 1 varian yang sama." }
            ];
            setLuckyPrize(prizePool[Math.floor(Math.random() * prizePool.length)]);
        }, 1500);
    };

    const [isNotified, setIsNotified] = useState(false);
    const [voucherQuota, setVoucherQuota] = useState(7);
    const [isCodeRevealed, setIsCodeRevealed] = useState(false);

    const handleClaimVoucher = () => {
        if (voucherQuota > 0) {
            setVoucherQuota(prev => prev - 1);
            alert("🎉 Selamat! Voucher Diskon 50% berhasil diklaim dan masuk ke akun membermu.");
        } else {
            alert("😭 Yahh, kuota voucher Flash Sale untuk hari ini sudah habis!");
        }
    };

    const [isScanning, setIsScanning] = useState(false);
    const [scannedStore, setScannedStore] = useState(null);

    const startStoreRadar = () => {
        setIsScanning(true);
        setScannedStore(null);
        setTimeout(() => {
            setIsScanning(false);
            setScannedStore(storeLocations[Math.floor(Math.random() * storeLocations.length)]);
        }, 2200);
    };

    const teleportToScannedStore = (store) => {
        setShowAllStores(true);
        setTimeout(() => {
            focusMapOnStore(store.lat, store.lng);
            const cardElement = document.getElementById(`store-card-${store.id}`);
            if (cardElement) {
                cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (typeof setHighlightedStoreId === 'function') {
                    setHighlightedStoreId(store.id);
                    setTimeout(() => setHighlightedStoreId(null), 3000);
                }
            }
        }, 300);
    };

    const [points, setPoints] = useState(8025);
    const handleRedeem = (cost, promoName) => {
        if (points >= cost) {
            setPoints(prevPoints => prevPoints - cost);
            alert(`Yay! Berhasil menukarkan ${cost} poin untuk ${promoName}. Tunjukkan barcode-mu ke kasir!`);
        } else {
            alert(`Maaf, poin kamu tidak cukup untuk menukarkan ${promoName}. Kumpulkan poin lagi ya!`);
        }
    };

    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    // Menyuntikkan Library Eksternal ke Head untuk simulasi di Next.js SPA
    useEffect(() => {
        // FontAwesome
        if (!document.getElementById('font-awesome-cdn')) {
            const linkFa = document.createElement('link');
            linkFa.id = 'font-awesome-cdn';
            linkFa.rel = 'stylesheet';
            linkFa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(linkFa);
        }

        // Leaflet CSS
        if (!document.getElementById('leaflet-css-cdn')) {
            const linkLeaflet = document.createElement('link');
            linkLeaflet.id = 'leaflet-css-cdn';
            linkLeaflet.rel = 'stylesheet';
            linkLeaflet.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(linkLeaflet);
        }

        // Leaflet JS
        if (!document.getElementById('leaflet-js-cdn')) {
            const scriptLeaflet = document.createElement('script');
            scriptLeaflet.id = 'leaflet-js-cdn';
            scriptLeaflet.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            scriptLeaflet.async = true;
            document.head.appendChild(scriptLeaflet);
        }
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % 2), 5000);
        return () => clearInterval(timer);
    }, []);

    // Inisialisasi Peta Leaflet dengan memantau load window.L
    useEffect(() => {
        if (currentView === 'store-view') {
            const initMap = () => {
                if (window.L && mapRef.current && !mapInstance.current) {
                    mapInstance.current = window.L.map(mapRef.current).setView([-2.5489, 118.0149], 5);
                    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; OpenStreetMap contributors'
                    }).addTo(mapInstance.current);
                    storeLocations.forEach(store => {
                        window.L.marker([store.lat, store.lng])
                            .addTo(mapInstance.current)
                            .bindPopup(`<div style="text-align:center;"><b>${store.name}</b><br/>${store.address}</div>`);
                    });
                }
                setTimeout(() => { if (mapInstance.current) { mapInstance.current.invalidateSize(); } }, 100);
            };

            if (window.L) {
                initMap();
            } else {
                const checkL = setInterval(() => {
                    if (window.L) {
                        initMap();
                        clearInterval(checkL);
                    }
                }, 500);
            }
        }
    }, [currentView]);
    
    const handleSearch = () => {
        if (!searchQuery.trim()) return; 
        const query = searchQuery.toLowerCase();
        const foundStore = storeLocations.find(store => store.name.toLowerCase().includes(query) || store.address.toLowerCase().includes(query));
        if (foundStore) {
            setShowAllStores(true);
            focusMapOnStore(foundStore.lat, foundStore.lng);
            setTimeout(() => {
                const cardElement = document.getElementById(`store-card-${foundStore.id}`);
                if (cardElement) {
                    cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setHighlightedStoreId(foundStore.id);
                    setTimeout(() => setHighlightedStoreId(null), 3000);
                }
            }, 100);
        } else {
            alert("Maaf, store tidak ditemukan di area tersebut.");
        }
    };

    const switchView = (viewId) => { setCurrentView(viewId); window.scrollTo(0, 0); };
    const simulateProductClick = (name, price, imgSrc) => { setProductDetail({ name, price, img: imgSrc }); switchView('product-detail-view'); };
    const focusMapOnStore = (lat, lng) => {
        if (mapInstance.current) {
            mapInstance.current.setView([lat, lng], 16);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    const addToCartAndSwitch = () => { switchView('chart-view'); };

    return (
        <div className="app-container">
            {/* INJECTING NATIVE CSS TO RETAIN EXISTING DESIGN */}
            <style dangerouslySetInnerHTML={{ __html: `
                :root {
                    --color-yellow: #FFF24B;
                    --color-green: #14403a;
                    --color-black-bg: #1a1a1a;
                    --color-brown-bg: #5d3a3a;
                    --color-grey-placeholder: #d9d9d9;
                    --header-height: 70px;
                }

                * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
                body { background-color: var(--color-yellow); }
                .app-container { display: flex; flex-direction: column; min-height: 100vh; padding-top: var(--header-height); }
                a { text-decoration: none; color: inherit; cursor: pointer; }
                ul { list-style: none; }
                img { width: 100%; height: auto; display: block; object-fit: cover; }

                .container { width: 90%; max-width: 1200px; margin: 0 auto; }
                .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
                .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                .flex-center { display: flex; justify-content: center; align-items: center; }
                .bg-yellow { background-color: var(--color-yellow); }
                .text-green { color: var(--color-green); }
                .font-bold { font-weight: bold; }
                .hidden { display: none !important; }
                .section-pad { padding: 40px 0; }

                .main-header { position: fixed; top: 0; left: 0; width: 100%; height: var(--header-height); background-color: var(--color-green); color: white; z-index: 1000; display: flex; align-items: center; padding: 0 30px; border-bottom: 5px solid var(--color-yellow); }
                .logo-area { display: flex; align-items: center; font-weight: bold; font-size: 1.2rem; margin-right: auto; }
                .nav-links { display: flex; gap: 25px; font-weight: 500; }
                .nav-links li a:hover, .nav-links li a.active { color: var(--color-yellow); border-bottom: 2px solid var(--color-yellow); }
                .header-icons { margin-left: auto; display: flex; gap: 15px; font-size: 1.5rem; }
                #main-content-container { flex: 1; }

                /* ====== VIEW: HOME ====== */
                .hero-section { background-color: var(--color-black-bg); height: 400px; color: white; position: relative; overflow: hidden; }
                .hero-carousel { height: 100%; width: 100%; position: relative; }
                .carousel-item { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; transition: opacity 1s ease-in-out; display: flex; justify-content: center; align-items: center; }
                .carousel-item.active { opacity: 1; }
                .featured-container-wrapper { background-color: var(--color-brown-bg); padding-bottom: 50px; }
                .featured-boxes-container { position: relative; top: -80px; margin-bottom: -40px; }
                
                .featured-box { 
                    background: white; 
                    border-radius: 20px; 
                    position: relative; 
                    overflow: hidden; 
                    box-shadow: 0 4px 10px rgba(0,0,0,0.15); 
                    text-align: center; 
                    cursor: pointer; 
                    transition: transform 0.3s ease, box-shadow 0.3s ease; 
                }
                .featured-box:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
                }
                .featured-img-wrap { width: 100%; height: 220px; overflow: hidden; }
                .featured-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
                .featured-box:hover .featured-img-wrap img { transform: scale(1.08); }
                .featured-box h3 { margin: 20px 0; font-size: 1.15rem; color: var(--color-green); font-weight: 800; }
                
                .home-products-section { padding: 60px 0; }
                
                .hover-card { 
                    background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); 
                    transition: transform 0.3s ease, box-shadow 0.3s ease; overflow: hidden; border: 1px solid #eee; 
                }
                .hover-card:hover { transform: translateY(-8px); box-shadow: 0 15px 35px rgba(0,0,0,0.12); }
                .product-card { position: relative; cursor: pointer; display: flex; flex-direction: column; height: 100%; }
                .product-img-wrapper { position: relative; height: 220px; overflow: hidden; }
                .product-img-wrapper img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
                .product-card:hover .product-img-wrapper img { transform: scale(1.08); }
                .rating-badge { position: absolute; top: 15px; left: 15px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(4px); padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; color: #333; display: flex; align-items: center; gap: 5px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); z-index: 2; }
                .rating-badge i { color: #f5b041; }
                .product-info { padding: 20px; display: flex; flex-direction: column; flex: 1; justify-content: space-between; }
                .product-title { font-weight: 700; font-size: 1.1rem; color: #222; margin-bottom: 8px; line-height: 1.4; }
                .product-sold { font-size: 0.8rem; color: #888; }
                .product-meta { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
                .product-price { color: #14403a; font-weight: normal; font-size: 1.2rem; }
                .btn-add { background: #14403a; color: #FFF24B; border: none; width: 35px; height: 35px; border-radius: 50%; font-size: 1.1rem; display: flex; justify-content: center; align-items: center; transition: 0.3s; opacity: 0; transform: translateY(10px); }
                .product-card:hover .btn-add { opacity: 1; transform: translateY(0); }
                .btn-add:hover { background: #FFF24B; color: #14403a; transform: scale(1.1) !important;}

                /* ====== VIEW: PRODUCT DETAIL ====== */
                .product-detail-view { padding: 40px 0; }
                .pd-layout { display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; background: white; padding: 30px; border-radius: 15px; }
                .pd-image { background-color: var(--color-grey-placeholder); height: 400px; border-radius: 10px; display: flex; justify-content: center; align-items: center; overflow: hidden; }
                .pd-info h1 { color: var(--color-green); margin-bottom: 10px; }
                .pd-price { font-size: 1.3rem; font-weight: bold; margin-bottom: 20px; }
                .pd-section-title { font-weight: bold; margin: 15px 0 10px; }
                .pd-options-group { display: flex; gap: 10px; margin-bottom: 20px; }
                .pd-option-btn { padding: 8px 20px; border: 2px solid var(--color-green); border-radius: 20px; background: white; cursor: pointer; }
                .pd-option-btn.active { background: var(--color-green); color: white; }
                .addon-item { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
                .addon-checkbox { width: 20px; height: 20px; accent-color: var(--color-green); }
                .qty-selector { display: flex; align-items: center; gap: 10px; margin-top: 20px; }
                .qty-btn { width: 35px; height: 35px; background: white; border: 1px solid var(--color-green); font-size: 1.2rem; cursor: pointer; }
                .qty-input { width: 50px; height: 35px; text-align: center; border: 1px solid var(--color-green); }
                .add-to-chart-btn { background-color: black; color: white; width: 100%; padding: 15px; border: none; border-radius: 30px; font-size: 1.1rem; font-weight: bold; margin-top: 30px; cursor: pointer; text-align: center; }

                /* ====== VIEW: REWARDS & NEWS ====== */
                .rewards-view { padding: 40px 0; color: var(--color-green); }
                .rewards-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 30px; }
                .member-card { background-color: var(--color-grey-placeholder); padding: 30px; border-radius: 20px; min-height: 250px; display: flex; flex-direction: column; justify-content: space-between; }
                .promo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
                .promo-box { background-color: var(--color-grey-placeholder); height: 350px; border-radius: 20px; padding: 20px; text-align: center; font-style: italic; font-weight: bold;}
                .news-view { padding: 40px 0; }
                .news-card { background-color: var(--color-grey-placeholder); height: 450px; border-radius: 20px; padding: 30px; font-style: italic; font-weight: bold; color: black; display: flex; justify-content: center; align-items: flex-start;}
                
                /* ====== VIEW: CHART & TRACKING ====== */
                .chart-view { padding: 40px 0; }
                .chart-layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 0; height: 500px; border-radius: 20px; overflow: hidden; }
                .chart-details-side { background-color: var(--color-grey-placeholder); padding: 30px; display: flex; flex-direction: column; }
                .chart-item { background: white; padding: 15px; border-radius: 15px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
                .checkout-btn { background-color: white; color: black; padding: 15px; border-radius: 30px; border: none; font-weight: bold; font-style: italic; margin-top: auto; cursor: pointer; }

                /* ORDER TRACKING CSS */
                .tracking-card { background: white; border-radius: 15px; padding: 25px; margin-bottom: 20px; box-shadow: 0 8px 25px rgba(0,0,0,0.06); border: 1px solid #eee; }
                .tracking-header { display: flex; justify-content: space-between; border-bottom: 2px dashed #eee; padding-bottom: 15px; margin-bottom: 20px; }
                .tracking-stepper { display: flex; justify-content: space-between; position: relative; margin-top: 20px; }
                .tracking-stepper::before { content: ''; position: absolute; top: 15px; left: 10%; width: 80%; height: 4px; background: #eee; z-index: 0; border-radius: 5px; }
                .tracking-step { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; width: 25%; text-align: center; }
                .step-icon { width: 35px; height: 35px; border-radius: 50%; background: #eee; display: flex; justify-content: center; align-items: center; font-weight: bold; color: #aaa; border: 3px solid white; transition: 0.3s; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                .step-text { font-size: 0.75rem; color: #888; font-weight: 700; line-height: 1.2; }
                .step-active .step-icon { background: var(--color-yellow); color: var(--color-green); border-color: var(--color-green); transform: scale(1.1); }
                .step-active .step-text { color: var(--color-green); }
                .step-done .step-icon { background: var(--color-green); color: white; border-color: white; }
                .step-done .step-text { color: var(--color-green); }

                /* ====== VIEW: GROUP ORDER & STORE ====== */
                .group-order-view { padding: 40px 0; text-align: center; color: var(--color-green); }
                .steps-container { display: flex; justify-content: center; gap: 50px; margin: 30px 0; }
                .step-item { display: flex; align-items: center; gap: 10px; font-weight: bold; font-style: italic; }
                .step-circle { width: 40px; height: 40px; background-color: var(--color-grey-placeholder); border-radius: 50%; }
                
                .store-view { padding: 40px 0; color: var(--color-green); }
                .map-container { height: 400px; width: 100%; border-radius: 15px; margin: 20px 0; z-index: 1; overflow: hidden; border: 3px solid var(--color-green); }
                .leaflet-popup-content-wrapper { border-radius: 8px; }
                .leaflet-popup-content b { color: var(--color-green); }

                .store-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
                .store-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08); display: flex; flex-direction: column; cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease; border: 1px solid #f0f0f0; }
                .store-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.12); }
                .store-card-img { width: 100%; height: 130px; object-fit: cover; }
                .store-card-content { padding: 15px; flex: 1; display: flex; flex-direction: column; }
                .store-card-title { font-weight: 800; color: var(--color-green); font-size: 1.05rem; margin-bottom: 5px; }
                .store-card-address { font-size: 0.8rem; color: #666; margin-bottom: 15px; line-height: 1.4; display: flex; gap: 6px; }
                .store-card-btn { background: #e8f5e9; color: var(--color-green); border: none; width: 100%; padding: 10px; border-radius: 8px; font-weight: bold; font-size: 0.85rem; margin-top: auto; cursor: pointer; transition: background 0.2s; }
                .store-card:hover .store-card-btn { background: var(--color-green); color: white; }

                footer { background-color: var(--color-green); color: #e0bb66; }
                .footer-contact-banner { background-color: var(--color-yellow); color: var(--color-green); padding: 30px 0; text-align: center; }
                .contact-btn { padding: 10px 25px; border-radius: 25px; font-weight: bold; display: flex; align-items: center; gap: 10px; cursor: pointer; }
                .btn-dark { background-color: var(--color-green); color: var(--color-yellow); border: none; }
                .btn-outline { background-color: transparent; color: var(--color-green); border: 2px solid var(--color-green); }
                .footer-links-section { padding: 60px 0; display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 40px; }
                .footer-col h3 { margin-bottom: 20px; font-size: 1.1rem; color: #e0bb66; }
                .footer-col ul li { margin-bottom: 10px; font-size: 0.9rem; color: #e0bb66; cursor: pointer; }
                .social-icons { display: flex; gap: 15px; font-size: 1.5rem; margin-bottom: 30px; color: #e0bb66; }
            
                @keyframes highlightPulse {
                    0% { box-shadow: 0 0 0 0 rgba(20, 64, 58, 0.7); transform: scale(1); }
                    50% { box-shadow: 0 0 20px 10px rgba(20, 64, 58, 0); transform: scale(1.05); }
                    100% { box-shadow: 0 0 0 0 rgba(20, 64, 58, 0); transform: scale(1); }
                }
                .store-card.highlighted { animation: highlightPulse 2s ease-out; border: 3px solid var(--color-green); }

                @keyframes radarGlow {
                    0% { box-shadow: 0 0 0 0 rgba(20, 64, 58, 0.4); }
                    70% { box-shadow: 0 0 20px 15px rgba(20, 64, 58, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(20, 64, 58, 0); }
                }
                .radar-btn-pulse { animation: radarGlow 1.5s infinite; }
                @keyframes scanningLine { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
                .scanning-bar { position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: var(--color-green); opacity: 0.7; animation: scanningLine 1.5s infinite linear; }
            `}} />

            <header className="main-header">
                <div className="logo-area">
                    <img src={LOGO_URL} alt="Logo Header" style={{ width: '40px', height: '40px', marginRight: '10px', borderRadius: '50%', objectFit: 'cover' }} />
                    Dandelion Bake
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><a onClick={() => switchView('home-view')} className={currentView === 'home-view' || currentView === 'product-detail-view' ? 'active' : ''}>Menu</a></li>
                        <li><a onClick={() => switchView('store-view')} className={currentView === 'store-view' ? 'active' : ''}>Store</a></li>
                        <li><a onClick={() => switchView('rewards-view')} className={currentView === 'rewards-view' ? 'active' : ''}>Rewards</a></li>
                        <li><a onClick={() => switchView('news-view')} className={currentView === 'news-view' ? 'active' : ''}>News &amp; Promo</a></li>
                        <li><a onClick={() => switchView('group-order-view')} className={currentView === 'group-order-view' ? 'active' : ''}>Group Order</a></li>
                        <li><a onClick={() => switchView('chart-view')} className={currentView === 'chart-view' ? 'active' : ''}>Chart</a></li>
                        <li><a onClick={() => switchView('order-tracking-view')} className={currentView === 'order-tracking-view' ? 'active' : ''}>Orderan</a></li>
                    </ul>
                </nav>
                <div className="header-icons">
                    <i className="fas fa-search" style={{ cursor: 'pointer', transition: '0.2s' }} onClick={() => setShowGlobalSearch(true)} title="Cari Menu Roti"></i>
                    <i className="far fa-user" style={{ cursor: 'pointer', transition: '0.2s' }} onClick={() => setShowProfileModal(true)} title="Akun Dandelion Loyalty"></i>
                </div>
            </header>

            <main id="main-content-container">
                
                {/* ====== VIEW: HOME ====== */}
                <section id="home-view" className={`view-section ${currentView === 'home-view' ? '' : 'hidden'}`}>
                    <div className="hero-section">
                        <div className="hero-carousel">
                            <div className={`carousel-item ${currentSlide === 1 ? 'active' : ''}`}>
                                {/* Fallback image poster karena file lokal Vidmainmenu.mp4 tidak akan meload di server eksternal */}
                                <img src={VID_POSTER} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} alt="Video Background Placeholder" />
                            </div>
                        </div>
                    </div>

                    <div className="featured-container-wrapper">
                        <div className="container featured-boxes-container">
                            <div className="grid-4">
                                <div className="featured-box" onClick={() => simulateProductClick("Donat Lumer Favorit", 35000, GAMGAMBAR_2)}>
                                    <div className="featured-img-wrap">
                                        <img src={GAMBAR_1} alt="Donat Lumer" />
                                    </div>
                                    <h3>Donat Favorit</h3>
                                </div>
                                <div className="featured-box" onClick={() => simulateProductClick("Our Signatures", 45000, GAMBAR_3)}>
                                    <div className="featured-img-wrap">
                                        <img src={GAMBAR_3} alt="Signatures" />
                                    </div>
                                    <h3>Our Signatures</h3>
                                </div>
                                <div className="featured-box" onClick={() => simulateProductClick("Cookie Shots", 25000, GAMBAR_4)}>
                                    <div className="featured-img-wrap">
                                        <img src={GAMBAR_4} alt="Cookie Shots" />
                                    </div>
                                    <h3>Cookie Shots</h3>
                                </div>
                                <div className="featured-box" onClick={() => simulateProductClick("Aneka Roti Panggang", 18000, GAMBAR_5)}>
                                    <div className="featured-img-wrap">
                                        <img src={GAMBAR_5} alt="Aneka Roti" />
                                    </div>
                                    <h3>Aneka Roti Klasik</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="home-products-section bg-yellow">
                        <div className="container">
                            <h2 style={{fontSize: '1.8rem', fontStyle: 'italic', marginBottom: '25px'}}>✨ Our Best Selling Items</h2>
                            <div className="grid-4">
                                {bestSellingItems.map((item, index) => (
                                    <div key={index} className="product-card hover-card" onClick={() => simulateProductClick(item.name, item.price, item.img)}>
                                        <div className="product-img-wrapper">
                                            <div className="rating-badge"><i className="fas fa-star"></i> {item.rating}</div>
                                            <img src={item.img} alt={item.name} />
                                        </div>
                                        <div className="product-info">
                                            <div>
                                                <div className="product-title">{item.name}</div>
                                                <div className="product-sold">{item.sold} Terjual • ({item.pax} pax)</div>
                                            </div>
                                            <div className="product-meta">
                                                <div className="product-price">Rp {item.price.toLocaleString('id-ID')}</div>
                                                <button className="btn-add"><i className="fas fa-plus"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ====== VIEW: PRODUCT DETAIL ====== */}
                <section id="product-detail-view" className={`view-section ${currentView === 'product-detail-view' ? '' : 'hidden'}`}>
                    <div className="container product-detail-view">
                        <div className="pd-layout">
                            <div className="pd-image">
                                <img src={productDetail.img} alt="Selected Product" />
                            </div>
                            <div className="pd-info">
                                <h1>{productDetail.name}</h1>
                                <div className="pd-price">Rp {Number(productDetail.price).toLocaleString('id-ID')}</div>
                                
                                <div className="pd-section-title">Metode Pengambilan</div>
                                <div className="pd-options-group">
                                    <button className="pd-option-btn active">Delivery</button>
                                    <button className="pd-option-btn">Pickup</button>
                                </div>

                                    <div className="pd-section-title">Add On</div>
                                    <div style={{ background: 'white', padding: '15px', borderRadius: '10px', border: '1px solid #eee' }}>
                                        <div className="addon-item">
                                            <input type="checkbox" className="addon-checkbox" id="addon1" />
                                            <label htmlFor="addon1">Extra Sauce (+ Rp 5.000)</label>
                                        </div>
                                    </div>

                                    <div className="qty-selector">
                                        <button className="qty-btn">-</button>
                                        <input type="text" className="qty-input" value="1" readOnly />
                                        <button className="qty-btn">+</button>
                                    </div>
                                
                                    <button className="add-to-chart-btn" onClick={addToCartAndSwitch}>Add to Chart</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ====== VIEW: REWARDS ====== */}
                <section id="rewards-view" className={`view-section ${currentView === 'rewards-view' ? '' : 'hidden'}`}>
                    <div className="container rewards-view">
                        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontStyle: 'italic', fontSize: '2.2rem' }}>Tukarkan Poin</h2>
                        
                        <div className="rewards-grid">
                            <div className="left-col">
                                <div className="member-card" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%)', color: 'white', boxShadow: '0 10px 20px rgba(0,0,0,0.15)', position: 'sticky', top: '90px' }}>
                                    <div style={{ position: 'relative', zIndex: 2 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div>
                                                <p style={{ fontSize: '0.9rem', marginBottom: '5px', opacity: 0.9 }}>Halo, Dandelion Lovers!</p>
                                                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Dandelion Loyalty</h3>
                                            </div>
                                            <div style={{ background: 'white', padding: '5px 15px', borderRadius: '20px', color: '#AA7C11', fontWeight: 'bold', fontSize: '0.9rem' }}>
                                                GOLD MEMBER
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '20px' }}>
                                            <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0' }}>Total Poin Kamu</p>
                                            <h1 style={{ fontSize: '3.5rem', margin: '0' }}>{points.toLocaleString('id-ID')}</h1>
                                        </div>
                                        <div style={{ marginTop: '25px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '8px' }}>
                                                <span>{10000 - points > 0 ? `${(10000 - points).toLocaleString('id-ID')} poin lagi menuju Diamond` : 'Kamu sudah mencapai Diamond!'}</span>
                                                <span>10.000 Pts</span>
                                            </div>
                                            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.3)', borderRadius: '4px' }}>
                                                <div style={{ width: `${Math.min((points / 10000) * 100, 100)}%`, height: '100%', background: 'white', borderRadius: '4px', transition: 'width 0.5s ease-in-out' }}></div>
                                            </div>
                                        </div>
                                        <div style={{ marginTop: '25px', background: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/EAN13.svg" alt="Barcode" style={{ height: '50px', width: '80%', margin: '0 auto', opacity: 0.8 }} />
                                            <p style={{ color: 'black', fontSize: '0.8rem', margin: '8px 0 0 0', letterSpacing: '3px', fontWeight: 'bold' }}>1029 3847 5612</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="right-col promo-grid">
                                <div className="promo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1555507036-ab1e4006a2a0?auto=format&fit=crop&w=400&h=400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0', textAlign: 'left', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 100%)' }}></div>
                                    <div style={{ position: 'relative', zIndex: 2, padding: '25px' }}>
                                        <div style={{ background: 'var(--color-yellow)', color: 'var(--color-green)', display: 'inline-block', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '10px', fontWeight: 'bold' }}>500 Poin</div>
                                        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontStyle: 'normal' }}>Gratis 1 Classic Croissant</h3>
                                        <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '20px', fontStyle: 'normal', fontWeight: 'normal' }}>Tukarkan 500 poinmu untuk mendapatkan croissant renyah gratis hari ini.</p>
                                        <button style={{ width: '100%', padding: '12px', background: 'white', border: 'none', borderRadius: '30px', color: 'var(--color-green)', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }} onClick={() => handleRedeem(500, 'Gratis 1 Classic Croissant')}>Tukarkan Sekarang</button>
                                    </div>
                                </div>
                                <div className="promo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=400&h=400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0', textAlign: 'left', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 100%)' }}></div>
                                    <div style={{ position: 'relative', zIndex: 2, padding: '25px' }}>
                                        <div style={{ background: 'var(--color-yellow)', color: 'var(--color-green)', display: 'inline-block', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '10px', fontWeight: 'bold' }}>1000 Poin</div>
                                        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontStyle: 'normal' }}>Diskon 50% Whole Cake</h3>
                                        <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '20px', fontStyle: 'normal', fontWeight: 'normal' }}>Rayakan momen spesialmu. Berlaku untuk semua varian whole cake medium.</p>
                                        <button style={{ width: '100%', padding: '12px', background: 'white', border: 'none', borderRadius: '30px', color: 'var(--color-green)', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }} onClick={() => handleRedeem(1000, 'Diskon 50% Whole Cake')}>Tukarkan Sekarang</button>
                                    </div>
                                </div>
                                <div className="promo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&h=400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0', textAlign: 'left', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 100%)' }}></div>
                                    <div style={{ position: 'relative', zIndex: 2, padding: '25px' }}>
                                        <div style={{ background: 'var(--color-yellow)', color: 'var(--color-green)', display: 'inline-block', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '10px', fontWeight: 'bold' }}>2500 Poin</div>
                                        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontStyle: 'normal' }}>Gratis 4pc Cronut Gift Box</h3>
                                        <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '20px', fontStyle: 'normal', fontWeight: 'normal' }}>Tukarkan poinmu dengan sekotak cronut manis favorit untuk orang tersayang.</p>
                                        <button style={{ width: '100%', padding: '12px', background: 'white', border: 'none', borderRadius: '30px', color: 'var(--color-green)', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }} onClick={() => handleRedeem(2500, 'Gratis 4pc Cronut Gift Box')}>Tukarkan Sekarang</button>
                                    </div>
                                </div>
                                <div className="promo-box" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&h=400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0', textAlign: 'left', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.1) 100%)' }}></div>
                                    <div style={{ position: 'relative', zIndex: 2, padding: '25px' }}>
                                        <div style={{ background: 'var(--color-yellow)', color: 'var(--color-green)', display: 'inline-block', padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', marginBottom: '10px', fontWeight: 'bold' }}>1500 Poin</div>
                                        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontStyle: 'normal' }}>Signature Brownies Pack</h3>
                                        <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '20px', fontStyle: 'normal', fontWeight: 'normal' }}>Dapatkan brownies lezat premium dengan menukarkan poinmu. Kuota terbatas!</p>
                                        <button style={{ width: '100%', padding: '12px', background: 'white', border: 'none', borderRadius: '30px', color: 'var(--color-green)', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }} onClick={() => handleRedeem(1500, 'Signature Brownies Pack')}>Tukarkan Sekarang</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ====== VIEW: NEWS ====== */}
                <section id="news-view" className={`view-section ${currentView === 'news-view' ? '' : 'hidden'}`}>
                        <div className="container news-view">
                            <h2 style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--color-green)', fontStyle: 'italic', fontSize: '2.2rem' }}>News &amp; Promo</h2>
                            <div className="grid-3">
                                <div className="news-card" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=400&h=650&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', height: '480px' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)' }}></div>
                                    <div style={{ position: 'relative', zIndex: 2, padding: '25px' }}>
                                        <div style={{ background: '#e3f2fd', color: '#1e88e5', display: 'inline-block', padding: '4px 12px', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '10px' }}>COMING SOON</div>
                                        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontStyle: 'normal' }}>Matcha Almond Croissant</h3>
                                        <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '20px', fontStyle: 'normal', fontWeight: 'normal' }}>Perpaduan renyahnya croissant khas Dandelion Bake dengan lelehan matcha artisan murni Jepang.</p>
                                        <button onClick={() => { setIsNotified(true); alert("🔔 Notifikasi diaktifkan! Kami akan mengirim pesan WhatsApp saat menu ini resmi diluncurkan."); }} style={{ width: '100%', padding: '12px', background: isNotified ? '#4caf50' : 'white', border: 'none', borderRadius: '30px', color: isNotified ? 'white' : 'var(--color-green)', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }} disabled={isNotified}>
                                            <i className={isNotified ? "fas fa-check" : "far fa-bell"}></i> {isNotified ? "Sudah Terdaftar" : "Ingatkan Saya"}
                                        </button>
                                    </div>
                                </div>
                                <div className="news-card" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&h=650&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', height: '480px' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)' }}></div>
                                    <div style={{ position: 'relative', zIndex: 2, padding: '25px' }}>
                                        <div style={{ background: '#ffebee', color: '#c62828', display: 'inline-block', padding: '4px 12px', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '10px' }}>LIVE FLASH SALE</div>
                                        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontStyle: 'normal' }}>Kupon Potongan 50%</h3>
                                        <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '12px', fontStyle: 'normal', fontWeight: 'normal' }}>Spesial perayaan member baru! Diskon 50% berlaku untuk semua varian dessert box pilihan.</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '15px', background: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '8px' }}>
                                            <span>🔥 Kuota Terbatas Hari Ini:</span>
                                            <span style={{ fontWeight: 'bold', color: 'var(--color-yellow)' }}>Sisa {voucherQuota} Voucher</span>
                                        </div>
                                        <button onClick={handleClaimVoucher} style={{ width: '100%', padding: '12px', background: 'var(--color-yellow)', border: 'none', borderRadius: '30px', color: 'black', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}>Klaim Voucher Sekarang</button>
                                    </div>
                                </div>
                                <div className="news-card" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&h=650&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0', border: 'none', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', height: '480px' }}>
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)' }}></div>
                                    <div style={{ position: 'relative', zIndex: 2, padding: '25px' }}>
                                        <div style={{ background: '#e8f5e9', color: '#2e7d32', display: 'inline-block', padding: '4px 12px', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '10px' }}>SECRET BUNDLE</div>
                                        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', fontStyle: 'normal' }}>Paket Bundling Kopi &amp; Donut</h3>
                                        <p style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '20px', fontStyle: 'normal', fontWeight: 'normal' }}>Dapatkan 2 Kopi Susu Aren + 2 Donut Lumer seharga Rp45.000 saja dengan menyalin kode rahasia.</p>
                                        <div onClick={() => setIsCodeRevealed(true)} style={{ border: '2px dashed var(--color-yellow)', background: 'rgba(0,0,0,0.4)', padding: '10px', borderRadius: '10px', textAlign: 'center', marginBottom: '15px', cursor: isCodeRevealed ? 'default' : 'pointer' }}>
                                            {isCodeRevealed ? (
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                                    <span style={{ fontSize: '1.1rem', letterSpacing: '2px', fontWeight: 'bold', color: 'var(--color-yellow)' }}>DANDELIONBUNDLE</span>
                                                    <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText("DANDELIONBUNDLE"); alert("📋 Kode kupon disalin ke clipboard!"); }} style={{ background: 'white', border: 'none', padding: '3px 8px', borderRadius: '5px', fontSize: '0.7rem', cursor: 'pointer', fontWeight: 'bold', color: 'black' }}>Salin</button>
                                                </div>
                                            ) : (
                                                <span style={{ filter: 'blur(4px)', userSelect: 'none', fontSize: '1rem' }}>XXXX-XXXX-XXXX</span>
                                            )}
                                            {!isCodeRevealed && <div style={{ fontSize: '0.7rem', color: '#ccc', marginTop: '2px' }}><i className="fas fa-eye"></i> Klik untuk membuka kode rahasia</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>

                {/* ====== VIEW: GROUP ORDER ====== */}
                <section id="group-order-view" className={`view-section ${currentView === 'group-order-view' ? '' : 'hidden'}`}>
                    <div className="container group-order-view">
                        <h2 style={{ fontStyle: 'italic', fontSize: '2.2rem', marginBottom: '30px' }}>Group Order</h2>
                        <div className="steps-container" style={{ marginBottom: '40px' }}>
                            <div className="step-item" style={{ opacity: groupStep >= 1 ? 1 : 0.5, color: groupStep === 1 ? 'black' : 'var(--color-green)' }}>
                                <div className="step-circle flex-center" style={{ background: groupStep >= 1 ? 'var(--color-green)' : '#ccc', color: 'white', fontWeight: 'bold' }}>1</div> Detail Acara
                            </div>
                            <div className="step-item" style={{ opacity: groupStep >= 2 ? 1 : 0.5, color: groupStep === 2 ? 'black' : 'var(--color-green)' }}>
                                <div className="step-circle flex-center" style={{ background: groupStep >= 2 ? 'var(--color-green)' : '#ccc', color: 'white', fontWeight: 'bold' }}>2</div> Rekomendasi Pesanan
                            </div>
                            <div className="step-item" style={{ opacity: groupStep >= 3 ? 1 : 0.5, color: groupStep === 3 ? 'black' : 'var(--color-green)' }}>
                                <div className="step-circle flex-center" style={{ background: groupStep >= 3 ? 'var(--color-green)' : '#ccc', color: 'white', fontWeight: 'bold' }}>3</div> Selesai
                            </div>
                        </div>

                        <div className="group-content-placeholder" style={{ height: 'auto', background: 'white', border: '3px solid var(--color-green)', borderRadius: '20px', padding: '40px', color: 'black', textAlign: 'left', boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}>
                            {groupStep === 1 && (
                                <div>
                                    <h3 style={{ fontWeight: 'bold', fontSize: '1.4rem', color: 'var(--color-green)', marginBottom: '5px' }}>🎈 Langkah 1: Beritahu Detail Acaramu</h3>
                                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '25px' }}>Biarkan sistem AI kami merancang kombinasi paket konsumsi roti & kopi terbaik untuk acaramu.</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                                        <div>
                                            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', fontSize: '0.95rem' }}>Jenis Acara/Gathering:</label>
                                            <select value={groupEvent} onChange={(e) => setGroupEvent(e.target.value)} style={{ width: '100%', padding: '12px 15px', borderRadius: '10px', border: '2px solid #ddd', fontSize: '0.95rem', background: '#f9f9f9', outline: 'none' }}>
                                                <option value="Kantor">Meeting / Corporate Coffee Break</option>
                                                <option value="UlangTahun">Birthday Party / Perayaan Spesial</option>
                                                <option value="Kasual">Arisan / Nongkrong & Piknik Santai</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', fontSize: '0.95rem' }}>Estimasi Jumlah Pax (Orang):</label>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <input type="number" value={groupPax} onChange={(e) => setGroupPax(Math.max(1, parseInt(e.target.value) || 1))} style={{ flex: 1, padding: '12px 15px', borderRadius: '10px', border: '2px solid #ddd', fontSize: '0.95rem', textAlign: 'center' }} />
                                                <span style={{ fontWeight: 'bold', color: '#555' }}>Orang</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={() => setGroupStep(2)} style={{ width: '100%', padding: '15px', background: 'var(--color-green)', color: 'white', border: 'none', borderRadius: '30px', fontSize: '1.05rem', fontWeight: 'bold', cursor: 'pointer', textAlign: 'center' }}>🪄 Generate Paket Menu AI</button>
                                </div>
                            )}

                            {groupStep === 2 && (
                                <div>
                                    <h3 style={{ fontWeight: 'bold', fontSize: '1.4rem', color: 'var(--color-green)', marginBottom: '5px' }}>✨ Langkah 2: Rekomendasi Menu & Ruang Patungan</h3>
                                    <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '25px' }}>AI berhasil menyusun menu seimbang yang paling pas untuk kategori acara pilihanmu.</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', background: '#f5f7f6', padding: '25px', borderRadius: '15px', marginBottom: '30px', border: '1px solid #e0e0e0' }}>
                                        <div>
                                            <span style={{ background: 'var(--color-yellow)', color: 'black', padding: '4px 10px', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '8px' }}>REKOMENDASI AI UTAMA</span>
                                            <h4 style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--color-green)', marginBottom: '5px' }}>{groupPackages[groupEvent].name}</h4>
                                            <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.5', marginBottom: '15px' }}><b>Isi Paket:</b> {groupPackages[groupEvent].items}</p>
                                            <div style={{ borderTop: '1px solid #ddd', paddingTop: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                                <div>
                                                    <span style={{ fontSize: '0.8rem', color: '#666' }}>Total Harga Paket:</span>
                                                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'black' }}>Rp {groupPackages[groupEvent].price.toLocaleString('id-ID')}</div>
                                                </div>
                                                <div>
                                                    <span style={{ fontSize: '0.8rem', color: '#666' }}>Patungan Per Pax ({groupPax} orang):</span>
                                                    <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2e7d32' }}>Rp {Math.round(groupPackages[groupEvent].price / groupPax).toLocaleString('id-ID')}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ borderRadius: '10px', overflow: 'hidden', height: '180px' }}>
                                            <img src={groupPackages[groupEvent].img} alt="Package Meal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '15px' }}>
                                        <button onClick={addGroupOrderToCart} style={{ padding: '15px', background: 'black', color: 'white', border: 'none', borderRadius: '30px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', textAlign: 'center' }}>🛒 Kunci &amp; Lanjutkan Checkout Group</button>
                                        <button onClick={() => alert("🔗 Link Ruang Patungan Disalin!\nKirim link ini ke teman-temanmu agar mereka bisa melihat rincian biaya patungan secara real-time.")} style={{ padding: '15px', background: 'transparent', color: 'var(--color-green)', border: '2px solid var(--color-green)', borderRadius: '30px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', textAlign: 'center' }}><i className="fas fa-share-alt"></i> Bagikan Link Patungan</button>
                                    </div>
                                    <p onClick={() => setGroupStep(1)} style={{ color: '#888', textAlign: 'center', fontSize: '0.85rem', marginTop: '15px', cursor: 'pointer', textDecoration: 'underline' }}>‹ Kembali ubah detail acara</p>
                                </div>
                            )}

                            {groupStep === 3 && (
                                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                    <div style={{ fontSize: '3.5rem', color: '#4caf50', marginBottom: '15px' }}>🎉</div>
                                    <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--color-green)', marginBottom: '8px' }}>Pesanan Group Order Berhasil Dibuat!</h3>
                                    <p style={{ color: '#555', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 25px auto', lineHeight: '1.5' }}>Pesanan acaramu telah dikunci. Tim Dandelion Bake akan mengemas hidangan dengan proteksi ekstra untuk menjaga kesegaran hingga tiba di lokasi acara.</p>
                                    <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '12px', maxWidth: '400px', margin: '0 auto 30px auto', border: '1px solid #eee', textAlign: 'left' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}><span style={{ color: '#666' }}>ID Group Order:</span><span style={{ fontWeight: 'bold' }}>#DB-GROUP-2026A</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}><span style={{ color: '#666' }}>Kategori Event:</span><span style={{ fontWeight: 'bold' }}>{groupEvent} ({groupPax} Pax)</span></div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderTop: '1px solid #ddd', paddingTop: '8px', marginTop: '8px' }}><span style={{ color: '#666', fontWeight: 'bold' }}>Total Tagihan:</span><span style={{ fontWeight: 'bold', color: 'var(--color-green)' }}>Rp {groupPackages[groupEvent].price.toLocaleString('id-ID')}</span></div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                        <button onClick={() => { setGroupStep(1); switchView('chart-view'); }} style={{ padding: '12px 35px', background: 'var(--color-green)', color: 'white', border: 'none', borderRadius: '30px', fontSize: '0.95rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(20,64,58,0.2)' }}>🛒 Pergi ke Keranjang (Chart)</button>
                                        <button onClick={() => { setGroupStep(1); switchView('home-view'); }} style={{ padding: '12px 35px', background: '#eee', color: '#333', border: 'none', borderRadius: '30px', fontSize: '0.95rem', fontWeight: 'bold', cursor: 'pointer' }}>Menu Utama</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* ====== VIEW: CHART & CHECKOUT ====== */}
                <section id="chart-view" className={`view-section ${currentView === 'chart-view' ? '' : 'hidden'}`}>
                    <div className="container chart-view">
                        {!showPaymentGate ? (
                            <div className="chart-layout" style={{ height: 'auto', minHeight: '500px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px', background: 'transparent' }}>
                                <div style={{ background: 'white', padding: '30px', borderRadius: '20px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ fontWeight: 'bold', color: 'var(--color-green)', marginBottom: '20px', fontSize: '1.25rem', borderBottom: '2px solid #f5f5f5', paddingBottom: '10px' }}>Daftar Item Keranjang ({cartItems.length})</h3>
                                    {cartItems.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '40px 0', color: '#888', fontStyle: 'italic' }}>
                                            <i className="fas fa-shopping-basket" style={{ fontSize: '3rem', marginBottom: '10px', color: '#ccc' }}></i>
                                            <div>Keranjang belanjaanmu kosong.</div>
                                        </div>
                                    ) : (
                                        cartItems.map((item) => (
                                        <div key={item.id} className="chart-item" style={{ background: '#fcfcfc', border: item.type === 'group' ? '2px solid var(--color-green)' : '1px solid #eee', padding: '15px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                                <img src={item.img} alt={item.name} style={{ width: '75px', height: '75px', borderRadius: '10px', objectFit: 'cover' }} />
                                                <div>
                                                    <div style={{ fontWeight: 'bold', color: 'black', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        {item.type === 'group' && <span style={{ background: 'var(--color-yellow)', color: 'var(--color-green)', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>CATERING GROUP</span>}
                                                        {item.name}
                                                    </div>
                                                    {item.type === 'group' && <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '3px', lineHeight: '1.4' }}><b>Menu:</b> {item.details}</div>}
                                                    <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>Jumlah: {item.qty}x</div>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                <div style={{ fontWeight: 'bold', color: 'var(--color-green)', fontSize: '1.05rem', textAlign: 'right', minWidth: '110px' }}>
                                                    Rp {(item.price * item.qty).toLocaleString('id-ID')}
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} style={{ background: 'transparent', border: 'none', color: '#c62828', cursor: 'pointer', fontSize: '1.1rem', padding: '5px', transition: '0.2s' }} title="Hapus Pesanan">
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                    )}
                                </div>

                                <div className="chart-details-side" style={{ borderRadius: '20px', padding: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                                    <h2 style={{ fontStyle: 'italic', marginBottom: '25px', fontWeight: 'bold', color: 'white' }}>Ringkasan Belanja</h2>
                                    <div style={{ background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '25px', color: 'black' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem', color: '#555' }}>
                                            <span>Subtotal Produk:</span>
                                            <span>Rp {cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0).toLocaleString('id-ID')}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem', color: '#555' }}>
                                            <span>Pajak Restoran (PB1 10%):</span>
                                            <span>Rp {Math.round(cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0) * 0.1).toLocaleString('id-ID')}</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px dashed #eee', paddingTop: '15px', marginTop: '15px', fontWeight: 'bold', fontSize: '1.15rem', color: 'var(--color-green)' }}>
                                            <span>Total Pembayaran:</span>
                                            <span>Rp {Math.round(cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0) * 1.1).toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>
                                    <button className="checkout-btn" style={{ background: 'white', color: 'black', transition: '0.2s', fontStyle: 'normal', fontSize: '1.05rem' }} onClick={() => { if (cartItems.length === 0) return alert("Keranjang belanja kamu masih kosong!"); setShowPaymentGate(true); }}>
                                        <i className="fas fa-wallet"></i> Bayar &amp; Selesaikan Pesanan
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div style={{ background: 'white', border: '3px solid var(--color-green)', borderRadius: '20px', padding: '40px', color: 'black', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', maxWidth: '800px', margin: '0 auto' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', paddingBottom: '15px', marginBottom: '30px' }}>
                                    <div>
                                        <h3 style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--color-green)' }}>💳 Metode Pembayaran</h3>
                                        <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '3px' }}>Silakan pilih metode penyelesaian pembayaran katering Anda.</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#666' }}>Total Tagihan:</span>
                                        <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#2e7d32' }}>Rp {Math.round(cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0) * 1.1).toLocaleString('id-ID')}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                                    <div onClick={() => { setSelectedMethod('visa'); }} style={{ border: selectedMethod === 'visa' ? '3px solid var(--color-green)' : '2px solid #ddd', background: selectedMethod === 'visa' ? '#f4f7f6' : 'white', padding: '25px', borderRadius: '15px', cursor: 'pointer', textAlign: 'center', transition: '0.2s' }}>
                                        <div style={{ fontSize: '2rem', marginBottom: '10px', color: '#1a1f71' }}><i className="fab fa-cc-visa" style={{ marginRight: '10px' }}></i><i className="fab fa-cc-mastercard" style={{ marginRight: '10px' }}></i><i className="fas fa-university"></i></div>
                                        <h4 style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>Visa / Bank Transfer</h4>
                                        <p style={{ fontSize: '0.75rem', color: '#777', marginTop: '5px' }}>Mendukung kartu kredit & Virtual Account Mandiri, BCA, BNI.</p>
                                    </div>
                                    <div onClick={() => { setSelectedMethod('qris'); }} style={{ border: selectedMethod === 'qris' ? '3px solid var(--color-green)' : '2px solid #ddd', background: selectedMethod === 'qris' ? '#f4f7f6' : 'white', padding: '25px', borderRadius: '15px', cursor: 'pointer', textAlign: 'center', transition: '0.2s' }}>
                                        <div style={{ fontSize: '2rem', marginBottom: '10px', color: '#e53935' }}><i className="fas fa-qrcode"></i></div>
                                        <h4 style={{ fontWeight: 'bold', fontSize: '1.05rem' }}>QRIS (Scan QR Code)</h4>
                                        <p style={{ fontSize: '0.75rem', color: '#777', marginTop: '5px' }}>Bayar instan via GoPay, OVO, Dana, ShopeePay, atau m-Banking.</p>
                                    </div>
                                </div>
                                {selectedMethod === 'qris' && (
                                    <div style={{ background: '#f9f9f9', padding: '30px', borderRadius: '15px', textAlign: 'center', border: '1px solid #e0e0e0', marginBottom: '30px', animation: 'fadeIn 0.3s' }}>
                                        <p style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '15px' }}>Silakan Scan QRIS Resmi Dandelion Bake Di Bawah Ini:</p>
                                        <div style={{ background: 'white', padding: '15px', borderRadius: '10px', display: 'inline-block', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', marginBottom: '15px' }}>
                                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DandelionBakePayment" alt="QRIS Code" style={{ width: '180px', height: '180px' }} />
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: '#666' }}>💡 *Gunakan aplikasi pembayaran pilihanmu untuk melakukan pemindaian.*</p>
                                        <button onClick={() => { 
                                            alert("🎉 Pembayaran Berhasil!\nSistem kami mendeteksi mutasi dana aman. Roti Anda siap diproses di dapur!"); 
                                            const newOrder = {
                                                id: 'ORD-' + Math.floor(Math.random() * 100000) + 'X',
                                                date: '1 Juni 2026',
                                                total: Math.round(cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0) * 1.1),
                                                items: cartItems.map(item => ({ name: item.name, qty: item.qty })),
                                                status: 1
                                            };
                                            setActiveOrders(prev => [newOrder, ...prev]);
                                            setCartItems([]); 
                                            setShowPaymentGate(false); 
                                            setSelectedMethod(null); 
                                            switchView('order-tracking-view'); 
                                        }} style={{ marginTop: '20px', background: '#2e7d32', color: 'white', border: 'none', padding: '12px 35px', borderRadius: '25px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'block', margin: '20px auto 0 auto' }}>
                                            <i className="fas fa-check-circle"></i> Simulasikan Pembayaran Berhasil
                                        </button>
                                    </div>
                                )}
                                {selectedMethod === 'visa' && (
                                    <div style={{ background: '#f9f9f9', padding: '25px', borderRadius: '15px', textAlign: 'center', border: '1px solid #e0e0e0', marginBottom: '30px' }}>
                                        <p style={{ fontSize: '0.9rem', color: '#555' }}>Fitur Integrasi Kartu Kredit / Virtual Account sedang dikonfigurasi oleh tim IT.</p>
                                        <p style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-green)', marginTop: '5px' }}>Silakan gunakan opsi QRIS untuk uji coba transaksi instan.</p>
                                    </div>
                                )}
                                <button onClick={() => { setShowPaymentGate(false); setSelectedMethod(null); }} style={{ background: 'transparent', color: '#666', border: 'none', cursor: 'pointer', fontSize: '0.9rem', textDecoration: 'underline', display: 'block', margin: '0 auto' }}>‹ Batalkan &amp; Kembali ke Keranjang</button>
                            </div>
                        )}
                    </div>
                </section>

                {/* ====== VIEW: ORDER TRACKING ====== */}
                <section id="order-tracking-view" className={`view-section ${currentView === 'order-tracking-view' ? '' : 'hidden'}`}>
                    <div className="container" style={{ padding: '40px 0', maxWidth: '800px' }}>
                        <h2 style={{ fontStyle: 'italic', fontSize: '2.2rem', color: 'var(--color-green)', marginBottom: '30px', textAlign: 'center' }}>Lacak Pesanan Saya</h2>
                        
                        {activeOrders.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '15px', border: '1px solid #eee' }}>
                                <i className="fas fa-box-open" style={{ fontSize: '4rem', color: '#ccc', marginBottom: '15px' }}></i>
                                <h3 style={{ color: '#666' }}>Belum ada pesanan aktif</h3>
                                <button onClick={() => switchView('home-view')} style={{ marginTop: '15px', padding: '10px 25px', background: 'var(--color-green)', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Mulai Belanja</button>
                            </div>
                        ) : (
                            activeOrders.map(order => (
                                <div key={order.id} className="tracking-card">
                                    <div className="tracking-header">
                                        <div>
                                            <div style={{ fontWeight: 'bold', color: 'var(--color-green)', fontSize: '1.2rem' }}>{order.id}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '4px' }}>{order.date}</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '0.8rem', color: '#888' }}>Total Belanja</div>
                                            <div style={{ fontWeight: 'bold', color: '#2e7d32', fontSize: '1.2rem' }}>Rp {order.total.toLocaleString('id-ID')}</div>
                                        </div>
                                    </div>
                                    
                                    <div style={{ marginBottom: '25px', fontSize: '0.95rem', color: '#444', background: '#fafafa', padding: '15px', borderRadius: '10px', border: '1px solid #f0f0f0' }}>
                                        <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '0.85rem', color: '#888' }}>DAFTAR ITEM:</div>
                                        <ul style={{ paddingLeft: '15px', listStyleType: 'circle' }}>
                                            {order.items.map((i, idx) => (
                                                <li key={idx} style={{ marginBottom: '4px' }}><b>{i.qty}x</b> {i.name}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="tracking-stepper">
                                        <div className={`tracking-step ${order.status >= 1 ? (order.status === 1 ? 'step-active' : 'step-done') : ''}`}>
                                            <div className="step-icon"><i className="fas fa-receipt"></i></div>
                                            <div className="step-text">Dikonfirmasi</div>
                                        </div>
                                        <div className={`tracking-step ${order.status >= 2 ? (order.status === 2 ? 'step-active' : 'step-done') : ''}`}>
                                            <div className="step-icon"><i className="fas fa-fire-burner"></i></div>
                                            <div className="step-text">Diproses Dapur</div>
                                        </div>
                                        <div className={`tracking-step ${order.status >= 3 ? (order.status === 3 ? 'step-active' : 'step-done') : ''}`}>
                                            <div className="step-icon"><i className="fas fa-motorcycle"></i></div>
                                            <div className="step-text">Sedang Dikirim</div>
                                        </div>
                                        <div className={`tracking-step ${order.status >= 4 ? 'step-done' : ''}`}>
                                            <div className="step-icon"><i className="fas fa-check-double"></i></div>
                                            <div className="step-text">Selesai</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* ====== VIEW: STORE LOCATOR ====== */}
                <section id="store-view" className={`view-section ${currentView === 'store-view' ? '' : 'hidden'}`}>
                    <div className="container store-view" style={{ paddingTop: '20px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                            <i className="fas fa-satellite-dish" style={{ fontSize: '3.5rem', color: 'var(--color-green)', marginBottom: '15px' }}></i>
                            <h2 style={{ fontWeight: '900', fontSize: '2.5rem', color: 'var(--color-green)', marginBottom: '10px' }}>Dandelion Store Radar</h2>
                            <p style={{ fontSize: '1.1rem', color: '#555', maxWidth: '800px', margin: '0 auto 20px auto', lineHeight: '1.6' }}>
                                Temukan kelezatan terdekat. Cari jaringan outlet Dandelion Bake di seluruh Indonesia melalui peta interaktif kami.
                            </p>
                        </div>

                        <div className="search-bar-wrapper" style={{ maxWidth: '800px', margin: '0 auto 30px auto', display: 'flex', gap: '15px' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <i className="fas fa-search" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#888' }}></i>
                                <input 
                                    type="text" 
                                    className="store-search-input" 
                                    placeholder="Ketik nama kota (ex: Bandung)" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                    style={{ width: '100%', padding: '15px 20px 15px 50px', borderRadius: '30px', border: '2px solid #ddd', background: 'white', fontSize: '1rem', outline: 'none' }}
                                />
                            </div>
                            <button 
                                className="search-btn" 
                                onClick={() => {
                                    if (!searchQuery || searchQuery.trim() === '') {
                                        startStoreRadar();
                                    } else {
                                        handleSearch();
                                    }
                                }}
                                style={{ background: 'var(--color-green)', color: 'var(--color-yellow)', padding: '15px 40px', borderRadius: '30px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', minWidth: '150px', justifyContent: 'center' }}
                            >
                                Cari
                            </button>
                        </div>

                        {isScanning && (
                            <div style={{ padding: '20px 0', textAlign: 'center' }}>
                                <i className="fas fa-spinner fa-spin" style={{ fontSize: '3rem', color: 'var(--color-green)', marginBottom: '15px' }}></i>
                                <h3 style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.3rem' }}>Mencari sinyal GPS & Menghitung koordinat terdekat...</h3>
                                <p style={{ fontSize: '0.85rem', marginTop: '5px', opacity: 0.8 }}>📡 Memindai jaringan gerai Dandelion Bake Indonesia...</p>
                            </div>
                        )}
                        {!isScanning && scannedStore && (
                            <div style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', textAlign: 'left', color: 'black', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '25px', position: 'relative', overflow: 'hidden', maxWidth: '800px', margin: '0 auto 30px auto' }}>
                                <div className="scanning-bar"></div>
                                <div style={{ borderRadius: '10px', overflow: 'hidden', height: '100%', minHeight: '130px' }}>
                                    <img src={scannedStore.img} alt={scannedStore.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <div style={{ background: '#e8f5e9', color: '#2e7d32', display: 'inline-block', padding: '3px 10px', borderRadius: '15px', fontSize: '0.75rem', fontWeight: 'bold', width: 'fit-content', marginBottom: '8px' }}>🎯 RADAR BERHASIL MENEMUKAN OUTLET!</div>
                                    <h3 style={{ color: 'var(--color-green)', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '4px' }}>{scannedStore.name}</h3>
                                    <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '12px' }}><i className="fas fa-map-marker-alt"></i> {scannedStore.address}</p>
                                    <div style={{ border: '2px dashed #AA7C11', background: '#fffde7', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '15px' }}>🎉 Kado Radar: Klaim donut gratis dengan kode kupon <b style={{ color: '#AA7C11', letterSpacing: '1px' }}>RADARDANDELION</b> di kasir outlet ini!</div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <button onClick={() => teleportToScannedStore(scannedStore)} style={{ background: 'var(--color-green)', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer' }}>📍 Buka di Peta</button>
                                        <button onClick={() => setScannedStore(null)} style={{ background: '#eee', color: '#333', border: 'none', padding: '8px 15px', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer' }}>Tutup</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div id="map" className="map-container" ref={mapRef}></div>

                        <div className="store-grid section-pad" style={{ paddingBottom: '30px' }}>
                            {(showAllStores ? storeLocations : storeLocations.slice(0, 8)).map((store) => (
                                <div id={`store-card-${store.id}`} key={store.id} className={`store-card ${highlightedStoreId === store.id ? 'highlighted' : ''}`} onClick={() => focusMapOnStore(store.lat, store.lng)}>
                                    <img src={store.img} alt={store.name} className="store-card-img" />
                                    <div className="store-card-content">
                                        <div className="store-card-title">{store.name}</div>
                                        <div className="store-card-address"><i className="fas fa-map-marker-alt" style={{ marginTop: '2px' }}></i> {store.address}</div>
                                        <button className="store-card-btn">Lihat di Peta</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!showAllStores && (
                            <div style={{ textAlign: 'center', paddingBottom: '50px' }}>
                                <button onClick={() => setShowAllStores(true)} style={{ backgroundColor: 'var(--color-green)', color: 'white', padding: '12px 40px', borderRadius: '30px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>View All</button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <footer>
                <div className="footer-contact-banner" style={{ minHeight: '280px', display: (currentView === 'rewards-view' || currentView === 'group-order-view' || currentView === 'chart-view' || currentView === 'store-view' || currentView === 'order-tracking-view') ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="container" style={{ maxWidth: '1200px', width: '100%' }}> 
                        {currentView === 'news-view' ? (
                            <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
                                {!isOpeningBox && !luckyPrize && (
                                    <div>
                                        <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '10px' }}>🎁 Dandelion Daily Lucky Box</h2>
                                        <p style={{ fontSize: '0.95rem', marginBottom: '25px', opacity: 0.9 }}>Raih keberuntungan Ekstramu hari ini! Klik tombol di bawah untuk membuka kotak misteri harian dan dapatkan *secret voucher* tambahan secara acak.</p>
                                        <button className="contact-btn btn-dark" onClick={handleOpenLuckyBox} style={{ padding: '12px 35px', fontSize: '1rem', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--color-green)', color: 'white', border: 'none' }}><i className="fas fa-box-open fa-bounce"></i> Buka Kotak Keberuntungan</button>
                                    </div>
                                )}
                                {isOpeningBox && (
                                    <div style={{ padding: '20px 0' }}>
                                        <i className="fas fa-gift fa-spin" style={{ fontSize: '3.5rem', color: 'var(--color-green)', marginBottom: '15px' }}></i>
                                        <h3 style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.3rem' }}>Membuka kotak kebahagiaan kamu... 🪄</h3>
                                        <p style={{ fontSize: '0.85rem', marginTop: '5px', opacity: 0.8 }}>Mengacak kupon rahasia dari oven Dandelion Bake...</p>
                                    </div>
                                )}
                                {!isOpeningBox && luckyPrize && (
                                    <div style={{ background: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)', color: 'black', maxWidth: '550px', margin: '0 auto', border: '3px solid #AA7C11' }}>
                                        <span style={{ fontSize: '2.5rem' }}>🎉</span>
                                        <h3 style={{ color: 'var(--color-green)', fontWeight: 'bold', fontSize: '1.4rem', marginTop: '5px', marginBottom: '5px' }}>{luckyPrize.name}</h3>
                                        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '15px' }}>{luckyPrize.desc}</p>
                                        <div style={{ background: '#fffde7', border: '2px dashed #AA7C11', padding: '12px', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', letterSpacing: '2px', color: '#AA7C11', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                                            <span>{luckyPrize.code}</span>
                                            <button onClick={() => { navigator.clipboard.writeText(luckyPrize.code); alert("📋 Kode kupon harian berhasil disalin!"); }} style={{ background: 'var(--color-green)', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '5px', fontSize: '0.75rem', cursor: 'pointer', letterSpacing: 'normal' }}>Salin</button>
                                        </div>
                                        <button onClick={() => setLuckyPrize(null)} style={{ background: '#eee', color: '#333', border: 'none', padding: '8px 20px', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 'bold' }}>Coba Keberuntungan Lagi</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                                <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '10px' }}>Bingung Cari Store? Kami Siap Bantu</h2>
                                <p style={{ fontSize: '0.95rem', marginBottom: '25px', opacity: 0.9 }}>Dandelion Bake siap membantu kamu menemukan outlet terdekat, menjawab pertanyaan menu, atau mengurus pesanan khusus. Hubungi customer service kami via WhatsApp.</p>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                                    <button className="contact-btn btn-dark" onClick={() => window.open('https://wa.me/6282140506224', '_blank')}><i className="fab fa-whatsapp"></i> WhatsApp Customer Service</button>
                                    <button className="contact-btn btn-outline" onClick={() => switchView('store-view')}><i className="fas fa-store"></i> Buka Peta Outlet</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                    
                <div className="container footer-links-section">
                    <div className="footer-col footer-about">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <img src={LOGO_URL} alt="Dandelion Bake Logo" style={{ height: '120px', width: 'auto', marginBottom: '10px' }} />
                        </div>
                        <p style={{ textAlign: 'left', color: '#e0bb66', fontSize: '0.9rem', lineHeight: '1.6', paddingRight: '20px' }}>"Dandelion Bake adalah tempat di mana keahlian tangan bertemu dengan harapan yang mekar. Kami tidak hanya menyajikan roti, kami menyajikan momen kehangatan yang mekar di setiap gigitan, memastikan bahwa kelezatan yang dirasakan hari ini akan menjadi kerinduan yang tersebar esok hari."</p>
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
                                <img src={HALAL_URL} alt="Halal" style={{ width: '45px', height: 'auto' }} />
                            </div>
                    </div>
                    <div className="footer-col">
                        <h3>Menu</h3>
                        <ul><li>Cemilan Manis</li><li>Cookies</li><li>Donat Favorit</li><li>Exclusive by Dandelion Bake</li><li>Product Viral</li><li>Special Pilihan Acara</li><li>Roti Hemat</li></ul>
                    </div>
                    <div className="footer-col">
                            <h3>Layanan</h3>
                        <ul><li>Pesanan Korporat</li><li>Snack Box &amp; Meeting</li><li>Promo</li><li>Karir</li><li>Katalog</li></ul>
                    </div>
                        <div className="footer-col">
                        <h3 style={{ fontSize: '1.3rem' }}>Sosial</h3>
                        <div className="social-icons" style={{ fontSize: '2.5rem', gap: '20px', marginBottom: '35px' }}>
                            <i className="fab fa-instagram"></i><i className="fab fa-twitter"></i><i className="fab fa-youtube"></i>
                        </div>
                        <h3 style={{ fontSize: '1.3rem' }}>Hubungi kami</h3>
                        <div className="contact-info-footer" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <i className="fas fa-truck" style={{ fontSize: '3.5rem' }}></i>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '1.4rem', marginBottom: '2px', lineHeight: '1.2' }}>Dandelion Bake</div>
                                <div style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>+62 821-4050-6224</div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* MODALS */}
            {showGlobalSearch && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: 'white', width: '90%', maxWidth: '550px', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', position: 'relative' }}>
                        <button onClick={() => { setShowGlobalSearch(false); setGlobalSearchInput(''); }} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#888' }}>&times;</button>
                        
                        <h3 style={{ fontWeight: 'bold', color: 'var(--color-green)', marginBottom: '15px', fontStyle: 'normal' }}><i className="fas fa-search"></i> Cari Menu Dandelion Bake</h3>
                        <input type="text" placeholder="Ketik nama kue atau roti (contoh: cronut, brownies, cake)..." value={globalSearchInput} onChange={(e) => setGlobalSearchInput(e.target.value)} style={{ width: '100%', padding: '12px 20px', borderRadius: '30px', border: '2px solid var(--color-green)', fontSize: '1rem', outline: 'none', marginBottom: '20px' }} autoFocus />

                        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                            {globalSearchInput.trim() !== '' && bestSellingItems.filter(item => item.name.toLowerCase().includes(globalSearchInput.toLowerCase())).map((item, idx) => (
                                <div key={idx} onClick={() => { simulateProductClick(item.name, item.price, item.img); setShowGlobalSearch(false); setGlobalSearchInput(''); }} style={{ display: 'flex', gap: '15px', alignItems: 'center', padding: '10px', borderRadius: '10px', cursor: 'pointer', marginBottom: '8px', border: '1px solid #eee', background: '#fefefe' }}>
                                    <img src={item.img} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'black' }}>{item.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 'bold', marginTop: '2px' }}>Rp {item.price.toLocaleString('id-ID')}</div>
                                    </div>
                                    <i className="fas fa-chevron-right" style={{ color: '#ccc', fontSize: '0.8rem' }}></i>
                                </div>
                            ))}
                            {globalSearchInput.trim() !== '' && bestSellingItems.filter(item => item.name.toLowerCase().includes(globalSearchInput.toLowerCase())).length === 0 && (
                                <div style={{ textAlign: 'center', color: '#888', padding: '20px 0', fontSize: '0.9rem', fontStyle: 'italic' }}>Menu bakery tidak ditemukan...</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {showProfileModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: 'white', width: '90%', maxWidth: '400px', borderRadius: '20px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', position: 'relative', textAlign: 'center' }}>
                        <button onClick={() => setShowProfileModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#888' }}>&times;</button>
                        
                        <div style={{ width: '80px', height: '80px', background: 'var(--color-yellow)', color: 'var(--color-green)', borderRadius: '50%', margin: '0 auto 15px auto', fontSize: '2.5rem', fontWeight: 'bold' }} className="flex-center">
                            <i className="far fa-user"></i>
                        </div>
                        <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', margin: '0', color: 'black' }}>Dandelion Lovers</h3>
                        <p style={{ fontSize: '0.8rem', color: '#777', marginTop: '2px' }}>Member sejak September 2025</p>

                        <div style={{ background: 'linear-gradient(135deg, #14403a 0%, #0d2b27 100%)', color: 'white', borderRadius: '15px', padding: '20px', margin: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ textAlign: 'left' }}>
                                <span style={{ fontSize: '0.75rem', opacity: 0.8, letterSpacing: '1px' }}>STATUS AKUN</span>
                                <div style={{ color: 'var(--color-yellow)', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '2px' }}>GOLD MEMBER</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>LIVE POIN</span>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginTop: '2px' }}><i className="fas fa-star" style={{ color: 'var(--color-yellow)', fontSize: '1.1rem' }}></i> {points.toLocaleString('id-ID')}</div>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button onClick={() => { setShowProfileModal(false); switchView('rewards-view'); }} style={{ width: '100%', padding: '10px', background: 'var(--color-yellow)', border: 'none', borderRadius: '25px', color: 'black', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}>
                                Tukarkan Hadiah Poin
                            </button>
                            <button onClick={() => { setShowProfileModal(false); alert("Sistem Logout Berhasil!"); }} style={{ width: '100%', padding: '10px', background: 'transparent', border: 'none', color: '#c62828', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline' }}>
                                Keluar Akun
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}