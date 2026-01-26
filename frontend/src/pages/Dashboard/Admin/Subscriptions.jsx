import { useState } from 'react';

// Reusable Plan Card Component
const PlanCard = ({ plan, onEdit }) => {
    const isBestValue = plan.id === 3;
    
    return (
        <div className={`relative border rounded-[2.5rem] p-10 flex flex-col items-center text-center transition-all duration-300 bg-white
            ${isBestValue ? "border-red-600 scale-105 shadow-[0_20px_50px_rgba(220,38,38,0.15)] z-10 ring-2 ring-red-500/10" : "border-black shadow-sm"}`}>
            
            {isBestValue && (
                <div className="absolute -top-4 bg-red-600 text-white text-[10px] font-black px-5 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Best Value
                </div>
            )}

            <h3 className="text-lg font-bold text-black mb-4">{plan.name}</h3>
            <p className="text-2xl font-black text-red-600 mb-6">LKR {plan.price}</p>
            
            <div className="flex-grow flex items-center mb-8 h-12">
                <p className="text-gray-500 text-sm font-medium leading-relaxed">{plan.desc}</p>
            </div>

            <button
                onClick={() => onEdit(plan)}
                className={`w-full py-3 font-bold border transition-all duration-200 uppercase text-xs tracking-wider
                    ${isBestValue ? "bg-red-600 text-white border-red-600 hover:bg-black hover:border-black" : "bg-gray-200 text-black border-red-500 hover:bg-red-600 hover:text-white"}`}>
                Edit Plan
            </button>
        </div>
    );
};

const Subscriptions = () => {
    const [plans, setPlans] = useState([
        { id: 1, name: '1 month Plan', price: '5000', desc: 'Standard Montly Accesss' },
        { id: 2, name: '6 months Plan', price: '25 000', desc: 'Save ~16% on half-yearly' },
        { id: 3, name: '12 months Plan', price: '45 000', desc: 'Best value! Save ~25%' }
    ]);
    const [editingPlan, setEditingPlan] = useState(null);

    const handleUpdatePlan = (e) => {
        e.preventDefault();
        setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
        setEditingPlan(null);
    };

    return (
        <div className="p-10 max-w-6xl mx-auto font-sans bg-white min-h-screen text-black">
            <h2 className="text-3xl font-extrabold mb-12">Subscription Plans</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
                {plans.map(plan => (
                    <PlanCard key={plan.id} plan={plan} onEdit={setEditingPlan} />
                ))}
            </div>

            {editingPlan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
                    <div className="bg-white p-8 rounded-[2rem] border border-black w-full max-w-md shadow-2xl relative">
                        <button onClick={() => setEditingPlan(null)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>

                        <h3 className="text-xl font-black mb-6 uppercase">Edit {editingPlan.name}</h3>
                        
                        <form onSubmit={handleUpdatePlan} className="space-y-5 text-left">
                            {['price', 'desc'].map((field) => (
                                <div key={field}>
                                    <label className="block text-[10px] font-black mb-2 uppercase text-gray-400 tracking-widest">{field === 'price' ? 'Price (LKR)' : 'Description'}</label>
                                    {field === 'price' ? (
                                        <input className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-red-500 outline-none font-bold" value={editingPlan.price} onChange={e => setEditingPlan({...editingPlan, price: e.target.value})} />
                                    ) : (
                                        <textarea className="w-full border-2 border-gray-100 p-3 rounded-xl focus:border-red-500 outline-none font-medium text-sm" rows="3" value={editingPlan.desc} onChange={e => setEditingPlan({...editingPlan, desc: e.target.value})} />
                                    )}
                                </div>
                            ))}
                            <div className="flex space-x-3 pt-4">
                                <button type="submit" className="flex-1 bg-red-600 text-white py-3 font-bold rounded-xl hover:bg-black transition-colors">Save Changes</button>
                                <button type="button" onClick={() => setEditingPlan(null)} className="flex-1 bg-gray-100 text-gray-600 py-3 font-bold rounded-xl">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subscriptions;
