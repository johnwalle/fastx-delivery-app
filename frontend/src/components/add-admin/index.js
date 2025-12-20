import { useState } from "react";
import { UserPlus, Mail, Phone, Lock } from "lucide-react";
import useAddAdmin from "../../hooks/useAddAdmin"; // 👈 custom hook (similar to useLogin)

function AddAdminUser() {
  const { addAdmin, error, isLoading, SnackbarComponent } = useAddAdmin();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [localError, setLocalError] = useState("");

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // local validation
    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    setLocalError("");

    try {
      const response = await addAdmin(formData); // send full data to the hook
      if (response.status === 201) {
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      console.error("Add Admin error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white text-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-red-100 p-3 rounded-full mr-3">
            <UserPlus size={28} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-red-700">Add Admin User</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <UserPlus size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Phone size={18} className="text-gray-400 mr-2" />
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                required
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Error Message */}
          {(localError || error) && (
            <p className="text-red-600 text-sm text-center mt-2">
              {localError || error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-medium py-3 rounded-lg mt-4 transition ${
              isLoading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {isLoading ? "Creating..." : "Create Admin"}
          </button>
        </form>

        {/* Snackbar Feedback */}
        {SnackbarComponent}
      </div>
    </div>
  );
}

export default AddAdminUser;
