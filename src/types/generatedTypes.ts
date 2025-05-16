export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigFloat: { input: any; output: any };
  BigInt: { input: any; output: any };
  Cursor: { input: any; output: any };
  Date: { input: any; output: any };
  Datetime: { input: any; output: any };
  JSON: { input: any; output: any };
  Opaque: { input: any; output: any };
  Time: { input: any; output: any };
  UUID: { input: any; output: any };
};

/** Boolean expression comparing fields on type "BigFloat" */
export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

/** Boolean expression comparing fields on type "BigFloatList" */
export type BigFloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

/** Boolean expression comparing fields on type "BigIntList" */
export type BigIntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Boolean expression comparing fields on type "BooleanList" */
export type BooleanListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  contains?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  eq?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

/** Boolean expression comparing fields on type "DateList" */
export type DateListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Date']['input']>>;
  contains?: InputMaybe<Array<Scalars['Date']['input']>>;
  eq?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Date']['input']>>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

/** Boolean expression comparing fields on type "DatetimeList" */
export type DatetimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  contains?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  eq?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL',
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

/** Boolean expression comparing fields on type "FloatList" */
export type FloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Float']['input']>>;
  contains?: InputMaybe<Array<Scalars['Float']['input']>>;
  eq?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Float']['input']>>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

/** Boolean expression comparing fields on type "IntList" */
export type IntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Int']['input']>>;
  contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  eq?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  __typename?: 'Mutation';
  /** Deletes zero or more records from the `clients` collection */
  deleteFromclientsCollection: ClientsDeleteResponse;
  /** Deletes zero or more records from the `donors` collection */
  deleteFromdonorsCollection: DonorsDeleteResponse;
  /** Deletes zero or more records from the `employee_grant_allocations` collection */
  deleteFromemployee_grant_allocationsCollection: Employee_Grant_AllocationsDeleteResponse;
  /** Deletes zero or more records from the `employee_transfer` collection */
  deleteFromemployee_transferCollection: Employee_TransferDeleteResponse;
  /** Deletes zero or more records from the `employees` collection */
  deleteFromemployeesCollection: EmployeesDeleteResponse;
  /** Deletes zero or more records from the `entity` collection */
  deleteFromentityCollection: EntityDeleteResponse;
  /** Deletes zero or more records from the `expense_categories` collection */
  deleteFromexpense_categoriesCollection: Expense_CategoriesDeleteResponse;
  /** Deletes zero or more records from the `expense_claims` collection */
  deleteFromexpense_claimsCollection: Expense_ClaimsDeleteResponse;
  /** Deletes zero or more records from the `grant_project_agreement` collection */
  deleteFromgrant_project_agreementCollection: Grant_Project_AgreementDeleteResponse;
  /** Deletes zero or more records from the `grant_slices` collection */
  deleteFromgrant_slicesCollection: Grant_SlicesDeleteResponse;
  /** Deletes zero or more records from the `issued_invoices` collection */
  deleteFromissued_invoicesCollection: Issued_InvoicesDeleteResponse;
  /** Deletes zero or more records from the `members` collection */
  deleteFrommembersCollection: MembersDeleteResponse;
  /** Deletes zero or more records from the `memberships` collection */
  deleteFrommembershipsCollection: MembershipsDeleteResponse;
  /** Deletes zero or more records from the `petty_cash` collection */
  deleteFrompetty_cashCollection: Petty_CashDeleteResponse;
  /** Deletes zero or more records from the `projects` collection */
  deleteFromprojectsCollection: ProjectsDeleteResponse;
  /** Deletes zero or more records from the `provider_invoices` collection */
  deleteFromprovider_invoicesCollection: Provider_InvoicesDeleteResponse;
  /** Deletes zero or more records from the `providers_invoice_project` collection */
  deleteFromproviders_invoice_projectCollection: Providers_Invoice_ProjectDeleteResponse;
  /** Deletes zero or more records from the `service_providers` collection */
  deleteFromservice_providersCollection: Service_ProvidersDeleteResponse;
  /** Deletes zero or more records from the `status` collection */
  deleteFromstatusCollection: StatusDeleteResponse;
  /** Deletes zero or more records from the `utilities` collection */
  deleteFromutilitiesCollection: UtilitiesDeleteResponse;
  /** Deletes zero or more records from the `utility_grant_allocations` collection */
  deleteFromutility_grant_allocationsCollection: Utility_Grant_AllocationsDeleteResponse;
  /** Adds one or more `clients` records to the collection */
  insertIntoclientsCollection?: Maybe<ClientsInsertResponse>;
  /** Adds one or more `donors` records to the collection */
  insertIntodonorsCollection?: Maybe<DonorsInsertResponse>;
  /** Adds one or more `employee_grant_allocations` records to the collection */
  insertIntoemployee_grant_allocationsCollection?: Maybe<Employee_Grant_AllocationsInsertResponse>;
  /** Adds one or more `employee_transfer` records to the collection */
  insertIntoemployee_transferCollection?: Maybe<Employee_TransferInsertResponse>;
  /** Adds one or more `employees` records to the collection */
  insertIntoemployeesCollection?: Maybe<EmployeesInsertResponse>;
  /** Adds one or more `entity` records to the collection */
  insertIntoentityCollection?: Maybe<EntityInsertResponse>;
  /** Adds one or more `expense_categories` records to the collection */
  insertIntoexpense_categoriesCollection?: Maybe<Expense_CategoriesInsertResponse>;
  /** Adds one or more `expense_claims` records to the collection */
  insertIntoexpense_claimsCollection?: Maybe<Expense_ClaimsInsertResponse>;
  /** Adds one or more `grant_project_agreement` records to the collection */
  insertIntogrant_project_agreementCollection?: Maybe<Grant_Project_AgreementInsertResponse>;
  /** Adds one or more `grant_slices` records to the collection */
  insertIntogrant_slicesCollection?: Maybe<Grant_SlicesInsertResponse>;
  /** Adds one or more `issued_invoices` records to the collection */
  insertIntoissued_invoicesCollection?: Maybe<Issued_InvoicesInsertResponse>;
  /** Adds one or more `members` records to the collection */
  insertIntomembersCollection?: Maybe<MembersInsertResponse>;
  /** Adds one or more `memberships` records to the collection */
  insertIntomembershipsCollection?: Maybe<MembershipsInsertResponse>;
  /** Adds one or more `petty_cash` records to the collection */
  insertIntopetty_cashCollection?: Maybe<Petty_CashInsertResponse>;
  /** Adds one or more `projects` records to the collection */
  insertIntoprojectsCollection?: Maybe<ProjectsInsertResponse>;
  /** Adds one or more `provider_invoices` records to the collection */
  insertIntoprovider_invoicesCollection?: Maybe<Provider_InvoicesInsertResponse>;
  /** Adds one or more `providers_invoice_project` records to the collection */
  insertIntoproviders_invoice_projectCollection?: Maybe<Providers_Invoice_ProjectInsertResponse>;
  /** Adds one or more `service_providers` records to the collection */
  insertIntoservice_providersCollection?: Maybe<Service_ProvidersInsertResponse>;
  /** Adds one or more `status` records to the collection */
  insertIntostatusCollection?: Maybe<StatusInsertResponse>;
  /** Adds one or more `utilities` records to the collection */
  insertIntoutilitiesCollection?: Maybe<UtilitiesInsertResponse>;
  /** Adds one or more `utility_grant_allocations` records to the collection */
  insertIntoutility_grant_allocationsCollection?: Maybe<Utility_Grant_AllocationsInsertResponse>;
  refresh_detailed_expense_summary?: Maybe<Scalars['JSON']['output']>;
  refresh_total_active_salary_transfer?: Maybe<Scalars['JSON']['output']>;
  refresh_total_expense_claims_per_employee?: Maybe<Scalars['JSON']['output']>;
  refresh_total_expense_claims_per_project?: Maybe<Scalars['JSON']['output']>;
  refresh_total_expense_claims_per_project_funding?: Maybe<Scalars['JSON']['output']>;
  refresh_total_petty_cash_per_project?: Maybe<Scalars['JSON']['output']>;
  refresh_total_received_slices_per_project?: Maybe<Scalars['JSON']['output']>;
  refresh_total_received_slices_per_project_funding?: Maybe<Scalars['JSON']['output']>;
  refresh_vendor_invoices_per_project?: Maybe<Scalars['JSON']['output']>;
  /** Updates zero or more records in the `clients` collection */
  updateclientsCollection: ClientsUpdateResponse;
  /** Updates zero or more records in the `donors` collection */
  updatedonorsCollection: DonorsUpdateResponse;
  /** Updates zero or more records in the `employee_grant_allocations` collection */
  updateemployee_grant_allocationsCollection: Employee_Grant_AllocationsUpdateResponse;
  /** Updates zero or more records in the `employee_transfer` collection */
  updateemployee_transferCollection: Employee_TransferUpdateResponse;
  /** Updates zero or more records in the `employees` collection */
  updateemployeesCollection: EmployeesUpdateResponse;
  /** Updates zero or more records in the `entity` collection */
  updateentityCollection: EntityUpdateResponse;
  /** Updates zero or more records in the `expense_categories` collection */
  updateexpense_categoriesCollection: Expense_CategoriesUpdateResponse;
  /** Updates zero or more records in the `expense_claims` collection */
  updateexpense_claimsCollection: Expense_ClaimsUpdateResponse;
  /** Updates zero or more records in the `grant_project_agreement` collection */
  updategrant_project_agreementCollection: Grant_Project_AgreementUpdateResponse;
  /** Updates zero or more records in the `grant_slices` collection */
  updategrant_slicesCollection: Grant_SlicesUpdateResponse;
  /** Updates zero or more records in the `issued_invoices` collection */
  updateissued_invoicesCollection: Issued_InvoicesUpdateResponse;
  /** Updates zero or more records in the `members` collection */
  updatemembersCollection: MembersUpdateResponse;
  /** Updates zero or more records in the `memberships` collection */
  updatemembershipsCollection: MembershipsUpdateResponse;
  /** Updates zero or more records in the `petty_cash` collection */
  updatepetty_cashCollection: Petty_CashUpdateResponse;
  /** Updates zero or more records in the `projects` collection */
  updateprojectsCollection: ProjectsUpdateResponse;
  /** Updates zero or more records in the `provider_invoices` collection */
  updateprovider_invoicesCollection: Provider_InvoicesUpdateResponse;
  /** Updates zero or more records in the `providers_invoice_project` collection */
  updateproviders_invoice_projectCollection: Providers_Invoice_ProjectUpdateResponse;
  /** Updates zero or more records in the `service_providers` collection */
  updateservice_providersCollection: Service_ProvidersUpdateResponse;
  /** Updates zero or more records in the `status` collection */
  updatestatusCollection: StatusUpdateResponse;
  /** Updates zero or more records in the `utilities` collection */
  updateutilitiesCollection: UtilitiesUpdateResponse;
  /** Updates zero or more records in the `utility_grant_allocations` collection */
  updateutility_grant_allocationsCollection: Utility_Grant_AllocationsUpdateResponse;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromclientsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ClientsFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromdonorsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<DonorsFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromemployee_Grant_AllocationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Employee_Grant_AllocationsFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromemployee_TransferCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Employee_TransferFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromemployeesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<EmployeesFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromentityCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<EntityFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromexpense_CategoriesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Expense_CategoriesFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromexpense_ClaimsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Expense_ClaimsFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromgrant_Project_AgreementCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Grant_Project_AgreementFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromgrant_SlicesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Grant_SlicesFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromissued_InvoicesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Issued_InvoicesFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFrommembersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<MembersFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFrommembershipsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<MembershipsFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFrompetty_CashCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Petty_CashFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromprojectsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProjectsFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromprovider_InvoicesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Provider_InvoicesFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromproviders_Invoice_ProjectCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Providers_Invoice_ProjectFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromservice_ProvidersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Service_ProvidersFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromstatusCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<StatusFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromutilitiesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UtilitiesFilter>;
};

