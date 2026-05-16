"use client";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/contexts/cardContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineShieldCheck, 
  HiOutlineCreditCard, 
  HiOutlineArrowLeft, 
  HiOutlineTruck, 
  HiOutlineCheckCircle,
  HiSparkles,
  HiOutlineLockClosed
} from "react-icons/hi2";
import { Button } from "@/components/common/Button";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "Sri Lanka",
    cardNumber: "", cardName: "", expiryDate: "", cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.address.trim()) newErrors.address = "Required";
    if (!formData.city.trim()) newErrors.city = "Required";
    if (!formData.zip.trim()) newErrors.zip = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
      setTimeout(() => clearCart(), 1000);
    }, 2500);
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-black text-white italic italic">EMPTY CARGO.</h2>
          <Button onClick={() => router.push("/")}>Back to Hangar</Button>
        </div>
      </div>
    );
  }

  const shipping = total >= 250 ? 0 : 15;
  const tax = total * 0.1;
  const grandTotal = total + shipping + tax;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => step === 1 ? router.back() : setStep(step - 1)}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group"
            >
              <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Return to Base</span>
            </motion.button>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic leading-none">
              CHECKOUT<span className="text-blue-600 text-5xl md:text-7xl">.</span>
            </h1>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-6 bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-xl">
             <StepIcon number={1} active={step >= 1} completed={step > 1} label="LOGISTICS" />
             <div className={`w-12 h-px ${step > 1 ? 'bg-blue-500' : 'bg-white/10'}`} />
             <StepIcon number={2} active={step >= 2} completed={step > 2} label="PAYMENT" />
             <div className={`w-12 h-px ${step > 2 ? 'bg-blue-500' : 'bg-white/10'}`} />
             <StepIcon number={3} active={step >= 3} completed={step > 3} label="CONFIRM" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            >
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem]">
                  <h2 className="text-2xl font-black italic mb-8 flex items-center gap-3">
                    <HiOutlineTruck className="text-blue-500" />
                    DELIVERY LOGISTICS
                  </h2>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField label="FIRST NAME" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
                    <InputField label="LAST NAME" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
                    <div className="md:col-span-2">
                      <InputField label="EMAIL IDENTITY" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                    </div>
                    <div className="md:col-span-2">
                      <InputField label="PHYSICAL ADDRESS" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
                    </div>
                    <InputField label="CITY" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
                    <InputField label="ZIP CODE" name="zip" value={formData.zip} onChange={handleChange} error={errors.zip} />
                    
                    <div className="md:col-span-2 pt-6">
                      <Button fullWidth size="xl" onClick={(e) => { e.preventDefault(); if(validateShipping()) setStep(2); }}>
                        INITIALIZE PAYMENT
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              <OrderSummary items={items} total={total} shipping={shipping} tax={tax} grandTotal={grandTotal} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            >
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem]">
                  <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl font-black italic flex items-center gap-3">
                      <HiOutlineCreditCard className="text-blue-500" />
                      ENCRYPTED VAULT
                    </h2>
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                       <HiOutlineLockClosed className="text-green-500 text-xs" />
                       <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">SSL Secure</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
                    {/* 3D Credit Card Preview */}
                    <div className="perspective-[1000px] h-[240px] w-full">
                      <motion.div
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="relative w-full h-full preserve-3d"
                      >
                        {/* Card Front */}
                        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl border border-white/20">
                          <div className="flex justify-between items-start">
                            <div className="w-12 h-10 bg-yellow-400/50 rounded-lg backdrop-blur-md border border-white/20" />
                            <HiSparkles className="text-white/40 text-3xl" />
                          </div>
                          <div className="space-y-4">
                            <p className="text-2xl font-mono tracking-[0.3em] text-white/90">
                              {formData.cardNumber || "•••• •••• •••• ••••"}
                            </p>
                            <div className="flex justify-between uppercase">
                              <div className="space-y-1">
                                <p className="text-[8px] text-white/40 font-black tracking-widest">Card Holder</p>
                                <p className="text-sm font-bold tracking-widest truncate max-w-[150px]">{formData.cardName || "Full Name"}</p>
                              </div>
                              <div className="space-y-1 text-right">
                                <p className="text-[8px] text-white/40 font-black tracking-widest">Expires</p>
                                <p className="text-sm font-bold tracking-widest">{formData.expiryDate || "MM/YY"}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Card Back */}
                        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl py-8 flex flex-col justify-between shadow-2xl border border-white/20" style={{ transform: "rotateY(180deg)" }}>
                          <div className="w-full h-12 bg-black/80 mt-4" />
                          <div className="px-8 flex justify-end">
                            <div className="bg-white/10 w-24 h-10 rounded flex items-center justify-end px-4">
                               <p className="font-mono italic text-white/90">{formData.cvv || "•••"}</p>
                            </div>
                          </div>
                          <div className="px-8 pb-4">
                             <p className="text-[7px] text-white/20 leading-tight">This terminal link is encrypted. Unauthorized access is strictly prohibited. Powered by 3D Tech Store Nexus.</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Payment Form */}
                    <form className="space-y-6">
                      <InputField label="CARD NUMBER" name="cardNumber" value={formData.cardNumber} onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "").slice(0, 16);
                        val = val.replace(/(\d{4})/g, "$1 ").trim();
                        handleChange({ target: { name: "cardNumber", value: val } });
                      }} />
                      <InputField label="CARDHOLDER NAME" name="cardName" value={formData.cardName} onChange={handleChange} />
                      <div className="grid grid-cols-2 gap-6">
                        <InputField label="EXPIRY" name="expiryDate" value={formData.expiryDate} onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.length >= 2) val = val.slice(0, 2) + "/" + val.slice(2, 4);
                          handleChange({ target: { name: "expiryDate", value: val } });
                        }} />
                        <InputField 
                          label="CVV" 
                          name="cvv" 
                          value={formData.cvv} 
                          onFocus={() => setIsFlipped(true)}
                          onBlur={() => setIsFlipped(false)}
                          onChange={(e) => handleChange({ target: { name: "cvv", value: e.target.value.replace(/\D/g, "").slice(0, 3) } })} 
                        />
                      </div>
                      <Button fullWidth size="xl" loading={loading} onClick={handlePlaceOrder}>
                        COMPLETE TRANSACTION
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
              <OrderSummary items={items} total={total} shipping={shipping} tax={tax} grandTotal={grandTotal} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-16 rounded-[4rem] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-600/20 blur-[100px] -z-10" />
                
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_80px_rgba(37,99,235,0.6)] border-4 border-white/20"
                >
                  <HiOutlineCheckCircle className="text-white text-6xl" />
                </motion.div>

                <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">TRANSACTION SUCCESS<span className="text-blue-500">.</span></h2>
                <p className="text-gray-500 font-bold uppercase tracking-[0.3em] mb-12">System update complete. Delivery initialized.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left bg-white/5 p-8 rounded-3xl border border-white/10 mb-12">
                   <div>
                      <p className="text-[10px] text-gray-600 font-black tracking-widest uppercase mb-1">Order Sequence</p>
                      <p className="text-xl font-bold italic tracking-tight">#{Math.floor(Math.random()*1000000).toString().padStart(7, '0')}</p>
                   </div>
                   <div>
                      <p className="text-[10px] text-gray-600 font-black tracking-widest uppercase mb-1">Arrival Status</p>
                      <p className="text-xl font-bold italic tracking-tight text-blue-400 uppercase">Processing</p>
                   </div>
                </div>

                <Button size="xl" onClick={() => router.push("/allCategories")}>
                  CONTINUE SHOPPING
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

