# 🎮 Host Controller Guide

Your complete walkthrough for controlling Game Night from your phone or tablet.

---

## Getting Started

### Accessing the Host Controller

1. **Connect to the same WiFi** as the TV display
2. **Open your browser** (Chrome or Safari recommended)
3. **Navigate to:** `http://[server-ip]:5173/host`
4. **Bookmark the page** for easy access

### First-Time Setup

When you first open the Host Controller:

1. You'll see three tabs at the top:
   - **Games** - Select and control game modes
   - **Players** - Manage participants and scores
   - **Chaos** - Trigger random events

2. The TV display should show "Host Connected" in the top right
3. If it says "No Host", refresh both pages

---

## Tab 1: Games

This is your main control center for running games.

### Game Selection Grid

![Game Grid Layout]

The grid shows all available games:
- Each game has a colored icon and name
- Tap any game to select it
- The TV will immediately switch to that game

### Game Control Panel

Once a game is selected, you'll see:

```
┌─────────────────────────────────────┐
│  Current Game: [Game Name]          │
├─────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │  NEW │ │REVEAL│ │ NEXT │        │
│  └──────┘ └──────┘ └──────┘        │
└─────────────────────────────────────┘
```

### Control Buttons

#### 🔵 NEW
**When to use:** Starting a new round/question

**What it does:**
- Loads a random question/item for the selected game
- Resets any revealed answers
- Timer starts (if applicable)
- TV updates immediately

**Example flow:**
1. Select "Geography" game
2. Tap NEW
3. TV shows: "What is the capital of France?"
4. Players think/shout answers

#### 🟢 REVEAL
**When to use:** When you're ready to show the answer

**What it does:**
- Shows the correct answer on TV
- Plays victory sound effects
- Triggers confetti animation
- Stops any active timers

**Tips:**
- Wait for players to finish guessing
- Build suspense before revealing!
- Award points immediately after revealing

#### 🟡 NEXT
**When to use:** Moving to a new item in the same game

**What it does:**
- Marks current item as used
- Clears the display
- Returns to "Press NEW to start" state
- Ready for a new round

**Pro tip:** Use NEXT when you want to skip a question or after awarding points.

---

## Tab 2: Players

Manage participants and their scores.

### Adding Players

```
┌─────────────────────────────────────┐
│  [Enter player name...]    [+]     │
├─────────────────────────────────────┤
│                                     │
└─────────────────────────────────────┘
```

**To add a player:**
1. Type their name in the input field
2. Tap the **+** button (or press Enter)
3. They appear in the player list

### Player List

Each player appears as a card:

```
┌─────────────────────────────────────┐
│  [A]  Alice              5   +  -  │
├─────────────────────────────────────┤
│  [B]  Bob                3   +  -  │
│  [C]  Charlie            7   +  -  │
└─────────────────────────────────────┘
```

**Elements:**
- **Initial badge** - First letter of their name (colored)
- **Name** - Player's name
- **Score** - Current point total (large number)
- **+** - Add 1 point
- **-** - Subtract 1 point
- **X** (hidden, tap to show) - Remove player

### Scoring During Games

**Quick scoring method:**
1. After revealing an answer, ask who got it right
2. Tap the **+** next to their name
3. Score updates on both Host and TV

**Pro scoring tips:**
- Award points immediately while it's fresh
- Use minus points for wrong answers (optional)
- Keep scores visible on TV for motivation

### Removing Players

**To remove a player:**
1. Swipe left on their name (mobile)
2. Or tap the **X** that appears
3. Confirm if prompted

---

## Tab 3: Chaos

Add random fun with forfeits, challenges, and rewards!

### Chaos Cards

Three types of chaos events:

#### 🔴 Forfeit
**Tagline:** "Random punishment challenge"

**When to use:**
- Someone answers incorrectly
- As a penalty for rules
- Whenever you want chaos!

**Difficulty levels:**
- **Low** - Fun, harmless (sing a song, do an impression)
- **Medium** - More challenging (take a shot, lose points)
- **High** - Serious stuff (shoey, social media posts)
- **Extreme** - Wildcard (use with caution!)

**Example forfeits:**
- "Speak in an accent for 3 rounds"
- "Show your last 5 text messages"
- "Do 50 squats"
- "Post something embarrassing on social media"

#### 🟠 Challenge
**Tagline:** "Group activity challenge"

**When to use:**
- Ice breaker at start
- Between games
- Team building moments

**Example challenges:**
- "Group selfie with silly faces"
- "Everyone does 10 jumping jacks"
- "Pass the phone - each person adds to a story"
- "Simultaneous dance party"

#### 🟢 Reward
**Tagline:** "Power up bonus"

**When to use:**
- Someone gets a difficult answer
- After a challenge is completed
- Random acts of kindness

**Example rewards:**
- "Steal 2 points from any player"
- "Immunity for next round"
- "Double points on next correct answer"
- "Choose the next category"

### Using Chaos Mode

1. **Tap the chaos type** you want
2. **TV displays** the forfeit/challenge/reward
3. **Chaos popup** appears with instructions
4. **Execute** the chaos!
5. **Tap to close** when done

---