/** The root type for creating and mutating data */
export type MutationDeleteFromutility_Grant_AllocationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Utility_Grant_AllocationsFilter>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoclientsCollectionArgs = {
  objects: Array<ClientsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntodonorsCollectionArgs = {
  objects: Array<DonorsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoemployee_Grant_AllocationsCollectionArgs = {
  objects: Array<Employee_Grant_AllocationsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoemployee_TransferCollectionArgs = {
  objects: Array<Employee_TransferInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoemployeesCollectionArgs = {
  objects: Array<EmployeesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoentityCollectionArgs = {
  objects: Array<EntityInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoexpense_CategoriesCollectionArgs = {
  objects: Array<Expense_CategoriesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoexpense_ClaimsCollectionArgs = {
  objects: Array<Expense_ClaimsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntogrant_Project_AgreementCollectionArgs = {
  objects: Array<Grant_Project_AgreementInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntogrant_SlicesCollectionArgs = {
  objects: Array<Grant_SlicesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoissued_InvoicesCollectionArgs = {
  objects: Array<Issued_InvoicesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntomembersCollectionArgs = {
  objects: Array<MembersInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntomembershipsCollectionArgs = {
  objects: Array<MembershipsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntopetty_CashCollectionArgs = {
  objects: Array<Petty_CashInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoprojectsCollectionArgs = {
  objects: Array<ProjectsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoprovider_InvoicesCollectionArgs = {
  objects: Array<Provider_InvoicesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoproviders_Invoice_ProjectCollectionArgs = {
  objects: Array<Providers_Invoice_ProjectInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoservice_ProvidersCollectionArgs = {
  objects: Array<Service_ProvidersInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntostatusCollectionArgs = {
  objects: Array<StatusInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoutilitiesCollectionArgs = {
  objects: Array<UtilitiesInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationInsertIntoutility_Grant_AllocationsCollectionArgs = {
  objects: Array<Utility_Grant_AllocationsInsertInput>;
};

/** The root type for creating and mutating data */
export type MutationUpdateclientsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ClientsFilter>;
  set: ClientsUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatedonorsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<DonorsFilter>;
  set: DonorsUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateemployee_Grant_AllocationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Employee_Grant_AllocationsFilter>;
  set: Employee_Grant_AllocationsUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateemployee_TransferCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Employee_TransferFilter>;
  set: Employee_TransferUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateemployeesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<EmployeesFilter>;
  set: EmployeesUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateentityCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<EntityFilter>;
  set: EntityUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateexpense_CategoriesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Expense_CategoriesFilter>;
  set: Expense_CategoriesUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateexpense_ClaimsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Expense_ClaimsFilter>;
  set: Expense_ClaimsUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdategrant_Project_AgreementCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Grant_Project_AgreementFilter>;
  set: Grant_Project_AgreementUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdategrant_SlicesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Grant_SlicesFilter>;
  set: Grant_SlicesUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateissued_InvoicesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Issued_InvoicesFilter>;
  set: Issued_InvoicesUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatemembersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<MembersFilter>;
  set: MembersUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatemembershipsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<MembershipsFilter>;
  set: MembershipsUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatepetty_CashCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Petty_CashFilter>;
  set: Petty_CashUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateprojectsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProjectsFilter>;
  set: ProjectsUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateprovider_InvoicesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Provider_InvoicesFilter>;
  set: Provider_InvoicesUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateproviders_Invoice_ProjectCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Providers_Invoice_ProjectFilter>;
  set: Providers_Invoice_ProjectUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateservice_ProvidersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Service_ProvidersFilter>;
  set: Service_ProvidersUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdatestatusCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<StatusFilter>;
  set: StatusUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateutilitiesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UtilitiesFilter>;
  set: UtilitiesUpdateInput;
};

/** The root type for creating and mutating data */
export type MutationUpdateutility_Grant_AllocationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<Utility_Grant_AllocationsFilter>;
  set: Utility_Grant_AllocationsUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID']['output'];
};

/** Boolean expression comparing fields on type "Opaque" */
export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast',
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

/** The root type for querying data */
export type Query = {
  __typename?: 'Query';
  /** A pagable collection of type `clients` */
  clientsCollection?: Maybe<ClientsConnection>;
  /** A pagable collection of type `donors` */
  donorsCollection?: Maybe<DonorsConnection>;
  /** A pagable collection of type `employee_grant_allocations` */
  employee_grant_allocationsCollection?: Maybe<Employee_Grant_AllocationsConnection>;
  /** A pagable collection of type `employee_transfer` */
  employee_transferCollection?: Maybe<Employee_TransferConnection>;
  /** A pagable collection of type `employees` */
  employeesCollection?: Maybe<EmployeesConnection>;
  /** A pagable collection of type `entity` */
  entityCollection?: Maybe<EntityConnection>;
  /** A pagable collection of type `expense_categories` */
  expense_categoriesCollection?: Maybe<Expense_CategoriesConnection>;
  /** A pagable collection of type `expense_claims` */
  expense_claimsCollection?: Maybe<Expense_ClaimsConnection>;
  /** A pagable collection of type `grant_project_agreement` */
  grant_project_agreementCollection?: Maybe<Grant_Project_AgreementConnection>;
  /** A pagable collection of type `grant_slices` */
  grant_slicesCollection?: Maybe<Grant_SlicesConnection>;
  /** A pagable collection of type `issued_invoices` */
  issued_invoicesCollection?: Maybe<Issued_InvoicesConnection>;
  /** A pagable collection of type `members` */
  membersCollection?: Maybe<MembersConnection>;
  /** A pagable collection of type `memberships` */
  membershipsCollection?: Maybe<MembershipsConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `petty_cash` */
  petty_cashCollection?: Maybe<Petty_CashConnection>;
  /** A pagable collection of type `projects` */
  projectsCollection?: Maybe<ProjectsConnection>;
  /** A pagable collection of type `provider_invoices` */
  provider_invoicesCollection?: Maybe<Provider_InvoicesConnection>;
  /** A pagable collection of type `providers_invoice_project` */
  providers_invoice_projectCollection?: Maybe<Providers_Invoice_ProjectConnection>;
  /** A pagable collection of type `service_providers` */
  service_providersCollection?: Maybe<Service_ProvidersConnection>;
  /** A pagable collection of type `status` */
  statusCollection?: Maybe<StatusConnection>;
  /** A pagable collection of type `utilities` */
  utilitiesCollection?: Maybe<UtilitiesConnection>;
  /** A pagable collection of type `utility_grant_allocations` */
  utility_grant_allocationsCollection?: Maybe<Utility_Grant_AllocationsConnection>;
};

/** The root type for querying data */
export type QueryClientsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ClientsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClientsOrderBy>>;
};

/** The root type for querying data */
export type QueryDonorsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<DonorsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DonorsOrderBy>>;
};

/** The root type for querying data */
export type QueryEmployee_Grant_AllocationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Employee_Grant_AllocationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Employee_Grant_AllocationsOrderBy>>;
};

/** The root type for querying data */
export type QueryEmployee_TransferCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Employee_TransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Employee_TransferOrderBy>>;
};

/** The root type for querying data */
export type QueryEmployeesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<EmployeesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EmployeesOrderBy>>;
};

/** The root type for querying data */
export type QueryEntityCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<EntityFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EntityOrderBy>>;
};

/** The root type for querying data */
export type QueryExpense_CategoriesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Expense_CategoriesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Expense_CategoriesOrderBy>>;
};

/** The root type for querying data */
export type QueryExpense_ClaimsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Expense_ClaimsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Expense_ClaimsOrderBy>>;
};

/** The root type for querying data */
export type QueryGrant_Project_AgreementCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Grant_Project_AgreementFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Grant_Project_AgreementOrderBy>>;
};

/** The root type for querying data */
export type QueryGrant_SlicesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Grant_SlicesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Grant_SlicesOrderBy>>;
};

/** The root type for querying data */
export type QueryIssued_InvoicesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Issued_InvoicesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Issued_InvoicesOrderBy>>;
};

/** The root type for querying data */
export type QueryMembersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<MembersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};

/** The root type for querying data */
export type QueryMembershipsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<MembershipsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembershipsOrderBy>>;
};

/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};

/** The root type for querying data */
export type QueryPetty_CashCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Petty_CashFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Petty_CashOrderBy>>;
};

/** The root type for querying data */
export type QueryProjectsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ProjectsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

/** The root type for querying data */
export type QueryProvider_InvoicesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Provider_InvoicesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Provider_InvoicesOrderBy>>;
};

/** The root type for querying data */
export type QueryProviders_Invoice_ProjectCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Providers_Invoice_ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Providers_Invoice_ProjectOrderBy>>;
};

/** The root type for querying data */
export type QueryService_ProvidersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Service_ProvidersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Service_ProvidersOrderBy>>;
};

/** The root type for querying data */
export type QueryStatusCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<StatusFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StatusOrderBy>>;
};

/** The root type for querying data */
export type QueryUtilitiesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UtilitiesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UtilitiesOrderBy>>;
};

