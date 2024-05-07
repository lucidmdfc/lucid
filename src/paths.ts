export const paths = {
  index: '/',
  checkout: '/checkout',
  contact: '/contact',
  pricing: '/pricing',
  auth: {
    auth0: {
      callback: '/auth/auth0/callback',
      login: '/auth/auth0/login',
    },
    jwt: {
      login: '/auth/jwt/login',
      register: '/auth/jwt/register',
    },
    firebase: {
      login: '/auth/firebase/login',
      register: '/auth/firebase/register',
    },
    amplify: {
      confirmRegister: '/auth/amplify/confirm-register',
      forgotPassword: '/auth/amplify/forgot-password',
      login: '/auth/amplify/login',
      register: '/auth/amplify/register',
      resetPassword: '/auth/amplify/reset-password',
    },
  },
  authDemo: {
    forgotPassword: {
      classic: '/auth-demo/forgot-password/classic',
      modern: '/auth-demo/forgot-password/modern',
    },
    login: {
      classic: '/auth-demo/login/classic',
      modern: '/auth-demo/login/modern',
    },
    register: {
      classic: '/auth-demo/register/classic',
      modern: '/auth-demo/register/modern',
    },
    resetPassword: {
      classic: '/auth-demo/reset-password/classic',
      modern: '/auth-demo/reset-password/modern',
    },
    verifyCode: {
      classic: '/auth-demo/verify-code/classic',
      modern: '/auth-demo/verify-code/modern',
    },
  },
  revenus: {
    index: '/revenus',
  },
  employee: {
    index: '/employee',
    newEmployee: '/employee/employee/create',
    newPayment: '/employee/payment/create',
  },
  expenses: {
    index: '/expenses',
    edit: '/expenses/edit',
    create: '/expenses/create',
  },
  utilities: {
    index: '/utilities',
  },
  suppliers: {
    index: '/suppliers',
    search: '/suppliers/search',
    edit: '/suppliers/edit',
    details: '/suppliers/:achatId/',
  },
  projets: {
    index: '/projets',
    create: '/projets/create',
    details: '/projets/:projetId/',
    edit: '/projets/:projetId/edit',
    tranche: '/projets/tranche',
  },
  invoices: {
    index: '/invoices',
    create: '/invoices/create',
    edit: '/invoices/edit',
    details: '/invoices/:invoiceId',
  },
  clients: {
    index: '/clients',
    create: '/clients/create',
    edit: '/clients/edit',
    details: '/clients/:invoiceId',
  },
  membres: {
    index: '/membres',
    create: '/membres/create',
  },
  cash: {
    index: '/cash',
  },
  fileManager: '/file-manager',
  notAuthorized: '/401',
  notFound: '/404',
  serverError: '/500',
};
