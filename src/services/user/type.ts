export interface UserDetails {
  rowId: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  accountType: string;
  customerType: string;
  accountNumber: string;
  dateOfBirth: string;
  gender: string;
  nidaNumber: string;
  photoUrl: string;
  businessName: string;
  businessEmail: string;
  businessAddress: string;
  businessLicenseUrl: string;
  tinCertificateUrl: string;
  taxClearanceUrl: string;
  roleCompany: string;
  status: string;
  approved: boolean;
  roles: { id: string; name: string }[];
  permissions: any[];
  firstLogin: boolean;
  bankAccount: string;
}

export interface UserDetailsResponse {
    data: UserDetails;
    message: string;
    status: string;
}
