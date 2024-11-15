import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const authStore = create(
  persist(
    (set) => ({
      token: '', firstName: '', lastName: '', email: '', role: '', phoneNumber: '', profilePicture: '',
      referralCode: '', identityNumber: '', isVerified: null, ownerName: '', organizerName: '', point: null,
      discount: null, events: null, transactions: null, refetch: null,

      setAuth: ({
        token, firstName, lastName, email, role, phoneNumber, profilePicture, referralCode, identityNumber,
        isVerified, ownerName, organizerName, point, discount, events, transactions
      }: any) =>
        set({
          token: token, firstName: firstName, lastName: lastName, email: email, role: role, phoneNumber: phoneNumber,
          profilePicture: profilePicture, referralCode: referralCode, identityNumber: identityNumber, isVerified: isVerified,
          ownerName: ownerName, organizerName: organizerName, point: point, discount: discount,
          events: events, transactions: transactions
        }),

      setKeepAuth: ({
        firstName, lastName, email, role, phoneNumber, profilePicture, referralCode, identityNumber,
        isVerified, ownerName, organizerName, point, discount, events, transactions
      }: any) =>
        set({
          firstName: firstName, lastName: lastName, email: email, role: role, phoneNumber: phoneNumber,
          profilePicture: profilePicture, referralCode: referralCode, identityNumber: identityNumber, isVerified: isVerified,
          ownerName: ownerName, organizerName: organizerName, point: point, discount: discount,
          events: events, transactions: transactions

        }),
      resetAuth: () => set({
        token: '', firstName: '', lastName: '', email: '', role: '', phoneNumber: '', profilePicture: '',
        referralCode: '', identityNumber: '', isVerified: null, ownerName: '', organizerName: '', point: null,
        discount: null, events: null, transactions: null
      }),
    }),
    {
      name: 'authToken',
      partialize: (state: any) => ({ token: state.token }),
    },
  ),
);

export default authStore;
