// src/services/authService.js
import { apiRequest } from "./api";

export const login = async (email, password) => {
  const body = { email, password };
  const data = await apiRequest("/auth/login", "POST", body);

  if (data.STS === "200") {
    localStorage.setItem("token", data.CONTENT.token);
    localStorage.setItem("user", JSON.stringify(data.CONTENT));
  }

  return data;
};

export const sendOTP = async (email) => {
  return await apiRequest(
    `/forgot-password/send-otp?email=${email}`,
    "POST"
  );
};

export const verifyOTP = async (email, otp) => {
  return await apiRequest(
    `/forgot-password/verify-otp?email=${email}&otp=${otp}`,
    "POST"
  );
};

export const changePassword = async (email, newPassword) => {
  return await apiRequest(
    `/forgot-password/reset-password?email=${email}&newPassword=${newPassword}`,
    "POST"
  );
};

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
    dateOfEstablishment: dateOfEstablishment,
    industrySector: industrySector,
    organizationWebsite: organizationWebsite,
    organizationAddress: organizationAddress,
    organizationLogo: organizationLogo,
    emailDomain: emailDomain,
    primaryContactEmail: primaryContactEmail,
    officialPhoneNumber: officialPhoneNumber,
    representativeFullName: representativeFullName,
    representativeDesignation: representativeDesignation,
    representativeContactNumber: representativeContactNumber,
    representativeEmail: representativeEmail,
    idProof: idProof,
    password: password
  };
  const data = await apiRequest("/auth/company/register", "POST", body);
  return data;
};
