# FocusFlow - Project Backlog & Sprint Planning

## 📋 Product Backlog (Prioriterad lista)

### Epic 1: Tidsspårning (Vecka 2-3)
- [ ] Skapa Timer-komponent med start/stopp/paus
- [ ] Implementera lokala state med useState
- [ ] Skapa formulär för att logga arbetspass
- [ ] Implementera localStorage för att spara data
- [ ] Visa historik över loggade pass

### Epic 2: State-hantering & Hooks (Vecka 3-4)
- [ ] Skapa useTimer Custom Hook
- [ ] Implementera useReducer för komplex state
- [ ] Skapa useLocalStorage Hook
- [ ] Optimera rendering med useMemo/useCallback
- [ ] Refaktorera komponenter med hooks

### Epic 3: Global State (Vecka 5)
- [ ] Skapa AppContext för global state
- [ ] Implementera ThemeContext för dark/light mode
- [ ] Skapa UserContext för användarinställningar
- [ ] Kombinera Context med useReducer
- [ ] Tema-växling fungerar

### Epic 4: TypeScript-konvertering (Vecka 6-7)
- [ ] Konvertera alla komponenter till TypeScript
- [ ] Definiera interfaces för datamodeller
- [ ] Typa alla Custom Hooks
- [ ] Implementera strict mode
- [ ] Inga TypeScript-varningar

### Epic 5: Routing & Navigation (Vecka 8)
- [ ] Sätta upp React Router
- [ ] Skapa routes för Dashboard, Timer, History, Settings
- [ ] Implementera nested routes
- [ ] Bygga protected routes
- [ ] Använd URL-parametrar

### Epic 6: API-integration (Vecka 9)
- [ ] Skapa mock-API med json-server
- [ ] Implementera useFetch Custom Hook
- [ ] Bygga CRUD-operationer
- [ ] Error handling & loading states
- [ ] Optimistiska uppdateringar

### Epic 7: Testning (Vecka 10)
- [ ] Sätta upp Jest & React Testing Library
- [ ] Unit tests för Custom Hooks
- [ ] Component tests
- [ ] Mock API-anrop
- [ ] Minst 70% testtäckning

### Epic 8: React Native (Vecka 11)
- [ ] Sätta upp Expo-projekt
- [ ] Återanvänd hooks och types
- [ ] Bygga mobilgränssnitt
- [ ] Implementera navigation
- [ ] Anpassa styling för mobil

---

## 🎯 Sprint 1 (Vecka 1-2)

### Vecka 1: Projektuppstart
**User Stories:**
- [ ] Som utvecklare vill jag ha en klar projektstruktur
- [ ] Som team vill jag ha ett Scrum-board för tracking
- [ ] Som medlem vill jag veta min roll i projektet
- [ ] Som utvecklare vill jag ha dokumenterat workflow

**Aktiviteter:**
- ✅ Skapa projektmappstruktur
- ✅ Sätta upp GitHub repo
- ✅ Skapa README med produktinfo
- ✅ Definiera backlog
- ✅ Planera sprint

**Leverabler:**
- ✅ Projektstruktur dokumenterad
- ✅ Scrum-board setup (GitHub Projects)
- ✅ README och BACKLOG.md skapade
- ✅ Initial sprint planering

---

### Vecka 2: Grundläggande UI-komponenter
**User Stories:**
- [ ] Som användare vill jag se en huvudlayout med navigering
- [ ] Som utvecklare vill jag ha återanvändbara komponenter
- [ ] Som användare vill jag kunna navigera mellan vyer
- [ ] Som utvecklare vill jag ha tydlig komponenthierarki

**Aktiviteter:**
- [ ] Skapa layout-komponenter (Header, Sidebar, MainContent)
- [ ] Implementera navigation mellan vyer
- [ ] Skapa 5+ återanvändbara UI-komponenter
- [ ] Etablera komponenthierarki med props
- [ ] Dokumentera komponentstruktur

**Komponenter att implementera:**
1. `Button` - Återanvändar knappkomponent
2. `Card` - Container för innehål
3. `Input` - Textinput-komponent
4. `Select` - Dropdown-komponent
5. `Header` - Topnavigation
6. `Sidebar` - Sidmeny
7. `MainContent` - Huvudinnehålls-område

**Leverabler:**
- [ ] Fungerande app-skal med navigation
- [ ] Minst 7 återanvändbara komponenter
- [ ] Komponentöversikt i dokumentation
- [ ] Props korrekt definierade

---

## 🔄 Definition of Done

En user story är **Done** när:
- ✅ Kod är skriftlig och fungerar
- ✅ Minst 1 annan person har reviewat koden
- ✅ Komponenter är dokumenterade med JSDoc
- ✅ Ingen linting-varningar
- ✅ Grundläggande funktionalitet testare manuellt
- ✅ Commitas på feature-branch med tydligt meddelande

---

## 📊 Estimering

Använd story points: 1, 2, 3, 5, 8

**Vecka 1 (Uppsättning):** 3-5 points (låga, fokus på struktur)
**Vecka 2 (Komponenter):** 8-13 points

---

**Uppdaterad:** 2026-01-17 - Vecka 1 Start