## Game-Specific Hosting Tips

### Guess the Meme

**Hosting style:** Energetic, read quotes with enthusiasm

**Flow:**
1. NEW → Read quote aloud → Players guess → REVEAL → Award points

**Tips:**
- Use your best meme voice
- Give hints if stuck ("It's a Vine...")
- Keep it fast-paced

### Geography

**Hosting style:** Quiz master, educational

**Flow:**
1. NEW → Read question → Wait for answers → REVEAL → Share fun fact

**Tips:**
- Accept approximate answers for dates
- Share interesting facts after revealing
- Mix easy and hard questions

### Music

**Hosting style:** DJ, enthusiastic

**Flow:**
1. NEW → Read lyrics → Players finish → REVEAL → Maybe play the song

**Tips:**
- Have a music player ready for snippets
- Encourage singing along
- Award bonus for singing the full line

### Logorithmic

**Hosting style:** Art critic, encouraging

**Flow:**
1. NEW → Announce brand → Count down (30-60 sec) → Everyone reveals drawings → REVEAL real logo → Vote on favorites

**Tips:**
- Give clear timing signals
- Encourage creativity over accuracy
- Take photos of the best/worst drawings
- Use paper and pens for all players

### Price is Right

**Hosting style:** Game show host, dramatic

**Flow:**
1. NEW → Read product description → Players write guesses → Collect guesses → REVEAL price → Award points

**Tips:**
- Read the product hint carefully
- Build suspense before revealing
- "Actual retail price is..."
- Closest WITHOUT going over wins

---

## Advanced Techniques

### Quick Game Switching

Don't wait for a game to "finish" - switch anytime!

1. Players getting bored? Switch games instantly
2. Tap any game in the grid
3. TV updates immediately
4. Start fresh with NEW

### Managing Large Groups

**8+ players:**
- Split into teams
- Teams discuss answers together
- Award points to the team
- Use challenges for team bonding

**Competitive groups:**
- Keep a fast pace
- Use the timer (built into some games)
- Award bonus points for speed

**Casual groups:**
- Take your time
- Allow discussion
- Focus on fun over competition

### Dealing with Disputes

**"I said it first!"**
- Ask for specific wording
- Award points to both if unclear
- Use Chaos to settle it (rock paper scissors forfeit)

**"That answer should count!"**
- Be consistent with your rules
- When in doubt, be generous
- Remember: it's about fun!

### Using the Leaderboard

Players can view the leaderboard anytime on the TV:

**On TV Display:**
- Press `L` key on keyboard
- Or click the "Scores" button

**Tips:**
- Show leaderboard between games
- Highlight the leader
- Encourage comebacks

---

## Troubleshooting

### "NEW button doesn't work"

**Check:**
- Are you in a game mode (not menu)?
- Is the game already showing an item? (Tap NEXT first)
- Try refreshing the host page

### "REVEAL button is disabled"

**This is normal when:**
- No item is loaded (tap NEW first)
- Answer is already revealed (tap NEXT for new item)

### "Scores aren't updating on TV"

**Solutions:**
1. Check that TV shows "Host Connected"
2. Refresh both pages
3. Add a test player to verify sync

### "Can't add players"

**Check:**
- Name field isn't empty
- No special characters in names
- Try tapping + button instead of Enter

### "Chaos mode not showing on TV"

**Check:**
- TV is on a game screen (not menu)
- Tap the chaos card again
- TV should show popup overlay

---

## Best Practices

### Before the Party

- [ ] Test host controller on your phone
- [ ] Verify TV connection is working
- [ ] Add a few test players
- [ ] Run through each game once
- [ ] Charge your phone!

### During the Party

- [ ] Welcome everyone and explain the system
- [ ] Start with an easy game (Memes)
- [ ] Keep energy high
- [ ] Award points generously
- [ ] Use Chaos mode for laughs
- [ ] Check scores periodically

### Pro Tips

1. **Have a co-host** - Someone to help with scoring while you manage the controller

2. **Prepare backup content** - If technical issues arise, have charades or other offline games ready

3. **Read the room** - If a game isn't landing, switch immediately

4. **Celebrate winners** - Make a big deal about points and victories

5. **Use the mute button** - Press `M` on TV if music/sounds are too loud

6. **Take breaks** - Every 30-45 minutes for drinks/bathroom

---

## Quick Reference

### Button Summary

| Button | When to Use | Effect |
|--------|-------------|--------|
| NEW | Start new round | Loads random question |
| REVEAL | Show answer | Reveals + confetti |
| NEXT | Move on | Clears for next round |
| + | Player correct | Adds 1 point |
| - | Player wrong | Subtracts 1 point |

### Keyboard Shortcuts (TV Display)

| Key | Action |
|-----|--------|
| `L` | Toggle Leaderboard |
| `M` | Toggle Mute |
| `F11` | Fullscreen |

### Recommended Game Order

1. **Memes** - Easy ice breaker
2. **Geography** - Get competitive
3. **Logorithmic** - Creative fun
4. **Price is Right** - Interactive
5. **Chaos Mode** - End with laughs

---

**You're now ready to be the ultimate Game Night host!** 🎉
