# Productivity System - Projektdokumentation

## 📁 Projektstruktur

```
src/
├── components/
│   ├── Button.jsx          # Återanvändbar knappkomponent
│   ├── Card.jsx            # Kortkomponent för innehåll
│   ├── Input.jsx           # Inputfält med label
│   ├── Layout.jsx          # Huvudlayout med Sidebar + Header
│   ├── Sidebar.jsx         # Sidofält med navigation
│   ├── Header.jsx          # Sidhuvud med tema-toggle
│   ├── TimerComponent.jsx  # Timer med state-hantering
│   ├── Stats.jsx           # Statistikvisning
│   └── QuickActions.jsx    # Snabbknappar
│
├── pages/
│   ├── Dashboard.jsx       # Huvudsida med översikt
│   ├── TimerPage.jsx       # Timer-sida med formulär
│   ├── History.jsx         # Historik över sessioner
│   ├── Energy.jsx          # Energinivå-tracking
│   └── Settings.jsx        # Inställningar
│
├── hooks/
│   ├── useTimer.js         # Custom hook för timer-logik
│   ├── useLocalStorage.js  # Persistent data i localStorage
│   └── useEnergy.js        # Energi-tracking logik
│
├── styles/
│   ├── Layout.css
│   ├── Sidebar.css
│   ├── Header.css
│   ├── Button.css
│   ├── Card.css
│   ├── Input.css
│   ├── Timer.css
│   ├── Stats.css
│   ├── QuickActions.css
│   ├── Dashboard.css
│   ├── TimerPage.css
│   ├── History.css
│   ├── Energy.css
│   └── Settings.css
│
├── App.jsx                 # Router-konfiguration
└── main.jsx                # Entry point
```

## 🚀 Installation

Du behöver installera React Router för navigation:

```bash
npm install react-router-dom
```

## 📚 Vecka 2: Komponentbaserad Utveckling

### ✅ Implementerade koncept:

1. **JSX och Props**
   - Alla komponenter använder JSX syntax
   - Props används för att skicka data mellan komponenter
   - Exempel: `<Button variant="primary" onClick={handleClick}>Text</Button>`

2. **Återanvändbara komponenter**
   - Button: Stödjer olika varianter (primary, success, warning, danger)
   - Card: Container med titel och innehåll
   - Input: Formulärfält med label
   - Layout: Gemensam struktur för alla sidor

3. **Komponenthierarki**
   - Layout → Sidebar + Header + Page
   - Dashboard → Stats + Timer + QuickActions + Cards
   - Tydlig separation mellan container och presentational components

4. **Navigation**
   - React Router för navigation mellan vyer
   - NavLink för aktiv länk-highlighting i Sidebar
   - Outlet för att rendera child routes

## 📚 Vecka 3: State-hantering och Interaktivitet

### ✅ Implementerade koncept:

1. **useState Hook**
   - Timer state (time, isRunning, isPaused)
   - Formulär state (workStart, workEnd, breaks)
   - UI state (selectedLevel, filter)

2. **useEffect Hook**
   - Timer countdown med setInterval
   - localStorage sync i useLocalStorage hook
   - Cleanup functions för att stoppa timers

3. **Controlled Components**
   - Alla formulär använder controlled inputs
   - State synkas med input values
   - onChange handlers uppdaterar state

4. **Custom Hooks**
   - `useTimer`: Komplett timer-logik med start/stop/pause
   - `useLocalStorage`: Automatisk persistering till localStorage
   - `useEnergy`: Energinivå tracking och statistik

5. **Event Handling**
   - onClick handlers för knappar
   - onChange för formulär
   - onSubmit för formulär submission

## 🎯 Funktionalitet

### Timer
- Start/Pause/Stop/Reset funktionalitet
- Visuell timer-display (HH:MM:SS)
- Session-type val (Deep Work, Meeting, Break, Learning)
- Status indicator (Running/Paused/Idle)

### Dashboard
- Today's Stats med total tid, antal sessioner, genomsnittlig energi
- Veckoöversikt graf
- Quick Actions knappar
- Kalender placeholder
- Energikoll med emojis

### History
- Lista alla tidigare sessioner
- Filter efter session-typ
- Total statistik
- Sorterad efter datum

### Energy Tracking
- Logga energinivå 1-5
- Visa genomsnitt över 7/30 dagar
- Historik över tidigare loggningar

### Timer Page
- Komplett timer med session tracking
- Arbetsdag planering (start/slut tid)
- Paushantering med formulär
- Rekommendationer

## 💾 Data Persistence

All data sparas i localStorage:
- `sessions`: Array med alla timer-sessioner
- `breaks`: Array med planerade pauser
- `energyLogs`: Array med energi-loggningar

## 🎨 Styling

Projektet använder vanilla CSS med:
- Modern färgpalett (blues, purples, greens)
- Responsiv design med CSS Grid och Flexbox
- Hover-effekter och transitions
- Dark mode support (toggle i Header)

## 🔄 Nästa steg

För att köra projektet:

1. Installera dependencies:
```bash
npm install react-router-dom
```

2. Starta dev-server:
```bash
npm run dev
```

3. Öppna i browser på den URL som visas (vanligtvis http://localhost:5173)

## 📖 Lärande

Detta projekt demonstrerar:
- ✅ Komponentbaserad utveckling
- ✅ Props och dataflöde
- ✅ State-hantering med hooks
- ✅ useEffect för side effects
- ✅ Custom hooks för återanvändbar logik
- ✅ Controlled components
- ✅ React Router för navigation
- ✅ localStorage för data persistence
- ✅ Modern CSS med Grid/Flexbox
