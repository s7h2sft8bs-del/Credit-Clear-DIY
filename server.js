// Letter Templates Database
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

I am writing to dispute the following information on my credit report. I have identified the following item(s) that are inaccurate or incomplete:

Creditor/Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

Reason for Dispute:
[DISPUTE_REASON]

Under the Fair Credit Reporting Act, Section 611 (15 U.S.C. § 1681i), you are required to conduct a reasonable investigation into the disputed information and remove or modify any information that cannot be verified.

I am requesting that you investigate this matter and correct or delete the inaccurate information from my credit file within 30 days as required by law.

Please send me written confirmation of the results of your investigation and a free copy of my updated credit report if changes are made.

Enclosed please find copies of my identification for verification purposes.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of driver's license or state ID
- Copy of utility bill or bank statement (proof of address)`
        },
        {
            id: '609-letter',
            title: '609 Verification Letter',
            description: 'Request verification of how disputed items were reported under Section 609 of FCRA.',
            useFor: 'When you want proof of how an account was verified',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Request for Information Under Section 609 of the FCRA
SSN: XXX-XX-[SSN_LAST4]
DOB: [DOB]

To Whom It May Concern:

Pursuant to my rights under Section 609 of the Fair Credit Reporting Act (15 U.S.C. § 1681g), I am requesting that you provide me with the following information regarding my credit file:

1. A copy of all information in my credit file
2. The sources of all information in my file
3. The names of all entities that have received my credit report within the past two years
4. A description of the procedure used to verify the accuracy of the information

Specifically, I am disputing the following account and requesting verification:

Creditor/Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

Reason for Dispute:
[DISPUTE_REASON]

If you cannot provide verification for this account with documentation bearing my signature, I respectfully request that this item be removed from my credit report immediately, as per Section 611 of the FCRA.

Please respond within 30 days as required by law.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of driver's license or state ID
- Copy of Social Security card or W-2`
        },
        {
            id: '611-method-verification',
            title: '611 Method of Verification Letter',
            description: 'Follow-up letter requesting the method used to verify disputed information.',
            useFor: 'When bureau says item was "verified" but you believe its wrong',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Request for Method of Verification - Section 611
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I am writing in response to your recent correspondence stating that the following disputed item has been "verified."

Creditor/Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

Pursuant to Section 611(a)(6)(B)(iii) of the Fair Credit Reporting Act, upon request, you are required to provide me with a description of the procedure used to determine the accuracy of the disputed information.

I am formally requesting:

1. The method of verification used
2. The name, address, and telephone number of the person contacted at the creditor
3. All documentation used in the verification process
4. Copies of any documents relied upon in the verification

If you are unable to provide this information within 15 days of receipt of this letter, I demand that this item be immediately deleted from my credit file.

[DISPUTE_REASON]

Please respond promptly.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'frivolous-rebuttal',
            title: 'Frivolous Dispute Rebuttal',
            description: 'Response when bureau claims your dispute is frivolous.',
            useFor: 'When bureau refuses to investigate your dispute',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Rebuttal to Frivolous Dispute Determination
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I am in receipt of your letter in which you state that my dispute is "frivolous" or that you are unable to process my dispute.

Please be advised that I have NOT used a credit repair organization. The disputes I have submitted are my own, based on my own review of my credit file.

Under Section 611 of the Fair Credit Reporting Act, you are REQUIRED to conduct a reasonable investigation unless the dispute is frivolous. A dispute is only frivolous if it fails to identify the specific information being disputed or does not include the reason for the dispute.

My dispute clearly identifies:
Account Name: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]
Reason: [DISPUTE_REASON]

This is a legitimate dispute of inaccurate information. Your refusal to investigate violates my rights under the FCRA.

I demand that you immediately conduct a proper investigation and provide me with results within 30 days.

Sincerely,

