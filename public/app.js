// ============================================
// CreditClear DIY - Main Application JavaScript
// ============================================

// Bureau Addresses
const bureauAddresses = {
    equifax: 'Equifax Information Services LLC\nP.O. Box 740241\nAtlanta, GA 30374',
    experian: 'Experian\nP.O. Box 4500\nAllen, TX 75013',
    transunion: 'TransUnion LLC\nConsumer Dispute Center\nP.O. Box 2000\nChester, PA 19016'
};

// ============================================
// LETTER TEMPLATES DATABASE
// ============================================
const letterTemplates = {
    bureau: [
        {
            id: 'general-dispute',
            title: 'General Dispute Letter',
            description: 'The standard letter to dispute any inaccurate item on your credit report.',
            useFor: 'Any inaccurate information, wrong balances, accounts not yours',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Dispute of Inaccurate Credit Information
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I am writing to dispute the following information on my credit report. I have identified the following item(s) that are inaccurate:

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]
Reason for Dispute: [DISPUTE_REASON]

Under the Fair Credit Reporting Act, Section 611 (15 U.S.C. § 1681i), you are required to conduct a reasonable investigation into this matter within 30 days of receiving this dispute.

If you cannot verify this information, it must be removed from my credit report immediately.

Please send me an updated copy of my credit report after the investigation is complete.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID
- Copy of proof of address (utility bill or bank statement)`
        },
        {
            id: '609-verification',
            title: '609 Verification Letter',
            description: 'Request verification of accounts under Section 609 of the FCRA.',
            useFor: 'Requesting original documentation that proves an account belongs to you',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Request for Verification Under Section 609
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

Pursuant to the Fair Credit Reporting Act, Section 609 (15 U.S.C. § 1681g), I am requesting verification of the following account(s) on my credit report:

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

I am requesting that you provide me with:
1. The original signed contract or agreement bearing my signature
2. Proof that you have the legal right to report this information
3. Documentation showing this account belongs to me

If you are unable to provide this verification within 30 days, I request that this item be removed from my credit report immediately as required by the FCRA.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID
- Copy of proof of address`
        },
        {
            id: '611-method-verification',
            title: '611 Method of Verification Letter',
            description: 'Request the method used to verify a disputed item (use after initial dispute).',
            useFor: 'Follow-up when bureau claims they verified an item but you disagree',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Request for Method of Verification - Section 611(a)(7)
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I recently disputed the following account and you responded that it was "verified":

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

Under Section 611(a)(7) of the Fair Credit Reporting Act, I am requesting that you provide me with a description of the procedure used to determine the accuracy of this disputed information, including:

1. The business name and address of any furnisher contacted
2. The telephone number of any furnisher contacted
3. A description of the reinvestigation procedure

[DISPUTE_REASON]

If you cannot provide this information within 15 days, I demand that this item be deleted from my credit report.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'procedural-request',
            title: 'Procedural Request Letter',
            description: 'Request details about the investigation procedure used by the bureau.',
            useFor: 'When you want to understand how the bureau investigated your dispute',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Request for Investigation Procedure Details
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I previously disputed the following account on my credit report:

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

I received your response indicating the item was verified. However, I believe the investigation was not conducted reasonably as required by the FCRA.

I am requesting the following information:
1. The name, address, and phone number of each person contacted during the investigation
2. A complete description of the procedure used
3. All documents reviewed during the investigation

[DISPUTE_REASON]

Please respond within 15 days as required by law.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'frivolous-rebuttal',
            title: 'Frivolous Response Rebuttal',
            description: 'Challenge a bureau that labeled your dispute as frivolous.',
            useFor: 'When a bureau refuses to investigate claiming your dispute is frivolous',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Rebuttal to Frivolous Dispute Determination
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I received your response dated [DATE] in which you determined my dispute regarding the following account was "frivolous or irrelevant":

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

I strongly disagree with this determination. My dispute is legitimate because:

[DISPUTE_REASON]

Under Section 611 of the FCRA, you may only determine a dispute is frivolous if it is "substantially similar" to a previous dispute. My dispute contains new and specific information that warrants a proper investigation.

I demand that you conduct a reasonable investigation within 30 days. Failure to do so will be considered willful noncompliance with the FCRA, for which I may seek damages under Section 616.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID
- Supporting documentation`
        }
    ],
    collections: [
        {
            id: 'debt-validation',
            title: 'Debt Validation Letter',
            description: 'Demand that a collector prove you owe the debt.',
            useFor: 'Any collection account - always send this first',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[COLLECTOR_ADDRESS]

Re: Debt Validation Request
Account/Reference Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing in response to your attempt to collect a debt from me. Under the Fair Debt Collection Practices Act, Section 809(b), I am requesting validation of this alleged debt.

Please provide the following:

1. The amount of the debt and how it was calculated
2. The name and address of the original creditor
3. A copy of the original signed agreement
4. Proof that you are licensed to collect debt in my state
5. Proof that the statute of limitations has not expired
6. A complete payment history from the original creditor

Until you provide proper validation, you must cease all collection activity and remove any reporting of this account to the credit bureaus.

This letter is not an acknowledgment of the debt, nor a promise to pay.

Sincerely,

[YOUR_NAME]

Sent via USPS Certified Mail`
        },
        {
            id: 'pay-for-delete',
            title: 'Pay-for-Delete Letter',
            description: 'Offer to pay a debt in exchange for removing it from your credit report.',
            useFor: 'When you can afford to pay but want it removed from your report',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[COLLECTOR_ADDRESS]

Re: Pay-for-Delete Offer
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing regarding the above-referenced account. I am prepared to resolve this matter under the following conditions:

I will pay [AMOUNT] as settlement in full for this account, provided that you agree to:

1. Remove this account entirely from all three credit bureaus (Equifax, Experian, and TransUnion)
2. Not sell or transfer this debt to any other entity
3. Consider this matter fully resolved with no further collection activity

This is a conditional offer. Payment will only be made after I receive written confirmation of these terms on your company letterhead.

Please respond in writing within 15 days. This letter is not an acknowledgment of the debt.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'cease-desist',
            title: 'Cease & Desist Letter',
            description: 'Demand a collector stop contacting you.',
            useFor: 'Harassment from collectors, unwanted calls and letters',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[COLLECTOR_ADDRESS]

Re: Cease and Desist Communication
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

Pursuant to the Fair Debt Collection Practices Act, Section 805(c), I am demanding that you cease all communication with me regarding the above-referenced account.

This includes but is not limited to:
- Phone calls to my home, work, or cell phone
- Letters, emails, or text messages
- Contact with any third parties regarding this matter

Be advised that any continued contact will be considered a violation of the FDCPA, and I will pursue all legal remedies available to me, including statutory damages.

This is not an acknowledgment of the debt.

Sincerely,

[YOUR_NAME]

Sent via USPS Certified Mail`
        },
        {
            id: 'debt-settlement',
            title: 'Debt Settlement Offer',
            description: 'Negotiate a reduced payment amount with a collector.',
            useFor: 'When you want to settle for less than the full amount',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[COLLECTOR_ADDRESS]

Re: Settlement Offer
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing regarding the above-referenced account with a reported balance of [ORIGINAL_AMOUNT].

Due to financial hardship, I am unable to pay the full amount. However, I am willing to settle this account for [SETTLEMENT_AMOUNT], which represents [PERCENTAGE]% of the total balance.

[DISPUTE_REASON]

This settlement is contingent upon:
1. Written acceptance of this offer on your company letterhead
2. Agreement that this constitutes payment in full
3. Reporting the account as "Paid in Full" or "Settled" to all credit bureaus

Please respond within 30 days. This offer expires on [EXPIRY_DATE].

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'statute-limitations',
            title: 'Statute of Limitations Letter',
            description: 'Assert that a debt is too old to be legally collected.',
            useFor: 'Debts that are past the statute of limitations in your state',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[COLLECTOR_ADDRESS]

Re: Time-Barred Debt Notice
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing regarding your attempts to collect the above-referenced debt.

Please be advised that I believe this debt has exceeded the statute of limitations for my state. The last activity on this account was [DATE_OF_LAST_ACTIVITY], which is more than [YEARS] years ago.

[DISPUTE_REASON]

Under the Fair Debt Collection Practices Act, continuing to attempt to collect a time-barred debt through misleading means is a violation of Section 807.

I demand that you:
1. Cease all collection attempts immediately
2. Remove this account from all credit bureau reports
3. Confirm in writing that no further collection will be pursued

Sincerely,

[YOUR_NAME]`
        }
    ],
    'late-payments': [
        {
            id: 'goodwill-adjustment',
            title: 'Goodwill Adjustment Letter',
            description: 'Ask a creditor to remove a late payment as a gesture of goodwill.',
            useFor: 'When you paid late but have a good history otherwise',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Goodwill Adjustment Request
Account Number: [ACCOUNT_NUMBER]

Dear [ACCOUNT_NAME] Customer Service,

I am writing to respectfully request a goodwill adjustment to remove the late payment reported on my account for [LATE_MONTH/YEAR].

I have been a loyal customer for [NUMBER] years and have maintained an excellent payment history. Unfortunately, [DISPUTE_REASON]

Since then, I have brought my account current and have continued to make all payments on time. I believe this one incident does not reflect my overall creditworthiness.

I kindly ask that you consider removing this late payment mark as a gesture of goodwill. This adjustment would mean a great deal to me as I work to maintain good credit.

Thank you for your time and consideration.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'late-payment-dispute',
            title: 'Late Payment Dispute',
            description: 'Dispute a late payment you believe was reported in error.',
            useFor: 'When a payment was on time but reported late, or amount is wrong',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Dispute of Late Payment Reporting
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I am writing to dispute a late payment that is inaccurately reported on my credit report:

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]
Late Payment Date: [LATE_DATE]

This payment was NOT late. [DISPUTE_REASON]

I request that you investigate this matter and correct the reporting to show the payment was made on time.

Under the FCRA, you must complete this investigation within 30 days. If you cannot verify the late payment, it must be removed.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of bank statement showing payment date
- Copy of government-issued ID`
        },
        {
            id: 'hardship-explanation',
            title: 'Hardship Explanation Letter',
            description: 'Explain circumstances that caused late payments due to hardship.',
            useFor: 'Medical emergencies, job loss, natural disasters',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Hardship Explanation and Goodwill Request
Account Number: [ACCOUNT_NUMBER]

Dear Sir or Madam:

I am writing to explain the circumstances that led to the late payment(s) on my account and to request their removal from my credit report.

During [TIME_PERIOD], I experienced the following hardship:

[DISPUTE_REASON]

This situation was beyond my control and directly impacted my ability to make timely payments. Since recovering from this hardship, I have brought all accounts current and am committed to maintaining on-time payments.

I respectfully request that you remove the late payment notation(s) from my credit report as a goodwill gesture given these extenuating circumstances.

Thank you for your understanding and consideration.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'payment-history-correction',
            title: 'Payment History Correction',
            description: 'Request correction of incorrectly reported payment history.',
            useFor: 'Wrong payment dates, amounts, or status being reported',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Payment History Correction Request
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

Upon reviewing my credit report, I discovered that my payment history for the above account is being reported inaccurately.

The report shows: [WHAT_IS_REPORTED]
The correct information is: [WHAT_IS_CORRECT]

[DISPUTE_REASON]

Please correct this information and update your reporting to all three credit bureaus (Equifax, Experian, and TransUnion) within 30 days as required by the FCRA.

Sincerely,

[YOUR_NAME]

Enclosures: [List supporting documents]`
        }
    ],
    inquiries: [
        {
            id: 'hard-inquiry-removal',
            title: 'Hard Inquiry Removal Letter',
            description: 'Request removal of an unauthorized hard inquiry.',
            useFor: 'Credit checks you did not authorize',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Unauthorized Hard Inquiry - Request for Removal
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I am writing to dispute the following hard inquiry on my credit report that I did not authorize:

Company Name: [ACCOUNT_NAME]
Date of Inquiry: [INQUIRY_DATE]

I did not apply for credit with this company and did not give permission for them to access my credit report. This inquiry is unauthorized and must be removed.

[DISPUTE_REASON]

Under the Fair Credit Reporting Act, Section 604, a creditor must have permissible purpose to pull a credit report. I am requesting that you remove this unauthorized inquiry immediately.

If this inquiry is not removed within 30 days, I will file complaints with the Consumer Financial Protection Bureau and the Federal Trade Commission.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID`
        },
        {
            id: 'unauthorized-inquiry',
            title: 'Unauthorized Inquiry Dispute',
            description: 'Dispute an inquiry directly with the company that pulled your report.',
            useFor: 'Contacting the company that made the unauthorized inquiry',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[COMPANY_ADDRESS]

Re: Unauthorized Credit Inquiry
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

It has come to my attention that your company accessed my credit report on [INQUIRY_DATE] without my authorization.

[DISPUTE_REASON]

Under the Fair Credit Reporting Act, Section 604, you must have a permissible purpose to access a consumer's credit report. Since I did not authorize this inquiry, your access was unlawful.

I demand that you:
1. Provide proof of my authorization for this credit pull
2. Contact all credit bureaus to remove this inquiry
3. Confirm in writing that this has been resolved

Failure to respond within 30 days will result in formal complaints being filed with the CFPB and FTC.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'identity-theft',
            title: 'Identity Theft Affidavit Letter',
            description: 'Report identity theft to credit bureaus with accounts opened fraudulently.',
            useFor: 'Accounts opened in your name without your knowledge',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Identity Theft - Fraudulent Accounts
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I am a victim of identity theft. The following account(s) on my credit report were opened fraudulently without my knowledge or consent:

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

[DISPUTE_REASON]

Under the Fair Credit Reporting Act and the Identity Theft and Assumption Deterrence Act, I request that you:

1. Block all fraudulent information from my credit report
2. Place an extended fraud alert on my file
3. Provide me with a copy of my updated credit report

I have filed a police report and an FTC Identity Theft Report, copies of which are enclosed.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID
- Copy of police report
- FTC Identity Theft Report`
        },
        {
            id: 'fraud-alert',
            title: 'Fraud Alert Request',
            description: 'Request a fraud alert be placed on your credit file.',
            useFor: 'Preventing further unauthorized access to your credit',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Request for Fraud Alert
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I am writing to request that an initial fraud alert be placed on my credit file. I have reason to believe I may be a victim of identity theft.

[DISPUTE_REASON]

Please place a fraud alert on my file and notify the other two credit bureaus as required by law. I also request a free copy of my credit report.

My contact information for verification purposes:
Phone: [PHONE]
Address: [YOUR_ADDRESS], [YOUR_CITY_STATE_ZIP]

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID`
        },
        {
            id: 'security-freeze',
            title: 'Security Freeze Letter',
            description: 'Request a security freeze on your credit file.',
            useFor: 'Locking your credit to prevent new accounts from being opened',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Request for Security Freeze
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I am writing to request a security freeze be placed on my credit file pursuant to applicable state law and the Economic Growth, Regulatory Relief, and Consumer Protection Act.

[DISPUTE_REASON]

Please place a security freeze on my file immediately and provide me with a PIN or password that I can use to temporarily lift or remove the freeze when needed.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID
- Copy of proof of address`
        }
    ],
    creditor: [
        {
            id: '623-direct-dispute',
            title: '623 Direct Dispute Letter',
            description: 'Dispute directly with the creditor under Section 623 of the FCRA.',
            useFor: 'Disputing directly with the company reporting inaccurate information',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Direct Dispute Under FCRA Section 623
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

Under Section 623 of the Fair Credit Reporting Act (15 U.S.C. § 1681s-2), I am writing to dispute the accuracy of information you are furnishing to the credit bureaus regarding my account.

The information being reported: [WHAT_IS_REPORTED]
The accurate information: [DISPUTE_REASON]

As a furnisher of information, you have a legal obligation under Section 623(b) to:
1. Conduct an investigation regarding the disputed information
2. Review all relevant information provided
3. Report the results to all credit bureaus
4. Modify, delete, or permanently block reporting if inaccurate

Please investigate this matter and correct your reporting within 30 days.

Sincerely,

[YOUR_NAME]

Enclosures: [List supporting documents]`
        },
        {
            id: 'original-creditor-dispute',
            title: 'Original Creditor Dispute',
            description: 'Dispute inaccurate reporting with the original creditor.',
            useFor: 'When the original creditor is reporting wrong information',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Dispute of Account Information
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing to dispute inaccurate information being reported on my credit report regarding the above account.

[DISPUTE_REASON]

I request that you:
1. Investigate the accuracy of the reported information
2. Correct any inaccurate information with all three credit bureaus
3. Provide me with written confirmation of the corrections

Under the FCRA, you are obligated to report accurate information. Please resolve this within 30 days.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'balance-dispute',
            title: 'Balance Dispute Letter',
            description: 'Dispute an incorrect balance being reported on your account.',
            useFor: 'Wrong balance amounts on your credit report',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Balance Dispute
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing to dispute the balance being reported for my account.

Reported balance: [REPORTED_AMOUNT]
Correct balance: [CORRECT_AMOUNT]

[DISPUTE_REASON]

Please:
1. Investigate and verify the correct balance
2. Correct the reported balance with all three credit bureaus
3. Provide me with an updated account statement

I expect this matter to be resolved within 30 days as required by the Fair Credit Reporting Act.

Sincerely,

[YOUR_NAME]

Enclosures: [List documents]`
        },
        {
            id: 'account-closure',
            title: 'Account Closure Confirmation',
            description: 'Request confirmation that closed account is reported correctly.',
            useFor: 'Ensuring closed accounts show proper status',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Account Closure Status Correction
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing regarding the above-referenced account which was closed on [CLOSURE_DATE].

My credit report shows this account as [CURRENT_STATUS], however it should show as "Closed by Consumer" or "Account Closed."

[DISPUTE_REASON]

Please update your records and report the correct account status to all three credit bureaus.

Sincerely,

[YOUR_NAME]`
        }
    ],
    special: [
        {
            id: 'medical-debt',
            title: 'Medical Debt Dispute Letter',
            description: 'Dispute medical debt collections on your credit report.',
            useFor: 'Medical bills sent to collections',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[COLLECTOR_ADDRESS]

Re: Dispute of Medical Debt
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing to dispute the medical debt referenced above.

Under the Fair Debt Collection Practices Act and HIPAA regulations, I request the following:

1. Validation of this debt including the original medical provider's name
2. Proof that you are authorized to collect this debt
3. An itemized statement of the charges
4. Proof that my insurance was billed before collection
5. A copy of the original signed agreement for services

[DISPUTE_REASON]

Note: Under new credit reporting rules, medical debts under $500 should not appear on credit reports, and paid medical debts must be removed.

Until this debt is validated, you must cease all collection activity.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'student-loan',
            title: 'Student Loan Dispute Letter',
            description: 'Dispute inaccurate student loan information.',
            useFor: 'Wrong balance, status, or payment history on student loans',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[SERVICER_ADDRESS]

Re: Student Loan Account Dispute
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing to dispute inaccurate information being reported regarding my student loan account.

[DISPUTE_REASON]

I request that you:
1. Provide a complete payment history for this account
2. Verify the current balance and interest calculations
3. Correct any inaccurate information with all three credit bureaus
4. Provide written confirmation of any corrections

Under the FCRA, you are required to report accurate information. Please resolve this within 30 days.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'bankruptcy-dispute',
            title: 'Bankruptcy Removal Letter',
            description: 'Request removal of bankruptcy if it should no longer be reported.',
            useFor: 'Bankruptcy that is older than 7-10 years',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Removal of Expired Bankruptcy
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I am writing to request the removal of a bankruptcy from my credit report.

Type: [BANKRUPTCY_TYPE]
Filing Date: [FILING_DATE]
Case Number: [ACCOUNT_NUMBER]

Under the FCRA, Chapter 7 bankruptcy may only be reported for 10 years and Chapter 13 for 7 years from the filing date. This bankruptcy has exceeded the allowable reporting period.

[DISPUTE_REASON]

I request immediate removal of this item from my credit report.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'judgment-dispute',
            title: 'Judgment Dispute Letter',
            description: 'Dispute a civil judgment appearing on your credit report.',
            useFor: 'Court judgments that are inaccurate or should be removed',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Dispute of Civil Judgment
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I am writing to dispute the following civil judgment on my credit report:

Case Name: [ACCOUNT_NAME]
Case Number: [ACCOUNT_NUMBER]

[DISPUTE_REASON]

Please investigate this item and provide verification. If it cannot be verified within 30 days, I request its immediate removal.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'tax-lien',
            title: 'Tax Lien Dispute Letter',
            description: 'Dispute a tax lien that has been paid or is inaccurate.',
            useFor: 'Paid tax liens or incorrect tax lien information',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Dispute of Tax Lien
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I am writing to dispute the following tax lien on my credit report:

Lien Details: [ACCOUNT_NAME]
Amount: [ACCOUNT_NUMBER]

[DISPUTE_REASON]

Note: As of 2018, tax liens should no longer appear on credit reports unless they meet strict identification requirements. Please verify this item meets current reporting standards.

I request investigation and removal within 30 days.

Sincerely,

[YOUR_NAME]

Enclosures:
- Proof of lien satisfaction/release (if applicable)`
        }
    ]
};

