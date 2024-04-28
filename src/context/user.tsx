// "use client";
// import type { ReactNode } from "react";
// import type { User } from "~/types";
// import {
//   createContext,
//   useContext,
//   useCallback,
//   useState,
// } from "react";
// import { useRouter } from "next/navigation";
// import { useLocale } from "next-intl";
// import {
//   update as updateApi,
//   deleteProfile as deleteProfileApi,
//   becomeSeller as becomeSellerApi,
// } from "~/api/user";
// import { useNotification } from "./notification";
// import { useSetting } from "./setting";

// type TUserContext = {
//   user: User | null;
//   update: (formData: FormData) => Promise<Response>;
//   remove: () => Promise<void>;
//   becomeSeller: (formData: FormData) => Promise<Response>;
// };

// const UserContext = createContext<TUserContext | null>(null);

// export default function UserProvider({ children }: Props) {
//   const locale = useLocale();
//   const router = useRouter();
//   const { refresh } = useSetting()!;
//   const { toastify } = useNotification()!;
//   const [user, setUser] = useState<User | null>(null);

//   /**
//    * Me try the fetch profile with jwt, if user is already
//    * authenticated we use session.
//    */
//   // const me = useCallback(async () => {
//   //   if (user !== null) return;

//   //   const authorization = Cookies.get(COOKIE.AUTHORIZATION) ?? ""
//   //   let res = await meApi(authorization);
//   //   if (!res.ok) res = await fetchProfileApi();
//   //   if (!res.ok) return;

//   //   // @ts-ignore
//   //   refresh(res.data.setting);
//   //   // @ts-ignore
//   //   setUser(res.data.user);

//   // }, [refresh, user]);

//   // useEffectOnce(() => {
//   //   const me = async () => {
//   //     if (user !== null) return;
  
//   //     const authorization = Cookies.get(COOKIE.AUTHORIZATION) ?? ""
//   //     let res = await meApi(authorization);
//   //     if (!res.ok) res = await fetchProfileApi();

//   //     if (!res.ok) return;
  
//   //     // @ts-ignore
//   //     refresh(res.data.setting);
//   //     // @ts-ignore
//   //     setUser(res.data.user);
  
//   //   }

//   //   me()
//   // });

//   // const signUp = useCallback(
//   //   async (formData: FormData) => {
//   //     const res = await signUpAction(formData);

//   //     if (res.success) router.push(`/${locale}/auth/sign-in`);

//   //     return res;
//   //   },
//   //   [locale, router]
//   // );

//   // const signIn = useCallback(
//   //   async (formData: FormData) => {
//   //     const res = await signInAction(formData);

//   //     if (res.success) {
//   //       // @ts-ignore
//   //       refresh(res.data.setting);
//   //       // @ts-ignore
//   //       setUser(res.data.user);

//   //       router.push(`/${locale}/profile`);
//   //     }
//   //     return res;
//   //   },
//   //   [locale, refresh, router]
//   // );

//   // const signOut = useCallback(async () => {
//   //   const res = await toastify(signOutAction());
//   //   if (res.success) {
//   //     setUser(null);
//   //     Cookies.remove(COOKIE.AUTHORIZATION);
//   //     Cookies.remove(COOKIE.SESSION);
//   //     router.push(`/${locale}`);
//   //   }
//   // }, [locale, router, toastify]);

//   const update = useCallback(
//     async (formData: FormData): Promise<Response> => {
//       const res = await updateApi(formData);
//       if (res.success) {
//         setUser((prev) => ({ ...prev, ...(res.data as User) }));
//         router.push(`/${locale}/profile`);
//       }
//       return res;
//     },
//     [locale, router]
//   );

//   const remove = useCallback(async () => {
//     const res = await toastify(deleteProfileApi());
//     if (res.success) {
//       setUser(null);
//       router.push(`/${locale}`);
//     }
//   }, [locale, router, toastify]);

//   const becomeSeller = useCallback(
//     async (formData: FormData) => {
//       const res = await becomeSellerApi(formData);

//       if (res.success) {
//         router.push(`/${locale}/profile`);
//       }
//       return res;
//     },
//     [locale, router]
//   );

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         update,
//         remove,
//         becomeSeller,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// type Props = {
//   children: ReactNode;
// };

// export const useUser = () => useContext(UserContext);