[YOUR_NAME]`
        }
    ],
    collections: [
        {
            id: 'debt-validation',
            title: 'Debt Validation Letter',
            description: 'Require collection agency to prove you owe the debt.',
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

I am writing in response to your contact regarding the above-referenced account. This letter is being sent within 30 days of your initial communication.

Pursuant to my rights under the Fair Debt Collection Practices Act, Section 809(b), I am requesting validation of this alleged debt.

Please provide the following:

1. The amount of the debt and how it was calculated
2. The name and address of the original creditor
3. Documentation showing I agreed to pay this debt (contract with my signature)
4. Proof that your company is licensed to collect debts in my state
5. A complete payment history from the original creditor

BE ADVISED: This is not a refusal to pay, but a dispute of this debt and a request for validation.

Until you provide the requested validation, you must:
- Cease all collection activities
- Not report this debt to any credit reporting agency
- Not contact me further except to provide the requested validation

[DISPUTE_REASON]

Sincerely,

[YOUR_NAME]

SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED`
        },
        {
            id: 'pay-for-delete',
            title: 'Pay-for-Delete Letter',
            description: 'Offer to pay debt in exchange for removal from credit report.',
            useFor: 'When you are willing to pay but want negative item removed',
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

If you agree to these terms, please respond in writing on your company letterhead with an authorized signature.

[DISPUTE_REASON]

Please respond within 15 days.

Sincerely,

[YOUR_NAME]`
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

Any violation of this cease and desist demand will be documented and may result in legal action.

[DISPUTE_REASON]

Govern yourself accordingly.

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

I have been a loyal customer and have always valued our relationship. Unfortunately, I experienced a situation that temporarily affected my ability to make my payment on time.

[DISPUTE_REASON]

Since that time, I have:
- Brought my account current and maintained on-time payments
- Demonstrated my commitment to financial responsibility

The late payment is currently impacting my credit score and my ability to achieve my financial goals. Given my otherwise excellent payment history, I am kindly requesting that you consider removing this late payment from my credit report as a gesture of goodwill.

I understand that you are not obligated to make this adjustment, and I truly appreciate your consideration.

Thank you for your time.

Sincerely,

[YOUR_NAME]
[YOUR_PHONE]`
        },
        {
            id: 'late-payment-dispute',
            title: 'Late Payment Dispute Letter',
            description: 'Dispute a late payment you believe was reported in error.',
            useFor: 'When you were not actually late or there was a billing error',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Dispute of Late Payment
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I am writing to dispute a late payment that is inaccurately reported on my credit file.

Creditor: [ACCOUNT_NAME]
Account Number: [ACCOUNT_NUMBER]

This late payment is being disputed because:
[DISPUTE_REASON]

I have enclosed documentation supporting my dispute.

Under the Fair Credit Reporting Act, I request that you investigate this matter and remove or correct this inaccurate late payment entry within 30 days.

Please send me written confirmation of the results.

Sincerely,

[YOUR_NAME]

Enclosures:
- Proof of payment
- Copy of ID`
        }
    ],
    inquiries: [
        {
            id: 'hard-inquiry-removal',
            title: 'Hard Inquiry Removal Letter',
            description: 'Request removal of unauthorized hard inquiry.',
            useFor: 'Inquiries you did not authorize or do not recognize',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Removal of Unauthorized Hard Inquiry
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I am writing to dispute an unauthorized hard inquiry on my credit report.

Company Name: [ACCOUNT_NAME]

I did not authorize this inquiry. I have not applied for credit with this company, nor have I given them permission to access my credit file.

Under the Fair Credit Reporting Act, Section 604, a credit report may only be obtained with a permissible purpose and with the consumer's authorization.

[DISPUTE_REASON]

I request that you:
1. Investigate this unauthorized inquiry
2. Remove it from my credit file immediately
3. Provide me with the contact information for the company that made this inquiry

Please respond within 30 days as required by law.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of driver's license
- Copy of utility bill`
        },
        {
            id: 'fraud-alert',
            title: 'Fraud Alert Request',
            description: 'Request fraud alert be placed on your credit file.',
            useFor: 'When you suspect identity theft',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[BUREAU_NAME]
[BUREAU_ADDRESS]

Re: Request for Fraud Alert
SSN: XXX-XX-[SSN_LAST4]

To Whom It May Concern:

I am requesting that an initial fraud alert be placed on my credit file.

[DISPUTE_REASON]

The fraud alert should require that any creditor take reasonable steps to verify my identity before opening any new accounts.

My preferred contact information for verification is:
Phone: [YOUR_PHONE]

Please confirm in writing that the fraud alert has been placed and provide me with a free copy of my credit report.

Sincerely,

[YOUR_NAME]

Enclosures:
- Copy of driver's license
- Proof of address`
        }
    ],
    creditor: [
        {
            id: '623-direct-dispute',
            title: '623 Direct Dispute Letter',
            description: 'Dispute directly with the creditor who furnished the information.',
            useFor: 'When bureau disputes have not worked',
            template: `[YOUR_NAME]
[YOUR_ADDRESS]
[YOUR_CITY_STATE_ZIP]

[DATE]

[ACCOUNT_NAME]
[CREDITOR_ADDRESS]

Re: Direct Dispute Under Section 623 of the FCRA
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing to dispute information you have furnished to the credit reporting agencies.

Under Section 623 of the Fair Credit Reporting Act, you have a duty to report accurate information. If notified of a dispute, you must conduct a reasonable investigation.

I am disputing the following:
[DISPUTE_REASON]

I have previously disputed this information with the credit bureaus. I am now exercising my right to dispute directly with you.

Please investigate this matter and either:
1. Correct the inaccurate information and notify all credit bureaus, OR
2. Provide me with documentation that proves the information is accurate

You are required to complete your investigation within 30 days.

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
[COLLECTION_AGENCY_ADDRESS]

Re: Dispute of Medical Debt
Account Number: [ACCOUNT_NUMBER]

To Whom It May Concern:

I am writing to dispute the medical debt referenced above.

Under the Fair Debt Collection Practices Act and HIPAA regulations, I request:

1. Proof that you are authorized to collect on this medical debt
2. Documentation of proper HIPAA authorization
3. Itemized statement of all charges
4. Proof that insurance was properly billed

[DISPUTE_REASON]

Please note: Under recent credit reporting rules, paid medical debt should not appear on credit reports.

Until proper validation is provided, cease all collection activities and remove this item from my credit reports.

Sincerely,

[YOUR_NAME]`
        },
        {
            id: 'student-loan-dispute',
            title: 'Student Loan Dispute Letter',
            description: 'Dispute errors on student loan reporting.',
            useFor: 'Federal or private student loan issues',
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

Please provide:
1. Complete payment history
2. Documentation of any deferment or forbearance periods
3. Calculation of current balance including all interest and fees

Under the Fair Credit Reporting Act, you must investigate this dispute and correct any inaccurate information within 30 days.

Sincerely,

[YOUR_NAME]`
        }
    ]
};