// ============================================
// CURRENT STATE
// ============================================
let currentCategory = 'bureau';
let currentLetter = null;
let trackedDisputes = JSON.parse(localStorage.getItem('disputes') || '[]');

// ============================================
// NAVIGATION & UI FUNCTIONS
// ============================================

function showLogin() {
    document.getElementById('login-modal').style.display = 'flex';
}

function closeLogin() {
    document.getElementById('login-modal').style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', 'true');
    closeLogin();
    showDashboard();
}

function showDashboard() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    displayLetters(currentCategory);
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('landing-page').style.display = 'block';
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(s => s.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';

    // Update nav active state
    const navLinks = document.querySelectorAll('.dashboard-nav .nav-links a');
    navLinks.forEach(link => link.classList.remove('nav-active'));
    event.target.classList.add('nav-active');

    if (sectionId === 'tracker') {
        renderTracker();
    }
}

// ============================================
// DISPUTE FINDER FUNCTIONS
// ============================================

function showFinderStep(step) {
    document.querySelectorAll('.finder-step').forEach(s => s.style.display = 'none');
    document.getElementById('finder-step-' + step).style.display = 'block';

    if (step === 3) {
        generateRecommendations();
    }
}

function updateRecommendations() {
    // Just tracks checkbox state; recommendations generated on step 3
}

