# VAF Agentic Architect v2 — Launch Checklist

**Objective:** Deploy VAF v2 agent to GitHub, build container, deploy to Cloud Run.

**Timeline:** 2-3 weeks (development focused; infrastructure is day-1 ready).

---

## Phase 0: Repository Setup

### 0.1 Create GitHub Repository Structure
```
github.com/ZenCloudAU/velocity-architecture/
├── .github/
│   └── workflows/
│       └── deploy.yml                 # CI/CD pipeline
├── app/
│   ├── app.ts                         # Express HTTP server
│   ├── orchestrator.ts                # Task router & state machine
│   ├── action-engine.ts               # GitHub API (direct calls)
│   ├── agents/
│   │   ├── governance-agent.ts
│   │   ├── strategy-agent.ts
│   │   ├── design-agent.ts
│   │   ├── validation-agent.ts
│   │   └── consolidation-agent.ts
│   ├── prompts/
│   │   ├── governance.md              # Externalized instructions
│   │   ├── strategy.md
│   │   ├── design.md
│   │   └── validation.md
│   ├── types/
│   │   └── index.ts                   # TypeScript interfaces
│   └── mcp-server.ts                  # MCP adapter
├── k8s/
│   ├── deployment.yaml                # Kubernetes deployment
│   ├── service.yaml
│   ├── configmap.yaml                 # Non-secret config
│   └── secret.yaml.template           # Secrets template (DO NOT commit)
├── docs/
│   ├── vaf-architecture-dashboard.html
│   └── vaf-architecture-v2.json
├── Dockerfile                          # Container definition
├── package.json
├── tsconfig.json
├── .env.example                        # Template for env vars
├── .gitignore
└── README.md                           # Quick start guide
```

**Action:** Create repo structure locally. Commit base files.

```bash
cd ~/projects/velocity-architecture
mkdir -p app/{agents,prompts,types} k8s docs .github/workflows
touch README.md .gitignore .env.example Dockerfile tsconfig.json package.json
# Create directories above
git init
git add .
git commit -m "Initial: VAF v2 architecture scaffolding"
git branch -M main
git remote add origin https://github.com/ZenCloudAU/velocity-architecture.git
git push -u origin main
```

---

## Phase 1: Local Development

### 1.1 Initialize TypeScript Project

**File: `package.json`**
```json
{
  "name": "vaf-agentic-architect-v2",
  "version": "2.0.0",
  "description": "Claude-powered agentic Enterprise Architect",
  "main": "dist/app.js",
  "scripts": {
    "dev": "ts-node app/app.ts",
    "build": "tsc",
    "start": "node dist/app.js",
    "test": "jest",
    "lint": "eslint app/",
    "format": "prettier --write app/"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.24.0",
    "express": "^4.18.2",
    "axios": "^1.6.0",
    "dotenv": "^16.3.1",
    "pino": "^8.17.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "ts-node": "^10.9.1",
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.1.1",
    "prettier": "^3.1.0",
    "eslint": "^8.55.0"
  }
}
```

**Action:** `npm install`

---

### 1.2 TypeScript Configuration

**File: `tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["app/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**Action:** Commit to repo.

---

### 1.3 Environment Configuration

**File: `.env.example`**
```
# Claude API
ANTHROPIC_API_KEY=sk-ant-...

# GitHub
GITHUB_TOKEN=ghp_...
GITHUB_OWNER=ZenCloudAU
GITHUB_REPO=velocity-architecture

# VAF Configuration
VAF_KB_PATH=app/prompts
ARTEFACTS_OUTPUT_DIR=/tmp/vaf-artefacts

# Server
PORT=3000
NODE_ENV=development

# Logging
LOG_LEVEL=info
```

**Action:** 
- Copy to `.env` locally
- Add `.env` to `.gitignore` (never commit secrets)
- Populate with your actual keys

---

### 1.4 Implement Core Modules

**File: `app/types/index.ts`**
```typescript
export interface EARequest {
  id: string;
  topic: string;
  context?: string;
  constraints?: string[];
  requestedArtefacts?: ('governance' | 'strategy' | 'design')[];
  userId?: string;
  timestamp: Date;
}