// Bureau addresses
const bureauAddresses = {
    equifax: {
        name: 'Equifax Information Services LLC',
        address: 'P.O. Box 740241\nAtlanta, GA 30374'
    },
    experian: {
        name: 'Experian',
        address: 'P.O. Box 4500\nAllen, TX 75013'
    },
    transunion: {
        name: 'TransUnion LLC',
        address: 'P.O. Box 2000\nChester, PA 19016'
    }
};

// State management
let currentCategory = 'bureau';
let selectedLetter = null;
let trackedDisputes = [];
let userData = {};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load from localStorage
    trackedDisputes = JSON.parse(localStorage.getItem('disputes') || '[]');
    userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showDashboard();
    }
});

// Navigation functions
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
    localStorage.setItem('isLoggedIn', 'false');
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('landing-page').style.display = 'block';
}

function showDashboard() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    displayLetters('bureau');
    updateTrackerStats();
}

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

// Letter functions
function selectCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    displayLetters(category);
}

function displayLetters(category) {
    const container = document.getElementById('letter-templates');
    if (!container) return;
    
    const letters = letterTemplates[category] || [];
    container.innerHTML = letters.map(letter => `
        <div class="letter-card" onclick="selectLetter('${category}', '${letter.id}')">
            <h3>${letter.title}</h3>
            <p>${letter.description}</p>
            <span class="use-for">Use for: ${letter.useFor}</span>
        </div>
    `).join('');
}

function selectLetter(category, letterId) {
    const letters = letterTemplates[category];
    selectedLetter = letters.find(l => l.id === letterId);
    
    if (selectedLetter) {
        document.querySelector('.letter-selector').style.display = 'none';
        document.getElementById('letter-generator').style.display = 'block';
        document.getElementById('selected-letter-title').textContent = selectedLetter.title;
        loadUserData();
        document.getElementById('letter-preview').innerHTML = '<p class="preview-placeholder">Fill in the form to see your letter preview</p>';
    }
}

