# 📚 Developer Guide

## Project Architecture

### File Structure
```
abacus-app/
├── index.html       # Main HTML file (5 pages + bottom nav)
├── style.css        # Complete responsive styling (650+ lines)
├── script.js        # Application logic (650+ lines)
├── README.md        # User documentation
├── DEPLOYMENT.md    # Deployment instructions
├── package.json     # Project metadata
├── LICENSE          # MIT License
└── .gitignore       # Git ignore rules
```

### No Build Process Needed!
This app runs directly in the browser with no compilation or bundling required.

---

## Code Organization

### HTML Structure (index.html)
5 main pages handled by page routing:

1. **Home Page** (`#home-page`)
   - Hero section with call-to-action
   - Card grid for feature navigation
   - Statistics display

2. **Practice Page** (`#practice-page`)
   - Setup controls
   - Practice session
   - Results screen

3. **Arena Page** (`#arena-page`)
   - Start screen with rules
   - Competition session
   - Final results

4. **Leaderboard Page** (`#leaderboard-page`)
   - Filter buttons
   - Ranked list
   - Empty state

5. **Tool Page** (`#tool-page`)
   - Interactive abacus
   - Value display
   - Control buttons

**Plus:** Bottom navigation bar (mobile-friendly)

---

### CSS Architecture (style.css)

Organized in logical sections:

1. **Global Styles**
   - CSS variables for theming
   - Reset and typography
   - Animations (@keyframes)

2. **Components**
   - Header
   - Navigation
   - Cards
   - Buttons
   - Forms
   - Progress bars

3. **Feature Styles**
   - Practice system
   - Arena system
   - Leaderboard
   - Abacus tool

4. **Responsive Design**
   - Mobile breakpoints (480px, 768px)
   - Touch-friendly interactions
   - Bottom navigation

---

### JavaScript Logic (script.js)

#### Global State (`appState` object)
```javascript
appState = {
  currentPage: 'home-page',
  currentMode: 'addition',
  practiceSettings: { /* ... */ },
  practiceSession: { /* ... */ },
  arenaSession: { /* ... */ },
  abacusState: { /* ... */ },
  leaderboardFilter: 'all'
}
```

#### Key Functions by Feature

**Navigation:**
- `goToPage(pageName)` - Navigate between pages

**Practice Mode:**
- `selectMode(mode)` - Choose operation type
- `startPractice()` - Begin practice session
- `generatePracticeQuestion()` - Create next question
- `submitPracticeAnswer()` - Check answer
- `endPractice()` - Show results
- `cancelPractice()` - Exit without saving

**Arena Mode:**
- `startArena()` - Begin competition
- `generateArenaQuestion()` - Create random question
- `submitArenaAnswer()` - Check answer
- `startArenaTimer()` - 60-second countdown
- `endArena()` - End competition and save

**Leaderboard:**
- `filterLeaderboard(mode)` - Filter by operation
- `renderLeaderboard()` - Display scores
- `saveLeaderboardScore(entry)` - Save to localStorage
- `getLeaderboard()` - Retrieve scores

**Abacus:**
- `createAbacus()` - Initialize beads
- `toggleBead(col, row)` - Move a bead
- `updateAbacusDisplay()` - Update UI
- `updateAbacusValue()` - Calculate value
- `resetAbacus()` - Clear all beads
- `randomizeAbacus()` - Set random values

**Utilities:**
- `escapeHtml()` - Security (XSS prevention)

**Backend Ready (Placeholders):**
- `saveScoreToBackend()` - Future: Send to server
- `fetchLeaderboardFromBackend()` - Future: Get from server
- `syncWithBackend()` - Future: Sync data

---

## LocalStorage Schema

### `abacus_leaderboard`
```javascript
[
  {
    name: "John Doe",
    score: 250,
    correct: 25,
    answered: 25,
    accuracy: 100,
    time: 45,
    mode: "arena",
    date: "2026-04-17T10:30:00.000Z"
  },
  // ... more entries
]
```

