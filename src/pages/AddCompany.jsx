import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBuilding, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaGlobe,
  FaCreditCard,
  FaDollarSign,
  FaCalendarAlt,
  FaCheck
} from 'react-icons/fa';
import { MdBusiness } from 'react-icons/md';
import AdminLayout from '../components/layout/AdminLayout';
import { ROUTES, PAYMENT_PLANS } from '../constants';

const AddCompany = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Company Details
    companyName: '',
    companyType: '',
    industry: '',
    employeeCount: '',
    website: '',
    description: '',
    
    // Contact Information
    contactPersonName: '',
    contactEmail: '',
    contactPhone: '',
    alternateEmail: '',
    alternatePhone: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    
    // Business Information
    gstNumber: '',
    panNumber: '',
    registrationNumber: '',
    businessType: '',
    
    // Payment Plan
    selectedPlan: 'basic',
    billingCycle: 'monthly',
    
    // Agreement
    termsAccepted: false,
    dataProcessingAccepted: false
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: 'Company Details', icon: FaBuilding },
    { id: 2, title: 'Contact Information', icon: FaUser },
    { id: 3, title: 'Business Information', icon: MdBusiness },
    { id: 4, title: 'Payment Plan', icon: FaCreditCard },
    { id: 5, title: 'Review & Submit', icon: FaCheck }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const stepErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.companyName) stepErrors.companyName = 'Company name is required';
        if (!formData.companyType) stepErrors.companyType = 'Company type is required';
        if (!formData.industry) stepErrors.industry = 'Industry is required';
        if (!formData.employeeCount) stepErrors.employeeCount = 'Employee count is required';
        break;
      
      case 2:
        if (!formData.contactPersonName) stepErrors.contactPersonName = 'Contact person name is required';
        if (!formData.contactEmail) stepErrors.contactEmail = 'Contact email is required';
        if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
          stepErrors.contactEmail = 'Invalid email format';
        }
        if (!formData.contactPhone) stepErrors.contactPhone = 'Contact phone is required';
        if (!formData.address) stepErrors.address = 'Address is required';
        if (!formData.city) stepErrors.city = 'City is required';
        if (!formData.state) stepErrors.state = 'State is required';
        if (!formData.pincode) stepErrors.pincode = 'Pincode is required';
        break;
      
      case 3:
        if (!formData.businessType) stepErrors.businessType = 'Business type is required';
        break;
      
      case 5:
        if (!formData.termsAccepted) stepErrors.termsAccepted = 'Please accept terms and conditions';
        if (!formData.dataProcessingAccepted) stepErrors.dataProcessingAccepted = 'Please accept data processing agreement';
        break;
    }
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real application, you would:
      // 1. Submit company data to your backend
      // 2. Create Razorpay payment link
      // 3. Handle payment success/failure
      
      alert('Company added successfully! Payment integration will be implemented with backend.');
      navigate(ROUTES.ADMIN_MANAGE_COMPANIES);
    } catch (error) {
      console.error('Error adding company:', error);
      alert('Error adding company. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Company Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter company name"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Type *
                </label>
                <select
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                    errors.companyType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select company type</option>
                  <option value="private">Private Limited</option>
                  <option value="public">Public Limited</option>
                  <option value="partnership">Partnership</option>
                  <option value="proprietorship">Sole Proprietorship</option>
                  <option value="llp">Limited Liability Partnership</option>
                </select>
                {errors.companyType && (
                  <p className="mt-1 text-sm text-red-600">{errors.companyType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                    errors.industry ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="other">Other</option>
                </select>
                {errors.industry && (
                  <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employee Count *
                </label>
                <select
                  name="employeeCount"
                  value={formData.employeeCount}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                    errors.employeeCount ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select employee count</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
                {errors.employeeCount && (
                  <p className="mt-1 text-sm text-red-600">{errors.employeeCount}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="https://company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Brief description of the company..."
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                    errors.contactPersonName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Contact person name"
                />
                {errors.contactPersonName && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactPersonName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                    errors.contactEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="contact@company.com"
                />
                {errors.contactEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Phone *
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                    errors.contactPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+91 9876543210"
                />
                {errors.contactPhone && (
                  <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alternate Email
                </label>
                <input
                  type="email"
                  name="alternateEmail"
                  value={formData.alternateEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="alternate@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Complete address"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="City"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="State"
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                    errors.pincode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123456"
                />
                {errors.pincode && (
                  <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Type *
                </label>
                <select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 ${
                    errors.businessType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select business type</option>
                  <option value="b2b">B2B (Business to Business)</option>
                  <option value="b2c">B2C (Business to Consumer)</option>
                  <option value="b2b2c">B2B2C (Business to Business to Consumer)</option>
                  <option value="saas">SaaS (Software as a Service)</option>
                  <option value="consulting">Consulting</option>
                  <option value="ecommerce">E-commerce</option>
                </select>
                {errors.businessType && (
                  <p className="mt-1 text-sm text-red-600">{errors.businessType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GST Number
                </label>
                <input
                  type="text"
                  name="gstNumber"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PAN Number
                </label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="ABCDE1234F"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Company registration number"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Payment Plan</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(PAYMENT_PLANS).map((plan) => (
                <div
                  key={plan.id}
                  className={`relative border rounded-lg p-6 cursor-pointer transition-all ${
                    formData.selectedPlan === plan.id
                      ? 'border-sky-500 bg-sky-50 ring-2 ring-sky-200'
                      : 'border-gray-300 hover:border-sky-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, selectedPlan: plan.id }))}
                >
                  {formData.selectedPlan === plan.id && (
                    <div className="absolute top-4 right-4">
                      <FaCheck className="text-sky-600" />
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {plan.name}
                    </h4>
                    <div className="text-3xl font-bold text-sky-600 mb-4">
                      ₹{plan.price}
                      <span className="text-sm font-normal text-gray-500">/{plan.duration}</span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <FaCheck className="text-green-500 mr-2 text-xs" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billing Cycle
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="billingCycle"
                    value="monthly"
                    checked={formData.billingCycle === 'monthly'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Monthly
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="billingCycle"
                    value="yearly"
                    checked={formData.billingCycle === 'yearly'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Yearly (20% discount)
                </label>
              </div>
            </div>
          </div>
        );

      case 5:
        const selectedPlan = PAYMENT_PLANS[formData.selectedPlan.toUpperCase()];
        const finalPrice = formData.billingCycle === 'yearly' 
          ? selectedPlan.price * 12 * 0.8 
          : selectedPlan.price;

        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Review & Submit</h3>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Company Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Company Name:</span> {formData.companyName}
                </div>
                <div>
                  <span className="font-medium">Industry:</span> {formData.industry}
                </div>
                <div>
                  <span className="font-medium">Contact Person:</span> {formData.contactPersonName}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {formData.contactEmail}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {formData.contactPhone}
                </div>
                <div>
                  <span className="font-medium">City:</span> {formData.city}, {formData.state}
                </div>
              </div>
            </div>

            <div className="bg-sky-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Payment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className="font-medium">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Billing Cycle:</span>
                  <span className="font-medium">{formData.billingCycle}</span>
                </div>
                {formData.billingCycle === 'yearly' && (
                  <div className="flex justify-between text-green-600">
                    <span>Yearly Discount (20%):</span>
                    <span className="font-medium">-₹{(selectedPlan.price * 12 * 0.2).toFixed(0)}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-sky-600">₹{finalPrice.toFixed(0)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="mt-1 mr-3"
                />
                <span className="text-sm text-gray-600">
                  I agree to the <a href="#" className="text-sky-600 underline">Terms and Conditions</a> and 
                  <a href="#" className="text-sky-600 underline ml-1">Privacy Policy</a>
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="text-sm text-red-600">{errors.termsAccepted}</p>
              )}

              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="dataProcessingAccepted"
                  checked={formData.dataProcessingAccepted}
                  onChange={handleInputChange}
                  className="mt-1 mr-3"
                />
                <span className="text-sm text-gray-600">
                  I consent to the processing of my personal data for business purposes
                </span>
              </label>
              {errors.dataProcessingAccepted && (
                <p className="text-sm text-red-600">{errors.dataProcessingAccepted}</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCompleted 
                        ? 'bg-sky-600 border-sky-600 text-white'
                        : isActive 
                        ? 'border-sky-600 text-sky-600'
                        : 'border-gray-300 text-gray-400'
                    }`}>
                      {isCompleted ? (
                        <FaCheck />
                      ) : (
                        <Icon />
                      )}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        isActive ? 'text-sky-600' : isCompleted ? 'text-sky-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`ml-6 w-12 h-0.5 ${
                        isCompleted ? 'bg-sky-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-8">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-sky-600 text-white rounded-lg text-sm font-medium hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Submit & Process Payment'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCompany;