function generateRecommendations() {
    const container = document.getElementById('recommendations-list');
    let html = '';
    let hasIssues = false;

    if (document.getElementById('has-collections').checked) {
        hasIssues = true;
        html += createRecommendationCard('Collections Found', 'Send a Debt Validation Letter to each collector FIRST. Then dispute with the bureaus using a 609 Verification Letter.', ['Debt Validation Letter', '609 Verification Letter', 'Pay-for-Delete Letter']);
    }
    if (document.getElementById('has-late-payments').checked) {
        hasIssues = true;
        html += createRecommendationCard('Late Payments', 'Try a Goodwill Adjustment Letter to the creditor first. If denied, dispute with the bureaus.', ['Goodwill Adjustment Letter', 'Late Payment Dispute', 'General Dispute Letter']);
    }
    if (document.getElementById('has-charge-offs').checked) {
        hasIssues = true;
        html += createRecommendationCard('Charge-Offs', 'Start with a 609 Verification Letter to the bureaus. Then consider a 623 Direct Dispute with the creditor.', ['609 Verification Letter', '623 Direct Dispute', 'Debt Settlement Offer']);
    }
    if (document.getElementById('has-inquiries').checked) {
        hasIssues = true;
        html += createRecommendationCard('Hard Inquiries', 'Send a Hard Inquiry Removal Letter for each unauthorized inquiry.', ['Hard Inquiry Removal Letter', 'Unauthorized Inquiry Dispute']);
    }
    if (document.getElementById('has-wrong-info').checked) {
        hasIssues = true;
        html += createRecommendationCard('Wrong Information', 'Send a General Dispute Letter to each bureau reporting the error.', ['General Dispute Letter', '623 Direct Dispute', 'Payment History Correction']);
    }
    if (document.getElementById('has-unknown-accounts').checked) {
        hasIssues = true;
        html += createRecommendationCard('Unknown Accounts (Possible Identity Theft)', 'File an identity theft report and send dispute letters immediately.', ['Identity Theft Affidavit Letter', 'Fraud Alert Request', 'Security Freeze Letter']);
    }
    if (document.getElementById('has-old-debts').checked) {
        hasIssues = true;
        html += createRecommendationCard('Old Debts (7+ Years)', 'These should have fallen off. Dispute with the bureaus for removal.', ['General Dispute Letter', 'Statute of Limitations Letter']);
    }
    if (document.getElementById('has-bankruptcy').checked) {
        hasIssues = true;
        html += createRecommendationCard('Bankruptcy', 'If older than 7-10 years, dispute for removal. Otherwise, ensure it is reported accurately.', ['Bankruptcy Removal Letter', 'General Dispute Letter']);
    }
    if (document.getElementById('has-medical').checked) {
        hasIssues = true;
        html += createRecommendationCard('Medical Debt', 'New rules protect you! Medical debts under $500 and paid medical debts should not be on your report.', ['Medical Debt Dispute Letter', 'Debt Validation Letter']);
    }
    if (document.getElementById('has-student-loans').checked) {
        hasIssues = true;
        html += createRecommendationCard('Student Loan Issues', 'Dispute inaccurate information with your servicer and the bureaus.', ['Student Loan Dispute Letter', '623 Direct Dispute']);
    }

    if (!hasIssues) {
        html = '<div class="no-issues"><h3>No Issues Selected</h3><p>Go back and check the items that appear on your credit report.</p></div>';
    }

    container.innerHTML = html;
}

