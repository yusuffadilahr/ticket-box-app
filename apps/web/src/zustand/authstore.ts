import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const authStore = create(persist((set) => ({
    token: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    phoneNumber: '',
    profilePicture: '',
    referralCode: '',
    identityNumber: null,
    isVerified:'',


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
        isVerified
    }: any) => set({
        token: token,
        firstName: firstName,
        lastName: lastName,
        email:email,
        role: role,
        phoneNumber: phoneNumber,
        profilePicture: profilePicture,
        referralCode: referralCode,
        identityNumber: identityNumber,
        isVerified: isVerified
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
        identityNumber }: any) => set({
            firstName: firstName,
            lastName: lastName,
            email:email,
            role: role,
            isVerified:isVerified,
            phoneNumber: phoneNumber,
            profilePicture: profilePicture,
            referralCode: referralCode,
            identityNumber: identityNumber
        })
}),
    {
        name: 'authToken',
        partialize: (state: any) => ({ token: state.token })
    }
))

export default authStore;