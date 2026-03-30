# Experis Design Showcase

A marketing website showcasing Experis's design services. Currently features a Bay Area Proximity Callout — a dark-themed UI component with an animated California map, pulsing location pin, and commutable-zone glow effect.

## Current Features

- Stylized California outline rendered in SVG
- Animated location pin with ripple effects over the Bay Area
- Radial glow indicating commutable range
- Responsive layout that adapts to mobile viewports

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (included with Node.js)
- [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli) (for infrastructure deployment)
- An Azure subscription with Contributor access

## Getting Started

1. **Install dependencies**

   ```sh
   npm install
   ```

2. **Start the development server**

   ```sh
   npm start
   ```

   This launches a local server at [http://localhost:3000](http://localhost:3000) and automatically opens the page in your default browser. The server also live-reloads on file changes.

## Infrastructure

Azure resources are defined as Bicep templates in the `infra/` directory. The templates provision:

- **Resource group** — `rg-experis-design-showcase` in `eastus2`
- **Azure Static Web App** — `experis-design-showcase` (Free tier)

### Manual deployment

To deploy the infrastructure manually using the Azure CLI:

```sh
az login
az deployment sub create \
  --location eastus2 \
  --template-file infra/main.bicep \
  --parameters infra/main.bicepparam
```

## CI/CD Pipeline

The project uses an Azure DevOps pipeline (`azure-pipelines.yml`) that automatically deploys on every push to `main`. The pipeline has two stages:

1. **Infrastructure** — Deploys the Bicep template to create/update Azure resources
2. **Deploy** — Publishes the `src/` directory to the Static Web App

### One-time setup

Follow these steps to connect the pipeline to Azure:

1. **Create an Azure service connection in Azure DevOps**

   - Navigate to your Azure DevOps project > **Project Settings** > **Service connections**
   - Click **New service connection** > **Azure Resource Manager** > **Service principal (automatic)**
   - Select your Azure subscription and grant access to all resource groups (subscription-level scope)
   - Name the connection `azure-service-connection`
   - Click **Save**

   > If you use a different name, update the `azureServiceConnection` variable in `azure-pipelines.yml` to match.

2. **Create the pipeline**

   - Navigate to **Pipelines** > **New pipeline**
   - Select **Azure Repos Git** and choose this repository
   - Select **Existing Azure Pipelines YAML file** and pick `/azure-pipelines.yml`
   - Click **Run** to trigger the first deployment

3. **Verify the deployment**

   Once the pipeline completes, the site will be live at the default Azure Static Web Apps URL (shown in the portal under the Static Web App's **Overview** page).

## Project Structure

```
./
├── infra/
│   ├── modules/
│   │   └── staticWebApp.bicep   # Static Web App resource definition
│   ├── main.bicep               # Subscription-scoped entry point
│   └── main.bicepparam          # Parameter values
├── src/
│   └── index.html               # Main preview page
├── azure-pipelines.yml          # CI/CD pipeline definition
├── package.json
└── README.md
```