export interface Artefact {
  id: string;
  type: 'governance' | 'strategy' | 'design';
  content: string;
  metadata: {
    requestId: string;
    generatedBy: string;
    timestamp: Date;
    vafVersion: string;
    tokensUsed: number;
    validationPassed: boolean;
  };
}

export interface TaskPlan {
  requestId: string;
  artefactsNeeded: string[];
  validationRules: string[];
  sequenceOrder: string[];
}

export interface OrchestratorState {
  requestId: string;
  phase: 'planning' | 'generation' | 'validation' | 'publishing' | 'complete' | 'failed';
  artefacts: Artefact[];
  errors: string[];
  startTime: Date;
  endTime?: Date;
}
```

**Action:** This is your type contract. Commit.

---

**File: `app/app.ts`** (Express Server)
```typescript
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { orchestrator } from './orchestrator';
import { logger } from './logger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Health check (required by Cloud Run)
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Generate EA artefacts
app.post('/artefacts/generate', async (req: Request, res: Response) => {
  try {
    const { topic, context, constraints, requestedArtefacts } = req.body;
    
    const requestId = `req-${Date.now()}`;
    logger.info({ requestId, topic }, 'EA generation requested');

    const result = await orchestrator.execute({
      id: requestId,
      topic,
      context,
      constraints,
      requestedArtefacts: requestedArtefacts || ['governance', 'strategy', 'design'],
      userId: req.headers['x-user-id'] as string || 'anonymous',
      timestamp: new Date(),
    });

    res.json(result);
  } catch (error) {
    logger.error(error, 'Generation failed');
    res.status(500).json({ error: String(error) });
  }
});

// Retrieve artefact
app.get('/artefacts/:id', async (req: Request, res: Response) => {
  try {
    const artefact = await orchestrator.getArtefact(req.params.id);
    if (!artefact) {
      res.status(404).json({ error: 'Artefact not found' });
      return;
    }
    res.json(artefact);
  } catch (error) {
    logger.error(error, 'Retrieval failed');
    res.status(500).json({ error: String(error) });
  }
});

app.listen(port, () => {
  logger.info({ port }, 'VAF Agentic Architect v2 listening');
});
```

**Action:** Commit. Test locally: `npm run dev` → `curl http://localhost:3000/health`

---

**File: `app/orchestrator.ts`** (Task Router)
```typescript
import { Anthropic } from '@anthropic-ai/sdk';
import { EARequest, TaskPlan, OrchestratorState, Artefact } from './types/index';
import { governanceAgent } from './agents/governance-agent';
import { strategyAgent } from './agents/strategy-agent';
import { designAgent } from './agents/design-agent';
import { validationAgent } from './agents/validation-agent';
import { actionEngine } from './action-engine';
import { logger } from './logger';

class Orchestrator {
  private client = new Anthropic();
  private state: Map<string, OrchestratorState> = new Map();

  async execute(request: EARequest): Promise<OrchestratorState> {
    const state: OrchestratorState = {
      requestId: request.id,
      phase: 'planning',
      artefacts: [],
      errors: [],
      startTime: new Date(),
    };

    this.state.set(request.id, state);

    try {
      // Phase 1: Planning
      logger.info({ requestId: request.id }, 'Phase: Planning');
      const plan = await this.createPlan(request);
      state.phase = 'generation';

      // Phase 2: Generation
      logger.info({ requestId: request.id, plan }, 'Phase: Generation');
      for (const artefactType of plan.artefactsNeeded) {
        const artefact = await this.generateArtefact(request, artefactType);
        state.artefacts.push(artefact);
      }

      // Phase 3: Validation
      state.phase = 'validation';
      logger.info({ requestId: request.id }, 'Phase: Validation');
      for (const artefact of state.artefacts) {
        const isValid = await validationAgent.validate(artefact, plan.validationRules);
        if (!isValid) {
          state.errors.push(`Validation failed: ${artefact.type}`);
        }
      }

      // Phase 4: Publishing
      state.phase = 'publishing';
      logger.info({ requestId: request.id }, 'Phase: Publishing');
      for (const artefact of state.artefacts) {
        await actionEngine.commitArtefact(request.id, artefact);
      }

      state.phase = 'complete';
      state.endTime = new Date();
      logger.info({ requestId: request.id, duration: state.endTime.getTime() - state.startTime.getTime() }, 'Request complete');

      return state;
    } catch (error) {
      state.phase = 'failed';
      state.errors.push(String(error));
      state.endTime = new Date();
      logger.error({ requestId: request.id, error }, 'Request failed');
      throw error;
    }
  }

  private async createPlan(request: EARequest): Promise<TaskPlan> {
    // Ask Claude to plan which artefacts are needed
    const response = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: `Given this EA request topic: "${request.topic}", which artefacts should we generate? Return JSON: { "artefactsNeeded": [...], "validationRules": [...] }`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');

    const plan = JSON.parse(content.text);
    return {
      requestId: request.id,
      ...plan,
      sequenceOrder: ['governance', 'strategy', 'design'], // Standard order
    };
  }

  private async generateArtefact(request: EARequest, type: string): Promise<Artefact> {
    let agent;
    switch (type) {
      case 'governance':
        agent = governanceAgent;
        break;
      case 'strategy':
        agent = strategyAgent;
        break;
      case 'design':
        agent = designAgent;
        break;
      default:
        throw new Error(`Unknown artefact type: ${type}`);
    }

    return agent.generate(request);
  }

  async getArtefact(id: string): Promise<Artefact | null> {
    // Retrieve from GitHub or local cache
    return await actionEngine.getArtefact(id);
  }
}

export const orchestrator = new Orchestrator();
```

