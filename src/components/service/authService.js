// src/services/authService.js
import { apiRequest } from "./api";

export const login = async (email, password) => {
  const body = { email, password };
  const data = await apiRequest("/auth/login", "POST", body);

  if (data.STS === "200") {
    // ✅ Store token & user
    localStorage.setItem("token", data.CONTENT.token);
    localStorage.setItem("user", JSON.stringify(data.CONTENT));
  }

  return data;
};


// export const signUp = async()


export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const signUpCompany = async (
  organizationName,
  organizationType,
  dateOfEstablishment,
  industrySector,
  organizationWebsite,
  organizationAddress,
  organizationLogo,
  emailDomain,
  primaryContactEmail,
  officialPhoneNumber,
  representativeFullName,
  representativeDesignation,
  representativeContactNumber,
  representativeEmail,
  idProof,
  password
) => {
  const body = {
    organizationName: organizationName,
    organizationType: organizationType,
    dateOfEstablishment: "2020-01-15",
    industrySector: "Information Technology",
    organizationWebsite: "https://techsolutions.com",
    organizationAddress: "123 Business Street, Tech City, State 12345, Country",
    organizationLogo: "https://techsolutions.com/assets/logo.png",
    emailDomain: "techsolutions.com",
    primaryContactEmail: "contact@techsolutions.com",
    officialPhoneNumber: "+1-555-123-4567",
    representativeFullName: "John Smith",
    representativeDesignation: "Chief Executive Officer",
    representativeContactNumber: "+1-555-987-6543",
    representativeEmail: "john.smith@techsolutions.com",
    idProof: "passport_123456789",
    password: "SecurePassword123!",
  };
  const data = await apiRequest("/auth/company/register", "POST", body);
  return data;
};