function backToLetters() {
    document.getElementById('letter-generator').style.display = 'none';
    document.querySelector('.letter-selector').style.display = 'block';
    selectedLetter = null;
}

function loadUserData() {
    const fields = ['user-name', 'user-address', 'user-city-state', 'user-ssn', 'user-dob', 'user-phone'];
    const keys = ['name', 'address', 'cityState', 'ssn', 'dob', 'phone'];
    
    fields.forEach((field, i) => {
        const el = document.getElementById(field);
        if (el && userData[keys[i]]) el.value = userData[keys[i]];
    });
}

function saveUserData() {
    userData = {
        name: document.getElementById('user-name')?.value || '',
        address: document.getElementById('user-address')?.value || '',
        cityState: document.getElementById('user-city-state')?.value || '',
        ssn: document.getElementById('user-ssn')?.value || '',
        dob: document.getElementById('user-dob')?.value || '',
        phone: document.getElementById('user-phone')?.value || ''
    };
    localStorage.setItem('userData', JSON.stringify(userData));
}

function generateLetter() {
    if (!selectedLetter) return;
    saveUserData();
    
    const name = document.getElementById('user-name')?.value || '[YOUR NAME]';
    const address = document.getElementById('user-address')?.value || '[YOUR ADDRESS]';
    const cityState = document.getElementById('user-city-state')?.value || '[CITY, STATE ZIP]';
    const ssn = document.getElementById('user-ssn')?.value || 'XXXX';
    const dob = document.getElementById('user-dob')?.value || '[DATE OF BIRTH]';
    const phone = document.getElementById('user-phone')?.value || '[YOUR PHONE]';
    const accountName = document.getElementById('account-name')?.value || '[CREDITOR NAME]';
    const accountNumber = document.getElementById('account-number')?.value || '[ACCOUNT NUMBER]';
    const disputeReason = document.getElementById('dispute-reason')?.value || '[DESCRIBE YOUR REASON]';
    
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
    const letterText = document.getElementById('letter-preview')?.textContent;
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
    const letterText = document.getElementById('letter-preview')?.textContent;
    if (!letterText || letterText.includes('Fill in the form')) {
        alert('Please generate a letter first.');
        return;
    }
    
    navigator.clipboard.writeText(letterText).then(() => {
        alert('Letter copied to clipboard!');
    });
}

function addToTracker() {
    if (!selectedLetter) return;
    
    const accountName = document.getElementById('account-name')?.value;
    if (!accountName) {
        alert('Please enter an account name to track.');
        return;
    }
    
    // Show modal to get email and mail date for reminders
    showReminderModal(selectedLetter.title, accountName);
}

