// ============================================
// CreditClear DIY - Complete Application JS
// ============================================

// Bureau Addresses
const bureauAddresses = {
    equifax: { name: 'Equifax', address: 'P.O. Box 740241\nAtlanta, GA 30374' },
    experian: { name: 'Experian', address: 'P.O. Box 4500\nAllen, TX 75013' },
    transunion: { name: 'TransUnion', address: 'P.O. Box 2000\nChester, PA 19016' }
};

// Track selected letter and disputes
let selectedLetter = null;
let trackedDisputes = JSON.parse(localStorage.getItem('disputes') || '[]');

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

I am writing to dispute the following information on my credit report. The item(s) listed below are inaccurate and I am requesting they be corrected or removed.

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

Reason for Dispute:
[DISPUTE_REASON]

Under the Fair Credit Reporting Act, Section 611 (15 U.S.C. § 1681i), you are required to conduct a reasonable investigation into this matter within 30 days of receiving this dispute. If you cannot verify the accuracy of this information, it must be removed from my credit report.

Please send me an updated copy of my credit report after this investigation is complete.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID
- Copy of proof of address (utility bill or bank statement)

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: '609-letter',
            title: '609 Verification Letter',
            description: 'Request verification of accounts under Section 609 of the FCRA.',
            useFor: 'Requesting proof that the bureau verified the account information',
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

I am writing to request verification of the following account on my credit report, pursuant to my rights under Section 609 of the Fair Credit Reporting Act (15 U.S.C. § 1681g).

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

I am requesting that you provide me with:

1. The original signed contract or agreement bearing my signature
2. Verification that the account information is being reported accurately
3. The name and address of the original creditor if different from what is listed
4. Documentation showing the date of first delinquency

[DISPUTE_REASON]

If you are unable to provide the above documentation, I request that this account be immediately removed from my credit report as you cannot verify its accuracy.

Please respond within 30 days as required by law.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID
- Copy of proof of address

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: '611-letter',
            title: '611 Method of Verification Letter',
            description: 'Follow-up letter when bureau claims item was "verified" without proof.',
            useFor: 'When your first dispute was denied and bureau says item is verified',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Request for Method of Verification - Section 611
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I previously disputed the following account on my credit report and received a response stating the information was "verified." I am now requesting the method of verification pursuant to Section 611(a)(7) of the Fair Credit Reporting Act.

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

Under the FCRA, you are required to provide me with:

1. A description of the procedure used to determine the accuracy of the disputed information
2. The business name, address, and telephone number of any furnisher contacted
3. The telephone number for the furnisher, if reasonably available

[DISPUTE_REASON]

I am also requesting that you provide a copy of any documentation used to verify this account. Simply contacting the creditor by phone or electronically and receiving a confirmation that the information is correct does not constitute a "reasonable investigation."

Please respond within 15 days as required by law.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'procedural-request',
            title: 'Procedural Request Letter',
            description: 'Request details about the investigation procedures used.',
            useFor: 'When you want to know exactly how the bureau investigated your dispute',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Request for Investigation Procedures
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I am writing regarding my previous dispute of the following account:

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

Under the Fair Credit Reporting Act, I am requesting the following information regarding your investigation:

1. The complete procedures used in your investigation
2. All documentation received from the data furnisher
3. The name and contact information of all persons involved in the investigation
4. Whether your investigation was conducted by automated means (e-OSCAR or similar system)

[DISPUTE_REASON]

If your investigation was conducted solely through automated means without a manual review of the actual documentation, this does not constitute a "reasonable investigation" as required by the FCRA.

Please respond within 15 days.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'frivolous-rebuttal',
            title: 'Frivolous Response Rebuttal',
            description: 'Challenge a bureau that dismissed your dispute as "frivolous."',
            useFor: 'When bureau refuses to investigate claiming your dispute is frivolous',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Rebuttal to Frivolous Determination
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I received your response dated [DATE] regarding my dispute of the following account, in which you determined my dispute to be "frivolous or irrelevant."

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

I strongly disagree with this determination. My dispute is legitimate and based on the following specific reasons:

[DISPUTE_REASON]

Under Section 611(a)(3) of the FCRA, you may only determine a dispute is frivolous if the consumer fails to provide sufficient information. I have provided specific details about the inaccuracy and my identity.

I demand that you conduct a proper investigation as required by law. Failure to do so may constitute a willful violation of the FCRA, which allows for statutory damages of $100 to $1,000 per violation, plus punitive damages and attorney fees.

