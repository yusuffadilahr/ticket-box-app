import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const authStore = create(
  persist(
    (set) => ({
      token: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      phoneNumber: '',
      profilePicture: '',
      referralCode: '',
      identityNumber: null,
      isVerified: null,
      ownerName: '',
      organizerName: '',
      point: null,
      discount: null,

      setAuth: ({
        token,
        firstName,
        lastName,
        email,
        role,
        phoneNumber,
        profilePicture,
        referralCode,
        identityNumber,
        isVerified,
        ownerName,
        organizerName,
        point,
        discount,
      }: any) =>
        set({
          token: token,
          firstName: firstName,
          lastName: lastName,
          email: email,
          role: role,
          phoneNumber: phoneNumber,
          profilePicture: profilePicture,
          referralCode: referralCode,
          identityNumber: identityNumber,
          isVerified: isVerified,
          ownerName: ownerName,
          organizerName: organizerName,
          point: point,
          discount: discount
        }),
      setKeepAuth: ({
        firstName,
        lastName,
        email,
        role,
        phoneNumber,
        profilePicture,
        referralCode,
        isVerified,
        identityNumber,
        ownerName,
        organizerName,
        point,
        discount,
      }: any) =>
        set({
          firstName: firstName,
          lastName: lastName,
          email: email,
          role: role,
          isVerified: isVerified,
          phoneNumber: phoneNumber,
          profilePicture: profilePicture,
          referralCode: referralCode,
          identityNumber: identityNumber,
          ownerName: ownerName,
          organizerName: organizerName,
          point: point,
          discount: discount,
        }),
    }),
    {
      name: 'authToken',
      partialize: (state: any) => ({ token: state.token }),
    },
  ),
);

export default authStore;