function createRecommendationCard(title, description, letters) {
    return `
        <div class="recommendation-card">
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="letters-to-use">
                <h4>Letters to Use:</h4>
                <ul>${letters.map(l => '<li>' + l + '</li>').join('')}</ul>
            </div>
        </div>
    `;
}

// ============================================
// LETTER DISPLAY & GENERATION
// ============================================

function selectCategory(category) {
    currentCategory = category;
    displayLetters(category);

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    document.getElementById('letter-generator').style.display = 'none';
    document.querySelector('.letter-selector').style.display = 'block';
}

function displayLetters(category) {
    const container = document.getElementById('letter-templates');
    const letters = letterTemplates[category] || [];

    container.innerHTML = letters.map(letter => `
        <div class="letter-card" onclick="selectLetter('${category}', '${letter.id}')">
            <h3>${letter.title}</h3>
            <p>${letter.description}</p>
            <span class="use-for">Best for: ${letter.useFor}</span>
        </div>
    `).join('');
}

function selectLetter(category, letterId) {
    const letters = letterTemplates[category] || [];
    currentLetter = letters.find(l => l.id === letterId);

    if (currentLetter) {
        document.getElementById('selected-letter-title').textContent = currentLetter.title;
        document.querySelector('.letter-selector').style.display = 'none';
        document.getElementById('letter-generator').style.display = 'block';
        document.getElementById('letter-preview').innerHTML = '<p class="preview-placeholder">Fill in the form and click "Generate Letter" to see your preview</p>';
    }
}

