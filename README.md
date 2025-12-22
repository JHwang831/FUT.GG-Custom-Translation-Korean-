# FUT.gg Korean Translation Tool

A Tampermonkey userscript that provides real-time Korean translations for FC25/FC26 player database and information on FUT.gg. Built with vanilla JavaScript and optimized regular expressions for accurate text processing.

🌐 **GitHub**: [https://github.com/JHwang831/FUT.GG-Custom-Translation-Korean-](https://github.com/JHwang831/FUT.GG-Custom-Translation-Korean-)  
🎮 **Target Site**: [FUT.gg](https://www.fut.gg/)

⚠️ **Current Status**: 
- **FC26 Support**: ~80% complete (active development)
- **FC25 Support**: Objectives tab not yet implemented
- **Version**: v1.2.0

## 🎯 Project Purpose

FUT.gg is a popular FIFA Ultimate Team database and squad builder, but lacks Korean language support. This userscript automatically translates player information, statistics, and interface elements into Korean, making the platform more accessible to Korean-speaking FIFA players.

**Target Users**:
- Korean FIFA Ultimate Team players
- Users who prefer Korean language interface
- Anyone needing quick Korean translations on FUT.gg

## ✨ Key Features

### 🌐 Comprehensive Translation Coverage
**What it translates**:
- Player cards and statistics
- Position names and roles
- Team information
- Evolution objectives
- Interface elements
- Squad builder sections

**How it works**: Automatic translation when you visit any FUT.gg page

---

### 🚀 Optimized Performance
**Technical highlights**:
- **RegExp.exec-based matching**: Efficient pattern matching for text replacement
- **DOM TreeWalker**: Fast DOM traversal for translation injection
- **Minimal performance impact**: Non-blocking script execution
- **Smart caching**: Reduces redundant translations

---

### 🎯 Intelligent Text Processing
**Challenges solved**:

1. **Time vs Currency Unit Conflicts**
   - Problem: "1h" could mean "1 hour" or currency abbreviation
   - Solution: Context-aware pattern matching with priority rules

2. **Non-standard Sentence Structures** (EVO Objectives)
   - Problem: FIFA's evolution objectives use irregular phrasing
   - Solution: Custom regex patterns for each objective type

3. **Dynamic Content Loading**
   - Problem: FUT.gg loads content dynamically via AJAX
   - Solution: MutationObserver to detect and translate new content

---

### 🔄 FC25/FC26 Compatibility
**What it does**: Supports both FC25 and FC26 versions  
**Current status**:
- FC26: ~80% complete (main features working)
- FC25: Fully functional except Objectives tab

## 🛠️ Tech Stack

- **Language**: Vanilla JavaScript (ES6+)
- **Platform**: Tampermonkey / Greasemonkey
- **Key Technologies**:
  - Regular Expressions (RegExp)
  - DOM TreeWalker API
  - MutationObserver API
  - localStorage (for settings)

## 🚀 Installation

### Prerequisites

A browser extension for running userscripts:
- **Chrome/Edge**: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) or [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
- **Safari**: [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)

### Installation Steps

1. **Install Tampermonkey** (if not already installed)
   - Visit your browser's extension store
   - Search for "Tampermonkey"
   - Click "Add to Browser"

2. **Install the script**
   - Visit the [script installation page](#) (or raw GitHub URL)
   - Tampermonkey will automatically detect the script
   - Click "Install"

3. **Visit FUT.gg**
   - Navigate to [FUT.gg](https://www.fut.gg/)
   - The translation will activate automatically
   - Look for Korean text on player cards and interface

### Manual Installation

1. Copy the script code from the repository
2. Open Tampermonkey dashboard
3. Click "Create a new script"
4. Paste the code
5. Save (Ctrl+S or Cmd+S)

## 📖 Usage Guide

### Basic Usage

1. **Automatic Translation**
   - Simply visit FUT.gg with the script enabled
   - All supported text will be translated automatically
   - No additional configuration needed

2. **Toggle On/Off**
   - Click Tampermonkey icon in browser toolbar
   - Toggle the script on/off as needed

### Advanced Features

**Custom Settings** (if implemented):
- Translation intensity (full/partial)
- Excluded sections
- Debug mode

Access via Tampermonkey script menu or on-page settings button.

## 🏗️ Project Structure

```
FUT.gg-Translation/
├── futgg-korean-translation.user.js  # Main script file
├── README.md
├── CHANGELOG.md                       # Version history
└── docs/
    ├── translation-dictionary.md     # Korean translation mappings
    └── technical-details.md          # Implementation details
```

## 🔧 Technical Deep Dive

### Translation Engine

**Core Algorithm**:
```javascript
// 1. DOM TreeWalker for efficient traversal
const walker = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT
);

// 2. RegExp.exec for pattern matching
while (match = pattern.exec(text)) {
  // Replace with Korean translation
}

// 3. MutationObserver for dynamic content
const observer = new MutationObserver(mutations => {
  translateNewContent(mutations);
});
```

### Regex Optimization

**Problem**: Original approach used simple string replacement, causing conflicts

**Solution**: Prioritized regex patterns with context awareness
```javascript
// High priority: Specific patterns
/\b(\d+)\s*goals?\b/gi  // "5 goals" → "5골"

// Medium priority: Common terms
/\bpace\b/gi             // "pace" → "속도"

// Low priority: Generic words
/\bthe\b/gi              // Usually skip
```

### Performance Optimization

**Techniques used**:
1. **Debouncing**: Limit translation frequency on rapid DOM changes
2. **Batch Processing**: Group multiple translations together
3. **Early Exit**: Skip already-translated nodes
4. **Lazy Loading**: Translate only visible content first

## 📊 Translation Coverage

### Fully Supported (FC26)
- ✅ Player cards (name, position, stats)
- ✅ Player roles and PlayStyles
- ✅ Team information
- ✅ Squad builder interface
- ✅ Search and filter options

### Partially Supported
- ⚠️ Evolution objectives (FC25: not implemented)
- ⚠️ Market listings
- ⚠️ Some dynamic tooltips

### Planned Features
- 🔄 Complete objectives tab support (FC25)
- 🔄 User customizable dictionary
- 🔄 Translation toggle button
- 🔄 Performance metrics display

## 🐛 Known Issues

1. **FC25 Objectives Tab**: Not yet implemented
2. **Rare Edge Cases**: Some non-standard phrases may not translate
3. **AJAX Delays**: Very fast navigation may briefly show untranslated text

**Workaround**: Refresh the page if translations don't appear immediately.

## 🔄 Version History

### v1.2.0 (Current - In Development)
- 80% FC26 compatibility
- Improved regex patterns for objectives
- Performance optimizations

### v1.1.1
- Fixed time vs currency unit conflicts
- Enhanced EVO objectives handling
- DOM TreeWalker implementation

### v1.1.0
- RegExp.exec-based matching system
- Initial FC26 support
- Bug fixes and optimizations

### v1.0.0
- Initial release
- Basic FC25 translation support

## 🤝 Contributing

Contributions are welcome! If you'd like to:
- Add new translations
- Report bugs or issues
- Suggest improvements
- Submit FC25 objectives implementation

Please open an issue or pull request on GitHub.

## 📧 Contact

**Junhyeok Hwang (Jay)**
- GitHub: [@JHwang831](https://github.com/JHwang831)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- FUT.gg for providing an excellent FC Series database platform
- Korean FC Series community for feedback and support (FM Korea)

---

Built by Junhyeok Hwang, 2025