**Action:** Commit. This is your state machine.

---

**File: `app/action-engine.ts`** (Direct GitHub Calls)
```typescript
import axios from 'axios';
import { Artefact } from './types/index';
import { logger } from './logger';

class ActionEngine {
  private githubToken = process.env.GITHUB_TOKEN;
  private owner = process.env.GITHUB_OWNER || 'ZenCloudAU';
  private repo = process.env.GITHUB_REPO || 'velocity-architecture';

  async commitArtefact(requestId: string, artefact: Artefact): Promise<void> {
    const fileName = `artefacts/${artefact.type}/${requestId}-${artefact.type}.md`;
    const message = `[VAF] Generated ${artefact.type} artefact for ${requestId}`;

    try {
      // Pure function: direct GitHub API call (no LLM reasoning)
      const response = await axios.put(
        `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${fileName}`,
        {
          message,
          content: Buffer.from(artefact.content).toString('base64'),
          branch: 'main',
        },
        {
          headers: {
            Authorization: `token ${this.githubToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      logger.info({
        requestId,
        type: artefact.type,
        sha: response.data.commit.sha,
      }, 'Artefact committed');
    } catch (error) {
      logger.error({ requestId, error }, 'Commit failed');
      throw error;
    }
  }

  async getArtefact(id: string): Promise<Artefact | null> {
    // Retrieve from GitHub
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${this.owner}/${this.repo}/contents/artefacts`,
        {
          headers: {
            Authorization: `token ${this.githubToken}`,
          },
        }
      );

      // Find matching artefact
      const files = response.data as { name: string }[];
      const match = files.find(f => f.name.includes(id));
      if (!match) return null;

      // Retrieve full content
      const fileResponse = await axios.get(
        `https://api.github.com/repos/${this.owner}/${this.repo}/contents/artefacts/${match.name}`,
        {
          headers: {
            Authorization: `token ${this.githubToken}`,
          },
        }
      );

      return JSON.parse(fileResponse.data);
    } catch (error) {
      logger.error({ error }, 'Retrieval failed');
      return null;
    }
  }
}

export const actionEngine = new ActionEngine();
```

**Action:** Commit. This is pure functions, no tool calls.

---

### 1.5 Implement Agents

**File: `app/agents/governance-agent.ts`**
```typescript
import { Anthropic } from '@anthropic-ai/sdk';
import { EARequest, Artefact } from '../types/index';
import { loadPrompt } from '../prompt-loader';
import { logger } from '../logger';

const client = new Anthropic();

