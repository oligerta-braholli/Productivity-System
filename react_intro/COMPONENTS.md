# Komponentöversikt - FocusFlow

## 📦 Vecka 2 - Implementerade komponenter

### Återanvändbara UI-komponenter (`src/components/common/`)

#### 1. **Button**
- **Props:**
  - `children` (ReactNode) - Knapptext
  - `variant` ('primary' | 'secondary' | 'danger') - Knappstil
  - `size` ('sm' | 'md' | 'lg') - Knappstorlek
  - `onClick` (function) - Click-handler
  - `disabled` (boolean) - Inaktivera knapp
  - `className` (string) - Extra CSS-klasser

- **Användning:**
  ```jsx
  <Button variant="primary" onClick={handleClick}>
    Klicka här
  </Button>
  ```

---

#### 2. **Card**
- **Props:**
  - `children` (ReactNode) - Kortets innehål
  - `title` (string) - Kort-titel
  - `padding` ('sm' | 'md' | 'lg') - Inre avstånd
  - `className` (string) - Extra CSS-klasser

- **Användning:**
  ```jsx
  <Card title="Min aktivitet" padding="md">
    <p>Kort innehål här</p>
  </Card>
  ```

---

#### 3. **Input**
- **Props:**
  - `label` (string) - Inputets label
  - `value` (string) - Inputets värde
  - `onChange` (function) - Change-handler
  - `placeholder` (string) - Placeholder-text
  - `type` ('text' | 'email' | 'number' etc) - Input-typ
  - `required` (boolean) - Obligatoriskt fält
  - `error` (string) - Felmeddelande

- **Användning:**
  ```jsx
  <Input
    label="Aktivitets titel"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Ange titel..."
    required
  />
  ```

---

#### 4. **Select**
- **Props:**
  - `label` (string) - Select-label
  - `value` (string) - Valt värde
  - `onChange` (function) - Change-handler
  - `options` (Array) - Tillgängliga val
    - `{ value: string, label: string }`
  - `required` (boolean) - Obligatoriskt fält
  - `error` (string) - Felmeddelande

- **Användning:**
  ```jsx
  <Select
    label="Fokusläge"
    value={mode}
    onChange={(e) => setMode(e.target.value)}
    options={[
      { value: 'deep-work', label: 'Deep Work' },
      { value: 'meeting', label: 'Möte' },
      { value: 'break', label: 'Paus' }
    ]}
    required
  />
  ```

---

#### 5. **Badge**
- **Props:**
  - `children` (ReactNode) - Badge-text
  - `variant` ('neutral' | 'success' | 'warning' | 'danger' | 'info') - Badge-stil
  - `size` ('sm' | 'md' | 'lg') - Badge-storlek

- **Användning:**
  ```jsx
  <Badge variant="success">Aktivt</Badge>
  <Badge variant="warning" size="lg">Varning</Badge>
  ```

---

### Layout-komponenter (`src/components/layout/`)

#### 6. **Header**
- **Props:**
  - `title` (string) - Header-titel
  - `actions` (ReactNode) - Åtgärdsknappar
  - `onMenuToggle` (function) - Meny-toggle callback

- **Användning:**
  ```jsx
  <Header
    title="FocusFlow"
    onMenuToggle={() => setSidebarOpen(!open)}
    actions={<Button>Settings</Button>}
  />
  ```

---

#### 7. **Sidebar**
- **Props:**
  - `items` (Array) - Menypunkter
    - `{ id: string, label: string, icon?: string }`
  - `activeItem` (string) - ID på aktiv menypunkt
  - `onItemClick` (function) - Callback när menypunkt klickas
  - `isOpen` (boolean) - Är menyn öppen

- **Användning:**
  ```jsx
  <Sidebar
    items={[
      { id: 'timer', label: 'Timer', icon: '⏱️' },
      { id: 'history', label: 'Historik', icon: '📊' }
    ]}
    activeItem={activeView}
    onItemClick={handleNavigation}
    isOpen={sidebarOpen}
  />
  ```

---

#### 8. **MainContent**
- **Props:**
  - `children` (ReactNode) - Huvudinnehål
  - `sidebarOpen` (boolean) - Är sidebaren öppen (mobile overlay)

- **Användning:**
  ```jsx
  <MainContent sidebarOpen={sidebarOpen}>
    <h1>Innehål här</h1>
  </MainContent>
  ```

---

## 🎨 Styling

### CSS-klassnamnen följer **BEM-nomenklatur**
- `.component-name` - Huvudkomponent
- `.component-name__element` - Element inom komponent
- `.component-name--modifier` - Modifier/variant

### Exempel:
```css
.button--primary { }
.button--lg { }
.card__title { }
.sidebar__item--active { }
```

### Responsiv design
- Mobil (< 640px)
- Tablet (640px - 768px)
- Desktop (> 768px)

### Dark mode
- Alla komponenter har dark mode-stöd med `@media (prefers-color-scheme: dark)`

---

## 📁 Importeringsexempel

### Från barrel-exports:
```jsx
import { Button, Card, Input, Select, Badge } from '@/components/common';
import { Header, Sidebar, MainContent } from '@/components/layout';
```

### Direkt import:
```jsx
import Button from '@/components/common/Button';
import { Button } from '@/components/common/Button';
```

---

## ✅ Status Vecka 2

- ✅ 5 grundläggande UI-komponenter
- ✅ 3 layout-komponenter
- ✅ Header med navigation
- ✅ Sidebar med menypunkter
- ✅ MainContent area
- ✅ Dark mode-stöd
- ✅ Responsiv design
- ✅ JSDoc-dokumentation på alla komponenter

---

## 🔜 Nästa vecka (Vecka 3)

**State-hantering & Interaktivitet**
- Timer-komponent med useState
- Formulär för att logga aktiviteter
- useEffect för timer-logik
- localStorage för datapersistens
- Historik-vy med loggade aktiviteter

---

**Uppdaterad:** 2026-01-17 - Vecka 2 Slutför
