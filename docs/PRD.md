# Product Requirements Document (PRD): Peach Financial Advisor

## 1. Product Vision
**"Peach"** is a financial companion app that transforms mundane budgeting into a charming, narrative-driven experience. By embodying the persona of a **1960s Homemaker**, the app provides "tough love" financial advice, "kitchen table" wisdom, and a nostalgic, skeuomorphic interface giving users a unique emotional connection to their finances.

## 2. Target Audience
*   **Budget-Conscious Individuals**: Users who find traditional spreadsheet/finance apps cold, boring, or anxiety-inducing.
*   **Nostalgia Lovers**: People who appreciate mid-century modern aesthetics and vintage charm.
*   **Behavioral Spenders**: Users who need emotional feedback (positive reinforcement or gentle scolding) to change spending habits.

## 3. The Persona: "Peach"
*   **Role**: The user's prudent, highly organized, and slightly sassy 1960s housewife friend.
*   **Voice**: Uses period-appropriate slang ("Oh dear," "Heavens to Betsy," "A penny saved," "Frivolous").
*   **Emotional States**:
    *   **Happy/Delighted**: Triggered by staying under budget, saving money, or prudent choices.
    *   **Anguished/Shocked**: Triggered by overspending, expensive purchases, or "frivolous" treats.
    *   **Neutral/Calculating**: Triggered during neutral interactions or data entry.

## 4. Functional Requirements

### 4.1. Core Experience (Main Tab)
*   **Interactive Chat**: Users communicate with Peach via text. Peach responds in character.
*   **Smart State & Mood**:
    *   The app must track daily spending against an average/target.
    *   Peach's visual avatar and dialogue usually reflect the current financial status of the selected day.
*   **Date Navigation**:
    *   Users can navigate to past dates to view historical spending.
    *   Peach's mood renders based on the specifically selected date's history.

### 4.2. "The Happy Homemaker" Planner (Planner Tab)
A suite of vintage-themed financial tools accessible via a grid menu:
*   **Cookie Jar (Savings)**: Visual progress tracker for savings goals (e.g., Christmas Fund).
*   **Kitchen Calendar (Bills)**: Monthly view showing recurring bills (Rent, Electric, Payday).
*   **Envelope System (Budgeting)**: Digital representation of cash envelopes for categories (Groceries, Dining, etc.) with visual "cash" levels.
*   **The Sunday Paper (Reports)**: A weekly report summary styled as a newspaper, highlighting trends (e.g., "Shoe spending up!").
*   **Mad Money (Discretionary)**: A playful gauge showing specific "safe-to-spend" allowance.
*   **House Rules (Settings)**: Configuration for monthly income and savings targets.

### 4.3. The Ledger (Log Tab)
*   **Spending Log**: A table view of daily transactions.
*   **Daily Calculation**: Displays Total Daily Spend vs Daily Average.
*   **Integrated Tools**: Displays the "Envelope" visualization and "Tip of the Day" below the transaction list for quick access.

## 5. User Experience (UX) & Design
*   **Aesthetic**: Mid-Century Modern (1964).
*   **Color Palette**: Peach, Mint Green, Cream, Charcoal.
*   **Visual Style**:
    *   **Skeuomorphism**: Textures of paper, cardboard, glass jars, and fabric.
    *   **Typography**: Vintage serif and script fonts.
*   **Responsiveness**: Mobile-first design. The app mimics a physical object/tool in the user's hand.

## 6. Technical Constraints & Assumptions (MVP)
*   **Platform**: Web Application (React + Vite). Mobile-web optimized, PWA-capable.
*   **Data Storage**: Supabase (PostgreSQL + Auth).
*   **AI Backend**: Claude API for Peach's conversational intelligence.
*   **Payments**: Stripe for subscriptions.

## 7. Pricing Strategy
*   **Free Trial**: 14 days, full access
*   **Premium**: $4.99/month
    *   Unlimited conversations with Peach
    *   All budgeting tools
    *   Weekly "Sunday Paper" reports

## 8. Roadmap
*   **v1.0 (Launch)**: Manual transaction entry, AI chat, budgeting tools
*   **v1.5**: Local storage persistence, PWA support
*   **v2.0**: Cloud sync, user accounts
*   **v3.0**: Bank integration (Plaid) for automatic transactions
*   **v3.5**: Voice mode (talk to Peach)