export const governanceAgent = {
  async generate(request: EARequest): Promise<Artefact> {
    const prompt = await loadPrompt('governance');
    const startTokens = 0; // Track token usage

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: prompt,
      messages: [
        {
          role: 'user',
          content: `Generate a governance artefact for: ${request.topic}\n\nContext: ${request.context || 'None provided'}`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');

    const artefact: Artefact = {
      id: `${request.id}-governance`,
      type: 'governance',
      content: content.text,
      metadata: {
        requestId: request.id,
        generatedBy: 'governance-agent',
        timestamp: new Date(),
        vafVersion: '2.0.0',
        tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
        validationPassed: false, // Set by validation agent
      },
    };

    logger.info({
      requestId: request.id,
      tokens: artefact.metadata.tokensUsed,
    }, 'Governance artefact generated');

    return artefact;
  },
};
```

**Action:** Create similar agents for strategy and design. Commit all.

---

### 1.6 Prompt Loader

**File: `app/prompt-loader.ts`**
```typescript
import axios from 'axios';
import { logger } from './logger';

export async function loadPrompt(name: string): Promise<string> {
  const owner = process.env.GITHUB_OWNER || 'ZenCloudAU';
  const repo = process.env.GITHUB_REPO || 'velocity-architecture';

  try {
    const response = await axios.get(
      `https://raw.githubusercontent.com/${owner}/${repo}/main/app/prompts/${name}.md`
    );
    logger.info({ prompt: name }, 'Prompt loaded from GitHub');
    return response.data;
  } catch (error) {
    logger.error({ prompt: name, error }, 'Prompt load failed');
    throw error;
  }
}
```

**Action:** This loads prompts from GitHub at runtime (externalization achieved).

---

### 1.7 Logger Setup

**File: `app/logger.ts`**
```typescript
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
```

**Action:** Commit.

---

### 1.8 Test Locally

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start server
npm run dev

# In another terminal, test
curl -X POST http://localhost:3000/artefacts/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Governance model for cloud-first enterprise", "context": "Mid-market insurance firm"}'

# Check health
curl http://localhost:3000/health
```

**Action:** Debug locally. Commit working code.

---

## Phase 2: Containerization

### 2.1 Create Dockerfile

**File: `Dockerfile`**
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy built app
COPY dist ./dist

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "dist/app.js"]
```

**Action:** Test locally:
```bash
docker build -t vaf-agentic-architect:latest .
docker run -p 3000:3000 \
  -e ANTHROPIC_API_KEY=sk-ant-... \
  -e GITHUB_TOKEN=ghp_... \
  vaf-agentic-architect:latest

curl http://localhost:3000/health
```

**Action:** Commit Dockerfile.

---

### 2.2 Create Kubernetes Manifests

**File: `k8s/deployment.yaml`**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: vaf-agentic-architect
  namespace: vaf-production
spec:
  replicas: 2
  selector:
    matchLabels:
      app: vaf-agentic-architect
  template:
    metadata:
      labels:
        app: vaf-agentic-architect
    spec:
      containers:
      - name: vaf-agent
        image: ghcr.io/ZenCloudAU/velocity-architecture:latest
        ports:
        - containerPort: 3000
        env:
        - name: PORT
          value: "3000"
        - name: NODE_ENV
          value: "production"
        - name: ANTHROPIC_API_KEY
          valueFrom:
            secretKeyRef:
              name: vaf-secrets
              key: anthropic-api-key
        - name: GITHUB_TOKEN
          valueFrom:
            secretKeyRef:
              name: vaf-secrets
              key: github-token
        - name: GITHUB_OWNER
          valueFrom:
            configMapKeyRef:
              name: vaf-config
              key: github-owner
        - name: GITHUB_REPO
          valueFrom:
            configMapKeyRef:
              name: vaf-config
              key: github-repo
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 10
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
        resources:
          requests:
            cpu: 250m
            memory: 512Mi
          limits:
            cpu: 500m
            memory: 1Gi
```

**File: `k8s/service.yaml`**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: vaf-agentic-architect
  namespace: vaf-production
spec:
  selector:
    app: vaf-agentic-architect
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: ClusterIP
```

**File: `k8s/configmap.yaml`**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: vaf-config
  namespace: vaf-production
data:
  github-owner: "ZenCloudAU"
  github-repo: "velocity-architecture"
  log-level: "info"
```

**File: `k8s/secret.yaml.template`** (DO NOT COMMIT; create locally)
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: vaf-secrets
  namespace: vaf-production
type: Opaque
stringData:
  anthropic-api-key: "sk-ant-..."
  github-token: "ghp_..."
```

**Action:** Create namespace and secrets locally:
```bash
kubectl create namespace vaf-production
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml  # (from template, with real values)
```

**Action:** Commit only the template.

---

## Phase 3: CI/CD Pipeline

### 3.1 Create GitHub Actions Workflow

**File: `.github/workflows/deploy.yml`**
```yaml
name: Build and Deploy VAF Agentic Architect

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
    - uses: actions/checkout@v4

    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build TypeScript
      run: npm run build

    - name: Run linter
      run: npm run lint
      continue-on-error: true

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3

    - name: Log in to Container Registry
      if: github.event_name == 'push'
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}

    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=sha,prefix={{branch}}-
          type=semver,pattern={{version}}

    - name: Build and push Docker image
      if: github.event_name == 'push'
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'

    steps:
    - uses: actions/checkout@v4

    - name: Set up Cloud SDK
      uses: google-github-actions/setup-gcloud@v1
      with:
        service_account_key: ${{ secrets.GCP_SA_KEY }}
        project_id: ${{ secrets.GCP_PROJECT_ID }}

    - name: Configure Docker authentication
      run: |
        gcloud auth configure-docker ${{ env.REGISTRY }}

    - name: Deploy to Cloud Run
      run: |
        gcloud run deploy vaf-agentic-architect \
          --image ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:main-${{ github.sha }} \
          --platform managed \
          --region us-central1 \
          --allow-unauthenticated \
          --set-env-vars ANTHROPIC_API_KEY=${{ secrets.ANTHROPIC_API_KEY }},GITHUB_TOKEN=${{ secrets.GITHUB_TOKEN }} \
          --port 3000

    - name: Verify deployment
      run: |
        curl https://vaf-agentic-architect-xxxxx.run.app/health