/** The root type for querying data */
export type QueryUtility_Grant_AllocationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Utility_Grant_AllocationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Utility_Grant_AllocationsOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression comparing fields on type "StringList" */
export type StringListFilter = {
  containedBy?: InputMaybe<Array<Scalars['String']['input']>>;
  contains?: InputMaybe<Array<Scalars['String']['input']>>;
  eq?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

/** Boolean expression comparing fields on type "TimeList" */
export type TimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Time']['input']>>;
  contains?: InputMaybe<Array<Scalars['Time']['input']>>;
  eq?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Time']['input']>>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

/** Boolean expression comparing fields on type "UUIDList" */
export type UuidListFilter = {
  containedBy?: InputMaybe<Array<Scalars['UUID']['input']>>;
  contains?: InputMaybe<Array<Scalars['UUID']['input']>>;
  eq?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type Clients = Node & {
  __typename?: 'clients';
  created_at: Scalars['Datetime']['output'];
  entity?: Maybe<Entity>;
  entity_id: Scalars['Int']['output'];
  ice: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  issued_invoicesCollection?: Maybe<Issued_InvoicesConnection>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  updated_at: Scalars['Datetime']['output'];
};

export type ClientsIssued_InvoicesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Issued_InvoicesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Issued_InvoicesOrderBy>>;
};

export type ClientsConnection = {
  __typename?: 'clientsConnection';
  edges: Array<ClientsEdge>;
  pageInfo: PageInfo;
};

export type ClientsDeleteResponse = {
  __typename?: 'clientsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Clients>;
};

export type ClientsEdge = {
  __typename?: 'clientsEdge';
  cursor: Scalars['String']['output'];
  node: Clients;
};

export type ClientsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ClientsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  entity_id?: InputMaybe<IntFilter>;
  ice?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ClientsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ClientsFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type ClientsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  entity_id?: InputMaybe<Scalars['Int']['input']>;
  ice?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ClientsInsertResponse = {
  __typename?: 'clientsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Clients>;
};

export type ClientsOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  entity_id?: InputMaybe<OrderByDirection>;
  ice?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type ClientsUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  entity_id?: InputMaybe<Scalars['Int']['input']>;
  ice?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ClientsUpdateResponse = {
  __typename?: 'clientsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Clients>;
};

export type Donors = Node & {
  __typename?: 'donors';
  created_at: Scalars['Datetime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  grant_project_agreementCollection?: Maybe<Grant_Project_AgreementConnection>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  updated_at: Scalars['Datetime']['output'];
};

export type DonorsGrant_Project_AgreementCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Grant_Project_AgreementFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Grant_Project_AgreementOrderBy>>;
};

export type DonorsConnection = {
  __typename?: 'donorsConnection';
  edges: Array<DonorsEdge>;
  pageInfo: PageInfo;
};

export type DonorsDeleteResponse = {
  __typename?: 'donorsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Donors>;
};

export type DonorsEdge = {
  __typename?: 'donorsEdge';
  cursor: Scalars['String']['output'];
  node: Donors;
};

export type DonorsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<DonorsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<DonorsFilter>;
  note?: InputMaybe<StringFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<DonorsFilter>>;
  phone?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type DonorsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type DonorsInsertResponse = {
  __typename?: 'donorsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Donors>;
};

export type DonorsOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  note?: InputMaybe<OrderByDirection>;
  phone?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type DonorsUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type DonorsUpdateResponse = {
  __typename?: 'donorsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Donors>;
};

export type Employee_Grant_Allocations = Node & {
  __typename?: 'employee_grant_allocations';
  allocation_percentage: Scalars['BigFloat']['output'];
  created_at: Scalars['Datetime']['output'];
  effective_from: Scalars['Date']['output'];
  effective_to: Scalars['Date']['output'];
  employee_id: Scalars['Int']['output'];
  employees?: Maybe<Employees>;
  grant_project_agreement?: Maybe<Grant_Project_Agreement>;
  grant_project_agreement_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  project_id: Scalars['Int']['output'];
  projects?: Maybe<Projects>;
  updated_at: Scalars['Datetime']['output'];
};

export type Employee_Grant_AllocationsConnection = {
  __typename?: 'employee_grant_allocationsConnection';
  edges: Array<Employee_Grant_AllocationsEdge>;
  pageInfo: PageInfo;
};

export type Employee_Grant_AllocationsDeleteResponse = {
  __typename?: 'employee_grant_allocationsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Employee_Grant_Allocations>;
};

export type Employee_Grant_AllocationsEdge = {
  __typename?: 'employee_grant_allocationsEdge';
  cursor: Scalars['String']['output'];
  node: Employee_Grant_Allocations;
};

export type Employee_Grant_AllocationsFilter = {
  allocation_percentage?: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Employee_Grant_AllocationsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  effective_from?: InputMaybe<DateFilter>;
  effective_to?: InputMaybe<DateFilter>;
  employee_id?: InputMaybe<IntFilter>;
  grant_project_agreement_id?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Employee_Grant_AllocationsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Employee_Grant_AllocationsFilter>>;
  project_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Employee_Grant_AllocationsInsertInput = {
  allocation_percentage?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  effective_from?: InputMaybe<Scalars['Date']['input']>;
  effective_to?: InputMaybe<Scalars['Date']['input']>;
  employee_id?: InputMaybe<Scalars['Int']['input']>;
  grant_project_agreement_id?: InputMaybe<Scalars['Int']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Employee_Grant_AllocationsInsertResponse = {
  __typename?: 'employee_grant_allocationsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Employee_Grant_Allocations>;
};

export type Employee_Grant_AllocationsOrderBy = {
  allocation_percentage?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  effective_from?: InputMaybe<OrderByDirection>;
  effective_to?: InputMaybe<OrderByDirection>;
  employee_id?: InputMaybe<OrderByDirection>;
  grant_project_agreement_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  project_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Employee_Grant_AllocationsUpdateInput = {
  allocation_percentage?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  effective_from?: InputMaybe<Scalars['Date']['input']>;
  effective_to?: InputMaybe<Scalars['Date']['input']>;
  employee_id?: InputMaybe<Scalars['Int']['input']>;
  grant_project_agreement_id?: InputMaybe<Scalars['Int']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Employee_Grant_AllocationsUpdateResponse = {
  __typename?: 'employee_grant_allocationsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Employee_Grant_Allocations>;
};

export type Employee_Transfer = Node & {
  __typename?: 'employee_transfer';
  amount: Scalars['BigFloat']['output'];
  created_at: Scalars['Datetime']['output'];
  employee_id: Scalars['Int']['output'];
  employees?: Maybe<Employees>;
  id: Scalars['BigInt']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  transfer_date: Scalars['Datetime']['output'];
};

export type Employee_TransferConnection = {
  __typename?: 'employee_transferConnection';
  edges: Array<Employee_TransferEdge>;
  pageInfo: PageInfo;
};

export type Employee_TransferDeleteResponse = {
  __typename?: 'employee_transferDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Employee_Transfer>;
};

export type Employee_TransferEdge = {
  __typename?: 'employee_transferEdge';
  cursor: Scalars['String']['output'];
  node: Employee_Transfer;
};

export type Employee_TransferFilter = {
  amount?: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Employee_TransferFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  employee_id?: InputMaybe<IntFilter>;
  id?: InputMaybe<BigIntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Employee_TransferFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Employee_TransferFilter>>;
  transfer_date?: InputMaybe<DatetimeFilter>;
};

export type Employee_TransferInsertInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  employee_id?: InputMaybe<Scalars['Int']['input']>;
  transfer_date?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Employee_TransferInsertResponse = {
  __typename?: 'employee_transferInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Employee_Transfer>;
};

export type Employee_TransferOrderBy = {
  amount?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  employee_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  transfer_date?: InputMaybe<OrderByDirection>;
};

export type Employee_TransferUpdateInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  employee_id?: InputMaybe<Scalars['Int']['input']>;
  transfer_date?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Employee_TransferUpdateResponse = {
  __typename?: 'employee_transferUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Employee_Transfer>;
};

export type Employees = Node & {
  __typename?: 'employees';
  created_at: Scalars['Datetime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  employee_grant_allocationsCollection?: Maybe<Employee_Grant_AllocationsConnection>;
  employee_transferCollection?: Maybe<Employee_TransferConnection>;
  expense_claimsCollection?: Maybe<Expense_ClaimsConnection>;
  grossSalary: Scalars['BigFloat']['output'];
  id: Scalars['Int']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  phone: Scalars['String']['output'];
  recruitmentDate?: Maybe<Scalars['Date']['output']>;
  salaryFunction: Scalars['String']['output'];
  salaryName: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updated_at: Scalars['Datetime']['output'];
};

export type EmployeesEmployee_Grant_AllocationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Employee_Grant_AllocationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Employee_Grant_AllocationsOrderBy>>;
};

export type EmployeesEmployee_TransferCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Employee_TransferFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Employee_TransferOrderBy>>;
};

export type EmployeesExpense_ClaimsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Expense_ClaimsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Expense_ClaimsOrderBy>>;
};

export type EmployeesConnection = {
  __typename?: 'employeesConnection';
  edges: Array<EmployeesEdge>;
  pageInfo: PageInfo;
};

export type EmployeesDeleteResponse = {
  __typename?: 'employeesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Employees>;
};

export type EmployeesEdge = {
  __typename?: 'employeesEdge';
  cursor: Scalars['String']['output'];
  node: Employees;
};

export type EmployeesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<EmployeesFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  email?: InputMaybe<StringFilter>;
  grossSalary?: InputMaybe<BigFloatFilter>;
  id?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<EmployeesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<EmployeesFilter>>;
  phone?: InputMaybe<StringFilter>;
  recruitmentDate?: InputMaybe<DateFilter>;
  salaryFunction?: InputMaybe<StringFilter>;
  salaryName?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type EmployeesInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  grossSalary?: InputMaybe<Scalars['BigFloat']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  recruitmentDate?: InputMaybe<Scalars['Date']['input']>;
  salaryFunction?: InputMaybe<Scalars['String']['input']>;
  salaryName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type EmployeesInsertResponse = {
  __typename?: 'employeesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Employees>;
};

export type EmployeesOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  grossSalary?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  phone?: InputMaybe<OrderByDirection>;
  recruitmentDate?: InputMaybe<OrderByDirection>;
  salaryFunction?: InputMaybe<OrderByDirection>;
  salaryName?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type EmployeesUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  grossSalary?: InputMaybe<Scalars['BigFloat']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  recruitmentDate?: InputMaybe<Scalars['Date']['input']>;
  salaryFunction?: InputMaybe<Scalars['String']['input']>;
  salaryName?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type EmployeesUpdateResponse = {
  __typename?: 'employeesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Employees>;
};

export type Entity = Node & {
  __typename?: 'entity';
  address?: Maybe<Scalars['String']['output']>;
  clientsCollection?: Maybe<ClientsConnection>;
  created_at: Scalars['Datetime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  fullName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  phone: Scalars['String']['output'];
  updated_at: Scalars['Datetime']['output'];
};

export type EntityClientsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ClientsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ClientsOrderBy>>;
};

export type EntityConnection = {
  __typename?: 'entityConnection';
  edges: Array<EntityEdge>;
  pageInfo: PageInfo;
};

export type EntityDeleteResponse = {
  __typename?: 'entityDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Entity>;
};

export type EntityEdge = {
  __typename?: 'entityEdge';
  cursor: Scalars['String']['output'];
  node: Entity;
};

export type EntityFilter = {
  address?: InputMaybe<StringFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<EntityFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  email?: InputMaybe<StringFilter>;
  fullName?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<EntityFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<EntityFilter>>;
  phone?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type EntityInsertInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type EntityInsertResponse = {
  __typename?: 'entityInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Entity>;
};

export type EntityOrderBy = {
  address?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  fullName?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  phone?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type EntityUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type EntityUpdateResponse = {
  __typename?: 'entityUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Entity>;
};

export type Expense_Categories = Node & {
  __typename?: 'expense_categories';
  created_at: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  petty_cashCollection?: Maybe<Petty_CashConnection>;
  updated_at: Scalars['Datetime']['output'];
};

export type Expense_CategoriesPetty_CashCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Petty_CashFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Petty_CashOrderBy>>;
};

export type Expense_CategoriesConnection = {
  __typename?: 'expense_categoriesConnection';
  edges: Array<Expense_CategoriesEdge>;
  pageInfo: PageInfo;
};

export type Expense_CategoriesDeleteResponse = {
  __typename?: 'expense_categoriesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Expense_Categories>;
};

export type Expense_CategoriesEdge = {
  __typename?: 'expense_categoriesEdge';
  cursor: Scalars['String']['output'];
  node: Expense_Categories;
};

export type Expense_CategoriesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Expense_CategoriesFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Expense_CategoriesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Expense_CategoriesFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Expense_CategoriesInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Expense_CategoriesInsertResponse = {
  __typename?: 'expense_categoriesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Expense_Categories>;
};

export type Expense_CategoriesOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Expense_CategoriesUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Expense_CategoriesUpdateResponse = {
  __typename?: 'expense_categoriesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Expense_Categories>;
};

export type Expense_Claims = Node & {
  __typename?: 'expense_claims';
  accommodation_amount?: Maybe<Scalars['BigFloat']['output']>;
  accommodation_document?: Maybe<Scalars['String']['output']>;
  amount: Scalars['BigFloat']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['Datetime']['output'];
  documentation_amount?: Maybe<Scalars['BigFloat']['output']>;
  documentation_document?: Maybe<Scalars['String']['output']>;
  employee_id: Scalars['Int']['output'];
  employees?: Maybe<Employees>;
  endDate?: Maybe<Scalars['Date']['output']>;
  gifts_and_entertainment_amount?: Maybe<Scalars['BigFloat']['output']>;
  gifts_and_entertainment_document?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  meals_amount?: Maybe<Scalars['BigFloat']['output']>;
  meals_document?: Maybe<Scalars['String']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  project_id: Scalars['Int']['output'];
  projects?: Maybe<Projects>;
  startDate: Scalars['Date']['output'];
  status: Scalars['Boolean']['output'];
  transport_amount?: Maybe<Scalars['BigFloat']['output']>;
  transport_document?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['Datetime']['output'];
};

export type Expense_ClaimsConnection = {
  __typename?: 'expense_claimsConnection';
  edges: Array<Expense_ClaimsEdge>;
  pageInfo: PageInfo;
};

export type Expense_ClaimsDeleteResponse = {
  __typename?: 'expense_claimsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Expense_Claims>;
};

export type Expense_ClaimsEdge = {
  __typename?: 'expense_claimsEdge';
  cursor: Scalars['String']['output'];
  node: Expense_Claims;
};

export type Expense_ClaimsFilter = {
  accommodation_amount?: InputMaybe<BigFloatFilter>;
  accommodation_document?: InputMaybe<StringFilter>;
  amount?: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Expense_ClaimsFilter>>;
  comment?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  documentation_amount?: InputMaybe<BigFloatFilter>;
  documentation_document?: InputMaybe<StringFilter>;
  employee_id?: InputMaybe<IntFilter>;
  endDate?: InputMaybe<DateFilter>;
  gifts_and_entertainment_amount?: InputMaybe<BigFloatFilter>;
  gifts_and_entertainment_document?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  meals_amount?: InputMaybe<BigFloatFilter>;
  meals_document?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Expense_ClaimsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Expense_ClaimsFilter>>;
  project_id?: InputMaybe<IntFilter>;
  startDate?: InputMaybe<DateFilter>;
  status?: InputMaybe<BooleanFilter>;
  transport_amount?: InputMaybe<BigFloatFilter>;
  transport_document?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Expense_ClaimsInsertInput = {
  accommodation_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  accommodation_document?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  documentation_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  documentation_document?: InputMaybe<Scalars['String']['input']>;
  employee_id?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  gifts_and_entertainment_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  gifts_and_entertainment_document?: InputMaybe<Scalars['String']['input']>;
  meals_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  meals_document?: InputMaybe<Scalars['String']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  transport_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  transport_document?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Expense_ClaimsInsertResponse = {
  __typename?: 'expense_claimsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Expense_Claims>;
};

export type Expense_ClaimsOrderBy = {
  accommodation_amount?: InputMaybe<OrderByDirection>;
  accommodation_document?: InputMaybe<OrderByDirection>;
  amount?: InputMaybe<OrderByDirection>;
  comment?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  documentation_amount?: InputMaybe<OrderByDirection>;
  documentation_document?: InputMaybe<OrderByDirection>;
  employee_id?: InputMaybe<OrderByDirection>;
  endDate?: InputMaybe<OrderByDirection>;
  gifts_and_entertainment_amount?: InputMaybe<OrderByDirection>;
  gifts_and_entertainment_document?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  meals_amount?: InputMaybe<OrderByDirection>;
  meals_document?: InputMaybe<OrderByDirection>;
  project_id?: InputMaybe<OrderByDirection>;
  startDate?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
  transport_amount?: InputMaybe<OrderByDirection>;
  transport_document?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Expense_ClaimsUpdateInput = {
  accommodation_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  accommodation_document?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  documentation_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  documentation_document?: InputMaybe<Scalars['String']['input']>;
  employee_id?: InputMaybe<Scalars['Int']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  gifts_and_entertainment_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  gifts_and_entertainment_document?: InputMaybe<Scalars['String']['input']>;
  meals_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  meals_document?: InputMaybe<Scalars['String']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  transport_amount?: InputMaybe<Scalars['BigFloat']['input']>;
  transport_document?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Expense_ClaimsUpdateResponse = {
  __typename?: 'expense_claimsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Expense_Claims>;
};

export type Grant_Project_Agreement = Node & {
  __typename?: 'grant_project_agreement';
  agreement_date?: Maybe<Scalars['Date']['output']>;
  created_at: Scalars['Datetime']['output'];
  donor_id: Scalars['Int']['output'];
  donors?: Maybe<Donors>;
  employee_grant_allocationsCollection?: Maybe<Employee_Grant_AllocationsConnection>;
  grant?: Maybe<Scalars['BigFloat']['output']>;
  id: Scalars['Int']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  petty_cashCollection?: Maybe<Petty_CashConnection>;
  project_id: Scalars['Int']['output'];
  projects?: Maybe<Projects>;
  updated_at: Scalars['Datetime']['output'];
  utility_grant_allocationsCollection?: Maybe<Utility_Grant_AllocationsConnection>;
};

export type Grant_Project_AgreementEmployee_Grant_AllocationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Employee_Grant_AllocationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Employee_Grant_AllocationsOrderBy>>;
};

export type Grant_Project_AgreementPetty_CashCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Petty_CashFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Petty_CashOrderBy>>;
};

export type Grant_Project_AgreementUtility_Grant_AllocationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Utility_Grant_AllocationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Utility_Grant_AllocationsOrderBy>>;
};

export type Grant_Project_AgreementConnection = {
  __typename?: 'grant_project_agreementConnection';
  edges: Array<Grant_Project_AgreementEdge>;
  pageInfo: PageInfo;
};

export type Grant_Project_AgreementDeleteResponse = {
  __typename?: 'grant_project_agreementDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Grant_Project_Agreement>;
};

export type Grant_Project_AgreementEdge = {
  __typename?: 'grant_project_agreementEdge';
  cursor: Scalars['String']['output'];
  node: Grant_Project_Agreement;
};

export type Grant_Project_AgreementFilter = {
  agreement_date?: InputMaybe<DateFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Grant_Project_AgreementFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  donor_id?: InputMaybe<IntFilter>;
  grant?: InputMaybe<BigFloatFilter>;
  id?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Grant_Project_AgreementFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Grant_Project_AgreementFilter>>;
  project_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Grant_Project_AgreementInsertInput = {
  agreement_date?: InputMaybe<Scalars['Date']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  donor_id?: InputMaybe<Scalars['Int']['input']>;
  grant?: InputMaybe<Scalars['BigFloat']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Grant_Project_AgreementInsertResponse = {
  __typename?: 'grant_project_agreementInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Grant_Project_Agreement>;
};

export type Grant_Project_AgreementOrderBy = {
  agreement_date?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  donor_id?: InputMaybe<OrderByDirection>;
  grant?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  project_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Grant_Project_AgreementUpdateInput = {
  agreement_date?: InputMaybe<Scalars['Date']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  donor_id?: InputMaybe<Scalars['Int']['input']>;
  grant?: InputMaybe<Scalars['BigFloat']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Grant_Project_AgreementUpdateResponse = {
  __typename?: 'grant_project_agreementUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Grant_Project_Agreement>;
};

export type Grant_Slices = Node & {
  __typename?: 'grant_slices';
  amount: Scalars['BigFloat']['output'];
  created_at: Scalars['Datetime']['output'];
  id: Scalars['Int']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  project_id: Scalars['Int']['output'];
  projects?: Maybe<Projects>;
  received_date: Scalars['Datetime']['output'];
  status?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['Datetime']['output'];
};

export type Grant_SlicesConnection = {
  __typename?: 'grant_slicesConnection';
  edges: Array<Grant_SlicesEdge>;
  pageInfo: PageInfo;
};

export type Grant_SlicesDeleteResponse = {
  __typename?: 'grant_slicesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Grant_Slices>;
};

export type Grant_SlicesEdge = {
  __typename?: 'grant_slicesEdge';
  cursor: Scalars['String']['output'];
  node: Grant_Slices;
};

export type Grant_SlicesFilter = {
  amount?: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Grant_SlicesFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Grant_SlicesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Grant_SlicesFilter>>;
  project_id?: InputMaybe<IntFilter>;
  received_date?: InputMaybe<DatetimeFilter>;
  status?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Grant_SlicesInsertInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  received_date?: InputMaybe<Scalars['Datetime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Grant_SlicesInsertResponse = {
  __typename?: 'grant_slicesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Grant_Slices>;
};

export type Grant_SlicesOrderBy = {
  amount?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  project_id?: InputMaybe<OrderByDirection>;
  received_date?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Grant_SlicesUpdateInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  received_date?: InputMaybe<Scalars['Datetime']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Grant_SlicesUpdateResponse = {
  __typename?: 'grant_slicesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Grant_Slices>;
};

export type Issued_Invoices = Node & {
  __typename?: 'issued_invoices';
  amount: Scalars['BigFloat']['output'];
  billingStatus: Scalars['String']['output'];
  client_id: Scalars['Int']['output'];
  clients?: Maybe<Clients>;
  created_at: Scalars['Datetime']['output'];
  designation?: Maybe<Scalars['String']['output']>;
  due_date: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  issue_date: Scalars['Date']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  project_id: Scalars['Int']['output'];
  projects?: Maybe<Projects>;
  updated_at: Scalars['Datetime']['output'];
};

export type Issued_InvoicesConnection = {
  __typename?: 'issued_invoicesConnection';
  edges: Array<Issued_InvoicesEdge>;
  pageInfo: PageInfo;
};

export type Issued_InvoicesDeleteResponse = {
  __typename?: 'issued_invoicesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Issued_Invoices>;
};

export type Issued_InvoicesEdge = {
  __typename?: 'issued_invoicesEdge';
  cursor: Scalars['String']['output'];
  node: Issued_Invoices;
};

export type Issued_InvoicesFilter = {
  amount?: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Issued_InvoicesFilter>>;
  billingStatus?: InputMaybe<StringFilter>;
  client_id?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  designation?: InputMaybe<StringFilter>;
  due_date?: InputMaybe<DateFilter>;
  id?: InputMaybe<IntFilter>;
  issue_date?: InputMaybe<DateFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Issued_InvoicesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Issued_InvoicesFilter>>;
  project_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Issued_InvoicesInsertInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  billingStatus?: InputMaybe<Scalars['String']['input']>;
  client_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  designation?: InputMaybe<Scalars['String']['input']>;
  due_date?: InputMaybe<Scalars['Date']['input']>;
  issue_date?: InputMaybe<Scalars['Date']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Issued_InvoicesInsertResponse = {
  __typename?: 'issued_invoicesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Issued_Invoices>;
};

export type Issued_InvoicesOrderBy = {
  amount?: InputMaybe<OrderByDirection>;
  billingStatus?: InputMaybe<OrderByDirection>;
  client_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  designation?: InputMaybe<OrderByDirection>;
  due_date?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  issue_date?: InputMaybe<OrderByDirection>;
  project_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Issued_InvoicesUpdateInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  billingStatus?: InputMaybe<Scalars['String']['input']>;
  client_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  designation?: InputMaybe<Scalars['String']['input']>;
  due_date?: InputMaybe<Scalars['Date']['input']>;
  issue_date?: InputMaybe<Scalars['Date']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Issued_InvoicesUpdateResponse = {
  __typename?: 'issued_invoicesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Issued_Invoices>;
};

export type Members = Node & {
  __typename?: 'members';
  address?: Maybe<Scalars['String']['output']>;
  amount: Scalars['BigFloat']['output'];
  created_at: Scalars['Datetime']['output'];
  email?: Maybe<Scalars['String']['output']>;
  full_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  membershipsCollection?: Maybe<MembershipsConnection>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  payment_date: Scalars['Datetime']['output'];
  payment_method: Payment_Method_Enum;
  phone: Scalars['String']['output'];
  rc_cin: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  updated_at: Scalars['Datetime']['output'];
};

export type MembersMembershipsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<MembershipsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MembershipsOrderBy>>;
};

export type MembersConnection = {
  __typename?: 'membersConnection';
  edges: Array<MembersEdge>;
  pageInfo: PageInfo;
};

export type MembersDeleteResponse = {
  __typename?: 'membersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Members>;
};

export type MembersEdge = {
  __typename?: 'membersEdge';
  cursor: Scalars['String']['output'];
  node: Members;
};

export type MembersFilter = {
  address?: InputMaybe<StringFilter>;
  amount?: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<MembersFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  email?: InputMaybe<StringFilter>;
  full_name?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<MembersFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<MembersFilter>>;
  payment_date?: InputMaybe<DatetimeFilter>;
  payment_method?: InputMaybe<Payment_Method_EnumFilter>;
  phone?: InputMaybe<StringFilter>;
  rc_cin?: InputMaybe<StringFilter>;
  status?: InputMaybe<BooleanFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type MembersInsertInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  payment_date?: InputMaybe<Scalars['Datetime']['input']>;
  payment_method?: InputMaybe<Payment_Method_Enum>;
  phone?: InputMaybe<Scalars['String']['input']>;
  rc_cin?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type MembersInsertResponse = {
  __typename?: 'membersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Members>;
};

export type MembersOrderBy = {
  address?: InputMaybe<OrderByDirection>;
  amount?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  full_name?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  payment_date?: InputMaybe<OrderByDirection>;
  payment_method?: InputMaybe<OrderByDirection>;
  phone?: InputMaybe<OrderByDirection>;
  rc_cin?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type MembersUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  payment_date?: InputMaybe<Scalars['Datetime']['input']>;
  payment_method?: InputMaybe<Payment_Method_Enum>;
  phone?: InputMaybe<Scalars['String']['input']>;
  rc_cin?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type MembersUpdateResponse = {
  __typename?: 'membersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Members>;
};

export enum Membership_Category_Enum {
  Category1 = 'category1',
  Category2 = 'category2',
}

/** Boolean expression comparing fields on type "membership_category_enum" */
export type Membership_Category_EnumFilter = {
  eq?: InputMaybe<Membership_Category_Enum>;
  in?: InputMaybe<Array<Membership_Category_Enum>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Membership_Category_Enum>;
};

export type Memberships = Node & {
  __typename?: 'memberships';
  created_at: Scalars['Datetime']['output'];
  id: Scalars['BigInt']['output'];
  member_id: Scalars['Int']['output'];
  members?: Maybe<Members>;
  membership_category: Membership_Category_Enum;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  updated_at: Scalars['Datetime']['output'];
};

export type MembershipsConnection = {
  __typename?: 'membershipsConnection';
  edges: Array<MembershipsEdge>;
  pageInfo: PageInfo;
};

export type MembershipsDeleteResponse = {
  __typename?: 'membershipsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Memberships>;
};

export type MembershipsEdge = {
  __typename?: 'membershipsEdge';
  cursor: Scalars['String']['output'];
  node: Memberships;
};

export type MembershipsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<MembershipsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  member_id?: InputMaybe<IntFilter>;
  membership_category?: InputMaybe<Membership_Category_EnumFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<MembershipsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<MembershipsFilter>>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type MembershipsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  member_id?: InputMaybe<Scalars['Int']['input']>;
  membership_category?: InputMaybe<Membership_Category_Enum>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type MembershipsInsertResponse = {
  __typename?: 'membershipsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Memberships>;
};

export type MembershipsOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  member_id?: InputMaybe<OrderByDirection>;
  membership_category?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type MembershipsUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  member_id?: InputMaybe<Scalars['Int']['input']>;
  membership_category?: InputMaybe<Membership_Category_Enum>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type MembershipsUpdateResponse = {
  __typename?: 'membershipsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Memberships>;
};

export enum Payment_Method_Enum {
  Cash = 'Cash',
  Cheque = 'Cheque',
  Transfer = 'Transfer',
}

/** Boolean expression comparing fields on type "payment_method_enum" */
export type Payment_Method_EnumFilter = {
  eq?: InputMaybe<Payment_Method_Enum>;
  in?: InputMaybe<Array<Payment_Method_Enum>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Payment_Method_Enum>;
};

export type Petty_Cash = Node & {
  __typename?: 'petty_cash';
  amount: Scalars['BigFloat']['output'];
  category_id: Scalars['Int']['output'];
  created_at: Scalars['Datetime']['output'];
  expense_categories?: Maybe<Expense_Categories>;
  grant_project_agreement?: Maybe<Grant_Project_Agreement>;
  grant_project_agreement_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  motif: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  project: Scalars['Int']['output'];
  projects?: Maybe<Projects>;
  startDate: Scalars['Date']['output'];
  updated_at: Scalars['Datetime']['output'];
};

export type Petty_CashConnection = {
  __typename?: 'petty_cashConnection';
  edges: Array<Petty_CashEdge>;
  pageInfo: PageInfo;
};

export type Petty_CashDeleteResponse = {
  __typename?: 'petty_cashDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Petty_Cash>;
};

export type Petty_CashEdge = {
  __typename?: 'petty_cashEdge';
  cursor: Scalars['String']['output'];
  node: Petty_Cash;
};

export type Petty_CashFilter = {
  amount?: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Petty_CashFilter>>;
  category_id?: InputMaybe<IntFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  grant_project_agreement_id?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  motif?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Petty_CashFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Petty_CashFilter>>;
  project?: InputMaybe<IntFilter>;
  startDate?: InputMaybe<DateFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Petty_CashInsertInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  category_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  grant_project_agreement_id?: InputMaybe<Scalars['Int']['input']>;
  motif?: InputMaybe<Scalars['String']['input']>;
  project?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Petty_CashInsertResponse = {
  __typename?: 'petty_cashInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Petty_Cash>;
};

export type Petty_CashOrderBy = {
  amount?: InputMaybe<OrderByDirection>;
  category_id?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  grant_project_agreement_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  motif?: InputMaybe<OrderByDirection>;
  project?: InputMaybe<OrderByDirection>;
  startDate?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Petty_CashUpdateInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  category_id?: InputMaybe<Scalars['Int']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  grant_project_agreement_id?: InputMaybe<Scalars['Int']['input']>;
  motif?: InputMaybe<Scalars['String']['input']>;
  project?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Petty_CashUpdateResponse = {
  __typename?: 'petty_cashUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Petty_Cash>;
};

export type Projects = Node & {
  __typename?: 'projects';
  contact_person_email?: Maybe<Scalars['String']['output']>;
  contact_person_name?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  employee_grant_allocationsCollection?: Maybe<Employee_Grant_AllocationsConnection>;
  end_date: Scalars['Date']['output'];
  expense_claimsCollection?: Maybe<Expense_ClaimsConnection>;
  grant_project_agreementCollection?: Maybe<Grant_Project_AgreementConnection>;
  grant_slicesCollection?: Maybe<Grant_SlicesConnection>;
  id: Scalars['Int']['output'];
  issued_invoicesCollection?: Maybe<Issued_InvoicesConnection>;
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  petty_cashCollection?: Maybe<Petty_CashConnection>;
  project_budget: Scalars['BigFloat']['output'];
  providers_invoice_projectCollection?: Maybe<Providers_Invoice_ProjectConnection>;
  service_providersCollection?: Maybe<Service_ProvidersConnection>;
  start_date: Scalars['Date']['output'];
  status: Scalars['Boolean']['output'];
  updated_at: Scalars['Datetime']['output'];
  utility_grant_allocationsCollection?: Maybe<Utility_Grant_AllocationsConnection>;
};

export type ProjectsEmployee_Grant_AllocationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Employee_Grant_AllocationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Employee_Grant_AllocationsOrderBy>>;
};

export type ProjectsExpense_ClaimsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Expense_ClaimsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Expense_ClaimsOrderBy>>;
};

export type ProjectsGrant_Project_AgreementCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Grant_Project_AgreementFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Grant_Project_AgreementOrderBy>>;
};

export type ProjectsGrant_SlicesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Grant_SlicesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Grant_SlicesOrderBy>>;
};

export type ProjectsIssued_InvoicesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Issued_InvoicesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Issued_InvoicesOrderBy>>;
};

export type ProjectsPetty_CashCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Petty_CashFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Petty_CashOrderBy>>;
};

export type ProjectsProviders_Invoice_ProjectCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Providers_Invoice_ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Providers_Invoice_ProjectOrderBy>>;
};

export type ProjectsService_ProvidersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Service_ProvidersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Service_ProvidersOrderBy>>;
};

export type ProjectsUtility_Grant_AllocationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Utility_Grant_AllocationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Utility_Grant_AllocationsOrderBy>>;
};

export type ProjectsConnection = {
  __typename?: 'projectsConnection';
  edges: Array<ProjectsEdge>;
  pageInfo: PageInfo;
};

export type ProjectsDeleteResponse = {
  __typename?: 'projectsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Projects>;
};

export type ProjectsEdge = {
  __typename?: 'projectsEdge';
  cursor: Scalars['String']['output'];
  node: Projects;
};

export type ProjectsFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<ProjectsFilter>>;
  contact_person_email?: InputMaybe<StringFilter>;
  contact_person_name?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  end_date?: InputMaybe<DateFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<ProjectsFilter>;
  note?: InputMaybe<StringFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<ProjectsFilter>>;
  project_budget?: InputMaybe<BigFloatFilter>;
  start_date?: InputMaybe<DateFilter>;
  status?: InputMaybe<BooleanFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type ProjectsInsertInput = {
  contact_person_email?: InputMaybe<Scalars['String']['input']>;
  contact_person_name?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  project_budget?: InputMaybe<Scalars['BigFloat']['input']>;
  start_date?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ProjectsInsertResponse = {
  __typename?: 'projectsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Projects>;
};

export type ProjectsOrderBy = {
  contact_person_email?: InputMaybe<OrderByDirection>;
  contact_person_name?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  end_date?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  note?: InputMaybe<OrderByDirection>;
  project_budget?: InputMaybe<OrderByDirection>;
  start_date?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type ProjectsUpdateInput = {
  contact_person_email?: InputMaybe<Scalars['String']['input']>;
  contact_person_name?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['Date']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  project_budget?: InputMaybe<Scalars['BigFloat']['input']>;
  start_date?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ProjectsUpdateResponse = {
  __typename?: 'projectsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Projects>;
};

export type Provider_Invoices = Node & {
  __typename?: 'provider_invoices';
  amount: Scalars['BigFloat']['output'];
  created_at: Scalars['Datetime']['output'];
  due_date: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  invoice_number: Scalars['String']['output'];
  issue_date: Scalars['Date']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  payment_date: Scalars['Date']['output'];
  project_id: Scalars['Int']['output'];
  providers_invoice_project?: Maybe<Providers_Invoice_Project>;
  providers_invoice_projectCollection?: Maybe<Providers_Invoice_ProjectConnection>;
  service_provider_id: Scalars['Int']['output'];
  service_providers?: Maybe<Service_Providers>;
  status: Scalars['String']['output'];
  updated_at: Scalars['Datetime']['output'];
};

export type Provider_InvoicesProviders_Invoice_ProjectCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Providers_Invoice_ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Providers_Invoice_ProjectOrderBy>>;
};

export type Provider_InvoicesConnection = {
  __typename?: 'provider_invoicesConnection';
  edges: Array<Provider_InvoicesEdge>;
  pageInfo: PageInfo;
};

export type Provider_InvoicesDeleteResponse = {
  __typename?: 'provider_invoicesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Provider_Invoices>;
};

export type Provider_InvoicesEdge = {
  __typename?: 'provider_invoicesEdge';
  cursor: Scalars['String']['output'];
  node: Provider_Invoices;
};

export type Provider_InvoicesFilter = {
  amount?: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Provider_InvoicesFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  due_date?: InputMaybe<DateFilter>;
  id?: InputMaybe<IntFilter>;
  invoice_number?: InputMaybe<StringFilter>;
  issue_date?: InputMaybe<DateFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Provider_InvoicesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Provider_InvoicesFilter>>;
  payment_date?: InputMaybe<DateFilter>;
  project_id?: InputMaybe<IntFilter>;
  service_provider_id?: InputMaybe<IntFilter>;
  status?: InputMaybe<StringFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Provider_InvoicesInsertInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  due_date?: InputMaybe<Scalars['Date']['input']>;
  invoice_number?: InputMaybe<Scalars['String']['input']>;
  issue_date?: InputMaybe<Scalars['Date']['input']>;
  payment_date?: InputMaybe<Scalars['Date']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  service_provider_id?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Provider_InvoicesInsertResponse = {
  __typename?: 'provider_invoicesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Provider_Invoices>;
};

export type Provider_InvoicesOrderBy = {
  amount?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  due_date?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  invoice_number?: InputMaybe<OrderByDirection>;
  issue_date?: InputMaybe<OrderByDirection>;
  payment_date?: InputMaybe<OrderByDirection>;
  project_id?: InputMaybe<OrderByDirection>;
  service_provider_id?: InputMaybe<OrderByDirection>;
  status?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Provider_InvoicesUpdateInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  due_date?: InputMaybe<Scalars['Date']['input']>;
  invoice_number?: InputMaybe<Scalars['String']['input']>;
  issue_date?: InputMaybe<Scalars['Date']['input']>;
  payment_date?: InputMaybe<Scalars['Date']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  service_provider_id?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Provider_InvoicesUpdateResponse = {
  __typename?: 'provider_invoicesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Provider_Invoices>;
};

export type Providers_Invoice_Project = Node & {
  __typename?: 'providers_invoice_project';
  created_at: Scalars['Datetime']['output'];
  id: Scalars['Int']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  project_id: Scalars['Int']['output'];
  projects?: Maybe<Projects>;
  provider_invoice_id: Scalars['Int']['output'];
  provider_invoices?: Maybe<Provider_Invoices>;
  updated_at?: Maybe<Scalars['Datetime']['output']>;
};

export type Providers_Invoice_ProjectConnection = {
  __typename?: 'providers_invoice_projectConnection';
  edges: Array<Providers_Invoice_ProjectEdge>;
  pageInfo: PageInfo;
};

export type Providers_Invoice_ProjectDeleteResponse = {
  __typename?: 'providers_invoice_projectDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Providers_Invoice_Project>;
};

export type Providers_Invoice_ProjectEdge = {
  __typename?: 'providers_invoice_projectEdge';
  cursor: Scalars['String']['output'];
  node: Providers_Invoice_Project;
};

export type Providers_Invoice_ProjectFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Providers_Invoice_ProjectFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Providers_Invoice_ProjectFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Providers_Invoice_ProjectFilter>>;
  project_id?: InputMaybe<IntFilter>;
  provider_invoice_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Providers_Invoice_ProjectInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  provider_invoice_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Providers_Invoice_ProjectInsertResponse = {
  __typename?: 'providers_invoice_projectInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Providers_Invoice_Project>;
};

export type Providers_Invoice_ProjectOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  project_id?: InputMaybe<OrderByDirection>;
  provider_invoice_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Providers_Invoice_ProjectUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  provider_invoice_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Providers_Invoice_ProjectUpdateResponse = {
  __typename?: 'providers_invoice_projectUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Providers_Invoice_Project>;
};

export type Service_Providers = Node & {
  __typename?: 'service_providers';
  amount: Scalars['BigFloat']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['Datetime']['output'];
  depositedDate?: Maybe<Scalars['Datetime']['output']>;
  dueDate: Scalars['Date']['output'];
  email?: Maybe<Scalars['String']['output']>;
  ice: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  payment_method: Payment_Method_Enum;
  phone: Scalars['String']['output'];
  project_id: Scalars['Int']['output'];
  projects?: Maybe<Projects>;
  provider_invoicesCollection?: Maybe<Provider_InvoicesConnection>;
  status?: Maybe<Status>;
  status_id: Scalars['Int']['output'];
  updated_at: Scalars['Datetime']['output'];
};

export type Service_ProvidersProvider_InvoicesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Provider_InvoicesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Provider_InvoicesOrderBy>>;
};

export type Service_ProvidersConnection = {
  __typename?: 'service_providersConnection';
  edges: Array<Service_ProvidersEdge>;
  pageInfo: PageInfo;
};

export type Service_ProvidersDeleteResponse = {
  __typename?: 'service_providersDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Service_Providers>;
};

export type Service_ProvidersEdge = {
  __typename?: 'service_providersEdge';
  cursor: Scalars['String']['output'];
  node: Service_Providers;
};

export type Service_ProvidersFilter = {
  amount?: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Service_ProvidersFilter>>;
  comment?: InputMaybe<StringFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  depositedDate?: InputMaybe<DatetimeFilter>;
  dueDate?: InputMaybe<DateFilter>;
  email?: InputMaybe<StringFilter>;
  ice?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Service_ProvidersFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Service_ProvidersFilter>>;
  payment_method?: InputMaybe<Payment_Method_EnumFilter>;
  phone?: InputMaybe<StringFilter>;
  project_id?: InputMaybe<IntFilter>;
  status_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
};

export type Service_ProvidersInsertInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  depositedDate?: InputMaybe<Scalars['Datetime']['input']>;
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  ice?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  payment_method?: InputMaybe<Payment_Method_Enum>;
  phone?: InputMaybe<Scalars['String']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  status_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Service_ProvidersInsertResponse = {
  __typename?: 'service_providersInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Service_Providers>;
};

export type Service_ProvidersOrderBy = {
  amount?: InputMaybe<OrderByDirection>;
  comment?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  depositedDate?: InputMaybe<OrderByDirection>;
  dueDate?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  ice?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  payment_method?: InputMaybe<OrderByDirection>;
  phone?: InputMaybe<OrderByDirection>;
  project_id?: InputMaybe<OrderByDirection>;
  status_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
};

export type Service_ProvidersUpdateInput = {
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  depositedDate?: InputMaybe<Scalars['Datetime']['input']>;
  dueDate?: InputMaybe<Scalars['Date']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  ice?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  payment_method?: InputMaybe<Payment_Method_Enum>;
  phone?: InputMaybe<Scalars['String']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  status_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
};

export type Service_ProvidersUpdateResponse = {
  __typename?: 'service_providersUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Service_Providers>;
};

export type Status = Node & {
  __typename?: 'status';
  created_at: Scalars['Datetime']['output'];
  id: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  service_providersCollection?: Maybe<Service_ProvidersConnection>;
};

export type StatusService_ProvidersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Service_ProvidersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Service_ProvidersOrderBy>>;
};

export type StatusConnection = {
  __typename?: 'statusConnection';
  edges: Array<StatusEdge>;
  pageInfo: PageInfo;
};

export type StatusDeleteResponse = {
  __typename?: 'statusDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Status>;
};

export type StatusEdge = {
  __typename?: 'statusEdge';
  cursor: Scalars['String']['output'];
  node: Status;
};

export type StatusFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<StatusFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<BigIntFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<StatusFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<StatusFilter>>;
};

export type StatusInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type StatusInsertResponse = {
  __typename?: 'statusInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Status>;
};

export type StatusOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type StatusUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type StatusUpdateResponse = {
  __typename?: 'statusUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Status>;
};

export type Utilities = Node & {
  __typename?: 'utilities';
  created_at?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['Int']['output'];
  maintenance_and_repairs?: Maybe<Scalars['BigFloat']['output']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  rent?: Maybe<Scalars['BigFloat']['output']>;
  telecommunications?: Maybe<Scalars['BigFloat']['output']>;
  updated_at?: Maybe<Scalars['Datetime']['output']>;
  utility_grant_allocationsCollection?: Maybe<Utility_Grant_AllocationsConnection>;
  water_and_electricity?: Maybe<Scalars['BigFloat']['output']>;
};

export type UtilitiesUtility_Grant_AllocationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<Utility_Grant_AllocationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<Utility_Grant_AllocationsOrderBy>>;
};

export type UtilitiesConnection = {
  __typename?: 'utilitiesConnection';
  edges: Array<UtilitiesEdge>;
  pageInfo: PageInfo;
};

export type UtilitiesDeleteResponse = {
  __typename?: 'utilitiesDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Utilities>;
};

export type UtilitiesEdge = {
  __typename?: 'utilitiesEdge';
  cursor: Scalars['String']['output'];
  node: Utilities;
};

export type UtilitiesFilter = {
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<UtilitiesFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<IntFilter>;
  maintenance_and_repairs?: InputMaybe<BigFloatFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<UtilitiesFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<UtilitiesFilter>>;
  rent?: InputMaybe<BigFloatFilter>;
  telecommunications?: InputMaybe<BigFloatFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  water_and_electricity?: InputMaybe<BigFloatFilter>;
};

export type UtilitiesInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  maintenance_and_repairs?: InputMaybe<Scalars['BigFloat']['input']>;
  rent?: InputMaybe<Scalars['BigFloat']['input']>;
  telecommunications?: InputMaybe<Scalars['BigFloat']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  water_and_electricity?: InputMaybe<Scalars['BigFloat']['input']>;
};

export type UtilitiesInsertResponse = {
  __typename?: 'utilitiesInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Utilities>;
};

export type UtilitiesOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  maintenance_and_repairs?: InputMaybe<OrderByDirection>;
  rent?: InputMaybe<OrderByDirection>;
  telecommunications?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  water_and_electricity?: InputMaybe<OrderByDirection>;
};

export type UtilitiesUpdateInput = {
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  maintenance_and_repairs?: InputMaybe<Scalars['BigFloat']['input']>;
  rent?: InputMaybe<Scalars['BigFloat']['input']>;
  telecommunications?: InputMaybe<Scalars['BigFloat']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  water_and_electricity?: InputMaybe<Scalars['BigFloat']['input']>;
};

export type UtilitiesUpdateResponse = {
  __typename?: 'utilitiesUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Utilities>;
};

export type Utility_Grant_Allocations = Node & {
  __typename?: 'utility_grant_allocations';
  allocation_percentage: Scalars['BigFloat']['output'];
  amount: Scalars['BigFloat']['output'];
  created_at: Scalars['Datetime']['output'];
  grant_project_agreement?: Maybe<Grant_Project_Agreement>;
  grant_project_agreement_id: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID']['output'];
  project_id: Scalars['Int']['output'];
  projects?: Maybe<Projects>;
  updated_at: Scalars['Datetime']['output'];
  utilities?: Maybe<Utilities>;
  utility_id: Scalars['Int']['output'];
};

export type Utility_Grant_AllocationsConnection = {
  __typename?: 'utility_grant_allocationsConnection';
  edges: Array<Utility_Grant_AllocationsEdge>;
  pageInfo: PageInfo;
};

export type Utility_Grant_AllocationsDeleteResponse = {
  __typename?: 'utility_grant_allocationsDeleteResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Utility_Grant_Allocations>;
};

export type Utility_Grant_AllocationsEdge = {
  __typename?: 'utility_grant_allocationsEdge';
  cursor: Scalars['String']['output'];
  node: Utility_Grant_Allocations;
};

export type Utility_Grant_AllocationsFilter = {
  allocation_percentage?: InputMaybe<BigFloatFilter>;
  amount?: InputMaybe<BigFloatFilter>;
  /** Returns true only if all its inner filters are true, otherwise returns false */
  and?: InputMaybe<Array<Utility_Grant_AllocationsFilter>>;
  created_at?: InputMaybe<DatetimeFilter>;
  grant_project_agreement_id?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  /** Negates a filter */
  not?: InputMaybe<Utility_Grant_AllocationsFilter>;
  /** Returns true if at least one of its inner filters is true, otherwise returns false */
  or?: InputMaybe<Array<Utility_Grant_AllocationsFilter>>;
  project_id?: InputMaybe<IntFilter>;
  updated_at?: InputMaybe<DatetimeFilter>;
  utility_id?: InputMaybe<IntFilter>;
};

export type Utility_Grant_AllocationsInsertInput = {
  allocation_percentage?: InputMaybe<Scalars['BigFloat']['input']>;
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  grant_project_agreement_id?: InputMaybe<Scalars['Int']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  utility_id?: InputMaybe<Scalars['Int']['input']>;
};

export type Utility_Grant_AllocationsInsertResponse = {
  __typename?: 'utility_grant_allocationsInsertResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Utility_Grant_Allocations>;
};

export type Utility_Grant_AllocationsOrderBy = {
  allocation_percentage?: InputMaybe<OrderByDirection>;
  amount?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  grant_project_agreement_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  project_id?: InputMaybe<OrderByDirection>;
  updated_at?: InputMaybe<OrderByDirection>;
  utility_id?: InputMaybe<OrderByDirection>;
};

export type Utility_Grant_AllocationsUpdateInput = {
  allocation_percentage?: InputMaybe<Scalars['BigFloat']['input']>;
  amount?: InputMaybe<Scalars['BigFloat']['input']>;
  created_at?: InputMaybe<Scalars['Datetime']['input']>;
  grant_project_agreement_id?: InputMaybe<Scalars['Int']['input']>;
  project_id?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['Datetime']['input']>;
  utility_id?: InputMaybe<Scalars['Int']['input']>;
};

export type Utility_Grant_AllocationsUpdateResponse = {
  __typename?: 'utility_grant_allocationsUpdateResponse';
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int']['output'];
  /** Array of records impacted by the mutation */
  records: Array<Utility_Grant_Allocations>;
};

export type ClientFragmentFragment = {
  __typename?: 'clients';
  id: number;
  entity_id: number;
  created_at: any;
  updated_at: any;
  ice: string;
};

export type DonorFragmentFragment = {
  __typename?: 'donors';
  id: number;
  name: string;
  email?: string | null;
  phone: string;
  created_at: any;
  updated_at: any;
  note?: string | null;
};

export type CreateDonorMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreateDonorMutation = {
  __typename?: 'Mutation';
  insertIntodonorsCollection?: {
    __typename?: 'donorsInsertResponse';
    records: Array<{
      __typename?: 'donors';
      id: number;
      name: string;
      email?: string | null;
      phone: string;
      created_at: any;
      updated_at: any;
      note?: string | null;
    }>;
  } | null;
};

export type UpdateDonorMutationVariables = Exact<{
  set: DonorsUpdateInput;
  filter?: InputMaybe<DonorsFilter>;
  atMost: Scalars['Int']['input'];
}>;

export type UpdateDonorMutation = {
  __typename?: 'Mutation';
  updatedonorsCollection: {
    __typename?: 'donorsUpdateResponse';
    records: Array<{
      __typename?: 'donors';
      id: number;
      name: string;
      email?: string | null;
      phone: string;
      created_at: any;
      updated_at: any;
      note?: string | null;
    }>;
  };
};

export type DeleteDonorMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteDonorMutation = {
  __typename?: 'Mutation';
  deleteFromdonorsCollection: { __typename?: 'donorsDeleteResponse'; affectedCount: number };
};

export type GetDonorsQueryVariables = Exact<{ [key: string]: never }>;

export type GetDonorsQuery = {
  __typename?: 'Query';
  donorsCollection?: {
    __typename?: 'donorsConnection';
    edges: Array<{
      __typename?: 'donorsEdge';
      node: {
        __typename?: 'donors';
        id: number;
        name: string;
        email?: string | null;
        phone: string;
        created_at: any;
        updated_at: any;
        note?: string | null;
      };
    }>;
  } | null;
};

export type GetDonorByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type GetDonorByIdQuery = {
  __typename?: 'Query';
  donorsCollection?: {
    __typename?: 'donorsConnection';
    edges: Array<{
      __typename?: 'donorsEdge';
      node: {
        __typename?: 'donors';
        id: number;
        name: string;
        email?: string | null;
        phone: string;
        created_at: any;
        updated_at: any;
        note?: string | null;
      };
    }>;
  } | null;
};

export type EmployeeGrantAllocationFragmentFragment = {
  __typename?: 'employee_grant_allocations';
  id: number;
  employee_id: number;
  project_id: number;
  allocation_percentage: any;
  effective_from: any;
  effective_to: any;
  created_at: any;
  updated_at: any;
  grant_project_agreement_id: number;
};

export type EmployeeFragmentFragment = {
  __typename?: 'employees';
  id: number;
  salaryName: string;
  salaryFunction: string;
  email?: string | null;
  phone: string;
  grossSalary: any;
  recruitmentDate?: any | null;
  status: string;
  created_at: any;
  updated_at: any;
};

export type CreateEmployeeMutationVariables = Exact<{
  salaryName: Scalars['String']['input'];
  salaryFunction: Scalars['String']['input'];
  email: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  grossSalary: Scalars['BigFloat']['input'];
  recruitmentDate: Scalars['Date']['input'];
  status: Scalars['String']['input'];
}>;

export type CreateEmployeeMutation = {
  __typename?: 'Mutation';
  insertIntoemployeesCollection?: {
    __typename?: 'employeesInsertResponse';
    records: Array<{
      __typename?: 'employees';
      id: number;
      salaryName: string;
      salaryFunction: string;
      email?: string | null;
      phone: string;
      grossSalary: any;
      recruitmentDate?: any | null;
      status: string;
      created_at: any;
      updated_at: any;
    }>;
  } | null;
};

export type DeleteEmployeeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteEmployeeMutation = {
  __typename?: 'Mutation';
  deleteFromemployeesCollection: { __typename?: 'employeesDeleteResponse'; affectedCount: number };
};

export type UpdateEmployeeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  salaryName: Scalars['String']['input'];
  salaryFunction: Scalars['String']['input'];
  email: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  grossSalary: Scalars['BigFloat']['input'];
  recruitmentDate: Scalars['Date']['input'];
  status: Scalars['String']['input'];
}>;

export type UpdateEmployeeMutation = {
  __typename?: 'Mutation';
  updateemployeesCollection: {
    __typename?: 'employeesUpdateResponse';
    affectedCount: number;
    records: Array<{
      __typename?: 'employees';
      id: number;
      salaryName: string;
      salaryFunction: string;
      email?: string | null;
      phone: string;
      grossSalary: any;
      recruitmentDate?: any | null;
      status: string;
      created_at: any;
      updated_at: any;
    }>;
  };
};

export type GetEmployeesQueryVariables = Exact<{
  filter?: InputMaybe<EmployeesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EmployeesOrderBy> | EmployeesOrderBy>;
}>;

export type GetEmployeesQuery = {
  __typename?: 'Query';
  employeesCollection?: {
    __typename?: 'employeesConnection';
    edges: Array<{
      __typename?: 'employeesEdge';
      node: {
        __typename?: 'employees';
        id: number;
        salaryName: string;
        salaryFunction: string;
        email?: string | null;
        phone: string;
        grossSalary: any;
        recruitmentDate?: any | null;
        status: string;
        created_at: any;
        updated_at: any;
      };
    }>;
  } | null;
};

export type GetEmployeeQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type GetEmployeeQuery = {
  __typename?: 'Query';
  employeesCollection?: {
    __typename?: 'employeesConnection';
    edges: Array<{
      __typename?: 'employeesEdge';
      node: {
        __typename?: 'employees';
        id: number;
        salaryName: string;
        salaryFunction: string;
        email?: string | null;
        phone: string;
        grossSalary: any;
        recruitmentDate?: any | null;
        status: string;
        created_at: any;
        updated_at: any;
      };
    }>;
  } | null;
};

export type EntityFragmentFragment = {
  __typename?: 'entity';
  id: number;
  fullName: string;
  address?: string | null;
  email?: string | null;
  phone: string;
  created_at: any;
  updated_at: any;
};

export type ExpenseCategoryFragmentFragment = {
  __typename?: 'expense_categories';
  id: number;
  name: string;
  description?: string | null;
  created_at: any;
  updated_at: any;
};

export type ExpenseClaimFragmentFragment = {
  __typename?: 'expense_claims';
  id: number;
  employee_id: number;
  project_id: number;
  amount: any;
  startDate: any;
  endDate?: any | null;
  created_at: any;
  updated_at: any;
  comment?: string | null;
  status: boolean;
  transport_amount?: any | null;
  transport_document?: string | null;
  accommodation_amount?: any | null;
  accommodation_document?: string | null;
  meals_amount?: any | null;
  meals_document?: string | null;
  gifts_and_entertainment_amount?: any | null;
  gifts_and_entertainment_document?: string | null;
  documentation_amount?: any | null;
  documentation_document?: string | null;
  projects?: {
    __typename?: 'projects';
    id: number;
    name: string;
    description?: string | null;
    start_date: any;
    end_date: any;
    project_budget: any;
    created_at: any;
    updated_at: any;
    status: boolean;
    note?: string | null;
    contact_person_email?: string | null;
    contact_person_name?: string | null;
  } | null;
  employees?: {
    __typename?: 'employees';
    id: number;
    salaryName: string;
    salaryFunction: string;
    email?: string | null;
    phone: string;
    grossSalary: any;
    recruitmentDate?: any | null;
    status: string;
    created_at: any;
    updated_at: any;
  } | null;
};

export type CreateExpenseClaimMutationVariables = Exact<{
  employee_id: Scalars['Int']['input'];
  project_id: Scalars['Int']['input'];
  amount: Scalars['BigFloat']['input'];
  startDate: Scalars['Date']['input'];
  endDate?: InputMaybe<Scalars['Date']['input']>;
}>;

export type CreateExpenseClaimMutation = {
  __typename?: 'Mutation';
  insertIntoexpense_claimsCollection?: {
    __typename?: 'expense_claimsInsertResponse';
    records: Array<{
      __typename?: 'expense_claims';
      id: number;
      employee_id: number;
      project_id: number;
      amount: any;
      startDate: any;
      endDate?: any | null;
      created_at: any;
      updated_at: any;
      comment?: string | null;
      status: boolean;
      transport_amount?: any | null;
      transport_document?: string | null;
      accommodation_amount?: any | null;
      accommodation_document?: string | null;
      meals_amount?: any | null;
      meals_document?: string | null;
      gifts_and_entertainment_amount?: any | null;
      gifts_and_entertainment_document?: string | null;
      documentation_amount?: any | null;
      documentation_document?: string | null;
      projects?: {
        __typename?: 'projects';
        id: number;
        name: string;
        description?: string | null;
        start_date: any;
        end_date: any;
        project_budget: any;
        created_at: any;
        updated_at: any;
        status: boolean;
        note?: string | null;
        contact_person_email?: string | null;
        contact_person_name?: string | null;
      } | null;
      employees?: {
        __typename?: 'employees';
        id: number;
        salaryName: string;
        salaryFunction: string;
        email?: string | null;
        phone: string;
        grossSalary: any;
        recruitmentDate?: any | null;
        status: string;
        created_at: any;
        updated_at: any;
      } | null;
    }>;
  } | null;
};

export type DeleteExpenseClaimMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteExpenseClaimMutation = {
  __typename?: 'Mutation';
  deleteFromexpense_claimsCollection: {
    __typename?: 'expense_claimsDeleteResponse';
    affectedCount: number;
  };
};

export type GetExpenseClaimsQueryVariables = Exact<{ [key: string]: never }>;

export type GetExpenseClaimsQuery = {
  __typename?: 'Query';
  expense_claimsCollection?: {
    __typename?: 'expense_claimsConnection';
    edges: Array<{
      __typename?: 'expense_claimsEdge';
      node: {
        __typename?: 'expense_claims';
        id: number;
        employee_id: number;
        project_id: number;
        amount: any;
        startDate: any;
        endDate?: any | null;
        created_at: any;
        updated_at: any;
        comment?: string | null;
        status: boolean;
        transport_amount?: any | null;
        transport_document?: string | null;
        accommodation_amount?: any | null;
        accommodation_document?: string | null;
        meals_amount?: any | null;
        meals_document?: string | null;
        gifts_and_entertainment_amount?: any | null;
        gifts_and_entertainment_document?: string | null;
        documentation_amount?: any | null;
        documentation_document?: string | null;
        projects?: {
          __typename?: 'projects';
          id: number;
          name: string;
          description?: string | null;
          start_date: any;
          end_date: any;
          project_budget: any;
          created_at: any;
          updated_at: any;
          status: boolean;
          note?: string | null;
          contact_person_email?: string | null;
          contact_person_name?: string | null;
        } | null;
        employees?: {
          __typename?: 'employees';
          id: number;
          salaryName: string;
          salaryFunction: string;
          email?: string | null;
          phone: string;
          grossSalary: any;
          recruitmentDate?: any | null;
          status: string;
          created_at: any;
          updated_at: any;
        } | null;
      };
    }>;
  } | null;
};

export type GetExpenceClaimByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type GetExpenceClaimByIdQuery = {
  __typename?: 'Query';
  expense_claimsCollection?: {
    __typename?: 'expense_claimsConnection';
    edges: Array<{
      __typename?: 'expense_claimsEdge';
      node: {
        __typename?: 'expense_claims';
        id: number;
        employee_id: number;
        project_id: number;
        amount: any;
        startDate: any;
        endDate?: any | null;
        created_at: any;
        updated_at: any;
        comment?: string | null;
        status: boolean;
        transport_amount?: any | null;
        transport_document?: string | null;
        accommodation_amount?: any | null;
        accommodation_document?: string | null;
        meals_amount?: any | null;
        meals_document?: string | null;
        gifts_and_entertainment_amount?: any | null;
        gifts_and_entertainment_document?: string | null;
        documentation_amount?: any | null;
        documentation_document?: string | null;
        projects?: {
          __typename?: 'projects';
          id: number;
          name: string;
          description?: string | null;
          start_date: any;
          end_date: any;
          project_budget: any;
          created_at: any;
          updated_at: any;
          status: boolean;
          note?: string | null;
          contact_person_email?: string | null;
          contact_person_name?: string | null;
        } | null;
        employees?: {
          __typename?: 'employees';
          id: number;
          salaryName: string;
          salaryFunction: string;
          email?: string | null;
          phone: string;
          grossSalary: any;
          recruitmentDate?: any | null;
          status: string;
          created_at: any;
          updated_at: any;
        } | null;
      };
    }>;
  } | null;
};

export type GrantProjectAgreementFragmentFragment = {
  __typename?: 'grant_project_agreement';
  id: number;
  project_id: number;
  grant?: any | null;
  agreement_date?: any | null;
  created_at: any;
  updated_at: any;
  donor_id: number;
};

export type CreateGrantAgreementMutationVariables = Exact<{
  donor_id: Scalars['Int']['input'];
  project_id: Scalars['Int']['input'];
  grant: Scalars['BigFloat']['input'];
  agreement_date: Scalars['Date']['input'];
}>;

export type CreateGrantAgreementMutation = {
  __typename?: 'Mutation';
  insertIntogrant_project_agreementCollection?: {
    __typename?: 'grant_project_agreementInsertResponse';
    records: Array<{
      __typename?: 'grant_project_agreement';
      id: number;
      project_id: number;
      grant?: any | null;
      agreement_date?: any | null;
      created_at: any;
      updated_at: any;
      donor_id: number;
    }>;
  } | null;
};

export type GetGrantProjectAgreementQueryVariables = Exact<{ [key: string]: never }>;

export type GetGrantProjectAgreementQuery = {
  __typename?: 'Query';
  grant_project_agreementCollection?: {
    __typename?: 'grant_project_agreementConnection';
    edges: Array<{
      __typename?: 'grant_project_agreementEdge';
      node: {
        __typename?: 'grant_project_agreement';
        id: number;
        project_id: number;
        grant?: any | null;
        agreement_date?: any | null;
        created_at: any;
        updated_at: any;
        donor_id: number;
      };
    }>;
  } | null;
};

export type GrantFragmentFragment = {
  __typename?: 'grant_slices';
  id: number;
  project_id: number;
  amount: any;
  received_date: any;
  status?: string | null;
  created_at: any;
  updated_at: any;
};

export type DeleteGrantSliceMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteGrantSliceMutation = {
  __typename?: 'Mutation';
  deleteFromgrant_slicesCollection: {
    __typename?: 'grant_slicesDeleteResponse';
    affectedCount: number;
  };
};

export type UpdateGrantSliceMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  amount: Scalars['BigFloat']['input'];
  received_date: Scalars['Datetime']['input'];
}>;

export type UpdateGrantSliceMutation = {
  __typename?: 'Mutation';
  updategrant_slicesCollection: {
    __typename?: 'grant_slicesUpdateResponse';
    affectedCount: number;
    records: Array<{ __typename?: 'grant_slices'; id: number; amount: any; received_date: any }>;
  };
};

export type CreateGrantSliceMutationVariables = Exact<{
  project_id: Scalars['Int']['input'];
  amount: Scalars['BigFloat']['input'];
  received_date: Scalars['Datetime']['input'];
  status: Scalars['String']['input'];
}>;

export type CreateGrantSliceMutation = {
  __typename?: 'Mutation';
  insertIntogrant_slicesCollection?: {
    __typename?: 'grant_slicesInsertResponse';
    records: Array<{
      __typename?: 'grant_slices';
      id: number;
      amount: any;
      received_date: any;
      status?: string | null;
      project_id: number;
    }>;
  } | null;
};

export type GetGrantsByProjectIdQueryVariables = Exact<{
  projectId: Scalars['Int']['input'];
}>;

export type GetGrantsByProjectIdQuery = {
  __typename?: 'Query';
  grant_slicesCollection?: {
    __typename?: 'grant_slicesConnection';
    edges: Array<{
      __typename?: 'grant_slicesEdge';
      node: {
        __typename?: 'grant_slices';
        id: number;
        project_id: number;
        amount: any;
        received_date: any;
        status?: string | null;
        created_at: any;
        updated_at: any;
      };
    }>;
  } | null;
};

export type IssuedInvoiceFragmentFragment = {
  __typename?: 'issued_invoices';
  id: number;
  client_id: number;
  project_id: number;
  amount: any;
  issue_date: any;
  due_date: any;
  billingStatus: string;
  created_at: any;
  updated_at: any;
  designation?: string | null;
};

export type MemberFragmentFragment = {
  __typename?: 'members';
  id: number;
  amount: any;
  payment_date: any;
  created_at: any;
  updated_at: any;
  rc_cin: string;
  payment_method: Payment_Method_Enum;
  status: boolean;
  full_name: string;
  address?: string | null;
  email?: string | null;
  phone: string;
};

export type MembershipFragmentFragment = {
  __typename?: 'memberships';
  id: any;
  created_at: any;
  member_id: number;
  updated_at: any;
  membership_category: Membership_Category_Enum;
};

export type PettyCashFragmentFragment = {
  __typename?: 'petty_cash';
  id: number;
  grant_project_agreement_id?: number | null;
  category_id: number;
  amount: any;
  startDate: any;
  motif: string;
  created_at: any;
  updated_at: any;
  project: number;
};

export type ProjectFragmentFragment = {
  __typename?: 'projects';
  id: number;
  name: string;
  description?: string | null;
  start_date: any;
  end_date: any;
  project_budget: any;
  created_at: any;
  updated_at: any;
  status: boolean;
  note?: string | null;
  contact_person_email?: string | null;
  contact_person_name?: string | null;
};

export type CreateProjectMutationVariables = Exact<{
  name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  start_date: Scalars['Date']['input'];
  end_date: Scalars['Date']['input'];
  project_budget: Scalars['BigFloat']['input'];
  status?: InputMaybe<Scalars['Boolean']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  contact_person_email?: InputMaybe<Scalars['String']['input']>;
  contact_person_name?: InputMaybe<Scalars['String']['input']>;
}>;

export type CreateProjectMutation = {
  __typename?: 'Mutation';
  insertIntoprojectsCollection?: {
    __typename?: 'projectsInsertResponse';
    records: Array<{
      __typename?: 'projects';
      id: number;
      name: string;
      description?: string | null;
      start_date: any;
      end_date: any;
      project_budget: any;
      created_at: any;
      updated_at: any;
      status: boolean;
      note?: string | null;
      contact_person_email?: string | null;
      contact_person_name?: string | null;
    }>;
  } | null;
};

export type UpdateProjectMutationVariables = Exact<{
  set: ProjectsUpdateInput;
  filter?: InputMaybe<ProjectsFilter>;
  atMost: Scalars['Int']['input'];
}>;

export type UpdateProjectMutation = {
  __typename?: 'Mutation';
  updateprojectsCollection: {
    __typename?: 'projectsUpdateResponse';
    records: Array<{
      __typename?: 'projects';
      id: number;
      name: string;
      description?: string | null;
      start_date: any;
      end_date: any;
      project_budget: any;
      status: boolean;
      note?: string | null;
      contact_person_email?: string | null;
      contact_person_name?: string | null;
    }>;
  };
};

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type DeleteProjectMutation = {
  __typename?: 'Mutation';
  deleteFromprojectsCollection: { __typename?: 'projectsDeleteResponse'; affectedCount: number };
};

export type GetProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProjectsQuery = {
  __typename?: 'Query';
  projectsCollection?: {
    __typename?: 'projectsConnection';
    edges: Array<{
      __typename?: 'projectsEdge';
      node: {
        __typename?: 'projects';
        id: number;
        name: string;
        description?: string | null;
        start_date: any;
        end_date: any;
        project_budget: any;
        created_at: any;
        updated_at: any;
        status: boolean;
        note?: string | null;
        contact_person_email?: string | null;
        contact_person_name?: string | null;
      };
    }>;
  } | null;
};

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;

export type GetProjectByIdQuery = {
  __typename?: 'Query';
  projectsCollection?: {
    __typename?: 'projectsConnection';
    edges: Array<{
      __typename?: 'projectsEdge';
      node: {
        __typename?: 'projects';
        id: number;
        name: string;
        description?: string | null;
        start_date: any;
        end_date: any;
        project_budget: any;
        created_at: any;
        updated_at: any;
        status: boolean;
        note?: string | null;
        contact_person_email?: string | null;
        contact_person_name?: string | null;
      };
    }>;
  } | null;
};

export type ProviderInvoiceFragmentFragment = {
  __typename?: 'provider_invoices';
  id: number;
  service_provider_id: number;
  project_id: number;
  invoice_number: string;
  amount: any;
  issue_date: any;
  due_date: any;
  payment_date: any;
  status: string;
  created_at: any;
  updated_at: any;
};

export type ProvidersInvoiceProjectFragmentFragment = {
  __typename?: 'providers_invoice_project';
  id: number;
  created_at: any;
  updated_at?: any | null;
  provider_invoice_id: number;
  project_id: number;
};

export type ServiceProviderFragmentFragment = {
  __typename?: 'service_providers';
  id: number;
  name: string;
  email?: string | null;
  phone: string;
  created_at: any;
  updated_at: any;
  ice: string;
  depositedDate?: any | null;
  dueDate: any;
  amount: any;
  status_id: number;
};

export type StatusFragmentFragment = {
  __typename?: 'status';
  id: any;
  created_at: any;
  name: string;
};

export type GetStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetStatusQuery = {
  __typename?: 'Query';
  statusCollection?: {
    __typename?: 'statusConnection';
    edges: Array<{
      __typename?: 'statusEdge';
      node: { __typename?: 'status'; id: any; created_at: any; name: string };
    }>;
  } | null;
};

export type UtilitiesFragmentFragment = {
  __typename?: 'utilities';
  id: number;
  created_at?: any | null;
  updated_at?: any | null;
};

export type UtilityGrantAllocationFragmentFragment = {
  __typename?: 'utility_grant_allocations';
  id: number;
  utility_id: number;
  grant_project_agreement_id: number;
  allocation_percentage: any;
  amount: any;
  created_at: any;
  updated_at: any;
  project_id: number;
};