function backToLetters() {
    document.getElementById('letter-generator').style.display = 'none';
    document.querySelector('.letter-selector').style.display = 'block';
}

function generateLetter() {
    if (!currentLetter) return;

    const name = document.getElementById('user-name').value || '[YOUR NAME]';
    const address = document.getElementById('user-address').value || '[YOUR ADDRESS]';
    const cityState = document.getElementById('user-city-state').value || '[CITY, STATE ZIP]';
    const ssn = document.getElementById('user-ssn').value || '****';
    const dob = document.getElementById('user-dob').value || '[DOB]';
    const accountName = document.getElementById('account-name').value || '[ACCOUNT NAME]';
    const accountNumber = document.getElementById('account-number').value || '[ACCOUNT NUMBER]';
    const disputeReason = document.getElementById('dispute-reason').value || '[YOUR REASON FOR DISPUTE]';

    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    let letter = currentLetter.template
        .replace(/\[YOUR_NAME\]/g, name)
        .replace(/\[YOUR_ADDRESS\]/g, address)
        .replace(/\[YOUR_CITY_STATE_ZIP\]/g, cityState)
        .replace(/\[SSN_LAST4\]/g, ssn)
        .replace(/\[DOB\]/g, dob)
        .replace(/\[DATE\]/g, today)
        .replace(/\[ACCOUNT_NAME\]/g, accountName)
        .replace(/\[ACCOUNT_NUMBER\]/g, accountNumber)
        .replace(/\[DISPUTE_REASON\]/g, disputeReason)
        .replace(/\[BUREAU_NAME\]/g, 'Equifax Information Services LLC')
        .replace(/\[BUREAU_ADDRESS\]/g, bureauAddresses.equifax)
        .replace(/\[COLLECTOR_ADDRESS\]/g, '[COLLECTOR ADDRESS]')
        .replace(/\[CREDITOR_ADDRESS\]/g, '[CREDITOR ADDRESS]')
        .replace(/\[COMPANY_ADDRESS\]/g, '[COMPANY ADDRESS]')
        .replace(/\[SERVICER_ADDRESS\]/g, '[SERVICER ADDRESS]')
        .replace(/\[PHONE\]/g, document.getElementById('user-phone').value || '[PHONE]');

    document.getElementById('letter-preview').innerHTML = '<pre style="white-space: pre-wrap; font-family: \'Courier New\', monospace; font-size: 14px; line-height: 1.6;">' + letter + '</pre>';
}

