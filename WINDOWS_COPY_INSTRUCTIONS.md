# Copy Phase 1 Code to Your GitHub Repo — Windows Git Bash

**Your current path:** `~/Documents/GitHub/velocity-architecture`  
**Your shell:** Git Bash (MINGW64)

---

## Option 1: Manual Copy (Recommended for Git Bash)

### Step 1: Open Git Bash and navigate to your repo
```bash
cd ~/Documents/GitHub/velocity-architecture
pwd  # Verify you're in the right place
ls -la  # Should see .git, README.md, spec/, viewpoints/, etc.
```

### Step 2: Create the app/ directory structure
```bash
mkdir -p app/{agents,prompts,types}
```

### Step 3: Download the code files

You can either:
- **Option A:** Download from `/mnt/user-data/outputs/` (files are there)
- **Option B:** Copy from terminal if you have access to the source

For **Option A (recommended):**

1. Go to `/mnt/user-data/outputs/` in file explorer
2. You'll find these files that need to go into your repo:
   - From "Create file" outputs above, copy each code file manually

**OR use curl (if you have internet):**

```bash
# Core files
curl -o app/app.ts https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/app/app.ts
curl -o app/orchestrator.ts https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/app/orchestrator.ts
curl -o app/action-engine.ts https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/app/action-engine.ts
curl -o app/kb-loader.ts https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/app/kb-loader.ts
curl -o app/logger.ts https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/app/logger.ts

# Agents
curl -o app/agents/governance-agent.ts https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/app/agents/governance-agent.ts
curl -o app/agents/strategy-agent.ts https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/app/agents/strategy-agent.ts
curl -o app/agents/design-agent.ts https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/app/agents/design-agent.ts
curl -o app/agents/validation-agent.ts https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/app/agents/validation-agent.ts

# Types
curl -o app/types/index.ts https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/app/types/index.ts

# Config files
curl -o package.json https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/package.json
curl -o tsconfig.json https://raw.githubusercontent.com/ZenCloudAU/velocity-architecture/main/tsconfig.json
```

### Step 4: Verify all files are in place
```bash
tree app/  # Or: find app/ -type f | sort
ls -la app/
ls -la app/agents/
ls -la app/types/
cat package.json | head -10  # Verify structure
```

### Step 5: Add to git
```bash
git add app/ package.json tsconfig.json .env.example .gitignore
git status  # Should show new files
```

### Step 6: Commit
```bash
git commit -m "Feat: VAF v2 agentic architect Phase 1 core code

- app.ts: Express HTTP server
- orchestrator.ts: State machine
- agents/: governance, strategy, design, validation agents
- kb-loader.ts: VAF knowledge base fetcher
- action-engine.ts: GitHub integration
- TypeScript configuration and dependencies"
```

### Step 7: Push to GitHub
```bash
git push origin main
# Or if you're on master:
git push -u origin main
```

---

## Option 2: Drag-and-Drop (Windows Explorer)

1. Open two Windows Explorer windows:
   - **Left:** `C:\Users\Phil\AppData\Local\Temp\velocity-architecture`
   - **Right:** `C:\Users\Phil\Documents\GitHub\velocity-architecture`

2. Drag these items from left to right:
   - `app/` folder
   - `package.json`
   - `tsconfig.json`
   - `.env.example`
   - `.gitignore`

3. In Git Bash, verify and commit:
   ```bash
   cd ~/Documents/GitHub/velocity-architecture
   git status
   git add .
   git commit -m "Feat: VAF v2 Phase 1 code"
   git push origin main
   ```

---

## Option 3: Use the Copy Scripts

If you downloaded the `.bat` or `.ps1` scripts:

### PowerShell (Recommended for Windows)
```powershell
# In PowerShell (as Administrator if needed)
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope CurrentUser
cd $env:USERPROFILE\Documents\GitHub\velocity-architecture
.\copy-phase1.ps1
```

### Git Bash
```bash
# The .bat file works from Git Bash (slower but works)
cd ~/Documents/GitHub/velocity-architecture
bash copy-phase1-windows.bat
```

---

## Verify After Copy

```bash
cd ~/Documents/GitHub/velocity-architecture

# Check structure
ls -la app/
ls -la app/agents/
cat app/app.ts | head -20

# Verify git sees the new files
git status

# Check for any missing dependencies
npm ls --depth=0 2>/dev/null | head -5
```

---

## Next: Local Setup

Once code is in your repo:

### 1. Install dependencies
```bash
npm install
# This downloads @anthropic-ai/sdk, express, axios, etc.
# May take 2-3 minutes
```

### 2. Create .env file
```bash
cp .env.example .env
# Edit .env with your actual keys
nano .env
# Or use VS Code: code .env
```

**Populate with:**
```
ANTHROPIC_API_KEY=sk-ant-...your-key-here...
GITHUB_TOKEN=ghp_...your-token-here...
GITHUB_OWNER=ZenCloudAU
GITHUB_REPO=velocity-architecture
PORT=3000
NODE_ENV=development
LOG_LEVEL=info
```

### 3. Build TypeScript
```bash
npm run build
# Outputs JavaScript to dist/
```

### 4. Run locally
```bash
npm run dev
# Server starts: VAF Agentic Architect v2 listening on port 3000
```

### 5. Test health check
```bash
curl http://localhost:3000/health
# Expected: {"status":"healthy","timestamp":"...","version":"2.0.0"}
```

### 6. Test artefact generation (optional)
```bash
curl -X POST http://localhost:3000/artefacts/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Cloud governance model",
    "context": "Financial services firm",
    "constraints": ["Basel III compliance", "governance drag reduction"]
  }'
```

Expected response (if Anthropic API key valid):
```json
{
  "requestId": "req-...",
  "phase": "complete",
  "artefactCount": 3,
  "artefacts": [
    {"id": "...", "type": "governance", "metadata": {...}}
  ],
  "errors": [],
  "duration": 4231
}
```

---

## Troubleshooting

### `npm install` fails
- **Cause:** Network or npm registry blocked
- **Fix:** 
  ```bash
  npm config set registry https://registry.npmjs.org/
  npm install --legacy-peer-deps
  ```

### `npm run build` fails with TypeScript errors
- **Cause:** Missing @types or tsconfig mismatch
- **Fix:**
  ```bash
  npm install --save-dev @types/node @types/express
  npm run build
  ```

### Server doesn't start (`npm run dev` hangs)
- **Cause:** Port 3000 already in use, or ANTHROPIC_API_KEY missing
- **Fix:**
  ```bash
  # Check if 3000 is in use
  netstat -ano | findstr :3000
  
  # Or use different port
  PORT=3001 npm run dev
  ```

### Health check fails (curl hangs or 404)
- **Cause:** Server didn't start
- **Fix:**
  ```bash
  # Check logs for errors
  npm run dev 2>&1 | head -50
  
  # Verify TypeScript compiled
  ls -la dist/app.js
  ```

---

## Git Push Checklist

Before pushing:
```bash
# Ensure everything is staged
git add .

# Review what you're pushing
git status
git diff --cached | head -100

# Commit
git commit -m "Feat: VAF v2 Phase 1 core code - express server, orchestrator, agents"

# Push
git branch  # Verify you're on main
git push origin main
```

After push, verify on GitHub:
```
https://github.com/ZenCloudAU/velocity-architecture
```

Should see:
- New `app/` folder in repo
- Updated `package.json`
- New `tsconfig.json`

---

**You're ready. Pick one of the three options above and execute.**
