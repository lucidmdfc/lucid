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
    search: '/suppliers',
    create: '/suppliers/create',
    createInvoice: '/suppliers/createInvoice',
    edit: '/suppliers/edit',
    details: '/suppliers/:achatId/',
  },
  projets: {
    index: '/projets',
    create: '/projets/create',
    details: '/projets/:projetId/',
    edit: '/projets/:projetId/edit',
  },
  grants: {
    index: '/grants',
    create: '/grants/create',
    tranche: '/grants/tranche',
  },
  donors: {
    index: '/donors',
    create: '/donors/create',
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
  dashboard: {
    index: '/',
    academy: {
      index: '/dashboard/academy',
      courseDetails: '/dashboard/academy/courses/:courseId',
    },
    account: '/dashboard/account',
    analytics: '/dashboard/analytics',
    blank: '/dashboard/blank',
    blog: {
      index: '/dashboard/blog',
      postDetails: '/dashboard/blog/:postId',
      postCreate: '/dashboard/blog/create',
    },
    customers: {
      index: '/dashboard/customers',
      details: '/dashboard/customers/:customerId',
      edit: '/dashboard/customers/:customerId/edit',
    },
    calendar: '/dashboard/calendar',
    chat: '/dashboard/chat',
    crypto: '/dashboard/crypto',
    revenus: {
      index: '/revenus',
    },
    salary: {
      index: '/salary',
      newSalary: '/salary/salary/create',
      newPAyement: '/salary/payment/create',
    },
    expenses: {
      index: '/expenses',
      edit: '/expenses/edit',
      create: '/expenses/create',
    },
    utilities: {
      index: '/utilities',
    },
    achats: {
      index: '/achats',
      search: '/achats/search',
      edit: '/achats/edit',
      details: '/achats/:achatId/',
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
    // ////////////////////////
    ecommerce: '/dashboard/ecommerce',
    fileManager: '/dashboard/file-manager',
    // invoices: {
    //   index: '/dashboard/invoices',
    //   details: '/dashboard/invoices/:orderId',
    // },
    jobs: {
      index: '/dashboard/jobs',
      create: '/dashboard/jobs/create',
      companies: {
        details: '/dashboard/jobs/companies/:companyId',
      },
    },
    kanban: '/dashboard/kanban',
    logistics: {
      index: '/dashboard/logistics',
      fleet: '/dashboard/logistics/fleet',
    },
    mail: '/dashboard/mail',
    orders: {
      index: '/dashboard/orders',
      details: '/dashboard/orders/:orderId',
    },
    products: {
      index: '/dashboard/products',
      create: '/dashboard/products/create',
    },
    social: {
      index: '/dashboard/social',
      profile: '/dashboard/social/profile',
      feed: '/dashboard/social/feed',
    },
  },
  project: {
    index: '/projets',
  },
  components: {
    index: '/components',
    dataDisplay: {
      detailLists: '/components/data-display/detail-lists',
      tables: '/components/data-display/tables',
      quickStats: '/components/data-display/quick-stats',
    },
    lists: {
      groupedLists: '/components/lists/grouped-lists',
      gridLists: '/components/lists/grid-lists',
    },
    forms: '/components/forms',
    modals: '/components/modals',
    charts: '/components/charts',
    buttons: '/components/buttons',
    typography: '/components/typography',
    colors: '/components/colors',
    inputs: '/components/inputs',
  },
  docs: 'https://material-kit-pro-react-docs.devias.io',
};