function copyLetter() {
    const preview = document.getElementById('letter-preview');
    const text = preview.innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert('Letter copied to clipboard! Paste it into a Word document to print.');
    }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Letter copied to clipboard!');
    });
}

function downloadLetter() {
    const preview = document.getElementById('letter-preview');
    const text = preview.innerText;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = (currentLetter ? currentLetter.title.replace(/\s+/g, '-').toLowerCase() : 'dispute-letter') + '.txt';
    a.click();
    URL.revokeObjectURL(url);
    alert('Letter downloaded! Open in Word or Google Docs, format it, then print and mail via USPS Certified Mail.');
}

// ============================================
// DISPUTE TRACKER
// ============================================

function addToTracker() {
    if (!currentLetter) return;

    const accountName = document.getElementById('account-name').value || 'Unknown';
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + 45);

    const dispute = {
        id: Date.now(),
        letterType: currentLetter.title,
        sentTo: accountName,
        dateSent: today.toLocaleDateString(),
        responseDue: dueDate.toLocaleDateString(),
        status: 'pending'
    };

    trackedDisputes.push(dispute);
    localStorage.setItem('disputes', JSON.stringify(trackedDisputes));
    alert('Added to your Dispute Tracker! Check the Tracker tab to monitor progress.');
}

