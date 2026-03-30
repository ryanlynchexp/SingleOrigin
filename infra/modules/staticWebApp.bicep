@description('Name of the Static Web App.')
param staticWebAppName string

@description('Azure region for the Static Web App.')
param location string

@description('SKU tier for the Static Web App.')
@allowed(['Free', 'Standard'])
param skuName string = 'Free'

resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: staticWebAppName
  location: location
  sku: {
    name: skuName
    tier: skuName
  }
  properties: {}
}

output defaultHostname string = staticWebApp.properties.defaultHostname
output id string = staticWebApp.id