function showReminderModal(letterType, accountName) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'reminder-modal';
    modal.innerHTML = `
        <div class="modal-content reminder-modal-content">
            <span class="close-btn" onclick="closeReminderModal()">&times;</span>
            <h2>📬 Set Up Email Reminders</h2>
            <p style="color: #64748B; margin-bottom: 24px;">Get email reminders to stay on top of your dispute. We'll remind you at key milestones!</p>
            
            <div class="reminder-schedule-preview">
                <h4>You'll receive reminders:</h4>
                <div class="reminder-item">📬 <strong>Day 7</strong> - Delivery confirmation</div>
                <div class="reminder-item">⏰ <strong>Day 25</strong> - Response due soon</div>
                <div class="reminder-item">📋 <strong>Day 35</strong> - Follow-up reminder</div>
            </div>
            
            <div class="form-group">
                <label for="reminder-email">Your Email Address</label>
                <input type="email" id="reminder-email" placeholder="you@example.com" required>
            </div>
            
            <div class="form-group">
                <label for="reminder-name">Your First Name</label>
                <input type="text" id="reminder-name" placeholder="John">
            </div>
            
            <div class="form-group">
                <label for="mail-date">Date You're Mailing This Letter</label>
                <input type="date" id="mail-date" value="${new Date().toISOString().split('T')[0]}">
            </div>
            
            <button class="btn btn-primary" style="width: 100%; margin-top: 10px;" onclick="scheduleReminders('${letterType}', '${accountName}')">
                Schedule Reminders & Add to Tracker
            </button>
            
            <button class="btn btn-outline" style="width: 100%; margin-top: 10px;" onclick="addToTrackerWithoutReminders('${letterType}', '${accountName}')">
                Skip Reminders - Just Add to Tracker
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function closeReminderModal() {
    const modal = document.getElementById('reminder-modal');
    if (modal) modal.remove();
}

async function scheduleReminders(letterType, accountName) {
    const email = document.getElementById('reminder-email')?.value;
    const name = document.getElementById('reminder-name')?.value || 'there';
    const mailDate = document.getElementById('mail-date')?.value;
    
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    if (!mailDate) {
        alert('Please select the date you are mailing the letter.');
        return;
    }
    
    try {
        const response = await fetch('/api/schedule-reminders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                name,
                letterType,
                mailDate
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Add to local tracker
            const mailDateObj = new Date(mailDate);
            const dueDate = new Date(mailDateObj.getTime() + (30 * 24 * 60 * 60 * 1000));
            
            const dispute = {
                id: Date.now(),
                letterType: letterType,
                sentTo: accountName,
                dateSent: mailDate,
                responseDue: dueDate.toISOString().split('T')[0],
                status: 'pending',
                email: email
            };
            
            trackedDisputes.push(dispute);
            localStorage.setItem('disputes', JSON.stringify(trackedDisputes));
            
            closeReminderModal();
            alert('✅ Reminders scheduled! Check your email for confirmation.\n\nDon\'t forget to actually mail the letter via USPS Certified Mail!');
            updateTrackerStats();
        } else {
            alert('Error scheduling reminders. Please try again.');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Error connecting to server. Reminders not scheduled, but adding to tracker.');
        addToTrackerWithoutReminders(letterType, accountName);
    }
}

function addToTrackerWithoutReminders(letterType, accountName) {
    const mailDate = document.getElementById('mail-date')?.value || new Date().toISOString().split('T')[0];
    const mailDateObj = new Date(mailDate);
    const dueDate = new Date(mailDateObj.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    const dispute = {
        id: Date.now(),
        letterType: letterType,
        sentTo: accountName,
        dateSent: mailDate,
        responseDue: dueDate.toISOString().split('T')[0],
        status: 'pending'
    };
    
    trackedDisputes.push(dispute);
    localStorage.setItem('disputes', JSON.stringify(trackedDisputes));
    
    closeReminderModal();
    alert('Added to tracker! Remember to mail the letter via Certified Mail.');
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

// Checkout - Stripe integration
function checkout() {
    // Replace with actual Stripe checkout
    alert('This would redirect to Stripe Checkout for $29.99.\n\nFor demo, you will be logged in.');
    localStorage.setItem('isLoggedIn', 'true');
    showDashboard();
}

// Dispute Finder Functions
function showFinderStep(step) {
    document.getElementById('finder-step-1').style.display = 'none';
    document.getElementById('finder-step-2').style.display = 'none';
    document.getElementById('finder-step-3').style.display = 'none';
    document.getElementById('finder-step-' + step).style.display = 'block';
    
    if (step === 3) {
        generateRecommendations();
    }
}

function updateRecommendations() {
    // This just allows real-time feedback if needed
}

function generateRecommendations() {
    const recommendations = [];
    
    if (document.getElementById('has-collections')?.checked) {
        recommendations.push({
            icon: '💰',
            title: 'Collections',
            description: 'Collection accounts can be disputed for lack of validation. Many collectors can\'t provide proper documentation.',
            letters: [
                'Debt Validation Letter - Send to collection agency FIRST',
                '609 Letter - Send to credit bureaus',
                'Pay-for-Delete Letter - If you want to negotiate payment'
            ]
        });
    }
    
    if (document.getElementById('has-late-payments')?.checked) {
        recommendations.push({
            icon: '📅',
            title: 'Late Payments',
            description: 'Late payments can sometimes be removed with goodwill letters or by disputing inaccurate reporting dates.',
            letters: [
                'Goodwill Letter - Ask creditor to remove as courtesy',
                'General Dispute Letter - If dates/amounts are wrong',
                'Late Payment Dispute - Challenge the accuracy'
            ]
        });
    }
    
    if (document.getElementById('has-charge-offs')?.checked) {
        recommendations.push({
            icon: '❌',
            title: 'Charge-Offs',
            description: 'Charge-offs must be reported accurately. Dispute any errors in balance, dates, or account details.',
            letters: [
                'General Dispute Letter - Dispute inaccuracies',
                '623 Direct Creditor Dispute - Send to original creditor',
                'Debt Validation Letter - If sold to collections'
            ]
        });
    }
    
    if (document.getElementById('has-inquiries')?.checked) {
        recommendations.push({
            icon: '🔍',
            title: 'Hard Inquiries',
            description: 'Unauthorized inquiries can be removed. You must have given permission for a hard pull.',
            letters: [
                'Hard Inquiry Removal Letter - For unauthorized pulls',
                'Unauthorized Inquiry Dispute - Demand proof of authorization'
            ]
        });
    }
    
    if (document.getElementById('has-wrong-info')?.checked) {
        recommendations.push({
            icon: '⚠️',
            title: 'Inaccurate Information',
            description: 'Any wrong information - balances, dates, account numbers, status - can and should be disputed.',
            letters: [
                'General Dispute Letter - Standard dispute for errors',
                '611 Method of Verification - Demand proof of accuracy',
                'Direct Creditor Dispute - Go straight to the source'
            ]
        });
    }
    
    if (document.getElementById('has-unknown-accounts')?.checked) {
        recommendations.push({
            icon: '🚨',
            title: 'Unknown Accounts (Possible Identity Theft)',
            description: 'Accounts you don\'t recognize could be identity theft or mixed files. Take action immediately.',
            letters: [
                'Identity Theft Affidavit - Report the fraud',
                'Fraud Alert Request - Add alert to your file',
                'General Dispute Letter - Dispute as "not mine"',
                'Police Report - File if identity theft confirmed'
            ]
        });
    }
    
    if (document.getElementById('has-old-debts')?.checked) {
        recommendations.push({
            icon: '📆',
            title: 'Old Debts (Past 7 Years)',
            description: 'Most negative items must be removed after 7 years (10 for bankruptcies). Dispute if they\'re still showing.',
            letters: [
                'Obsolete Debt Dispute - Demand removal of old items',
                'General Dispute Letter - Reference the date limits',
                'Statute of Limitations Letter - For time-barred debts'
            ]
        });
    }
    
    if (document.getElementById('has-bankruptcy')?.checked) {
        recommendations.push({
            icon: '⚖️',
            title: 'Bankruptcy',
            description: 'Bankruptcy stays for 7-10 years, but included accounts should show $0 balance and "included in bankruptcy".',
            letters: [
                'Bankruptcy Dispute Letter - For incorrectly reported accounts',
                'General Dispute Letter - If accounts show wrong status'
            ]
        });
    }
    
    if (document.getElementById('has-medical')?.checked) {
        recommendations.push({
            icon: '🏥',
            title: 'Medical Debt',
            description: 'Medical debt has special rules. Many are removed under new regulations, and billing errors are common.',
            letters: [
                'Medical Debt Dispute Letter - Specific to medical collections',
                'HIPAA Violation Letter - If they shared info improperly',
                'Debt Validation Letter - Demand itemized bill'
            ]
        });
    }
    
    if (document.getElementById('has-student-loans')?.checked) {
        recommendations.push({
            icon: '🎓',
            title: 'Student Loans',
            description: 'Student loan reporting errors are common. Check balances, payment history, and loan status.',
            letters: [
                'Student Loan Dispute Letter - For incorrect info',
                'General Dispute Letter - Standard dispute process'
            ]
        });
    }
    
    // Render recommendations
    const container = document.getElementById('recommendations-list');
    
    if (recommendations.length === 0) {
        container.innerHTML = `
            <div class="no-issues">
                <h3>✅ No Issues Selected</h3>
                <p>Go back and check the items that appear on your credit report, or if your report is clean, congratulations!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = recommendations.map(rec => `
        <div class="recommendation-card">
            <h3>${rec.icon} ${rec.title}</h3>
            <p>${rec.description}</p>
            <div class="letters-to-use">
                <h4>📝 Letters to Use:</h4>
                <ul>
                    ${rec.letters.map(letter => `<li>${letter}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}
