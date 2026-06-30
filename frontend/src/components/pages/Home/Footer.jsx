import {FaFacebookF,FaInstagram,FaLinkedinIn,FaTwitter,FaLeaf,FaPaperPlane,FaPhoneAlt,FaEnvelope,FaMapMarkerAlt,} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f3d2e] text-white">
      <div className="max-w-7xl mx-auto px-8 py-14">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
<div>
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center"> <FaLeaf className="text-2xl text-white" /></div>
    <h2 className="text-3xl font-bold">
        Swap<span className="text-green-400">Fit</span>
    </h2>
 </div>
<p className="mt-6 text-gray-300 leading-8">
    Give your clothes a second life by exchanging fashion with like-minded people. Together we reduce waste and make fashion sustainable.</p>
<div className="flex gap-4 mt-8">

{[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
             (Icon, index) => (
                  <a key={index}
                    href="#"
                    className="w-11 h-11 rounded-full bg-green-700 hover:bg-green-500 flex items-center justify-center transition duration-300"
                  >
                    <Icon />
                  </a>
                )
              )}

            </div>
          </div>
          <div>
           <h3 className="text-2xl font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4 text-gray-300">
              {[
                "Home","About Us","How It Works","Featured Items","Testimonials",].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-green-400 transition"
                  >
                    {item}
                  </a>
                </li>
              ))}

            </ul>
          </div>
         <div>
            <h3 className="text-2xl font-semibold mb-6">
              Support
            </h3>

            <ul className="space-y-4 text-gray-300">
              {[
                "FAQ","Contact","Privacy Policy", "Terms & Conditions", "Help Center",].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-green-400 transition" >
                    {item}
                  </a>
                </li>
              ))}
           </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">
              Stay Updated
            </h3>
            <p className="mt-5 text-gray-300 leading-7">
              Subscribe to receive the latest clothing swaps,
              sustainability tips and exclusive offers.
            </p>
            <div className="mt-8 flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-l-xl px-4 py-4 outline-none text-gray-700 bg-white"
              />
              <button className="bg-green-600 hover:bg-green-500 px-6 rounded-r-xl transition">
                <FaPaperPlane className="text-xl text-white" />
              </button>
            </div>
            <div className="mt-8 space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-400" ></FaEnvelope>support@swapfit.com</div>
             <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-green-400" />
                +91 98765 43210
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-green-400" />
                Kerala, India
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-green-800">
       <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-center md:text-left">
            © 2026 SwapFit. All rights reserved.
          </p>
          <div className="flex gap-8 text-gray-400">
            <a href="#" className="hover:text-green-400 transition">
              Privacy
            </a>
            <a href="#" className="hover:text-green-400 transition">
              Terms
            </a>
            <a href="#" className="hover:text-green-400 transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;