I have also filed a complaint with the Consumer Financial Protection Bureau regarding this matter.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        }
    ],
    collections: [
        {
            id: 'debt-validation',
            title: 'Debt Validation Letter',
            description: 'Require a collector to prove you owe the debt.',
            useFor: 'Any collection account - send within 30 days of first contact',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[COLLECTION_AGENCY_ADDRESS]

Re: Debt Validation Request
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing in response to your reporting of the above account on my credit report. I am exercising my rights under Section 809(b) of the Fair Debt Collection Practices Act (15 U.S.C. § 1692g) to request validation of this alleged debt.

Please provide the following:

1. The amount of the debt and what the amount consists of (principal, interest, fees, etc.)
2. The name of the original creditor
3. A copy of the original signed agreement or contract
4. Proof that you are licensed to collect debts in my state
5. Documentation showing the complete chain of ownership from the original creditor to your company
6. Proof that the statute of limitations has not expired on this debt

[DISPUTE_REASON]

Until you provide proper validation, I demand that you:
- Cease all collection activities
- Remove this account from all three credit bureaus
- Stop all telephone calls regarding this account

Be advised that any continued collection activity without providing the requested validation constitutes a violation of the FDCPA.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'pay-for-delete',
            title: 'Pay-for-Delete Letter',
            description: 'Offer to pay the debt in exchange for removal from credit report.',
            useFor: 'When you are willing to pay but want the negative item removed',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[COLLECTION_AGENCY_ADDRESS]

Re: Settlement Offer - Pay for Deletion
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

This letter is in reference to the above-mentioned account.

I am willing to pay this account in full, provided that you agree to the following terms:

1. Upon receipt of my payment, you will request deletion of all information regarding this account from Equifax, Experian, and TransUnion within 10 calendar days.

2. You will not sell, transfer, or assign this account to any other entity.

3. This payment represents settlement in full.

4. You will provide written confirmation of this agreement before I submit payment.

[DISPUTE_REASON]

If you agree to these terms, please respond in writing on your company letterhead with an authorized signature.

Please respond within 15 days.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'cease-desist',
            title: 'Cease and Desist Letter',
            description: 'Demand collection agency stop contacting you.',
            useFor: 'To stop phone calls and letters from collectors',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[COLLECTION_AGENCY_ADDRESS]

Re: Cease and Desist Communication
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

Pursuant to my rights under Section 805(c) of the Fair Debt Collection Practices Act, I am formally notifying you to CEASE AND DESIST all communication with me regarding the above-referenced account.

Effective immediately, you may not:
- Contact me by telephone
- Send letters or emails to my address
- Contact my employer, family members, or any third parties

Under the FDCPA, you may only contact me now to:
1. Advise me that collection efforts are being terminated
2. Notify me that you may invoke a specific legal remedy

[DISPUTE_REASON]

Any violation of this cease and desist demand will be documented and may result in legal action.

Govern yourself accordingly.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'debt-settlement',
            title: 'Debt Settlement Offer',
            description: 'Offer a lump sum payment less than the full amount owed.',
            useFor: 'When you want to settle for less than what is owed',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[COLLECTION_AGENCY_ADDRESS]

Re: Settlement Offer
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing regarding the above-referenced account. While I do not necessarily agree that I owe this debt, I am prepared to offer a one-time settlement payment to resolve this matter.

I am offering a lump sum payment of $[AMOUNT] as payment in full for this account. This offer is contingent upon the following conditions:

1. You accept this payment as settlement in full for the above account
2. You update the account status to "Paid in Full" or "Settled" with all three credit bureaus
3. You agree not to sell, transfer, or assign this account
4. You provide written confirmation of these terms before payment is made

[DISPUTE_REASON]

This offer is valid for 15 days from the date of this letter. Please respond in writing.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'statute-limitations',
            title: 'Statute of Limitations Letter',
            description: 'Assert that debt is too old to be legally collected.',
            useFor: 'Old debts that may be past the statute of limitations',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[COLLECTION_AGENCY_ADDRESS]

Re: Expired Statute of Limitations
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing regarding the above-referenced account that you are attempting to collect.

I believe the statute of limitations has expired on this debt. The alleged debt originated more than [X] years ago, and the statute of limitations in my state for this type of debt is [X] years.

[DISPUTE_REASON]

As such, I demand that you:

1. Cease all collection attempts immediately
2. Remove this account from all three credit bureaus
3. Provide proof of the date of first delinquency

Any attempt to collect a time-barred debt or to sue on such a debt may constitute a violation of the Fair Debt Collection Practices Act.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        }
    ],
    'late-payments': [
        {
            id: 'goodwill-letter',
            title: 'Goodwill Adjustment Letter',
            description: 'Politely request creditor remove late payment as a courtesy.',
            useFor: 'When you paid late but have otherwise good history',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Goodwill Adjustment Request
Account Number: [ACCOUNT_NUMBER]

Dear Customer Service Department:

I am writing to respectfully request a goodwill adjustment to remove a late payment from my credit report.

I have been a loyal customer and have always valued our relationship. Unfortunately, due to circumstances beyond my control, I made a late payment on the above account.

[DISPUTE_REASON]

Since then, I have made all payments on time and have taken steps to ensure this does not happen again. This single late payment is significantly impacting my credit score and my ability to achieve important financial goals.

I kindly ask that you consider removing this late payment as a goodwill gesture given my otherwise positive payment history. I understand this is not an obligation, but I would greatly appreciate your consideration.

Thank you for your time and attention to this matter.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'late-payment-dispute',
            title: 'Late Payment Dispute Letter',
            description: 'Dispute a late payment you believe is reported incorrectly.',
            useFor: 'When you were not actually late or dates are wrong',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Dispute of Late Payment Reporting
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I am writing to dispute a late payment reported on the following account:

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

This late payment is being reported inaccurately. [DISPUTE_REASON]

I request that you investigate this matter and correct the payment history to accurately reflect my account status. Under the FCRA, you must complete this investigation within 30 days.

Please send me an updated copy of my credit report after this correction has been made.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID
- Copy of proof of address
- Payment confirmation/bank statements showing on-time payment

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'reaging-request',
            title: 'Re-aging Request Letter',
            description: 'Request creditor re-age your account to show current status.',
            useFor: 'When you have caught up on payments and want fresh start',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Account Re-Aging Request
Account Number: [ACCOUNT_NUMBER]

Dear Customer Service Department:

I am writing to request that you re-age my account to reflect a current and positive status.

I experienced financial difficulty that led to late payments on this account. However, I have since brought the account current and have made consistent on-time payments for the past several months.

[DISPUTE_REASON]

I am requesting that you re-age this account to show a positive payment history going forward, removing the previous late payment notations.

I value our business relationship and am committed to maintaining timely payments going forward.

Thank you for your consideration.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'hardship-letter',
            title: 'Hardship Explanation Letter',
            description: 'Explain circumstances that led to late payments.',
            useFor: 'Medical emergency, job loss, natural disaster situations',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Hardship Explanation and Goodwill Request
Account Number: [ACCOUNT_NUMBER]

Dear Customer Service Department:

I am writing to explain the circumstances that led to late payments on my account and to request your understanding and assistance.

[DISPUTE_REASON]

This situation was temporary and beyond my control. I have since recovered and am fully committed to maintaining all future payments on time. My account is now current and in good standing.

I respectfully request that you remove the late payment notations from my credit report as a gesture of goodwill, considering the extenuating circumstances. This would greatly help me in rebuilding my financial stability.

Thank you for your compassion and consideration.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'payment-history-correction',
            title: 'Payment History Correction',
            description: 'Request correction of incorrectly reported payment dates.',
            useFor: 'When payment dates or amounts are reported wrong',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Payment History Correction Request
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing to request a correction to the payment history being reported for my account.

After reviewing my credit report, I have identified inaccuracies in the payment history:

[DISPUTE_REASON]

I have enclosed documentation supporting the correct payment history. Please update your records and report the corrected information to all three credit bureaus.

Please confirm in writing that these corrections have been made.

Sincerely,

[YOUR_NAME]

Enclosures:
- Bank statements showing payment dates
- Payment confirmation receipts

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        }
    ],
    inquiries: [
        {
            id: 'hard-inquiry-removal',
            title: 'Hard Inquiry Removal Letter',
            description: 'Request removal of unauthorized hard inquiries.',
            useFor: 'Credit pulls you did not authorize',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Unauthorized Hard Inquiry Removal
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I am writing to dispute an unauthorized hard inquiry on my credit report.

The following inquiry was made without my knowledge or consent:

Company Name: [ACCOUNT_NAME]
Date of Inquiry: [ACCOUNT_NUMBER]

[DISPUTE_REASON]

I did not authorize this company to pull my credit report. Under Section 604 of the FCRA, a permissible purpose is required for any inquiry. Since I did not provide authorization, this inquiry is unauthorized and must be removed.

Please remove this inquiry from my credit report immediately and send me an updated copy.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID
- Copy of proof of address

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'unauthorized-inquiry',
            title: 'Unauthorized Inquiry Dispute',
            description: 'Dispute an inquiry from a company you never applied to.',
            useFor: 'Inquiries from unknown companies or identity theft',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[COMPANY_ADDRESS]

Re: Unauthorized Credit Inquiry
Reference: [ACCOUNT_NUMBER]

To Whom It May Concern:

I recently reviewed my credit report and found that your company made an inquiry on my credit file on [DATE].

I have no recollection of authorizing this inquiry. I have never applied for credit, services, or any product with your company.

[DISPUTE_REASON]

Under the Fair Credit Reporting Act, Section 604, a creditor must have permissible purpose to access a consumer's credit report. Unauthorized access is a violation of the FCRA and may result in damages of $1,000 per violation.

I demand that you:
1. Provide proof that I authorized this inquiry
2. If you cannot provide proof, contact all three credit bureaus to remove this inquiry
3. Send written confirmation once the inquiry has been removed

Please respond within 15 days.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'identity-theft',
            title: 'Identity Theft Affidavit Letter',
            description: 'Report identity theft and request fraudulent accounts be removed.',
            useFor: 'When someone opened accounts in your name',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Identity Theft Report
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I am writing to report that I am a victim of identity theft. The following account(s) were opened fraudulently in my name without my knowledge or authorization:

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

[DISPUTE_REASON]

I am requesting that you:

1. Block and remove all fraudulent accounts from my credit report
2. Place a fraud alert on my credit file
3. Provide me with copies of any applications or records related to the fraudulent accounts
4. Send me an updated credit report after these items have been removed

I have filed a report with the Federal Trade Commission and my local police department. Copies of these reports are enclosed.

Under Section 605B of the FCRA, you must block the reporting of any information resulting from identity theft within 4 business days of receiving this notice.

Sincerely,

[YOUR_NAME]

Enclosures:
- FTC Identity Theft Report
- Police Report
- Copy of government-issued ID
- Copy of proof of address

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'fraud-alert',
            title: 'Fraud Alert Request',
            description: 'Request a fraud alert be placed on your credit file.',
            useFor: 'Protecting yourself from future unauthorized accounts',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Fraud Alert Request
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I am requesting that an initial fraud alert be placed on my credit file pursuant to Section 605A of the Fair Credit Reporting Act.

[DISPUTE_REASON]

I request that any creditor attempting to open new credit in my name be required to verify my identity by contacting me at:

Phone: [YOUR_PHONE]

Please place this fraud alert on my file immediately and notify the other two credit bureaus of this request as required by law.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID
- Copy of proof of address

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'security-freeze',
            title: 'Security Freeze Letter',
            description: 'Request a security freeze on your credit file.',
            useFor: 'Preventing anyone from accessing your credit report',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Security Freeze Request
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I am requesting that a security freeze be placed on my credit file pursuant to my rights under federal and state law.

[DISPUTE_REASON]

Please freeze my credit file immediately. I understand that:
- No new credit can be opened in my name while the freeze is active
- I will receive a PIN or password to temporarily lift or remove the freeze
- This freeze is free of charge

Please send confirmation of the freeze along with my PIN/password to the address above.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID
- Copy of proof of address
- Copy of Social Security card

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        }
    ],
    creditor: [
        {
            id: '623-direct-dispute',
            title: '623 Direct Dispute Letter',
            description: 'Dispute directly with the creditor/furnisher under Section 623.',
            useFor: 'When bureau disputes have been unsuccessful',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Direct Dispute Under Section 623 of the FCRA
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing to dispute information you are furnishing to the credit bureaus regarding the above account, pursuant to Section 623 of the Fair Credit Reporting Act (15 U.S.C. § 1681s-2).

The information being reported is inaccurate for the following reasons:

[DISPUTE_REASON]

Under Section 623(b), upon receiving notice of a dispute from a credit bureau, you are required to:

1. Conduct an investigation
2. Review all relevant information provided
3. Report the results to the credit bureau
4. If inaccurate, modify, delete, or permanently block the information

I have previously disputed this item with the credit bureaus. I am now exercising my right to dispute directly with you as the furnisher of this information.

Please investigate and correct this information within 30 days.

Sincerely,

[YOUR_NAME]

Enclosures:
- Previous dispute correspondence
- Supporting documentation

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'original-creditor-dispute',
            title: 'Original Creditor Dispute',
            description: 'Dispute account information directly with the original creditor.',
            useFor: 'When the original creditor is reporting incorrect information',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Account Information Dispute
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing to dispute the information you are reporting to the credit bureaus regarding my account.

After reviewing my credit report, I have found the following inaccuracies:

[DISPUTE_REASON]

I request that you:

1. Investigate this matter thoroughly
2. Correct the inaccurate information
3. Update all three credit bureaus with the corrected information
4. Provide me with written confirmation of the corrections

Please respond within 30 days.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'account-verification',
            title: 'Account Verification Letter',
            description: 'Request the creditor verify the details of your account.',
            useFor: 'When account details dont match your records',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Account Verification Request
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing to request verification of the following account details as they appear on my credit report:

Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

Please provide:

1. The current balance and how it was calculated
2. The date the account was opened
3. The date of last activity
4. The payment history for the past 24 months
5. The terms of the original agreement

[DISPUTE_REASON]

Please respond within 30 days.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'balance-dispute',
            title: 'Balance Dispute Letter',
            description: 'Dispute an incorrect balance being reported.',
            useFor: 'When the reported balance is wrong',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Balance Dispute
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing to dispute the balance being reported on the above account.

According to my credit report, the balance is listed as [REPORTED AMOUNT]. However, this is incorrect.

[DISPUTE_REASON]

I request that you:

1. Review your records and provide an itemized statement
2. Correct the reported balance with all three credit bureaus
3. Provide me with an updated account statement
4. Confirm in writing that the correction has been made

I expect this matter to be resolved within 30 days as required by the Fair Credit Reporting Act.

Sincerely,

[YOUR_NAME]

Enclosures: Payment records, bank statements

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
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

I am writing regarding the above-referenced account which was closed.

According to my credit report, this account is not being reported with the correct closure status.

[DISPUTE_REASON]

Please update your records and report the correct account status to all three major credit bureaus (Equifax, Experian, and TransUnion).

I request written confirmation that this correction has been made.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
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
[COLLECTION_AGENCY_ADDRESS]

Re: Dispute of Medical Debt
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing to dispute the medical debt referenced above.

Under the Fair Debt Collection Practices Act and HIPAA regulations, I request the following:

1. Validation of this debt including original itemized billing statements
2. Proof that you have the legal right to collect this medical debt
3. Verification that proper HIPAA authorization was obtained before transferring my medical information
4. Documentation showing this debt has not been paid by insurance

[DISPUTE_REASON]

Additionally, please note that recent changes to credit reporting rules mean that many medical debts should not appear on credit reports, including medical debts under $500 and debts that have been paid.

Please respond within 30 days.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'student-loan',
            title: 'Student Loan Dispute Letter',
            description: 'Dispute incorrect student loan information.',
            useFor: 'Wrong balances, duplicate accounts, incorrect loan status',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[LOAN_SERVICER_ADDRESS]

Re: Student Loan Account Dispute
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing to dispute information being reported about my student loan account.

[DISPUTE_REASON]

I request that you:

1. Review my account records
2. Correct any inaccurate information
3. Update all three credit bureaus with the corrected information
4. Provide me with a detailed account history

Under the Fair Credit Reporting Act, furnishers of information must report accurate data. Please correct this matter within 30 days.

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'bankruptcy-removal',
            title: 'Bankruptcy Removal Letter',
            description: 'Dispute a bankruptcy that should no longer be on your report.',
            useFor: 'Bankruptcy older than 7 years (Ch 13) or 10 years (Ch 7)',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Removal of Expired Bankruptcy
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I am writing to request the removal of a bankruptcy from my credit report that has exceeded the legal reporting period.

[DISPUTE_REASON]

Under the Fair Credit Reporting Act, Section 605:
- Chapter 7 bankruptcy may only be reported for 10 years from the date of filing
- Chapter 13 bankruptcy may only be reported for 7 years from the date of filing

This bankruptcy has exceeded the applicable time limit and must be removed from my credit report immediately.

Please send me an updated credit report after this item has been removed.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID
- Bankruptcy discharge papers

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'judgment-dispute',
            title: 'Judgment Dispute Letter',
            description: 'Dispute a judgment or public record on your report.',
            useFor: 'Civil judgments that are inaccurate or expired',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Dispute of Judgment/Public Record
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I am writing to dispute a judgment/public record appearing on my credit report.

Account/Case: [ACCOUNT_NAME]
Reference Number: [ACCOUNT_NUMBER]

[DISPUTE_REASON]

I request that you investigate this item and verify its accuracy. If you cannot verify this information, it must be removed under the FCRA.

Please send me an updated credit report after your investigation.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of government-issued ID
- Supporting documentation

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'tax-lien',
            title: 'Tax Lien Removal Letter',
            description: 'Request removal of a paid or released tax lien.',
            useFor: 'Tax liens that have been paid or should be removed',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Tax Lien Removal Request
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

I am writing to request the removal of a tax lien from my credit report.

Reference: [ACCOUNT_NAME]
Amount: [ACCOUNT_NUMBER]

[DISPUTE_REASON]

Please note that under current credit reporting standards, tax liens should not appear on credit reports unless they meet strict data standards for identification. Many tax liens fail to meet these standards.

Additionally, if this lien has been paid or released, I am enclosing proof and requesting its immediate removal.

Please investigate and respond within 30 days.

Sincerely,

[YOUR_NAME]

Enclosures:
- Lien release documentation (if applicable)
- Copy of government-issued ID

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        }
    ]
};