### `abacus_practice`
```javascript
[
  {
    mode: "addition",
    score: 8,
    accuracy: 80,
    time: 245.5,
    answers: [
      { question: "5 + 3", userAnswer: 8, correctAnswer: 8, isCorrect: true, time: 2.1 },
      // ... more answers
    ],
    date: "2026-04-17T10:15:00.000Z"
  },
  // ... more sessions
]
```

---

## Extending the App

### Adding a New Operation Mode
1. Add case in `generatePracticeQuestion()` switch
2. Add case in `generateArenaQuestion()` switch
3. Add button to HTML
4. Update leaderboard filtering if needed

Example:
```javascript
case 'modulo':
  answer = a % b;
  question = `${a} % ${b}`;
  break;
```

### Adding New Statistics
1. Calculate in `updateHomeStats()`
2. Create display element in HTML
3. Update with data

### Customizing Colors
Edit CSS variables in `:root` selector:
```css
--primary-color: #6366f1;
--secondary-color: #8b5cf6;
--success-color: #10b981;
--danger-color: #ef4444;
```

### Changing Difficulty Ranges
Edit default values in HTML inputs:
```html
<input id="minNum" value="10">
<input id="maxNum" value="100">
```

---

## Performance Notes

✅ **Optimized:**
- No external dependencies
- Minimal DOM manipulations
- Efficient event delegation
- CSS animations (GPU accelerated)
- LocalStorage for fast data access

### Potential Optimizations (Future)
- IndexedDB for larger datasets
- Web Workers for heavy calculations
- Service Workers for offline support
- Code splitting if modularizing

---

## Testing Checklist

Before deploying updates:

- [ ] All 4 operation modes generate correct questions
- [ ] Timer functions work (practice and arena)
- [ ] Feedback displays immediately
- [ ] Leaderboard saves and loads
- [ ] Filtering works on leaderboard
- [ ] Abacus calculations are correct
- [ ] Mobile responsive at 480px, 768px, 1024px
- [ ] All buttons navigate correctly
- [ ] No console errors (F12)
- [ ] LocalStorage persists across sessions

---

## Browser Compatibility

### Supported
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

### Features Used
- ES6 JavaScript
- CSS Grid & Flexbox
- CSS Custom Properties
- LocalStorage API
- EventListener API
- DOM API

---

## Security Considerations

### Implemented
✅ HTML escaping in `escapeHtml()` function
✅ No external scripts
✅ No sensitive data in localStorage
✅ No user input directly in DOM

### Recommendations for Backend Integration
- Validate all inputs server-side
- Use HTTPS for API calls
- Implement rate limiting
- Add CORS headers if needed
- Sanitize data before storage
- Implement authentication tokens

---

## Deployment Checklist

Before going live:

- [ ] All features tested
- [ ] No console errors
- [ ] Performance optimized
- [ ] Mobile responsive verified
- [ ] Git repository created
- [ ] README updated
- [ ] GitHub Pages enabled
- [ ] Custom domain configured (optional)
- [ ] Analytics added (optional)
- [ ] Share link published

---

## Common Tasks

### Running Locally
```bash
# Windows
start index.html

# Mac
open index.html

# Linux
xdg-open index.html
```

### Version Control
```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

### Creating a Release
```bash
git tag v1.0.0 -m "Version 1.0.0 release"
git push origin v1.0.0
```

---

## Useful Resources

- **MDN Web Docs**: https://developer.mozilla.org
- **CSS Tricks**: https://css-tricks.com
- **GitHub Pages Docs**: https://pages.github.com
- **Git Documentation**: https://git-scm.com/doc
- **Web.dev**: https://web.dev

---

## Support

For questions or issues:
1. Check existing GitHub Issues
2. Search MDN documentation
3. Review code comments
4. Test in browser console

---

**Happy coding! 🚀**
