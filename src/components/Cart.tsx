import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { ArrowLeft, ShoppingCart, Trash2, Info, Plus, X } from 'lucide-react';

export default function Cart() {
    const { id } = useParams(); // trip id
    const { getToken } = useAuth();
    const navigate = useNavigate();

    // UI state for items added locally
    const [items, setItems] = useState<any[]>([]);

    const [showAddItem, setShowAddItem] = useState(false);
    const [newItemName, setNewItemName] = useState('');
    const [newItemDesc, setNewItemDesc] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemName || !newItemPrice) return;

        const newItem = {
            id: Date.now(),
            name: newItemName,
            description: newItemDesc || 'Custom Item',
            price: parseFloat(newItemPrice),
            quantity: 1,
            is_urgent: isUrgent,
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=200&auto=format&fit=crop" // Default grocery bag image
        };

        setItems([...items, newItem]);
        setShowAddItem(false);
        setNewItemName('');
        setNewItemDesc('');
        setNewItemPrice('');
        setIsUrgent(false);
    };

    const handleConfirmRequest = async () => {
        if (items.length === 0 || !id || isSubmitting) return;
        setIsSubmitting(true);
        try {
            const token = await getToken();

            // Loop and submit all requests
            // In a better design, bulk insert API should be used, but we'll use a Promise.all over existing endpoint
            await Promise.all(items.map(async (item) => {
                const payload = {
                    item_name: item.name + (item.description ? ` (${item.description})` : ''),
                    quantity: item.quantity,
                    max_budget: item.price * item.quantity,
                    is_urgent: item.is_urgent
                };

                await fetch(`http://localhost:3000/api/requests/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });
            }));

            // Clear and redirect back
            setItems([]);
            navigate(`/trip/${id}`);
        } catch (error) {
            console.error("Failed to confirm requests", error);
            alert("Error confirming requests");
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateQuantity = (id: number, delta: number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
    };

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceFee = 50.00; // Mock fee
    const total = subtotal + (items.length > 0 ? serviceFee : 0);

    return (
        <div className="bg-[#f6f8f8] dark:bg-[#2C3531] font-display text-slate-900 dark:text-[#D1E8E2] min-h-screen flex flex-col">
            <nav className="bg-[#2C3531]/70 backdrop-blur-md border-b border-[#D1E8E2]/10 sticky top-0 z-50 flex items-center justify-between p-4 h-16">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gradient-to-br from-[#36413c] to-[#262e2b] shadow-[3px_3px_6px_#1e2421,-2px_-2px_6px_#3a4641] flex items-center justify-center size-10 rounded-full text-[#D1E8E2]"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-bold tracking-tight text-[#D1E8E2]">Your Cart</h1>
                <div className="size-10 flex items-center justify-end relative">
                    <ShoppingCart className="text-[#D9B08C] w-6 h-6" />
                    {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#FFCB9A] text-[#2C3531] text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[#2C3531]">
                            {items.length}
                        </span>
                    )}
                </div>
            </nav>

            <main className="flex-1 p-4 space-y-6 overflow-y-auto pb-48">
                {items.length === 0 ? (
                    <div className="text-center p-8 mt-10">
                        <p className="text-[#D9B08C]">Your cart is empty.</p>
                    </div>
                ) : (
                    items.map(item => (
                        <div key={item.id} className="bg-gradient-to-br from-[#323d38] to-[#28302c] shadow-[8px_8px_16px_#1e2421,-4px_-4px_12px_#3a4641] rounded-xl p-4 flex gap-4 border border-[#D1E8E2]/5">
                            <div className="size-24 rounded-lg bg-[#2C3531] shadow-[inset_4px_4px_8px_#1e2421,inset_-4px_-4px_8px_#3a4641] overflow-hidden flex-shrink-0">
                                <div
                                    className="w-full h-full bg-cover bg-center opacity-80"
                                    style={{ backgroundImage: `url('${item.image}')` }}
                                />
                            </div>
                            <div className="flex flex-col justify-between flex-1">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-[#D1E8E2]">{item.name}</h3>
                                        <div className="flex items-center gap-2">
                                            {item.is_urgent && (
                                                <span className="bg-red-500/20 text-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Urgent</span>
                                            )}
                                            <button onClick={() => removeItem(item.id)} className="text-[#D9B08C]/60 hover:text-[#FFCB9A]">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-[#D9B08C]">{item.description}</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-[#116466] text-lg">₹{item.price.toFixed(2)}</span>
                                    <div className="flex items-center gap-3 bg-[#2C3531] shadow-[inset_4px_4px_8px_#1e2421,inset_-4px_-4px_8px_#3a4641] rounded-full p-1 px-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="bg-gradient-to-br from-[#36413c] to-[#262e2b] shadow-[3px_3px_6px_#1e2421,-2px_-2px_6px_#3a4641] size-6 rounded-full flex items-center justify-center text-xs text-[#D1E8E2]"
                                        >
                                            -
                                        </button>
                                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="bg-gradient-to-br from-[#36413c] to-[#262e2b] shadow-[3px_3px_6px_#1e2421,-2px_-2px_6px_#3a4641] size-6 rounded-full flex items-center justify-center text-xs text-[#D1E8E2]"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}

                {!showAddItem ? (
                    <button
                        onClick={() => setShowAddItem(true)}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl border border-dashed border-[#D1E8E2]/20 text-[#D9B08C] hover:bg-[#D1E8E2]/5 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-bold">Add Custom Item</span>
                    </button>
                ) : (
                    <div className="bg-[#2C3531] shadow-[inset_4px_4px_8px_#1e2421,inset_-4px_-4px_8px_#3a4641] rounded-xl p-4 border border-[#D1E8E2]/5 relative py-6 mt-4">
                        <button
                            onClick={() => setShowAddItem(false)}
                            className="absolute top-4 right-4 text-[#D9B08C]/60 hover:text-[#FFCB9A]"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="font-bold text-[#D1E8E2] mb-4">New Request Item</h3>
                        <form onSubmit={handleAddItem} className="space-y-4">
                            <div>
                                <input
                                    required
                                    type="text"
                                    placeholder="Item Name (e.g. Milk 1L)"
                                    value={newItemName}
                                    onChange={e => setNewItemName(e.target.value)}
                                    className="w-full bg-[#1A1F1D] border-none rounded-xl p-3 text-[#D1E8E2] placeholder:text-[#D1E8E2]/30 focus:ring-1 focus:ring-[#116466]"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Description / Brand (Optional)"
                                    value={newItemDesc}
                                    onChange={e => setNewItemDesc(e.target.value)}
                                    className="w-full bg-[#1A1F1D] border-none rounded-xl p-3 text-[#D1E8E2] placeholder:text-[#D1E8E2]/30 focus:ring-1 focus:ring-[#116466]"
                                />
                            </div>
                            <div>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    placeholder="Estimated Price (₹)"
                                    value={newItemPrice}
                                    onChange={e => setNewItemPrice(e.target.value)}
                                    className="w-full bg-[#1A1F1D] border-none rounded-xl p-3 text-[#D1E8E2] placeholder:text-[#D1E8E2]/30 focus:ring-1 focus:ring-[#116466]"
                                />
                            </div>
                            <div className="flex items-center justify-between bg-[#1A1F1D] rounded-xl p-3">
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm text-[#D1E8E2]">Mark as Urgent?</span>
                                    <span className="text-[10px] text-red-400">Notifies the courier immediately</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={isUrgent} onChange={() => setIsUrgent(!isUrgent)} />
                                    <div className="w-11 h-6 bg-[#2C3531] rounded-full peer peer-checked:bg-red-500/50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-red-400 after:border-white after:border after:rounded-full after:h-5 after:w-5 transition-all peer-checked:after:translate-x-full"></div>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-br from-[#116466] to-[#0f5a5c] shadow-[0_4px_0_#0a3d3e,0_8px_15px_rgba(0,0,0,0.4)] active:translate-y-1 active:shadow-[0_2px_0_#0a3d3e,0_4px_10px_rgba(0,0,0,0.4)] text-white font-bold py-3 rounded-xl transition-all"
                            >
                                Add to Request
                            </button>
                        </form>
                    </div>
                )}

                <div className="p-4 bg-[#2C3531] shadow-[inset_4px_4px_8px_#1e2421,inset_-4px_-4px_8px_#3a4641] rounded-xl border border-[#D1E8E2]/5">
                    <div className="flex items-center gap-3 mb-2">
                        <Info className="w-5 h-5 text-[#FFCB9A]" />
                        <p className="text-xs text-[#D9B08C] font-medium">Add items you want to request from this trip. Fees apply.</p>
                    </div>
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 p-6 space-y-4 bg-[#2C3531]/70 backdrop-blur-md rounded-t-xl border-t border-[#D1E8E2]/10 z-50">
                <div className="bg-[#2C3531] shadow-[inset_4px_4px_8px_#1e2421,inset_-4px_-4px_8px_#3a4641] rounded-xl p-4 border border-[#D1E8E2]/5">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[#D9B08C] text-sm">Subtotal</span>
                        <span className="text-[#D1E8E2] font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[#D9B08C] text-sm">Service Fee</span>
                        <span className="text-[#D1E8E2] font-medium">₹{items.length > 0 ? serviceFee.toFixed(2) : "0.00"}</span>
                    </div>
                    <div className="h-px bg-[#D1E8E2]/10 w-full mb-3"></div>
                    <div className="flex justify-between items-center">
                        <span className="text-[#D1E8E2] font-bold text-lg">Estimated Total</span>
                        <span className="text-[#116466] font-extrabold text-xl tracking-tight">₹{total.toFixed(2)}</span>
                    </div>
                </div>
                <button
                    onClick={handleConfirmRequest}
                    disabled={items.length === 0 || isSubmitting}
                    className="w-full bg-gradient-to-br from-[#116466] to-[#0f5a5c] shadow-[0_4px_0_#0a3d3e,0_8px_15px_rgba(0,0,0,0.4)] active:translate-y-1 active:shadow-[0_2px_0_#0a3d3e,0_4px_10px_rgba(0,0,0,0.4)] transition-all h-14 rounded-xl flex items-center justify-center gap-2 group disabled:opacity-50 disabled:pointer-events-none"
                >
                    <span className="text-white font-bold text-lg">{isSubmitting ? 'Submitting...' : 'Confirm Request'}</span>
                    {!isSubmitting && <ArrowLeft className="w-5 h-5 text-white transition-transform group-hover:translate-x-1 rotate-180" />}
                </button>
            </footer>
        </div>
    );
}
