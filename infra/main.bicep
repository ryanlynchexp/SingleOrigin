targetScope = 'subscription'

@description('Name of the resource group to create.')
param resourceGroupName string

@description('Azure region for all resources.')
param location string

@description('Name of the Static Web App.')
param staticWebAppName string

@description('SKU tier for the Static Web App.')
@allowed(['Free', 'Standard'])
param skuName string = 'Free'

resource rg 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: resourceGroupName
  location: location
}

module staticWebApp 'modules/staticWebApp.bicep' = {
  name: 'staticWebAppDeploy'
  scope: rg
  params: {
    staticWebAppName: staticWebAppName
    location: location
    skuName: skuName
  }
}

output staticWebAppDefaultHostname string = staticWebApp.outputs.defaultHostname
output staticWebAppId string = staticWebApp.outputs.id