// ============================================
// APP FUNCTIONS
// ============================================

// Login/Logout
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

function logout() {
    localStorage.removeItem('isLoggedIn');
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('landing-page').style.display = 'block';
}

function showDashboard() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    displayLetters('bureau');
    updateTrackerStats();
}

// Section Navigation
function showSection(sectionId) {
    document.querySelectorAll('.dashboard-section').forEach(s => s.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
    document.querySelectorAll('.dashboard-nav .nav-links a').forEach(a => a.classList.remove('nav-active'));
    if (event && event.target) event.target.classList.add('nav-active');
    
    if (sectionId === 'letters-dashboard') {
        document.getElementById('letter-generator').style.display = 'none';
        document.querySelector('.letter-selector').style.display = 'block';
    }
    
    if (sectionId === 'dispute-finder') {
        showFinderStep(1);
    }
}

// Letter Category Selection
function selectCategory(category) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    displayLetters(category);
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

// Letter Selection and Generation
function selectLetter(category, letterId) {
    const letters = letterTemplates[category];
    selectedLetter = letters.find(l => l.id === letterId);
    
    document.getElementById('selected-letter-title').textContent = selectedLetter.title;
    document.querySelector('.letter-selector').style.display = 'none';
    document.getElementById('letter-generator').style.display = 'block';
    document.getElementById('letter-preview').innerHTML = '<p class="preview-placeholder">Fill in the form to see your letter preview</p>';
}

function backToLetters() {
    document.getElementById('letter-generator').style.display = 'none';
    document.querySelector('.letter-selector').style.display = 'block';
}

function generateLetter() {
    if (!selectedLetter) return;
    
    const name = document.getElementById('user-name').value || '[YOUR NAME]';
    const address = document.getElementById('user-address').value || '[YOUR ADDRESS]';
    const cityState = document.getElementById('user-city-state').value || '[CITY, STATE ZIP]';
    const ssn = document.getElementById('user-ssn').value || 'XXXX';
    const dob = document.getElementById('user-dob').value || '[DATE OF BIRTH]';
    const phone = document.getElementById('user-phone').value || '[YOUR PHONE]';
    const accountName = document.getElementById('account-name').value || '[CREDITOR NAME]';
    const accountNumber = document.getElementById('account-number').value || '[ACCOUNT NUMBER]';
    const disputeReason = document.getElementById('dispute-reason').value || '[DESCRIBE YOUR REASON]';
    
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    
    let letter = selectedLetter.template
        .replace(/\[YOUR_NAME\]/g, name)
        .replace(/\[YOUR_ADDRESS\]/g, address)
        .replace(/\[YOUR_CITY_STATE_ZIP\]/g, cityState)
        .replace(/\[SSN_LAST4\]/g, ssn)
        .replace(/\[DOB\]/g, dob)
        .replace(/\[DATE\]/g, today)
        .replace(/\[ACCOUNT_NAME\]/g, accountName)
        .replace(/\[ACCOUNT_NUMBER\]/g, accountNumber)
        .replace(/\[DISPUTE_REASON\]/g, disputeReason)
        .replace(/\[BUREAU_NAME\]/g, bureauAddresses.equifax.name)
        .replace(/\[BUREAU_ADDRESS\]/g, bureauAddresses.equifax.address)
        .replace(/\[YOUR_PHONE\]/g, phone);
    
    document.getElementById('letter-preview').textContent = letter;
}

function downloadLetter() {
    const letterText = document.getElementById('letter-preview').textContent;
    if (!letterText || letterText.includes('Fill in the form')) {
        alert('Please generate a letter first.');
        return;
    }
    
    const blob = new Blob([letterText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedLetter.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function copyLetter() {
    const letterText = document.getElementById('letter-preview').textContent;
    if (!letterText || letterText.includes('Fill in the form')) {
        alert('Please generate a letter first.');
        return;
    }
    
    navigator.clipboard.writeText(letterText).then(() => {
        alert('Letter copied to clipboard!');
    });
}

// Tracker Functions
function addToTracker() {
    if (!selectedLetter) return;
    
    const accountName = document.getElementById('account-name').value;
    if (!accountName) {
        alert('Please enter an account name to track.');
        return;
    }
    
    const today = new Date();
    const dueDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    const dispute = {
        id: Date.now(),
        letterType: selectedLetter.title,
        sentTo: accountName,
        dateSent: today.toISOString().split('T')[0],
        responseDue: dueDate.toISOString().split('T')[0],
        status: 'pending'
    };
    
    trackedDisputes.push(dispute);
    localStorage.setItem('disputes', JSON.stringify(trackedDisputes));
    
    alert('Added to tracker! Remember to actually PRINT and MAIL the letter via USPS Certified Mail.');
    updateTrackerStats();
}

function updateTrackerStats() {
    const total = trackedDisputes.length;
    const pending = trackedDisputes.filter(d => d.status === 'pending').length;
    const removed = trackedDisputes.filter(d => d.status === 'success').length;
    
    const totalEl = document.getElementById('total-sent');
    const pendingEl = document.getElementById('awaiting-response');
    const removedEl = document.getElementById('items-removed');
    
    if (totalEl) totalEl.textContent = total;
    if (pendingEl) pendingEl.textContent = pending;
    if (removedEl) removedEl.textContent = removed;
    
    renderTrackerTable();
}

function renderTrackerTable() {
    const tbody = document.getElementById('tracker-body');
    if (!tbody) return;
    
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
    }
}

// Dispute Finder Functions
function showFinderStep(step) {
    document.querySelectorAll('.finder-step').forEach(s => s.style.display = 'none');
    document.getElementById('finder-step-' + step).style.display = 'block';
    
    if (step === 3) {
        updateRecommendations();
    }
}

function updateRecommendations() {
    const recommendations = [];
    
    if (document.getElementById('has-collections') && document.getElementById('has-collections').checked) {
        recommendations.push({
            title: '📋 Collections Found',
            steps: [
                'Send a <strong>Debt Validation Letter</strong> to each collection agency',
                'If they cannot validate, send a <strong>General Dispute Letter</strong> to all 3 bureaus',
                'Consider a <strong>Pay-for-Delete</strong> offer if the debt is valid and you can pay',
                'If harassment continues, send a <strong>Cease and Desist Letter</strong>'
            ]
        });
    }
    
    if (document.getElementById('has-late-payments') && document.getElementById('has-late-payments').checked) {
        recommendations.push({
            title: '⏰ Late Payments Found',
            steps: [
                'Send a <strong>Goodwill Adjustment Letter</strong> to the creditor (if you have good history)',
                'If the late payment is wrong, send a <strong>Late Payment Dispute</strong> to bureaus',
                'For hardship situations, send a <strong>Hardship Explanation Letter</strong>'
            ]
        });
    }
    
    if (document.getElementById('has-charge-offs') && document.getElementById('has-charge-offs').checked) {
        recommendations.push({
            title: '💳 Charge-Offs Found',
            steps: [
                'Send a <strong>General Dispute Letter</strong> to all 3 bureaus',
                'Follow up with a <strong>609 Verification Letter</strong>',
                'Send a <strong>623 Direct Dispute</strong> to the original creditor',
                'If sold to collections, also send a <strong>Debt Validation Letter</strong>'
            ]
        });
    }
    
    if (document.getElementById('has-inquiries') && document.getElementById('has-inquiries').checked) {
        recommendations.push({
            title: '🔍 Unauthorized Inquiries Found',
            steps: [
                'Send a <strong>Hard Inquiry Removal Letter</strong> to the bureau',
                'Send an <strong>Unauthorized Inquiry Dispute</strong> directly to the company',
                'If identity theft, file an <strong>Identity Theft Affidavit</strong>'
            ]
        });
    }
    
    if (document.getElementById('has-wrong-info') && document.getElementById('has-wrong-info').checked) {
        recommendations.push({
            title: '❌ Wrong Information Found',
            steps: [
                'Send a <strong>General Dispute Letter</strong> to all 3 bureaus with proof',
                'Send a <strong>Balance Dispute Letter</strong> if amounts are wrong',
                'Send a <strong>Payment History Correction</strong> if dates are wrong'
            ]
        });
    }
    
    if (document.getElementById('has-unknown-accounts') && document.getElementById('has-unknown-accounts').checked) {
        recommendations.push({
            title: '⚠️ Unknown Accounts Found',
            steps: [
                'This could be <strong>identity theft</strong> - file a police report',
                'Send an <strong>Identity Theft Affidavit Letter</strong> to all 3 bureaus',
                'Request a <strong>Fraud Alert</strong> on your credit file',
                'Consider a <strong>Security Freeze</strong> to prevent new accounts'
            ]
        });
    }
    
    if (document.getElementById('has-old-debts') && document.getElementById('has-old-debts').checked) {
        recommendations.push({
            title: '📅 Old Debts (7+ Years)',
            steps: [
                'Send a <strong>General Dispute Letter</strong> requesting removal (items over 7 years must be removed)',
                'If it is a collection, send a <strong>Statute of Limitations Letter</strong>',
                'Check the Date of First Delinquency - this is when the 7-year clock starts'
            ]
        });
    }
    
    if (document.getElementById('has-bankruptcy') && document.getElementById('has-bankruptcy').checked) {
        recommendations.push({
            title: '🏛️ Bankruptcy on Report',
            steps: [
                'Chapter 7: Can be reported for <strong>10 years</strong> from filing date',
                'Chapter 13: Can be reported for <strong>7 years</strong> from filing date',
                'If past the time limit, send a <strong>Bankruptcy Removal Letter</strong>',
                'Dispute any accounts included in bankruptcy that still show a balance'
            ]
        });
    }
    
    if (document.getElementById('has-medical') && document.getElementById('has-medical').checked) {
        recommendations.push({
            title: '🏥 Medical Debt Found',
            steps: [
                'Send a <strong>Medical Debt Dispute Letter</strong> requesting HIPAA-compliant validation',
                'Check if debt is under $500 - it may not be allowed on your report',
                'Check if insurance should have covered it',
                'Negotiate directly with the provider for a discount or payment plan'
            ]
        });
    }
    
    if (document.getElementById('has-student-loans') && document.getElementById('has-student-loans').checked) {
        recommendations.push({
            title: '🎓 Student Loan Issues',
            steps: [
                'Send a <strong>Student Loan Dispute Letter</strong> to the servicer',
                'Check for duplicate accounts (common with transferred loans)',
                'Verify the balance and payment status are correct',
                'If in default, explore rehabilitation or consolidation options'
            ]
        });
    }
    
    const container = document.getElementById('recommendations-list');
    if (!container) return;
    
    if (recommendations.length === 0) {
        container.innerHTML = '<div class="no-recommendations"><p>Please go back and select at least one item from the checklist.</p></div>';
        return;
    }
    
    container.innerHTML = recommendations.map(rec => `
        <div class="recommendation-card">
            <h3>${rec.title}</h3>
            <div class="recommendation-steps">
                ${rec.steps.map((step, i) => `<div class="rec-step"><span class="rec-num">${i + 1}.</span> ${step}</div>`).join('')}
            </div>
        </div>
    `).join('');
}

// Checkout function
function checkout() {
    alert('This would redirect to Stripe Checkout for $29.99 payment.\n\nFor demo purposes, you will be logged in.');
    localStorage.setItem('isLoggedIn', 'true');
    showDashboard();
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showDashboard();
    }
    
    // Initialize letter display
    if (document.getElementById('letter-templates')) {
        displayLetters('bureau');
    }
});
