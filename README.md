# 🧮 Abacus Pro - Master Mental Math

A professional, feature-rich web application for practicing and competing in abacus-based mental math. Built with pure HTML, CSS, and JavaScript.

## ✨ Features

### Practice Mode
- **4 Operation Modes**: Addition, Subtraction, Multiplication, Division
- **Custom Difficulty Settings**:
  - Min/Max number range
  - Number of questions (1-50)
  - Time per question (5-120 seconds)
- **Real-time Feedback**: Instant correct/wrong responses with color coding
- **Auto-Next Questions**: Seamless progression through questions
- **Progress Tracking**: Visual progress bar and question counter
- **Detailed Results**: Accuracy percentage, correct answers, average time

### Daily Arena (Competition)
- **60-Second Timed Challenge**: Race against the clock
- **Random Questions**: All 4 operation modes combined
- **Real-time Scoring**: 10 points per correct answer
- **Visual Timer**: Countdown with color warnings
- **Results Dashboard**: Score, accuracy, time taken

### Leaderboard System
- **Local Storage**: Scores saved in your browser
- **Top Rankings**: Automatically sorted by score
- **Mode Filtering**: Filter by operation type or view all scores
- **Rankings Display**: Position, name, accuracy, time, score
- **Top 100 Tracking**: Keeps all-time top performers

### Abacus Tool
- **Interactive Interface**: Click beads to move them
- **Real-time Calculation**: Live value display
- **Reset Function**: Clear all values instantly
- **Randomize**: Set random values for practice
- **Smooth Animations**: Polished user experience

## 🎨 Design

- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Mobile-First**: Bottom navigation for easy mobile access
- **Modern UI**: Card-based design with gradient accents
- **Smooth Animations**: CSS transitions and keyframe animations
- **Accessible**: Semantic HTML and proper ARIA labels

## 💻 Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Responsive design, animations, gradients
- **JavaScript (ES6+)**: Pure vanilla JS, no frameworks
- **LocalStorage API**: Browser-based persistence
- **Backend-Ready**: Prepared for Google Sheets API integration

## 📋 Installation

### Option 1: Direct Use (No Installation Needed)
Simply open `index.html` in your web browser. Everything works locally!

```bash
# Clone the repository
git clone https://github.com/yourusername/abacus-app.git
cd abacus-app

# Open in browser
# Windows:
start index.html

# Mac:
open index.html

# Linux:
xdg-open index.html
```

### Option 2: Live Deployment
The app is automatically hosted via GitHub Pages:
```
https://yourusername.github.io/abacus-app/
```

## 🚀 Getting Started

1. **Home Page**: Overview of features and quick stats
2. **Practice Mode**: 
   - Select an operation (Addition, Subtraction, Multiplication, Division)
   - Set difficulty parameters
   - Click "Start Practice"
   - Submit answers (press Enter or click Submit)
   - View results
3. **Daily Arena**:
   - Enter your name
   - Click "Start Competition"
   - Answer as many questions as possible in 60 seconds
   - View final results
4. **Leaderboard**:
   - View all scores sorted by rank
   - Filter by operation mode
   - Track your performance over time
5. **Abacus Tool**:
   - Click beads to toggle them
   - Watch the value update in real-time
   - Use Reset or Randomize buttons

## 📊 Data Storage

All scores and leaderboard data are stored locally in your browser using LocalStorage:
- `abacus_leaderboard`: Competition scores
- `abacus_practice`: Practice session history

Data persists across browser sessions but is cleared if you clear browser cache.

## 🔄 Backend Integration Ready

The codebase includes placeholder functions for future Google Sheets API integration:
- `saveScoreToBackend()` - Send scores to a backend service
- `fetchLeaderboardFromBackend()` - Retrieve cloud leaderboard
- `syncWithBackend()` - Sync local data with cloud

These functions are ready to be implemented with your backend infrastructure.

## 📁 Project Structure

```
abacus-app/
├── index.html       # Main HTML structure
├── style.css        # Responsive styling & animations
├── script.js        # Application logic & state management
├── .gitignore       # Git ignore rules
└── README.md        # This file
```

## 🎯 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## 🔐 Security

- HTML output escaping to prevent XSS attacks
- No external dependencies
- No data sent to external servers (local-only by default)

## 🛣️ Roadmap

- [ ] Google Sheets API integration for cloud leaderboard
- [ ] User authentication system
- [ ] Cloud data synchronization
- [ ] Advanced analytics dashboard
- [ ] Difficulty rating system
- [ ] Achievement badges
- [ ] Daily challenges
- [ ] Social sharing features
- [ ] Offline PWA support

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💡 Tips for Best Performance

1. **Clear Feedback**: Read the feedback messages carefully
2. **Time Management**: Use practice mode to build speed
3. **Variety**: Try all operation modes to build comprehensive skills
4. **Consistency**: Regular practice yields better results
5. **Track Progress**: Check your accuracy trends on the leaderboard

## 🐛 Troubleshooting

**Scores not saving?**
- Check if localStorage is enabled in your browser
- Try clearing cache and reloading

**App not loading?**
- Ensure JavaScript is enabled
- Try a different browser
- Check browser console for errors (F12)

**Timer issues?**
- Ensure your device time is correct
- Close other resource-intensive applications

## 📞 Support

For issues or suggestions, please:
1. Check existing GitHub issues
2. Open a new issue with details
3. Include browser and device information

## 👨‍💻 Author

Created with ❤️ to make mental math practice engaging and fun!

---

**Happy Calculating! 🧮📊✨**