```

**Action:** Create GitHub secrets:
- `GCP_PROJECT_ID`: Your GCP project
- `GCP_SA_KEY`: Service account JSON
- `ANTHROPIC_API_KEY`: Your Claude API key
- `GITHUB_TOKEN`: GitHub PAT (already available via `secrets.GITHUB_TOKEN`)

**Action:** Commit workflow.

---

## Phase 4: Cloud Deployment

### 4.1 Set Up Cloud Run (AWS or GCP)

**For Google Cloud Run:**
```bash
# Authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Create service account
gcloud iam service-accounts create vaf-deploy \
  --display-name="VAF Deployment"

# Grant permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member=serviceAccount:vaf-deploy@YOUR_PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/run.admin

# Create key
gcloud iam service-accounts keys create gcp-sa-key.json \
  --iam-account=vaf-deploy@YOUR_PROJECT_ID.iam.gserviceaccount.com

# Add to GitHub secrets
# Settings → Secrets → GCP_SA_KEY (paste contents of gcp-sa-key.json)
```

**For AWS App Runner:**
```bash
# Authenticate
aws configure

# Create IAM role for App Runner
aws iam create-role --role-name vaf-app-runner \
  --assume-role-policy-document file://trust-policy.json

# Store secrets in Secrets Manager
aws secretsmanager create-secret --name vaf-secrets \
  --secret-string '{"ANTHROPIC_API_KEY":"...","GITHUB_TOKEN":"..."}'

# In GitHub Actions, reference via AWS CLI
```

**Action:** Choose one platform (GCP Cloud Run recommended for Phase 1; cloud-agnostic architecture supports AWS/Azure Phase 2).

---

### 4.2 Manual Deployment (First Time)

```bash
# Build image locally
docker build -t vaf-agentic-architect:v2.0.0 .

# Tag for registry
docker tag vaf-agentic-architect:v2.0.0 \
  ghcr.io/ZenCloudAU/velocity-architecture:v2.0.0

# Push to registry
docker push ghcr.io/ZenCloudAU/velocity-architecture:v2.0.0

# Deploy to Cloud Run (GCP)
gcloud run deploy vaf-agentic-architect \
  --image ghcr.io/ZenCloudAU/velocity-architecture:v2.0.0 \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY,GITHUB_TOKEN=$GITHUB_TOKEN \
  --port 3000

# Test
curl https://vaf-agentic-architect-xxxxx.run.app/health
```

**Action:** Verify `/health` returns 200.

---

## Phase 5: Validation

### 5.1 Test End-to-End

```bash
# Health check
curl https://vaf-agentic-architect-xxxxx.run.app/health