const StepIcon = ({ number, active, completed, label }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-[11px] font-black border-2 transition-all duration-500 ${
      completed ? "bg-blue-600 border-blue-400 text-white" : 
      active ? "border-blue-600 text-blue-500 bg-blue-500/10 shadow-[0_0_20px_rgba(37,99,235,0.3)] scale-110" : 
      "border-white/10 text-gray-600"
    }`}>
      {completed ? <HiOutlineCheckCircle size={20} /> : number}
    </div>
    <span className={`text-[8px] font-black tracking-widest uppercase ${active ? "text-white" : "text-gray-600"}`}>{label}</span>
  </div>
);

const InputField = ({ label, name, value, onChange, error, type = "text", onFocus, onBlur }) => (
  <div className="space-y-2 group">
    <label className="text-[9px] font-black tracking-[0.3em] text-gray-600 group-focus-within:text-blue-500 transition-colors uppercase">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      className={`w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm font-bold tracking-widest focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all ${error ? "border-red-500/50" : ""}`}
      placeholder={`---`}
    />
    {error && <p className="text-[9px] text-red-500 font-bold uppercase tracking-widest pl-2">{error}</p>}
  </div>
);

const OrderSummary = ({ items, total, shipping, tax, grandTotal }) => (
  <div className="lg:col-span-1">
    <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-8 rounded-[3rem] sticky top-32 space-y-8">
      <h3 className="text-xl font-black italic border-b border-white/5 pb-6">CARGO LOAD</h3>
      
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item) => (
          <div key={item._id} className="flex gap-4 group">
            <div className="relative w-16 h-16 bg-white/5 rounded-2xl overflow-hidden border border-white/10 p-2">
              <Image src={item.image} alt={item.name} fill className="object-contain group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="text-[11px] font-black italic tracking-tight line-clamp-1 group-hover:text-blue-400 transition-colors">{item.name}</h4>
              <div className="flex justify-between items-baseline">
                <span className="text-[9px] text-gray-600 font-bold tracking-widest uppercase">Qty: {item.quantity}</span>
                <span className="text-sm font-black italic">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-6 border-t border-white/5">
        <div className="flex justify-between text-[10px] font-bold tracking-widest text-gray-500">
          <span>SUBTOTAL</span>
          <span className="text-white">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[10px] font-bold tracking-widest text-gray-500">
          <span>LOGISTICS</span>
          <span className={shipping === 0 ? "text-green-500" : "text-white"}>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-[10px] font-bold tracking-widest text-gray-500">
          <span>PROTO-TAX</span>
          <span className="text-white">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-end pt-4">
          <span className="text-[10px] font-black tracking-widest text-blue-500">TOTAL COST</span>
          <span className="text-4xl font-black italic leading-none text-white">${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  </div>
);