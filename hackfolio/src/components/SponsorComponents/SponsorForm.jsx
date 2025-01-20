import React, { useState } from "react";
import axios from "axios";
import LoadingPage from "../loading";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import "animate.css";
import { motion } from "framer-motion";


const countryList = [
  "United States", "India", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "Japan", "China", "Russia", "Brazil", "South Africa", "Italy", "Spain",
  "Mexico", "Netherlands", "Sweden", "Norway", "Denmark", "Singapore", "New Zealand",
  "Switzerland", "South Korea", "Argentina", "Malaysia", "Saudi Arabia", "UAE", "Indonesia",
  "Vietnam", "Thailand", "Egypt", "Turkey", "Poland", "Portugal", "Ireland", "Austria",
  "Belgium", "Greece", "Finland", "Israel"
];

const sponsorSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  website: z.string().url("Must be a valid URL"),
  phoneNumber: z
    .string()
    .length(10, "Phone number must be exactly 10 digits long")
    .regex(/^[6-9]\d{9}$/, "Phone number must start with 6, 7, 8, or 9"),
  verificationStatus: z.enum(["Pending", "Verified", "Rejected"]),
  registrationNumber: z
    .string()
    .regex(/^HQ/i, "Registration number must start with 'HQ'"),
  taxId: z
    .string()
    .regex(/^[a-zA-Z0-9]{5,}$/, "Tax ID must be at least 5 alphanumeric characters"),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z
      .string()
      .regex(/^\d{5,6}$/, "ZIP code must be 5 or 6 digits")
      .optional(),
    country: z.string().min(1, "Country is required")
  }),
  description: z.string().optional(),
});

function SponsorForm() {
  const navigate = useNavigate();
  const email = JSON.parse(localStorage.getItem("data"))?.email || "";
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    email,
    phoneNumber: "",
    verificationStatus: "Pending",
    registrationNumber: "",
    taxId: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
    description: "",
  });

  const [logo, setLogo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = async (file) => {
    const uploadPreset = 'hackathonform';
    const cloudName = 'dgjqg72wo';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: false,
        });
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading file:', error.response ? error.response.data : error.message);
        return null;
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sponsorSchema.parseAsync(formData);

      const logoUrl = logo ? await handleImageUpload(logo) : null;

      const sponsorData = {
        ...formData,
        logo: logoUrl,
      };

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/sponsors`, sponsorData);
      console.log("Server response:", response.data);
      navigate("/sponsoruploadsuccess");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = {};
        error.errors.forEach((issue) => {
          validationErrors[issue.path.join(".")] = issue.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Error submitting sponsor data:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{  minHeight: "100vh", color: "#ffffff" }}>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-extrabold text-center text-black mb-6">Sponsor Submission Form</h1>
          <div className="max-w-3xl mx-auto bg-[#f4f4f5] p-8 rounded-lg shadow-lg animate__animated animate__fadeIn">
            <form onSubmit={handleSubmit}>
              {/* Form fields as before */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full text-black p-2 border border-black rounded"
                  placeholder="Enter the Company Name"
                />
                {errors.companyName && <span className="text-red-500">{errors.companyName}</span>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
                  placeholder="Enter company website"
                  required
                />
                {errors.website && <span className="text-red-500">{errors.website}</span>}
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
                  placeholder="Enter contact phone number"
                  required
                />
                {errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber}</span>}
              </div>

              {/* Registration Number */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Registration Number</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
                  placeholder="Enter registration number (must start with 'HQ')"
                  required
                />
                {errors.registrationNumber && <span className="text-red-500">{errors.registrationNumber}</span>}
              </div>

              {/* Tax ID */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Tax ID</label>
                <input
                  type="text"
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
                  placeholder="Enter tax identification number"
                  required
                />
                {errors.taxId && <span className="text-red-500">{errors.taxId}</span>}
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Address</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 mb-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
                  placeholder="Street"
                />
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 mb-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
                  placeholder="City"
                />
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 mb-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
                  placeholder="State"
                />
                <input
                  type="text"
                  name="address.zip"
                  value={formData.address.zip}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 mb-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
                  placeholder="ZIP Code (5-6 digits)"
                />
                {errors.address?.zip && <span className="text-red-500">{errors.address.zip}</span>}
                <select
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd]"
                  required
                >
                  <option value="">Select a country</option>
                  {countryList.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.address?.country && <span className="text-red-500">{errors.address.country}</span>}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-black font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full text-black px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f3abd] placeholder-gray-300
"
                  placeholder="Enter a description of your company"
                />
              </div>

              {/* Logo Upload */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Logo Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogo(e.target.files[0])}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border file:border-gray-300 file:bg-gray-50 file:text-sm file:font-semibold file:text-gray-700 hover:file:bg-gray-100"
                />
              </div>


              <button
                type="submit"
                className="bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
              >
                Submit
              </button>

            </form>
          </div>
        </div>
      )}
         {/* Background Animations */}
         <div className=" inset-0 -z-10">
                    <motion.div
                        className="line-animation absolute top-[400px] left-[30px] w-32 h-32 -z-10"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 2 }}
                    >
                        <motion.svg
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <motion.path
                                d="M10 10 L 50 50 L 90 10"
                                fill="transparent"
                                stroke="#3b82f6"
                                strokeWidth="4"
                            />
                        </motion.svg>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-[1000px] right-[250px] w-32 h-32 bg-blue-100 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />

                    <motion.div
                        className="absolute bottom-[50px] left-[10px] w-48 h-48 bg-purple-300 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[700px] left-[250px] w-48 h-48 bg-purple-300 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[800px] left-[1500px] w-48 h-48 bg-purple-300 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                    />

                    <motion.div
                        className="absolute bottom-[720px] right-[200px] w-32 h-32 bg-blue-100 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />

                    <motion.div
                        className="absolute bottom-[400px] right-[500px] w-32 h-32 bg-blue-100 rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    />
                </div>
    </div>
  );
}

export default SponsorForm;