# Generate governance artefact
curl -X POST https://vaf-agentic-architect-xxxxx.run.app/artefacts/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Cloud-first enterprise governance model",
    "context": "Mid-market financial services",
    "constraints": ["must align with Basel III", "reduce governance drag"],
    "requestedArtefacts": ["governance"]
  }'

# Check if artefact was committed to GitHub
# Browse: github.com/ZenCloudAU/velocity-architecture/artefacts/governance/
```

**Action:** Validate all phases work end-to-end.

---

### 5.2 Monitor Logs

**Google Cloud Run:**
```bash
gcloud run services describe vaf-agentic-architect --region us-central1
gcloud logging read "resource.type=cloud_run_revision" \
  --region us-central1 \
  --limit 50 \
  --format json
```

**AWS CloudWatch:**
```bash
aws logs tail /aws/apprunner/vaf-agentic-architect --follow
```

**Action:** Check for errors, token usage, artefact generation success.

---

## Phase 6: Documentation

### 6.1 Create README

**File: `README.md`**
```markdown
# VAF Agentic Architect v2

Claude-powered agentic Enterprise Architect that autonomously generates EA artefacts.

## Quick Start

### Local Development

```bash
git clone https://github.com/ZenCloudAU/velocity-architecture.git
cd velocity-architecture
npm install
npm run build
npm run dev
```

### Test

```bash
curl http://localhost:3000/health
curl -X POST http://localhost:3000/artefacts/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Governance", "context": "Your context"}'
```

### Docker

```bash
docker build -t vaf-agentic-architect .
docker run -p 3000:3000 \
  -e ANTHROPIC_API_KEY=sk-ant-... \
  -e GITHUB_TOKEN=ghp_... \
  vaf-agentic-architect
```

## Deployment

### Phase 1: Your Tenant

Cloud Run automatically deploys on `push` to `main` via GitHub Actions.

### Phase 2: Client Tenant

Deploy the same Docker image to client's cloud account with their env vars.

## Architecture

See `docs/vaf-architecture-v2.json` for complete system specification.

## API

### POST /artefacts/generate

Generate EA artefacts.

**Request:**
```json
{
  "topic": "Topic of EA request",
  "context": "Optional context",
  "constraints": ["Optional constraint 1", "Optional constraint 2"],
  "requestedArtefacts": ["governance", "strategy", "design"]
}
```

**Response:**
```json
{
  "requestId": "req-...",
  "phase": "complete",
  "artefacts": [{...}],
  "errors": []
}
```

### GET /health

Health check (required by Cloud Run).

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-05-16T00:00:00Z"
}
```

## License

Proprietary - ZenCloud Global Consultants / Myint Enterprises Pty Ltd
```

**Action:** Commit.

---

## Rollout Checklist

- [ ] Repository created and code committed
- [ ] Local development environment working
- [ ] All agents implemented and tested
- [ ] Dockerfile builds successfully
- [ ] Kubernetes manifests created
- [ ] GitHub Actions workflow created
- [ ] GitHub secrets configured (API keys, cloud creds)
- [ ] Cloud Run project set up
- [ ] First deployment successful
- [ ] End-to-end test passed (request → artefact → GitHub commit)
- [ ] Logs verified, no errors
- [ ] README and architecture docs in place
- [ ] CI/CD pipeline triggered on next push
- [ ] Monitoring/alerting configured

---

## What Happens on Push

1. **GitHub Actions triggered** → `deploy.yml` runs
2. **Build step** → `npm install`, `npm run build`, Docker image created
3. **Push to GHCR** → Image tagged and pushed to GitHub Container Registry
4. **Deploy to Cloud Run** → New revision deployed, traffic shifted
5. **Health check** → Cloud Run verifies `/health` endpoint
6. **Live** → Your VAF agent is now running and accepting requests

---

## Post-Launch

- Monitor Cloud Run logs for errors
- Track token usage and costs (log per request)
- Iterate on prompts (externalized in `app/prompts/`)
- Build Phase 2 client deployment docs
- Get Claude Architect Certification (frees up time for scaling)

**Go live. Iterate. Scale.**