function renderTracker() {
    const tbody = document.getElementById('tracker-body');
    updateTrackerStats();

    if (trackedDisputes.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="6">No letters tracked yet. Generate a letter and add it to your tracker.</td></tr>';
        return;
    }

    tbody.innerHTML = trackedDisputes.map(dispute => `
        <tr>
            <td>${dispute.letterType}</td>
            <td>${dispute.sentTo}</td>
            <td>${dispute.dateSent}</td>
            <td>${dispute.responseDue}</td>
            <td><span class="status-badge status-${dispute.status}">${dispute.status === 'pending' ? 'Awaiting Response' : dispute.status === 'success' ? 'Item Removed' : 'Denied'}</span></td>
            <td>
                <select onchange="updateDisputeStatus(${dispute.id}, this.value)">
                    <option value="pending" ${dispute.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="success" ${dispute.status === 'success' ? 'selected' : ''}>Removed</option>
                    <option value="denied" ${dispute.status === 'denied' ? 'selected' : ''}>Denied</option>
                </select>
            </td>
        </tr>
    `).join('');
}

function updateDisputeStatus(id, status) {
    const dispute = trackedDisputes.find(d => d.id === id);
    if (dispute) {
        dispute.status = status;
        localStorage.setItem('disputes', JSON.stringify(trackedDisputes));
        updateTrackerStats();
        renderTracker();
    }
}

function updateTrackerStats() {
    document.getElementById('total-sent').textContent = trackedDisputes.length;
    document.getElementById('awaiting-response').textContent = trackedDisputes.filter(d => d.status === 'pending').length;
    document.getElementById('items-removed').textContent = trackedDisputes.filter(d => d.status === 'success').length;
}

// ============================================
// STRIPE CHECKOUT
// ============================================

function checkout() {
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
        if (data.url) {
            window.location.href = data.url;
        } else {
            // Fallback for demo/testing
            alert('Stripe checkout not configured yet. Logging in for demo purposes.');
            localStorage.setItem('isLoggedIn', 'true');
            showDashboard();
        }
    })
    .catch(() => {
        // Fallback for demo
        alert('Stripe checkout not configured yet. Logging in for demo purposes.');
        localStorage.setItem('isLoggedIn', 'true');
        showDashboard();
    });
}

// ============================================
// INITIALIZATION
// ============================================

// Check if user is already logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    showDashboard();
}

// Initialize letter display
if (document.getElementById('letter-templates')) {
    displayLetters('bureau');
}
